import React, { useEffect, useState } from "react"
import { graphql, navigate } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Search from "../components/search"
import Post from "../components/post";

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

  const handleOnFocus = () => {
    navigate("/")
    setPosts(allPosts);
  }

  useEffect(() => {

    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const searchWord = searchParams.get('search')
      const posts = searchWord && allPosts.filter(({ node }) => {
        const titleMatch = node.title.toLowerCase().includes(searchWord.toLowerCase());
        const tagMatch = node.tags ? node.tags.map(tag => tag.trim()).includes(searchWord.trim()) : false;
        console.log({ tags: node.tags, searchWord})
        return  titleMatch || tagMatch;
      });
      setPosts(posts);
    } else {
      setPosts(allPosts)
    }
    
  }, [ allPosts, location ]);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <Search handleOnChange={handleOnChange} handleOnFocus={handleOnFocus} handleOnKeyDown={handleOnKeyDown} />
      { 
        filteredPosts.map(({ node }, index) => <Post {...(node)} key={index}/>)
      }
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
          tags
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
