import React, { useState } from 'react';
import {
  accountsVerificationNickname,
  accountsVerificationUsername,
} from '../apis/accounts';
import * as IMGURL from '../scripts/utils';

function AccountVerificationInput({
  type,
  errorMsg,
  placeholder,
  label,
  regExp,
  buttonText,
  onChange,
  defaultModalOpen,
  setModalText,
}) {
  const [error, setError] = useState();
  const [disable, setDisable] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const verifitcationResult = async (e) => {
    const data = { username: inputValue };
    const nickname = { nickname: inputValue };
    if (label === '아이디') {
      let idResult = await accountsVerificationUsername(data).then((res) => {
        if (res.resCode === 'E-C404-1000' && error === false) {
          setModalText('아이디 사용이 가능합니다.');
          defaultModalOpen(true);
        } else {
          setModalText('이미 사용중인 아이디입니다.');
          defaultModalOpen(true);
        }
      });
      return idResult;
    } else if (label === '닉네임') {
      let nickResult = await accountsVerificationNickname(nickname).then(
        (res) => {
          if (res.resCode === 'E-C404-1000' && error === false) {
            setModalText('닉네임 사용이 가능합니다.');
            defaultModalOpen(true);
          } else {
            setModalText('이미 사용중인 닉네임입니다.');
            defaultModalOpen(true);
          }
        }
      );
      return nickResult;
    }
  };

  const ValidationInputValue = (e) => {
    onChange(e);
    const target = e.target.value;
    setInputValue(e.target.value);
    if (target === '' || regExp.test(target) === false) {
      setError(true);
      setDisable(true);
    } else {
      setError(false);
      setDisable(false);
    }
  };

  return (
    <li className="userInfo">
      <div className="userInfoLabel">
        <span>{label}</span>
      </div>
      <div className="userInfoInputState">
        <div className="userInfoInputBox">
          <input
            type={type}
            placeholder={placeholder}
            onChange={ValidationInputValue}
          />
          <img
            src={
              error === false
                ? IMGURL.getIconURL('joinCheckIcon_on')
                : IMGURL.getIconURL('joinCheckIcon_off')
            }
            alt="체크이미지"
          />
        </div>
        <div
          className={
            error ? 'userInfoInputResult error' : 'userInfoInputResult'
          }
        >
          {error ? <p>{errorMsg}</p> : ''}
        </div>
        <button
          type="button"
          className="identificationButton"
          onClick={() => {
            verifitcationResult();
          }}
          disabled={disable}
        >
          {buttonText}
        </button>
      </div>
    </li>
  );
}

export default AccountVerificationInput;

AccountVerificationInput.defaultProps = {
  type: 'text',
  errorMsg: '',
  onChange: (e) => {},
  regExp: '',
};
