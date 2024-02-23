import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { modalOpenState } from "state";
import { useLockScroll } from "hook/useLockScroll";
import { useRecoilState } from "recoil";
import ModalPortal from "ModalPortal";
import { MyShippingAddressListModal, ViewAddList } from "components/Modal";
import { useQuery } from "react-query";
import Loading from "components/Loading";
import { fetchDeleteDelivery, fetchPutDelivery, getDelivery } from "apis/delivery";

const DefaultShiping = styled.div`
  margin-top: 22px;
  width: 100%;
  display: flex;
  background-color: #fafafa;
  align-items: center;
  height: 100px;
  gap: 40px;
  padding-left: 13px;
  font-size: 15px;
`;
const ShipingDestination = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
  font-size: 14px;

  thead {
    background-color: #fafafa;
    border-top: 1px solid #333333;
    border-bottom: 1px solid #333333;
    th {
      padding: 20px 0;
    }
  }
  td {
    padding: 30px 0;
    border-bottom: 1px solid #eeeeee;

  }
`;
const AddButton = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: row-reverse;
  button {
    padding: 10px 20px;
    background-color: #1c53c7;
    color: #fff;
  }
`;

function ModifyShipingInfo() {
  //배송지 GET 불러오기
  const { data, isLoading, refetch } = useQuery("delivery", getDelivery, {
    notifyOnChangeProps: "tracked",
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });
  const deliveryList = data.resMsg;
  const defaultAddress = deliveryList?.filter((el) => {
    return el.set_default;
  });

  //즐겨찾는 배송지 modal 열기
  const [viewAddList, setViewAddList] = useState(false);

  //배송지 modal창
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  //lockScroll
  const { lockScroll } = useLockScroll();

  const [disable, setDisable] = useState(true)

  //기본배송지 수정
  const defaultAddressHandler = async (e, id) => {
    const data = {
      id: id,
      set_default: true,
    };
    if(e.target.textContent ==="설정"){
      setDisable(false)
      if (window.confirm("기본 배송지로 설정할까요?")) {
        const submit = await fetchPutDelivery(data);
        refetch()
        alert("기본 배송지로 설정되었습니다.")
        return submit;
      } else {
        return false
      }
    } else {
      return false
    }
  };
  //text가 '설정'일 때만 disable false 처리
  useEffect(()=>{

  },[disable])

  //배송지목록 삭제
  const deleteAddress = async (id) => {
    const data = {
      favorite_address_id: id
    };

    if (window.confirm("배송지 목록에서 삭제할까요?")) {
      const submit = await fetchDeleteDelivery(data);
      refetch()
      return submit;
    } else {
      alert("");
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <DefaultShiping>
        <div>기본 배송지</div>
        <div>
          <div>
            {defaultAddress.length !== 0 ? (
              <p>{`[${defaultAddress[0]?.zonecode}] ${defaultAddress[0]?.address} ${defaultAddress[0]?.address_detail}`}</p>
            ) : (
              <p>기본 배송지를 설정해주세요.</p>
            )}
          </div>
        </div>
      </DefaultShiping>
      <AddButton>
        <button
          type="button"
          onClick={() => {
            setModalOpen(true);
            lockScroll();
          }}
        >
          배송지 추가
        </button>
      </AddButton>
      <ShipingDestination>
        <colgroup>
          <col width="10%" />
          <col width="40%" />
          <col width="10%" />
          <col width="20%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th>기본배송지</th>
            <th>주소</th>
            <th>받는 분</th>
            <th>연락처</th>
            <th>삭제</th>
          </tr>
        </thead>
        {deliveryList.map((el) => {
          return (
            <tbody key={el.id}>
              <tr>
                <td>
                  <button
                    onClick={(e) => {
                      defaultAddressHandler(e, el.id);
                    }}
                    className={!el.set_default ? "setDefaultButton pointer": "cursorAuto"}
                  >
                    {!el.set_default ? "설정" : "✅"}
                  </button>
                </td>
                <td>{`[${el.zonecode}] ${el.address} ${el.address_detail}`}</td>
                <td>{`${el.receiver_name}`}</td>
                <td>{`${el.receiver_contact}`}</td>
                <td>
                  <button onClick={()=>{
                    deleteAddress(el.id)
                  }}>{!el.set_default && "삭제하기"}</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </ShipingDestination>

      {viewAddList && (
        <ModalPortal>
          <ViewAddList setViewAddList={setViewAddList} />
        </ModalPortal>
      )}
      {modalOpen && (
        <ModalPortal>
          <MyShippingAddressListModal
            setModalOpen={setModalOpen}
            refetch={refetch}
          ></MyShippingAddressListModal>
        </ModalPortal>
      )}
    </>
  );
}

export default ModifyShipingInfo;
