import React from "react";
import { Link, useLocation } from "react-router-dom";

import * as utils from "scripts/utils";

function Footer() {
  const location = useLocation();
  return (
    <footer className={`footer ${location.pathname === '/' ? 'noMarginTop' : ''}`}>
      <div className="footerTopWrap">
        <div className="container">
          <div className="footerTop">
            <div className="footerLink">
              <ul>
                <li>
                  <Link to="/board">공지사항</Link>
                </li>
                <li>
                  <a
                    href="https://www.mosepeople.com/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    회사소개
                  </a>
                </li>

                <li>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to="/terms/use-term"
                  >
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to="/terms/privacy-term"
                  >
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footerSNSIcon">
              <ul>
                <li>
                  <Link
                    to="https://www.instagram.com/mosepeople/"
                    target="_blank"
                  >
                    <img
                      src={utils.getIconURL("footer_insta")}
                      alt="인스타아이콘"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.facebook.com/mosepeople"
                    target="_blank"
                  >
                    <img
                      src={utils.getIconURL("footer_facebook")}
                      alt="페이스북아이콘"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.youtube.com/@mosepeople3820"
                    target="_blank"
                  >
                    <img
                      src={utils.getIconURL("footer_youtube")}
                      alt="유튜브아이콘"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footerBottomWrap">
        <div className="container">
          <div className="footerBottom">
            <div className="footerContents">
              <ul>
                <li>
                  대표자 : 최한솔<br/>
                  이메일 : searoad-s@mosepeople.com
                </li>
                <li>
                  사업자 등록번호 : 563-81-02551
                  {/* |&nbsp;<a
                    href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=5638102551"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <u>사업자정보확인</u>
                  </a> */}
                  {/* 통신판매업신고번호 : 제 2022-서울용산-0000호 | */}
                </li>
                <li>
                  주소 : 서울특별시 강서구 공항대로 103 마곡 앰밸리9단지
                  1003호,1004호 (주)모세피플
                </li>
              </ul>
              <p>&copy; 2022-2023. (주)모세피플 All Rights Reserved.</p>
            </div>
            <Link to={"/"} className="footerLogo">
              <img src={utils.getImageURL("ui/v1.0/footerLogo")} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
