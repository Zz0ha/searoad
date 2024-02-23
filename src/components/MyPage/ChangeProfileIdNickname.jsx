import React, { useState } from "react";
import {
  accountsVerificationUsername,
} from "apis/accounts";
import * as IMGURL from "scripts/utils";
import { changeNickname } from "apis/auth";

function ChangeProfileNickname({
  type,
  placeholder,
  label,
  regExp,
  buttonText,
  onChange,
  value,
  data,
}) {
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [disable, setDisable] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const verifitcationResult = async (e) => {
    const data = { username: inputValue };
    const nickname = { nickname: inputValue };
    if (label === "아이디") {
      let idResult = await accountsVerificationUsername(data).then((res) => {
        if (res.resCode === "E-C404-1000" && error === false) {
          alert("아이디 사용이 가능합니다.");
        } else {
          alert("이미 사용중인 아이디입니다.");
        }
      });
      return idResult;
    } else if (label === "닉네임") {
      let nickResult = await changeNickname(nickname).then((res) => {
        if (res.resCode === "E-C404-1000" && error === false) {
          alert("닉네임 사용가능합니다.");
        } else {
          alert("사용할 수 없는 닉네임입니다.");
        }
      });
      return nickResult;
    }
  };

  const ValidationInputValue = (e) => {
    onChange(e);
    const target = e.target.value;
    setInputValue(e.target.value);
    if (label === "닉네임") {
      if (target === data.resMsg.profile.nickname) {
        setError(true);
        setDisable(true);
        setErrorMsg("기존 닉네임과 같습니다.");
      } else if (inputValue === "" || regExp.test(inputValue) === false) {
        setError(true);
        setDisable(true);
      } else {
        setError(false);
        setDisable(false);
      }
    } else if (label === "아이디") {
      if (target === data.resMsg.profile.username) {
        setError(true);
        setDisable(true);
        setErrorMsg("기존 닉네임과 같습니다.");
      } else if (inputValue === "" || regExp.test(inputValue) === false) {
        setError(true);
        setDisable(true);
      } else {
        setError(false);
        setDisable(false);
      }
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
            defaultValue={value}
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
        <button
          type="button"
          className="identificationButton"
          onClick={() => {
            verifitcationResult();
          }}
          disabled={disable}
        >
          {buttonText}
        </button>
      </div>
    </li>
  );
}

export default ChangeProfileNickname;

ChangeProfileNickname.defaultProps = {
  type: "text",
  errorMsg: "",
  onChange: (e) => {},
  regExp: "",
};
