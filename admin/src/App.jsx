import { useState, useEffect } from "react";
import LoginAdmin from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    const token = localStorage.getItem("beeAdmin");
    if (token === "beeAdmin") {
      setIsAuthenticated(true);
      console.log(token);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Admin />
              </>
            ) : (
              <LoginAdmin setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/login"
          element={<LoginAdmin setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </>
  );
};

export default App;
