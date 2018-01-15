export default url => ({
  value() {
    return url;
  },
  formatUserRepoUrl(username) {
    const ending = url.indexOf('/repos');
    return urlFormatter(url.replace('{user}', username).slice(0, ending + 6));
  },
});
