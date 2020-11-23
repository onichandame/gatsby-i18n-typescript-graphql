import path from 'path'
import { GatsbyConfig } from 'gatsby'

export default {
  plugins: [
    'gatsby-plugin-typescript',
    { resolve: `gatsby-plugin-graphql-codegen` },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `translations`,
        path: `${path.dirname(__dirname)}/content/translations`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(path.dirname(__dirname), 'src', 'images'),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-template`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // formatted posts
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'post',
        path: path.join(path.dirname(__dirname), 'content', 'posts'),
      },
    },
    'gatsby-plugin-mdx',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
} as GatsbyConfig
