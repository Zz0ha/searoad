import { useState } from "react";

export function ChangeProfileName({
  type,
  placeholder,
  label,
  regExp,
  onChangeLN,
  onChangeFN,
  valueLN,
  valueFN,
}) {
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  const ValidationInputValue = (e) => {
    e.preventDefault();
    const target = e.target.value;
    if (placeholder === "성") {
      if (target === valueLN) {
        setError(true);
        setErrorMsg("기존 이름과 같습니다.");
      }
    }
  };

  return (
    <li className="userInfo">
      <div className="userInfoLabel">
        <span>{label}</span>
      </div>
      <div className="userInfoInputState">
        <div className="userInfoNameInput flex">
          <div className="userInfoInputBox">
            <input
              type="text"
              placeholder="성"
              onChange={(e) => {
                ValidationInputValue(e);
                onChangeLN(e);
              }}
              defaultValue={valueLN}
            />
          </div>

          <div className="userInfoInputBox">
            <input
              type="text"
              placeholder="이름"
              onChange={onChangeFN}
              defaultValue={valueFN}
            />
          </div>
        </div>
        <div
          className={
            error ? "userInfoInputResult error" : "userInfoInputResult"
          }
        >
          {error ? <p>{errorMsg}</p> : ""}
        </div>
      </div>
    </li>
  );
}

ChangeProfileName.defaultProps = {
  type: "text",
  errorMsg: "",
  onChange: (e) => {},
  regExp: "",
};
