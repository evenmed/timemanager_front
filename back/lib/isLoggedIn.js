/**
 * Checks whether a user is currently logged in and throws an error if not.
 * Can optionally check if user has one of an array of permissions.
 *
 * @param {Object} ctx context object as passed by apollo-server
 * @param {[String]} permission (Optional) specific permissions to check for.
 * Function will work if user has ANY of the permissions
 * @param {Boolean} bool If true, returns a boolean instead of throwing an error
 *
 * @return {Boolean} If bool is true, returns a Boolean indicating whether user
 * is logged in / has the specified permission
 */
const isLoggedIn = (ctx, permission = false, bool = false) => {
  const loggedIn = ctx.req.isAuthenticated();
  console.log(ctx.req);
  if (bool) return loggedIn;
  else if (!loggedIn) throw new Error("You're not authorized to do that.");
};

module.exports = isLoggedIn;
