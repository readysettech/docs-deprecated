import './global.css';

export default function Nextra({ Component, pageProps }) {
  
  return <Component {...pageProps} light/>
}

import Prism from 'prism-react-renderer/prism'
(typeof global !== "undefined" ? global : window).Prism = Prism
// require("prismjs/components/prism-sql")
