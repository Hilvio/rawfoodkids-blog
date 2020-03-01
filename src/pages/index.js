import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import moment from "moment";
import Img from "gatsby-image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Search from "../components/search"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const allPosts = data.allContentfulPost.edges;
  const [filteredPosts, setPosts] = useState(allPosts)
  const handleOnChange = event => {
    const posts = allPosts.filter(({ node }) => node.title.toLowerCase().includes(event.target.value.toLowerCase()));
    setPosts(posts)
  }
  const handleOnKeyDown = event => {
    if (event.keyCode===13) {
      event.target.blur();
    }
  }

  const handleOnFocus = event => {
    event.target.value ='';
    setPosts(allPosts);
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <Search handleOnChange={handleOnChange} handleOnFocus={handleOnFocus} handleOnKeyDown={handleOnKeyDown} />
      {filteredPosts.map(({ node }) => {
        const title = node.title || node.slug
        const img = node.image ? <Img fluid={node.image.fluid} alt={node.image.title}/> : undefined;
        return (
          <article key={node.slug}>
            {img}
            <header>
              <h3 style={{ marginTop: 28 }}>
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
            </header>
            <section style={{ textAlign: "justify" }}>
              <p dangerouslySetInnerHTML={{ __html: node.subtitle }} />
            </section>
            <p style={{ color: "#808080", fontStyle: "italic", marginBottom: "1em" }}>
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
    allContentfulPost(sort:{
      fields: createdAt
      order: DESC
    }) {
      edges {
        node {
          title
          subtitle
          slug
          createdAt
          image {
            title
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
