import Loading from "components/Loading";
import React from "react";
import { useQuery } from "react-query";

function Orderer() {
  const {data, isLoading} = useQuery("nickname")
  const userProfile = data.resMsg.profile

  if(isLoading){
    return <Loading />
  }
  return (
    <section className="orderSection orderer">
      <h4>주문자 정보</h4>
      <ul>
        <li>
          <p>ID</p>
          <span>{userProfile.username}</span>
        </li>
        <li>
          <p>성명</p>
          <span>{userProfile.full_name}</span>
        </li>
        <li>
          <p>연락처</p>
          <span>{userProfile.contact_number}</span>
        </li>
        <li>
          <p>이메일</p>
          <span>{userProfile.email}</span>
        </li>
      </ul>
    </section>
  );
}

export default Orderer;
