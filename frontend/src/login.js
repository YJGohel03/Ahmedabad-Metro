import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import axios from "axios";
import "./login.css";

function Login() {
  // State variables to store email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log("button clicked");
    if (email == "" || password == "") {
      alert("Please enter details");
    } else {
      axios
        .post("http://127.0.0.1:8000/api/v1/user/login", { email, password })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error?.response);
        });
      navigate("/homepage");
    }
    setEmail("");
    setPassword("");
  };
  let navigate = useNavigate();
  return (
    <div>
      <Container
        className="login-container"
        style={{ marginTop: "4%", border: "1px solid black" }}
      >
        <Form className="login-form" onSubmit={handleSubmit}>
          <h2 className="text-center">Ahmedabad Metro</h2>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </FormGroup>
          <FormGroup check>
            <Label check className="text-center mt-3">
              <Input type="checkbox" name="rememberMe" />
              Remember Me
            </Label>
          </FormGroup>
          <div className="text-center mt-3">
            <a href="#"> Forgot Password?</a>
          </div>
          <Button className="btn btn-primary btn-block" onClick={handleSubmit}>
            Login
          </Button>
          <div>
            <center>
              <p>
                New To AMTracker?{" "}
                <Button onClick={() => navigate("/register")}>Register</Button>
              </p>
            </center>
          </div>
        </Form>{" "}
        <br />
      </Container>
    </div>
  );
}
export default Login;
