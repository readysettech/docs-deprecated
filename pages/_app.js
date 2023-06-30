import './global.css';
import React from 'react';

export default function Nextra({ Component, pageProps }) {
  React.useEffect(()=> {
    localStorage.theme = 'light';
  })
  return <Component {...pageProps}/>
}

import Prism from 'prism-react-renderer/prism'
(typeof global !== "undefined" ? global : window).Prism = Prism
// require("prismjs/components/prism-sql")


