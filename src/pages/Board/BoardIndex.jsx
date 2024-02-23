import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

import ModalPortal from "ModalPortal";
import { AiOutlineClose } from "react-icons/ai";

import * as constSet from "constants/index";
import { modalFlexibleCloseBtnState, modalOpenState } from "state";
import { formatDatetimeFromString } from 'scripts/utils';
import { getBoardOfficial } from 'apis/board';
import { ModalFlexible } from 'components/ModalFlexible';

const BoardTable = styled.table`
  width: 100%;
  thead {
    border-bottom: 1px solid #eeeeee;
  }
  th {
    padding: 10px;
  }
  tbody tr {
    &:hover {
      background-color: #f5f5f5;
    }
    cursor: pointer;
  }
  td {
    padding: 10px;
    text-align: center;
  }
  .text_line {


  }
`;

const BoardModalWrap = styled.div`
  .closeIcon {
    float: right;
  }
  .article-table{
    .article__date {
      text-align: right;
      td {
        padding: 40px 0 20px 0;
      }
    }
    .article__content {
      text-align: left;
      td {
        padding: 20px;
        min-height: 400px;
      }
    }
  }
`;

const BoardModal = (props) => {
  const {
    article,
    modalHandler,
  } = props;

  const {
    title,
    content,
    date_published,
  } = article;

  const {
    modalOpen,
  } = modalHandler;

  return (
    <BoardModalWrap>
      <div className="modal__header">
        <AiOutlineClose
          className="pointer closeIcon"
          onClick={() => {
            modalOpen(false);
          }}
        />
      </div>
      <div className="modal__body">
        <table className="article-table">
          <tbody>
            <tr className="article__title">
              <td>
                <h2>{title}</h2>
              </td>
            </tr>
            <tr className="article__date">
              <td>등록일: {formatDatetimeFromString(date_published)}</td>
            </tr>
            <tr className="article__content">
              <td>
                <div dangerouslySetInnerHTML={{__html: content}} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BoardModalWrap>
  );
}

function NoticeIndex() {
  const [boardArr, setBoardArr] = useState([]);

  // 모달 State
  const setModalFlexibleCloseBtn = useSetRecoilState(modalFlexibleCloseBtnState);
  const modalOpen = useSetRecoilState(modalOpenState);
  const [modalContent, setModalContent] = useState(null);

  const modalHandler = {
    modalOpen: modalOpen,
    setModalFlexibleCloseBtn: setModalFlexibleCloseBtn,
  };

  useEffect(() => {
    const resp = getBoardOfficial({
      apiQueryString: {
        page: 1,
      },
    });
    resp.then((resp) => {
      setBoardArr(resp?.resMsg?.data);
    });
  }, []);

  return (
    <div className="noticePage">
      <div className="container">
        <div className="noticeBoardWrap">
          <h1>공지사항</h1>
          <BoardTable>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "70%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>날짜</th>
                <th>카테고리</th>
                <th>제목</th>
              </tr>
            </thead>
            <tbody>
              {
                boardArr.map((article, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        setModalContent(
                          <BoardModal
                            article={article}
                            modalHandler={modalHandler}
                          />
                        )
                        modalOpen(true);
                      }}
                    >
                      <td>{formatDatetimeFromString(article.date_published)}</td>
                      <td>{constSet.BoardOfficialCategoryObj[article.category].text}</td>
                      <td className="text_line">{article.title}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </BoardTable>
        </div>
      </div>
      <ModalPortal>
        <ModalFlexible>
          {modalContent}
        </ModalFlexible>
      </ModalPortal>
    </div>
  );
}

export default NoticeIndex;
