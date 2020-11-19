import Link from "next/link";
import EditAccountModal from "../Modals/EditAccountModal";
import CheckPermission from "./CheckPermission";
import LogOut from "./LogOut";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link href="/">
        <a className="navbar-brand" title="Home">
          Ultimate Time Manager
        </a>
      </Link>
      <CheckPermission>
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
            <CheckPermission permission={["ADMIN", "USERMANAGER"]}>
              <li className="nav-item">
                <Link href="/users">
                  <a className="btn btn-primary" title="Users">
                    <i className="fa fa-users"></i> Users
                  </a>
                </Link>
              </li>
            </CheckPermission>
            <li className="nav-item dropdown">
              <EditAccountModal>
                {(showModal) => (
                  <button className="btn btn-info" onClick={showModal}>
                    <i className="fa fa-cog"></i> Settings
                  </button>
                )}
              </EditAccountModal>
            </li>
            <li className="nav-item">
              <LogOut />
            </li>
          </ul>
        </div>
      </CheckPermission>
    </nav>
  );
};

export default Nav;
