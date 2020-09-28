import React from "react";
import { Row, Col } from "react-bootstrap";

const Detail = ({ match, location, history }) => {
  console.log(match.params);
  return (
    <div>
      <p>Detail</p>
      <Row>
        <Col>
          <pre style={{ fontSize: 10 }}>
            <h6>match</h6>
            {JSON.stringify(match, null, 4)}
          </pre>
        </Col>
        <Col>
          <pre style={{ fontSize: 10 }}>
            <h6>location</h6>
            {JSON.stringify(location, null, 4)}
          </pre>
        </Col>
        <Col>
          <pre style={{ fontSize: 10 }}>
            <h6>history</h6>
            {JSON.stringify(history, null, 4)}
          </pre>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
