# 🎓 Saveetha ARMS Rectifier

### 📅 Leave Tracker in Attendance Report
![Image](https://github.com/user-attachments/assets/75633a47-9d81-4d28-9690-eaba8c21a826)

### 📊 CGPA Calculator
![Image](https://github.com/user-attachments/assets/e0c737f6-cb32-4180-8383-c1a0d09c3ad0)

### 🔍 Faculty Slot Monitor
![Image](https://github.com/user-attachments/assets/eeab1233-e1db-4d37-b8ce-548a7d54326e)

A single Chrome extension that enhances the **Saveetha University Student Portal**:

1. ✅ **Faculty Slot Monitor** — Automatically searches for a faculty in your selected slot.
2. 🗓️ **Leave Tracker** — Adds "Leave Taken" and "Max Allowed" columns to the attendance report.
3. 📊 **CGPA Calculator** — Calculates and displays your CGPA automatically.

---

## 📦 Features

| Feature              | Page                                                                 | Functionality                                                                 |
|----------------------|----------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Faculty Slot Monitor | [`Enrollment.aspx`](https://arms.sse.saveetha.com/StudentPortal/Enrollment.aspx) | Monitors a selected faculty in a given slot and auto-refreshes every cycle.   |
| Leave Tracker        | [`AttendanceReport.aspx`](https://arms.sse.saveetha.com/StudentPortal/AttendanceReport.aspx) | Shows leaves taken and max allowable leaves for each course.                  |
| CGPA Calculator      | [`*`](https://arms.sse.saveetha.com/StudentPortal/*) | Displays CGPA based on passed grades and updates dynamically.                 |

---

## 📁 How to Install 

Follow these steps to install the extension in Google Chrome/Chromium based Browser:

### 1. Extract the Folder
Make sure you have all these files in one folder (e.g., `Saveetha ARMS Rectifier`):

saveetha-extension/
├── manifest.json
├── enrollment.js
├── leave.js
├── cgpa.js
└── icon.png

> 🔔 If it's in a ZIP, extract it first.

---

### 2. Open Chrome Extensions
- Go to: `chrome://extensions`
- Turn on **Developer Mode** (top right)

---

### 3. Load the Extension
- Click **Load Unpacked**
- Select the extracted folder (e.g., `Saveetha ARMS Rectifier`)

✅ You will now see:
> **"Saveetha ARMS Rectifier"**

---

## ✅ How to Use

### Faculty Slot Monitor
1. Go to: `Enrollment.aspx`
2. Select a slot and enter faculty name
3. Click **Start Monitoring**
   - It highlights all matches
   - Auto-refreshes after each cycle
   - Persists your slot/faculty selection even after reloads

### Leave Tracker
- Go to: `AttendanceReport.aspx`
- Automatically adds:
  - “Leave Taken”
  - “Max Leave Allowed”

### CGPA Calculator
- Go to: any page showing your grades (e.g., results tab)
- CGPA appears in a colored box
- Click **Recalculate** if needed

---

## ℹ️ Notes

- Works only on the Saveetha Student Portal pages:
  - `Enrollment.aspx`
  - `AttendanceReport.aspx`
  - Other grade-related pages

- You must allow the extension to run by enabling it in Chrome.

---




