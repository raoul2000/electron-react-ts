import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/app/app';

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

console.log(`isEnvProduction = ${isEnvProduction} - isEnvDevelopment = ${isEnvDevelopment}`);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);