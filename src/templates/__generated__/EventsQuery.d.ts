/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EventsQuery
// ====================================================

export interface EventsQuery_mdx_frontmatter_banner_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface EventsQuery_mdx_frontmatter_banner_childImageSharp {
  fluid: EventsQuery_mdx_frontmatter_banner_childImageSharp_fluid | null;
  id: string;
}

export interface EventsQuery_mdx_frontmatter_banner {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: EventsQuery_mdx_frontmatter_banner_childImageSharp | null;
}

export interface EventsQuery_mdx_frontmatter {
  title: string;
  date: any | null;
  description: string | null;
  banner: EventsQuery_mdx_frontmatter_banner | null;
}

export interface EventsQuery_mdx {
  body: string;
  frontmatter: EventsQuery_mdx_frontmatter | null;
}

export interface EventsQuery {
  mdx: EventsQuery_mdx | null;
}

export interface EventsQueryVariables {
  slug: string;
}
