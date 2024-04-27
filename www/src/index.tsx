import { createRoot } from 'react-dom/client';
import React from 'react';
import DefaultRenderingPipelineExample from './DefaultRenderingPipelineExample';

const app = createRoot(document.getElementById('app'));
app.render(<DefaultRenderingPipelineExample />);
