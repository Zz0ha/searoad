import React, { useRef } from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import { getSearchProductsList } from "apis/search";
import styled from "styled-components";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import { BiRightArrow } from "react-icons/bi";

const SearchSelectList = styled.ul`
  display: ${({ len, focusState }) => (len || !focusState ? "none" : "block")};
  position: absolute;
  z-index: 100;
  background: #fff;
  border: 1px solid #1c53c7;
  padding: 10px 15px;
  width: 580px;
  font-size: 13px;
  border-radius: 20px;
  margin-top: 5px;
  li {
    padding: 5px 0;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    svg {
      font-size: 10px;
    }
  }
`;

function Search() {
  const navigate = useNavigate();
  const focusRef = useRef(null);
  const [focusState, setFocusState] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  //검색결과
  const { data, isLoading, isError } = useQuery(
    "searchProducts",
    getSearchProductsList,
    {
      notifyOnChangeProps: "tracked",
      staleTime: 1000 * 20,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );
  const searchResult = data.resMsg;

  const onChangeInputKeyword = (e) => {
    const target = e.target.value;
    setInputSearch(e.target.value);

    const searchRes = searchResult.filter((el) => {
      if (target === "") return false;
      const regExp = new RegExp(target, "gi");
      return regExp.test(el);
    });
    setSearchResultList(searchRes);
  };
  const selectSearchKeywordHandler = async (e) => {
    const target = e.target.innerText
    setInputSearch(target)
    navigate(`/searchResult/${target}`)
  };

  const searchIcononClickHandler = ()=>{
    navigate(`/searchResult/${inputSearch}`)
  }
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div
      className="searchBarWrap"
      onBlur={() => {
        setFocusState(false);
      }}
      onFocus={() => {
        setFocusState(true);
      }}
    >
      <div className="searchBar">
        <input
          id="searchBar"
          type="search"
          placeholder="검색어를 입력해 주세요."
          onChange={onChangeInputKeyword}
          value={inputSearch}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchIcononClickHandler();
          }}
          ref={focusRef}
        />
        <div className="pointer" onClick={searchIcononClickHandler}>
          <AiOutlineSearch className="searchIcon" />
        </div>
      </div>
      <SearchSelectList
        len={searchResultList.length === 0}
        focusState={focusState}
      >
        {searchResultList.map((el) => {
          return (
            <li key={el} onMouseDown={selectSearchKeywordHandler}>
              <BiRightArrow />
              {el}
            </li>
          );
        })}
      </SearchSelectList>
    </div>
  );
}

export default Search;
