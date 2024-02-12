import AuthGuard from "components/AuthGuard";
import Home from "components/pages/Home";
import Login from "components/pages/Login";
import MovieDetails from "components/pages/MovieDetails";
import Register from "components/pages/Register";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthGuard />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
