import { createRoot } from 'react-dom/client';
import React from 'react';
import App from '@/App';

const appElement = document.getElementById('app');
if (!appElement) {
  throw new Error('Element with id "app" not found');
}

const app = createRoot(appElement);
app.render(<App />);
