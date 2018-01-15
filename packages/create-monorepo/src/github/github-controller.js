import { 
  GITHUB_API_URL,
  GITHUB_USER_REPO_URL_KEY,
  GITHUB_USERNAME,
} from 'constants';
import githubRequester from './githubRequester';
import githubUrlFormatter from './github-url-formatter';
import githubResponseMapper from './github-response-mapper';
import githubCommandFormatter from './github-command-formatter';

const githubController = async () => {
  const requester = githubRequester();
  const apiList = await requester.fetchApiList(GITHUB_API_URL);
  const repoUrl = apiList.formatUserRepoUrl(
    url => githubUrlFormatter(url).formatUserRepoUrl(GITHUB_USERNAME).value(), 
    GITHUB_USER_REPO_URL_KEY
  );
  const repos = await repoUrl.fetchRepos();
  const formattedResponse = repos.formatRepoResponse(githubResponseMapper);
  const results = await formattedResponse.downloadRepos(githubCommandFormatter);
  return results.value();
};
