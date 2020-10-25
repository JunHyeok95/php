import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import Button from "../../../components/Button";

const Detail = ({ match, location, history }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("match.params.detail");
    getBoardsDetail(match.params.detail);
  }, []);

  const getBoardsDetail = (detailId) => {
    console.log("detailId");
    console.log(detailId);
    Axios({
      method: "get",
      url: `/api/boards/${detailId}`,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div>heelo</div>
      {data != null && (
        <Container>
          <Row>
            <Col style={{ fontSize: 30 }} className="text-right">
              제목 :{" "}
            </Col>
            <Col style={{ fontSize: 30 }} className="text-left">
              {data.title}
            </Col>
          </Row>
          <Row>
            <Col style={{ fontSize: 24 }} className="text-center">
              {data.content}
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => {
                alert("로그인이 필요합니다");
              }}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                alert("로그인이 필요합니다");
              }}
            >
              삭제
            </Button>
            <Button
              onClick={() => {
                alert("다시하장 ..");
              }}
            >
              글목록
            </Button>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Detail;
