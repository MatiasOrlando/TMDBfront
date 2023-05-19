import React from "react";
import NavBar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import Context from "./Context/Context";
import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./views/Category";
import ItemDetail from "./views/ItemDetail";
import Profile from "./views/Favorites";
import WatchList from "./views/WatchList";

const App = () => {
  return (
    <BrowserRouter>
      <Context>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categoryId" element={<Category />} />
          <Route path="/:categoryId/:id" element={<ItemDetail />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/loguser" element={<LogIn />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
};

export default App;
