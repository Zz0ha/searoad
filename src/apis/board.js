// 공지사항 조회
export const getBoardOfficial = async (props) => {
  let {
    apiQueryString = {},
  } = props;

  let {
    page = 1,
    topN,
  } = apiQueryString;

  let queryString = '';
  // Param - Page
  queryString = `page=${page}`;
  // Param - TopN
  if(page !== 1 && topN) {
    alert('페이지가 1이 아닌 경우 TopN을 사용할 수 없습니다.');
    return;
  }
  if(topN) {
    queryString = `${queryString}&topN=${topN}`;
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/boards/officials/?${queryString}`,
    {
      credentials: 'include',
    }
  )
  .then((res) => res.json())
  return response;
}
