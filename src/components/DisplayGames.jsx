import React from "react";
import GameCard from "./GameCard";
import { Container, Row } from "react-bootstrap";
import candyCrush from "../resources/candyCrush.png";

export default function DisplayGames() {
  const candyObj = {
    img: candyCrush,
    name: "Candy Crush",
    difficulty: "medium",
    description: "Match candies in rows of three, four, or more to score!",
  };

  return (
    <Container className="my-5 py-5">
      <div className="d-flex w-100">
        <Row
          xs={1}
          md={5}
          className=" w-100 d-flex justify-content-center mt-2"
        >
          {/* <GameCard testPetObj={testPetObj}/> */}
          {/* {testArrayOfData.map((testPetObj, index) => {
            return <GameCard testPetObj={testPetObj} key={index} />;
          })} */}
          {/* {Array.from({ length: 10 }).map((_, idx) => (
        <Col>   
        </Col>
      ))} */}

          <GameCard className="w-50" testPetObj={candyObj}></GameCard>
        </Row>
      </div>
    </Container>
  );
}
