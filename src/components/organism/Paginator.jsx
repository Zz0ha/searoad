import styled from 'styled-components/macro';

import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

import { useState } from 'react';

import colors from 'styles/variables/colors';

const PaginationWrap = styled.div`
  margin-top: 50px;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    font-size: 17px;
    li.pageNumber.active {
      font-weight: bold;
      color: ${colors.primaryColor};
    }
  }
`;

const goToPageOfUrl = async ({
  paginationHandler: pHandler,
  pageNumHandler,
  url,
}) => {
  const res = await fetch(
    url,
    {
      method: 'GET',
      credentials: 'include',
    }
  ).then(res => res.json());
  pageNumHandler.setCurPageNum(pageNumHandler.pageNumToMove);
  pHandler.setPaginationData(res.resMsg);
}

const goToPageOfNum = async ({
  paginationHandler: pHandler,
  fetchHandler,
  pageNumHandler,
}) => {
  let {
    fetchFunc,
    fetchApiPayload = null,
    fetchApiQueryString = {},
  } = fetchHandler;

  fetchApiQueryString.page = pageNumHandler.pageNumToMove;

  // fetchFunc
  // ex) getDefects
  const res = await fetchFunc({
    apiQueryString: fetchApiQueryString,
    apiPayload: fetchApiPayload,
  });

  pageNumHandler.setCurPageNum(pageNumHandler.pageNumToMove);
  pHandler.setPaginationData(res.resMsg);
}

export const Paginator = ({
  paginationHandler: pHandler,
  fetchHandler,
}) => {
  // paginationHandler
  // {
  //   pagination,
  //   setPagination,
  // }
  //
  // fetchHandler
  // {
  //   fetchFunc,
  //   fetchApiPayload,
  //   fetchApiQueryString,
  // }

  const [curPageNum, setCurPageNum] = useState(1);
  const pageNumHandler = {
    curPageNum,
    setCurPageNum,
    // pageNumToMove 는 동적할당 돼야 함
  };

  return (
    <PaginationWrap>
      <ul>
        <li
          className="pointer"
          onClick={() => {
            if (!!!pHandler.paginationData.previous) return;
            goToPageOfUrl({
              paginationHandler: pHandler,
              pageNumHandler: { ...pageNumHandler, pageNumToMove: curPageNum - 1},
              url: pHandler.paginationData.previous,
            });
          }}
        >
          <BiLeftArrow />
        </li>
        {
          Array(pHandler.paginationData.num_pages).fill(0).map((_, idx) => {
            return (
              <li
                key={idx}
                className={`pointer pageNumber ${curPageNum === idx + 1 ? 'active' : ''}`}
                onClick={() => {
                  // pageNumHandler.pageNumToMove = idx + 1;
                  goToPageOfNum({
                    paginationHandler: pHandler,
                    fetchHandler,
                    pageNumHandler: { ...pageNumHandler, pageNumToMove: idx + 1}
                  });
                }}
              >
                {idx + 1}
              </li>
            )
          })
        }
        <li
          className="pointer"
          onClick={() => {
            if (!!!pHandler.paginationData.next) return;
            goToPageOfUrl({
              paginationHandler: pHandler,
              pageNumHandler: { ...pageNumHandler, pageNumToMove: curPageNum + 1},
              url: pHandler.paginationData.next,
            });
          }}
        >
          <BiRightArrow />
        </li>
      </ul>
    </PaginationWrap>
  );
}
