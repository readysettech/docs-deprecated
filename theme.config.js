export default {
  github: 'https://github.com/readysettech',
  titleSuffix: ' – ReadySet',
  docsRepositoryBase : 'https://github.com/readysettech/readyset-public-docs/',
  logo: (
    <>

      <span className="rslogo">

      <img className="manImg" src="/Color-2x.png" width="32" height="32" style={{ 'padding-left': '1px', 'padding-right': '5px'}}></img>

      </span>
      <span className="mr-2 font-extrabold hidden md:inline">ReadySet</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Documentation
      </span>
    </>
  ),
  head: (
    <>
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="ReadySet Documentation" />
      <meta name="og:description" content="ReadySet Documentation" />
      <meta name="og:title" content="ReadySet Documentation" />g

      <script async src="https://www.googletagmanager.com/gtag/js?id=G-QHKR2RLDNK"></script>
      <script src="gtag.js"></script>
    </>
  ),
  footerText: `MIT ${new Date().getFullYear()} © ReadySet.`,
  darkMode: false,
  search: true,
  prevLinks: true,
  nextLinks: true,
  floatTOC: true, 
  unstable_faviconGlyph: '✨'
}
