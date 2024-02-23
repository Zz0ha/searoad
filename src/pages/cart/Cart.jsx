import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import CheckBoxAll from 'components/molecule/CheckBoxAll';
import Loading from 'components/Loading';
import ErrorPage from 'components/ErrorPage';
import CartItem from '../cart/CartItem';
import OrderSummary from '../cart/OrderSummary';

import { fetchAddCart, fetchDeleteCart } from 'apis/cart';
import ModalPortal from 'ModalPortal';
import { Modal } from 'components/Modal';
import { defaultModalOpenState } from 'state';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

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

function Cart() {
  //ModalState
  const defaultModalOpen = useSetRecoilState(defaultModalOpenState);

  const { data: nickname } = useQuery('nickname');
  const nick = nickname?.resMsg.profile.nickname;

  // Cart
  const { data, isLoading, isError, refetch } = useQuery(['cart', nick]);
  const inProductList = data.resMsg;

  //fetchDeleteCart
  const [checkedCartSet, setCheckedCartSet] = useState(new Set());

  //cartItem element
  const [cartItemEl, setCartItemEl] = useState([]);

  const prevCartItemElRef = useRef(JSON.stringify(cartItemEl));

  const totalPrice = cartItemEl.reduce((acc, cur) => {
    return acc + cur.productsPrice;
  }, 0);

  //onClick 장바구니 삭제
  const cartDelete = async () => {
    const data = {
      product_ids: Array.from(checkedCartSet),
    };
    const submit = await fetchDeleteCart(data);
    if (submit.status === 204) {
      defaultModalOpen(true);
      refetch();
    }
  };

  let filterCartItemData = cartItemEl.map((filterItem) => {
    return { product_id: filterItem.id, quantity: filterItem.quantity };
  });

  const postAddCart = async () => {
    const res = await fetchAddCart(filterCartItemData);
    refetch();
    return res;
  };

  // useEffect(() => {
  //   if(prevCartItemElRef.current !== JSON.stringify(cartItemEl)) {
  //     console.log(prevCartItemElRef.current, JSON.stringify(cartItemEl))
  //     return postAddCart
  //   }
  // }, [cartItemEl, prevCartItemElRef]);

  // useEffect(()=>{
  //   prevCartItemElRef.current = JSON.stringify(cartItemEl)
  // },[cartItemEl])

  const onClickOrderButton = async () => {
    await postAddCart();
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className="cartPage">
      <div className="container">
        <div className="cartContainer">
          <h2>장바구니</h2>
          <div className="shoppingCartCheckWrap">
            <ul>
              <li>
                <CheckBoxAll
                  checkBoxId={'cartAllCheck'}
                  checkBoxIdCandidates={inProductList?.map(
                    (product) => product.product.id
                  )}
                  checkBoxIdSet={checkedCartSet}
                  setCheckBoxIdSet={setCheckedCartSet}
                  labelComponent={
                    <label htmlFor="cartAllCheck">전체선택</label>
                  }
                />
              </li>
              <li onClick={cartDelete} className="pointer">
                선택삭제
              </li>
            </ul>
            <div className="shoppingCartContents">
              <div>
                {inProductList?.length !== 0 ? (
                  inProductList?.map((el, idx) => {
                    return (
                      <CartItem
                        key={el.product.id}
                        el={el}
                        idx={idx}
                        checkedCartSet={checkedCartSet}
                        setCheckedCartSet={setCheckedCartSet}
                        setCartItemEl={setCartItemEl}
                        inProductList={inProductList}
                        postAddCart={postAddCart}
                      />
                    );
                  })
                ) : (
                  <p>장바구니가 비어있습니다.</p>
                )}
              </div>
              <OrderSummary
                nick={nick}
                totalPrice={totalPrice}
                onClickOrderButton={onClickOrderButton}
              ></OrderSummary>
            </div>
          </div>
        </div>
      </div>
      <ModalPortal>
        <Modal>
          <p>삭제 완료되었습니다.</p>
          <CloseButton
            onClick={() => {
              defaultModalOpen(false);
            }}
          >
            <p>확인</p>
          </CloseButton>
        </Modal>
      </ModalPortal>
    </div>
  );
}
export default Cart;
