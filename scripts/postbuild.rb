#!/usr/bin/env ruby

require "fileutils"
require "pathname"
require "yaml"

root = Pathname(__dir__).join("..").expand_path
site_dir = Pathname(ARGV.fetch(0, "_site")).expand_path
config = YAML.safe_load(root.join("_config.yml").read, permitted_classes: [], aliases: false)
languages = Array(config.fetch("languages"))
default_language = config.fetch("default_lang")

unless site_dir.join("index.html").file?
  warn "Refusing to post-process a directory without index.html: #{site_dir}"
  exit 1
end

removed = 0

(languages - [default_language]).each do |language|
  localized_image_root = site_dir.join(language, "assets", "img")
  next unless localized_image_root.directory?

  Dir.glob(localized_image_root.join("**", "*-*.webp")).sort.each do |localized_path|
    localized_file = Pathname(localized_path)
    relative_image = localized_file.relative_path_from(localized_image_root)
    shared_file = site_dir.join("assets", "img", relative_image)
    next unless shared_file.file?
    next unless FileUtils.compare_file(localized_file, shared_file)

    FileUtils.rm_f(localized_file)
    removed += 1
  end

  Dir.glob(localized_image_root.join("**", "*")).sort.reverse_each do |path|
    FileUtils.rmdir(path) if File.directory?(path) && Dir.empty?(path)
  rescue SystemCallError
    # A non-empty directory is expected when it also contains source images.
  end
end

puts "Removed #{removed} duplicate localized responsive image(s)."
