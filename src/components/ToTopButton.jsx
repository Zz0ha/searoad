import React, { useEffect, useState } from "react";
import * as IMGURL from "scripts/utils";
import styled from "styled-components";

const ToTopButtonWrap = styled.div`
  position: fixed;
  bottom: 20px;
  right: 50px;
  z-index: 100;
  cursor: pointer;
`;

const topbuttonHandler = () => {
  window.scrollTo(0, 0);
};

function ToTopButton() {
  const [showBtn, setShowBtn] = useState(false)
  const handleScroll = ()=>{
    if(window.scrollY > 100){
      setShowBtn(true)
    } else {
      setShowBtn(false)
    }
  }
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[showBtn])

  return showBtn && (
    <ToTopButtonWrap onClick={topbuttonHandler}>
      <img src={IMGURL.getIconURL("topButton")} alt="" />
    </ToTopButtonWrap>
  );
}

export default ToTopButton;
