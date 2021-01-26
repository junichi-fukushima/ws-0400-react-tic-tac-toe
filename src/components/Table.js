import React from 'react';
import styled from 'styled-components';

// styled-componentの実装
const Container = styled.div`
  display: flex;
`;
const Row = styled.div`
  border: 1px solid black;
  &:first-child {
    border-right: 0;
  }
  &:last-child {
    border-left: 0;
  }
`;
const Cell = styled.div`
  width: 50px;
  height: 50px;
  border-bottom: 1px solid;
  font-size: 40px;
  text-align: center;
  &:last-child {
    border-bottom: 0;
  }
`;

const RowWrap = ({ cells, rowIndex, onClick }) => {
  return (
    <Row>
      {new Array(3).fill('').map((_, colIndex) => {
        const cellIndex = 3 * (rowIndex - 1) + colIndex;
        const cellClick = () => onClick(cellIndex);
        return (
          <Cell key={cellIndex} onClick={cellClick}>
            {cells[cellIndex]}
          </Cell>
        );
      })}
    </Row>
  );
};

export const Table = ({ cells, onClick }) => {
  return (
    <Container>
      <RowWrap cells={cells} rowIndex={1} onClick={onClick} />
      <RowWrap cells={cells} rowIndex={2} onClick={onClick} />
      <RowWrap cells={cells} rowIndex={3} onClick={onClick} />
    </Container>
  );
};
