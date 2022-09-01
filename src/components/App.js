import "bootstrap/dist/css/bootstrap.min.css";
import "../css/RemoveBootstrapDefault.css";
import "../css/App.css";
import "../css/TextStyles.css";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import HomePage from "./HomePage";
import NavigationBar from "./NavigationBar";
import { useState } from "react";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import DisplayGames from "./DisplayGames";
import CandyPage from "./CandyPage";
import axios from "axios";
import ScoreContext from "../contexts/ScoreContext.jsx";

function App() {
  const [signupModalShow, setSignupModalShow] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeUser, setActiveUser] = useState(
    JSON.parse(localStorage.getItem("userObj"))
  );
  const [latestScore, setLatestScore] = useState(null);
  const [latestScoreDate, setLatestScoreDate] = useState(null);
  const [highScore, setHighScore] = useState(null);
  const navigate = useNavigate();

  function setLocalStorageWithUser(user) {
    try {
      const userStringified = JSON.stringify(user);
      localStorage.setItem("userObj", userStringified);
    } catch (error) {
      console.error(error);
    }
  }

  async function createNewUser(newUser) {
    setErrorMsg(null);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://candycrushbackend-production.up.railway.app/api/v1/auth/register",
        newUser
      );
      const { user, token } = res.data;
      const userAndToken = user;
      userAndToken.token = token;

      setActiveUser(userAndToken);
      setLocalStorageWithUser(user);
      setIsLoading(false);
      setSignupModalShow(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("error response", error.response.data.msg);
      setErrorMsg(error.response.data.msg || error);
      setIsLoading(false);
    }
  }

  async function getHighScore() {
    try {
      const userObj = {
        email: activeUser.email,
      };

      const res = await axios.post(
        "http://candycrushbackend-production.up.railway.app/api/v1/scores/highScore",
        userObj
      );
      const { data } = res;
      const { highScore } = data;
      if (highScore) {
        setHighScore(highScore);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getLastScore() {
    try {
      const userObj = {
        email: activeUser.email,
      };

      const res = await axios.post(
        "http://candycrushbackend-production.up.railway.app/api/v1/scores/lastScore",
        userObj
      );
      const { data } = res;
      const { lastScore, date } = data;
      console.log('data', data)
      if (lastScore) {
        setLatestScore(lastScore);
      }
      if (date) {
        console.log(date);
        setLatestScoreDate(date);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLastScore();
    getHighScore();
   

    return () => {
      getLastScore();
      getHighScore();
    };
  }, []);

  function handleLogout() {
    setActiveUser(null);
    localStorage.clear();
    navigate("/");
  }

  async function userLogin(userObj) {
    setErrorMsg(null);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://candycrushbackend-production.up.railway.app/api/v1/auth/login",
        userObj
      );

      if (res) {
        const { user, token } = res.data;
        const userAndToken = user;
        userAndToken.token = token;
        setLocalStorageWithUser(user);
        setActiveUser(userAndToken);
        navigate("/");
        window.location.reload();
        setIsLoading(false);
        setLoginModal(false);
      }
    } catch (error) {
      setErrorMsg(error.response.data.msg || error);
      console.error("error response", error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <ScoreContext.Provider
        value={{ activeUser, latestScore, highScore, latestScoreDate }}
      >
        <NavigationBar
          handleLogout={handleLogout}
          activeUser={activeUser}
          showSignupModal={() => setSignupModalShow(true)}
          showLoginModal={() => setLoginModal(true)}
        />
        <SignupModal
          createNewUser={createNewUser}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          show={signupModalShow}
          isLoading={isLoading}
          onHide={() => setSignupModalShow(false)}
        />
        <LoginModal
          userLogin={userLogin}
          show={loginModal}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
          isLoading={isLoading}
          onHide={() => setLoginModal(false)}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                showLoginModal={() => setLoginModal(true)}
                showSignupModal={() => setSignupModalShow(true)}
                activeUser={activeUser}
              />
            }
          />
          <Route
            path="/search-games"
            element={
              // <ProtectedRoute>
              <DisplayGames />
              // </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/candy-game"
            element={
              // <ProtectedRoute>
              <CandyPage />
              // </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </ScoreContext.Provider>
    </>
  );
}

export default App;
