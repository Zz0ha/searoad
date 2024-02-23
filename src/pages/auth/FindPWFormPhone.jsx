import React, { useState } from "react";

function FindPWFormPhone({
  setFindPwUserName,
  setFindRequestNum,
  findPWNum,
  send,
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
        placeholder="휴대폰 번호를 입력해 주세요."
        onChange={(e) => {
          setFindRequestNum(e.target.value);
        }}
      />
      {send ? (
        <div className="verificationCode">
          <input type="text" placeholder="인증번호 6자리" />
          <div className="resendButton">재전송</div>
        </div>
      ) : null}

      <div
        className="confirmButton"
        onClick={() => {
          findPWNum();
        }}
      >
        {send ? "확인" : "인증번호 전송"}
      </div>
    </form>
  );
}

export default FindPWFormPhone;
