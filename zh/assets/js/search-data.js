
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
        },{id: "news-我的hippocampal-replay项目已在2025年natural-environments-tasks-and-intelligence-workshop上展示",
          title: '我的hippocampal replay项目已在2025年Natural Environments, Tasks, and Intelligence Workshop上展示。',
          description: "",
          section: "新闻",},{id: "news-我的个人主页zhongxuanwu-github-io成功部署在github-pages",
          title: '我的个人主页zhongxuanwu.github.io成功部署在Github Pages.',
          description: "",
          section: "新闻",},{id: "news-我的hippocampal-replay项目已在2025年神经科学学会年会上展示",
          title: '我的hippocampal replay项目已在2025年神经科学学会年会上展示。',
          description: "",
          section: "新闻",},{id: "news-重新搭建个人主页-主题从minimallight更换为multi-language-al-folio-参考hao-zhang的个人主页进行个性化定制",
          title: '重新搭建个人主页。主题从MinimalLight更换为multi-language-al-folio。参考Hao Zhang的个人主页进行个性化定制.',
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
