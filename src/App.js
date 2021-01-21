import React  from 'react';
import styled  from 'styled-components';
import { Table }  from'./components/Table';

// styled-componentの実装
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Main = styled.div`
`;
const Header = styled.div`
  padding: 16px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;

const Turn = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style:none;
  width:40%;
`;

const Status = styled.p`
  padding:1rem 0;
  text-align:center;
`;

const Button = styled.div`
  text-align:center;
  margin: 0 auto;
  font-weight: bold;
  border: 2px solid;
  border-radius: 7px;
  padding:0.5rem 3rem;
  background-color: white;
  &:hover{
    background-color: black;
    color: white;
  }  
`;
// 状態
const statusString = {
  processing:    'processing...',
  circleWin:     '○ win!!',
  crossWin:      '× win!!',
  draw:          'draw'
}

const characters = {
  circle: '○',
  cross: '×'
}

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const initialState = {
  cells:       new Array(9),
  nextTurn:    true,
  battleCount: 0,
  statusText:  statusString.processing,
  turn:        characters.circle,
}

// ビュー表示部分を実装
export default class App extends React.Component {
  // 初期化
  constructor(props) {
    super(props);
    this.state = {...initialState};
  }

  // イベント処理
  handleOnClick = (index) => {
    const { cells,turn } = this.state;
    
    const newcells = [...cells];
    newcells[index] = turn;
    console.log(newcells[index])
    // 状態管理
    this.setState({
      cells: newcells,
    });
  };

  render() {
    const {cells, statusText} = this.state;
    return (
      <Container>
        <Main>
          <Header>
            <Title>Tic Tac Toe</Title>
            <Turn>
              <li>{characters.circle}</li>
              <li>{characters.cross}</li>
            </Turn>
          </Header>
          <Table cells={cells} handleOnClick={this.handleOnClick} />
          <Status>{statusText}</Status>
          <Button>Restart</Button>
        </Main>
      </Container>
    );
  }
}