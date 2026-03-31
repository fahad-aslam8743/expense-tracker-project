# 💰 Vanilla Finance Tracker | Pure JavaScript Logic

A lightweight, efficient, and interactive finance management tool built entirely with **Vanilla JavaScript**, **HTML5**, and **CSS3**. This project marks my fundamental journey into DOM manipulation, state management, and data persistence without the aid of frameworks.

**🔗 Live Demo:** [Your-Vercel-Link-Here]

---

## 👨‍💻 Developed By
**Fahad Aslam** *Frontend Developer | Logic Enthusiast*

---

## 🏗️ Core Architecture
Before moving to React and Supabase, I built this to master the "Fundamentals First" approach. It demonstrates my ability to handle application logic using raw browser APIs.

| 🧩 DOM Manipulation | 💾 Local Storage | 📊 Math Logic |
| :--- | :--- | :--- |
| Dynamic UI updates without page refreshes. | Data persistence that survives browser restarts. | Real-time calculation of Balance, Income, and Expenses. |

---

## ✨ Key Features

* **Transaction Management:** Add and delete income or expense items with a single click.
* **Real-time Dashboard:** Automatic calculation of total balance, total income, and total expenses as you type.
* **Data Persistence:** Utilizes `localStorage` so your financial history stays saved on your device.
* **Categorized History:** A clean, scrollable list of all past transactions with visual indicators (Green for Income / Red for Expense).
* **Form Validation:** Prevents empty entries and ensures numerical accuracy in the budget.

---

## 🛠️ Tech Stack & Skills

### **The "Holy Trinity" of Web Dev**
* **HTML5:** Semantic structure for accessibility and SEO.
* **CSS3:** Custom styling with Flexbox and Grid for a clean, professional layout.
* **JavaScript (ES6+):** * Higher-order array methods (`filter`, `reduce`, `forEach`).
    * Template Literals for dynamic UI rendering.
    * Event Listeners and DOM traversal.

---

## 🛡️ Technical Implementation Highlights

### **Manual State Synchronization**
In this project, I manually synchronized the UI with the data array. Every time a transaction is added or removed, a dedicated `init()` function clears the list and re-renders the DOM—simulating the "Virtual DOM" behavior found in modern frameworks.

### **The Math Engine**
```javascript
// Example of the logic used for the dashboard
const amounts = transactions.map(t => t.amount);
const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
