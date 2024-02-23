import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";

import { MdArrowDropDown } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import Search from "./Search";

import * as utils from "scripts/utils";
import * as constSet from "constants/index";
import { fetchLogout } from "../apis/auth";
import { getProductCategories } from "apis/products";
import { reverseFindConstantText } from "scripts/helpers/common";
import Loading from "./Loading";

//styledcomponent
const DropdownMenu = styled.div`
  display: flex;
  position: absolute;
  top: 100%;
  left: -20px;
  padding: 0 20px 20px 20px;
  margin: 0;
  width: calc(100% + 20px);
  z-index: 1000;
  background: #fff;
  box-shadow: 3px 8px 8px 0 rgb(0 0 0 / 0.3);
  .topRightCloseIcon {
    position: absolute;
    right: 20px;
    font-size: 20px;
  }
  ul {
    width: 120px;
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      padding: 5px 0;
      cursor: pointer;
    }
  }
`;

// hamburgerMenuCategory를 API로 정상적으로 불러오지 못하면
// 이 변수로 대체한다.
const preAssignedMenuCategory = [
  {
    name: reverseFindConstantText(constSet.ProductCategoryArr, "LIVE"),
    nameCode: "LIVE",
    list: [
      "광어",
      "우럭",
      "도미",
      "줄돔",
      "숭어",
      "방어(계절)",
      "도다리(세꼬시용)",
      "점성어",
      "고등어",
      "오징어",
    ],
  },
  {
    name: reverseFindConstantText(constSet.ProductCategoryArr, "FRESH"),
    nameCode: "FRESH",
    list: [
      "참다랑어",
      "가오리",
      "광어",
      "연어",
      "민어",
      "민어(암)",
      "오징어",
      "갑오징어",
      "한치",
      "금태",
      "대구",
      "삼치",
      "은갈치",
      "아귀",
    ],
  },
  {
    name: reverseFindConstantText(constSet.ProductCategoryArr, "FROZEN"),
    nameCode: "FROZEN",
    list: [
      "참다랑어 뱃살",
      "참다랑어 배꼽살",
      "참다랑어 등살",
      "민물장어",
      "한치",
      "참소라살",
      "새우",
      "초새우",
      "흰다리새우",
      "튀김새우",
      "블랙타이거새우",
      "초문어",
      "문어",
      "동태",
      "골뱅이",
    ],
  },
  {
    name: reverseFindConstantText(constSet.ProductCategoryArr, "SHELL"),
    nameCode: "SHELL",
    list: [
      "문어",
      "멍게",
      "낙지",
      "해삼",
      "전복",
      "뿔소라",
      "개불",
      "흰다리새우",
      "홍게",
      "레드킹크랩",
      "블루킹크랩",
      "랍스터",
    ],
  },
  {
    name: reverseFindConstantText(constSet.ProductCategoryArr, "EGG"),
    nameCode: "EGG",
    list: ["성게알(우니)", "연어알", "날치알", "곤이"],
  },
  {
    name: reverseFindConstantText(constSet.ProductCategoryArr, "DRIED"),
    nameCode: "DRIED",
    list: ["황태채", "황태(황진이)"],
  },
  {
    name: reverseFindConstantText(constSet.ProductCategoryArr, "SEAWEED"),
    nameCode: "SEAWEED",
    list: ["다시마", "김"],
  },
];

