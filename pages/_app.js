import './global.css';
import React from 'react';
import { Toaster } from '../components/Toast';

export default function Nextra({ Component, pageProps }) {
  React.useEffect(() => {
    localStorage.theme = 'light';
  })
  return (
    <>
      <Toaster position="bottom-right" closeButton duration={3500} />
      <Component {...pageProps} />
    </>)
}

import Prism from 'prism-react-renderer/prism'
(typeof global !== "undefined" ? global : window).Prism = Prism
// require("prismjs/components/prism-sql")


