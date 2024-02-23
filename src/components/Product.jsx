import React from "react";
import * as utils from "scripts/utils";
import { getPrettyProductGroupIdentity } from 'scripts/helpers/product';


function Product({ el }) {
  // 상품 이미지 JSON형식
  const imageMeta = JSON.parse(el.image_meta).thumbnail_url;

  return (
    <div className="productCard">
      <div className="productCardImg">
        <img src={imageMeta !== null ? imageMeta : utils.getImageURL("ui/v1.0/prepareImage")} alt="" />
      </div>
      <div className="productCardText">
        <div className="productName">
          <p>
            {el.products &&
              getPrettyProductGroupIdentity(el)}
          </p>
        </div>
        <div className="productPrice">
          <p>{el.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
