const urlFormatter = url => ({
  value() {
    return url;
  },
  formatUserRepoUrl(username) {
    const ending = url.indexOf('/repos');
    const urlWithUsername = url.slice(0, ending + 6).replace('{user}', username);
    return urlFormatter(`${urlWithUsername}?per_page=100`);
  },
});

export default urlFormatter;
