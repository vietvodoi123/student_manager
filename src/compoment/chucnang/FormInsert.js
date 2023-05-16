import React, { useRef, useEffect, useState } from "react";
import classes from "./FormInsert.module.css";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";

function FormInsert() {
  const [tb, setTb] = useState({ status: false, message: "" });
  const masvIp = useRef();
  const hoTenIp = useRef();
  const gioiTinhIp = useRef();
  const ngaySinhIp = useRef();
  const diaChiIp = useRef();
  const khoaIp = useRef();
  const mamhIp = useRef();
  const tenMhIp = useRef();
  const soTinChiIp = useRef();
  const giangVienIp = useRef();

  const dispatch = useDispatch();
  const tbl = useSelector((state) => state.tbl);
  const { sendRequest, isLoading, isErr } = useHttp();

  const onSubmitForm = (e) => {
    e.preventDefault();
    const data =
      tbl.path === "/Students/insert"
        ? {
            masv: masvIp.current.value,
            hoTen: hoTenIp.current.value,
            gioiTinh: gioiTinhIp.current.value,
            ngaySinh: ngaySinhIp.current.value,
            diaChi: diaChiIp.current.value,
            khoa: khoaIp.current.value,
          }
        : {
            mamh: mamhIp.current.value,
            nameSubject: tenMhIp.current.value,
            soTinChi: soTinChiIp.current.value,
            nameTeacher: giangVienIp.current.value,
          };

    const send = {
      url: `http://localhost:8080/api/v1${tbl.path}`,
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
      },
      // mode: "no-cors",
      body: JSON.stringify(data),
    };
    sendRequest(send, (data) => {
      setTb({ status: data.status, message: data.message });
      console.log(data);
    });
  };
  return (
    <form onSubmit={onSubmitForm}>
      {tbl.path === "/Students/insert" && (
        <div className={classes.inputContainer}>
          <div className={classes.inputItem}>
            <label className={classes.title}>Mã sinh viên</label>
            <input ref={masvIp} />
          </div>
          <div className={classes.inputItem}>
            <label className={classes.title}>Họ và tên</label>
            <input ref={hoTenIp} />
          </div>
          <div className={classes.inputItem}>
            <label className={classes.title}>Giới tính</label>
            <select ref={gioiTinhIp}>
              <option>None</option>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
          <div className={classes.inputItem}>
            <label className={classes.title}>ngày sinh</label>
            <input ref={ngaySinhIp} />
          </div>
          <div className={classes.inputItem}>
            <label className={classes.title}>Địa chỉ</label>
            <input ref={diaChiIp} />
          </div>
          <div className={classes.inputItem}>
            <label className={classes.title}>Khoa</label>
            <input ref={khoaIp} />
          </div>
        </div>
      )}
      {tbl.path === "/Subjects/insert" && (
        <div className={classes.inputContainer}>
          <div className={classes.inputItem}>
            <label className={classes.title}>Mã môn học</label>
            <input ref={mamhIp} />
          </div>
          <div className={classes.inputItem}>
            <label className={classes.title}>tên môn học</label>
            <input ref={tenMhIp} />
          </div>

          <div className={classes.inputItem}>
            <label className={classes.title}>Số tín chỉ</label>
            <input ref={soTinChiIp} />
          </div>
          <div className={classes.inputItem}>
            <label className={classes.title}>Giảng viên</label>
            <input ref={giangVienIp} />
          </div>
        </div>
      )}
      {tb.status && <p className={classes.message}>{tb.message}</p>}
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default FormInsert;
