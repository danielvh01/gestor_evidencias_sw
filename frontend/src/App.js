import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Expedientes from "./pages/Expedientes";
import Usuarios from "./pages/Usuarios";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route
          path="/expedientes"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <main style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
                  <Expedientes />
                  
                </main>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <div style={{ display: "flex" }}>
                <Sidebar />
                <main style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
                  <Usuarios />
                  
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
