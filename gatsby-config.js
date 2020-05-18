require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Raw Food Kids`,
    author: `Lucia Hirvi`,
    description: `A raw vegan food blog`,
    siteUrl: `https://rawfoodkids.netlify.com/`,
    social: {
      instagram: `rawfoodkids`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Raw Food Kids`,
        short_name: `RFK`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#F48FB1`,
        display: "standalone",
        icon: `content/assets/icon.png`,
        crossOrigin: `use-credentials`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
