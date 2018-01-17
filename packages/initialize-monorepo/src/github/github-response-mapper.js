export default data => data.map(repo => ({
  name: repo.name,
  sshUrl: repo.ssh_url,
}));
