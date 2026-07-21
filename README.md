# zhongxuanwu.github.io

This repository contains the source for my personal academic website, [zhongxuanwu.github.io](https://zhongxuanwu.github.io/). It is a bilingual Jekyll site for presenting my profile, publications, research projects, news, and professional service.

## Reuse this template

The repository is ready to build and deploy as a GitHub Pages site. Before publishing a copy, replace all personal content, contact details, external account IDs, and analytics settings described below.

### 1. Create your repository

Fork this repository, or clone it into a repository that you control:

```bash
git clone https://github.com/<your-github-username>/<your-repository>.git
cd <your-repository>
```

For a GitHub user site, name the repository `<your-github-username>.github.io`; the site will be served from the domain root. This is the simplest option because this repository currently uses a blank `baseurl` and includes some root-relative links.

For a project site, set `url` to your GitHub Pages origin and `baseurl` to `/<your-repository>` in `_config.yml`. Also audit authored links that begin with `/` and adapt the route-based tests, because those paths currently assume a root site.

### 2. Install prerequisites and dependencies

The supported local environment is WSL2. Install Git, ImageMagick, and the following exact runtimes before running the setup script:

- Ruby 3.2.3
- Node.js 18.19.1 with npm
- Python 3.12.3 with pip and `venv` support

The required versions are recorded in `.ruby-version`, `.nvmrc`, and `.python-version` for version managers such as rbenv, nvm, and pyenv. Docker is not part of the supported workflow.

Install all repository-managed dependencies:

```bash
./bin/setup
```

The script installs Bundler 4.0.4 and the Ruby gems, creates `.venv` and installs the Python packages, installs the locked npm packages, and downloads Playwright's Chromium build. On a minimal WSL2 installation, install Chromium's system libraries if the validation suite reports a missing shared library:

```bash
sudo npx playwright install-deps chromium
```

### 3. Run the site locally

Start the bilingual development server with live reload:

```bash
./bin/dev
```

Open <http://localhost:4000>. Extra Jekyll options can be passed through the script, for example `./bin/dev --host 0.0.0.0`.

The build scripts merge `_config.yml`, `_config.features.yml`, and `_config.libraries.yml` in that order. Use the scripts in `bin/` instead of invoking Jekyll directly.

### 4. The repository architecture

| Path                               | Purpose                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| `_config.yml`                      | Site identity, URL, languages, collections, and core Jekyll settings           |
| `_config.features.yml`             | Theme, analytics, comments, publication, and optional feature settings         |
| `_config.libraries.yml`            | Third-party front-end library versions and URLs                                |
| `_pages/{en,zh}/`                  | Main pages, navigation metadata, and translated page content                   |
| `_projects/{en,zh}/`               | Project collection entries                                                     |
| `_news/{en,zh}/`                   | News collection entries                                                        |
| `_bibliography/papers.bib`         | Publication records rendered by Jekyll Scholar                                 |
| `_data/`                           | Social links, venue metadata, and localized interface strings                  |
| `assets/`                          | Images, stylesheets, fonts, JavaScript, and other static files                 |
| `_layouts/`, `_includes/`          | Liquid page layouts and reusable components                                    |
| `_sass/`, `_plugins/`, `_scripts/` | Theme styles and custom build behavior                                         |
| `bin/`, `scripts/`                 | Setup, development, production build, and validation automation                |
| `test/`, `tests/`                  | Ruby/content contracts and Playwright browser, visual, and accessibility tests |
| `.github/workflows/`               | GitHub Actions build, deployment, and optional citation-update workflows       |
| `_site/`                           | Generated production output; it is ignored by Git                              |

Dependencies are declared in `Gemfile`/`Gemfile.lock`, `package.json`/`package-lock.json`, and `requirements.txt`.

### 5. Replace the example identity and content

At minimum, review these files and directories:

1. Edit `_config.yml` to set your name, language-specific profile, email, usernames, profile image, `url`, and `baseurl`.
2. Edit `_config.features.yml` to set the Jekyll Scholar author names and review every optional integration. Replace the existing Google Analytics measurement ID or set `enable_google_analytics: false`.
3. Replace the account details in `_data/socials.yml` and the translations in `_data/en/strings.yml` and `_data/zh/strings.yml`.
4. Replace the biography, navigation, and other page content in `_pages/en/` and `_pages/zh/`.
5. Replace the entries in `_projects/`, `_news/`, and `_bibliography/papers.bib`.
6. Replace personal images in `assets/img/`, including the profile image and publication previews. Adjust styles in `_sass/` or `assets/css/` only if the theme itself needs to change.
7. Optionally rename the npm package in `package.json`.

The bilingual content validator expects matching filenames under the `en` and `zh` directories in `_pages`, `_projects`, and `_news`. Each translated pair must have the same `page_id` and `layout`; project pairs must also share `importance` and `category`. The two localized `strings.yml` files must contain the same key structure. If you change or remove a language, update `_config.yml`, `scripts/validate_content.rb`, and the Playwright tests together.

Before publishing, search the repository for any remaining names, domains, email addresses, analytics IDs, or external profile IDs belonging to the original site owner.

### 6. Build and validate

Create a clean production build:

```bash
./bin/build
```

The generated site is written to `_site/`. The build purges unused CSS and removes duplicate localized responsive images.

Run the complete validation suite:

```bash
./bin/check
```

This checks formatting and bilingual content, builds the site, verifies routes and internal links, and runs Playwright functional, visual-regression, and accessibility tests.

Some validations intentionally describe this website's current content and routes. After replacing the content, update `test/fixtures/site_contract.yml`, the route and accessibility expectations in `tests/site.spec.js`, and the visual snapshots in `tests/site.spec.js-snapshots/`. After reviewing the new pages, refresh the visual snapshots with:

```bash
npx playwright test --grep @visual --update-snapshots
```

The deployment workflow runs the production build but does not require the full local validation suite.

### 7. Deploy with GitHub Pages

The workflow in `.github/workflows/ci.yml` builds pull requests and pushes to `main`. A successful push to `main` publishes `_site/` to the `gh-pages` branch.

To deploy a reused copy:

1. Confirm `url` and `baseurl` in `_config.yml`.
2. In the repository's GitHub Pages settings, serve the `gh-pages` branch from its root.
3. Ensure GitHub Actions is enabled and can write repository contents.
4. Push the customized site to `main`, then monitor the **Build and deploy** workflow.

The separate **Citation** workflow is optional and manually triggered. It requires `GOOGLE_SCHOLAR_ID` and `TOKEN` secrets and force-pushes generated citation data to a `gs` branch; it is not needed for normal site deployment.

## References

- [multi-language-al-folio](https://github.com/george-gca/multi-language-al-folio), the multilingual theme this site is based on
- [al-folio](https://github.com/alshedivat/al-folio), the upstream academic portfolio theme
- [Jekyll](https://jekyllrb.com/), the static-site generator
- [Jekyll Polyglot](https://github.com/untra/polyglot), the multilingual Jekyll plugin
- [GitHub Pages](https://docs.github.com/en/pages), the deployment platform

The template code is available under the [MIT License](LICENSE). Please keep the license and upstream attribution when reusing it, and replace the current owner's personal text, publication data, and media with your own.
