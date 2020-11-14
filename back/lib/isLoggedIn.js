/**
 * Checks whether a user is currently logged in and throws an error if not.
 * Can optionally check if user has one of an array of permissions.
 *
 * @param {Object} ctx context object as passed by apollo-server
 * @param {[String]} permissions (Optional) specific permissions to check for.
 * Function will work if user has ANY of the permissions
 * @param {Boolean} bool (Optional) If true, returns a boolean instead of throwing an error
 *
 * @return {Boolean} If bool is true, returns a Boolean indicating whether user
 * is logged in / has ANY of the specified permissions
 */
const isLoggedIn = (ctx, permissions = false, bool = false) => {
  let loggedIn = ctx.req.isAuthenticated();

  if (permissions && permissions.length) {
    loggedIn = false;

    console.log(ctx.req.user.permissions);

    if (ctx.req.user && ctx.req.user.permissions) {
      for (const perm of permissions) {
        if (ctx.req.user.permissions.includes(perm)) {
          loggedIn = true;
          break;
        }
      }
    }
  }

  if (bool) return loggedIn;
  else if (!loggedIn) throw new Error("You're not authorized to do that.");
};

module.exports = isLoggedIn;
