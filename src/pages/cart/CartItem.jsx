import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import CheckBox from 'components/molecule/CheckBox';

import * as utils from 'scripts/utils';
import { fetchAddCart } from 'apis/cart';
import {
  getPrettyProductGroupIdentity,
  getPrettyProductName,
} from 'scripts/helpers/product';
import usePrevious from 'hook/usePrevious';

const CartItems = styled.div`
  width: 830px;
  display: grid;
  grid-template-columns: 450px 120px 200px;
  justify-content: space-between;
  padding: 24px 0;
  border-bottom: 2px solid #eeeeee;
  margin-bottom: 10px;
  img {
    width: 80px;
  }
  .productInfo {
    display: flex;
    gap: 10px;
    justify-content: start;
    p {
      margin-bottom: 4px;
    }
    .productName {
      font-weight: bold;
    }
  }
  .cartItemPrice {
    text-align: right;
    .costPrice {
      display: flex;
      font-size: 15px;
      p {
        color: #999999;
        text-decoration: line-through;
      }
      span {
        color: #ed0505;
      }
    }
    .discountedPrice {
      font-size: 18px;
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
const CountButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #999999;
  width: 120px;
  height: 30px;
  div {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:not(:nth-child(2)) {
      cursor: pointer;
    }
    &:not(:last-child) {
      border-right: 1px solid #999999;
    }
    &:nth-child(2) {
      flex: 1;
    }
  }
`;
function CartItem(props) {
  let {
    el,
    checkedCartSet,
    setCheckedCartSet,
    setCartItemEl,
    inProductList,
    postAddCart,
  } = props;

  const [addNumber, setAddNumber] = useState(el.quantity);
  // const queryClient = useQueryClient()
  // useQuery mutation
  // const { mutate } = useMutation((data) => fetchAddCart(data), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("cart");
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // });
  // useEffect(()=>{
  //   return (()=>{
  //     mutate([{ product_id: el.product.id, quantity: addNumber }], {
  //       onError: (err, variables, context) =>
  //         console.log(err, variables, context),
  //     });
  //     console.log('aa')
  //   })
  // },[])

  const productsPrice = el.product.price_per_volume * addNumber;
  // ).toLocaleString("en-AU");

  useEffect(() => {
    setCartItemEl((prev) => {
      const found = prev.find((e) => e.id === el.product.id);
      if (found === undefined)
        return [
          ...prev,
          {
            id: el.product.id,
            quantity: addNumber,
            productsPrice: productsPrice,
          },
        ];
      else
        return prev.map((e) =>
          e.id === el.product.id
            ? {
                id: el.product.id,
                quantity: addNumber,
                productsPrice: productsPrice,
              }
            : e
        );
    });
  }, [inProductList, productsPrice]);

  const inputHandler = (e) => {
    setAddNumber(e.target.value);
    postAddCart();
  };
  useEffect(() => {
    const regex = /^[0-9]{1,5}$/g;

    if (typeof addNumber === 'string' && addNumber === '0') {
      alert('1부터 입력가능합니다.');
      setAddNumber('');
    } else if (typeof addNumber === 'string' && addNumber === '') {
      setAddNumber('');
    } else if (typeof addNumber === 'string') {
      setAddNumber(Number(addNumber));
    } else if (!regex.test(addNumber)) {
      alert('최대 5자리까지만 입력 가능합니다.');
      Number(setAddNumber(String(addNumber).slice(0, 5)));
      // mutate([{ product_id: el.product.id, quantity: addNumber }], {
      //   onError: (err, variables, context) =>
      //     console.log(err, variables, context),
      // });
    }
  }, [addNumber]);

  const decreaseButton = () => {
    if (addNumber > 1) {
      setAddNumber((prevNumber) => Number(prevNumber - 1));
      // mutate([{ product_id: el.product.id, quantity: el.quantity - 1 }]);
    } else {
      alert('1부터 입력 가능합니다.');
    }
  };
  const increaseButton = () => {
    // mutate([{ product_id: el.product.id, quantity: el.quantity + 1 }]);
    setAddNumber((prevNumber) => Number(prevNumber + 1));
  };

  // const handleFocusOut =  (e) => {
  //   if(e.target.value <= 0){
  //     alert("0보다 큰 수를 입력해주세요.")
  //     setAddNumber(prevCount)
  //   } else {
  //      mutate([{ product_id: el.product.id, quantity: addNumber }]);
  //   }
  // };

  // useEffect(() => {}, [mutate]);

  let imageMeta = {};
  try {
    imageMeta = JSON.parse(el.product.image_meta);
  } catch (e) {
    console.log(e);
  }
  const thumbnailUrl =
    imageMeta?.thumbnail_url ?? utils.getImageURL('ui/v1.0/prepareImageSimple');

  return (
    <CartItems>
      <div className="productInfo">
        <div>
          <CheckBox
            checkBoxId={el.product.id}
            checkBoxIdSet={checkedCartSet}
            setCheckBoxIdSet={setCheckedCartSet}
          />
        </div>
        <img src={thumbnailUrl} alt="thumbnailUrl" />
        <div>
          <p>{getPrettyProductName(el.product, true)}</p>
          <p className="productName">{el.product.name}</p>
        </div>
      </div>
      <CountButton onMouseLeave={postAddCart}>
        <div onClick={decreaseButton}>
          <AiOutlineMinus />
        </div>
        <div className="input">
          <input
            type="number"
            value={addNumber}
            onChange={(e) => inputHandler(e)}
          />
        </div>
        <div onClick={increaseButton}>
          <AiOutlinePlus />
        </div>
      </CountButton>
      <div className="cartItemPrice">
        <div className="costPrice"></div>
        {/* <p className="discountedPrice">{!!addNumber?`${productsPrice}원`:'0원'}</p> */}
        <p className="discountedPrice">{`${productsPrice.toLocaleString(
          'en-AU'
        )}원`}</p>
      </div>
    </CartItems>
  );
}

export default CartItem;
