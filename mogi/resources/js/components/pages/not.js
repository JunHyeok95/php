import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
const StyledTitle = styled.div`
    font-size: 48px;
    flex: 1;
`;
const StyledContent = styled.div`
    font-size: 24px;
    flex: 1;
`;
const StyledButton = styled.button`
    width: 100%;
`;

const NotFoundPage = ({ match, history }) => {
    console.log(match, history.location);
    return (
        <StyledDiv className="flex-center position-ref full-height">
            <div className="content">
                <StyledTitle className="m-b-md text-center">
                    404 Not Found
                </StyledTitle>
                <StyledContent className="m-b-md text-center">
                    {history.location.pathname}
                </StyledContent>
                <StyledButton onClick={() => history.go(-1)}>
                    error
                </StyledButton>
            </div>
        </StyledDiv>
    );
};

export default NotFoundPage;
