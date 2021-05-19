const fetch = require('node-fetch');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

exports.handlers = function (event, context, callback) {
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer ${process.env.GH_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `{ viewer {     login
                      starredRepositories {
                        totalCount
                      }
                      following {
                        totalCount
                      }
                      followers {
                        totalCount
                      }
                      repositories(last: 20) {
                        nodes {
                          name
                          url
                          description
                          updatedAt
                          isFork
                          stargazerCount
                          primaryLanguage {
                            name
                            color
                          }
                        }
                      }
                      avatarUrl
                      bio
                      email
                      name
                      location
                      twitterUsername
                      websiteUrl
                      organizations {
                        totalCount
                      } }}`,
    }),
  })
    .then((response) => response.json())
    .then(({ data }) =>
      callback(null, {
        statusCode: 200,
        headers,
        body: JSON.stringify(data),
      })
    )
    .catch((err) => console.log(err));
};
