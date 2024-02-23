import React from "react";
import * as IMGURL from "../scripts/utils";

function ProductLowest({ el }) {
  return (
    <div className="productCardLowest">
      <div className="productCardImg">
        <img src={IMGURL.getImageURL("ui/v1.0/prepareImage")} alt="" />
      </div>
      <div className="productCardText">
        <div className="productName">
          <span>{el ? el.products[0].description : null}</span>
          <p>
            {el
              ? `[${el.origin_country}산] ${el.name} 1${el.volume_code}`
              : null}
          </p>
        </div>
        <div className="productPrice">
          <p>{el ? `${el.products[0].price_per_volume.toLocaleString('en-AU')}원` : null}</p>
        </div>
        <div className="productCardOrderIcons">
          <div className="cartIcon">
            <img src={IMGURL.getIconURL("cartIcon")} alt="cartIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductLowest;
