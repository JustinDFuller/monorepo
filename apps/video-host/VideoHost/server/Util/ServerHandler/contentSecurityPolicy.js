
/**
 * Content security policy directives for express/helmet.
 * Consider adding nonce's for inline scripts: https://helmetjs.github.io/docs/csp/
 */
module.exports = {
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", 'data:'],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
  },
};
