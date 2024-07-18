import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/appRoute";
import "./app.css";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
