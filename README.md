# Personal Website

This repository contains the source code for my personal website.

## Supported development environment

The supported local environment is WSL2. The repository pins the toolchain used by local development and CI:

- Ruby 3.2.3 and Bundler 4.0.4
- Node.js 18.19.1
- Python 3.12.3 and nbconvert 6.5.3

Install Ruby, Node.js, Python with `pip` and `venv` support, and ImageMagick in WSL2. Version managers such as `rbenv`, `nvm`, and `pyenv` will read the version files in this repository. Docker is not part of the supported workflow.

## Setup and development

Install all repository-managed dependencies and the Chromium build used by the site tests:

```bash
./bin/setup
```

On a minimal WSL2 installation, Chromium may also need its system libraries. Install them once after setup with `sudo npx playwright install-deps chromium` if `./bin/check` reports a missing shared library.

Start the multilingual development server with live reload:

```bash
./bin/dev
```

The server is available at <http://localhost:4000>. Extra Jekyll options can be passed to the script, for example `./bin/dev --host 0.0.0.0`.

## Build and validation

Create the production site, purge unused CSS, and run the post-build normalization:

```bash
./bin/build
```

Run the complete validation suite used by CI, including formatting, content contracts, the production build, internal-link checks, visual regression tests, and accessibility tests:

```bash
./bin/check
```

The visual snapshots preserve the current English and Chinese presentation across desktop/mobile and light/dark modes. The accessibility check uses the current site as its baseline and fails on new serious or critical violations.

The generated site is written to `_site/`. The build scripts merge `_config.yml`, `_config.features.yml`, and `_config.libraries.yml` in that order; use the scripts rather than invoking Jekyll directly.

## Credits

- Customized from [Hao Zhang's website](https://haozhangcn.github.io/).
- Upstream templates:
  - [multi-language-al-folio](https://github.com/george-gca/multi-language-al-folio)
  - [al-folio](https://github.com/alshedivat/al-folio)
