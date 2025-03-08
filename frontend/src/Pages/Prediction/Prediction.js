// Predict with out graph
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Container, Card, Button, Spinner } from "react-bootstrap";
// import Header from "../../components/Header";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Prediction = () => {
//   const { userId } = useParams(); // Get userId from URL params
//   const [loading, setLoading] = useState(false);
//   const [predictedExpense, setPredictedExpense] = useState(null);

//   useEffect(() => {
//     const fetchPrediction = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/v1/predict-expenses/${userId}`
//         );
//         if (response.data.success) {
//           setPredictedExpense(response.data.predictedExpense);
//         } else {
//           toast.error("Prediction failed. Try again later.");
//         }
//       } catch (error) {
//         console.error("Prediction Fetch Error:", error);
//         toast.error("Error fetching prediction.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrediction();
//   }, [userId]);

//   return (
//     <>
//       <Header />
//       <Container className="mt-5 text-center">
//         <h2>📊 AI Expense Prediction</h2>
//         <Card className="p-4 shadow mt-3">
//           {loading ? (
//             <Spinner animation="border" />
//           ) : predictedExpense !== null ? (
//             <h4>
//               Your predicted major expense next month:{" "}
//               <strong>₹{predictedExpense}</strong>
//             </h4>
//           ) : (
//             <p>No prediction available.</p>
//           )}
//         </Card>
//         <Button href="/home" variant="primary" className="mt-3">
//           Go Back
//         </Button>
//       </Container>
//     </>
//   );
// };

// export default Prediction;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
// import Header from "../../components/Header";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Prediction = () => {
//   const { userId } = useParams(); // Get userId from URL params
//   const [loading, setLoading] = useState(false);
//   const [predictedExpense, setPredictedExpense] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPrediction = async () => {
//       setLoading(true);
//       setError(null); // Reset error state
//       try {
//         const token = localStorage.getItem("token"); // ✅ Retrieve token from storage

//         if (!token) {
//           toast.error("Unauthorized! Please log in.");
//           setError("Unauthorized! Please log in.");
//           return;
//         }

//         const response = await axios.get(
//           `http://localhost:5000/api/v1/predict-expenses/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // ✅ Include authentication token
//             },
//           }
//         );

//         if (response.data.success) {
//           setPredictedExpense(response.data.predictedExpense);
//         } else {
//           setError(response.data.message || "Prediction failed.");
//           toast.error(response.data.message || "Prediction failed.");
//         }
//       } catch (err) {
//         console.error("Prediction Fetch Error:", err);
//         setError("Error fetching prediction. Please try again.");
//         toast.error("Error fetching prediction.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrediction();
//   }, [userId]);

//   return (
//     <>
//       <Header />
//       <Container className="mt-5 text-center">
//         <h2>📊 AI Expense Prediction</h2>
//         <Card className="p-4 shadow mt-3">
//           {loading ? (
//             <Spinner animation="border" />
//           ) : error ? (
//             <Alert variant="danger">{error}</Alert>
//           ) : predictedExpense !== null ? (
//             <h4>
//               Your predicted major expense next month:{" "}
//               <strong>₹{predictedExpense}</strong>
//             </h4>
//           ) : (
//             <p>No prediction available.</p>
//           )}
//         </Card>
//         <Button href="/home" variant="primary" className="mt-3">
//           Go Back
//         </Button>
//       </Container>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Import Chart.js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Prediction = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [predictedExpense, setPredictedExpense] = useState(null);
  const [pastExpenses, setPastExpenses] = useState([]);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/predict-expenses/${userId}`
        );

        if (response.data.success) {
          setPredictedExpense(response.data.predictedExpense);
          setPastExpenses(response.data.pastExpenses || []);
        } else {
          toast.error("Prediction failed. Try again later.");
        }
      } catch (error) {
        console.error("Prediction Fetch Error:", error);
        toast.error("Error fetching prediction.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [userId]);

  // ✅ Sample Data for Chart (Use real data if available)
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]; // X-axis labels (months)
  const pastData =
    pastExpenses.length > 0
      ? pastExpenses
      : [5000, 5200, 4900, 5100, 5300, 5500]; // Mock past expenses
  const predictedData = [...pastData, predictedExpense || 0]; // Add predicted expense to the graph

  // ✅ Chart Data
  const data = {
    labels,
    datasets: [
      {
        label: "Past Expenses (₹)",
        data: pastData,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        tension: 0.4, // Smooth curve
      },
      {
        label: "Predicted Expense (₹)",
        data: predictedData,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderDash: [5, 5], // Dotted line for prediction
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      <Header />
      <Container className="mt-5 text-center">
        <h2>📊 AI Expense Prediction</h2>
        <Card className="p-4 shadow mt-3">
          {loading ? (
            <Spinner animation="border" />
          ) : predictedExpense !== null ? (
            <>
              <h4>
                Your predicted major expense next month:{" "}
                <strong>₹{predictedExpense}</strong>
              </h4>
              <div className="mt-4">
                {/* ✅ Display Graph */}
                <Line data={data} />
              </div>
            </>
          ) : (
            <p>No prediction available.</p>
          )}
        </Card>
        <Button href="/home" variant="primary" className="mt-3">
          Go Back
        </Button>
      </Container>
    </>
  );
};

export default Prediction;
