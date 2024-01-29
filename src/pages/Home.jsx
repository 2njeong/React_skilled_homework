import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { data } from "../shared/data";
import GlobalStyle from "../GlobalStyle";

const NavBtn = styled.button`
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  color: ${({ color }) => (color % 2 === 0 ? "white" : "black")};
`;

const navName = (name) => {
  switch (name) {
    case data[0].name:
      return "pink";
    case data[1].name:
      return "black";
    case data[2].name:
      return "pink";
    case data[3].name:
      return "black";
    default:
      return "red";
  }
};

function Home() {
  const navigate = useNavigate();

  const goDetailPage = (id) => {
    return navigate(`/${id}`);
  };

  return (
    <>
      <GlobalStyle />
      <header>
        <h1>BLACK PINK IN YOUR AREA</h1>
        <nav>
          {data.map((idol) => {
            return (
              <NavBtn
                key={idol.id}
                backgroundcolor={navName(idol.name)}
                color={idol.id}
                onClick={() => goDetailPage(idol.id)}
              >
                {idol.name}
              </NavBtn>
            );
          })}
        </nav>
      </header>
    </>
  );
}

export default Home;
