import React, { useEffect, useState } from "react";
import { OrderItemCard } from "./ItemCard";
import { getOrderGroup } from "apis/order";
import styled from "styled-components";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Loading from "components/Loading";

const PagenationWrap = styled.div`
  margin-top: 50px;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    font-size: 17px;
  }
`;

function OrderItems() {
  // 정제전 주문 Array
  const [rawOrderGroupsArr, setRawOrderGroupsArr] = useState([]);
  const [orderGroupsArr, setOrderGroupsArr] = useState([]);
  const [rawPaginationInfo, setRawPaginationInfo] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState([]);

  // 정제된 주문 Array
  useEffect(() => {
    const resp = getOrderGroup({});
    resp.then((res) => {
      setRawOrderGroupsArr(res.resMsg.data);
      setRawPaginationInfo(res.resMsg);
    });
  }, []);

  //함수화
  // const updateOrderGroupData = ()=>{
  //   const resp = getOrderGroup({});
  //   resp.then((res) => {
  //     setRawOrderGroupsArr(res.resMsg.data);
  //     setRawPaginationInfo(res.resMsg)
  //   });
  // }

  useEffect(() => {
    setOrderGroupsArr(rawOrderGroupsArr);
    // Hint: rawOrderGroupsArr과 orderGroupsArr를 분리하는 이유
    // orderGroupsArr은 처음으로 정의된 이후로,
    // 렌더링 중에 일련의 정제를 통해 재정의되기도 하고, 유저 Interaction에 의해 재정의되기도 하기 때문에
    // orderGroupsArr을 dependency로 갖는 useEffect에서 setOrderGroups를 호출하게 만들면 무한루프에 빠지게된다.
    // 그럼에도 우린 여전히 orderGroupsArr이 렌더링되길 바라기 때문에
    // 초기 렌더링 시(rawOrderGroupsArr가 만들어지는 시점), fetch option 변경 시, 또는 기타 조건이 만족되는 시점에
    // setOrderGroupsArr만 하여 직접 orderGroupsArr을 재정의한다
    setPaginationInfo(rawPaginationInfo);
  }, [rawOrderGroupsArr, rawPaginationInfo]);
  const pageArr = Array(paginationInfo?.num_pages)
    .fill()
    .map((el, idx) => idx + 1);

  const paginationNextButton = async () => {
    const response = await fetch(`${paginationInfo.next}`, {
      credentials: "include",
    }).then((response) => response.json());
    setOrderGroupsArr(response.resMsg.data);
    setPaginationInfo(response.resMsg);
    window.scrollTo(0, 0);
    return response;
  };
  const paginationPrevButton = async () => {
    const response = await fetch(`${paginationInfo.previous}`, {
      credentials: "include",
    }).then((response) => response.json());
    setOrderGroupsArr(response.resMsg.data);
    setPaginationInfo(response.resMsg);
    window.scrollTo(0, 0);
    return response;
  };
  const pageNumHandler = async (e) => {
    const response = await getOrderGroup({
      apiQueryString: {
        pagenum: e.target.innerText,
      },
    });
    setOrderGroupsArr(response.resMsg.data);
    setPaginationInfo(response.resMsg);
    window.scrollTo(0, 0);
    return response;
  };

  return (
    <div>
      {orderGroupsArr.map((orderGroup, idx) => {
        return (
          <div key={orderGroup.id} className="orderItemCardWrap">
            <OrderItemCard orderGroup={orderGroup} idx={idx} setRawOrderGroupsArr={setRawOrderGroupsArr} setRawPaginationInfo={setRawPaginationInfo} getOrderGroup={getOrderGroup}/>
          </div>
        );
      })}
      <PagenationWrap>
        <ul>
          <li
            className="pointer"
            onClick={paginationInfo.previous ? paginationPrevButton : null}
          >
            <BiLeftArrow />
          </li>
          {pageArr.map((el, idx) => {
            return (
              <li className="pointer" key={idx} onClick={pageNumHandler}>
                {el}
              </li>
            );
          })}
          <li
            className="pointer"
            onClick={paginationInfo.next ? paginationNextButton : null}
          >
            <BiRightArrow />
          </li>
        </ul>
      </PagenationWrap>
    </div>
  );
}

export default OrderItems;
