import React from "react";
import styled from "styled-components/macro";
import { useRecoilState } from "recoil";

import { AiOutlineClose } from "react-icons/ai";
import { modalFlexibleCloseBtnState, modalOpenState } from "state";

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContent = styled.div`
  text-align: center;
  min-width: 400px;
  background-color: #fff;
  position: relative;
  padding: 20px;
  z-index: 101;
  .topRightCloseIcon {
    position: absolute;
    right: 20px;
    font-size: 20px;
  }
`;

const CloseButton = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background: #1c53c7;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  p {
  }
`;

export function ModalFlexible({ children }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [modalFlexibleCloseBtn, setModalFlexibleCloseBtn] = useRecoilState(modalFlexibleCloseBtnState);

  if (!modalOpen) return null;

  return (
    <Background onClick={() => setModalOpen(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <AiOutlineClose
          className="pointer topRightCloseIcon"
          onClick={() => {
            setModalOpen(false);
            !modalFlexibleCloseBtn && setModalFlexibleCloseBtn(true);
          }}
        />
        {children}
        {
          modalFlexibleCloseBtn &&
          <CloseButton
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <p>확인</p>
          </CloseButton>
        }
      </ModalContent>
    </Background>
  );
}
