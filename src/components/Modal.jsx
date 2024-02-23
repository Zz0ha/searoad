import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { AiOutlineClose } from 'react-icons/ai';
import DaumPostcode from 'react-daum-postcode';
import Loading from './Loading';

import * as IMGURL from 'scripts/utils';
import { defaultModalOpenState, noticeModalOpenState } from 'state';
import { useLockScroll } from 'hook/useLockScroll';
import {
  fetchAddDelivery,
  fetchDeleteDelivery,
  fetchPutDelivery,
} from 'apis/delivery';
import { getBoardOfficial } from 'apis/board';

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContent = styled.div`
  text-align: center;
  width: 400px;
  background-color: #fff;
  position: relative;
  padding: 20px;
  .closeIcon {
    position: absolute;
    right: 20px;
    font-size: 20px;
  }
  .successInfo {
    p {
      font-size: 17px;
      color: #1c53c7;
      margin-bottom: 10px;
    }
    span {
      font-size: 15px;
    }
  }
  .textareaWrap {
    h3 {
      margin-bottom: 10px;
    }
    textarea {
      width: 100%;
      height: 250px;
      border: 1px solid #999999;
      resize: none;
      padding: 10px;
    }
  }
  .noticeModalWrap {
    width: 100%;
    h3 {
      margin-bottom: 30px;
    }
  }
  .closeButtonWrap {
    display: flex;
    gap: 10px;
    width: 100%;
    margin-top: 30px;
    button {
      text-align: center;
      padding: 10px;
      color: #fff;
      background-color: #1c53c7;
      &:first-child {
        flex: 1;
      }
    }
  }
`;

const CloseButton = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background: #1c53c7;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  p {
  }
`;

const ShippingAddressList = styled.div`
  width: 600px;
  background: #fff;
  padding: 20px;
  word-break: keep-all;
  .shippingAddressTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #999999;
    padding-bottom: 10px;
    svg {
      font-size: 20px;
    }
    h1 {
      font-size: 18px;
      color: #333333;
    }
  }
`;

/* addCart Modal */
const AddCartModal = styled.div`
  background: #eeeeee;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  .addCartProductPrice {
    display: flex;
    gap: 200px;
    p {
      font-size: 22px;
    }
  }
  .modalButtonWrap {
    display: flex;
    gap: 10px;
    button {
      width: 200px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #1c53c7;
      border: 1px solid #1c53c7;
      &:last-child {
        background-color: #1c53c7;
        color: #fff;
      }
    }
  }
`;
const CountButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #999999;
  width: 100px;
  height: 30px;
  div {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:last-child) {
      border-right: 1px solid #999999;
    }
    &:nth-child(2) {
      flex: 1;
    }
  }
`;

/* 배송지 수정 */
const AddListTable = styled.table`
  width: 100%;
  text-align: center;
  thead {
    border-bottom: 1px solid #333333;
    th {
      font-size: 13px;
    }
  }
  th,
  td {
    padding: 15px;
    font-size: 13.5px;
  }
  /* td {
    &:nth-child(2) {
      text-align: left;
    }
  } */
  tbody {
    tr {
      font-size: 14px;
      border-bottom: 1px solid #eeeeee;
    }
  }
`;

