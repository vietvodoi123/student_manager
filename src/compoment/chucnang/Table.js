import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../hooks/useHttp";
import classes from "./Table.module.css";
import { infoActions } from "../../store/infoSlice";
import { Link } from "react-router-dom";
import SubjectRows from "../../UI/SubjectRows";

function Table() {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(null);
  const [data, setData] = useState([]);
  const tbl = useSelector((state) => state.tbl);

  const { sendRequest, isLoading, isErr } = useHttp();

  useEffect(() => {
    sendRequest({ url: `http://localhost:8080/api/v1${tbl.path}` }, (data) => {
      setData(data);
    });
  }, [tbl.title, update]);

  const onClickInfo = (data) => {
    dispatch(infoActions.setData(data));
  };

  const onClickChangeUpdate = (data) => {
    console.log(data);
    setUpdate(null);
  };

  return (
    <>
      <div>
        {tbl.path === "/Students" && (
          <table className={classes.tbl}>
            <tr>
              <th>STT</th>
              <th>Mã sinh viên</th>
              <th>Tên sinh viên</th>
              <th>Khoa</th>
              <th>#</th>
            </tr>
            {data.map((data, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.masv}</td>
                <td>{data.hoTen}</td>
                <td>{data.khoa}</td>
                <td>
                  <Link to="/info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search icon-info"
                      viewBox="0 0 16 16"
                      onClick={() => onClickInfo(data)}
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        )}
        {tbl.path === "/Subjects" && (
          <table className={classes.tbl}>
            <tr>
              <th>STT</th>
              <th>Mã môn học</th>
              <th>Tên môn học</th>
              <th>Số tín chỉ</th>
              <th>Giảng viên</th>
              <th>#</th>
            </tr>
            {data.map((data, i) => (
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
                    className="bi bi-pencil-square icon-pen-stu"
                    viewBox="0 0 16 16"
                    onClick={() => setUpdate({ data: data, i: i })}
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill icon-pen-stu"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      sendRequest(
                        {
                          url: `http://localhost:8080/api/v1/Subjects/delete/${data.id}`,
                          method: "DELETE",
                          headers: {
                            Accept: "application/json, text/plain",
                            "Content-Type": "application/json;charset=UTF-8",
                          },
                          body: null,
                        },
                        (data) => console.log(data)
                      );
                    }}
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </td>
              </tr>
            ))}
          </table>
        )}
        <div className={classes.end}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left-circle-fill icon-left"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
          <p className={classes.page}>1</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right-circle-fill icon-right"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </div>
      </div>
      {update != null && (
        <SubjectRows
          data={update.data}
          i={update.data.id}
          change={onClickChangeUpdate}
        />
      )}
    </>
  );
}

export default Table;
