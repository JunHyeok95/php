import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Table, Pagination } from "react-bootstrap";
import Axios from "axios";
import styled from "styled-components";

const HoverTd = styled.td`
  cursor: pointer;
  &:hover {
    color: #0000ff;
  }
`;

const Boards = ({ userInfo, match, history }) => {
  const [perPage] = useState(
    (window.innerWidth || document.body.clientWidth) >= 768 ? 15 : 10
  );
  const [paging] = useState(
    (window.innerWidth || document.body.clientWidth) >= 768 ? 8 : 4
  );
  const [data, setData] = useState(null);
  const [look, setLook] = useState(0);

  // XHTML -> document.body.clientWidth
  // HTML5 -> window.innerWidth
  // if ((window.innerWidth || document.body.clientWidth) > 767) {
  //   console.log("767 이상 입니다");
  // } else console.log("이하");

  useEffect(() => {
    if (sessionStorage.getItem("page") && sessionStorage.getItem("look")) {
      // getBoards(sessionStorage.getItem("page"));
      // setLook(sessionStorage.getItem("look"));
    } else {
    }

    const mql = window.matchMedia("screen and (max-width: 768px)");
    mql.removeEventListener("change", () => {});
    mql.addEventListener("change", (e) => {
      if (e.matches) {
        console.log("모바일 화면 입니다.");
      } else {
        console.log("데스크탑 화면 입니다.");
      }
    });

    getBoards();

    return () => {};
  }, []);

  const getBoards = (pageNumber) => {
    const currentPage = pageNumber;

    // // TEST CODE
    // if (currentPage != undefined) {
    //   sessionStorage.setItem("look", look);
    //   sessionStorage.setItem("page", currentPage);
    // }

    Axios({
      method: "get",
      url: "/api" + match.url, // "/boards" or "/:slug/boards"
      params: {
        page: currentPage,
        perPage,
      },
    })
      .then((res) => {
        setData(res.data[0]);
        // console.log(res.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const renderBoardHead = () => {
    return (
      <thead
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <tr>
          <th style={{ width: "5%" }} scope="col" className="text-center">
            No
          </th>
          <th style={{ width: "50%" }} scope="col" className="text-center">
            제목
          </th>
          <th style={{ width: "20%" }} scope="col" className="text-center">
            글쓴이
          </th>
          <th style={{ width: "20%" }} scope="col" className="text-center">
            날짜
          </th>
          <th style={{ width: "5%" }} scope="col" className="text-center">
            조회
          </th>
        </tr>
      </thead>
    );
  };

  const renderBoardBody = () => {
    // 분류, 제목, 글쓴이, 날짜, 조회수
    let itemArr = [];
    for (let i = 0; i < data.data.length; i++) {
      itemArr.push(
        <tr key={"BoardBody" + i}>
          <td className="text-center">{data.data[i].id}</td>
          <HoverTd
            className="text-truncate"
            style={{
              maxWidth: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              // console.log(data.data[i].id, "history push");
              history.push(`/boards/detail/${data.data[i].id}`);
            }}
          >
            {data.data[i].title}
          </HoverTd>
          <td
            style={
              userInfo
                ? userInfo.name === data.data[i].user_name
                  ? {
                      maxWidth: "1px",
                      color: "#0000FF",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }
                  : {
                      maxWidth: "1px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }
                : null
            }
            className="text-center"
          >
            {data.data[i].user_name}
          </td>
          <td
            className="text-center"
            style={{
              maxWidth: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data.data[i].updated_at.slice(5, 10) +
              " " +
              data.data[i].updated_at.slice(11, 16)}
          </td>
          <td className="text-center">{data.data[i].view}</td>
        </tr>
      );
    }
    return (
      <tbody
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {itemArr}
      </tbody>
    );
  };

  const renderPagination = () => {
    const firstPaging = look * paging + 1;
    const lastPaging =
      (look + 1) * paging > Math.ceil(data.total / data.per_page)
        ? Math.ceil(data.total / data.per_page)
        : (look + 1) * paging;
    let items = [];

    for (let i = firstPaging; i <= lastPaging; i++) {
      items.push(
        <Pagination.Item
          key={"Pagination" + i}
          active={i == data.current_page}
          onClick={() => {
            getBoards(i);
          }}
        >
          {i}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="d-flex justify-content-between">
        <Pagination.Item style={{ visibility: "hidden" }} disabled>
          글쓰기
        </Pagination.Item>
        <Row>
          {look > 0 && (
            <Pagination.First
              onClick={() => {
                getBoards(0);
                setLook(0);
              }}
            />
          )}
          {data.current_page > 1 && (
            <Pagination.Prev
              onClick={() => {
                getBoards(data.current_page - 1);
                if (data.current_page == look * paging + 1) {
                  setLook(look - 1);
                }
              }}
            />
          )}
          {items}
          {data.current_page != Math.ceil(data.total / data.per_page) && (
            <Fragment>
              <Pagination.Next
                onClick={() => {
                  getBoards(data.current_page + 1);
                  if (data.current_page == (look + 1) * paging) {
                    setLook(look + 1);
                  }
                }}
              />
              <Pagination.Last
                onClick={() => {
                  getBoards(Math.ceil(data.total / data.per_page));
                  const point =
                    Math.ceil(data.total / data.per_page) % paging == 0 ? 1 : 0; // 마법소스
                  setLook(
                    parseInt(Math.ceil(data.total / data.per_page) / paging) -
                      point
                  );
                }}
              />
            </Fragment>
          )}
        </Row>
        <Pagination.Item
          onClick={() => {
            if (userInfo) {
              history.push("/boards/write");
            } else {
              alert("로그인이 필요합니다");
            }
          }}
        >
          글쓰기
        </Pagination.Item>
      </Pagination>
    );
  };

  return (
    <Fragment>
      {data != null && (
        <Container className="p-0">
          <Table striped bordered hover size="sm">
            {renderBoardHead()}
            {renderBoardBody()}
          </Table>
          {renderPagination()}
        </Container>
      )}
    </Fragment>
  );
};

export default Boards;
