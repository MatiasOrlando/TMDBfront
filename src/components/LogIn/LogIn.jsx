import React from "react";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { contexto } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LogIn = () => {
  const { setUserLogged } = useContext(contexto);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const navigateHome = useNavigate();

  const formData = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userLogOk = await axios.post(
        "https://matias-tmdb.onrender.com/login",
        {
          username: formValues.username,
          password: formValues.password,
        },
        { withCredentials: true, credentials: "include" }
      );
      setUserLogged(userLogOk);
      localStorage.setItem("user", JSON.stringify(userLogOk));
      navigateHome("/");
    } catch {
      toast.error("User not found, please try again", {
        duration: "100",
        style: {
          background: "black",
          color: "white",
        },
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          backgroundSize: "cover",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512149074996-e923ac45be6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Form
          className="w-100"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "40px",
            opacity: ".9",
            borderRadius: "20px",
            maxWidth: "400px",
            maxHeight: "45vh",
            margin: "50px 20px 0 20px",
          }}
        >
          <h2 style={{ textAlign: "center" }}> Sign In</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={formData}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={formData}
              required
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="dark" type="submit">
              Sign in
            </Button>
          </div>
        </Form>
      </div>
      <Toaster />
    </>
  );
};

export default LogIn;
