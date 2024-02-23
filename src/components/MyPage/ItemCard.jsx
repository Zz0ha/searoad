import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import ModalPortal from "ModalPortal";
import { Modal } from "components/Modal";
import {
  OrderGroupCancelButton,
  OrderGroupPaymentButton,
  ItemCardButton,
} from "./ItemCardButton";

import { defaultModalOpenState, orderIdState } from "state";
import * as constSet from "constants/index";
import { getImageURL, formatAccountNumber } from "scripts/utils";
import { formatDatetimeFromString } from "scripts/utils";
import { defects, getDefects } from "apis/order";
import { useLockScroll } from "hook/useLockScroll";
import { usePaginator } from 'hook/usePaginator';
import { getPrettyProductName } from "scripts/helpers/product";
import { reverseFindConstantText } from "scripts/helpers/common";

import colors from 'styles/variables/colors';

const StyledOrderGroupItemCard = styled.div`
  .ItemCardTop {
    background-color: #eeeeee;
    div.ItemGroupInfo {
      font-size: 18px;
    }
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    align-items: center;
    .OrderGroupButtonWrapper {
      display: flex;
      gap: 20px;
    }
    .orderDetail {
      font-size: 13px;
    }
    &.cancelOrderItem {
      min-height: 50px;
      justify-content: flex-start;
      gap: 20px;
      & p:last-child {
        color: #ed0505;
      }
    }
  }

  .ItemCardBottom {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid #eeeeee;
    .ItemInfo {
      display: flex;
      gap: 20px;
      img, .img-like {
        width: 120px;
        height: 120px;
        // Hint:
        // 부모 요소에 display: flex가 적용되어 있는데
        // 이때 특정 자식 요소에만 고정 width or height를 적용하려면
        // min & max width or height 값을 줌으로써 고정시킬 수 있는 것 같다
        min-width: 120px;
        max-width: 120px;
        min-height: 120px;
        max-height: 120px;
      }
      .img-like {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      table {
        td {
          padding: 2px;
          font-size: 15px;
          &.AttrTitle {
            min-width: 120px;
            max-width: 120px;
            font-size: 13px;
          }
          .is-defective-comment {
            margin-bottom: 3px;
            .defective-comment {
              font-size: 13px;
              font-weight: bold;
              &.green {
                color: ${colors.greenColor};
              }
              &.danger {
                color: ${colors.dangerColor};
              }
            }
          }
        }
      }
      ul {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 20px;
        li {
          display: flex;
          align-items: center;
          gap: 30px;
          p {
            font-size: 13px;
          }
          span {
            font-size: 15px;
          }
        }
        &.likeItemsInfo {
          justify-content: start;
          gap: 10px;
        }
        &.reviewItemInfo {
          justify-content: center;
        }
      }
    }
    .ItemCtrl {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      width: 150px;
      min-width: 150px;
      max-width: 150px;
      &.deliveryInfo {
        .AttrTitle {
          font-size: 13px;
        }
        .deliveryFee {
          font-weight: bold;
        }
      }
    }
    .ItemShipingState {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 15px;
      width: 150px;
      button {
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        &.deleteButton {
          color: #666666;
          border: 1px solid #666666;
        }
      }
    }
    &.likeItems {
      margin-left: 35px;
      border-bottom: 1px solid #999999;
    }
  }
  .likeItemsWrap {
    position: relative;
    .itemSelectCheckbox {
      position: absolute;
      top: 28px;
      left: 0;
    }
    .ItemShipingState {
      justify-content: start;
      gap: 10px;
    }
  }
  .ReviewItem {
    .ItemShipingState {
      justify-content: center;
      gap: 15px;
    }
    .reviewItemTitle {
      p {
        font-size: 15px !important;
        margin-bottom: 10px;
      }
    }
    .reviewItemShiping {
      p {
        font-size: 12px !important;
        color: #666666;
        span {
          font-size: 12px !important;
        }
      }
    }
  }
  .totalAmount {
    padding: 0 10px;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 10px;
    span {
      &.comment {
        font-size: 12px;
      }
      &.price {
        color: ${colors.primaryColor};
        font-weight: bold;
        font-size: 18px;
        &.canceled {
          text-decoration: line-through;
          color: gray;
        }
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

export function OrderItemCard(props) {
  const defaultModalOpen = useSetRecoilState(defaultModalOpenState);
  const location = useLocation();
  const targetId = useRecoilValue(orderIdState)
  const [defectiveCont, setDefectiveCont] = useState()
  const { orderGroup, setRawOrderGroupsArr, setRawPaginationInfo, getOrderGroup } = props;
  const { openScroll } = useLockScroll();

  const defectReportButton = (e) => {
    const target = e.target.innerText;
    if (target === "불량신고") {
      defaultModalOpen(true);
    }
    if(target === "신고취소"){
      console.log(targetId)  // 다른곳에서 구현함
    }
  }

  // 배송비 없는 가격 알고 싶을때 사용
  // const orderGroupPriceExcludeDeliveryFee = (orderGroup.orders.length > 1) ?
  //   orderGroup.orders.reduce((acc, cur)=> acc+ cur.total_price, 0) :
  //   orderGroup.orders[0].total_price;

  const defectsHandler = async () => {
    const data = {
      order_id: targetId,
      report_detail: defectiveCont,
    };
    const res = await defects(data);
    if(res.resCode==="1"){
      alert("불량 접수가 완료되었습니다.")
      window.location.reload();
    } else if(res.resCode==="E-C400-1004"){
      alert("이미 접수되서 내용을 수정할 수 없습니다.");
    } else if (res.resCode === "E-C400-1008") {
      alert("불량 접수를 할 수 없는 상태입니다.");
    } else if (res.resCode === "E-C403-1000") {
      alert("권한이 없습니다. 로그인을 해주세요.");
    } else if (res.resCode === "E-C404-1000") {
      alert("주문하려는 상품을 찾을 수 없습니다.");
    }
  };

  const isOrderCanceled = orderGroup.orders.every((order) => order.status === constSet.OrderStatusObj.ORDER_CANCELED);

  return (
    <StyledOrderGroupItemCard>
      <div className="ItemCardTop">
        <div className="ItemGroupInfo">
          <span>{formatDatetimeFromString(orderGroup.date_created)}</span>
        </div>
        <div className="OrderGroupButtonWrapper">
          <OrderGroupPaymentButton orderGroup={orderGroup} />
          <OrderGroupCancelButton orderGroup={orderGroup} setRawOrderGroupsArr={setRawOrderGroupsArr} setRawPaginationInfo={setRawPaginationInfo} getOrderGroup={getOrderGroup} />
        </div>
      </div>
      <div className="totalAmount">
      {
        orderGroup.delivery_group ? (
          <p>총 결제 금액 :&nbsp;
            <span className={`price ${isOrderCanceled ? 'canceled': ''}`}>
              {`${formatAccountNumber(orderGroup.total_price_to_pay)} 원`}
            </span>
          </p>
        ) : (
          <p>
            <span className="comment">
              (발주확정 대기중)
            </span>
            &nbsp;&nbsp;발주 금액 :&nbsp;
            <span className="price">{`${formatAccountNumber(orderGroup.total_price_to_pay)} 원`}</span>
          </p>
        )
      }
      </div>
      {orderGroup.orders.map((order) => {
        const imageMeta = JSON.parse(order.product.image_meta);
        const thumbnailUrl =
          imageMeta?.thumbnail_url ?? getImageURL("ui/v1.0/prepareImage");
        return (
          <div key={order.id} className="ItemCardBottom">
            <div className="ItemInfo">
              <img src={thumbnailUrl} alt="" />
              <table>
                <tbody>
                  <tr>
                    <td className="AttrTitle">상품정보</td>
                    <td>{getPrettyProductName(order.product)}</td>
                  </tr>
                  <tr>
                    <td className="AttrTitle">수량</td>
                    <td>
                      {`${order.quantity} ${reverseFindConstantText(
                        constSet.VolumeCodeArr,
                        order.product.volume_code
                      )}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="AttrTitle">결제금액</td>
                    <td>{formatAccountNumber(order.total_price)} 원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ItemCtrl">
              <p>
                {reverseFindConstantText(constSet.OrderStatusArr, order.status)}
              </p>
              <ItemCardButton
                order={order}
                defectReportButton={defectReportButton}
              />
            </div>
          </div>
        );
      })}
      {
        orderGroup.delivery_request && (
          <div className="ItemCardBottom">
            <div className="ItemInfo DeliveryInfo">
              <div className="img-like">
                배송정보
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="AttrTitle">배송지</td>
                    <td>
                      {`(${orderGroup.delivery_request.zonecode}) ${orderGroup.delivery_request.address} ${orderGroup.delivery_request.address_detail}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="AttrTitle">배송 요청사항</td>
                    <td>{orderGroup.delivery_request.request_detail}</td>
                  </tr>
                  <tr>
                    <td className="AttrTitle">수령인 정보</td>
                    <td>
                      {`수령인: ${orderGroup.delivery_request.receiver_name}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {`연락처: ${orderGroup.delivery_request.receiver_contact}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ItemCtrl deliveryInfo">
              <div className="AttrTitle">배송비</div>
              <div className="deliveryFee">
              {
                orderGroup.delivery_group ?
                  `${formatAccountNumber(orderGroup.delivery_group.fee_by_group)} 원` :
                  `미정`
              }
              </div>
            </div>
          </div>
        )
      }
      <ModalPortal>
        <Modal location={location}>
          <div className="textareaWrap">
            <h3>불량신고 접수</h3>
            <textarea
              placeholder="불량 내용을 입력해주세요."
              onChange={(e) => {
                setDefectiveCont(e.target.value);
              }}
            ></textarea>
          </div>
          <CloseButton
            onClick={() => {
              openScroll();
              defaultModalOpen(false);
              defectsHandler();
            }}
          >
            <p>확인</p>
          </CloseButton>
        </Modal>
      </ModalPortal>
    </StyledOrderGroupItemCard>
  );
}

const IsDefectiveComment = (defect) => {
  switch(defect.is_defective) {
    case true:
      return <span className="defective-comment danger">불량</span>;
    case false:
      return <span className="defective-comment green">불량 아님</span>;
    default:
      return <span className="defective-comment">검토중</span>;
  }
}

export function DefectOrderItemList() {
  const [rawDefectsInfo, setRawDefectsInfo] = useState({});
  const [defectReportedItemPages, setDefectReportedItemPages] = useState({});

  const {
    Paginator,
  } = usePaginator({
    paginationData: defectReportedItemPages,
    setPaginationData: setDefectReportedItemPages,
    fetchFunc: getDefects,
  });

  useEffect(() => {
    getDefects()
    .then((res) => {
      // rawDefectsInfo = {
      //   count,
      //   data,
      //   num_pages
      //   previous, next,
      // }
      setRawDefectsInfo(res.resMsg);
    });
  }, []);

  useEffect(() => {
    setDefectReportedItemPages(rawDefectsInfo ?? {});
  }, [rawDefectsInfo]);

  return defectReportedItemPages.data?.length > 0 ? (
    <>
    {
      defectReportedItemPages.data.map((defect) => {
        const order = defect.order;
        const thumbnailUrl =
          JSON.parse(order.product.image_meta).thumbnail_url ?? getImageURL("ui/v1.0/prepareImage");

        return (
          <StyledOrderGroupItemCard key={defect.order.id}>
            <div className="ItemCardTop cancelOrderItem">
              <p>
                발주
                <span>{` ${formatDatetimeFromString(
                  order.order_date.ordered
                )}`}</span>
              </p>
              <p>
                불량신고&nbsp;
                <span>{formatDatetimeFromString(order.order_date.defect_reported)}</span>
              </p>
            </div>

            <div className="ItemCardBottom">
              <div className="ItemInfo">
                <img src={thumbnailUrl} alt="" />
                <table>
                  <tbody>
                    <tr>
                      <td className="AttrTitle">상품정보</td>
                      <td>{getPrettyProductName(order.product)}</td>
                    </tr>
                    <tr>
                      <td className="AttrTitle">수량</td>
                      <td>
                        {`${order.quantity} ${reverseFindConstantText(
                          constSet.VolumeCodeArr,
                          order.product.volume_code
                        )}`}
                      </td>
                    </tr>
                    <tr>
                      <td className="AttrTitle">결제금액</td>
                      <td>{formatAccountNumber(order.total_price)} 원</td>
                    </tr>
                    <tr>
                      <td className="AttrTitle">신고 내용</td>
                      <td>{defect.report_detail}</td>
                    </tr>
                    <tr>
                      <td className="AttrTitle">검토 결과</td>
                      <td>
                        <p className="is-defective-comment">
                          불량 여부: {<IsDefectiveComment />}
                        </p>
                        <p>{defect.confirm_detail ?? `검토중입니다.`}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="ItemCtrl">
                <p>
                  {reverseFindConstantText(constSet.OrderStatusArr, order.status)}
                </p>
                <ItemCardButton order={order} />
              </div>
            </div>
          </StyledOrderGroupItemCard>
        );
      })
    }
    <Paginator />
    </>
  ) : (
    <p>불량 접수된 상품이 없습니다.</p>
  );
}
