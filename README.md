# 🚀 Budget Buddy: AI-Powered Expense Tracker

## 📌 Project Description:

Budget Buddy is a web-based application designed to help users track and manage their expenses efficiently. Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), it provides AI-powered budgeting and expense predictions to help users make informed financial decisions.

## 🎯 Objectives:

1. ✅ Simplify expense tracking and financial management for individuals and organizations.
2. 📊 Provide AI-driven insights into spending patterns to enable better financial planning.
3. ✏️ Allow users to create, update, and delete expenses and categories.
4. 🤖 Predict future expenses using AI-based time series forecasting with ML.js.
5. 📈 Generate detailed financial reports and visual analytics.

## ✨ Features:

### 🔐 User Authentication and Authorization:

- 🔑 Secure signup and login using JWT authentication.
- 👥 Role-based access control for different user permissions.

### 🤖 AI-Powered Budgeting & Expense Prediction:

- 🔮 Predict upcoming major expenses using machine learning models powered by ML.js.
- 💡 Provide financial insights based on historical spending patterns.

### 📝 Expense and Category Management:

- ➕ Create, update, and delete expenses and categories.
- 📆 Track expenses by date, category, and description.
- 📎 Attach receipts or documents to expense entries.

### 📊 Dashboard and Reporting:

- 🎯 Visual dashboard displaying total expenses, category-wise breakdown, and recent transactions.
- 📈 Generate reports with pie charts, bar graphs, and AI-driven insights for better budget planning.

### 🎨 Responsive User Interface:

- 🖥️ Modern, user-friendly UI built with React.js and Tailwind CSS.
- 📱 Works seamlessly across desktop, tablet, and mobile devices.

## 🏗️ Technical Architecture:

### 🖥️ Frontend:

- ⚛️ Built using React.js with state management via Redux.
- 🎨 Uses Tailwind CSS for styling and responsiveness.
- 📅 Includes libraries like `react-datepicker`, `moment`, and `chart.js` for enhanced UI/UX.

### 🔧 Backend:

- 🚀 Developed using Node.js and Express.js to handle API requests.
- 🔐 Implements JWT-based authentication for security.
- 🤖 AI-powered prediction models integrated directly using ML.js.

### 🗄️ Database:

- 🛢️ MongoDB for storing user data, expenses, and categories.
- 🔗 Mongoose ORM for schema definition and validation.

### 🤖 AI Integration:

- 📡 Machine Learning models powered by ML.js for predicting future expenses.
- ⚡ Runs AI computations directly in the frontend without the need for a Python-based API.

### 📦 Deployment:

- 🖥️ Backend hosted on Render.
- 🔄 CI/CD pipelines set up for automated builds and deployments.

## 🏃‍♂️ Run Locally

Clone the project:

```bash
  git clone https://github.com/VarunMali/Budget-Buddy
```

Navigate to the project directory:

```bash
  cd Budget-Buddy
```

### 🚀 Setup Frontend:

```bash
  cd frontend
  npm install
  npm start
```

### 🚀 Setup Backend:

```bash
  cd backend
  npm install
  npm run dev
```

## 🔑 Environment Variables

To run this project, create a `.env` file in the `backend` directory and add the following variables:

```env
MONGO_URL=your_mongodb_connection_string
PORT=your_preferred_port
JWT_SECRET=your_jwt_secret
```

## 🛠️ Tech Stack

**Client:** ⚛️ React.js, Redux, Tailwind CSS, Chart.js

**Server:** 🚀 Node.js, Express.js

**Database:** 🛢️ MongoDB

**Machine Learning:** 🤖 ML.js

## 📸 Screenshots

(Insert relevant app screenshots or GIFs)

## 🏅 Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## 🔗 Links

[![Portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/VarunMali)

[![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/varunmali)

## 🎥 Demo

Insert a demo video link or a GIF showcasing the app in action.

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
