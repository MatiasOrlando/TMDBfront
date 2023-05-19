import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigateLogIn = useNavigate();

  const formData = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://matiastmbdback.onrender.com/register",
        {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
        },
        { withCredentials: true, credentials: "include" }
      );
      swal({
        title: `Account successfully created`,
        icon: `success`,
        button: `Confirm`,
      }).then(() => navigateLogIn("/loguser"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512149074996-e923ac45be6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
      }}
    >
      <Form
        className="w-25"
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "40px",
          opacity: ".9",
          borderRadius: "20px",
          marginBottom: "270px",
        }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={formData}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={formData}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={formData}
            name="password"
          />
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="dark" type="submit">
            Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
