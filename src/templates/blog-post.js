import React from "react"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import moment from "moment";

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.contentfulPost
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  const img = post.image ? <img src={post.image.fluid.src} alt={post.image.title}/> : undefined;

  const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node, children) => <ul style={{ marginLeft: "1em" }}>{children}</ul>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li style={{ marginLeft: "1em" }}>{children}</li>,
    },
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.title}
        description={post.subtitle}
      />
      <article>
        <header>
          <h1 style={{ marginTop: rhythm(1), marginBottom: 0 }}>
            {post.title}
          </h1>
        </header>
        <hr style={{ marginBottom: rhythm(1) }} />
        {img}
        <div style={{ textAlign: "justify" }}>
          {documentToReactComponents(post.content.json, options)}
        </div>
        <div>
          <p>
          { post.tags && post.tags.map((tag, index) => <Link key={index} to={`?search=${tag}`} style={{ marginRight: "10px"}}>{tag}</Link>) }
          </p>
          <p style={{ color: "#808080", fontStyle: "italic" }}>
            Posted: { moment(post.createdAt).format('DD/MM/YYYY') }
          </p>
        </div>
        <footer>
          <Bio />
        </footer>
      </article>
      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost( slug: { eq: $slug }) {
      title
      subtitle
      content {
        json
      }
      image {
        title
        fluid {
         src
        }
      }
      createdAt
      tags
    }
  }
`
