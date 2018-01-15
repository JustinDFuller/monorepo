export default ({
  ssh_url,
  name,
}) => `git clone ${ssh_url} && cd ${name} && rm -rf .git && cd ../`;