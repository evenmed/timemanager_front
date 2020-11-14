import { useState } from "react";
import LogIn from "./LogIn";
import Register from "./Register";

const LogInRegister = (props) => {
  // If true, show register form. Otherwise log in form.
  const [register, setRegister] = useState(false);

  return (
    <div className="mt-4">
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
