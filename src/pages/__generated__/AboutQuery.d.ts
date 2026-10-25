/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AboutQuery
// ====================================================

export interface AboutQuery_site_siteMetadata_aboutUs {
  main: string | null;
  about1: string | null;
  about2: string | null;
  about3: string | null;
  member1: string | null;
  member2: string | null;
  member3: string | null;
  member4: string | null;
  member5: string | null;
}

export interface AboutQuery_site_siteMetadata {
  aboutUs: AboutQuery_site_siteMetadata_aboutUs | null;
}

export interface AboutQuery_site {
  siteMetadata: AboutQuery_site_siteMetadata | null;
}

export interface AboutQuery {
  site: AboutQuery_site | null;
}
