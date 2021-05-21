import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box } from '@chakra-ui/core';

// pages
import Board from 'pages/Board';

// context
import {
  AppContext,
  appReducer,
  appInitialState
} from 'config/appContext';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);

  return (
    <Box maxW="6xl" height="100%" margin="0 auto">
      <AppContext.Provider value={{ state, dispatch }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Board} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </Box>
  );
};

export default App;
