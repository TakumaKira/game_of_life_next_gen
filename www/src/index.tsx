import { render } from 'react-dom';
import React from 'react';
import App from '@/components/App';
import Fonts from './components/Fonts';

const appElement = document.getElementById('app');
if (!appElement) {
  throw new Error('Element with id "app" not found');
}

render(
  <React.StrictMode>
    <Fonts />
    <App />
  </React.StrictMode>
, appElement);
