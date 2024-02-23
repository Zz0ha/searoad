import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as IMGURL from '../../scripts/utils';
import { fetchLogin, fetchLogout } from '../../apis/auth';
import { Modal } from '../../components/Modal';

import { useQuery } from 'react-query';
import ModalPortal from '../../ModalPortal';
import { useSetRecoilState } from 'recoil';
import { defaultModalOpenState } from '../../state/index';
import { useLockScroll } from '../../hook/useLockScroll';
import Loading from 'components/Loading';
import styled from 'styled-components';

const easyLoginIcons = [
  'NaverLoginIcon',
  'KakaoLoginIcon',
  'GoogleLoginIcon',
  'FacebookLoginIcon',
];

function AuthIndex({ modalOn }) {
  //todo: 로그인 페이지 라우트 보호
  const location = useLocation();
  const locationState = location.state;

  const defaultModalOpen = useSetRecoilState(defaultModalOpenState);
  const { lockScroll, openScroll } = useLockScroll();
  useEffect(() => {
    defaultModalOpen(false);
  }, []);

  const [inputId, setInputId] = useState('');
  const [inputPW, setInputPW] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const navigate = useNavigate();

  //react-query (get csrf)
  const { data, refetch, isLoading } = useQuery('nickname');
  const isLogin = data.resMsg.profile.nickname;

  //input에 입력한 값 id와 password state에 저장
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputPW = (e) => {
    setInputPW(e.target.value);
  };

  //로그인버튼클릭
  const onClickSubmit = async (e) => {
    const data = {
      username: inputId,
      password: inputPW,
      remember_me: autoLogin,
    };
    const submit = await fetchLogin(data);
    if (submit.resCode === '1') {
      if (locationState === '/order') {
        navigate('/');
      } else if (locationState) {
        navigate(locationState, { replace: locationState });
      } else if (locationState === null) {
        navigate('/');
      }
    } else {
      lockScroll();
      defaultModalOpen(true);
    }
    await refetch();
  };

  //엔터 로그인
  const onCheckEnter = (e) => {
    if (e.key === 'Enter') {
      onClickSubmit();
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return isLogin ? (
    navigate('/')
  ) : (
    <div className="loginPage">
      <div className="container">
        <h1>로그인</h1>
        <div className="loginForm">
          <form>
            <input
              type="text"
              placeholder="아이디"
              autoComplete="off"
              onChange={handleInputId}
            />
            <input
              type="password"
              placeholder="비밀번호 (대/소문자 구분)"
              autoComplete="off"
              onChange={handleInputPW}
              onKeyPress={onCheckEnter}
            />
            <div className="findAuthWrap">
              <div>
                <input
                  type="checkbox"
                  id="autoLoginCheck"
                  onChange={(e) => {
                    setAutoLogin(e.target.checked);
                  }}
                  checked={autoLogin}
                />
                <label htmlFor="autoLoginCheck">자동로그인</label>
              </div>
              <div className="findAuth">
                <Link to={'/auth/findID'} className="findId pointer">
                  아이디 찾기
                </Link>
                <Link to={'/auth/findPW'} className="pointer">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
            <div className="loginButton pointer" onClick={onClickSubmit}>
              로그인
            </div>
            <Link to="/account" className="accountButton">
              회원가입
            </Link>
          </form>
          {/* <div className="easyLogin">
            <p>간편로그인</p>
            <div className="easyLoginIcons">
              {easyLoginIcons.map((item, idx) => {
                return (
                  <div key={idx}>
                    <img
                      src={IMGURL.getIconURL(item)}
                      alt={item}
                      className="pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
      <ModalPortal>
        <Modal>
          <div>아이디 혹은 비밀번호를 다시 확인해주세요.</div>
          <div
            className="closeButton"
            onClick={() => {
              openScroll();
              defaultModalOpen(false);
            }}
          >
            <p>확인</p>
          </div>
        </Modal>
      </ModalPortal>
    </div>
  );
}

export default AuthIndex;
