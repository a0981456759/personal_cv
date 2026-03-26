export const personalInfo = {
  name: "Panda Tseng",
  title: "營運管理 | 軟體開發",
  tagline: "用營運思維做產品，用工程能力解決問題",
  avatar: "/avatar.png",
  bio: "橫跨營運管理與軟體開發的跨界工作者，擅長將技術能力轉化為營運效率，在 Web3 產業累積了從工程到團隊管理的完整經驗。",
  location: "台灣",
};

export const about = {
  headline: "關於我",
  description: [
    "你好！我是來自台灣的 Panda Tseng，一位橫跨營運管理與軟體開發的跨界工作者。",
    "擁有資訊管理碩士背景與全端開發經驗，自 2017 年起深耕 Web3 產業，從工程師一路走到營運管理，擅長用技術思維優化團隊運作與產品流程。",
    "曾在 TONX 擔任 People & Ops Lead，同時持續透過 WalkinCat 走路貓分享 AI、生產力工具與 Web3 相關內容。",
  ],
  highlights: [
    "前 TONX People & Ops Lead，統籌團隊運作與財務會計",
    "全端開發者，具備 iOS、後端及區塊鏈整合經驗",
    "多項區塊鏈與 iOS 競賽獎項，包括國際區塊鏈奧林匹亞亞軍",
  ],
};

export const experiences = [
  {
    company: "TONX",
    position: "People & Ops Lead",
    period: "2025/07 - 2025/12",
    location: "混合型",
    description: "負責 TONX 的人員與營運管理，統籌團隊運作與財務會計工作。",
    achievements: [
      "管理公司營運與人員發展",
      "處理財務會計與預算規劃",
      "優化營運流程與團隊協作",
    ],
    tags: ["營運管理", "會計", "人員管理", "團隊領導"],
  },
  {
    company: "TONX",
    position: "Operations",
    period: "2023/07 - 2025/06",
    location: "現場",
    description: "負責 TONX 的日常營運管理與內容行銷策略規劃。",
    achievements: [
      "執行營運管理與流程優化",
      "規劃並執行內容行銷策略",
      "協調跨部門專案與資源整合",
    ],
    tags: ["營運管理", "內容行銷", "專案管理", "策略規劃"],
  },
  {
    company: "WalkinCat 走路貓",
    position: "Co-Founder / 自媒體內容創作者",
    period: "2020/07 - 現在",
    location: "台灣台北 · 遠端",
    description: "經營 WalkinCat 走路貓自媒體，主要活躍於 Instagram，分享 AI、生產力工具與 Web3 相關內容。",
    achievements: [
      "創作 AI 與生產力工具相關內容",
      "分享 Web3 與區塊鏈深度見解",
      "建立活躍的社群互動",
    ],
    tags: ["內容行銷", "行銷策略", "自媒體", "Web3"],
  },
  {
    company: "Taiwan Blockchain Academia 台灣區塊鏈大學聯盟",
    position: "監事",
    period: "2019/06 - 現在",
    location: "台灣",
    description: "擔任台灣區塊鏈大學聯盟監事，參與組織治理與區塊鏈教育推廣。",
    achievements: [
      "參與聯盟治理與決策",
      "推動區塊鏈教育與學術交流",
      "連結產學資源與合作機會",
    ],
    tags: ["區塊鏈", "教育", "組織治理", "產學合作"],
  },
  {
    company: "WOO Network",
    position: "市場推廣",
    period: "2021/09 - 2022/02",
    location: "遠端",
    description: "負責 WOO Network DeFi 產品的市場策略與市場拓展。",
    achievements: [
      "制定並執行市場推廣策略",
      "管理社群成長與互動",
      "協調國際團隊進行產品發布",
    ],
    tags: ["行銷", "DeFi", "策略", "社群"],
  },
  {
    company: "YuStar Limit",
    position: "全端工程師",
    period: "2018/09 - 2020/05",
    location: "台灣",
    description: "專注於網頁與行動應用程式的全端開發，並整合區塊鏈技術。",
    achievements: [
      "開發全端網頁應用程式",
      "打造 iOS 行動應用程式",
      "將區塊鏈技術整合至產品中",
    ],
    tags: ["全端", "iOS", "區塊鏈", "開發"],
  },
  {
    company: "DEXON",
    position: "校園大使",
    period: "2019/02 - 2019/06",
    location: "台灣",
    description: "在大學推廣 DEXON 區塊鏈技術並舉辦教育活動。",
    achievements: [
      "舉辦區塊鏈工作坊與研討會",
      "建立大學區塊鏈社群",
      "教育學生關於區塊鏈技術",
    ],
    tags: ["區塊鏈", "教育", "社群", "大使"],
  },
  {
    company: "EduVator Ltd",
    position: "後端實習生",
    period: "2017/07 - 2017/09",
    location: "台灣",
    description: "後端開發實習，專注於 API 設計與資料庫管理。",
    achievements: [
      "開發 RESTful API",
      "管理資料庫設計與優化",
      "與前端團隊協作整合",
    ],
    tags: ["後端", "API", "資料庫", "實習"],
  },
];

