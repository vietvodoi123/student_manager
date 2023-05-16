import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";

function LoginForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkLogin = useHttp();

  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");

  const loginBtnHandler = (e) => {
    e.preventDefault();
    const data = {
      username: inputUser,
      password: inputPass,
    };
    const url = props.isFalse
      ? `http://localhost:8080/api/v1/Users/insert`
      : "http://localhost:8080/api/v1/Users/login";

    checkLogin.sendRequest(
      {
        url: url,
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        // mode: "no-cors",
        body: JSON.stringify(data),
      },
      (data) => console.log(data)
    );

    const link = props.isFalse ? "/login" : "/chucnang";
    if (link === "/chucnang") {
      dispatch(authActions.LOGIN(inputUser));
    }
    navigate(link);
  };

  return (
    <form className={classes.LoginForm}>
      <div className={classes.container}>
        {!props.isFalse && <p className={classes.title}>ĐĂNG NHẬP</p>}
        {props.isFalse && <p className={classes.title}>ĐĂNG KÝ</p>}
        <div className={classes.boxIp}>
          <label className={classes.formLb}>username</label>
          <input
            className={classes.formIp}
            onChange={(e) => setInputUser(e.target.value)}
          />
        </div>
        <div className={classes.boxIp}>
          <label className={classes.formLb}>password</label>
          <input
            className={classes.formIp}
            onChange={(e) => {
              setInputPass(e.target.value);
            }}
          />
        </div>
        <button className={classes.btnActive} onClick={loginBtnHandler}>
          {!props.isFalse ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
        </button>
      </div>
    </form>
  );
}
export default LoginForm;
