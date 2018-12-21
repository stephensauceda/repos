const fetch = require('node-fetch')
const repoUrl = 'https://api.github.com/users/stephensauceda/repos'

function fetchRepos() {
  return fetch(repoUrl)
    .then(res => res.json())
}

function formatData(data) {
  const now = Date.now()
  console.log(`Rebuilt repo cache at ${now}`)
  return {
    repos: data.map(({ name, language, html_url: url, stargazers_count: stars }) => ({
      name,
      language,
      url,
      stars
    })),
    updatedAt: now
  }
}

module.exports = { fetchRepos, formatData, repoUrl }