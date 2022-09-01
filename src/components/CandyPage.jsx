import React from "react";
import { Container } from "react-bootstrap";
import CandyGame from "../candy_components/CandyGame";

export default function CandyPage() {
  return (
    <Container className="my-5 py-5">
      <CandyGame></CandyGame>
    </Container>
  );
}
