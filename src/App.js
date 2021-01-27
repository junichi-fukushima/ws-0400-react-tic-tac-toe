import React from 'react';
import styled from 'styled-components';
import { Table } from './components/Table';

// styled-componentの実装
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Main = styled.div``;
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

const Status = styled.p`
  padding: 1rem 0;
  text-align: center;
`;

const Button = styled.div`
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  border: 2px solid;
  border-radius: 7px;
  padding: 0.5rem 3rem;
  background-color: white;
  &:hover {
    background-color: black;
    color: white;
  }
`;

// 状態
const statusString = {
  processing: 'processing...',
  circleWin: '○ win!!',
  crossWin: '× win!!',
  draw: 'draw',
};

const characters = Object({
  circle: '○',
  cross: '×',
});

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialState = {
  cells: new Array(9),
  progress: true,
  battleCount: 0,
  statusText: statusString.processing,
  turn: characters.circle,
  winner: null
};

const judgeWinner = (cells) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
};


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  tableClick = (index) => {
    const { cells, turn, progress, battleCount, winner } = this.state;

    if (cells[index] || !progress) {
      return;
    }

    const newcells = [...cells];
    newcells[index] = turn;

    let newBattleCount = battleCount;
    newBattleCount++;

    this.setState({
      cells: newcells,
      turn: turn === characters.circle ? characters.cross : characters.circle,
      battleCount: newBattleCount
    });
   
    // どっちかが勝利の場合
    if (judgeWinner(cells,turn,index)) {
      this.setState({
        progress: false,
        winner: turn,
        statusText: winner === characters.circle ?  statusString.circle : statusString.cross
      });
      return;
    }

    // 引き分け
    if (newBattleCount === 9) {
      this.setState({
        progress: false,
        statusText: statusString.draw,
      });
      return;
    }
  };

  restartClick = () => {
    this.setState({ ...initialState });
  };

  render() {
    const { turn, cells, statusText } = this.state;

    return (
      <Container>
        <Main>
          <Header>
            <Title>Tic Tac Toe</Title>
            <Turn>
              {Object.values(characters).map((character) => {
                const selected = character === turn;
                return (
                  <TurnItem key={character} selected={selected}>
                    {character}
                  </TurnItem>
                );
              })}
            </Turn>
          </Header>
          <Table cells={cells} onClick={this.tableClick} />
          <Status>{statusText}</Status>
          <Button onClick={this.restartClick}>Restart</Button>
        </Main>
      </Container>
    );
  }
}
