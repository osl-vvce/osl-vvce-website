/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MemberQuery
// ====================================================

export interface MemberQuery_mdx_frontmatter_avatar_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface MemberQuery_mdx_frontmatter_avatar_childImageSharp {
  fluid: MemberQuery_mdx_frontmatter_avatar_childImageSharp_fluid | null;
  id: string;
}

export interface MemberQuery_mdx_frontmatter_avatar {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: MemberQuery_mdx_frontmatter_avatar_childImageSharp | null;
}

export interface MemberQuery_mdx_frontmatter {
  fullname: string | null;
  tagline: string | null;
  about: string | null;
  batch: number | null;
  role: string | null;
  branch: string | null;
  avatar: MemberQuery_mdx_frontmatter_avatar | null;
  facebook: string | null;
  instagram: string | null;
  github: string | null;
  twitter: string | null;
  linkedin: string | null;
}

export interface MemberQuery_mdx {
  body: string;
  frontmatter: MemberQuery_mdx_frontmatter | null;
}

export interface MemberQuery_site_siteMetadata_social {
  name: string | null;
  icon: string | null;
}

export interface MemberQuery_site_siteMetadata {
  social: (MemberQuery_site_siteMetadata_social | null)[] | null;
}

export interface MemberQuery_site {
  siteMetadata: MemberQuery_site_siteMetadata | null;
}

export interface MemberQuery {
  mdx: MemberQuery_mdx | null;
  site: MemberQuery_site | null;
}

export interface MemberQueryVariables {
  slug: string;
}
