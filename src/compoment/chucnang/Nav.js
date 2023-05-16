import React from "react";
import classes from "./Nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { tblActions } from "../../store/tblSlice";

function Nav() {
  const dispatch = useDispatch();
  const tbl = useSelector((state) => state.tbl);

  const clickIsActive = (e) => {
    const t = e.target.className;
    const x = e.target.innerHTML;
    dispatch(tblActions.changeTbl({ title: x, path: t }));
  };

  return (
    <div className={classes.nav}>
      <div className={classes.menu}>
        <p className={classes.menuTitle}>Students</p>
        <ul>
          <li
            onClick={clickIsActive}
            className={
              tbl.path === "/Students" ? "/Students active" : "/Students"
            }
          >
            Danh sách sinh viên
          </li>
          <li
            onClick={clickIsActive}
            className={
              tbl.path === "/Students/insert"
                ? "/Students/insert active"
                : "/Students/insert"
            }
          >
            Thêm sinh viên
          </li>
        </ul>
      </div>
      <div className={classes.menu}>
        <p className={classes.menuTitle}>Môn học</p>
        <ul>
          <li
            onClick={clickIsActive}
            className={
              tbl.path === "/Subjects" ? "/Subjects active" : "/Subjects"
            }
          >
            Danh sách môn học
          </li>
          <li
            onClick={clickIsActive}
            className={
              tbl.path === "/Subjects/insert"
                ? "/Subjects/insert active"
                : "/Subjects/insert"
            }
          >
            Thêm môn học
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
