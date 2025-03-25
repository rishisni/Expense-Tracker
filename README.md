# **Expense Management System**  

## **Overview**  
The **Expense Management System** is a role-based application where **Admins** can track overall expenses, users, and categories, while **Users** can monitor their personal transactions. The system provides an interactive dashboard with **data visualization** and allows exporting reports in **PDF format**.  

---

## **Features**  

### **Admin Dashboard**  
- View **Total Users**, **Total Categories**, **Total Transactions**, and **Total Amount Spent**.  
- Visualize **expense trends** using charts.  
- Export statistics as a **PDF report**.  

### **User Dashboard**  
- View **Your Transactions** and **Total Spent**.  
- Export user-specific statistics as a **PDF report**.  

### **Other Features**  
- **Dynamic UI Rendering:** Dashboard updates based on the user's role (Admin/User).  
- **Interactive Expense Chart:** Uses Material-UI charts for visualization.  
- **PDF Export Utility:** Exports statistics using `jsPDF` and `autoTable`.  
- **Optimized API Fetching:** Fetches statistics dynamically using `fetchStats` API.  

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

## **Backend Details**  

### **Backend Framework:**  
- Django Rest Framework (DRF)  

### **Database:**  
- Sqlite (Devolpment)
- PostgreSQL / MySQL (based on deployment requirements)  

### **Authentication & Authorization:**  
- Token-based authentication using Django REST Framework  
- Role-based access control (Admin & User)  

# Setup Instructions

## 1 Clone the Repository  
```bash
git clone https://github.com/rishisni/Expense-Tracker.git
cd expense-tracker

## 1 Frontend Setup (React + Vite)

cd frontend (Navigate to the frontend directory)
npm install (Install dependencies)
npm run dev (Start the frontend server)

The React app will run at http://localhost:5173/.


## 1 Backend Setup (Django + DRF)

cd backend (Navigate to the backend directory in another terminal)
Create and activate a virtual environment :
  python3 -m venv venv
  source venv/bin/activate  # Mac/Linux
  venv\Scripts\activate     # Windows

pip install -r requirements.txt (Install dependencies from requirements.txt)
python manage.py migrate (Run database migrations)
python manage.py runserver (Start the Django backend server)

The backend API will be available at http://127.0.0.1:8000/
