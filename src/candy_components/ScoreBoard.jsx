import "../css/App.css";
import "../css/Candy.css";
import React, { useContext } from "react";
import axios from "axios";
import ScoreContext from "../contexts/ScoreContext.jsx";

export default function ScoreBoard({ score }) {
  const { activeUser } = useContext(ScoreContext);

  async function sendScoreToDB(score) {
    try {
      console.log('trying to post score')
      const updateURL = "http://candycrushbackend-production.up.railway.app/api/v1/scores/updateScore";
      let dateStr = new Date();
      const scoreObj = {
        date: dateStr.toString(),
        score: score,
        email: activeUser.email,
      };
      const res = await axios.post(updateURL, scoreObj);
      console.log('should have posted to server')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="score-board">
      <div className="p1">Your current score: {score}</div>

      {
        (window.onbeforeunload = async function () {
          return sendScoreToDB(score);
        })
      }
    </div>
  );
}
