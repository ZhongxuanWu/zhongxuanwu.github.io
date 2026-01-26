# Lab Website

This repository contains the source code for the lab website.

## Local Installation

### General instructions

Check the INSTALL.md from [multi-language-al-folio](https://github.com/george-gca/multi-language-al-folio/blob/main/INSTALL.md).

### Tested environment

- **Working:** WSL2 (without Docker)
- **Not working:** Windows 11 (with or without Docker)

### Prerequisites

Install the following in the WSL2 environment:

- Node.js + npm
- Ruby
- Bundler
- ImageMagick
- Jupyter

### Install & run

```bash
# Install Ruby dependencies
bundle config set --local path 'vendor/bundle'
bundle install

# Serve locally
bundle exec jekyll serve --livereload

# Clean build artifacts
bundle exec jekyll clean
```

## Credits

- Customized from [Hao Zhang's website](https://haozhangcn.github.io/).
- Upstream templates:
  - [multi-language-al-folio](https://github.com/george-gca/multi-language-al-folio)
  - [al-folio](https://github.com/alshedivat/al-folio)