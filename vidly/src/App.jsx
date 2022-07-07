import { Routes, Route, Navigate } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "./App.css";
import React from "react";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/movies/:id" element={<MovieForm />} />
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/rentals" element={<Rentals />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
