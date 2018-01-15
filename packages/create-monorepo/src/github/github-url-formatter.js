const urlFormatter = url => ({
  value() {
    return url;
  },
  formatUserRepoUrl(username) {
    const ending = url.indexOf('/repos');
    return urlFormatter(url.slice(0, ending + 6).replace('{user}', username));
  },
});

export default urlFormatter;
