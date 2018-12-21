const { send } = require('micro')
const ms = require('ms')
const { fetchRepos, formatData } = require('./lib')

let cache = null

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  if (!cache || Date.now() - cache.updatedAt > ms('30m')) {
    try {
      cache = await fetchRepos().then(formatData)
    } catch (error) {
      console.error(error.message)
      send(res, 500, error.message)
    }
  }

  send(res, 200, cache.repos)
}
