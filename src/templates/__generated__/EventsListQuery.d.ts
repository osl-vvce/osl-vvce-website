/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EventsListQuery
// ====================================================

export interface EventsListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface EventsListQuery_allMdx_edges_node_frontmatter_image_childImageSharp {
  fluid: EventsListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface EventsListQuery_allMdx_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: EventsListQuery_allMdx_edges_node_frontmatter_image_childImageSharp | null;
}

export interface EventsListQuery_allMdx_edges_node_frontmatter {
  title: string;
  description: string | null;
  date: any | null;
  image: EventsListQuery_allMdx_edges_node_frontmatter_image | null;
}

export interface EventsListQuery_allMdx_edges_node_fields {
  slug: string | null;
}

export interface EventsListQuery_allMdx_edges_node {
  id: string;
  frontmatter: EventsListQuery_allMdx_edges_node_frontmatter | null;
  fields: EventsListQuery_allMdx_edges_node_fields | null;
}

export interface EventsListQuery_allMdx_edges {
  node: EventsListQuery_allMdx_edges_node;
}

export interface EventsListQuery_allMdx {
  edges: EventsListQuery_allMdx_edges[];
}

export interface EventsListQuery {
  allMdx: EventsListQuery_allMdx;
}

export interface EventsListQueryVariables {
  skip: number;
  limit: number;
}
