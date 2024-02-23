//상품그룹 검색어 리스트 가져오기
export const getSearchProductsList = async () => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/search/product-groups/names/`,
    {
      credentials: "include",
    }
  ).then((response) => response.json());
  return res;
};

//상품그룹 검색하기
export const getSearchProducts = async ({id}) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/search/product-groups/?kw=${id}`,
    {
      credentials: "include",
    }
  ).then((response) => response.json());
  return res;
};
