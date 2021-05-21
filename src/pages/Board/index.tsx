import React, { useContext } from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/core';

// components
import BoardCell, { CellStatus, GameStatus } from 'components/BoardCell';

// app context
import { AppContext, AppActionTypes } from 'config/appContext';

// helpers
import { revealCell, flagCell } from 'helpers';

const lostWonBoxProps: BoxProps = {
  cursor: 'not-allowed',
  pointerEvents: 'none',
};

const Board: React.FC<BoxProps> = ({ ...restProps }: BoxProps) => {
  const { state, dispatch } = useContext(AppContext);
  const { cells, cols, rows, gameStatus, mines } = state;

  const onClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    col: number,
    row: number
  ) => {
    e.stopPropagation();
    const _cells = [...cells];
    if (e.altKey) {
      flagCell(col, row, _cells);
    } else {
      if (_cells[col][row].isMine) {
        _cells[col][row].status = CellStatus.Revealed;
        dispatch({ type: AppActionTypes.SET_GAME_STATUS, payload: { gameStatus: GameStatus.Lost } });
      } else {
        revealCell(cols, rows, col, row, _cells);
      }
    }
    dispatch({ type: AppActionTypes.UPDATE_CELLS, payload: { cells: _cells } });
  }

  const renderCells = () => cells.map((column, colIndex) => (
    <Box key={colIndex} display="flex" flexDir="column">
      {column.map((__, rowIndex) => (
        <BoardCell
          key={rowIndex}
          data={cells[colIndex][rowIndex]}
          onClick={(e) => onClick(e, colIndex, rowIndex)}
        />
      ))}
    </Box>
  ))

  const getGameStatusText = () => {
    switch (gameStatus) {
      case GameStatus.Lost:
        return 'You lost the game.';
      case GameStatus.Won:
        return 'Congrats! You won the game!';
      case GameStatus.Started:
        default:
        return 'Game Started';
    }
  };

  let cellBoxProps = {};
  if (gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won) {
    cellBoxProps = lostWonBoxProps;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      marginTop="50px"
      height="100%" {...restProps}
    >
      <Box textAlign="center">
        <Text as="h1" fontSize="16px" fontWeight="bold">
          {getGameStatusText()}
        </Text>
        <Text as="p" fontSize="14px">
          Cols: {cols}, Rows: {rows}, Mines: {mines}
          <br />
          Flag = Alt + Click
        </Text>
      </Box>
      <Box 
        marginTop="20px"
        display="flex"
        {...cellBoxProps}
      >
        {renderCells()}
      </Box>
    </Box>
  );
};

export default Board;
