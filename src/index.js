import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import {CameraPage, GalleryPage} from './App';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path="/" component={GalleryPage}/>
			<Route exact path="/camera" component={CameraPage}/>
		</Switch>
	</Router>,
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();