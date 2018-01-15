import fetch from 'node-fetch';
import Promise from 'bluebird';
import { exec } from 'child_process';
import { promisify } from 'util';
const execPromise = util.promisify(exec);

const githubRequester = data => ({
  value() {
    return data;
  },
  fetchApiList(API_URL) {
    return fetch(API_URL).then(res => res.json()).then(githubRequester);
  },
  fetchRepos() {
    return fetch(data).then(res => res.json()).then(githubRequester);
  },
  downloadRepos(commandFormatter) {
    return Promise.map(data, repoData => execPromise(commandFormatter(data))).then(githubRequester);
  },
  formatUserRepoUrl(urlFormatter, USER_REPO_URL_KEY) {
    return githubRequester(urlFormatter(data[USER_REPO_URL_KEY]));
  },
  formatRepoResponse(repoResponseMapper) {
    return githubRequester(repoResponseMapper(data));
  }
});

export default githubRequester;
