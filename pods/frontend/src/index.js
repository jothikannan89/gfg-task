import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from './config/createApolloClient';
import { Provider } from "react-redux";
import store from "./components/store";

ReactDOM.render(
  <React.StrictMode>
     <ApolloProvider client={ApolloClient}>
     <Provider store={store}>
        <App />
      </Provider>
     </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
