import React from "react";

function FindIDPWFormEmail({setFindRequestAdd, findIDEmail}) {
  return (
    <form className="findIdForm">
      <input type="text" placeholder="가입 이메일 주소를 입력해 주세요." onChange={(e)=>{setFindRequestAdd(e.target.value)}} />
      <div className="confirmButton" onClick={findIDEmail}>확인</div>
    </form>
  );
}

export default FindIDPWFormEmail;
