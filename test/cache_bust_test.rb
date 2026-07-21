require "digest/md5"
require "liquid"
require "minitest/autorun"

require_relative "../_plugins/cache-bust"

class CacheBustTest < Minitest::Test
  def test_main_css_digest_includes_entrypoint_and_all_sass_sources
    sources = ["assets/css/main.scss", *Dir["_sass/**/*.scss"]].sort
    contents = sources.map { |path| [path, File.binread(path)].join("\0") }.join("\0")
    expected = "/assets/css/main.css?#{Digest::MD5.hexdigest(contents)}"

    filter = Object.new.extend(Jekyll::CacheBust)
    assert_equal expected, filter.bust_css_cache("/assets/css/main.css")
    refute_match(/\?d41d8cd98f00b204e9800998ecf8427e\z/, expected)
  end

  def test_static_asset_digest_uses_file_contents
    path = "/assets/js/common.js"
    expected = "#{path}?#{Digest::MD5.hexdigest(File.binread(path.delete_prefix('/')))}"

    filter = Object.new.extend(Jekyll::CacheBust)
    assert_equal expected, filter.bust_file_cache(path)
  end
end
