// require('dotenv').config();

// dotenv.config({ path: '../../.env' });

const baseUrl = 'https://api.github.com/graphql';
// const client = new ApiClient(process.env.GH_ACCESS_TOKEN);

// console.log(process.env);

const avatarMain = document.querySelector('#userAvatar');
const fullname = document.querySelector('#name');
const username = document.querySelector('#username');
const userBio = document.querySelector('#bio');
const userFollowers = document.querySelector('#followers');
const userFollowing = document.querySelector('#following');
const starredRepo = document.querySelector('#starredRepo');
const userLocation = document.querySelector('#location');
const userTwitterUsername = document.querySelector('#twitterUsername');
const userEmail = document.querySelector('#email');
const userWebsiteUrl = document.querySelector('#websiteUrl');
const repo = document.querySelector('#repositories');

const options = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  Authorization: `bearer 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`,
};

(async function getGithubUser() {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `bearer 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`,
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
  });
  let {
    data: { viewer },
  } = await res.json();
  console.log(viewer);
  const {
    avatarUrl,
    name,
    followers,
    following,
    login,
    email,
    bio,
    location,
    websiteUrl,
    twitterUsername,
    starredRepositories,
    repositories,
  } = viewer;

  avatarMain.src = avatarUrl;
  fullname.textContent = name;
  username.textContent = login;
  userBio.textContent = bio;
  userFollowers.textContent = followers.totalCount;
  userFollowing.textContent = following.totalCount;
  starredRepo.textContent = starredRepositories.totalCount;
  userLocation.textContent = location;
  userTwitterUsername.textContent = twitterUsername;
  userEmail.textContent = email;
  userWebsiteUrl.textContent = websiteUrl;
  repositories.nodes.forEach((repository) => {
    repoList.innerHTML += `
                <div class="repo">
                  <div class="repo-main-data">
                    <div class="repo-data">
                      <a href="${repository.url}" class="repo-name">${
      repository.name
    }</a>
                      <p class="repo-description">${
                        repository.description || ''
                      }</p>
                    </div>
                    <button class="star-button">
                      <img src="./assets/icons/star.svg" alt="star icon" />
                      <span>Star</span>
                    </button>
                  </div>
                  <div class="repo-meta">
                    <div class="${
                      repository.primaryLanguage ? 'repo-language' : 'hide'
                    }">
                      <span style="background: ${
                        repository.primaryLanguage?.color || ''
                      };" class="repo-language-color"></span>
                      <span class="repo-language-text">${
                        repository.primaryLanguage?.name || ''
                      }</span>
                    </div>
                    <div class="repo-stars">
                      <img src="./assets/icons/star.svg" alt="star icon" />
                      <span>${repository.stargazerCount}</span>
                    </div>
                  </div>
                </div>
            `;
  });
})();
