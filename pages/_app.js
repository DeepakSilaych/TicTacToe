import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/global.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Tic Tac Toe</title>
        <link rel="icon" href="/img/logo.png" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
