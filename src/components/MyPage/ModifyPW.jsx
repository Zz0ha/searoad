import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useState } from "react";
import Loading from "components/Loading";
import * as IMGURL from "scripts/utils";
import { AccountInput } from "components/AccountInput";
import { changePW } from "apis/auth";
import { useNavigate } from "react-router-dom";
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
  :disabled {
    cursor: auto;
    background-color: #fff;
    border:1px solid #999999;
    color: #999999;
  }
`;


function ModifyPW({ pwToken }) {
  const navigate = useNavigate()
  //Todo 비밀번호 재확인 token 값이 없으면 reconfirmPW 후 token 값 생기면 회원정보수정 페이지
  const { data, isLoading } = useQuery("nickname");
  const [disable, setDisable] = useState(true)
  const [error, setError] = useState();
  const [originPwErr, setOriginPwErr] = useState()
  const [newPwErr, setNewPwErr] = useState();


  //비밀번호 state
  const [originPW, setOriginPW] = useState("");
  const [newPW, setNewPW] = useState("");

  useEffect(() => {
    const disableHandler = ()=>{
      if (
        error === true ||
        error === undefined ||
        originPwErr === true ||
        originPwErr === undefined ||
        newPwErr === true ||
        newPwErr === undefined ||
        originPW === "" ||
        newPW === ""
      ){setDisable(true)}
      else {
        setDisable(false)
      }
    }
    disableHandler()
  }, [error, originPwErr, originPW, newPW]);
  console.log(disable);
  //비밀번호 변경함수
  const changePwHandler = async () => {
    const data = {
      token: pwToken,
      current_password: originPW,
      new_password: newPW,
    };
    const submit = await changePW(data);
    if(submit.resCode==="1"){
      alert("비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.")
      navigate('/')
    }
    else if (submit.resCode==="E-C403-1000"){
      alert(submit.resMsg.detail)
    } else if (submit.resCode==="E-VLID-1000"){
      alert("빈칸을 채워주세요.")
    }
  };

  //현재 비밀번호 정규식 검사
  const ValidationInputValue = (e) => {
    setOriginPW(e.target.value)
    const inputValue = e.target.value;
    let regExp=/(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/
    if (inputValue === "" || regExp.test(inputValue) === false) {
      setOriginPwErr(true);
    } else {
      setOriginPwErr(false);
    }
  };


  //비밀번호 확인 함수
  const confirmPassword = (e) => {
    const inputValue = e.target.value;
    if (inputValue !== newPW) {
      setError(true);
    } else {
      setError(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
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
            {/* 비밀번호 */}
            <li className="userInfo">
              <div className="userInfoLabel">
                <span>현재 비밀번호</span>
              </div>
              <div className="userInfoInputState">
                <div className="userInfoInputBox">
                  <input
                    type="password"
                    placeholder="현재 비밀번호를 입력해주세요."
                    onChange={ValidationInputValue}
                  />
                </div>
                <div
                  className={
                    originPwErr
                      ? "userInfoInputResult error"
                      : "userInfoInputResult"
                  }
                >
                  {originPwErr ? <p>형식에 맞지 않는 비밀번호입니다.</p> : ""}
                </div>
              </div>
            </li>
            <AccountInput
              type="password"
              placeholder="새 비밀번호를 입력해주세요."
              errorMsg="영문, 특수문자, 숫자를 혼합하여 8자 이상 입력해주세요."
              label="새 비밀번호"
              regExp={
                /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/
              }
              setNewPwErr={setNewPwErr}
              onChange={(e) => {
                setNewPW(e.target.value);
              }}
            />
            {/* 비밀번호 확인 */}
            <li className="userInfo">
              <div className="userInfoLabel">
                <span>비밀번호 확인</span>
              </div>
              <div className="userInfoInputState">
                <div className="userInfoInputBox">
                  <input
                    type="password"
                    placeholder="새 비밀번호를 한번 더 입력해주세요."
                    onChange={(e) => {
                      confirmPassword(e);
                    }}
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
                  {error ? <p>비밀번호가 일치하지 않습니다.</p> : ""}
                </div>
              </div>
            </li>
          </ul>
          <FetchButton
            type="button"
            onClick={changePwHandler}
            disabled={disable}
          >
            비밀번호 변경
          </FetchButton>
        </form>
      </div>
    </div>
  );
}

export default ModifyPW;
