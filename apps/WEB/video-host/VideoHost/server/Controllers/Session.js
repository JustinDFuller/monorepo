
/**
 * isLoggedIn - Method to find out if a user is logged in.
 *
 * @param  Object request Express request object.
 * @return Boolean        True if they are logged in, false if they are not.
 */
function isLoggedIn(request) {
  return request.isAuthenticated && request.isAuthenticated();
}


/**
 * requireLogIn - Middleware to enforce logging in for a route.
 *
 * @param  Object Request   The express request object.
 * @param  Object Response  The express response object.
 * @param  Function next    The method to continue to.
 * @return Void             Responds with a 401 unauthorized or continues to next method.
 */
function requireLogIn(request, response, next) {
  if (isLoggedIn(request)) {
    return next();
  }

  return response.status(401).json({ error: 'Invalid request, please log in first.' });
}

module.exports = {
  isLoggedIn,
  requireLogIn,
};
