import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import ModalPortal from "ModalPortal";
import { CartModal } from "./Modal";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import * as utils from "scripts/utils";
import * as constSet from "constants/index";
import { useLockScroll } from "hook/useLockScroll";
import { reverseFindConstantText } from 'scripts/helpers/common';
import { fetchAddCart } from "apis/cart";
import { getPrettyProductGroupIdentity, getPrettyProductName } from 'scripts/helpers/product';
import colors from 'styles/variables/colors';

//styledComponents
const ProductGroupWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const ProductsCategoryTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0 10px 0;
  .productCategoryMenu {
    font-size: 40px;
    margin-bottom: 60px;
    img {
      width: 50px;
    }
  }
  .productsSubTitle {
    display: flex;
    align-items: center;
    gap: 40px;
    min-height: 120px;
    img {
      width: 120px;
    }
    p {
      font-size: 25px;
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
    justify-content: space-between;

    p {
      margin-left: 10px;
      font-size: 22px;
      &::selection {
        background-color: transparent;
      }
    }
  }
  .modalButtonWrap {
    display: flex;
    justify-content: space-around;
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
/* Count Button */
const CountButton = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #999999;
  flex-basis: 150px;
  height: 30px;
  div.arrow {
    min-width: 30px;  // flex-basis와 width가 작동하지 않아서 min-width로 대체
    height: 100%;
    display: flex;
    flex-basis: 30px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:nth-child(1) {
      border-right: 1px solid #999999;
    }
    &:nth-child(3) {
      border-left: 1px solid #999999;
    }
  }
  div.input {
    flex-basis: 90px;
    display: flex;
    height: 100%;
    & input {
      display: flex;
      width: 100%;
      text-align: center;
      border: none;
      outline: none;
      appearance: none;
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;
/* ProductListContents */
const ProductListContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      padding: 5px;
      &.product-row.header {
        padding-bottom: 3px;
        margin-bottom: 2px;
        font-weight: bold;
        border-bottom: 1px solid ${colors.borderColor};
        div {
          &.price-per-volume {
            padding-right: 40px;
          }
        }
      }
      &.product-row.body {
        &:hover {
          background-color: #eeeeee;
        }
      }
      div {
        &.entity-size {
          min-width: 200px;
        }
        &.price-and-cart {
          display: flex;
          gap: 20px;
        }
        &.price-per-volume {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          min-width: 250px;
          span.market-price {
            color: ${colors.secondaryColor};
            font-weight: bold;
          }
        }
        .cartBtn {
          width: 30px;
          cursor: pointer;
        }
      }
    }
  }
`;

function AllProductsList({ productGroup, refetch }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /* Modal */
  const [modalOn, setModalOn] = useState(false);
  const { lockScroll, openScroll } = useLockScroll();
  const modalOpen = () => {
    setModalOn(!modalOn);
  };
  /* modal에 전달할 해당 index값 */
  const [, setElementIdx] = useState("");
  const [thisProduct, setThisProduct] = useState();

  const { data:nickname } = useQuery("nickname");
  const nick = nickname?.resMsg.profile.nickname;
  /* 장바구니 */
  const { refetch: refetchCart } = useQuery(["cart",nick],{
    enabled: !!nick
  });

  /* Count */
  const [addNumber, setAddNumber] = useState(1);
  const decreaseButton = () => {
    if (addNumber > 1) {
      setAddNumber(addNumber - 1);
    }
  };
  const increaseButton = () => {
    setAddNumber(addNumber + 1);
  };

  /* modal 상태가 닫힐때마다 setAddNumber를 1로 초기화 */
  useEffect(() => {
    setAddNumber(1);
  }, [modalOn]);

  /* 장바구니 담기 */
  const onClickAddCart = async () => {
    if(!!nick){
      refetchCart()  // useQuery refetch 이렇게 쓰는거 맞음???
    .then((res) => {
      let willBeAddedQuantity = addNumber;
      const cartItems = res.data.resMsg;
      const cartItem = cartItems?.find((item) => item.product.id === thisProduct.id);
      if (cartItem) {
        willBeAddedQuantity += cartItem.quantity;
      }

      const fetchData = [
        {
          product_id: thisProduct.id,
          quantity: willBeAddedQuantity,
        },
      ];
      fetchAddCart(fetchData)
      .then((res) => {
        if(res.resCode ==="1"){
          alert("장바구니에 추가되었습니다.")
          openScroll();
          setModalOn(false);
          refetch();
        }
        else if (res.resCode === "E-C401-1001") {
          openScroll();
          alert("로그인이 필요합니다.");
          navigate("/auth", { state: pathname, replace: true });
        } else if (res.resCode === "E-C404-1000") {
          alert("해당 상품이 존재하지 않습니다.");
        } else {
          alert("확인이 필요합니다.")
        }
      });
    })
    }
    else {
      navigate('/auth', {state:pathname, replace: true})
    }
  };
  if (productGroup.products.length === 0) {
    return false;
  }
  const thumbnailUrl = JSON.parse(productGroup.image_meta).thumbnail_url;
  return (
    <ProductGroupWrapper
      key={productGroup.id}
      className="productGroup-wrapper"
    >
      <ProductsCategoryTitle>
        {/* data 받고 조건문 걸기 */}
        <div className="productsSubTitle">
          <img src={thumbnailUrl} alt="fishImg" />
          <p>
            {productGroup.name}<br/>
            {getPrettyProductGroupIdentity(productGroup)}
          </p>
        </div>
      </ProductsCategoryTitle>
      <ProductListContents>
        <ul>
          <li className="product-row header flex">
            <div className="entity-size">사이즈</div>
            <div className="price-and-cart">
              <div className="price-per-volume">
                <span>단가</span>
              </div>
              <div className="cartBtn"></div>
            </div>
          </li>
          {productGroup.products.map((product, idx) => {
            return (
              <li
                className="product-row body flex"
                id={product.id} key={product.id}
              >
                <div className="entity-size">{`${product.entity_size_str}`}</div>
                <div className="price-and-cart">
                  <div className="price-per-volume">
                  {
                    product.price_per_volume > 0 ? (
                      <>
                      <span>1{reverseFindConstantText(constSet.VolumeCodeArr, productGroup.volume_code)} 당&nbsp;</span>
                      <span>{`${utils.formatAccountNumber(product.price_per_volume)}원`}</span>
                      </>
                    ) : (
                      <span className="market-price">시가</span>
                    )
                  }
                  </div>
                  <img
                    className="cartBtn"
                    src={utils.getIconURL("cartIcon")}
                    alt=""
                    onClick={(e) => {
                      modalOpen(modalOpen);
                      lockScroll();
                      setElementIdx(idx);
                      setThisProduct(product);
                    }}
                  />
                </div>
              </li>
            );
          })}
          <ModalPortal>
            {modalOn && (
              <CartModal modalOpen={modalOn}>
                <AddCartModal>
                  <p>{`${getPrettyProductName({
                    ...thisProduct,
                    name: productGroup.name,
                    origin_country: productGroup.origin_country,
                    production_type: productGroup.production_type,
                    preservation_type: productGroup.preservation_type,
                  })}`}</p>
                  <div className="addCartProductPrice">
                    <CountButton>
                      <div
                        className="arrow"
                        onClick={() => {
                          decreaseButton();
                        }}
                      >
                        <AiOutlineMinus />
                      </div>
                      {/* <div>{addNumber}</div> */}
                      <div className="input">
                        <input
                          type="number" value={addNumber}
                          onChange={(e) => setAddNumber(e.target.value)}
                        />
                      </div>
                      <div
                        className="arrow"
                        onClick={() => {
                          increaseButton();
                        }}
                      >
                        <AiOutlinePlus />
                      </div>
                    </CountButton>
                    <p>
                      {`${(
                        thisProduct.price_per_volume * addNumber
                      ).toLocaleString("ko-KR")}원`}
                    </p>
                  </div>
                  <div className="modalButtonWrap">
                    <button
                      type="button"
                      onClick={() => {
                        modalOpen();
                        openScroll();
                      }}
                    >
                      돌아가기
                    </button>
                    <button type="button" onClick={onClickAddCart}>
                      장바구니 담기
                    </button>
                  </div>
                </AddCartModal>
              </CartModal>
            )}
          </ModalPortal>
        </ul>
      </ProductListContents>
    </ProductGroupWrapper>
  );
}

export default AllProductsList;
