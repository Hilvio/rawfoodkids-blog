import React, { useEffect, useState } from "react"
import { graphql, navigate, Link } from "gatsby"
import indexStyle from "./index.module.css"
import Img from "gatsby-image"
import SEO from "../components/seo"
import Search from "../components/search"
import CookieConsent, { Cookies } from "react-cookie-consent";
import ReactGA from 'react-ga';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const allPosts = data.allContentfulPost.edges;
  const [filteredPosts, setPosts] = useState(allPosts)
  const handleOnChange = event => {
    const searchWord = event.target.value.toLowerCase();
    const posts = allPosts.filter(({ node }) => {
      return node.title.toLowerCase().includes(searchWord) 
      || (node.tags && node.tags.map(tag => tag.trim().toLowerCase()).includes(searchWord));
    });
    setPosts(posts)
  }
  const handleOnKeyDown = event => {
    if (event.keyCode===13) {
      event.target.blur();
    }
  }

  const handleOnFocus = event => {
    event.target.value ='';
    navigate("/")
    setPosts(allPosts);
  }

  const handleOnAccept = () => {
    Cookies.set('google-analytics', true)
    ReactGA.initialize(process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID);
  }

  useEffect(() => {

    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const searchWord = searchParams.get('search')
      const posts = searchWord ? allPosts.filter(({ node }) => {
        const titleMatch = node.title.toLowerCase().includes(searchWord.toLowerCase());
        const tagMatch = node.tags ? node.tags.map(tag => tag.trim()).includes(searchWord.trim()) : false;
        return  titleMatch || tagMatch;
      }) : allPosts;
      setPosts(posts);
    } else {
      setPosts(allPosts)
    }
    
  }, [ allPosts, location ]);

  const NewPost = ({ image, slug, title }) => {
    const img = image ? <Img className={indexStyle.recipeImage} fluid={image.fluid} alt={image.title}/> : undefined;

    return (
      <div className={indexStyle.recipe}>
        <Link className={indexStyle.recipeLink} style={{ boxShadow: `none` }} to={slug}>
          {img}
          <h3 className={indexStyle.recipeTitle}>{title}</h3>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <SEO title="All recipes" />
      <CookieConsent style={{ fontSize: "0.8em" }} onAccept={handleOnAccept}>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <div className={indexStyle.header} />
      <div className={indexStyle.container}>
        <div className={indexStyle.subContainer}>
          <h1 className={indexStyle.title}>{siteTitle}</h1>
          <h3 className={indexStyle.subTitle}>~ Vegan Recipes ~</h3>
          <Search handleOnChange={handleOnChange} handleOnFocus={handleOnFocus} handleOnKeyDown={handleOnKeyDown} />
          <div className={indexStyle.recipes}>
            {
              filteredPosts.map(({ node }, index) => <NewPost {...(node)} key={index}/>)
            }
          </div>
        </div>
      </div>
    </div>
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