function Header() {
  const navigate = useNavigate();
  //dropdown state
  const [hamburgerMenuCategory, setHamburgerMenuCategory] = useState([]); // 굳이 useQuery 쓸 필요없음. 새로고침해라
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // cart count render state
  const [cartCount, setCartCount] = useState(0);

  //login상태 확인
  const { data, refetch } = useQuery("nickname");
  const nick = data?.resMsg.profile.nickname;
  const staff = data.resMsg.profile.is_staff;

  // Cart
  const { data: cartData } = useQuery(["cart", nick], {
    enabled: !!nick,
  });

  // 카테고리 불러오기
  useEffect(() => {
    getProductCategories().then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          let tmpCategoryArr = [];
          // fetchedCategories = {
          //    <catCode>: [],
          //    ...
          //  }
          const fetchedCategories = res.resMsg;
          constSet.ProductCategoryArr.forEach((category) => {
            const catCode = category.value;
            tmpCategoryArr.push({
              name: reverseFindConstantText(
                constSet.ProductCategoryArr,
                catCode
              ),
              nameCode: catCode,
              list: fetchedCategories[catCode],
            });
          });
          setHamburgerMenuCategory(tmpCategoryArr);
        });
      } else {
        console.log("Could not load Header Categories");
        setHamburgerMenuCategory(preAssignedMenuCategory);
      }
    });
  }, []);

  useEffect(() => {
    if (cartData?.resMsg) {
      setCartCount(cartData.resMsg.length);
    }
  }, [cartData]);

  //로그아웃버튼
  const onClickLogout = async () => {
    const logoutConfirm = window.confirm("정말 로그아웃 하시겠습니까?");
    if (logoutConfirm) {
      await fetchLogout();
      await refetch();
    }
  };
  return (
    <div className="header">
      <div className="container">
        <article className="header_user">
          {nick ? (
            <ul>
              <li>{nick}님</li>
              {staff && (
                <li>
                  <Link to="/searoad-staff/order" className="pointer">
                    발주관리
                  </Link>
                </li>
              )}
              <li>
                <p onClick={onClickLogout} className="pointer">
                  로그아웃
                </p>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/auth");
                  }}
                >
                  로그인
                </button>
              </li>
              <li>
                <Link to="/account">회원가입</Link>
              </li>
            </ul>
          )}
        </article>
        <article className="header_center">
          <div>
            <Link to="/">
              <img src={utils.getImageURL("ui/v1.0/logo")} alt="" />
            </Link>
          </div>
          <div className="allMenuSearchBar">
            <Link to={"/allProductsList"}>
              <CgMenuGridR />
              <p>전체상품</p>
            </Link>
            <Search />
          </div>
          <div className="header_center_Icons">
            <ul>
              <li>
                <Link to="/mypage/modifyMyInfo">
                  <img
                    src={utils.getIconURL("header_mypageIcon")}
                    alt="마이페이지"
                  />
                </Link>
              </li>
              <li>
                <Link to="/mypage/orderItems">
                  <img
                    src={utils.getIconURL("header_chartIcon")}
                    alt="발주내역"
                  />
                </Link>
              </li>
              <li>
                <Link to="/cart" className="header-cartCount-wrapper">
                  <img
                    src={utils.getIconURL("header_cartIcon")}
                    alt="장바구니"
                  />
                  {(cartCount > 0 && !!nick) && (
                    <div className="header-cartCount">{cartCount}</div>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </article>
        <article className="header_category flex">
          <ul
            onMouseEnter={() => {
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              setDropdownOpen(false);
            }}
          >
            {hamburgerMenuCategory.map((categoryInfo, index) => {
              return (
                <li
                  key={index}
                  className="mainMenuCategoryList"
                  data-name={categoryInfo.name}
                >
                  <div className="menuCategory">
                    <img
                      src={utils.getIconURL(
                        `productCategoryIcon_${categoryInfo.nameCode}`
                      )}
                      alt=""
                    />
                    <p>{categoryInfo.name}</p>
                    <MdArrowDropDown />
                  </div>
                </li>
              );
            })}
            {dropdownOpen ? (
              <DropdownMenu>
                <AiOutlineClose
                  className="pointer topRightCloseIcon"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                />
                {hamburgerMenuCategory.map((categoryObj, idx) => {
                  return (
                    <ul key={idx}>
                      {categoryObj.list.map((productGroupName, idx) => {
                        return (
                          <Link
                            key={idx}
                            to={`/productGroup?pgName=${productGroupName}&catCode=${categoryObj.nameCode}`}
                            onClick={() => {
                              setDropdownOpen(false);
                            }}
                          >
                            <li>{productGroupName}</li>
                          </Link>
                        );
                      })}
                    </ul>
                  );
                })}
                <div className="inMenuImgWrap">
                  {/* TODO: 제대로된 이미지 적용 */}
                  <img src={utils.getImageURL('ui/v1.0/inMenuImage')} alt="" />
                </div>
              </DropdownMenu>
            ) : null}
          </ul>
          <div className="hidden" style={{ felx: "1" }}></div>
        </article>
      </div>
    </div>
  );
}

export default Header;
