# based on https://distresssignal.org/busting-css-cache-with-jekyll-md5-hash
# https://gist.github.com/BryanSchuetz/2ee8c115096d7dd98f294362f6a667db
module Jekyll
  module CacheBust
    class CacheDigester
      require 'digest/md5'

      attr_accessor :file_name, :source_paths

      def initialize(file_name:, source_paths: nil)
        self.file_name = file_name
        self.source_paths = source_paths
      end

      def digest!
        [file_name, '?', Digest::MD5.hexdigest(source_contents)].join
      end

      private

      def source_contents
        paths = resolved_source_paths
        return File.binread(paths.fetch(0)) unless source_paths

        paths.map do |path|
          # Include each Sass path as well as its contents so partial moves and
          # renames invalidate the compiled stylesheet cache deterministically.
          [path, File.binread(path)].join("\0")
        end.join("\0")
      end

      def resolved_source_paths
        return Array(source_paths).sort if source_paths

        asset_index = file_name.index('assets/')
        raise ArgumentError, "cache-busted path must contain assets/: #{file_name}" unless asset_index

        [file_name.slice(asset_index..-1)]
      end
    end

    def bust_file_cache(file_name)
      CacheDigester.new(file_name: file_name).digest!
    end

    def bust_css_cache(file_name)
      sass_sources = ['assets/css/main.scss', *Dir['_sass/**/*.scss']]
      CacheDigester.new(file_name: file_name, source_paths: sass_sources).digest!
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBust)
