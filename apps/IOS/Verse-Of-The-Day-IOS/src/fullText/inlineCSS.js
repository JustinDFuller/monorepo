import constants from './../constants/styles';
import styles from './fullText.styles';

const css = `
  <style>
    body,
    html {
      margin: 0;
      padding: 0;
    }
    h3 {
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    }
    p {
      display: inline;
      font-size: 18px;
      font-family: ${styles.serif};
    }
    .highlighted {
      background: ${constants.primary};
      color: ${constants.black};
      padding: 3px;
    }
  </style>
`;

export default css;
