# **Expense Management System**  

## **Overview**  
The **Expense Management System** is a role-based application where **Admins** can track overall expenses, users, and categories, while **Users** can monitor their personal transactions. The system provides an interactive dashboard with **data visualization** and allows exporting reports in **PDF format**.  

---

## **Features**  

### **Admin Dashboard**  
View **Total Users**, **Total Categories**, **Total Transactions**, and **Total Amount Spent**.  
Visualize **expense trends** using charts.  
Export statistics as a **PDF report**.  

### **User Dashboard**  
View **Your Transactions** and **Total Spent**.  
Export user-specific statistics as a **PDF report**.  

### **Other Features**  
**Dynamic UI Rendering:** Dashboard updates based on the user's role (Admin/User).  
**Interactive Expense Chart:** Uses Material-UI charts for visualization.  
**PDF Export Utility:** Exports statistics using `jsPDF` and `autoTable`.  
**Optimized API Fetching:** Fetches statistics dynamically using `fetchStats` API.  

---

## **Tech Stack**  

### **Frontend:**  
- React (Vite)  
- Material-UI (MUI)  
- React Hooks (`useState`, `useEffect`)  

### **PDF Export:**  
- jsPDF  
- autoTable  

### **API Integration:**  
- Fetch API  

---


