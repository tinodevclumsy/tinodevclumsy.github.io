import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

const FooterNav = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const FooterNavItem = styled.a`
  margin-right: 10px;
`;

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    );
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    );
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        <FooterNav>
          <FooterNavItem href="/portofolio" target="_blank" rel="noreferrer">
            About
          </FooterNavItem>

          <FooterNavItem
            href="www.linkedin.com/in/seungjun-martin-lee-tinodevclumsy"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </FooterNavItem>

          <FooterNavItem
            href="https://github.com/tinodevclumsy"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </FooterNavItem>
        </FooterNav>
        © {new Date().getFullYear()} SEUNGJUN LEE, Built with
        {` `}
        <a href="https://www.gatsbyjs.com" target="_blank" rel="noreferrer">
          Gatsby
        </a>
      </footer>
    </div>
  );
};

export default Layout;
