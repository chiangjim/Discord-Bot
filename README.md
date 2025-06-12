---

# 🤖 My Discord Bot

一個使用 Node.js 和 Discord.js 製作的簡易 Discord Bot，具備基本的文字指令與互動功能，適合新手學習 Discord 機器人開發、專案管理與開源協作！

## 📌 功能簡介

- ✅ `/ping`：機器人回傳當前延遲。
- 🧠 `/run `程式碼`` 或 `./run `程式碼``：回傳程式碼執行結果（API）。

---

## 🚀 技術使用

| 技術 | 說明 |
|------|------|
| Node.js | JavaScript 執行環境 |
| Discord.js | Discord API 的 JS 套件 |
| dotenv | 管理 Token 等環境變數 |
| Git/GitHub | 原始碼管理與開源託管 |
| SHD Cloud | 雲端部署 Bot|

---

## 🛠️ 安裝與啟動方式

### 1️⃣ 複製此專案
```bash
git clone https://github.com/chiangjim/Discotd-Bot.git
```

2️⃣ 安裝套件

npm install

3️⃣ 設定環境變數

建立 .env 檔案，並填入你的 Discord Bot Token：

DISCORD_TOKEN=your_bot_token_here

> 請勿將 .env 上傳到 GitHub！



4️⃣ 啟動 Bot

node index.js


---

🔗 邀請 Bot 到你的伺服器

使用以下連結將 Bot 邀請至你的伺服器（需使用機器人 Client ID 替換）：

https://discord.com/oauth2/authorize?client_id=1202093621864824893


---

📂 專案結構說明（可依實作修改）

📦 
├── commands/         # 指令
│   ├── run.js
│   └── ping.js
├── events/           # 事件
│   ├── message_create.js # run.js 的訊息指令版本
├── index.js          # 主程式
├── .env.example      # 環境變數（token等資料）
├── package.json      # 套件與腳本定義
├── package-lock.json
└── README.md         # 說明文件

---

🙌 聯絡作者 / 貢獻者

歡迎貢獻或建議改進 🙌
🔗 GitHub：@chiangjim


---

📄 License

MIT License
你可以自由修改與使用此專案，但請保留原始授權聲明 🙏


---

⭐ 如果你喜歡這個專案

別忘了幫我 Star 🌟 一下，感謝！

---
