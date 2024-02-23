import { getCSRF } from '../apis/csrf';

//장바구니 조회
export const getCart = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cart/`, {
    credentials: 'include',
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
  return res;
};

//장바구니 상품 등록
export const fetchAddCart = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/cart/`,
    {
      method: 'POST',
      headers: {
        'X-CSRFToken': token,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      //data : product_id: 상품id, amount: 주문량
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return response;
};

//장바구니 상품 삭제
export const fetchDeleteCart = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/cart/`,
    {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': token,
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      //data : product_id : ["LFLkyqz"] Array
      body: JSON.stringify(data),
    }
  ).then((res) => res);
  return response;
};
