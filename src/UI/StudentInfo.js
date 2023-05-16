import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./StudentInfo.module.css";
import { Link } from "react-router-dom";
import useHttp from "../hooks/useHttp";

function StudentInfo() {
  const [update, setUpdate] = useState(true);

  const [subject, setSubject] = useState([]);

  const [have, setHave] = useState([]);

  const [dk, setDk] = useState(true);
  const info = useSelector((state) => state.info);
  const [check, setCheck] = useState(false);
  const [diem, setDiem] = useState();

  const [masv, setMasv] = useState(info.data.masv);
  const [hoTen, setHoTen] = useState(info.data.hoTen);
  const [ngaySinh, setNgaySinh] = useState(info.data.ngaySinh);
  const [gioiTinh, setGioiTinh] = useState(info.data.gioiTinh);
  const [diaChi, setDiaChi] = useState(info.data.diaChi);
  const [khoa, setKhoa] = useState(info.data.khoa);

  const { sendRequest, isLoading, isErr } = useHttp();
  useEffect(() => {
    const url = `http://localhost:8080/api/v1/Subjects`;

    sendRequest({ url: url }, (data) => {
      setSubject(data);
    });
  }, []);

  useEffect(() => {
    const url = `http://localhost:8080/api/v1/Inroll/${info.data.masv}`;

    sendRequest({ url: url }, (data) => {
      const list = [];

      // them diem
      for (let i = 0; i < data.length; i++) {
        const x = subject.filter((item) => item.mamh === data[i].mamh);
        x[0].score = data[i].score;
        if (x.length > 0) {
          list.push(x[0]);
        }
      }
      setHave(list);
    });
  }, [dk]);

  const addSubjectHandler = (mamh) => {
    const inroll = {
      masv: info.data.masv,
      mamh: mamh,
      score: 0,
    };
    sendRequest(
      {
        url: `http://localhost:8080/api/v1/Inroll/insert`,
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        // mode: "no-cors",
        body: JSON.stringify(inroll),
      },
      (data) => console.log(data)
    );
  };

  const onSubmitUpdate = () => {
    const data = {
      masv: masv,
      hoTen: hoTen,
      ngaySinh: ngaySinh,
      gioiTinh: gioiTinh,
      khoa: khoa,
      diaChi: diaChi,
    };
    setUpdate(true);
    sendRequest(
      {
        url: `http://localhost:8080/api/v1/Students/update/${info.data.id}`,
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      },
      (data) => console.log(data)
    );
  };

  const onSubmitUpdateScore = (data) => {
    const x = {
      id: data.id,
      masv: masv,
      mamh: data.mamh,
      score: diem,
    };
    setCheck(null);
    sendRequest(
      {
        url: `http://localhost:8080/api/v1/Inroll/update/${data.id}`,
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(x),
      },
      (k) => console.log(k)
    );
  };

  return (
    <div className={classes.info}>
      <Link to="/chucnang">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left icon-back"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </Link>
      <div className={classes.header}>
        <div className={classes.img} />
        <p>
          <span>Mã sinh viên:</span>{" "}
          {update ? (
            masv
          ) : (
            <input
              className={classes.ip}
              value={masv}
              onChange={(e) => setMasv(e.target.value)}
            />
          )}
        </p>
        <p>
          <span>Họ tên:</span>{" "}
          {update ? (
            hoTen
          ) : (
            <input
              className={classes.ip}
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
            />
          )}
        </p>
        <p>
          <span>Ngày sinh:</span>{" "}
          {update ? (
            ngaySinh
          ) : (
            <input
              value={ngaySinh}
              className={classes.ip}
              onChange={(e) => setNgaySinh(e.target.value)}
            />
          )}
        </p>
        <p>
          <span>Giới tính:</span>{" "}
          {update ? (
            gioiTinh
          ) : (
            <input
              className={classes.ip}
              value={gioiTinh}
              onChange={(e) => setGioiTinh(e.target.value)}
            />
          )}
        </p>
        <p>
          <span>Địa chỉ:</span>{" "}
          {update ? (
            diaChi
          ) : (
            <input
              className={classes.ip}
              value={diaChi}
              onChange={(e) => setDiaChi(e.target.value)}
            />
          )}
        </p>
        <p>
          <span>Khoa:</span>{" "}
          {update ? (
            khoa
          ) : (
            <input
              className={classes.ip}
              value={khoa}
              onChange={(e) => setKhoa(e.target.value)}
            />
          )}
        </p>
      </div>
      <div className={classes.boxBtn}>
        {dk && (
          <button className={classes.btn} onClick={() => setDk(!dk)}>
            Đã đăng ký
          </button>
        )}
        {!dk && (
          <button className={classes.btn} onClick={() => setDk(!dk)}>
            Tất cả môn học
          </button>
        )}
        <div>
          {!update && (
            <button
              className={classes.btn + " " + classes.btnCheck}
              onClick={onSubmitUpdate}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-check-lg icon-check"
                viewBox="0 0 16 16"
              >
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
              </svg>
            </button>
          )}
          {update && (
            <button className={classes.btn} onClick={() => setUpdate(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square icon-pen"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
          )}

          {!update && (
            <button className={classes.btn} onClick={() => setUpdate(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
                onClick={() => setUpdate(true)}
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {!dk && (
        <table>
          <tr>
            <th>STT</th>
            <th>Mã môn học</th>
            <th>Tên môn học</th>
            <th>Số tín chỉ</th>
            <th>Giảng viên</th>
            <th>#</th>
          </tr>
          {subject.map((data, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{data.mamh}</td>
              <td>{data.nameSubject}</td>
              <td>{data.soTinChi}</td>
              <td>{data.nameTeacher}</td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-square icon-plus"
                  viewBox="0 0 16 16"
                  onClick={() => addSubjectHandler(data.mamh)}
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </td>
            </tr>
          ))}
        </table>
      )}
      {dk && (
        <table>
          <tr>
            <th>STT</th>
            <th>Mã môn học</th>
            <th>Tên môn học</th>
            <th>Số tín chỉ</th>
            <th>Giảng viên</th>
            <th>Điểm</th>
            <th>#</th>
          </tr>
          {have.map((data, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{data.mamh}</td>
              <td>{data.nameSubject}</td>
              <td>{data.soTinChi}</td>
              <td>{data.nameTeacher}</td>
              <td>
                {check == i ? (
                  <input
                    className={classes.ipScore}
                    value={diem}
                    onChange={(e) => setDiem(e.target.value)}
                  />
                ) : (
                  data.score
                )}
              </td>
              <td>
                {!check && check != i && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square icon-pen"
                    viewBox="0 0 16 16"
                    onClick={() => setCheck(i)}
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                )}
                {check == i && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-square-fill icon-info-1"
                      onClick={() => onSubmitUpdateScore(data)}
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x-square-fill icon-info-2"
                      onClick={() => setCheck(null)}
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                    </svg>
                  </>
                )}
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default StudentInfo;
