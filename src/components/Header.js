import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  padding: 16px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;

const Turn = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  width: 80%;
  padding: 0.5rem 0;
  margin: 0 auto;
`;

const TurnItem = styled.div`
  border-bottom: ${({ selected }) => (selected ? '3px solid black' : '0')};
  text-align: center;
  width: 50%;
`;

export const HeaderWrap = ({ characters, turn }) => {
  return (
    <Header>
      <Title>Tic Tac Toe</Title>
      <Turn>
        {characters.map((character) => {
          const selected = character === turn;
          return (
            <TurnItem key={character} selected={selected}>
              {character}
            </TurnItem>
          );
        })}
      </Turn>
    </Header>
  );
};
