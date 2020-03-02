import React from "react"
import { Link } from "gatsby"
import CookieConsent, { Cookies } from "react-cookie-consent";
import ReactGA from 'react-ga';

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  const handleOnAccept = () => {
    Cookies.set('google-analytics', true)
    ReactGA.initialize(process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID);
  }

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <CookieConsent style={{ fontSize: "0.8em" }} onAccept={handleOnAccept}>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Raw Food Kids
      </footer>
    </div>
  )
}

export default Layout
