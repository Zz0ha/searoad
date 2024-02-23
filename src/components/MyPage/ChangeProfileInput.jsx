import {
  changeSendEmail,
  changeSendNumber,
  changeVerificationsEmail,
  changeVerificationsNumber,
} from "apis/auth";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import * as IMGURL from "scripts/utils";
import { modalOpenState } from "state";

function ChangeProfilInput({
  label,
  type,
  placeholder,
  regExp,
  onChange,
  setEmailToken,
  setContactNumberToken,
  value,
  data,
}) {
  const modalOpen = useSetRecoilState(modalOpenState);
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [disable, setDisable] = useState(true);
  const [confirmDisable, setConfirmDisable] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [modalError, setModalError] = useState(false);

  //정규식 검사 함수
  const ValidationInputValue = (e) => {
    onChange(e);
    setInputValue(e.target.value);
    const target = e.target.value;
    if (label === "이메일") {
      if (target === data.resMsg.profile.email) {
        setError(true);
        setDisable(true);
        setErrorMsg("기존 이메일과 같습니다.");
      }
      else if (target === "" || regExp.test(target) === false) {
        setError(true);
        setDisable(true);
        setErrorMsg("이메일 형식에 맞지 않습니다.");
      } else {
        setError(false);
        setDisable(false);
        setErrorMsg("");
      }
    }
    else if (label === "휴대폰번호") {
      if (target === data.resMsg.profile.contact_number) {
        setError(true);
        setDisable(true);
        setErrorMsg("기존 번호와 같습니다.");
      } 
      else if (target === "" || regExp.test(target) === false) {
        setError(true);
        setDisable(true);
        setErrorMsg("휴대폰번호 형식에 맞지 않습니다.");
      } else {
        setError(false);
        setDisable(false);
        setErrorMsg("");
      }
    }
  };

  //인증번호 확인
  const validationNumber = (e)=>{
    setVerifyCode(e.target.value);
    const resExp = /^[0-9]{7}$/
    const target = e.target.value;
    if(target ==="" || resExp.test(target)===false){
      setConfirmDisable(true)
    } else {
      setConfirmDisable(false)
    }
  }
  //이메일, 휴대폰번호 인증코드 요청
  const verifitcationInputResult = async (e) => {
    e.preventDefault();
    const data = { mode: "issue", email: inputValue };
    const phoneData = {
      mode: "issue",
      contact_number: inputValue,
    };

    if (label === "이메일") {
      let emailResult = await changeSendEmail(data).then((res) => {
        if (res.resCode === "1") {
          alert("해당 이메일로 인증코드를 보냈습니다.");
        } else {
          alert("이메일을 다시 확인해주세요.");
        }
      });
      return emailResult
    } else if (label === "휴대폰번호") {
      let phoneResult = await changeSendNumber(phoneData).then((res) => {
        if (res.resCode === "1") {
          alert("핸드폰으로 인증코드를 보냈습니다.");
        } else {
          alert("핸드폰번호를 다시 확인해주세요.");
        }
      });
      return phoneResult;
    }
  };

  //이메일, 휴대폰번호 인증메일 검증
  const validationCodeResult = async (e) => {
    e.preventDefault();
    const data = { mode: "verify", email: inputValue, code: verifyCode };
    const phoneData = {
      mode: "verify",
      contact_number: inputValue,
      code: verifyCode,
    };
    if (label === "이메일") {
      const emailConfirmResult = await changeVerificationsEmail(data).then(
        (res) => {
          if (res.resCode === "1") {
            alert("이메일 인증이 완료되었습니다.");
            return res.resMsg.token;
          } else {
            alert("인증코드를 다시 확인해주세요.");
          }
        }
      );
      setEmailToken(emailConfirmResult);
    } else if (label === "휴대폰번호") {
      const phoneConfirmResult = await changeVerificationsNumber(
        phoneData
      ).then((res) => {
        if (res.resCode === "1") {
          alert("핸드폰 인증이 완료되었습니다.");
          return res.resMsg.token;
        } else {
          alert("인증코드를 다시 확인해주세요.");
        }
      });
      setContactNumberToken(phoneConfirmResult);
    }
  };

  return (
    <li className="userInfo userEmail">
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
            alt=""
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
          className="identificationButton pointer"
          disabled={disable}
          onClick={verifitcationInputResult}
        >
          본인인증
        </button>
        <div className="userInfoInputState">
          <div className="userInfoInputBox">
            <input
              type="tel"
              placeholder="인증번호를 입력해 주세요."
              onChange={validationNumber}
            />
            <img
              src={
                confirmDisable === false
                  ? IMGURL.getIconURL("joinCheckIcon_on")
                  : IMGURL.getIconURL("joinCheckIcon_off")
              }
              alt=""
            />
          </div>
          <button
            className="identificationConfirmButton pointer"
            disabled={confirmDisable}
            onClick={validationCodeResult}
          >
            인증번호확인
          </button>
        </div>
      </div>
    </li>
  );
}

export default ChangeProfilInput;
