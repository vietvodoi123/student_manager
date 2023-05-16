import classes from "./Card.module.css";
import { useSelector } from "react-redux";
import Table from "./Table";
import FormInsert from "./FormInsert";

function Card() {
  const tbl = useSelector((state) => state.tbl);

  const hideInput =
    tbl.title === "Danh sách sinh viên" || tbl.title === "Danh sách môn học"
      ? ""
      : "hide";
  return (
    <div className={classes.studentTbl}>
      <div className={classes.header}>
        <p className={classes.tblName}>{tbl.title}</p>
        <div className={hideInput}>
          <input className={classes.inputSearch} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search icon-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
      {hideInput === "" && <Table />}
      {hideInput === "hide" && <FormInsert />}
    </div>
  );
}

export default Card;
