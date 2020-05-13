const MAX_COLLABORATORS_PER_CALL = 50;

const queries = {
  organizationQuery: `
    query ($organization: String!, $collaboratorsCursor: String, $repositoriesCursor: String) {
      organization(login: $organization) {
        samlIdentityProvider {
          externalIdentities(first: 100) {
            pageInfo {
              startCursor
              endCursor
              hasNextPage
            }
            edges {
              node {
                samlIdentity {
                  nameId
                }
                user {
                  login
                }
              }
            }
          }
        }
        repositories (first: 1, after: $repositoriesCursor) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          nodes {
            name
            collaborators(first: ${MAX_COLLABORATORS_PER_CALL}, after: $collaboratorsCursor, affiliation: ALL) {
              pageInfo {
                endCursor
                hasNextPage
              }
              edges {
                node {
                  name
                  login
                }
                permission
                permissionSources {
                    source {
                        ... on Organization {
                            organization: name
                        }
                        ... on Repository {
                            repository: name
                        }
                        ... on Team {
                            team: name
                        }
                    }
                }
              }
            }
          }
        }
      }
    }`,
  enterpriseQuery: `
    query ($enterprise: String!) {
      enterprise(slug: $enterprise) {
        organizations(first: 100) {
          nodes {
            login
          }
        }
      }
    }
 `
};

module.exports = queries;
