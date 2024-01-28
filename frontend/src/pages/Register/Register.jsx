import { useState } from "react";
//import { Link } from "react-router_dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/CardHeader";
import Cardboady from "react-bootstrap/CardBody";
import CardBody from "react-bootstrap/CardBody";
import axios from "axios";

//import loging from "./../Loging/Loging";
import { Link } from "react-router-dom";
const Register = () => {
  const [saveStatus, setsaveStatus] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const respond = await axios.post(
        "http://localhost:3001/api/v1/users/register",
        inputs
      );

      // console.log(respond.data);
      setsaveStatus(respond.data);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <Container
      fluid="md"
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {/* <Row></Row> */}
      <Row>
        <Col className="d-flex justify-content-center">
          <Card style={{ width: "30rem" }}>
            <CardHeader>
              <h3>Create New User</h3>
            </CardHeader>

            <CardBody>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInputusername"
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
                  controlId="exampleForm.ControlInputpassword"
                >
                  <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInputemail"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInputfirstname"
                >
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.Controllastname"
                >
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.Controlmobile"
                >
                  <Form.Control
                    type="text"
                    placeholder="Mobile"
                    name="mobile"
                    onChange={handleChange}
                  />
                </Form.Group>
                {err && err}
                {saveStatus}
                <Row>
                  <Col>
                    <Button onClick={handleClick}>Register</Button>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Link to="/">
                      <Button>Login</Button>
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
export default Register;
