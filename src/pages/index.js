import React from "react"
import { Link, graphql } from "gatsby"
import moment from "moment";

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulPost.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.title || node.slug
        const img = node.image ? <img src={node.image.fluid.src}/> : undefined;
        return (
          <article key={node.slug}>
            {img}
            <header>
              <h3 style={{ marginTop: 0 }}>
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
            </header>
            <section style={{ textAlign: "justify" }}>
              <p dangerouslySetInnerHTML={{ __html: node.subtitle }} />
            </section>
            <p>
              {moment(node.createdAt).format('DD/MM/YYYY')}
            </p>
            <hr style={{ marginBottom: rhythm(1) }} />
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      edges {
        node {
          title
          subtitle
          slug
          createdAt
          image {
            fluid {
              src
            }
          }
        }
      }
    }
  }
`
