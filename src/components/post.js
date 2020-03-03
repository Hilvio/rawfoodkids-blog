import React from 'react'
import { Link } from "gatsby"
import moment from "moment";
import Img from "gatsby-image"
import { rhythm } from "../utils/typography"

const Post = ({ createdAt, image, slug, subtitle, title }) => {

    const header = title || slug
    const img = image ? <Img fluid={image.fluid} alt={image.title}/> : undefined;

    return (
        <article key={slug}>
            {img}
            <header>
              <h3 style={{ marginTop: 28 }}>
                <Link style={{ boxShadow: `none` }} to={slug}>
                  {header}
                </Link>
              </h3>
            </header>
            <section style={{ textAlign: "justify" }}>
              <p dangerouslySetInnerHTML={{ __html: subtitle }} />
            </section>
            <p style={{ color: "#808080", fontStyle: "italic", marginBottom: "1em" }}>
              {moment(createdAt).format('DD/MM/YYYY')}
            </p>
            <hr style={{ marginBottom: rhythm(1) }} />
        </article>
    )
}

export default Post