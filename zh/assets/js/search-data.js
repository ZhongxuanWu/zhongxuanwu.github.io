
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
          section: "新闻",},{id: "news-重新搭建个人主页-主题从minimallight更换为multi-language-al-folio",
          title: '重新搭建个人主页。主题从MinimalLight更换为multi-language-al-folio。',
          description: "",
          section: "新闻",},{id: "news-我们的论文-drift-diffusion-dynamics-of-hippocampal-replay-已被-plos-computational-biology-接收发表",
          title: '我们的论文 Drift-diffusion dynamics of hippocampal replay 已被 PLOS Computational Biology 接收发表！',
          description: "",
          section: "新闻",},{id: "news-我们的论文-drift-diffusion-dynamics-of-hippocampal-replay-入选-plos-computational-biology-2026-年-9-月刊封面",
          title: '我们的论文 Drift-diffusion dynamics of hippocampal replay 入选 PLOS Computational Biology 2026 年 9...',
          description: "",
          section: "新闻",},{id: "projects-视觉决策中的神经群体动力学",
          title: '视觉决策中的神经群体动力学',
          description: "研究猕猴额叶眼区在视觉决策过程中的渐进式与阶跃式活动变化",
          section: "项目",handler: () => {
              window.location.href = "/zh/projects/zh/fef_dv/";
            },},{id: "projects-海马重放的统计模型",
          title: '海马重放的统计模型',
          description: "刻画海马尖波涟漪事件中重放的空间轨迹及其随时间的变化",
          section: "项目",handler: () => {
              window.location.href = "/zh/projects/zh/hippocampal_replay/";
            },},{id: "projects-神经群体活动几何结构的统计模型",
          title: '神经群体活动几何结构的统计模型',
          description: "运用可辨识的统计模型研究神经表征的几何与拓扑结构",
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
