import styled from "styled-components";

export const FanDivSt = styled.div`
  position: fixed;
  background-color: #f3f3f3;
  top: 20%;
  left: 37%;
  width: 380px;
  height: 470px;
  opacity: 0.95;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 4px solid lightgray;
  border-radius: 15px;
  padding: 10px 15px 20px 15px;
`;

export const FanBtnSt = styled.button`
  margin: 0 5px 0 auto;
  width: 20px;
  height: 20px;
`;

export const FanImgSt = styled.img`
  height: 200px;

  border-radius: 90%;
`;

export const FanNicknameP = styled.p`
  font-size: 30px;
  font-weight: 550;
`;

export const FanDetailDataDiv = styled.div`
  display: flex;
  width: 400px;
  font-size: ${({ favorite }) => (favorite === 1 ? "20px" : "15px")};
  justify-content: space-around;
  padding: ${({ favorite }) =>
    favorite === 1 ? "0 50px 0 50px" : "0 20px 0 50px"};
`;

export const FanP = styled.p`
  display: contents;
`;
