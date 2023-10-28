import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Home } from "./routes/Home"
import { ListEdit } from './routes/ListEdit';
import { Search } from './routes/Search';

const defaultTheme = createTheme();

const App = () => {
  const [state, setState] = useState(['Alan_Walker-Sing_me_to_sleep.png', 'Alan_Walker-Darkside.png', 'BUMP_OF_CHICKEN-ray.png', 'Mrs._GREEN_APPLE-Magic.png']);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box 
          sx={{ 
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} 
        >
          { /* ふっきん牛乳のイラスト */ }
          <img src="./images/HukkinMilk.png" className="App-logo" alt="logo" />

          { /* React Router */ }
          <Routes>
            <Route path="/" element={<Home images={state} />} />
            <Route path="/edit" element={<ListEdit images={state} />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;