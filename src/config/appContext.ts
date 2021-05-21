import React, { Dispatch } from 'react';

// components
import { Cell, GameStatus } from 'components/BoardCell';

// helpers
import { generateBoard } from 'helpers';

// constants
import { DefaultBoard } from '../constants';

// typings
type ActionMap<M extends { [index: string]: any }>= {
  [Key in keyof M]: M[Key] extends undefined ? ({
    type: Key;
  }) : ({
    type: Key;
    payload: M[Key];
  }) 
};

export enum AppActionTypes {
  UPDATE_CELLS = 'UPDATE_CELLS',
  SET_GAME_STATUS = 'SET_GAME_STATUS',
}

interface AppPayload {
  [AppActionTypes.UPDATE_CELLS]: {
    cells: Cell[][];
  };
  [AppActionTypes.SET_GAME_STATUS]: {
    gameStatus: GameStatus;
  };
}

interface AppState {
  cells: Cell[][];
  cols: number;
  rows: number;
  mines: number;
  gameStatus: GameStatus;
}

type AppAction = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

// init state
export const appInitialState: AppState = {
  cells: generateBoard(DefaultBoard.Cols, DefaultBoard.Rows, DefaultBoard.Mines),
  cols: DefaultBoard.Cols,
  rows: DefaultBoard.Rows,
  mines: DefaultBoard.Mines,
  gameStatus: GameStatus.Started,
};

export const appReducer = (
  state: AppState,
  action: AppAction
): AppState => {
  switch (action.type) {
    default:
      return {
        ...state,
        ...action.payload,
      };
  }
};

export const AppContext = React.createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: appInitialState,
  dispatch: () => null,
});
