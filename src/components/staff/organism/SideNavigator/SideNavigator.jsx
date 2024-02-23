import React from 'react';
import { Link } from 'react-router-dom';

import {
  StLiNavigatorItem,
  StLiSubNavigatorItem,
  StUlNavigator,
  StUlSubNavigator,
  StWrapper
} from './SideNavigator.style';

export const SideNavigator = () => {
  return (
    <StWrapper>
      <StUlNavigator>
        {/* Order */}
        <StLiNavigatorItem>
          <span className="text title">발주관리</span>
          <StUlSubNavigator>
            <StLiSubNavigatorItem>
              <Link to="/searoad-staff/order">
                <span className="text">고객발주 검토</span>
              </Link>
            </StLiSubNavigatorItem>
            <StLiSubNavigatorItem>
              <Link to="/searoad-staff/confirm-order">
              <span className="text">확정발주 관리</span>
              </Link>
            </StLiSubNavigatorItem>
            {/* <StyledSubNavigatorItem>
              <Link to="/searoad-staff/delivery">
                <StyledNavigatorText>배송현황 조회</StyledNavigatorText>
              </Link>
            </StyledSubNavigatorItem> */}
          </StUlSubNavigator>
        </StLiNavigatorItem>

        {/* Customer Relation Management */}
        <StLiNavigatorItem>
          <span className="text title">고객관리</span>
          <StUlSubNavigator>
            <StLiSubNavigatorItem>
              <Link to="/searoad-staff/defect">
                <span className="text">불량 검토</span>
              </Link>
            </StLiSubNavigatorItem>
            {/* <StyledSubNavigatorItem>
              <Link to="/searoad-staff/defect-compensation">
                <StyledNavigatorText>보상 실행</StyledNavigatorText>
              </Link>
            </StyledSubNavigatorItem> */}
          </StUlSubNavigator>
        </StLiNavigatorItem>

        {/* Product */}
        <StLiNavigatorItem>
          <span className="text title">상품관리</span>
          <StUlSubNavigator>
            <StLiSubNavigatorItem>
              <Link to="/searoad-staff/product">
                <span className="text">상품 목록</span>
              </Link>
            </StLiSubNavigatorItem>
            <StLiSubNavigatorItem>
              <Link to="/searoad-staff/product-creation">
                <span className="text">상품 등록</span>
              </Link>
            </StLiSubNavigatorItem>
          </StUlSubNavigator>
        </StLiNavigatorItem>

        {/* Misc */}
        <StLiNavigatorItem>
          <span className="text title">기타</span>
          <StUlSubNavigator>
            <StLiSubNavigatorItem>
              <Link to="/searoad-staff/scheduler">
                <span className="text">스케줄러</span>
              </Link>
            </StLiSubNavigatorItem>
          </StUlSubNavigator>
        </StLiNavigatorItem>

      </StUlNavigator>
    </StWrapper>
  )
}

export default SideNavigator;
