import { NavLink, useNavigate } from "react-router";
import {
  navbarClass,
  navContainer,
  navBrand,
  navLinks,
  navLink,
  navActive,
  dangerBtn,
} from "../styles/common";

import { useAuth } from "../store/authStore";

function Header() {
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth((state) => state);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className={navbarClass}>
      <div className={navContainer}>
        {/* LOGO */}
        <NavLink to="/" className={navBrand}>
          FinTrack AI
        </NavLink>

        <ul className={navLinks}>
          {!isAuthenticated ? (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? navActive : navLink
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? navActive : navLink
                  }
                >
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? navActive : navLink
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/overall"
                  className={({ isActive }) =>
                    isActive ? navActive : navLink
                  }
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/expenses"
                  className={({ isActive }) =>
                    isActive ? navActive : navLink
                  }
                >
                  Expenses
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/savings"
                  className={({ isActive }) =>
                    isActive ? navActive : navLink
                  }
                >
                  Savings
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? navActive : navLink
                  }
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;