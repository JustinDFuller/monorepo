export default data => data.map(repo => ({
  name: repo.name,
  ssh_url: repo.ssh_url,
}));
