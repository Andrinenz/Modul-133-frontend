import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';
import { store } from './state/store';
import { Theme } from '@carbon/react';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Theme theme={'g10'}>
      <Router>
        <App />
      </Router>
    </Theme>
  </Provider>
);
