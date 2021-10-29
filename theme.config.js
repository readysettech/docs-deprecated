export default {
  github: 'https://github.com/readysettech',
  titleSuffix: ' – ReadySet',
  logo: (
    <>
      {/* <span style="padding-right:3px; padding-top: 3px; display:inline-block;">

      <img class="manImg" src="/2x-Color.gif"></img>

      </span> */}
      <span className="mr-2 font-extrabold hidden md:inline">ReadySet</span>
      <span className="text-gray-600 font-normal hidden md:inline">
        Documentation
      </span>
    </>
  ),
  head: (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="ReadySet Documentation" />
      <meta name="og:description" content="ReadySet Documentation" />
      <meta name="og:title" content="ReadySet Documentation" />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  
  unstable_faviconGlyph: '👋',
}
