import React from "react";
import { Button, Card, Nav } from "react-bootstrap";
import "../css/App.css";

export default function GameCard({ testPetObj }) {
  function handleClick(e) {
    console.log("clickingOnImg");
  }

  const { img, name, difficulty, description } = testPetObj;
  return (
    <Card
      onClick={handleClick}
      style={{ width: "35%" }}
      className="m-2 d-flex flex-grow"
    >
      <Card.Img className="mt-2 pet-img" variant="top" alt="pet" src={img} />
      <Card.Body>
        <Card.Title>
          <div className="title-line">{name} </div>
        </Card.Title>
        <Card.Subtitle className="subtitle">A classic...</Card.Subtitle>
        <Card.Text>
          <div className="p1">
            <div>{description}</div>Difficulty: {difficulty}
          </div>
        </Card.Text>
      </Card.Body>
      <Button
        className="my-2"
        onClick={(event) => (window.location.href = "/candy-game")}
      >
        Play Me!
      </Button>
    </Card>
  );
}
