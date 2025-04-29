import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { customClasses } from "../utils/constant";

interface Props {}

const Navbar = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <nav className={customClasses.navigationBar}>
        <div className="navbar-nav mr-auto">
          <li className={customClasses.navigationItem}>
            <Link to={"/home"} className={customClasses.navigationLink}>
              Home
            </Link>
          </li>

          {currentUser && currentUser?.role === "admin" && (
            <li className={customClasses.navigationItem}>
              <Link to={"/user"} className={customClasses.navigationLink}>
                User
              </Link>
            </li>
          )}

          {currentUser && (
            <li className={customClasses.navigationItem}>
              <Link to={"/todo"} className={customClasses.navigationLink}>
                Todo
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className={customClasses.navigationItem}>
              <Link to={"/profile"} className={customClasses.navigationLink}>
                {currentUser.username}
              </Link>
            </li>
            <li className={customClasses.navigationItem}>
              <a className={customClasses.navigationLink} onClick={logout}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className={customClasses.navigationItem}>
              <Link to={"/login"} className={customClasses.navigationLink}>
                Login
              </Link>
            </li>

            <li className={customClasses.navigationItem}>
              <Link to={"/register"} className={customClasses.navigationLink}>
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
