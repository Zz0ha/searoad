// 상품조회 좀더 근원
export const getProductsGroupsOrigin = async (props = {})=>{
  let {
    apiQueryString = {},
  } = props;

  // apiQueryString
  // - pgName: product group name
  // - catCode: category code
  // - ordering: (Main 페이지에서만 사용) 정렬
  // - limitByCat: (Main 페이지에서만 사용) 카테고리별 상품 개수
  let queryString = Object.keys(apiQueryString)
    .map((key) => `${key}=${apiQueryString[key]}`)
    .join("&") ?? '';
  if (queryString) queryString = `?${queryString}`;

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/product-groups/${queryString}`,
    {
      credentials: "include",
    }
  );

  return res;
}

//상품조회 (그룹_복수)
export const getProductsGroups = async (props = {}) => {
  const res = await getProductsGroupsOrigin(props).then((response) => response.json());
  return res.resMsg;
  };


//카테고리별 상품명 가져오기
export const getProductCategories = async ()=>{
 const res = await fetch(
   `${process.env.REACT_APP_API_URL}/api/v1/categories/product-groups/`,
   {
     credentials: "include",
   }
 );
  return res;
}
