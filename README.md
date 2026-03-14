# 🛡️ Promo Guard

An open-source Reddit bot built with [Devvit](https://developers.reddit.com) that automatically enforces "Developer Saturday" (or any promotional day) rules on your subreddit.

---

## 🔍 How it Works

Promo Guard monitors your subreddit in real-time to ensure self-promotion remains fair and organized:

- **📅 Timing Enforcement:** Automatically removes promotional posts submitted outside the designated promo day (Saturday by default).
- **🔢 Rate Limiting:** Limits users to one promotional post per day using Devvit's `kvStore` for persistent tracking.
- **✉️ Transparent Feedback:** Notifies the author via DM (or comment reply if DMs are disabled) explaining exactly why their post was removed, including the current UTC time and day.
- **🎉 Welcome Comments:** Posts a friendly welcome comment on valid Saturday posts to encourage community engagement.

---

## ⚙️ Configuration

All settings live in `src/config.ts`:
```typescript
export const config = {
  promoDay: 6,                  // 0 = Sunday, 6 = Saturday
  promoFlair: 'Developer Saturday', // The flair to enforce rules on
  maxPostsPerUser: 1,           // Max allowed posts per user per day
};
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (latest LTS)
- [Devvit CLI](https://developers.reddit.com/docs/guides/setup)

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/YodaGuru/promo-guard.git
   cd promo-guard
```

2. Install dependencies:
```bash
   npm install
```

3. Log in to Devvit:
```bash
   devvit login
```

4. Upload the app:
```bash
   devvit upload
```

5. Install on your subreddit:
```bash
   devvit install r/YOUR_SUBREDDIT
```

6. Start playtesting:
```bash
   devvit playtest r/YOUR_SUBREDDIT
```

---

## 🗂️ Project Structure
```
src/
  app.ts        # Core trigger logic
  config.ts     # Configurable settings
  utils.ts      # KV store helpers
  main.ts       # Entry point
```

---

## 🛡️ Privacy & Security

- **No PII collected:** Promo Guard does not collect, store, or transmit any personally identifiable information.
- **Limited scope:** The bot only acts on posts with the configured flair.
- **Transparent:** The full source code is open-source and available for review.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

> Built with ❤️ using [Devvit](https://developers.reddit.com) — Also check out [GitHub Guard](https://github.com/YodaGuru/GitHub-guard), a companion bot that audits GitHub links for safety and reputation.