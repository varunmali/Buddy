import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Prediction = () => {
  const { userId } = useParams(); // Get userId from URL params
  const [loading, setLoading] = useState(false);
  const [predictedExpense, setPredictedExpense] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/predict-expenses/${userId}`
        );
        if (response.data.success) {
          setPredictedExpense(response.data.predictedExpense);
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

  return (
    <>
      <Header />
      <Container className="mt-5 text-center">
        <h2>📊 AI Expense Prediction</h2>
        <Card className="p-4 shadow mt-3">
          {loading ? (
            <Spinner animation="border" />
          ) : predictedExpense !== null ? (
            <h4>
              Your predicted major expense next month:{" "}
              <strong>₹{predictedExpense}</strong>
            </h4>
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

// export default Prediction;
