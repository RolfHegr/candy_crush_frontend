import React, { useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useRef } from "react";
import { Formik } from "formik";
import "../css/App.css";
import "../css/Login.css";

export default function SignupModal(props) {
  const { onHide, createNewUser, errorMsg, setErrorMsg, isLoading } = props;
  const formik = { Formik };
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const userNameRef = useRef();
  const pwdRef = useRef();
  const repeatpwdRef = useRef();

  const [showAlert, setShowAlert] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  //input values

  function handleChange(e) {
    const fName = firstNameRef.current.value;
    const lName = lastNameRef.current.value;
    const emailValue = emailRef.current.value;
    const userName = userNameRef.current.value;
    const pwd = pwdRef.current.value;
    const repeatPwd = repeatpwdRef.current.value;

    e.preventDefault();
    if (!fName || !lName || !emailValue || !userName || !pwd || !repeatPwd) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleSignup(e) {
    const emailValue = emailRef.current.value;
    const fName = capitalizeFirstLetter(firstNameRef.current.value);
    const lName = capitalizeFirstLetter(lastNameRef.current.value);
    const userName = userNameRef.current.value;
    const pwd = pwdRef.current.value;
  
    e.preventDefault();

    if (!fName || !lName || !emailValue || !userName || !pwd) {
      setErrorMsg("Fill out all required fields...");
      setShowAlert(true);
      return;
    }

    if (pwdRef.current.value !== repeatpwdRef.current.value) {
      alert("Passwords must match");
      return;
    }

    const newUser = {
      firstName: fName,
      lastName: lName,
      email: emailValue,
      userName: userName,
      password: pwd,
      repeatPassword: repeatpwdRef.current.value,
      highScoreCandy: {
        date: new Date(),
        score: "0",
        newScores: [0],
      },
    };

    createNewUser(newUser);
    // onHide();
    //Navigate to homepage - logged in
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
          Sign up to play!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Floating className="mb-3">
            <Form.Control
              ref={firstNameRef}
              required
              type="text"
              placeholder="First name"
              onChange={handleChange}
              id="floatingInputCustom"
            />
            <label htmlFor="floatingInputCustom">First Name</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              ref={lastNameRef}
              required
              type="text"
              placeholder="Last name"
              onChange={handleChange}
            />
            <label htmlFor="floatingInputCustom">Last Name</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              ref={emailRef}
              id="floatingInputCustom"
              type="email"
              placeholder="name@example.com"
              onChange={handleChange}
            />
            <label htmlFor="floatingInputCustom">Email address</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              ref={userNameRef}
              onChange={handleChange}
              type="text"
              placeholder="username"
            />
            <label htmlFor="floatingInputCustom">Nickname</label>
          </Form.Floating>

          <Form.Floating>
            <Form.Control
              ref={pwdRef}
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>

          <Form.Floating className="my-2">
            <Form.Control
              ref={repeatpwdRef}
              id="floatingPasswordRepeat"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <label htmlFor="floatingPasswordCustom">Verify Password</label>
          </Form.Floating>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
          <Button
            className="mb-3 w-25"
            id="loginBtn"
            variant="primary"
            type="submit"
            onClick={handleSignup}
            disabled={isLoading && disableBtn}
          >
            Sign Up
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
      {isLoading && !errorMsg && (
        <div className="w-100 text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </Modal>
  );
}
