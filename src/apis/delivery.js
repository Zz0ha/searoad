import { getCSRF } from "../apis/csrf";

//배송지 조회
export const getDelivery = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/accounts/profile/favorite/delivery-address/`, {
    credentials: "include",
  }).then((response) => response.json());
  return res;
};

//배송지 즐겨찾기 등록
export const fetchAddDelivery = async (data) => {
    const token = await getCSRF();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/accounts/profile/favorite/delivery-address/`,
      {
        method: "POST",
        headers: {
          "X-CSRFToken": token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        //data : id, zonecode, address_type, address, address_detail, created_at
        body: JSON.stringify(data)
      }
    ).then((res) => res.json());
    //data에 set_default값 추가 (boolean값)
    return response;
  };
  
  //배송지 즐겨찾기 수정
  export const fetchPutDelivery = async (data) => {
    const token = await getCSRF();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/accounts/profile/favorite/delivery-address/`,
      {
        method: "PUT",
        headers: {
          "X-CSRFToken": token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        //data : "favorite_address_id": ""
        body: JSON.stringify(data)
      }
      //data에 set_default값 수정
    ).then((res) => res);
    return response;
  };




  //배송지 즐겨찾기 삭제
export const fetchDeleteDelivery = async (data) => {
    const token = await getCSRF();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/accounts/profile/favorite/delivery-address/`,
      {
        method: "DELETE",
        headers: {
          "X-CSRFToken": token,
          accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        //data : "favorite_address_id": ""
        body: JSON.stringify(data)
      }
    ).then((res) => res);
    return response;
  };