import User from "./User/User";
import Header from "./Header";
import LogInRegister from "./User/LogInRegister";

/**
 * Base template and authentication. If not authenticated, will show
 * login / register form, no matter the page.
 */
function Page({ children }) {
  return (
    <div className="container py-4">
      <User>
        {(isLoggedIn) => (
          <>
            <Header />
            {isLoggedIn ? (
              children
            ) : (
              <div className="row justify-content-md-center">
                <LogInRegister />
              </div>
            )}
          </>
        )}
      </User>
    </div>
  );
}

export default Page;
