import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { myPageList } from "./myPageList";
import {useNavigate } from 'react-router-dom';

function SideMenuBar() {
  const navigate = useNavigate()
  return (
    <div className="myPageSideMenuBar">
      <h3>바닷길 마이페이지</h3>
      <ul className="menuList">
        {myPageList.map((el, index) => {
          return (
            <li
              key={el.id}
              onClick={() => {
                navigate(`/mypage${el.location}`)
              }}
            >
              <p>{el.name}</p>
              <MdArrowForwardIos />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideMenuBar;
