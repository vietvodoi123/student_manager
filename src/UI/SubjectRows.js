import React, { useState } from "react";
import classes from "./SubjectRows.module.css";
import useHttp from "../hooks/useHttp";

function SubjectRows(props) {
  const [mamh, setMamh] = useState(props.data.mamh);
  const [nameSubject, setNameSubject] = useState(props.data.nameSubject);
  const [soTinChi, setSoTinChi] = useState(props.data.soTinChi);
  const [nameTeacher, setNameTeacher] = useState(props.data.nameTeacher);

  const { sendRequest, isLoading, isErr } = useHttp();

  const onClickSubmit = () => {
    const data = {
      mamh: mamh,
      nameSubject: nameSubject,
      soTinChi: soTinChi,
      nameTeacher: nameTeacher,
    };
    props.change("ok");
    sendRequest(
      {
        url: `http://localhost:8080/api/v1/Subjects/${props.i}`,
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

  return (
    <tr>
      <td>
        <input value={mamh} onChange={(e) => setMamh(e.target.value)} />
      </td>
      <td>
        <input
          value={nameSubject}
          onChange={(e) => setNameSubject(e.target.value)}
        />
      </td>
      <td>
        <input value={soTinChi} onChange={(e) => setSoTinChi(e.target.value)} />
      </td>
      <td>
        <input
          value={nameTeacher}
          onChange={(e) => setNameTeacher(e.target.value)}
        />
      </td>
      <td className={classes.btn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-check-square-fill icon-enter"
          viewBox="0 0 16 16"
          onClick={onClickSubmit}
        >
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-square-fill icon-exit"
          viewBox="0 0 16 16"
          onClick={() => props.change("ok")}
        >
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
        </svg>
      </td>
    </tr>
  );
}

export default SubjectRows;
