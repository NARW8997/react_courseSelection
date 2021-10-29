import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

var rates = [1, 2, 3, 4, 5];

export default function CourseItem(props) {
  const [expanded, setexpanded] = useState(false);

  return (
    <Card style={{ width: "33%", marginTop: "5px", marginBottom: "5px" }}>
      <Card.Body>
        <Card.Title>
          <div style={{ maxWidth: 250 }}>{props.data.name}</div>

          <Button
            variant="outline-dark"
            style={{
              width: 25,
              height: 25,
              fontSize: 12,
              padding: 0,
              position: "absolute",
              right: 20,
              top: 20,
            }}
            onClick={() => {
              setexpanded(!expanded);
            }}
          >
            {expanded ? "▲" : "▼"}
          </Button>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.data.number} - {props.data.credits}{" "}
          {props.data.credits > 1 ? "credits" : "credit"}
        </Card.Subtitle>
        {expanded && <div>{props.data.description}</div>}

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => {
              if (e.target.value >= 4) {
                props.addRecommended(props.data);
              }
            }}
          >
            <option value="">No Rating</option>
            {rates.map((it, index) => (
              <option key={index} value={it}>
                {it}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
