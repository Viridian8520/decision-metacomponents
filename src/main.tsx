import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  * {
    padding: 0;
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={globalStyles} />
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </>
)
