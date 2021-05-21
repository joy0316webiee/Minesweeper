import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

// typings
export enum CellStatus {
  Unknown,
  Revealed,
  Flagged,
}

export interface Cell {
  status: CellStatus;
  neighborCount: number;
  isMine: boolean;
}

export enum GameStatus {
  Started,
  Won,
  Lost,
}

interface Props extends BoxProps {
  data: Cell;
}

// cell styles
const revealBoxProps: BoxProps = {
  backgroundColor: 'gray.300',
};
const unknownBoxProps: BoxProps = {
  backgroundColor: 'gray.100',
};
const bombBoxProps: BoxProps = {
  backgroundColor: 'red.300',
  color: 'white',
};

const BoardCell: React.FC<Props> = ({
  data: {
    isMine,
    neighborCount,
    status
  },
  ...restProps
}: Props) => {
  const getStyleProps = () => {
    if (status === CellStatus.Revealed) {
      return isMine ? bombBoxProps : revealBoxProps;
    }
    return unknownBoxProps;
  }

  const renderCell = () => {
    if (status === CellStatus.Unknown) return null;
    if (status === CellStatus.Flagged) return 'F';
    if (isMine) return 'X';
    return neighborCount > 0 ? neighborCount : null;
  };

  return (
    <Box
      width="30px"
      height="30px"
      border="1px solid"
      borderColor="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      {...getStyleProps()}
      {...restProps}
    >
      {renderCell()}
    </Box>
  );
};

export default BoardCell;
