import { useState } from "react";
import LogIn from "./LogIn";
import Register from "./Register";

/**
 * Shows both the login form and register form.
 */
const LogInRegister = () => {
  // If true, show register form. Otherwise log in form.
  const [register, setRegister] = useState(false);

  return (
    <div className="mt-4 col-12 col-md-8 ">
      {register ? (
        <>
          <div className="mb-3 text-center">
            Already have an account?
            <br />
            <button
              className="btn btn-info mt-2"
              onClick={() => setRegister(!register)}
            >
              Log in
            </button>
          </div>
          <Register />
        </>
      ) : (
        <>
          <div className="mb-3 text-center">
            Don't have an account?
            <br />
            <button
              className="btn btn-info mt-2"
              onClick={() => setRegister(!register)}
            >
              Register
            </button>
          </div>
          <LogIn />
        </>
      )}
    </div>
  );
};

export default LogInRegister;
