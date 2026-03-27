export type Lang = "en" | "zh";

const content = {
  en: {
    personalInfo: {
      name: "Howard Wang",
      title: "Full-Stack Engineer | Web3 & AI",
      tagline: "Engineering × Web3 × Quantitative Trading — rare composite",
      avatar: "/avatar.png",
      bio: "Full-stack engineer with deep roots in Web3, AI/LLM integration, and quantitative trading. Master's from University of Melbourne (Distributed Systems & ML). 7+ years active trading across FX, gold, and crypto derivatives.",
      location: "Melbourne, VIC, Australia",
    },
    about: {
      headline: "About Me",
      description: [
        "Hi! I'm Howard Wang (Chenhsuan Wang), a full-stack engineer based in Melbourne with an unusual combination of skills: production-grade software engineering, deep Web3/DeFi experience, and 7+ years of active quantitative trading.",
        "I hold a Master of Information Technology from the University of Melbourne (Distributed Systems & ML specialisation), and previously a Master of Engineering from NTUST where I built an early computer-vision safety system using YOLOv3.",
        "I've built AI pipelines with Claude, OpenAI, Gemini, and Mistral; shipped NFT platform backends handling $500K+/month; led BD deals for a BNB Chain DeFi protocol; and self-built trading bots running live on MT5 across FX, XAUUSD, and crypto derivatives.",
      ],
      highlights: [
        "Full-stack: TypeScript/React/Next.js · Node.js · FastAPI · Spring Boot · PostgreSQL · Redis",
        "AI/LLM: Claude API · OpenAI · Gemini · Mistral · BERT fine-tuning · RAG · n8n automation",
        "Web3 & Trading: DeFi BD (ListaDAO) · on-chain analytics · MT5 automated trading bot · Pine Script",
      ],
    },
    experiences: [
      {
        company: "XDO Agency · ListaDAO · BackPack",
        position: "Web3 Strategy & BD",
        period: "2025/09 - 2026/01",
        location: "Remote",
        description: "Multi-role Web3 engagement: BD for ListaDAO (BNB Chain DeFi), GTM strategy for XDO agency clients, and DeFi partnership development for BackPack exchange.",
        achievements: [
          "Closed 5 DeFi protocol integrations for ListaDAO — full BD cycle from outreach to contract",
          "Analysed 10K+ wallets via on-chain data to drive UI/UX improvements",
          "Executed bilingual EN/ZH GTM strategy for clients including FDUSD",
          "Led strategic DeFi partnerships for BackPack to accelerate ecosystem TVL growth",
        ],
        tags: ["BD", "DeFi", "On-chain Analytics", "GTM", "BNB Chain", "TVL"],
      },
      {
        company: "V Tech",
        position: "Frontend Engineering Intern",
        period: "2024/11 - 2025/02",
        location: "Melbourne, AU",
        description: "University tools service provider serving University of Melbourne — built React dashboards and WordPress plugins for 5,000+ university users.",
        achievements: [
          "Developed React responsive data visualisation dashboards for 5,000+ users",
          "Built custom WordPress plugin (PHP/JavaScript) bridging frontend and backend APIs",
          "Optimised MySQL queries — improved dashboard load time by 40%",
          "Collaborated with non-technical stakeholders and iterated rapidly in small eng team",
        ],
        tags: ["React", "JavaScript", "PHP", "WordPress", "MySQL", "Performance"],
      },
      {
        company: "Red Building Capital",
        position: "Blockchain Investment Researcher",
        period: "2021/10 - 2022/10",
        location: "Taipei, TW",
        description: "Crypto VC focused on DeFi investments — conducted due diligence and built financial models for token investments.",
        achievements: [
          "Evaluated 50+ crypto projects via tokenomics stress-testing and on-chain metrics",
          "Built token valuation models covering supply/demand dynamics, emission schedules, and market cycles",
          "Tracked portfolio performance with SQL dashboards and Dune Analytics on-chain analysis",
          "Identified cross-chain arbitrage opportunities and market efficiency gaps",
        ],
        tags: ["Tokenomics", "DeFi", "Dune Analytics", "Financial Modelling", "Due Diligence", "SQL"],
      },
      {
        company: "Star-Bit (NFT Platform)",
        position: "Backend Software Engineer",
        period: "2021/02 - 2021/09",
        location: "Taipei, TW",
        description: "High-concurrency NFT trading platform backend — designed APIs handling 10,000+ daily transactions.",
        achievements: [
          "Designed Node.js RESTful APIs handling 10,000+ daily transactions with <100ms latency",
          "Optimised PostgreSQL schema supporting 500 concurrent users for high-frequency ledger queries",
          "Implemented OAuth/JWT auth and payment gateway processing $500K+/month",
          "Built system risk controls and data integrity validation mechanisms",
        ],
        tags: ["Node.js", "PostgreSQL", "REST API", "OAuth", "JWT", "High-Concurrency", "NFT"],
      },
    ],
    projects: [
      {
        name: "ClawControl",
        description: "AI agent platform for ER specialist referral — MedHack 2026. One click: AI pulls FHIR patient data, finds on-call specialists, initiates contact, and creates a live shared case room with real-time call transcription via Open Claw.",
        tags: ["TypeScript", "Next.js", "Convex", "Open Claw", "FHIR", "AI Agent"],
        link: "https://github.com/a0981456759",
        highlights: [
          "Open Claw phone agent — real-time call transcription written back to Convex",
          "FHIR three-layer fallback query pipeline",
          "Async AI agent tracking long-running referral workflows",
        ],
      },
      {
        name: "ShadowSense",
        description: "AI Japanese pitch shadowing practice platform — Mistral AI Hackathon 2026. Records speech, analyses pitch curves with librosa + DTW vs VOICEVOX reference, Mistral AI generates personalised feedback.",
        tags: ["FastAPI", "Next.js", "faster-whisper", "DTW", "Mistral AI", "Python"],
        link: "https://github.com/a0981456759",
        highlights: [
          "DTW pitch comparison algorithm with VOICEVOX TTS reference",
          "faster-whisper STT + librosa audio analysis pipeline",
          "Railway + Vercel dual-platform deployment",
        ],
      },
      {
        name: "PodDigest",
        description: "Self-hosted AI podcast digest service. Subscribes via RSS/iTunes/OPML, auto-transcribes with Whisper, summarises with Claude API, synthesises audio with OpenAI TTS, outputs private RSS feed playable in Apple Podcasts.",
        tags: ["Claude API", "Whisper", "FastAPI", "React", "Python", "RSS"],
        link: "https://github.com/a0981456759",
        highlights: [
          "Three-layer AI pipeline: Whisper → Claude → TTS",
          "ffmpeg audio chunking for episodes >25MB",
          "Private RSS feed generation for podcast apps",
        ],
      },
      {
        name: "Trading Strategy Bot",
        description: "Fully automated crypto trading signal system. Binance WebSocket live candles, pandas-ta multi-dimensional indicators (CVD, Wyckoff, funding rate, market microstructure), signal synthesis → Telegram push.",
        tags: ["Python", "Binance WebSocket", "PostgreSQL", "Redis", "Telegram", "Docker"],
        link: "https://github.com/a0981456759",
        highlights: [
          "Multi-dimensional signal composer: CVD + Wyckoff + funding rate",
          "Binance WebSocket persistent connection management",
          "Redis caching + PostgreSQL historical storage",
        ],
      },
      {
        name: "I-CiE Mi Telehealth",
        description: "Microservices mental health platform — multi-role scheduling REST API, Redis pub/sub WebRTC real-time video, Claude LLM API auto-generates structured medical summaries, MinIO storage. 70% DB query reduction via Redis caching.",
        tags: ["Spring Boot", "React", "WebRTC", "Redis", "Claude API", "Microservices"],
        link: "https://github.com/a0981456759",
        highlights: [
          "Claude API auto-generates structured medical summaries",
          "Redis pub/sub WebRTC for real-time video sessions",
          "70% DB query reduction via Redis caching — 1,000+ users",
        ],
      },
      {
        name: "YouTube Analyzer",
        description: "Auto-tracks YouTube channels, fetches subtitles, and analyses content with Gemini AI — generates summaries, highlights, and influence scores. APScheduler-driven, Telegram bot for new video notifications.",
        tags: ["Gemini API", "FastAPI", "React", "APScheduler", "Telegram", "Python"],
        link: "https://github.com/a0981456759",
        highlights: [
          "Gemini API multi-language content analysis (ZH/EN)",
          "AI Q&A conversation with any video",
          "APScheduler polling + Telegram notifications",
        ],
      },
      {
        name: "Cross-Chain Swap DApp",
        description: "Cross-chain token swap DApp using 1inch Fusion Plus protocol, Privy multi-wallet integration, Supabase swap history storage.",
        tags: ["Next.js", "TypeScript", "1inch", "Privy", "Supabase", "Web3"],
        link: "https://github.com/a0981456759",
        highlights: [
          "1inch Fusion Plus cross-chain protocol",
          "Privy multi-wallet integration",
          "Supabase swap history with AI-assisted features",
        ],
      },
      {
        name: "Climate Fact-Checker",
        description: "End-to-end NLP pipeline — BERT retrieves and verifies evidence from 1M+ document corpus. Hard-negative mining fine-tuning. 87% accuracy across SUPPORTS/REFUTES/DISPUTED/NOT_ENOUGH_INFO.",
        tags: ["BERT", "PyTorch", "NLP", "Python", "Transformers", "Fine-tuning"],
        link: "https://github.com/a0981456759",
        highlights: [
          "BERT fine-tuned with hard-negative mining",
          "1M+ document evidence corpus retrieval",
          "87% 4-class accuracy",
        ],
      },
    ],
    education: [
      {
        school: "University of Melbourne",
        degree: "Master of Information Technology",
        major: "Distributed Systems & Machine Learning",
        period: "2023/06 - 2025/12",
        location: "Melbourne, VIC, Australia",
      },
      {
        school: "National Taiwan University of Science and Technology",
        degree: "Master of Engineering",
        major: "Civil Engineering — Computer Vision & AI thesis",
        period: "2018/07 - 2020/07",
        location: "Taipei, Taiwan",
      },
      {
        school: "National Taipei University of Technology",
        degree: "Bachelor of Civil Engineering",
        major: "Civil Engineering",
        period: "2014/07 - 2018/07",
        location: "Taipei, Taiwan",
      },
    ],
    achievements: [
      {
        category: "Hackathons",
        awards: [
          { title: "Participant", competition: "MedHack 2026 — ClawControl (AI ER Referral Platform)", location: "Melbourne", year: "2026" },
          { title: "Participant", competition: "Mistral AI Worldwide Hackathon — ShadowSense (AI JP Pitch Training)", location: "Remote", year: "2026" },
          { title: "Participant", competition: "Inter-University Datathon VIC — Financial Fraud Detection", location: "Melbourne", year: "2024" },
        ],
      },
      {
        category: "Awards",
        awards: [
          { title: "International Representative", competition: "Blockchain Olympiad", location: "Hong Kong", year: "2019" },
          { title: "Champion", competition: "Entrepreneurship Competition — National Tsing Hua University", location: "Hsinchu", year: "2018" },
        ],
      },
      {
        category: "Leadership",
        awards: [
          { title: "Treasurer & Vice President", competition: "University of Melbourne Blockchain Club (200+ members) — HashKey, Panga Capital, BingX partnerships", location: "Melbourne", year: "2025" },
          { title: "Founder", competition: "Student Crypto Community Australia — cross-university EN/ZH bilingual network", location: "Australia", year: "2025" },
          { title: "Event Lead", competition: "STEPN Community Offline Event — 500+ attendees, end-to-end operations", location: "Taipei", year: "2022" },
          { title: "Vice President", competition: "NTUST Blockchain Club (100+ members) — DeFi & Smart Contract workshops", location: "Taipei", year: "2021" },
        ],
      },
    ],
  },
  zh: {
    personalInfo: {
      name: "Howard Wang（王宸瑄）",
      title: "全端工程師 | Web3 & AI",
      tagline: "工程能力 × Web3 深度 × 量化交易——少見的複合型人才",
      avatar: "/avatar.png",
      bio: "全端工程師，深耕 Web3、AI/LLM 整合與量化交易。墨爾本大學資訊科技碩士（分散式系統與機器學習）。7 年以上主動交易經驗，橫跨外匯、黃金與加密貨幣衍生品。",
      location: "澳洲墨爾本",
    },
    about: {
      headline: "關於我",
      description: [
        "你好！我是 Howard Wang（王宸瑄），目前在墨爾本，擁有軟體工程、Web3/DeFi 與量化交易的罕見複合背景。",
        "畢業於墨爾本大學資訊科技碩士（分散式系統與機器學習方向），先前於台灣科技大學完成工程碩士，論文以 YOLOv3 打造工地即時安全監控系統。",
        "我曾以 Claude、OpenAI、Gemini、Mistral 建構 AI pipeline；打造處理每月 $500K+ 交易量的 NFT 平台後端；主導 BNB Chain DeFi 協議的 BD 合作案；同時自建運行於 MT5 的自動化交易機器人，橫跨外匯、XAUUSD 與加密貨幣衍生品。",
      ],
      highlights: [
        "全端開發：TypeScript/React/Next.js · Node.js · FastAPI · Spring Boot · PostgreSQL · Redis",
        "AI/LLM：Claude API · OpenAI · Gemini · Mistral · BERT fine-tuning · RAG · n8n 自動化",
        "Web3 & 交易：DeFi BD（ListaDAO）· 鏈上分析 · MT5 自動交易機器人 · Pine Script",
      ],
    },
    experiences: [
      {
        company: "XDO Agency · ListaDAO · BackPack",
        position: "Web3 策略與商業開發",
        period: "2025/09 - 2026/01",
        location: "遠端",
        description: "多重角色 Web3 專案：ListaDAO（BNB Chain DeFi 協議）BD、XDO 代理商客戶 GTM 策略、BackPack 交易所 DeFi 合作夥伴開發。",
        achievements: [
          "主導並成交 ListaDAO 5 個 DeFi 協議整合合作案，完整 BD 流程",
          "分析 10K+ 鏈上錢包行為，驅動 UI/UX 改進",
          "為客戶（含 FDUSD）執行英/中雙語 GTM 策略",
          "主導 BackPack 策略性 DeFi 合作夥伴關係，加速生態系 TVL 成長",
        ],
        tags: ["BD", "DeFi", "鏈上分析", "GTM", "BNB Chain", "TVL"],
      },
      {
        company: "V Tech",
        position: "前端工程實習生",
        period: "2024/11 - 2025/02",
        location: "澳洲墨爾本",
        description: "服務墨爾本大學的學術工具服務提供商——為 5,000+ 大學用戶打造 React 儀表板與 WordPress 外掛。",
        achievements: [
          "開發 React 響應式資料視覺化介面，服務 5,000+ 大學用戶",
          "建置 WordPress 自訂外掛（PHP/JavaScript），連接前端與後端 API",
          "MySQL query 優化，dashboard 載入速度提升 40%",
          "在小型工程團隊中與非技術 stakeholders 溝通需求、快速迭代交付",
        ],
        tags: ["React", "JavaScript", "PHP", "WordPress", "MySQL", "效能優化"],
      },
      {
        company: "Red Building Capital",
        position: "區塊鏈投資研究員",
        period: "2021/10 - 2022/10",
        location: "台灣台北",
        description: "專注 DeFi 的加密貨幣 VC——對 50+ 項目進行盡職調查並建構代幣估值財務模型。",
        achievements: [
          "透過 tokenomics 壓力測試與鏈上指標評估 50+ 加密項目",
          "建立代幣估值財務模型（供需動態、排放時程、市場週期）",
          "以 SQL dashboard 追蹤投資組合，以 Dune Analytics 分析鏈上數據",
          "識別跨鏈套利機會與市場效率缺口",
        ],
        tags: ["Tokenomics", "DeFi", "Dune Analytics", "財務模型", "盡職調查", "SQL"],
      },
      {
        company: "Star-Bit（NFT 交易平台）",
        position: "後端軟體工程師",
        period: "2021/02 - 2021/09",
        location: "台灣台北",
        description: "高並發 NFT 交易平台後端——設計處理每日萬筆交易的 API 系統。",
        achievements: [
          "設計 Node.js RESTful API，處理 10,000+ 日交易量，延遲 < 100ms",
          "優化 PostgreSQL schema，支援 500 並發用戶的高頻帳本查詢",
          "實作 OAuth/JWT 認證與支付閘道，每月處理 $500K+ 交易量",
          "建立系統風險控制與資料完整性驗證機制",
        ],
        tags: ["Node.js", "PostgreSQL", "REST API", "OAuth", "JWT", "高並發", "NFT"],
      },
    ],
    projects: [
      {
        name: "ClawControl",
        description: "AI 急診室專科轉介協調平台——MedHack 2026。醫師點一個按鈕，AI 自動拉 FHIR 病患資料、找到值班專科、發起聯繫、建立即時共享案例室，Open Claw 電話代理人即時轉錄通話。",
        tags: ["TypeScript", "Next.js", "Convex", "Open Claw", "FHIR", "AI Agent"],
        link: "https://github.com/a0981456759",
        highlights: [
          "Open Claw 電話代理人——即時通話轉錄寫回 Convex",
          "FHIR 三層 fallback 查詢 pipeline",
          "AI 代理人追蹤長時間非同步轉介流程",
        ],
      },
      {
        name: "ShadowSense",
        description: "AI 日語音調 Shadowing 練習平台——Mistral AI Hackathon 2026。用戶錄音後，faster-whisper 辨識、librosa + DTW 分析音調曲線與 VOICEVOX 標準比對，Mistral AI 生成練習建議。",
        tags: ["FastAPI", "Next.js", "faster-whisper", "DTW", "Mistral AI", "Python"],
        link: "https://github.com/a0981456759",
        highlights: [
          "DTW 音調比對演算法 + VOICEVOX TTS 標準音",
          "faster-whisper STT + librosa 音訊分析 pipeline",
          "Railway + Vercel 雙端部署",
        ],
      },
      {
        name: "PodDigest",
        description: "Self-hosted AI Podcast Digest 服務。RSS 訂閱後自動以 OpenAI Whisper 轉錄、Claude API 生成摘要、OpenAI TTS 合成語音，輸出私人 RSS feed 可直接在 Apple Podcasts 收聽。",
        tags: ["Claude API", "Whisper", "FastAPI", "React", "Python", "RSS"],
        link: "https://github.com/a0981456759",
        highlights: [
          "三層 AI pipeline：Whisper → Claude → TTS",
          "ffmpeg 音訊分塊處理（>25MB 集數）",
          "私人 RSS feed 生成，直接在播客 App 收聽",
        ],
      },
      {
        name: "Trading Strategy Bot",
        description: "全自動加密貨幣交易信號系統。Binance WebSocket 即時 K 線，pandas-ta 多維度技術指標（CVD、Wyckoff、資金費率、市場微結構），合成信號後推送 Telegram。",
        tags: ["Python", "Binance WebSocket", "PostgreSQL", "Redis", "Telegram", "Docker"],
        link: "https://github.com/a0981456759",
        highlights: [
          "多維度信號合成：CVD + Wyckoff + 資金費率",
          "Binance WebSocket 長連線管理",
          "Redis 快取 + PostgreSQL 歷史儲存",
        ],
      },
      {
        name: "I-CiE Mi 遠距醫療平台",
        description: "微服務心理健康平台——多角色排程 API、Redis pub/sub WebRTC 即時視訊、Claude API 自動生成結構化醫療摘要、MinIO 儲存。Redis caching 減少 70% DB 查詢，服務 1,000+ 用戶。",
        tags: ["Spring Boot", "React", "WebRTC", "Redis", "Claude API", "微服務"],
        link: "https://github.com/a0981456759",
        highlights: [
          "Claude API 自動生成結構化醫療摘要",
          "Redis pub/sub WebRTC 即時視訊通話",
          "Redis caching 減少 70% DB 查詢",
        ],
      },
      {
        name: "YouTube Analyzer",
        description: "自動追蹤 YouTube 頻道、抓取字幕並以 Gemini AI 分析內容，生成摘要、重點與影響力評分。支援繁中／簡中／英文，可對任一影片進行 AI 問答。",
        tags: ["Gemini API", "FastAPI", "React", "APScheduler", "Telegram", "Python"],
        link: "https://github.com/a0981456759",
        highlights: [
          "Gemini API 多語言內容分析（中／英）",
          "與任一影片進行 AI 問答對話",
          "APScheduler 定時驅動 + Telegram 通知",
        ],
      },
      {
        name: "跨鏈 Swap DApp",
        description: "跨鏈代幣兌換 DApp，1inch Fusion Plus 跨鏈協議，Privy 多錢包整合，Supabase 儲存兌換記錄。",
        tags: ["Next.js", "TypeScript", "1inch", "Privy", "Supabase", "Web3"],
        link: "https://github.com/a0981456759",
        highlights: [
          "1inch Fusion Plus 跨鏈協議整合",
          "Privy 多錢包整合",
          "Supabase 兌換記錄 + AI 輔助功能",
        ],
      },
      {
        name: "氣候事實查核系統",
        description: "端到端 NLP pipeline，BERT 從 1M+ 文件語料庫中檢索並驗證證據，hard-negative mining fine-tuning，87% 準確率（SUPPORTS/REFUTES/DISPUTED/NOT_ENOUGH_INFO 四分類）。",
        tags: ["BERT", "PyTorch", "NLP", "Python", "Transformers", "Fine-tuning"],
        link: "https://github.com/a0981456759",
        highlights: [
          "BERT fine-tuning + hard-negative mining",
          "1M+ 文件語料庫證據檢索",
          "87% 四分類準確率",
        ],
      },
    ],
    education: [
      {
        school: "墨爾本大學",
        degree: "資訊科技碩士",
        major: "分散式系統與機器學習",
        period: "2023/06 - 2025/12",
        location: "澳洲墨爾本",
      },
      {
        school: "國立台灣科技大學",
        degree: "工程碩士",
        major: "土木工程——電腦視覺 & AI 論文",
        period: "2018/07 - 2020/07",
        location: "台灣台北",
      },
      {
        school: "國立台北科技大學",
        degree: "土木工程學士",
        major: "土木工程",
        period: "2014/07 - 2018/07",
        location: "台灣台北",
      },
    ],
    achievements: [
      {
        category: "黑客松",
        awards: [
          { title: "參賽", competition: "MedHack 2026 — ClawControl（AI 急診室轉介協調平台）", location: "墨爾本", year: "2026" },
          { title: "參賽", competition: "Mistral AI Worldwide Hackathon — ShadowSense（AI 日語音調練習）", location: "遠端", year: "2026" },
          { title: "參賽", competition: "跨大學 Datathon VIC — 金融欺詐偵測（Random Forest）", location: "墨爾本", year: "2024" },
        ],
      },
      {
        category: "獎項",
        awards: [
          { title: "國際代表", competition: "Blockchain Olympiad 區塊鏈奧林匹亞", location: "香港", year: "2019" },
          { title: "冠軍", competition: "國立清華大學創業競賽", location: "新竹", year: "2018" },
        ],
      },
      {
        category: "社群領導",
        awards: [
          { title: "財務長 & 副主席", competition: "墨爾本大學區塊鏈社（200+ 成員），爭取 HashKey、Panga Capital、BingX 合作", location: "墨爾本", year: "2025" },
          { title: "創辦人", competition: "澳洲學生加密貨幣社群——跨大學英/中雙語網絡", location: "澳洲", year: "2025" },
          { title: "活動總籌", competition: "STEPN 社群線下活動——500+ 人端到端運營", location: "台北", year: "2022" },
          { title: "副主席", competition: "台科大區塊鏈社（100+ 成員），主辦 DeFi & 智能合約開發工作坊", location: "台北", year: "2021" },
        ],
      },
    ],
  },
};

