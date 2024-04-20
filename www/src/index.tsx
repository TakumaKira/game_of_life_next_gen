import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './app';

const app = createRoot(document.getElementById('app'));
app.render(<App />);
