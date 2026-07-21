#!/usr/bin/env ruby

require "digest"
require "nokogiri"
require "pathname"
require "yaml"

site_dir = Pathname(ARGV.fetch(0, "_site")).expand_path
contract_path = Pathname(__dir__).join("..", "test", "fixtures", "site_contract.yml").expand_path
contract = YAML.safe_load(contract_path.read, permitted_classes: [], aliases: false)

def route_for(site_dir, file)
  relative = "/#{file.relative_path_from(site_dir)}"
  relative.sub(%r{/index\.html\z}, "/")
end

def normalized_page(file)
  document = Nokogiri::HTML(file.read)
  document.css("script, style, noscript").remove

  # News collection pages have no explicit `date`, so Jekyll derives one from
  # the source mtime. Exclude that generated metadata from the stable content
  # contract while still hashing all authored news text and links.
  if file.to_s.match?(%r{/news/(?:en|zh)/[^/]+/index\.html\z})
    document.css(".post-meta, .post-tags").remove
  end

  text = document.text
    .gsub(/©\s*(?:Copyright|版权所有)\s*\d{4}/, "© YEAR")
    .gsub(/\s+/, " ")
    .strip

  links = document.css("a[href]").map do |link|
    link["href"].sub(/\?[0-9a-f]{32}\z/, "?CACHE")
  end.join("\n")

  {
    "text_sha256" => Digest::SHA256.hexdigest(text),
    "links_sha256" => Digest::SHA256.hexdigest(links),
  }
end

unless site_dir.directory?
  warn "Site directory does not exist: #{site_dir}"
  exit 1
end

actual_routes = Dir.glob(site_dir.join("**", "*.html")).filter_map do |path|
  file = Pathname(path)
  route = route_for(site_dir, file)
  next if route.start_with?("/assets/")

  route
end.sort

expected_routes = contract.fetch("pages").keys.sort
errors = []

site_bytes = Dir.glob(site_dir.join("**", "*"), File::FNM_DOTMATCH).sum do |path|
  File.file?(path) ? File.size(path) : 0
end
maximum_site_bytes = 35 * 1024 * 1024
if site_bytes > maximum_site_bytes
  errors << format(
    "Generated site is %.1f MiB; expected at most %.1f MiB",
    site_bytes.fdiv(1024 * 1024),
    maximum_site_bytes.fdiv(1024 * 1024)
  )
end

missing = expected_routes - actual_routes
unexpected = actual_routes - expected_routes
errors << "Missing routes: #{missing.join(', ')}" unless missing.empty?
errors << "Unexpected routes: #{unexpected.join(', ')}" unless unexpected.empty?

contract.fetch("pages").each do |route, expected|
  relative = route.end_with?("/") ? "#{route.delete_prefix('/')}index.html" : route.delete_prefix("/")
  file = site_dir.join(relative)
  next unless file.file?

  actual = normalized_page(file)
  expected.each do |key, value|
    next if actual.fetch(key) == value

    errors << "#{route} #{key} changed (expected #{value}, got #{actual.fetch(key)})"
  end
end

if errors.empty?
  puts format(
    "Rendered-site contract passed for %d routes (%.1f MiB).",
    expected_routes.length,
    site_bytes.fdiv(1024 * 1024)
  )
else
  warn errors.join("\n")
  exit 1
end
