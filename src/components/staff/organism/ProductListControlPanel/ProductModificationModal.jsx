import { useState } from 'react';

import * as constSet from 'constants/index';
import * as apiStaff from 'apis/staff';
import { reverseFindConstantText } from 'scripts/helpers/common';
import { changeProductProfile } from 'apis/staff/product';
import { simpleAlert } from 'apis/errors/errorMap';

import { StDivStaffModal } from 'styles/staff/Modal.style';
import { StTableProductEdit } from './ProductModificationModal.style';

const selectBoxOnChange = (e, stateVal, stateSetter) => {
  stateSetter(e.target.value);
};

export const ProductModificationModal = (props) => {
  let {
    setCheckedProductIdSet,
    productId,
    productGroupsArr,
    setProductGroupsArr,
    modalHandler,
  } = props;

  const targetProductGroup = productGroupsArr.find((productGroup) => productGroup.products.find((product) => product.id === productId));
  const targetProduct = targetProductGroup.products.find((product) => product.id === productId);

  // ProductGroup Fields
  const [name, setName] = useState(targetProductGroup.name);
  const [category, setCategory] = useState(targetProductGroup.category);
  const [currencyCode, setCurrencyCode] = useState(targetProductGroup.currency_code);
  const [volumeCode, setVolumeCode] = useState(targetProductGroup.volume_code);
  const [preservationType, setPreservationType] = useState(targetProductGroup.preservation_type);
  const [productionType, setProductionType] = useState(targetProductGroup.production_type);
  const [originCountry, setOriginCountry] = useState(targetProductGroup.origin_country);
  let imageMeta;
  try {
    imageMeta = JSON.parse(targetProductGroup.image_meta)
  } catch (e) {
    imageMeta = {};
  }
  const [thumbnailUrl, setThumbnailUrl] = useState(imageMeta.thumbnail_url ?? '');
  const [previewThumbnailUrl, setPreviewThumbnailUrl] = useState(thumbnailUrl);

  // Product Fields
  const [displayPriority, setDisplayPriority] = useState(targetProduct.display_priority);
  const [entitySizeCode, setEntitySizeCode] = useState(targetProduct.entity_size_code);  // ['g', 'kg', 'l', 'ml']
  const [minSizeOfEntity, setMinSizeOfEntity] = useState(targetProduct.min_size_of_entity);
  const [maxSizeOfEntity, setMaxSizeOfEntity] = useState(targetProduct.max_size_of_entity);
  const [pricePerVolume, setPricePerVolume] = useState(targetProduct.price_per_volume);
  const [description, setDescription] = useState(targetProduct.description);


  return (
    <StDivStaffModal>
      <div>
        <h2>상품 정보 수정</h2>
      </div>
      <StTableProductEdit>
        <tbody>
          <tr>
            <td
              className="align-left field-name"
            >상품명:</td>
            <td
              className="align-left"
            >
              <input
                type="text" name="name" placeholder="상품명" value={name}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >카테고리:</td>
            <td
              className="align-left"
            >
              <select
                name="category"
                value={category}
                onChange={(e)=>selectBoxOnChange(e, category, setCategory)}
              >
                {constSet.ProductCategoryArr.map((option) => (
                  <option key={option.value} value={option.value}>{option.text}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >통화:</td>
            <td
              className="align-left"
            >
              <select
                id="currency-code" name="currency_code"
                value={currencyCode}
                onChange={(e)=>selectBoxOnChange(e, currencyCode, setCurrencyCode)}
              >
                {constSet.CurrencyCodeArr.map((option) => (
                  <option key={option.value} value={option.value}>{option.text}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >용량단위:</td>
            <td
              className="align-left"
            >
              <select
                id="volume-code" name="volume_code"
                value={volumeCode}
                onChange={(e)=>selectBoxOnChange(e, volumeCode, setVolumeCode)}
              >
                {constSet.VolumeCodeArr.map((option) => (
                  <option key={option.value} value={option.value}>{option.text}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >원산지:</td>
            <td
              className="align-left"
            >
              <input
                type="text" id="origin-country" name="origin_country"
                placeholder="원산지" value={originCountry}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setOriginCountry(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >생산방식:</td>
            <td
              className="align-left"
            >
              <select
                id="production-type" name="production_type"
                value={productionType}
                onChange={(e)=>selectBoxOnChange(e, productionType, setProductionType)}
              >
                {constSet.ProductionTypeArr.map((option) => (
                  <option key={option.value} value={option.value}>{option.text}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >보존방식:</td>
            <td
              className="align-left"
            >
              <select
                id="preservation-type" name="preservation_type"
                value={preservationType}
                onChange={(e)=>selectBoxOnChange(e, preservationType, setPreservationType)}
              >
                {constSet.PreservationTypeArr.map((option) => (
                  <option key={option.value} value={option.value}>{option.text}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >단위 용량 당 가격:</td>
            <td
              className="align-left"
            >
              <span className="price-per-volume volume">
                {`1 ${reverseFindConstantText(constSet.VolumeCodeArr, volumeCode)} 당 `}
              </span>
              <input
                type="number" id="price-per-volume" name="price_per_volume"
                placeholder="단위 용량 당 가격" value={pricePerVolume}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setPricePerVolume(e.target.value)}
              />
              <span className="price-per-volume currency">
                {reverseFindConstantText(constSet.CurrencyCodeArr, currencyCode)}
              </span>
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >그룹 내 순서:</td>
            <td
              className="align-left"
            >
              <input
                type="number" id="display-priority" name="display_priority"
                placeholder="그룹 내 순서" value={displayPriority}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setDisplayPriority(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >개체 최소~최대 용량:</td>
            <td
              className="align-left"
            >
              <input
                type="text" id="min-size-of-entity" name="min_size_of_entity"
                placeholder="개체 최소 용량" value={minSizeOfEntity}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setMinSizeOfEntity(e.target.value)}
              />
              <span className="-of_entity separator">~</span>
              <input
                type="text" id="max-size-of-entity" name="max_size_of_entity"
                placeholder="개체 최대 용량" value={maxSizeOfEntity}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setMaxSizeOfEntity(e.target.value)}
              />
              <select
                id="entity-size-code" name="entity_size_code"
                className="size-of-entity"
                value={entitySizeCode}
                onChange={(e)=>selectBoxOnChange(e, entitySizeCode, setEntitySizeCode)}
              >
                {constSet.ProductEntitySizeCodeArr.map((option, idx) => (
                  // 여기서 key로 option.value를 주면 null 일 수 있음
                  <option key={idx} value={option.value}>{option.text}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            >상품설명:</td>
            <td
              className="align-left"
            >
              <input
                type="text" id="description" name="description"
                placeholder="상품 설명" value={description}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setDescription(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td
              className="align-left field-name"
            ><span>상품 대표 이미지 URL:</span></td>
            <td
              className="align-left"
            >
              <input
                type="text" className="thumbnail-url"
                placeholder="https://..." value={thumbnailUrl}
                onFocus={(e)=>e.target.select()}
                onChange={(e)=>setThumbnailUrl(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td
              className="align-left"
            >
              <button
                onClick={(e)=>{e.preventDefault(); setPreviewThumbnailUrl(thumbnailUrl)}}
                style={{
                  padding: 5,
                  marginBottom: 5,
                  backgroundColor: 'skyblue',
                  borderRadius: 4,
                }}
              >
                Show Image Preview
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <img src={previewThumbnailUrl} alt="product thumbnail" />
            </td>
          </tr>
        </tbody>
      </StTableProductEdit>
      <div className="modal__buttons">
        <button
          className="modal-cancel"
          onClick={() => {
            modalHandler.modalOpen(false);
            modalHandler.setModalFlexibleCloseBtn(true);
          }}
        >
          취소
        </button>
        <button
          className="modal-confirm"
          onClick={() => {
            changeProductProfile({
              productId: targetProduct.id,
              apiPayload: {
                name,
                category,
                currencyCode,
                volumeCode,
                originCountry,
                productionType,
                preservationType,
                thumbnailUrl,
                displayPriority,
                entitySizeCode,
                minSizeOfEntity,
                maxSizeOfEntity,
                pricePerVolume,
                description,
              }
            })
            .then((res) => {
              setCheckedProductIdSet(new Set());
              apiStaff.getProductsAll()
              .then((resp) => {
                if(resp?.resMsg instanceof Array) {
                  setProductGroupsArr(resp.resMsg);
                }
              });
              simpleAlert(res)
            });
            modalHandler.modalOpen(false);
            modalHandler.setModalFlexibleCloseBtn(true);
          }}
        >
          수정
        </button>
      </div>
    </StDivStaffModal>
  )
}
