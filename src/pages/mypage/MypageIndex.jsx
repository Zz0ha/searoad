import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideMenuBar from "../../components/MyPage/SideMenuBar";

function MypageIndex({ children }) {
  const { pathname } = useLocation();


  const myPageTitle = () => {
    let titleName;
    switch (pathname) {
      case "/mypage/orderItems":
        titleName = "발주 내역"
        break;
      case "/mypage/defectItems":
        titleName = "불량 내역";
        break;
      case "/mypage/modifyPW":
        titleName = "비밀번호 수정";
        break;
      case "/mypage/modifyMyInfo":
        titleName = "회원정보 수정";
        break;
      case "/mypage/modifyShipingInfo":
        titleName = "배송정보 확인/수정";
        break;
      case "/mypage/leaveSearoad":
        titleName = "회원탈퇴";
        break;
      default:
        titleName = "비밀번호 수정";
    }
    return titleName
  };

  return (
    <div>
      <div className="container">
        <div className="myPageIndexWrap">
          <SideMenuBar />
          <div className="myPageRightContents">
            <div className="myPageContents">
              {myPageTitle()}
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageIndex;
