import React, { useState } from 'react';
import * as IMGURL from '../scripts/utils';
import {
  accountsVerificationExistence,
  accountsVerificationsEmail,
  accountsVerificationsNumber,
  accountsVerificationsSendEmail,
  accountsVerificationsSendNumber,
} from 'apis/accounts';

function AccountVerificationSend({
  label,
  type,
  placeholder,
  errorMsg,
  regExp,
  onChange,
  setEmailToken,
  setContactNumberToken,
  value,
  defaultModalOpen,
  setModalText,
}) {
  const [error, setError] = useState();
  const [disable, setDisable] = useState(true);
  const [confirmDisable, setConfirmDisable] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  //정규식 검사 함수
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

  //인증번호 확인
  const validationNumber = (e) => {
    setVerifyCode(e.target.value);
    const resExp = /^[0-9]{7}$/;
    const target = e.target.value;
    if (target === '' || resExp.test(target) === false) {
      setConfirmDisable(true);
    } else {
      setConfirmDisable(false);
    }
  };

  //이메일, 휴대폰번호 인증코드 요청
  const verifitcationInputResult = async (e) => {
    e.preventDefault();
    const data = { mode: 'issue', email: inputValue };
    const phoneData = {
      mode: 'issue',
      contact_number: inputValue,
    };

    if (label === '이메일') {
      let existenceResult = await accountsVerificationExistence('email', {
        email: inputValue,
      });
      if (existenceResult.status === 200) {
        setModalText('이미 존재하는 이메일입니다.');
        defaultModalOpen(true);
        return;
      }
      let emailResult = await accountsVerificationsSendEmail(data).then(
        (res) => {
          if (res.resCode === '1') {
            setModalText('해당 이메일로 인증코드를 보냈습니다.');
            defaultModalOpen(true);
          } else {
            setModalText('이메일을 다시 확인해주세요.');
            defaultModalOpen(true);
          }
        }
      );
      return emailResult;
    } else if (label === '휴대폰번호') {
      let existenceResult = await accountsVerificationExistence(
        'contact-number',
        { contact_number: inputValue }
      );
      if (existenceResult.status === 200) {
        setModalText('이미 존재하는 연락처입니다.');
        defaultModalOpen(true);
        return;
      }
      let phoneResult = await accountsVerificationsSendNumber(phoneData).then(
        (res) => {
          if (res.resCode === '1') {
            setModalText('핸드폰으로 인증코드를 보냈습니다.');
            defaultModalOpen(true);
          } else {
            setModalText('핸드폰번호를 다시 확인해주세요.');
            defaultModalOpen(true);
          }
        }
      );
      return phoneResult;
    }
  };

  //이메일, 휴대폰번호 인증메일 검증
  const validationCodeResult = async (e) => {
    e.preventDefault();
    const data = { mode: 'verify', email: inputValue, code: verifyCode };
    const phoneData = {
      mode: 'verify',
      contact_number: inputValue,
      code: verifyCode,
    };
    if (label === '이메일') {
      const emailConfirmResult = await accountsVerificationsEmail(data).then(
        (res) => {
          if (res.resCode === '1') {
            setModalText('이메일 인증이 완료되었습니다.');
            defaultModalOpen(true);
            return res.resMsg.token;
          } else {
            setModalText('인증코드를 다시 확인해주세요.');
            defaultModalOpen(true);
          }
        }
      );
      setEmailToken(emailConfirmResult);
    } else if (label === '휴대폰번호') {
      const phoneConfirmResult = await accountsVerificationsNumber(
        phoneData
      ).then((res) => {
        if (res.resCode === '1') {
          setModalText('핸드폰 인증이 완료되었습니다.');
          defaultModalOpen(true);
          return res.resMsg.token;
        } else if (res.resCode === 'E-VLID-1005') {
          setModalText(
            '코드 유효 시간이 만료되었습니다. 인증번호를 다시 요청해주세요.'
          );
          defaultModalOpen(true);
        } else {
          setModalText('인증코드를 다시 확인해주세요.');
          defaultModalOpen(true);
        }
      });
      setContactNumberToken(phoneConfirmResult);
    }
  };

  return (
    <li className="userInfo userEmail">
      <div className="userInfoLabel">
        <span>{label}</span>
      </div>
      <div className="userInfoInputState">
        <div className="userInfoInputBox">
          <input
            type={type}
            placeholder={placeholder}
            onChange={ValidationInputValue}
            defaultValue={value}
          />
          <img
            src={
              error === false
                ? IMGURL.getIconURL('joinCheckIcon_on')
                : IMGURL.getIconURL('joinCheckIcon_off')
            }
            alt=""
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
          className="identificationButton pointer"
          disabled={disable}
          onClick={verifitcationInputResult}
        >
          본인인증
        </button>
        <div className="userInfoInputState">
          <div className="userInfoInputBox">
            <input
              type="tel"
              placeholder="인증번호를 입력해 주세요."
              onChange={validationNumber}
            />
            <img
              src={
                confirmDisable === false
                  ? IMGURL.getIconURL('joinCheckIcon_on')
                  : IMGURL.getIconURL('joinCheckIcon_off')
              }
              alt=""
            />
          </div>
          <button
            className="identificationConfirmButton pointer"
            disabled={confirmDisable}
            onClick={validationCodeResult}
          >
            인증번호확인
          </button>
        </div>
      </div>
    </li>
  );
}

export default AccountVerificationSend;

AccountVerificationSend.defaultProps = {
  type: 'text',
  errorMsg: '',
  onChange: (e) => {},
};
