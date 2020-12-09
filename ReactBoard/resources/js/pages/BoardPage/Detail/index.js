import React, { Fragment, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import Button from "../../../components/Button";

const Detail = ({ userInfo, match, history }) => {
  const [data, setData] = useState(null);
  const content = useRef();

  useEffect(() => {
    getBoardsDetail(match.params.detail);
  }, []);

  // show
  const getBoardsDetail = (detailId) => {
    Axios({
      method: "get",
      url: `/api/boards/${detailId}`,
    })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        content.current.innerHTML = res.data.content;
      })
      .catch((error) => console.log(error));
  };

  // destroy
  const deleteBoardsDetail = (detailId) => {
    Axios({
      method: "delete",
      url: `/api/boards/${detailId}`,
      headers: {
        Authorization:
          "Bearer " +
          (userInfo ? (userInfo.token ? userInfo.token : "null") : "null"),
      },
    })
      .then((res) => {
        if (res.data === true) {
          console.log("게시판 삭제 성공");
          history.push(`/boards`);
        } else if (res.data === false) {
          console.log("게시판 삭제 실패");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      {data != null && (
        <Container>
          <Row>
            <Col
              style={{
                padding: "2px",
                border: "solid black 2px",
                fontSize: 20,
              }}
              className="col-sm-2 text-center"
            >
              제목{" "}
            </Col>
            <Col
              style={{
                padding: "2px",
                border: "solid black 2px",
                fontSize: 20,
              }}
              className="pl-2 text-left"
            >
              {data.title}
            </Col>
          </Row>
          <Row style={{ minHeight: 300 }}>
            <Col ref={content} style={{ fontSize: 16 }} className="p-4">
              {/* content.current.innerHTML */}
            </Col>
          </Row>
          <Row style={{ border: "2px solid black" }} className="d-flex p-1">
            <Col
              // style={{ backgroundColor: "yellow" }}
              className="p-1"
            >
              <Button
                onClick={() => {
                  history.push(`/boards`);
                }}
              >
                글 목록
              </Button>
            </Col>
            <Col
              // style={{ backgroundColor: "green" }}
              className="d-flex justify-content-end p-1"
            >
              <Button
                onClick={() => {
                  history.push(`/boards/${match.params.detail}/write`);
                }}
              >
                수정
              </Button>
              <Button
                onClick={() => {
                  deleteBoardsDetail(match.params.detail);
                }}
              >
                삭제
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Fragment>
  );
};

export default Detail;
