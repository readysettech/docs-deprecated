const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

module.exports = withNextra({
  basePath: "/docs",
  async redirects() {
    return [
      {
        source: '/',
        destination: `https://readyset.io/docs/`,
        permanent: true,
      },
      {
        source: '/:path*',
        destination: `https://readyset.io/docs/:path*`,
        permanent: true,
      }
    ]
  },

})
