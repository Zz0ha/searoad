import { reconfirmAuth } from "apis/auth";
import Loading from "components/Loading";
import React, { Children, cloneElement, useState } from "react";
import { isValidElement } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ReLoginWrap = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  tr {
    td {
      padding: 20px 0;
      border-bottom: 1px solid #eeeeee;
      input {
        border: 1px solid #333333;
        width: 300px;
        padding: 4px;
      }
      &:not(:last-child) {
        border-right: 1px solid #eeeeee;
      }
      &:first-child {
        text-align: center;
        width: 200px;
        color: #1c53c7;
      }
      &:last-child {
        padding-left: 10px;
      }
    }
  }
`;

function ReconfirmPW({ setPWConfirm, children }) {
  const [pwToken, setPwToken] = useState();
  const { data, isLoading } = useQuery("nickname");
  const userName = data.resMsg.profile.username;
  const [secret, setSecret] = useState("");

  const childrenWithProps = Children.map(children, (child)=>{
    if(isValidElement(child)){
      return cloneElement(child, {pwToken:pwToken})
    }
    return child
  })

  const onClickReconfirm = async () => {
    const data = {
      secret_type: "password",
      secret: secret,
    };
    const submit = await reconfirmAuth(data);

    if (submit.resCode === "1") {
      setPwToken(submit.resMsg.token);
    } else {
      alert("비밀번호를 다시 입력해주세요.");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
    {!pwToken ? (<div className="reconfirmPWWrap">
      <h4>비밀번호 재확인</h4>
      <ul>
        <li>
          회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번
          확인해주세요.
        </li>
        <li>비밀번호는 다른 사람에 노출되지 않도록 주의해주세요.</li>
      </ul>
      <div className="reLoginWrapBorder">
        <ReLoginWrap>
          <tr>
            <td>아이디</td>
            <td>{userName}</td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="설정하신 비밀번호를 입력해 주세요."
                onChange={(e) => {
                  setSecret(e.target.value);
                }}
              />
            </td>
          </tr>
        </ReLoginWrap>
      </div>
      <button type="button" onClick={onClickReconfirm}>
        확인
      </button>
    </div>) : childrenWithProps }
    </>
  );
}

export default ReconfirmPW;
