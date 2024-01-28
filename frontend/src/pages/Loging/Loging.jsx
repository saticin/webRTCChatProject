import React, { useState } from "react";
//import { Link } from "react-router_dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import CardBody from "react-bootstrap/CardBody";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Loging = () => {
  const [sessionData, setSessionData] = useState("");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const updateSessionData = (userEmail) => {
    localStorage.setItem("sessionData", userEmail);

    setSessionData(userEmail);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const respond = await axios.post(
        "http://localhost:3001/api/v1/users/login",
        inputs
      );
      const jwtToken = respond.data[1];
      const uidfromlogingdb = respond.data[2];
      document.cookie = `jwtToken=${jwtToken}; path=/`;
      document.cookie = `uid=${uidfromlogingdb}; path=/`;
      updateSessionData(respond.data[0].email);
      navigate("/call");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <Container
      fluid="md"
      className="d-flex align-items-center justify-content-center "
      style={{ height: "75vh" }}
    >
      <Row>
        <Col className="d-flex justify-content-center">
          <Card style={{ width: "30rem" }}>
            <CardHeader>
              <h3>User Loging</h3>
            </CardHeader>

            <CardBody>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInputusernameloging"
                >
                  <Form.Control
                    type="text"
                    placeholder="User Name"
                    name="username"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInputpasswordl;oging"
                >
                  <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row>
                  <Col>{err && err}</Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={handleClick}>Loging</Button>
                  </Col>
                  <Col className="align-items-rigght">
                    <Link to="/signup">
                      <Button>New user</Button>
                    </Link>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Loging;