const FindAddressModalWrap = styled.div`
  width: 600px;
  background: #fff;
  padding: 20px;
  .shippingAddressTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 10px;
    svg {
      font-size: 20px;
    }
    h1 {
      font-size: 22px;
      color: #333333;
    }
  }
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .kakaoAPI {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export function Modal({ children, location }) {
  const navigate = useNavigate();
  const [defaultModalOpen, setDefaultModalOpen] = useRecoilState(
    defaultModalOpenState
  );
  //lockScroll
  const { openScroll } = useLockScroll();
  const locationNav = () => {
    if (location.pathname === '/order') {
      navigate('/mypage/orderItems');
    } else if (location.pathname === '/mypage/orderItems') {
      navigate('/mypage/exchangeItems');
    }
  };

  if (!defaultModalOpen) return null;

  return (
    <Background>
      <ModalContent>
        <AiOutlineClose
          className="pointer closeIcon"
          onClick={() => {
            openScroll();
            setDefaultModalOpen(false);
          }}
        />
        {children}
      </ModalContent>
    </Background>
  );
}

export function ViewAddList({
  children,
  setViewAddList,
  setZonecode,
  setAddress,
  setAddress_detail,
  setReceiver_name,
  setReceiver_contact,
  setAddress_type,
}) {
  const { openScroll } = useLockScroll();
  //배송지 GET 불러오기
  const { data, isLoading, refetch } = useQuery('delivery');
  const [disable, setDisable] = useState(true);
  const deliveryList = data.resMsg;
  const defaultAddress = deliveryList.filter((el) => {
    return el.set_default;
  });
  //기본배송지 수정
  const defaultAddressHandler = async (e, id) => {
    const data = {
      id: id,
      set_default: true,
    };
    if (e.target.textContent === '설정') {
      setDisable(false);
      if (window.confirm('기본 배송지로 설정할까요?')) {
        const submit = await fetchPutDelivery(data);
        refetch();
        alert('기본 배송지로 설정되었습니다.');
        return submit;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  //지금 수령할 배송지로 설정
  const targetAddress = async (e, list) => {
    setZonecode(list.zonecode);
    setAddress(list.address);
    setAddress_detail(list.address_detail);
    setReceiver_contact(list.receiver_contact);
    setReceiver_name(list.receiver_name);
    setAddress_type(list.address_type);
    setViewAddList(false);
  };

  //배송지 삭제하기 버튼
  const onClickDeleteAdd = async (e, list) => {
    const data = {
      favorite_address_id: list.id,
    };
    if (!window.confirm('정말삭제하시겠습니까?')) {
      return null;
    } else {
      await fetchDeleteDelivery(data);
      alert('삭제되었습니다.');
    }
    await refetch();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Background>
      <ShippingAddressList>
        <div className="shippingAddressTop">
          <h1>등록된 배송지 목록</h1>
          <AiOutlineClose
            className="pointer"
            onClick={() => {
              openScroll();
              setViewAddList(false);
            }}
          />
        </div>
        <AddListTable>
          <thead>
            <tr>
              <th>기본배송지</th>
              <th>배송지 정보</th>
              <th>삭제 </th>
            </tr>
          </thead>
          <tbody>
            {deliveryList.length !== 0 ? (
              deliveryList.map((list) => {
                return (
                  <tr key={list.id}>
                    <td>
                      <button
                        onClick={(e) => {
                          defaultAddressHandler(e, list.id);
                        }}
                        className={
                          !list.set_default
                            ? 'setDefaultButton pointer'
                            : 'cursorAuto'
                        }
                      >
                        {!list.set_default ? '설정' : '✅'}
                      </button>
                    </td>
                    <td
                      className="pointer"
                      onClick={(e) => {
                        targetAddress(e, list);
                      }}
                    >{`(${list.zonecode}) ${list.address}`}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          onClickDeleteAdd(e, list);
                        }}
                        className={!list.set_default ? 'pointer' : 'cursorAuto'}
                      >
                        {!list.set_default && '삭제'}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>등록된 배송지가 없습니다.</p>
            )}
          </tbody>
        </AddListTable>
      </ShippingAddressList>
    </Background>
  );
}

export function CartModal({ modalOpen, el, productList, children }) {
  //lockScroll

  return <Background>{children}</Background>;
}

export function MyShippingAddressListModal({
  setModalOpen,
  setZonecode,
  setAddress,
  setAddress_detail,
  setReceiver_name,
  setReceiver_contact,
  setAddress_type,
  deliveryList,
}) {
  const ref = useRef(null);
  const location = useLocation();
  const [checkReadOnly, setCheckReadOnly] = useState(true);

  //우편번호 찾기 modal state
  const [daumPopup, setDaumPopup] = useState(false);

  //배송지 목록 갯수 확인
  useEffect(() => {
    if (deliveryList.length !== 0) {
      setCheckReadOnly(false);
    } else {
      setCheckReadOnly(true);
    }
  }, [deliveryList]);

  //배송지 정보
  const [zoneCodeData, setZoneCodeData] = useState('');
  const [addressData, setAddressData] = useState('');
  const [addressDetailData, setAddressDetailData] = useState('');
  const [addressType, setAddressType] = useState('');
  const [defaultAdd, setDefaultAdd] = useState(false);
  const [receiverName, setReceiverName] = useState('');
  const [receiverContact, setReceiverContact] = useState('');

  //다음 주소 api onClick
  const apiHandler = () => {
    setDaumPopup(!daumPopup);
  };
  const onCompletePost = (data) => {
    // let fullAddr = `${data.address} ${data.buildingName??data.buildingName}`
    let fullAddr = () => {
      if (data.buildingName !== '') {
        return data.address + ' (' + data.buildingName + ')';
      } else {
        return data.address;
      }
    };
    let zonecode = data.zonecode;
    let addressType = data.addressType;
    setAddressData(fullAddr);
    setZoneCodeData(zonecode);
    setAddressType(addressType === 'R' ? 'ROAD' : 'JIBUN');
    ref.current.style.display = 'none';
  };
  const onClickDefaultDelivery = (e) => {
    if (!checkReadOnly) {
      if (e.target.checked) {
        setDefaultAdd(true);
      } else {
        setDefaultAdd(false);
      }
    } else {
      return false;
    }
  };

  // 배송지 즐겨찾기 추가 버튼
  const onClickSaveDeliveryAdd = async () => {
    const addDeliveryList = window.confirm(
      '즐겨찾는 배송지 목록에 추가할까요?'
    );
    if (addDeliveryList) {
      const data = {
        receiver_name: receiverName,
        receiver_contact: receiverContact,
        zonecode: zoneCodeData,
        address: addressData,
        address_type: addressType,
        address_detail: addressDetailData,
        set_default: defaultAdd,
      };
      const submit = await fetchAddDelivery(data);
      if (submit.resCode === '1') {
        alert('배송지 목록에 추가되었습니다.');
        if (location.pathname === '/order') {
          setZonecode(zoneCodeData);
          setAddress(addressData);
          setAddress_detail(addressDetailData);
          setReceiver_name(receiverName);
          setReceiver_contact(receiverContact);
          setAddress_type(addressType === 'R' ? 'ROAD' : 'JIBUN');
        }
        openScroll();
        setModalOpen(false);
      } else {
        alert('빈칸이 있습니다.');
      }
    } else {
      if (
        zoneCodeData !== '' &&
        addressData !== '' &&
        addressDetailData !== '' &&
        receiverName !== '' &&
        receiverContact !== '' &&
        addressType !== ''
      ) {
        setZonecode(zoneCodeData);
        setAddress(addressData);
        setAddress_detail(addressDetailData);
        setReceiver_name(receiverName);
        setReceiver_contact(receiverContact);
        setAddress_type(addressType === 'R' ? 'ROAD' : 'JIBUN');
        openScroll();
        setModalOpen(false);
      } else {
        alert('빈칸이 있습니다.');
      }
    }
  };
  //다음 주소 api style
  const postCodeStyle = {
    padding: '10px',
  };
  const { openScroll } = useLockScroll();

  return (
    <Background>
      <ShippingAddressList>
        <div className="shippingAddressTop">
          <h1>주소 찾기</h1>
          <AiOutlineClose
            className="pointer"
            onClick={() => {
              openScroll();
              setModalOpen(false);
            }}
          />
        </div>
        <div className="shippingAddressWrap">
          <ul>
            <li>
              <div className="shippingAddress">
                <input
                  value={addressData}
                  placeholder="주소검색 후 주소가 입력됩니다."
                  readOnly
                />
                <div className="pointer" onClick={apiHandler}>
                  주소검색
                </div>
              </div>
              <input
                type="text"
                placeholder="상세주소를 입력해주세요."
                onChange={(e) => {
                  setAddressDetailData(e.target.value);
                }}
              />
            </li>
            <li>
              <p>받는 분</p>
              <input
                type="text"
                placeholder="이름을 입력해주세요."
                onChange={(e) => {
                  setReceiverName(e.target.value);
                }}
              />
            </li>
            <li>
              <p>연락처</p>
              <input
                type="text"
                placeholder="'-'없이 입력해주세요."
                onChange={(e) => {
                  setReceiverContact(e.target.value);
                }}
              />
            </li>
            <li>
              <input
                type="checkbox"
                id="defaultAddress"
                onClick={onClickDefaultDelivery}
                checked={checkReadOnly ? true : defaultAdd}
                disabled={checkReadOnly ? true : false}
                onChange={(e) => {
                  setDefaultAdd(e.target.checked);
                }}
              />
              <label htmlFor="defaultAddress">기본 배송지로 저장합니다.</label>
            </li>
            <button type="button" onClick={onClickSaveDeliveryAdd}>
              저장
            </button>
          </ul>
        </div>
      </ShippingAddressList>

      {daumPopup && (
        <FindAddressModalWrap ref={ref}>
          <div className="shippingAddressTop">
            <h1>주소검색</h1>
            <AiOutlineClose className="pointer" onClick={apiHandler} />
          </div>
          <div className="kakaoAPI">
            <DaumPostcode
              style={postCodeStyle}
              onComplete={onCompletePost}
              autoClose
            ></DaumPostcode>
          </div>
        </FindAddressModalWrap>
      )}
    </Background>
  );
}

//회원가입 완료 modal
export function CompletedModal({ setCompletedModal, nickname }) {
  const navigate = useNavigate();
  const { openScroll } = useLockScroll();
  return (
    <Background>
      <div className="Modal completedModal">
        <ul>
          <li>
            <span>바닷길S</span> 가입완료
          </li>
          <li>
            <img src={IMGURL.getIconURL('completedUserIcon')} alt="" />
            <div className="welcomeUser">
              <span>{nickname}</span>고객님!
            </div>
            <div className="welcomeSearoad">
              <span>바닷길S</span>의 회원이 되신것을 환영합니다!
            </div>
          </li>
          <button
            onClick={() => {
              openScroll();
              setCompletedModal(false);
              navigate('/auth');
            }}
          >
            확인
          </button>
        </ul>
      </div>
    </Background>
  );
}

//불량신고 모달
export function TextAreaModal({ setOpenTextAreaModal }) {
  const { openScroll } = useLockScroll();
  return (
    <Background onClick={() => setOpenTextAreaModal(false)}>
      <ModalContent>
        <div className="textareaWrap">
          <h3>불량신고 접수</h3>
          <textarea placeholder="불량 내용을 입력해주세요."></textarea>
        </div>
        <CloseButton
          onClick={() => {
            openScroll();
            setOpenTextAreaModal(false);
          }}
        >
          <p>확인</p>
        </CloseButton>
      </ModalContent>
    </Background>
  );
}

//공지 모달
export function NoticeModal() {
  const [noticeModalOpen, setNoticeModalOpen] =
    useRecoilState(noticeModalOpenState);
  //lockScroll
  const { openScroll } = useLockScroll();

  // 가장 최근 공지 가져오기
  const [boardNotificationLatest, setBoardNotificationLatest] = useState({});

  useEffect(() => {
    getBoardOfficial({
      apiQueryString: {
        topN: 1,
      },
    })
      .then((resp) => {
        setBoardNotificationLatest(resp.resMsg?.data[0] ?? {});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //일주일동안 팝업창 열지않기 기능
  const closePopup = () => {
    let expire = new Date();
    expire.setTime(expire.getTime() + 7 * 24 * 60 * 60 * 1000);
    // TODO:
    // boardNotificationLatest의 id 값도 같이 저장
    localStorage.setItem('popupNoshow', expire.getTime());
  };

  const checkPopupClose = () => {
    const expireDay = localStorage.getItem('popupNoshow');
    let today = new Date();

    // TODO:
    // 1. boardNotificationLatest의 id 값과 expireDay를 모두 비교하여 팝업을 띄울지 말지 결정
    // 2. boardNotificationLatest의 id 값이 없을 경우(undefined) 팝업을 띄우지 않기로 결정
    //
    // - 참고: boardNotificationLatest의 구성요소
    //   { id, category, title, content, date_published }
    if (today.getTime() > expireDay) {
      return false;
    } else {
      return true;
    }
  };

  const closePopupWeek = () => {
    closePopup();
    setNoticeModalOpen(false);
    openScroll();
  };

  useEffect(() => {
    checkPopupClose() ? setNoticeModalOpen(false) : setNoticeModalOpen(true);
  }, [boardNotificationLatest, setNoticeModalOpen]);

  if (!noticeModalOpen) return null;

  return (
    <Background>
      <ModalContent>
        <AiOutlineClose
          className="pointer closeIcon"
          onClick={() => {
            openScroll();
            setNoticeModalOpen(false);
          }}
        />
        <div className="noticeModalWrap">
          <h3>{boardNotificationLatest.title}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: boardNotificationLatest.content,
            }}
          />
        </div>
        <div className="closeButtonWrap">
          <button className="noshowWeek" type="botton" onClick={closePopupWeek}>
            <p>일주일동안 보지 않기</p>
          </button>
          <button
            type="botton"
            onClick={() => {
              openScroll();
              setNoticeModalOpen(false);
            }}
          >
            <p>닫기</p>
          </button>
        </div>
      </ModalContent>
    </Background>
  );
}
