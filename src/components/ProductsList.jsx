import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AllProductsList from './AllProductsList';

function ProductsList(props) {
  const { productGroupId } = useParams();
  const {
    productList,
    refetch,
  } = props;

  const productGroup = productList.find((productGroup) => productGroup.id === productGroupId);

  return (
    AllProductsList({
      productGroup,
      refetch,
    })
  );
}

export default ProductsList;
