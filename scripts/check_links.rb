#!/usr/bin/env ruby

require "nokogiri"
require "pathname"
require "uri"
require "yaml"

ROOT = Pathname(__dir__).join("..").expand_path
SITE_DIR = Pathname(ARGV.fetch(0, "_site")).expand_path
SITE_CONFIG = YAML.safe_load(ROOT.join("_config.yml").read, permitted_classes: [], aliases: false)
SITE_HOST = URI.parse(SITE_CONFIG.fetch("url")).host

def route_for(file)
  relative = "/#{file.relative_path_from(SITE_DIR)}"
  relative.sub(%r{/index\.html\z}, "/")
end

def reference_values(document)
  values = []

  document.css("[href], [src]").each do |node|
    %w[href src].each do |attribute|
      value = node[attribute]
      values << [node.name, attribute, value] if value
    end
  end

  document.css("[srcset]").each do |node|
    node["srcset"].split(",").each do |candidate|
      value = candidate.strip.split(/\s+/, 2).first
      values << [node.name, "srcset", value] if value
    end
  end

  values
end

def local_uri(value, current_route)
  return if value.empty? || value.start_with?("data:")
  if (scheme = value[/\A([a-z][a-z0-9+.-]*):/i, 1])
    return unless %w[http https].include?(scheme.downcase)
  end

  escaped_value = URI::DEFAULT_PARSER.escape(value, /[^\x21-\x7E]/)
  uri = if escaped_value.start_with?("//")
          URI.parse("https:#{escaped_value}")
        else
          URI.parse(escaped_value)
        end

  if uri.scheme
    return unless %w[http https].include?(uri.scheme)
    return unless uri.host == SITE_HOST
  end

  base = URI.parse("https://#{SITE_HOST}#{current_route}")
  URI.join(base.to_s, escaped_value)
rescue URI::InvalidURIError
  :invalid
end

def target_for(uri)
  path = URI::DEFAULT_PARSER.unescape(uri.path)
  relative = Pathname(path.delete_prefix("/")).cleanpath
  return if relative.each_filename.first == ".."

  target = SITE_DIR.join(relative)
  candidates = [target]
  candidates << target.join("index.html") if path.end_with?("/") || target.directory?
  if target.extname.empty?
    candidates << Pathname("#{target}.html")
    candidates << target.join("index.html")
  end

  candidates.find(&:file?)
end

unless SITE_DIR.join("index.html").file?
  warn "Site directory does not contain index.html: #{SITE_DIR}"
  exit 1
end

errors = []
checked = 0

Dir.glob(SITE_DIR.join("**", "*.html")).sort.each do |path|
  file = Pathname(path)
  route = route_for(file)
  document = Nokogiri::HTML(file.read)

  reference_values(document).each do |tag, attribute, value|
    uri = local_uri(value, route)
    if uri == :invalid
      errors << "#{route}: invalid #{tag}[#{attribute}] URL #{value.inspect}"
      next
    end
    next unless uri

    checked += 1
    target = target_for(uri)
    unless target
      errors << "#{route}: missing target for #{tag}[#{attribute}]=#{value.inspect}"
      next
    end

    fragment = uri.fragment
    next if fragment.nil? || fragment.empty? || target.extname != ".html"

    target_document = target == file ? document : Nokogiri::HTML(target.read)
    decoded_fragment = URI::DEFAULT_PARSER.unescape(fragment)
    fragment_exists = target_document.css("[id], a[name]").any? do |node|
      node["id"] == decoded_fragment || node["name"] == decoded_fragment
    end
    unless fragment_exists
      errors << "#{route}: missing fragment ##{decoded_fragment} in #{value.inspect}"
    end
  end
end

if errors.empty?
  puts "Internal-link check passed for #{checked} local references."
else
  warn errors.uniq.sort.join("\n")
  exit 1
end
