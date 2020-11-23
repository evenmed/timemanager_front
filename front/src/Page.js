import User from "./User/User";
import Header from "./Header";
import LogInRegister from "./User/LogInRegister";

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