export const skills = [
  {
    category: "Languages & Frontend",
    items: [
      { name: "TypeScript / JavaScript", level: 92 },
      { name: "React / Next.js", level: 90 },
      { name: "Python", level: 92 },
      { name: "Java", level: 80 },
      { name: "Go", level: 72 },
    ],
  },
  {
    category: "Backend & Database",
    items: [
      { name: "Node.js / FastAPI", level: 88 },
      { name: "Spring Boot", level: 78 },
      { name: "PostgreSQL / MySQL", level: 87 },
      { name: "Redis", level: 85 },
      { name: "Docker / CI/CD", level: 82 },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "LLM API (Claude/OpenAI/Gemini)", level: 90 },
      { name: "PyTorch / BERT / Transformers", level: 80 },
      { name: "RAG / Prompt Engineering", level: 88 },
      { name: "Audio / Speech (Whisper/DTW)", level: 78 },
      { name: "n8n / Workflow Automation", level: 82 },
    ],
  },
  {
    category: "Blockchain & Web3",
    items: [
      { name: "DeFi / On-chain Analytics", level: 88 },
      { name: "Solidity / Ethers.js / viem", level: 78 },
      { name: "Dune Analytics / Nansen", level: 85 },
      { name: "1inch / Privy / Nodit", level: 80 },
      { name: "BD / Partnership Development", level: 85 },
    ],
  },
  {
    category: "Trading & Quant",
    items: [
      { name: "MT5 Automated Trading Bot", level: 88 },
      { name: "Pine Script / TradingView", level: 85 },
      { name: "FX / Gold / Crypto Derivatives", level: 90 },
      { name: "pandas-ta / CVD / Wyckoff", level: 82 },
      { name: "Binance WebSocket API", level: 85 },
    ],
  },
  {
    category: "Data & Mobile",
    items: [
      { name: "R Shiny / Tableau / Power BI", level: 78 },
      { name: "React Native (Expo)", level: 78 },
      { name: "Android (Java)", level: 72 },
      { name: "Three.js / WebGL", level: 70 },
      { name: "Geospatial / GIS", level: 75 },
    ],
  },
];

export const socialLinks = {
  email: "m10705506@gmail.com",
  github: "https://github.com/a0981456759",
};

export function getContent(lang: Lang) {
  return content[lang];
}

// Re-export for backward compatibility (SEO page uses these directly)
export const personalInfo = content.en.personalInfo;
export const about = content.en.about;
export const experiences = content.en.experiences;
export const projects = content.en.projects;
export const education = content.en.education;
export const achievements = content.en.achievements;
