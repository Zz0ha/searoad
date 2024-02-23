import React from "react";

function FindIDPWFormPhone({ setFindRequestNum, findIDNum }) {
  return (
    <form className="findIdForm">
      <input
        type="text"
        placeholder="휴대폰 번호를 입력해 주세요. ('-'빼고 숫자만)"
        onChange={(e) => {
          setFindRequestNum(e.target.value);
        }}
      />
      <div
        className="confirmButton"
        onClick={() => {
          findIDNum();
        }}
      >
        인증번호 전송
      </div>
    </form>
  );
}

export default FindIDPWFormPhone;
