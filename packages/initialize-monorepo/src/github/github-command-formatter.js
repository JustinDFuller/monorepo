export default ({
  sshUrl,
  name,
}) => `git clone ${sshUrl} && cd ${name} && rm -rf .git && cd ../`;
