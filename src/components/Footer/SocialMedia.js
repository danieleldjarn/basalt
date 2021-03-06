import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import facebook from "../../images/socialMedia/facebook.svg"
import twitter from "../../images/socialMedia/twitter.svg"
import instagram from "../../images/socialMedia/instagram.svg"

function SocialMedia({ translationLocale }) {
  const {
    site: { defaultLocale, siteSettings, translations },
  } = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        siteSettings
        translations
      }
    }
  `)

  const display =
    siteSettings.facebookLink ||
    siteSettings.twitterLink ||
    siteSettings.instagramLink
      ? true
      : false

  if (display) {
    return (
      <article className="level-item">
        <div className="footer-item">
          {translations.socialMedia[translationLocale] ? (
            <h3 className="title">
              {translations.socialMedia[translationLocale]}
            </h3>
          ) : null}
          <ul>
            {siteSettings.facebookLink[defaultLocale.code] ? (
              <li className="">
                <a href={siteSettings.facebookLink[defaultLocale.code]}>
                  <img src={facebook} width="13" height="13" alt="Facebook" />{" "}
                  Facebook
                </a>
              </li>
            ) : null}
            {siteSettings.twitterLink[defaultLocale.code] ? (
              <li className="">
                <a href={siteSettings.twitterLink[defaultLocale.code]}>
                  <img src={twitter} width="13" height="13" alt="Twitter" />{" "}
                  Twitter
                </a>
              </li>
            ) : null}
            {siteSettings.instagramLink[defaultLocale.code] ? (
              <li className="">
                <a href={siteSettings.instagramLink[defaultLocale.code]}>
                  <img src={instagram} width="13" height="13" alt="Instagram" />{" "}
                  Instagram
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </article>
    )
  }

  return null
}

export default SocialMedia
