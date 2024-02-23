import { getCSRF } from "../apis/csrf";

//주문 1/3단계
export const fetchOrders = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/orders/`,
    {
      method: "POST",
      headers: {
        "X-CSRFToken": token,
        "Content-Type": "application/json",

      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => {return res.json()});
  return response;
};


//주문 조회
export const getOrder = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/orders/`, {
    credentials: "include",
  }).then((response) => response.json());
  return response;
};


// 주문 그룹 조회
export const getOrderGroup = async (props = {}) => {
  let {
    apiQueryString = {},
  } = props;

  let {
    ogid = '',
    pgid = '',
    pagenum = '',
  } = apiQueryString;

  let queryString = '';

  if(ogid) {
    queryString = `ogid=${ogid}`;
  }
  if(pgid) {
    if(queryString) {
      queryString = `${queryString}&pgid=${pgid}`;
    } else {
      queryString = `pgid=${pgid}`;
    }
  }
  if(pagenum){
    queryString = `page=${pagenum}`
  }
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/order-groups/?${queryString}`,
    {
      credentials: "include",
    }
  ).then((response) => response.json());
  return response;
}

// 주문 상태확인
export const getOrderGroupStatus = async ({stat}) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/order-groups/?status=${stat}`,
    {
      credentials: "include",
    }
  ).then((response) => response.json());
  return response;
}

//발주 취소
export const cancelOrder = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/order-groups/${data}/cancel/`,
    {
      method: "POST",
      headers: {
        "X-CSRFToken": token,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => {
    return res.json();
  });
  return response;
};

//불량 신고
export const defects = async (data) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/defects/`,
    {
      method: "POST",
      headers: {
        "X-CSRFToken": token,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  ).then((res) => {
    return res.json();
  });
  return response;
};

//불량 취소
export const defectsCancel = async (oid) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/defects/reported/cancel/?oid=${oid}`,
    {
      method: "POST",
      headers: {
        "X-CSRFToken": token,
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  return response;
};

// 불량 조회
export const getDefects = async (props = {}) => {
  let {
    apiQueryString = {},
  } = props;

  let queryString = Object.keys(apiQueryString).map((key) => {
    return `${key}=${apiQueryString[key]}`;
  }).join('&');
  if (queryString) queryString = `?${queryString}`;

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/defects/${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    }
  )
  .then((response) => response.json())
  .catch((error) => console.error(error));
  return response;
}
