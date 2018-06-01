import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './layouts/App/app';
import './assets/css/index.css';

const rootElement = document.body.querySelector('#root');
if (rootElement) {
	render(<BrowserRouter><App /></BrowserRouter>, rootElement)
}
