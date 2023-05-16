import React from "react";
import { Link } from "react-router-dom";
import classes from "./MainNav.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";

function MainNav() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.LOGOUT());
    navigate("/");
  };
  return (
    <div className={classes.mainNav}>
      <div className={classes.container}>
        <Link to="/home" className={classes.home}>
          STUDENTS MANAGER
        </Link>

        {/* chuc nang */}
        <div className={classes.chucNang}>
          {!auth.isAuth && (
            <div className={classes.btnBox}>
              <Link to="/login">ĐĂNG NHẬP</Link>
              <Link to="/register">ĐĂNG KÝ</Link>
            </div>
          )}
          {auth.isAuth && (
            <div className={classes.user}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-circle user-icon"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <p className={classes.userCurrent}>{auth.usercurrent}</p>
              <Link to="/home">
                <p className={classes.logout} onClick={logoutHandler}>
                  Đăng xuất
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainNav;
