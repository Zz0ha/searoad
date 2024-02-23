import { fetchOrders } from "apis/order";
import React, { useState } from "react";
import { useQuery } from "react-query";
import OrderDetail from "./OrderDetail";
import Orderer from "./Orderer";
import Payment from "./Payment";
import ShippingInfo from "./ShippingInfo";
import ModalPortal from "../../ModalPortal";
import { Modal } from "components/Modal";
import { useSetRecoilState } from "recoil";
import { defaultModalOpenState } from "state";
import { useLockScroll } from "hook/useLockScroll";
import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import Loading from "components/Loading";

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
const EmptyCart = styled.div`
  text-align: center;
  padding: 50px 0;
  font-size: 30px;
`

function OrderIndex() {
  //modal
  const defaultModalOpen = useSetRecoilState(defaultModalOpenState);
  const { lockScroll, openScroll } = useLockScroll();
  const location = useLocation();
  const navigate = useNavigate()

  //delivery_request
  const [receiver_name, setReceiver_name] = useState("");
  const [receiver_contact, setReceiver_contact] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [address_type, setAddress_type] = useState("");
  const [address, setAddress] = useState("");
  const [address_detail, setAddress_detail] = useState("");
  const [request_detail, setRequest_detail] = useState("");

  const { data:nickname } = useQuery("nickname");
  const nick = nickname?.resMsg.profile.nickname;
  const { data, refetch, isLoading } = useQuery(["cart",nick],{
    enabled: !!nick
  });
  const cartItem = data?.resMsg;
  const cartDataArr = cartItem.map((element) => {
    return {
      product_id: element.product.id,
      price_per_volume: element.product.price_per_volume,
      quantity: element.quantity,
      total_price: element.product.price_per_volume * element.quantity,
      product_name: element.product.name,
      product_category: element.product.category,
      product_production_type: element.product.production_type,
      product_preservation_type: element.product.preservation_type,
    };
  });
  //발주하기 버튼
  const orderButton = async () => {
    const data = {
      delivery_request: {
        receiver_name: receiver_name,
        receiver_contact: receiver_contact,
        zonecode: zonecode,
        address_type: address_type,
        address: address,
        address_detail: address_detail,
        request_detail: request_detail,
      },
      orders: cartDataArr,
    };
    const res = await fetchOrders(data);
    if (res.resCode === "1") {
      lockScroll();
      defaultModalOpen(true);
    } else if (res.resCode==="E-VLID-1000"){
      alert("작성하지 않은 내용이 있습니다. 확인 후 다시 시도해주세요.")
    }
    return res;
  };
  if(isLoading){
    return <Loading />
  }
  if(cartItem.length===0){
    return (
      <EmptyCart>
        <p>빈 장바구니로 발주서 작성을 시도하고 계십니다. 장바구니를 다시 확인해주세요.</p>
      </EmptyCart>
    )
  } else {
    return (
      <div className="orderPage">
        <div className="container">
          <div className="cartContainer">
            <h2>발주하기</h2>
            <OrderDetail nick={nick}/>
            <Orderer />
            <ShippingInfo
              setReceiver_name={setReceiver_name}
              setReceiver_contact={setReceiver_contact}
              setZonecode={setZonecode}
              setAddress_type={setAddress_type}
              setAddress={setAddress}
              setAddress_detail={setAddress_detail}
              setRequest_detail={setRequest_detail}

              receiver_name={receiver_name}
              receiver_contact={receiver_contact}
              zonecode={zonecode}
              address_type={address_type}
              address={address}
              address_detail={address_detail}
            />
            {/* <Discount /> */}
            <Payment orderButton={orderButton} />
          </div>
        </div>
        <ModalPortal>
          <Modal>
            <div className="successInfo">
              <p>발주요청이 완료되었습니다.</p>
              <span>
                바닷길에서 회원 정보에 저장된 연락처로 연락드릴예정입니다.
              </span>
            </div>
            <CloseButton
              onClick={() => {
                openScroll();
                defaultModalOpen(false);
                refetch();  // 발주에 성공했으므로 장바구니 미리 갱신
                navigate('/mypage/orderItems')
              }}
            >
              <p>확인</p>
            </CloseButton>
          </Modal>
        </ModalPortal>
      </div>
    );
  }
  }


export default OrderIndex;
