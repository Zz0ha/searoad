// 상품 검색
export const searchProductWithKeyword = async (kw) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/search/product-groups/?kw=${kw}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  ).then((res) => res.json());
  return response;
}
