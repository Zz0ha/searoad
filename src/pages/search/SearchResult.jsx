import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getSearchProducts } from "apis/search";
import Loading from "components/Loading";
import ErrorPage from "components/ErrorPage";
import Product from "components/Product";

function SearchResult(props) {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ["searchKeywordResult", { id }],
    async () => {
      let searchKey = id
      if(id.length === 1) {
        searchKey += '*'
      }
      const res = await getSearchProducts({ id: searchKey });
      return res;
    }
  );
  const dataResult = data.resMsg.search_result;
  const showDataResultLength = dataResult.filter((element) => {
    return element.products.length !== 0;
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className="searchResultPage">
      <div className="container">
        <div className="searchResultKeyword">
          <p>
            '<span>{id}</span>' 검색결과
          </p>

          {dataResult.length === 0 ? (
              <span>검색 결과가 없습니다.</span>
          ) : (
            <small>
              <span>{showDataResultLength.length}</span>개의 상품이 있습니다.
            </small>
          )}
        </div>
        <div className="searchResultContents">
          <div className="searchResultProduct">
            <div className="searchResultProductGridWrap">
              {dataResult.map((productGroup) => {
                if (productGroup.products.length !== 0) {
                  return (
                    <Link to={`/allProductsList/${productGroup.id}`}>
                      <Product el={productGroup} />
                    </Link>
                  );
                } else {
                  return false;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
