const fetch = require('jest-fetch-mock')
jest.setMock('node-fetch', fetch)
const { fetchRepos, formatData } = require('./')

const repos = [
  { name: 'foo', html_url: 'https://foo.com', stargazers_count: 10 },
  { name: 'bar', html_url: 'https://bar.com', stargazers_count: 1 },
  { name: 'baz', html_url: 'https://baz.com', stargazers_count: 100 },
]

describe('fetchRepos', () => {
  test('should return an array of repos', async () => {
    fetch.mockResponse(JSON.stringify(repos))
    const response = await fetchRepos()
    expect(response).toEqual(repos)
  });
});

describe('Name of the group', () => {
  test('should format raw data', () => {
    const expected = formatData(repos)
    expect(Object.keys(expected)).toEqual(['repos', 'updatedAt'])
    expect(Object.keys(expected.repos[0])).toEqual(['name', 'url', 'stars'])
  });
});
