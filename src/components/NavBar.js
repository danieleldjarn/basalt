import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Search from "./Search"
import LocaleSwitcher from "./LocaleSwitcher"
import logo from "../images/logo.svg"

function NavBar({ currentLocale, translationLocale }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        defaultLocale
        locales
        translations
        siteSettings
      }
      allContentfulPage {
        nodes {
          id
          fields {
            slug
          }
          title
          node_locale
        }
      }
    }
  `)

  const {
    site: { defaultLocale, locales, translations, siteSettings },
    allContentfulPage,
  } = data

  const pages = () => {
    return currentLocale === ""
      ? allContentfulPage.nodes.map(node => {
          return node.node_locale === defaultLocale.code ? (
            <Link
              to={`${node.fields.slug}`}
              className="navbar-item"
              key={node.id}
            >
              {node.title}
            </Link>
          ) : null
        })
      : allContentfulPage.nodes.map(node => {
          return node.node_locale === currentLocale ? (
            <Link
              to={`/${node.fields.slug}`}
              className="navbar-item"
              key={node.id}
            >
              {node.title}
            </Link>
          ) : null
        })
  }

  const burger = () => {
    const burger = document.getElementById("navbar-burger")
    burger.classList.toggle("is-active")
    const navbarMenu = document.getElementById("navbar-menu")
    navbarMenu.classList.toggle("is-active")
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={currentLocale}>
          <img src={logo} width="112" height="28" alt="Bulma logo." />{" "}
          <h1 className="title">{siteSettings.siteName[defaultLocale.code]}</h1>
        </Link>

        <span
          className="navbar-burger burger"
          id="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-burger"
          onClick={() => burger()}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div id="navbar-menu" className="navbar-menu">
        <div className="navbar-start"></div>

        <div className="navbar-end">
          {defaultLocale ? pages() : null}

          <div className="navbar-item has-dropdown is-hoverable">
            <Link
              to={
                currentLocale === ""
                  ? `/${translations.blog[defaultLocale.code].toLowerCase()}`
                  : `/${currentLocale}/${translations.blog[
                      translationLocale
                    ].toLowerCase()}`
              }
              className="navbar-item"
            >
              {translations.blog[translationLocale]}
            </Link>
            <div className="navbar-dropdown">
              <Link
                to={
                  currentLocale === ""
                    ? `/${translations.categories[
                        defaultLocale.code
                      ].toLowerCase()}`
                    : `/${currentLocale}/${translations.categories[
                        translationLocale
                      ].toLowerCase()}`
                }
              >
                {translations.categories[translationLocale]}
              </Link>
            </div>
          </div>

          {locales ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <Link to={`/`} className="navbar-link">
                {translations.languages[translationLocale]}
              </Link>
              <div className="navbar-dropdown">
                <LocaleSwitcher
                  defaultLocale={defaultLocale.code}
                  locales={locales}
                />
              </div>
            </div>
          ) : null}
          <div className="navbar-item">
            <Search
              noSearchResults={translations.noSearchResults[translationLocale]}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
