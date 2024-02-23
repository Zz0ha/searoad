
import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "components/Loading";
import { changeProfile } from "apis/auth";
import { useNavigate } from "react-router-dom";
import ChangeProfilInput from "./ChangeProfileInput";
import ChangeProfileNickname from "./ChangeProfileIdNickname";
import styled from 'styled-components'

const FetchButton = styled.button`
    width: 250px;
    height: 50px;
    background-color: #1c53c7;
    line-height: 50px;
    color: #fff;
    text-align: center;
    display: block;
    margin: 0 auto;
`;

function ModifyMyInfo({pwToken}) {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("nickname");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState(data.resMsg.profile.email);
  const [emailToken, setEmailToken] = useState("");
  const [nickname, setNickname] = useState(data.resMsg.profile.nickname);
  const [firstName, setFirstName] = useState(data.resMsg.profile.first_name);
  const [lastName, setLastName] = useState(data.resMsg.profile.last_name);
  const [contactNumber, setContactNumber] = useState(data.resMsg.profile.contact_number);
  const [contactNumberToken, setContactNumberToken] = useState("");
  const [sameOrigin, setSameOrigin] = useState(false);

  //정규식 검사 함수
  const validationInputValue = (e) => {
    if(lastName === data.resMsg.profile.last_name && firstName === data.resMsg.profile.first_name){
      setError(true);
      setErrorMsg("기존 이름과 같습니다.");
    } else {
      setError(false);
      setErrorMsg("");
    }
  };

  //현재 이메일과 같은지 확인
  const confirmProfile = (e) => {
    const originEmail = e.target.value;
    if (originEmail === data.resMsg.profile.email) {
      setSameOrigin(true);
    } else {
      setSameOrigin(false);
    }
  };

  //회원정보 변경함수
  const changeProfileHandler = async (e) => {
    e.preventDefault()
    //처음엔 빈 object, 수정 된 data만 object에 추가해주기
    // const data = {}
    const data = {
      token: pwToken,
      nickname: nickname,
      first_name: firstName,
      last_name: lastName,
    };
    const submit = await changeProfile(data);
    if (submit.resCode === "1") {
      alert("회원정보 변경이 완료되었습니다.");
      navigate("/");
    } else if (submit.resCode === "E-C403-1000") {
      alert(submit.resMsg.detail);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {/* <ReconfirmPW /> */}
      <div className="accountForm changeMyInfo">
        <form>
          <ul>
            {/* 아이디 */}
            <li className="userInfo">
              <div className="userInfoLabel">
                <span>아이디</span>
              </div>
              <div className="userInfoInputState">
                <div className="userInfoInputBox">
                  <input
                    type="text"
                    value={data.resMsg.profile.username}
                    readOnly={true}
                  />
                </div>
              </div>
            </li>
            <ChangeProfilInput
              label="이메일"
              value={data.resMsg.profile.email}
              type="text"
              placeholder="예: searoad@mosepeople.com"
              errorMsg="이메일 형식으로 입력해 주세요."
              regExp={
                /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
              }
              onChange={(e) => {
                setEmail(e.target.value);
                confirmProfile(e);
              }}
              setEmailToken={setEmailToken}
              data={data}
            />
            <ChangeProfileNickname
              errorMsg="2글자 이상 8글자 미만으로 입력해주세요."
              placeholder="사용하실 닉네임을 입력해주세요."
              value={data.resMsg.profile.nickname}
              label="닉네임"
              regExp={/^[가-힣a-zA-Z0-9]{2,8}/}
              buttonText="중복확인"
              data={data}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <li className="userInfo">
              <div className="userInfoLabel">
                <span>이름</span>
              </div>
              <div className="userInfoInputState">
                <div className="userInfoNameInput flex">
                  <div className="userInfoInputBox">
                    <input
                      type="text"
                      placeholder="성"
                      onChange={(e) => {
                        setLastName(e.target.value);
                        validationInputValue(e);
                      }}
                      defaultValue={data.resMsg.profile.last_name}
                    />
                  </div>
                  <div className="userInfoInputBox">
                    <input
                      type="text"
                      placeholder="이름"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        validationInputValue(e);
                      }}
                      defaultValue={data.resMsg.profile.first_name}
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
            <ChangeProfilInput
              label="휴대폰번호"
              type="tel"
              value={data.resMsg.profile.contact_number}
              placeholder="휴대폰 번호를 입력해 주세요."
              errorMsg="잘못된 번호입니다. 다시 입력해 주십시오."
              regExp={/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/}
              onChange={(e) => {
                setContactNumber(e.target.value);
                confirmProfile(e);
              }}
              setContactNumberToken={setContactNumberToken}
              data={data}
            />
          </ul>
          <FetchButton onClick={changeProfileHandler}>회원정보 수정</FetchButton>
        </form>
      </div>
    </div>
  );
}

export default ModifyMyInfo;
