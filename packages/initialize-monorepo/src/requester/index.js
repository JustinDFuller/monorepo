import fetch from 'node-fetch';
import Promise from 'bluebird';
import child_process from 'child_process';
const execPromise = Promise.promisify(child_process.exec);

const requester = data => ({
  value() {
    return data;
  },
  fetchApiList(API_URL) {
    if (!API_URL) {
      throw new Error('API URL is not defined.', API_URL);
    }

    console.log('Fetching from', API_URL);

    return fetch(API_URL).then(res => res.json()).then(requester);
  },
  fetchRepos() {
    return fetch(data).then(res => res.json()).then(requester);
  },
  downloadRepos(commandFormatter) {
    if (!commandFormatter) {
      throw new Error('Command formatter is not defined.', commandFormatter);
    }

    const commands = data.map(repoData => execPromise(commandFormatter(repoData)));

    return Promise.all(commands).then(requester);
  },
  formatUserRepoUrl(urlFormatter, USER_REPO_URL_KEY) {
    if (!urlFormatter) {
      throw new Error('URL Formatter is not defined.'. urlFormatter);
    }

    if (!USER_REPO_URL_KEY) {
      throw new Error('User repo url key is not defined.', USER_REPO_URL_KEY);
    }

    return requester(urlFormatter(data[USER_REPO_URL_KEY]));
  },
  formatRepoResponse(repoResponseMapper) {
    if (!repoResponseMapper) {
      throw new Error('Repo response mapper is not defined.', repoResponseMapper);
    }

    return requester(repoResponseMapper(data));
  }
});

export default requester;
