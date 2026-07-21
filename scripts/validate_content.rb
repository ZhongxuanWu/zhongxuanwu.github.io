#!/usr/bin/env ruby

require "date"
require "pathname"
require "yaml"

ROOT = Pathname(__dir__).join("..").expand_path
LANGUAGES = %w[en zh].freeze
COLLECTIONS = %w[_pages _projects _news].freeze

def front_matter(path)
  parts = path.read.split(/^---\s*$\n?/, 3)
  raise "missing YAML front matter" unless parts.length == 3

  YAML.safe_load(
    parts.fetch(1),
    permitted_classes: [Date, Time],
    permitted_symbols: [],
    aliases: false
  ) || {}
end

def hash_key_paths(value, prefix = nil)
  return [] unless value.is_a?(Hash)

  value.flat_map do |key, child|
    path = [prefix, key].compact.join(".")
    [path, *hash_key_paths(child, path)]
  end
end

errors = []

COLLECTIONS.each do |collection|
  files_by_language = LANGUAGES.to_h do |language|
    directory = ROOT.join(collection, language)
    files = directory.directory? ? directory.children.select { |path| path.file? && path.extname == ".md" } : []
    [language, files.to_h { |path| [path.basename.to_s, path] }]
  end

  expected_names = files_by_language.fetch(LANGUAGES.first).keys.sort
  LANGUAGES.drop(1).each do |language|
    actual_names = files_by_language.fetch(language).keys.sort
    missing = expected_names - actual_names
    extra = actual_names - expected_names
    errors << "#{collection}/#{language} is missing: #{missing.join(', ')}" unless missing.empty?
    errors << "#{collection}/#{language} has unpaired files: #{extra.join(', ')}" unless extra.empty?
  end

  ids_by_language = LANGUAGES.to_h { |language| [language, {}] }

  expected_names.each do |name|
    documents = LANGUAGES.to_h do |language|
      path = files_by_language.fetch(language)[name]
      next [language, nil] unless path

      begin
        [language, front_matter(path)]
      rescue StandardError => error
        errors << "#{path.relative_path_from(ROOT)}: #{error.message}"
        [language, nil]
      end
    end
    next if documents.values.any?(&:nil?)

    documents.each do |language, data|
      page_id = data["page_id"]
      errors << "#{collection}/#{language}/#{name} has no page_id" if page_id.nil? || page_id.to_s.empty?
      if page_id && ids_by_language.fetch(language).key?(page_id)
        errors << "#{collection}/#{language} repeats page_id #{page_id.inspect}"
      end
      ids_by_language.fetch(language)[page_id] = name if page_id
    end

    reference = documents.fetch(LANGUAGES.first)
    LANGUAGES.drop(1).each do |language|
      translated = documents.fetch(language)
      keys = %w[page_id layout]
      keys.concat(%w[importance category]) if collection == "_projects"
      keys.each do |key|
        next if reference[key] == translated[key]

        errors << "#{collection}/#{name} differs for structural key #{key}: " \
                  "#{LANGUAGES.first}=#{reference[key].inspect}, #{language}=#{translated[key].inspect}"
      end
    end
  end
end

string_shapes = LANGUAGES.to_h do |language|
  path = ROOT.join("_data", language, "strings.yml")
  data = YAML.safe_load(path.read, permitted_classes: [], aliases: false) || {}
  [language, hash_key_paths(data).sort]
end

reference_shape = string_shapes.fetch(LANGUAGES.first)
LANGUAGES.drop(1).each do |language|
  shape = string_shapes.fetch(language)
  missing = reference_shape - shape
  extra = shape - reference_shape
  errors << "_data/#{language}/strings.yml is missing keys: #{missing.join(', ')}" unless missing.empty?
  errors << "_data/#{language}/strings.yml has extra keys: #{extra.join(', ')}" unless extra.empty?
end

zone_files = Dir.glob(ROOT.join("**", "*:Zone.Identifier"), File::FNM_DOTMATCH).reject do |path|
  relative = Pathname(path).relative_path_from(ROOT).to_s
  relative.start_with?(".git/", "_site/", "vendor/")
end
errors << "Windows metadata files remain: #{zone_files.join(', ')}" unless zone_files.empty?

forbidden_demo_paths = [
  ".dockerignore",
  "Dockerfile",
  "docker-compose.yml",
  "docker-compose-slim.yml",
  "_bibliography/excluded.bib",
  "_data/en/cv.yml",
  "_data/zh/cv.yml",
  "_pages/books.md",
  "assets/audio",
  "assets/bibliography/2018-12-22-distill.bib",
  "assets/html/relativity.html",
  "assets/img/book_covers",
  "assets/img/flags",
  "assets/img/publication_preview/brownian-motion.gif",
  "assets/img/publication_preview/wave-mechanics.gif",
  "assets/img/template_error.png",
  "assets/json/resume_en-us.json",
  "assets/json/resume_pt-br.json",
  "assets/json/table_data.json",
  "assets/video",
  "assets/jupyter/blog.ipynb",
  "assets/plotly/demo.html",
  "bin/deploy",
  "bin/entry_point.sh",
  "lighthouse_results",
]

forbidden_demo_paths.each do |relative|
  path = ROOT.join(relative)
  restored = path.file? || (path.directory? && Dir.glob(path.join("**", "*")).any? { |entry| File.file?(entry) })
  errors << "Removed demo path was restored: #{relative}" if restored
end

if errors.empty?
  puts "Content contract passed for #{COLLECTIONS.length} bilingual collections."
else
  warn errors.join("\n")
  exit 1
end
