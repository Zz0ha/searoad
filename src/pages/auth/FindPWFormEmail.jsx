import React from "react";

function FindPWFormEmail({
  setFindPwUserName,
  setFindRequestAdd,
  findPWEmail,
}) {
  return (
    <form className="findIdForm">
      <input
        type="text"
        placeholder="아이디를 입력해 주세요."
        onChange={(e) => {
          setFindPwUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="가입 이메일 주소를 입력해 주세요."
        onChange={(e) => {
          setFindRequestAdd(e.target.value);
        }}
      />
      <div className="confirmButton" onClick={findPWEmail}>
        확인
      </div>
    </form>
  );
}

export default FindPWFormEmail;
