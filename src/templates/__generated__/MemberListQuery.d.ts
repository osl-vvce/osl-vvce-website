/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MemberListQuery
// ====================================================

export interface MemberListQuery_allMdx_edges_node_frontmatter_avatar_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface MemberListQuery_allMdx_edges_node_frontmatter_avatar_childImageSharp {
  fluid: MemberListQuery_allMdx_edges_node_frontmatter_avatar_childImageSharp_fluid | null;
  id: string;
}

export interface MemberListQuery_allMdx_edges_node_frontmatter_avatar {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: MemberListQuery_allMdx_edges_node_frontmatter_avatar_childImageSharp | null;
}

export interface MemberListQuery_allMdx_edges_node_frontmatter {
  fullname: string | null;
  role: string | null;
  avatar: MemberListQuery_allMdx_edges_node_frontmatter_avatar | null;
}

export interface MemberListQuery_allMdx_edges_node_fields {
  slug: string | null;
}

export interface MemberListQuery_allMdx_edges_node {
  id: string;
  frontmatter: MemberListQuery_allMdx_edges_node_frontmatter | null;
  fields: MemberListQuery_allMdx_edges_node_fields | null;
}

export interface MemberListQuery_allMdx_edges {
  node: MemberListQuery_allMdx_edges_node;
}

export interface MemberListQuery_allMdx {
  edges: MemberListQuery_allMdx_edges[];
}

export interface MemberListQuery {
  allMdx: MemberListQuery_allMdx;
}

export interface MemberListQueryVariables {
  skip: number;
  limit: number;
}
