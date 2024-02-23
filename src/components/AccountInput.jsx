import React, { useState } from "react";
import * as IMGURL from "scripts/utils";

// 회원가입 시 비밀번호에 대해서만 쓰이고 있는 input 컴포넌트
// 본 컴포넌트를 다른 용도로 사용하려면 아래 `<input>` 태그의 속성 중 `autocomplete` 속성을 검토해야함
export function AccountInput({
  type,
  errorMsg,
  placeholder,
  label,
  regExp,
  onChange,
  setNewPwErr,
}) {
  const [error, setError] = useState();
  const ValidationInputValue = (e) => {
    onChange(e);
    const target = e.target.value;
    if (target === "" || regExp.test(target) === false) {
      setError(true);
      setNewPwErr&&setNewPwErr(true)
    } else {
      setError(false);
      setNewPwErr && setNewPwErr(false)
    }
  };
  return (
    <li className="userInfo">
      <div className="userInfoLabel">
        <span>{label}</span>
      </div>
      <div className="userInfoInputState">
        <div className="userInfoInputBox">
          <input
            type={type}
            placeholder={placeholder}
            onChange={ValidationInputValue}
            autoComplete='new-password'
          />
          <img
            src={
              error === false
                ? IMGURL.getIconURL("joinCheckIcon_on")
                : IMGURL.getIconURL("joinCheckIcon_off")
            }
            alt="체크이미지"
          />
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

AccountInput.defaultProps = {
  type: "text",
  errorMsg: "",
  onChange: (e) => {},
  regExp: "",
};

//이름 inputBox
export function AccountNameInput({
  label,
  onChangeLN,
  onChangeFN,
}) {

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
              placeholder="성을 입력해주세요."
              onChange={onChangeLN}
            />
          </div>

          <div className="userInfoInputBox">
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              onChange={onChangeFN}
            />
          </div>
        </div>
        {/* <div
          className={
            error ? "userInfoInputResult error" : "userInfoInputResult"
          }
        >
          {error ? <p>{errorMsg}</p> : ""}
        </div> */}
      </div>
    </li>
  );
}

AccountNameInput.defaultProps = {
  type: "text",
  errorMsg: "",
  onChange: (e) => {},
  regExp: "",
};
