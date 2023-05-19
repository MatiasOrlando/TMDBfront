import axios from "axios";
import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { contexto } from "../../Context/Context";

const NavBar = () => {
  const { setUserLogged, userLogged } = useContext(contexto);
  const navigateHome = useNavigate();
  const logOut = async () => {
    try {
      await axios.post("https://matiastmbdback.onrender.com/logout", {
        withCredentials: true,
        credentials: "include",
      });
      setUserLogged({});
      localStorage.removeItem("user");
      navigateHome("/");
    } catch ({ response }) {
      console.log(response);
    }
  };

  return (
    <Navbar bg="black" expand="sm">
      <Container fluid>
        <Nav.Link href="/">
          <img
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            }
            style={{ height: "20px" }}
            alt="TMBD logo"
          />
        </Nav.Link>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          bg="light"
          sx={{ color: "white" }}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", marginLeft: "10px" }}
            navbarScroll
          >
            <Nav.Link href="/movies" style={{ color: "white" }}>
              Movies
            </Nav.Link>
            <Nav.Link href="/tvshows" style={{ color: "white" }}>
              TV Shows
            </Nav.Link>
            {userLogged.data && (
              <>
                <Nav.Link href="/profile" style={{ color: "white" }}>
                  Profile
                </Nav.Link>
                <Nav.Link href="/watchlist" style={{ color: "white" }}>
                  Watch list
                </Nav.Link>
              </>
            )}
          </Nav>
          <div
            style={{
              display: "flex",
              width: "250px",
              justifyContent: "space-around",
            }}
          >
            {userLogged.data ? (
              <Link>
                <Button onClick={() => logOut()}>Log out</Button>
              </Link>
            ) : (
              <Link to="/loguser">
                <Button className="btn btn-dark">Sign In</Button>
              </Link>
            )}
            <Link to={userLogged.data ? "/profile" : "/registration"}>
              <Button className="btn btn-dark">
                {userLogged.data ? userLogged.data.nickname : "Sign up"}
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
