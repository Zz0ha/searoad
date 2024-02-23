import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/macro';

import ModalPortal from 'ModalPortal';
import { ModalFlexible } from 'components/ModalFlexible';
import StaffBase from 'components/staff/template/StaffBase';
import ProductListControlPanel from 'components/staff/organism/ProductListControlPanel';
import ProductGroupSubTable from 'components/staff/organism/ProductGroupSubTable';
import ProductListTable from 'components/staff/organism/ProductListTable';

import { modalFlexibleCloseBtnState, modalOpenState } from 'state';
import * as apiStaff from 'apis/staff';
import { simpleErrorAlert } from 'apis/errors/errorMap';

const StDivContentBody = styled.div`
  h3.product-group-name {
    margin-top: 20px;
  }
`;

const ContentTitle = (props) => {
  return (
    <>
      <h1>상품 목록</h1>
      <p>상품 목록을 확인하고 변경합니다.</p>
    </>
  );
}

const ContentBody = (props) => {
  // Modal
  const modalOpen = useSetRecoilState(modalOpenState);
  const setModalFlexibleCloseBtn = useSetRecoilState(modalFlexibleCloseBtnState);
  const [modalContent, setModalContent] = useState(null);

  // API로 가져온 상품 목록
  const [productGroupsArr, setProductGroupsArr] = useState([]);

  // 상품 체크박스
  const [checkedProductIdSet, setCheckedProductIdSet] = useState(new Set());

  // 상품 목록을 가져온다.
  useEffect(() => {
    const getProducts = async () => {
      const resp = await apiStaff.getProductsAll();
      simpleErrorAlert(resp);
      if(resp?.resMsg instanceof Array) {
        setProductGroupsArr(resp.resMsg);
      }
    }
    getProducts();
  }, []);

  const modalHandler = {
    'modalOpen': modalOpen,
    'setModalFlexibleCloseBtn': setModalFlexibleCloseBtn,
    'setModalContent': setModalContent,
  }

  return (
    <StDivContentBody>
      {/* Control Panel */}
      <ProductListControlPanel
        productGroupsArr={productGroupsArr}
        setProductGroupsArr={setProductGroupsArr}
        checkedProductIdSet={checkedProductIdSet}
        setCheckedProductIdSet={setCheckedProductIdSet}
        modalHandler={modalHandler}
      />

      {/* Product Table */}
      {productGroupsArr.map((productGroup, idx) => {
        if(productGroup.products.length === 0) return null;
        return (
          <div key={idx}>
            <h3 className="product-group-name">{productGroup.name}</h3>
            <ProductGroupSubTable
              productGroup={productGroup}
            />
            <ProductListTable
              modalOpen={modalOpen}
              setModalContent={setModalContent}
              productGroup={productGroup}
              checkedProductIdSet={checkedProductIdSet}
              setCheckedProductIdSet={setCheckedProductIdSet}
            />
          </div>
        )
      })}
      <ModalPortal>
        <ModalFlexible>
          <div>{modalContent}</div>
        </ModalFlexible>
      </ModalPortal>
    </StDivContentBody>
  )
}

export const StaffProductList = (props) => {
  return (
    <StaffBase
      contentTitle={<ContentTitle />}
      contentBody={<ContentBody {...props} />}
    />
  )
}
