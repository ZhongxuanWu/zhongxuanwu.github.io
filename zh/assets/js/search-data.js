
const currentUrl = window.location.href;
const siteUrl = "https://zhongxuanwu.github.io"; 
let updatedUrl = currentUrl.replace("https://zhongxuanwu.github.io", "");
if (currentUrl.length == updatedUrl.length && currentUrl.startsWith("http://127.0.0.1")) {
  const otherSiteUrl = siteUrl.replace("localhost", "127.0.0.1");
  updatedUrl = currentUrl.replace(otherSiteUrl + "", "");
}
if ("zh".length > 0) {
  updatedUrl = updatedUrl.replace("/zh", "");
}
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-关于",
    title: "关于",
    section: "导航菜单",
    handler: () => {
      window.location.href = "/zh/";
    },
  },{id: "nav-文章",
          title: "文章",
          description: "",
          section: "导航菜单",
          handler: () => {
            window.location.href = "/zh/publications/";
          },
        },{id: "nav-项目",
          title: "项目",
          description: "",
          section: "导航菜单",
          handler: () => {
            window.location.href = "/zh/projects/";
          },
        },{id: "nav-社会服务及个人荣誉",
          title: "社会服务及个人荣誉",
          description: "",
          section: "导航菜单",
          handler: () => {
            window.location.href = "/zh/services/";
          },
        },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "文章",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "文章",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "news-个人主页完成重构-同时支持中文和英文",
          title: '🎉🎉🎉 个人主页完成重构，同时支持中文和英文.',
          description: "",
          section: "新闻",},{id: "projects-single-trial-decision-variable-dynamics-in-frontal-eye-field",
          title: 'Single-Trial Decision Variable Dynamics in Frontal Eye Field',
          description: "Testing ramping vs stepping hypotheses with HMMs and latent manifolds in macaque FEF",
          section: "项目",handler: () => {
              window.location.href = "/zh/projects/zh/fef_dv/";
            },},{id: "projects-interpretable-switching-state-space-models-for-hippocampal-replay",
          title: 'Interpretable Switching State-Space Models for Hippocampal Replay',
          description: "Characterizing spatiotemporal structure of sharp-wave ripple replay with drift–diffusion dynamics",
          section: "项目",handler: () => {
              window.location.href = "/zh/projects/zh/hippocampal_replay/";
            },},{id: "projects-poisson-identifiable-vae-for-neural-manifold-geometry",
          title: 'Poisson Identifiable VAE for Neural Manifold Geometry',
          description: "Robust, identifiable latent-variable modeling to quantify geometry and topology of neural representations",
          section: "项目",handler: () => {
              window.location.href = "/zh/projects/zh/manifold/";
            },},{
        id: 'social-email',
        title: '发送邮件',
        section: '社交链接',
        handler: () => {
          window.open("mailto:%7A%68%6F%6E%67%78%75%61%6E%6A%65%73%73%65%77%75@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: '社交链接',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: '社交链接',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=mm1AGEkAAAAJ", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: '社交链接',
        handler: () => {
          window.open("https://www.alberteinstein.com/", "_blank");
        },
      },{
          id: 'lang-en',
          title: 'en',
          section: '语言',
          handler: () => {
            window.location.href = "" + updatedUrl;
          },
        },{
      id: 'light-theme',
      title: '浅色模式',
      description: '切换到浅色模式',
      section: '主题设置',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: '深色模式',
      description: '切换到深色模式',
      section: '主题设置',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: '系统默认',
      description: '使用系统默认主题',
      section: '主题设置',
      handler: () => {
        setThemeSetting("system");
      },
    },];