// Featured Projects - Real projects and products
export const projects = [
  {
    name: "Murmur Voice",
    description: "Privacy-first voice-to-text for macOS/Windows. Local Whisper (Metal/CUDA) or Groq cloud, with LLM post-processing.",
    image: "/projects/murmur.png",
    tags: ["Rust", "Tauri 2", "Whisper", "macOS"],
    link: "https://github.com/panda850819/murmur-voice",
    highlights: [
      "Built with Rust + Tauri 2",
      "Local processing with Metal/CUDA acceleration",
      "LLM post-processing pipeline",
    ],
  },
  {
    name: "Slack CLI",
    description: "CLI tool for searching and browsing Slack workspaces from the terminal.",
    image: "/projects/slack-cli.png",
    tags: ["TypeScript", "CLI", "Slack"],
    link: "https://github.com/panda850819/slack-cli",
    highlights: [
      "Terminal-first Slack interface",
      "Search messages and channels",
    ],
  },
  {
    name: "Notion CLI",
    description: "Manage Notion workspace from your terminal — search, query databases, and manage tasks.",
    image: "/projects/notion-cli.png",
    tags: ["TypeScript", "CLI", "Notion"],
    link: "https://github.com/panda850819/notion-cli",
    highlights: [
      "Full Notion API integration",
      "Database queries from terminal",
    ],
  },
  {
    name: "Skill Evolution",
    description: "Let Claude Code skills evolve by themselves through automated testing, scoring, and iteration.",
    image: "/projects/skill-evolution.png",
    tags: ["AI", "Claude Code", "Automation"],
    link: "https://github.com/panda850819/skill-evolution",
    highlights: [
      "Autonomous skill improvement",
      "Test-score-iterate pipeline",
    ],
  },
  {
    name: "WalkinCat 走路貓",
    description: "主要活躍於 Instagram 的自媒體品牌，分享 AI、生產力工具與 Web3 領域的深度內容。",
    image: "/projects/walkincat.png",
    tags: ["自媒體", "Instagram", "內容創作"],
    link: "#",
    highlights: [
      "營運超過 4 年",
      "專注 AI、生產力與 Web3 內容",
    ],
  },
  {
    name: "Portfolio Tracker",
    description: "Investment portfolio tracking system with Next.js frontend and Google Apps Script backend.",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "Google Apps Script", "Finance"],
    link: "https://github.com/panda850819/portfolio-tracker",
    highlights: [
      "Real-time portfolio tracking",
      "Automated data collection",
    ],
  },
];

export const skills = [
  {
    category: "Blockchain & Web3",
    items: [
      { name: "Blockchain Technology", level: 95 },
      { name: "Cryptography", level: 90 },
      { name: "DeFi Protocols", level: 88 },
      { name: "Smart Contracts", level: 85 },
      { name: "Web3 Integration", level: 90 },
    ],
  },
  {
    category: "Development",
    items: [
      { name: "Full-Stack Development", level: 92 },
      { name: "iOS Development", level: 88 },
      { name: "Backend Development", level: 90 },
      { name: "API Design", level: 87 },
      { name: "Database Management", level: 85 },
    ],
  },
  {
    category: "Business & Marketing",
    items: [
      { name: "Go-to-Market Strategy", level: 90 },
      { name: "Community Building", level: 92 },
      { name: "Product Management", level: 88 },
      { name: "Entrepreneurship", level: 95 },
      { name: "Trading", level: 85 },
    ],
  },
  {
    category: "Tools & Productivity",
    items: [
      { name: "Project Management", level: 88 },
      { name: "Productivity Tools", level: 92 },
      { name: "Team Collaboration", level: 90 },
      { name: "Agile/Scrum", level: 85 },
      { name: "Documentation", level: 87 },
    ],
  },
];

export const socialLinks = {
  email: "panda@walkincat.org",
  telegram: "https://t.me/FinalFantasty",
  twitter: "https://x.com/pandazeng1",
  linkedin: "https://www.linkedin.com/in/wei-chieh-tseng-369303161/",
  github: "https://github.com/panda850819",
  medium: "https://medium.com/@kiss851990",
  blog: "https://blog.pdzeng.com",
};

export const footer = {
  copyright: "© 2025 Panda Tseng. All rights reserved.",
  builtWith: "Powered by Next.js · Styled like a terminal · Not actually a terminal",
};

// Education data (can be added to a separate section if needed)
export const education = [
  {
    school: "國立高雄科技大學",
    degree: "碩士",
    major: "資訊管理",
    period: "2018/09 - 2020/06",
    location: "高雄，台灣",
  },
  {
    school: "國立高雄科技大學",
    degree: "學士",
    major: "資訊管理",
    period: "2014/09 - 2018/06",
    location: "高雄，台灣",
  },
];

// Competition achievements (can be displayed in a separate section if needed)
export const achievements = [
  {
    category: "金融科技與區塊鏈",
    awards: [
      {
        title: "亞軍",
        competition: "BTSC 京台青年創新創業大賽",
        location: "台中市",
        year: "2019",
      },
      {
        title: "亞軍",
        competition: "International Blockchain Olympiad",
        location: "香港",
        year: "2019",
      },
      {
        title: "冠軍",
        competition: "第六屆清華創業競賽區塊鏈組",
        location: "新竹市",
        year: "2019",
        link: "https://www.facebook.com/NTUSTBlockchain/photos/a.336216477026408/360878014560254/",
      },
      {
        title: "第三名",
        competition: "海洋三創 創新創業競賽",
        location: "高雄市",
        year: "2018",
      },
      {
        title: "佳作",
        competition: "國立高雄科技大學 Fintech",
        location: "高雄市",
        year: "2018",
      },
    ],
  },
  {
    category: "iOS 開發",
    awards: [
      {
        title: "冠軍",
        competition: "APP 移動應用創新賽 iOS 組",
        location: "台中市",
        year: "2018",
        link: "https://tw.appledaily.com/lifestyle/20180821/GGVD4CKP7H77M7KMIRTIY2A274/",
      },
      {
        title: "第三名",
        competition: "中國高校計算機大賽移動應用創新賽",
        location: "浙江省",
        year: "2018",
      },
    ],
  },
];
