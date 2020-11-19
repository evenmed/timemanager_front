import React, { useContext } from "react";
import Link from "next/link";
import SettingsModal from "../Modals/SettingsModal";
import { UserContext } from "./User";
import LogOut from "./LogOut";

const Nav = () => {
  const user = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link href="/">
        <a className="navbar-brand" title="Home">
          Ultimate Time Manager
        </a>
      </Link>
      {user && (
        <>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {(user.permissions.includes("ADMIN") ||
                user.permissions.includes("USERMANAGER")) && (
                <>
                  <li className="nav-item">
                    <Link href="/users">
                      <a className="nav-link" title="Users">
                        Users
                      </a>
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item dropdown">
                <SettingsModal />
              </li>
              <li className="nav-item">
                <LogOut />
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
