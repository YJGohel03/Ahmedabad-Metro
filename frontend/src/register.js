import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log("button clicked")
    console.log(formData);
    axios.post('http://127.0.0.1:8000/api/v1/user/register', formData).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error?.response);
    })
  };
  let navigate = useNavigate();
  return (
    <Container style={{ marginTop: "7%", border: "1px solid black",width:'650px',borderRadius:'10px',boxShadow:'0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <center>
            <h2>Register</h2>
          </center>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Button className="btn btn-primary btn-block" type="submit">
              Sign Up
            </Button>{" "}
            <br />
            <center>
              Already have an account?{" "}
              <Button onClick={() => navigate("/login")}>Login</Button>
            </center>
            <br />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default RegisterPage;
