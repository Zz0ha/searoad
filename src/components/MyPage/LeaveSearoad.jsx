import { deleteUser } from "apis/auth";
import Loading from "components/Loading";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LeaveSearoadWrap = styled.div`
  ul {
    padding: 40px 0;
    li {
      display: flex;
      gap: 30px;
      font-size: 15px;
      padding: 20px 0;
      span {
        color: red;
      }
      input {
        border: 1px solid #000;
        width: 100%;
        font-size: 15px;
        padding: 10px;
        margin-top:20px ;
      }
    }
  }
  button[disabled] {
    cursor: auto;
    background-color: #fff;
    border: 1px solid #999999;
    color: #999999;
  }
  button {
    color: #333;
    width: 250px;
    height: 50px;
    background-color: #1c53c7;
    line-height: 50px;
    color: #fff;
    text-align: center;
    display: block;
    margin: 0 auto;
  }
`;

function LeaveSearoad({ pwToken }) {
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [disable, setDisable] = useState(true)
  const { data, isLoading } = useQuery("nickname");
  const userName = data.resMsg.profile.username;
  useEffect(() => {
    const reg = /^[가-힣]{3,5}/
    const disableHandler = () => {
      if (deleteConfirm === "" || !reg.test(deleteConfirm)) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    };
    disableHandler();
  }, [deleteConfirm]);


  const onClickLeave = async () => {
    const data = {
      confirm_msg: deleteConfirm,
      token: pwToken,
    };
    const submit = await deleteUser(data);
    if (submit.ok) {
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    } else if (submit.json().resCode === "E-VLID-1002") {
      alert("'영구삭제'를 정확히 입력해주세요.");
    } else if (submit.resCode === "E-C403-1000") {
      alert("다시 시도해주시기 바랍니다.");
      navigate("/");
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <LeaveSearoadWrap>
      <div>
        <ul>
          <li>
            <div>회원탈퇴안내</div>
            <div>
              사용하고 계신 아이디 ({userName})는 탈퇴할 경우 재사용 및 복구가
              불가능합니다.
              <br />
              <span>
                탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니
                신중하게 선택하시기 바랍니다.
              </span>
            </div>
          </li>

          <li>
            <div>회원탈퇴 확인</div>
            <div>
              <p>
                회원탈퇴를 원하시면 아래에 <span>"영구삭제"</span>를 직접
                입력해주세요.
              </p>
              <input
                type="text"
                id="leave"
                placeholder="영구삭제"
                onChange={(e) => {
                  setDeleteConfirm(e.target.value);
                }}
              />
            </div>
          </li>
        </ul>
        <button type="button" onClick={onClickLeave} disabled={disable}>
          탈퇴하기
        </button>
      </div>
    </LeaveSearoadWrap>
  );
}

export default LeaveSearoad;
