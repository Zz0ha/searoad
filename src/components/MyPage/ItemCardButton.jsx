import styled from "styled-components/macro";
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import ModalPortal from 'ModalPortal';
import { ModalFlexible } from 'components/ModalFlexible';
import { PaymentGuideModal } from 'pages/payment/PaymentGuideModal';

import { modalFlexibleCloseBtnState, modalOpenState } from 'state';
import * as constSet from "constants/index";
import { orderIdState } from "state";

import { cancelOrder, defectsCancel } from "apis/order";

const StyledItemCardGroupLink = styled.div`
  width: 120px;
  height: 40px;
  color: black;
  background-color: white;
  border: 1px solid lightgray;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  &.primary {
    color: #1c53c7;
    border: 1px solid #1c53c7;
  }
  &.danger {
    color: #ed0505;
    border: 1px solid #ed0505;
  }
  &.disable {
    color: lightgray;
    border: 1px solid lightgray;
    cursor: unset;
  }
`;

const StyledItemCardButton = styled.button`
  width: 80px;
  height: 30px;
  color: #ed0505;
  border: 1px solid #ed0505;
  border-radius: 10px;
  text-align: center;
  font-size: 14px;
`;

// 발주그룹 - 결제하기 버튼
export const OrderGroupPaymentButton = (props) => {
  const { orderGroup } = props;

  const setModalFlexibleCloseBtn = useSetRecoilState(modalFlexibleCloseBtnState);
  const modalOpen = useSetRecoilState(modalOpenState);
  const [modalContent, setModalContent] = useState(null);

  const payable = orderGroup.orders.every((order) => {
    return [constSet.OrderStatusObj.ORDER_CONFIRMED].includes(order.status);
  });

  return payable && (
    // 아래 코드는 토스 페이먼츠 가맹 이후 사용가능
    // <Link to={`/payment/ready?ogid=${orderGroup.id}`}>
    //   <StyledItemCardGroupLink
    //     className={`primary ${!payable ? "disable" : null}`}
    //   >
    //     결제하기
    //   </StyledItemCardGroupLink>
    // </Link>

    // 그 전까지는 이 코드 사용 (결제 계좌 안내 모달)
    <div
      onClick={() => {
        setModalFlexibleCloseBtn(false);
        setModalContent(<PaymentGuideModal {...props} />);
        modalOpen(true);
      }}
    >
      <StyledItemCardGroupLink
        className={`primary ${!payable ? "disable" : null}`}
      >
        결제하기
      </StyledItemCardGroupLink>
      <ModalPortal>
        <ModalFlexible>
          {modalContent}
        </ModalFlexible>
      </ModalPortal>
    </div>
  )
};

// 발주그룹 - 발주취소 버튼
export const OrderGroupCancelButton = (props) => {
  const {
    orderGroup,
    setRawOrderGroupsArr,
    setRawPaginationInfo,
    getOrderGroup,
  } = props;

  const cancelable = orderGroup.orders.every((order) => {
    return [
      constSet.OrderStatusObj.ORDERED,
      constSet.OrderStatusObj.ORDER_CONFIRMED,
      constSet.OrderStatusObj.PAID,
    ].includes(order.status);
  });

  //발주 취소 버튼 -> group id 가져와서 data에 넣기
  const cancelOrderButton = async (e) => {
    const data = orderGroup.id;
    if (e.target.innerText === "발주취소") {
      const res = await cancelOrder(data).then((resp) => {
        if (resp.resCode === "1") {
          alert("발주 취소가 완료되었습니다.");
          const resData = getOrderGroup({});
          resData.then((res)=>{
            setRawOrderGroupsArr(res.resMsg.data);
            setRawPaginationInfo(res.resMsg)
          })
        }
      });
    }
  };

  return (
    <StyledItemCardGroupLink
      className={!cancelable ? "disable" : null}
      onClick={cancelOrderButton}
    >
      발주취소
    </StyledItemCardGroupLink>
  );
};

// 발주 - 불량조작 버튼
export const ItemCardButton = (props) => {
  const { order } = props;
  const setTargetId = useSetRecoilState(orderIdState);

  const orderStatus = order.status;

  const buttonActions = {
    reportDefect: {
      buttonName: "불량신고",
      actionFunc: (e) => {
        props.defectReportButton(e);
        setTargetId(order.id);
      },
    },
    cancelDefectReport: {
      buttonName: "신고취소",
      actionFunc: (e) => {
        e.preventDefault();
        defectsCancel(order.id)
        .then((res) => {
          // 취소 성공
          if(res.status === 204) {
            alert("불량신고가 취소되었습니다.");
            window.location.reload();
          }
          // 취소 실패인 경우, resCode에 따라 분기
          else {
            res.json().then((res) => {
              if(res.resCode === 'E-C400-1008') {
                alert("해당 발주는 불량신고를 취소 할 수 없습니다.");
              } else {
                alert("불량신고 취소에 실패했습니다.");
              }
            })
          }
        });
      },
    },
  };

  let buttonActionType;

  if (
    [
      constSet.OrderStatusObj.ORDERED,
      constSet.OrderStatusObj.ORDER_CONFIRMED,
      constSet.OrderStatusObj.PAID,
    ].includes(orderStatus)
  ) {
    buttonActionType = "cancelOrder";
  } else if ([constSet.OrderStatusObj.DELIVERED].includes(orderStatus)) {
    buttonActionType = "reportDefect";
  } else if ([constSet.OrderStatusObj.DEFECT_REPORTED].includes(orderStatus)) {
    buttonActionType = "cancelDefectReport";
  }

  const buttonAction = buttonActions[buttonActionType];

  //불량신고 버튼
  return buttonAction ? (
    <StyledItemCardButton
      onClick={(e) => buttonAction.actionFunc(e)}
    >
      {buttonAction.buttonName}
    </StyledItemCardButton>
  ) : null;
};
