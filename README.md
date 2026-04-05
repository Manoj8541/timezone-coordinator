# 🌍 Timezone Coordinator

> Schedule meetings nobody hates.

A fully client-side web app that finds the **fairest meeting time** for distributed teams by measuring inconvenience ("pain") across timezones and tracking fairness over time.

---

## 🚀 Live Demo
👉 https://timezone-coordinator-phi.vercel.app/index.html

---

## 🧠 Problem

Most scheduling tools only find a time that *works*.

They ignore:
- Who always attends late-night meetings  
- Who constantly sacrifices personal time  
- Fair distribution of inconvenience  

---

## 💡 Solution

Timezone Coordinator introduces:

- ⏱️ **Pain-based scheduling**
- ⚖️ **Fairness tracking across meetings**
- 🌙 **Sleep protection (never schedules blocked hours)**
- 🔒 **100% private (runs entirely in browser)**

---

## ✨ Features

### 👥 Team Management
- Create multiple teams
- Add members with timezone + work hours
- Auto-generated avatars

### 🌐 Timezone Intelligence
- Supports all IANA timezones (including half-hour offsets like India)
- Live clocks for each member
- World map visualization

### 📊 Smart Scheduling
- Analyzes all 24 UTC time slots
- Assigns pain score (0–100) per member
- Ranks slots by total team inconvenience

### ⚖️ Fairness Engine
- Tracks cumulative pain per member
- Adjusts future suggestions automatically
- Prevents same person always suffering

### 📈 Visualization
- Pain distribution charts
- Meeting history tracking
- Fairness score system

### 🔗 Share System
- Share team snapshot via URL (Base64 encoded)
- Read-only preview mode
- No database required

### 📅 Calendar Export
- Download `.ics` file
- Use with Google Calendar / Outlook

### 🔒 Privacy First
- No backend
- No API calls
- No tracking
- Data stored in `localStorage`

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3 (Custom UI + Animations)**
- **Vanilla JavaScript (Modular Architecture)**
- **LocalStorage API**
- **Intl API (Timezone handling)**

---

## ⚙️ How It Works

1. Add team members with timezone & work hours  
2. System evaluates all 24 hours globally  
3. Each hour gets a **pain score per person**  
4. Best time = lowest total team pain  
5. Fairness engine adjusts future suggestions  

---

## 🧪 Run Locally

```bash
git clone https://github.com/Manoj8541/timezone-coordinator
cd timezone-coordinator
```

Then open:

```text
index.html
```

## 🎯 Why This Project Matters

This project demonstrates:

- Real-world problem solving  
- Algorithmic thinking (pain calculation)  
- State management without frameworks  
- Clean UI/UX design  
- Frontend architecture (modular JS)  

---

## 📌 Future Improvements

- Backend sync (optional mode)
- Real-time collaboration
- Better map accuracy
- Mobile optimization

---

## 📄 License

MIT License

---

## 👤 Author

Built by Manoj

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub
