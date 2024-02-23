import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AccountInput, AccountNameInput } from '../../components/AccountInput';
import AccountVerificationInput from '../../components/AccountVerificationInput';
import AccountVerificationSend from 'components/AccountVerificationSend';
import ModalPortal from '../../ModalPortal';
import { CompletedModal, Modal } from 'components/Modal';
import { useLockScroll } from 'hook/useLockScroll';
import * as IMGURL from '../../scripts/utils';
import { fetchAccounts } from 'apis/accounts';
import { getPrivacyTerm, getUseTerm } from 'apis/term';
import { useSetRecoilState } from 'recoil';
import { defaultModalOpenState } from 'state';

function AccountIndex({ nick }) {
  const navigate = useNavigate();

  //modal open state
  const defaultModalOpen = useSetRecoilState(defaultModalOpenState);
  const [modalText, setModalText] = useState('');

  //lockScroll
  const { lockScroll } = useLockScroll();
  const [error, setError] = useState();
  const [completedModal, setCompletedModal] = useState(false);

  //회원가입 양식
  const [userName, setUserName] = useState('');
  const [PW, setPW] = useState('');
  const [PWConfirm, setPWConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [emailToken, setEmailToken] = useState('');
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactNumberToken, setContactNumberToken] = useState('');
  const [useTermId, setUseTermId] = useState('');
  const [privacyTermId, setPrivacyTermId] = useState('');

  //체크박스 필수 체크항목
  const [ageCheck, setAgeCheck] = useState(false);
  const [seaRoadCheck, setSeaRoadCheck] = useState(false);
  const [financialCheck, setFinancialCheck] = useState(false);
  const [personalInfoCheck, setPersonalInfoCheck] = useState(false);

  //체크박스 선택 체크항목
  const [advertisingCheck, setAdvertisingCheck] = useState(false);
  const [advertisingSMSCheck, setAdvertisingSMSCheck] = useState(false);
  const [advertisingEmailCheck, setAdvertisingEmailCheck] = useState(false);

  //비밀번호 확인 함수
  const confirmPassword = (e) => {
    const inputValue = e.target.value;
    if (inputValue !== PW) {
      setError(true);
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    defaultModalOpen(false);
    getUseTerm()
      .then((res) => res.json())
      .then((res) => {
        setUseTermId(res.resMsg.term_id);
      });
    getPrivacyTerm()
      .then((res) => res.json())
      .then((res) => {
        setPrivacyTermId(res.resMsg.term_id);
      });
  }, []);

  //회원가입 버튼
  const onClickSubmit = async (e) => {
    e.preventDefault();
    const allData = {
      username: userName,
      password1: PW,
      password2: PWConfirm,
      email: email,
      email_token: emailToken,
      nickname: nickname,
      last_name: lastName,
      first_name: firstName,
      contact_number: contactNumber,
      contact_number_token: contactNumberToken,
      term_agreements: {
        use_term: {
          term_id: useTermId,
          is_agreed: seaRoadCheck,
        },
        privacy_term: {
          term_id: privacyTermId,
          is_agreed: personalInfoCheck,
        },
      },
    };
    const res = await fetchAccounts(allData);
    if (res.resCode === '1') {
      lockScroll();
      setCompletedModal(true);
    } else if (res.resCode === 'E-VLID-1000') {
      // alert('입력을 완료해주세요.');
      setModalText('입력을 완료해주세요.');
      defaultModalOpen(true);
    } else if (res.resCode === 'E-VLID-1001') {
      // alert('아이디 또는 닉네임이 이미 존재합니다.');
      setModalText('아이디 또는 닉네임이 이미 존재합니다.');
      defaultModalOpen(true);
    } else if (res.resCode === 'E-VLID-1002') {
      // alert('이메일 또는 연락처 인증을 다시 진행해주세요.');
      setModalText('이메일 또는 연락처 인증을 다시 진행해주세요.');
      defaultModalOpen(true);
    } else if (res.resCode === 'E-VLID-1003') {
      // alert('비밀번호를 다시 확인해주세요.');
      setModalText('비밀번호를 다시 확인해주세요.');
      defaultModalOpen(true);
    }
    return res;
  };

  return nick ? (
    navigate('/')
  ) : (
    <>
      <div className="accountPage">
        <div className="container">
          <h1>회원가입</h1>
          <div className="accountForm">
            <form>
              <span>모두 입력완료하셔야 가입이 가능합니다.</span>
              <ul>
                {/* 아이디 */}
                <AccountVerificationInput
                  type="text"
                  errorMsg="아이디는 영문자로 시작하는 6~20자 영문자 또는 숫자이어야 합니다."
                  placeholder="아이디를 입력해주세요."
                  label="아이디"
                  regExp={/^[a-zA-Z0-9]{4,12}$/}
                  buttonText="중복확인"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  defaultModalOpen={defaultModalOpen}
                  setModalText={setModalText}
                />
                {/* 비밀번호 */}
                <AccountInput
                  type="password"
                  errorMsg="영문, 특수문자, 숫자를 혼합하여 8자 이상 입력해주세요."
                  placeholder="비밀번호를 입력해주세요."
                  label="비밀번호"
                  regExp={
                    /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/
                  }
                  onChange={(e) => {
                    setPW(e.target.value);
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
                        placeholder="비밀번호를 한번 더 입력해주세요."
                        onChange={(e) => {
                          setPWConfirm(e.target.value);
                          confirmPassword(e);
                        }}
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
                        error
                          ? 'userInfoInputResult error'
                          : 'userInfoInputResult'
                      }
                    >
                      {error ? <p>비밀번호가 일치하지 않습니다.</p> : ''}
                    </div>
                  </div>
                </li>
                {/* email */}
                <AccountVerificationSend
                  label="이메일"
                  type="text"
                  placeholder="예: searoad@mosepeople.com"
                  errorMsg="이메일 형식으로 입력해 주세요."
                  regExp={
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
                  }
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  setEmailToken={setEmailToken}
                  defaultModalOpen={defaultModalOpen}
                  setModalText={setModalText}
                />

                {/* 닉네임 */}
                <AccountVerificationInput
                  errorMsg="2글자 이상 8글자 미만으로 입력해주세요."
                  placeholder="사용하실 닉네임을 입력해주세요."
                  label="닉네임"
                  regExp={/^[가-힣a-zA-Z0-9]{2,8}/}
                  buttonText="중복확인"
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                  defaultModalOpen={defaultModalOpen}
                  setModalText={setModalText}
                />
                {/* 이름 */}
                <AccountNameInput
                  type="text"
                  errorMsg="이름을 정확히 입력해주세요."
                  placeholder="이름을 입력해주세요."
                  label="이름"
                  regExp={/^[가-힣]{2,10}/}
                  onChangeLN={(e) => {
                    setLastName(e.target.value);
                  }}
                  onChangeFN={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                {/* 핸드폰번호 */}
                <AccountVerificationSend
                  label="휴대폰번호"
                  type="tel"
                  placeholder="휴대폰 번호를 입력해 주세요."
                  errorMsg="잘못된 번호입니다. 다시 입력해 주십시오."
                  regExp={/^[0-9]{8,15}$/}
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                  setContactNumberToken={setContactNumberToken}
                  defaultModalOpen={defaultModalOpen}
                  setModalText={setModalText}
                />
              </ul>
            </form>
            <ul className="agreeCheckListWrap">
              <li className="agreeCheckList">
                <div className="userInfoLabel">
                  <span>
                    바닷길S <br /> 이용약관동의
                  </span>
                </div>
                <div className="agreeCheckBoxState">
                  <ul className="agreeCheckWrap">
                    {/* 전체 체크박스 */}
                    <li className="agreeCheckAll">
                      <input
                        type="checkbox"
                        id="allCheck"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAgeCheck(true);
                            setSeaRoadCheck(true);
                            // setFinancialCheck(true);
                            setPersonalInfoCheck(true);
                            // setAdvertisingCheck(true);
                            // setAdvertisingSMSCheck(true);
                            // setAdvertisingEmailCheck(true);
                          } else {
                            setAgeCheck(false);
                            setSeaRoadCheck(false);
                            // setFinancialCheck(false);
                            setPersonalInfoCheck(false);
                            // setAdvertisingCheck(false);
                            // setAdvertisingSMSCheck(false);
                            // setAdvertisingEmailCheck(false);
                          }
                        }}
                        checked={
                          ageCheck &&
                          seaRoadCheck &&
                          // financialCheck &&
                          personalInfoCheck
                          // advertisingCheck &&
                          // advertisingSMSCheck &&
                          // advertisingEmailCheck
                        }
                      />
                      <label htmlFor="allCheck">
                        이용약관 전체 동의합니다.
                        {/* <p>
                          동의에는 필수 및 선택 목적(광고성 정보 수신 포함)에
                          대한 동의가 포함 되어 있으며, 선택 목적의 동의를
                          거부하시는 경우에도 서비스 이용이 가능합니다.
                        </p> */}
                      </label>
                    </li>
                    {/* 체크박스1 */}
                    <li className="">
                      <input
                        type="checkbox"
                        id="ageCheck"
                        onChange={(e) => setAgeCheck(e.target.checked)}
                        checked={ageCheck}
                      />
                      <label htmlFor="ageCheck">
                        [필수] 본인은 만 14세 이상입니다.
                      </label>
                    </li>
                    {/* 체크박스2 */}
                    <li className="includeViewButton">
                      <input
                        type="checkbox"
                        id="seaRoadCheck"
                        onChange={(e) => setSeaRoadCheck(e.target.checked)}
                        checked={seaRoadCheck}
                      />
                      <label htmlFor="seaRoadCheck">
                        [필수] 바닷길S 이용약관 동의
                      </label>
                      <div className="view pointer">
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          to="/terms/use-term"
                        >
                          보기
                        </Link>
                      </div>
                    </li>
                    {/* 체크박스3 */}
                    {/* <li className="includeViewButton">
                      <input
                        type="checkbox"
                        id="financialCheck"
                        onChange={(e) => setFinancialCheck(e.target.checked)}
                        checked={financialCheck}
                      />
                      <label htmlFor="financialCheck">
                        [필수] 전자금융거래 이용약관 동의
                      </label>
                      <div className="view pointer">이용약관</div>
                    </li> */}
                    {/* 체크박스4 */}
                    <li className="includeViewButton">
                      <input
                        type="checkbox"
                        id="personalInfoCheck"
                        onChange={(e) => setPersonalInfoCheck(e.target.checked)}
                        checked={personalInfoCheck}
                      />
                      <label htmlFor="personalInfoCheck">
                        [필수] 개인정보 수집 및 이용동의
                      </label>
                      <div className="view pointer">
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          to="/terms/privacy-term"
                        >
                          보기
                        </Link>
                      </div>
                    </li>
                    {/* 체크박스5 */}
                    {/* <div className="advertisingCheck">
                      <div className="includeViewButton">
                        <input
                          type="checkbox"
                          id="advertisingCheck"
                          onChange={(e) =>
                            setAdvertisingCheck(e.target.checked)
                          }
                          checked={advertisingCheck}
                        />
                        <label htmlFor="advertisingCheck">
                          [선택] 광고성 정보 수신 동의
                        </label>
                        <div className="view pointer">이용약관</div>
                      </div>
                      <div className="advertisingCheckMedia">
                        <div className="advertisingCheckSMS">
                          <input
                            type="checkbox"
                            id="advertisingSMSCheck"
                            onChange={(e) =>
                              setAdvertisingSMSCheck(e.target.checked)
                            }
                            checked={advertisingSMSCheck}
                          />
                          <label htmlFor="advertisingSMSCheck">
                            [선택] SMS/MMS
                          </label>
                        </div>
                        <div className="advertisingCheckEmail">
                          <input
                            type="checkbox"
                            id="advertisingEmailCheck"
                            onChange={(e) =>
                              setAdvertisingEmailCheck(e.target.checked)
                            }
                            checked={advertisingEmailCheck}
                          />
                          <label htmlFor="advertisingEmailCheck">
                            [선택] 이메일
                          </label>
                        </div>
                      </div>
                    </div> */}
                  </ul>
                </div>
              </li>
            </ul>
            <button
              className="joinButton"
              onClick={onClickSubmit}
              disabled={
                !(
                  ageCheck &&
                  seaRoadCheck &&
                  // financialCheck &&
                  personalInfoCheck &&
                  userName !== '' &&
                  PW !== '' &&
                  PWConfirm !== '' &&
                  nickname !== '' &&
                  firstName !== '' &&
                  lastName !== '' &&
                  contactNumber !== ''
                )
              }
            >
              동의하고 회원가입
            </button>
          </div>
        </div>
      </div>
      {
        <ModalPortal>
          <Modal>
            <p>{modalText}</p>
            <div
              className="closeButton"
              onClick={() => {
                defaultModalOpen(false);
              }}
            >
              <p>확인</p>
            </div>
          </Modal>
        </ModalPortal>
      }
      {completedModal && (
        <ModalPortal>
          <CompletedModal
            setCompletedModal={setCompletedModal}
            nickname={nickname}
          ></CompletedModal>
        </ModalPortal>
      )}
    </>
  );
}

export default AccountIndex;
