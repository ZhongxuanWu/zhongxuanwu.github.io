
const currentUrl = window.location.href;
const siteUrl = "https://zhongxuanwu.github.io"; 
let updatedUrl = currentUrl.replace("https://zhongxuanwu.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("".length > 0) {
  updatedUrl = updatedUrl.replace("/", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation menu",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-services",
          title: "services",
          description: "",
          section: "Navigation menu",
          handler: () => {
            window.location.href = "/services/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "news-my-hippocampal-replay-project-was-presented-in-natural-environments-tasks-and-intelligence-workshop-neti-2025",
          title: 'My hippocampal replay project was presented in Natural Environments, Tasks, and Intelligence Workshop...',
          description: "",
          section: "News",},{id: "news-my-homepage-zhongxuanwu-github-io-was-successfully-deployed-on-github-pages",
          title: 'My homepage zhongxuanwu.github.io was successfully deployed on Github Pages.',
          description: "",
          section: "News",},{id: "news-my-hippocampal-replay-project-was-presented-in-society-for-neuroscience-annual-meeting-sfn-2025",
          title: 'My hippocampal replay project was presented in Society for Neuroscience Annual Meeting (SfN)...',
          description: "",
          section: "News",},{id: "news-my-homepage-has-a-new-look-now-moving-from-minimallight-to-multi-language-al-folio-based-on-the-customization-from-hao-zhang-s-homepage",
          title: 'My homepage has a new look now, moving from MinimalLight to multi-language-al-folio, based...',
          description: "",
          section: "News",},{id: "projects-single-trial-decision-variable-dynamics-in-frontal-eye-field",
          title: 'Single-Trial Decision Variable Dynamics in Frontal Eye Field',
          description: "Testing ramping vs stepping hypotheses with HMMs and latent manifolds in macaque FEF",
          section: "Projects",handler: () => {
              window.location.href = "/projects/en/fef_dv/";
            },},{id: "projects-interpretable-switching-state-space-models-for-hippocampal-replay",
          title: 'Interpretable Switching State-Space Models for Hippocampal Replay',
          description: "Characterizing spatiotemporal structure of sharp-wave ripple replay with drift–diffusion dynamics",
          section: "Projects",handler: () => {
              window.location.href = "/projects/en/hippocampal_replay/";
            },},{id: "projects-poisson-identifiable-vae-for-neural-manifold-geometry",
          title: 'Poisson Identifiable VAE for Neural Manifold Geometry',
          description: "Robust, identifiable latent-variable modeling to quantify geometry and topology of neural representations",
          section: "Projects",handler: () => {
              window.location.href = "/projects/en/manifold/";
            },},{
        id: 'social-email',
        title: 'Send an email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%7A%68%6F%6E%67%78%75%61%6E%6A%65%73%73%65%77%75@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=mm1AGEkAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
          id: 'lang-zh',
          title: 'zh',
          section: 'Languages',
          handler: () => {
            window.location.href = "/zh" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
