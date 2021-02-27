import React from 'react';
import ReactDOM from 'react-dom';

import {default as isElectron} from 'is-electron';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'

import '@/app/style.scss'
import '@/app/images/logo.png';
import App from '@/app/app';

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

console.log(`isEnvProduction = ${isEnvProduction} - isEnvDevelopment = ${isEnvDevelopment}`);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);