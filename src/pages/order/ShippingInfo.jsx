import { useLockScroll } from "hook/useLockScroll";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  MyShippingAddressListModal,
  ViewAddList,
} from "../../components/Modal";
import ModalPortal from "../../ModalPortal";
import { useRecoilState } from "recoil";
import { modalOpenState } from "state";
import { useQuery } from "react-query";
import { getDelivery } from "../../apis/delivery";
import Loading from "components/Loading";

const ShippingInfoBox = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  align-items: center;
  .addressButtonGroup {
    display: flex;
    gap: 10px;
    button {
      width: 150px;
      height: 35px;
      line-height: 35px;
      background-color: #1c53c7;
      color: #fff;
      text-align: center;
      &:last-child {
        border: 1px solid #1c53c7;
        background: #fff;
        color: #1c53c7;
      }
    }
  }
`;
const ShippingInfoList = styled.ul`
  .customSelectBox {
    width: 350px;
    border: 1px solid #1c53c7;
    select {
      width: 100%;
      padding: 10px;
      outline: 0;
      border: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: url("https://searoad-s-cdn.s3.ap-northeast-2.amazonaws.com/icons/dropdownIcon.png")
        no-repeat 97% 50%/15px auto;
      &::-ms-expand {
        display: none;
      }
      &:disabled {
        color: inherit;
      }
    }
    input {
      width: 100%;
      padding: 10px;
      outline: 0;
      border: 0;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
  .requirement {
    display:flex;
    flex-direction: column;
    gap: 5px;
    .maxTextLengInfo {
      color: red;
      font-size: 13px;
      margin-left: 2px;
    }
    .requirementInput {
      width: 500px;

      padding: 10px;
      background-color: ${({ readOnly }) => {
        if (readOnly) {
          return "rgb(252 252 252)";
        } else {
          return false;
        }
      }};
      border: ${({ readOnly }) => {
        if (!readOnly) {
          return "1px solid #1c53c7;";
        } else {
          return "1px solid #e9e9e9;";
        }
      }}
      display: flex;
      justify-content: space-between;
      }
      textarea {
        width: 100%;
        box-sizing: border-box;
        font-family: "Noto Sans KR", sans-serif;
        flex: 1;
        height: auto;
        resize: none;
        font-size: 12px;
        background-color: ${({ readOnly }) => {
          if (readOnly) {
            return "rgb(252 252 252)";
          } else {
            return false;
          }
        }};
      }
      p {
        font-size: 13px;
        padding-left: 10px;
        color: #999999;
      }
    }
  .requirementInput textarea, .requirementInput textarea:focus  {
    border: none;
    outline: none;
  }
  .requirementInput textarea, .requirementInput textarea:hover {
    color: inherit;
  }

`;

function ShippingInfo({
  setReceiver_name,
  setReceiver_contact,
  setZonecode,
  setAddress_type,
  setAddress,
  setAddress_detail,
  setRequest_detail,

  zonecode,
  address,
  address_detail,
  receiver_name,
  receiver_contact,
}) {
  //textarea ref
  const autoFocusRef = useRef(null);



  //lockScroll
  const { lockScroll } = useLockScroll();
  //배송지 modal창
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  //즐겨찾는 배송지 modal 열기
  const [viewAddList, setViewAddList] = useState(false);

  //배송지 GET 불러오기
  const { data, isLoading } = useQuery("delivery", getDelivery, {
    notifyOnChangeProps: "tracked",
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });
  const deliveryList = data?.resMsg;

  //기본배송지
  let defaultAddress = deliveryList.filter((address) => {
    return address.set_default === true;
  });

  //처음 렌더링 될 때 기본 배송지로
  useEffect(() => {
    if (defaultAddress.length !== 0) {
      const dfZonecode = defaultAddress[0]?.zonecode;
      const dfAddress = defaultAddress[0]?.address;
      const dfDetail = defaultAddress[0]?.address_detail;
      const addressType = defaultAddress[0]?.address_type;
      const receiverName = defaultAddress[0]?.receiver_name;
      const receiverContact = defaultAddress[0]?.receiver_contact;

      setAddress_type(addressType === "R" ? "ROAD" : "JIBUN");
      setZonecode(dfZonecode);
      setAddress(dfAddress);
      setAddress_detail(dfDetail);
      setReceiver_name(receiverName);
      setReceiver_contact(receiverContact);
    }
  }, []);

  //여기서 배송지 보여주고 선택한 배송지 handler
  const defaultAddressInfo = () => {
    if(deliveryList.length===0){
      return '배송지를 등록해주세요.'
    }
    else return `[${zonecode}] ${address} ${address_detail}`;
  };

  const receiverInfo = () => {
    if(deliveryList.length===0){
      return '배송지와 수령인을 등록해주세요.'
    }
    else return `${receiver_name}`;
  };
  const receiverContactInfo = () => {
    if(deliveryList.length===0){
      return '배송지와 수령인을 등록해주세요.'
    }
    else if (defaultAddress.length===0){
      return '기본 배송지 설정이 되어있지 않습니다. 배송지와 수령인을 등록해주세요.'
    }
    else return `${receiver_contact}`;
  };


  //배송시 요청사항
  const [readOnly, setReadOnly] = useState(true);
  const [textLeng, setTextLeng] = useState(0);
  const [text, setText] = useState("");
  const maxTextLeng = 200;

  //자동 focus
  const autoFocusInput = (e) => {
    e.preventDefault();

    if (e.target.value === "direct") {
      autoFocusRef.current.focus();
      setRequest_detail(autoFocusRef.current.value);
      setReadOnly(false);
      setText("");
      setTextLeng(0);
    } else if (e.target.value === "선택 안함") {
      setRequest_detail("");
      setReadOnly(true);
      setText("선택안함");
      setTextLeng(0);
      autoFocusRef.current.style.height = "auto";
    } else {
      setRequest_detail(e.target.value);
      setText(e.target.value);
      setReadOnly(true);
      setTextLeng(e.target.value.length);
      autoFocusRef.current.style.height = "auto";
    }
  };

  //enter key Lock
  const enterLock = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  //autoResize
  useEffect(() => {
    autoFocusRef.current.style.height = "auto";
    autoFocusRef.current.style.width = "100%";
    autoFocusRef.current.style.height = `${autoFocusRef.current.scrollHeight}px`;
  }, [text]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="orderSection shippingInfo">
      <h4>배송정보</h4>
      <ShippingInfoBox>
        <div className="addressButtonGroup">
          <button
            type="button"
            onClick={() => {
              lockScroll();
              setModalOpen(true);
            }}
          >
            주소 찾기
          </button>
          <button
            type="button"
            onClick={() => {
              lockScroll();
              setViewAddList(true);
            }}
          >
            배송지 목록
          </button>
        </div>
      </ShippingInfoBox>
      <ShippingInfoList readOnly={readOnly}>
         <li>
          <p>주소</p>
          <span>{defaultAddressInfo()}</span>
        </li>
        <li>
          <p>수령인</p>
          {receiverInfo()}
        </li>
       <li>
        <p>연락처</p>
        {receiverContactInfo()}
       </li>
        <li>
          <p>배송 시 요청사항</p>
          <div className="customSelectBox">
            <select name="" id="" onChange={autoFocusInput}>
              <option value="선택 안함">선택 안함</option>
              <option value="배송 전, 연락주세요.">배송 전, 연락주세요.</option>
              <option value="부재 시, 연락주세요.">
                부재 시, 연락주세요.
              </option>
              <option value="부재 시, 경비실에 맡겨주세요.">
                부재 시, 경비실에 맡겨주세요.
              </option>
              <option value="direct">직접입력</option>
            </select>
          </div>
        </li>
        <li>
          <p></p>
          <div className={"requirement"}>
            <div className="requirementInput">
              <textarea
                rows={1}
                type="text"
                placeholder={
                  readOnly ? "" : "배송 요청사항을 직접 입력해주세요."
                }
                maxLength={maxTextLeng}
                ref={autoFocusRef}
                value={text}
                onChange={(e) => {
                  setRequest_detail(e.target.value);
                  const textRe = e.target.value.replace(/(\r\n\t|\n|\r\t)/gm,"");
                  setTextLeng(textRe.length);
                  setText(textRe);
                }}
                onKeyDown={enterLock}
                readOnly={readOnly}
              />
              <p>{`${textLeng}/${maxTextLeng}`}</p>
            </div>
            {maxTextLeng < textLeng && (
              <p className="maxTextLengInfo">
                입력 가능한 글자수를 초과하였습니다.
              </p>
            )}
          </div>
        </li>
      </ShippingInfoList>
      {viewAddList && (
        <ModalPortal>
          <ViewAddList
            setViewAddList={setViewAddList}
            setZonecode={setZonecode}
            setAddress_type={setAddress_type}
            setAddress={setAddress}
            setAddress_detail={setAddress_detail}
            setReceiver_name={setReceiver_name}
            setReceiver_contact={setReceiver_contact}
          />
        </ModalPortal>
      )}
      {modalOpen && (
        <ModalPortal>
          <MyShippingAddressListModal
            setModalOpen={setModalOpen}
            setZonecode={setZonecode}
            setAddress={setAddress}
            setAddress_type={setAddress_type}
            setAddress_detail={setAddress_detail}
            setReceiver_name={setReceiver_name}
            setReceiver_contact={setReceiver_contact}
            deliveryList={deliveryList}
          />
        </ModalPortal>
      )}
    </section>
  );
}

export default ShippingInfo;
