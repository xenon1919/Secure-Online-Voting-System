/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
// ✅ Import Components
import Home from "./components/display/Home";
import Chart from "./components/display/Chart";
import Profile from "./components/display/Profile";
import SignUp from "./components/display/SignUp";
import SignIn from "./components/display/SignIn";
import Navbar from "./components/Navbar";
import Elections from "./components/display/Elections";
import AdminDashboard from "./components/display/AdminDashboard";
import Results from "./components/display/Results";
import Welcome from "./components/display/Welcome";
import Chatbot from "./components/display/Chatbot";
import Footer from "./components/display/Footer"; // ✅ Import Footer
import Privacy from "./components/display/Privacy"; // ✅ Import Privacy Page
import Accessibility from "./components/display/Accessibility"; // ✅ Import Accessibility Page
import Terms from "./components/display/Terms"; // ✅ Import Terms Page

import { disableReactDevTools } from "@fvilers/disable-react-devtools";
if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

// ✅ Create Contexts
export const UserContext = createContext();
export const ThemeContext = createContext();

// ✅ Reducer Function for Authentication
const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

// ✅ Routing Component with Navigation Handling
const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = React.useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      if (location.pathname === "/signin") {
        navigate(user.isAdmin ? "/admin" : "/elections");
      }
    }
  }, [dispatch, navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/elections" element={<Elections />} />
      {state?.isAdmin && <Route path="/admin" element={<AdminDashboard />} />}
      <Route path="/results" element={<Results />} />
      {/* ✅ Add Routes for Footer Links */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
};

// ✅ Main App Component
const App = () => {
  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // ✅ Persist Theme
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const userContextValue = useMemo(() => ({ state, dispatch }), [state]);
  const themeContextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <Router>
          <Navbar />
          <Chatbot />
          <Routing />
          <Footer /> {/* ✅ Added Footer */}
        </Router>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
