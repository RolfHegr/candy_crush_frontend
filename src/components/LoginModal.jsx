import React, { useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useRef } from "react";
import "../css/App.css";
import "../css/Login.css";

export default function LoginModal(props) {
  const { userLogin, errorMsg, setErrorMsg, isLoading } = props;
  const [showAlert, setShowAlert] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const emailRef = useRef();
  const pwdRef = useRef();

  function handleChange(e) {
    e.preventDefault();
    const emailInput = emailRef.current.value;
    const pwdInput = pwdRef.current.value;

    if (emailInput && pwdInput) setDisableBtn(false);
    if (!emailInput || !pwdInput) setDisableBtn(true);
  }

  function handleLogin(e) {
    e.preventDefault();

    if (!emailRef.current.value || !pwdRef.current.value) {
      setErrorMsg("Fill out all required fields...");
      setShowAlert(true);
      return;
    }
    const userObj = {
      email: emailRef.current.value,
      password: pwdRef.current.value,
    };

    userLogin(userObj);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="title-line">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="p1">Email Address</Form.Label>
            <Form.Control
              ref={emailRef}
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Label className="p1">Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={pwdRef}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            className=" w-25"
            id="loginBtn"
            variant="primary"
            type="submit"
            onClick={handleLogin}
            disabled={disableBtn}
          >
            Log in
          </Button>
          {errorMsg && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <Alert.Heading>Oops! Error</Alert.Heading>
              <p>{errorMsg}</p>
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
      {isLoading && (
        <div className="w-100 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </Modal>
  );
}
