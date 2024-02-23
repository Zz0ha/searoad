import { findAccount } from "apis/auth";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FindPWFormEmail from "./FindPWFormEmail";
import FindPWFormPhone from "./FindPWFormPhone";

function FindPW() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const [send, setSend] = useState(false);
  const [findPwUserName, setFindPwUserName] = useState("");
  const [findRequestType, setFindRequestType] = useState("email");
  const [findRequestAdd, setFindRequestAdd] = useState("");
  const [findRequestNum, setFindRequestNum] = useState("");

   //정규식 검사
   const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
   const phoneRegExp = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;

  //이메일로 비밀번호 찾기
  const findPWEmail = async (e) => {
    const data = {
      target: "password",
      username: findPwUserName,
      request_address_type: findRequestType,
      request_address: findRequestAdd,
    };
    const submit = await findAccount(data);
    if (findRequestAdd === "" || emailRegExp.test(findRequestAdd) === false) {
      alert("이메일 형식으로 입력해주세요.");
    } else {
      if (submit.resCode === "E-C404-1000") {
        alert("해당 정보로 가입된 계정이 없습니다.");
      } else if (submit.resCode === "1") {
        alert(
          "입력하신 번호로 임시 비밀번호를 전송했습니다. 임시비밀번호로 로그인을 진행해주세요."
        );
        navigate("/auth", { replace: true });
      }
    }
  };

  //핸드폰번호로 비밀번호 찾기
  const findPWNum = async (e) => {
    const data = {
      target: "password",
      username: findPwUserName,
      request_address_type: findRequestType,
      request_address: findRequestNum,
    };
    const submit = await findAccount(data);
    if (findRequestNum === "" || phoneRegExp.test(findRequestNum) === false) {
      alert("핸드폰 번호를 정확히 입력해주세요.");
    } else {
      if (submit.resCode === "E-C404-1000") {
        alert("해당 정보로 가입된 계정이 없습니다.");
      } else if (submit.resCode ==="1") {
        alert("입력하신 번호로 임시 비밀번호를 전송했습니다. 임시비밀번호로 로그인을 진행해주세요.")
        navigate('/auth', {replace:true})
      }
    }
  };

  const tabContent = [
    <FindPWFormEmail setFindPwUserName={setFindPwUserName} setFindRequestAdd={setFindRequestAdd} findPWEmail={findPWEmail}/>,
    <FindPWFormPhone setFindPwUserName={setFindPwUserName} setFindRequestNum={setFindRequestNum} findPWNum={findPWNum} send={send}/>,
  ];

  return (
    <div className="findIdSection">
      <div className="container">
        <div className="findIdBox">
          <h1>비밀번호 찾기</h1>
          <div className="findTabButton">
            <ul>
              <li
                className={activeTab === 0 ? "active" : ""}
                onClick={() => {
                  setActiveTab(0);
                  setFindRequestType("email");
                }}
              >
                이메일 인증
              </li>
              <li
                className={activeTab === 1 ? "active" : ""}
                onClick={() => {
                  setActiveTab(1);
                  setFindRequestType("contact_number");
                }}
              >
                휴대폰 번호 인증
              </li>
            </ul>
            {tabContent[activeTab]}
          </div>
          <div className="buttonBox">
            <Link to={"/auth"} className="pointer">
              로그인
            </Link>
            <Link to={"/auth/findId"} className="pointer">
              아이디 찾기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindPW;
