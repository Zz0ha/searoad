import React from 'react';
import { useState } from 'react';

import StaffBase from 'components/staff/template/StaffBase';

import { VARS } from 'scripts/variables';
import { reverseFindConstantText } from 'scripts/helpers/common';
import * as constSet from 'constants/index';
import * as apiStaff from 'apis/staff';
import { simpleErrorAlert, simpleSuccessAlert } from 'apis/errors/errorMap';

import {
  StDivStaffProductCreation,
  StDivCreationFormWrapper,
  StTableFormTable,
  StTrFormRow,
  StTrFormRowDivider,
  StInputThumbnailUrl,
  StButtonPrimary,
} from './StaffProductCreation.style';

const selectBoxOnChange = (e, stateVal, stateSetter) => {
  stateSetter(e.target.value);
};

const productCreationOnSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Validate
  for(const [n, v] of formData.entries()) {
    if (
      !(['entity_size_code'].includes(n)) && !v
    ) {
      alert(`${n}이 올바르지 않습니다.`);
      return;
    }
  }
  const data = Object.fromEntries(formData);
  data.image_meta = JSON.stringify({
    'thumbnail_url': data.image_meta,
  })
  const resp = await apiStaff.addProducts(data);
  simpleErrorAlert(resp);
  simpleSuccessAlert(resp);
}

const LetsCreateBtn = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <StButtonPrimary type="submit">상품등록하기</StButtonPrimary>
    </div>
  )
}

const ContentTitle = (props) => {
  return (
    <>
      <h1>상품 등록</h1>
      <p>상품을 등록합니다.</p>
    </>
  );
}

const ContentBody = (props) => {
  const [selectBoxCategory, setSelectBoxCategory] = useState(constSet.ProductCategoryArr[0].value);
  const [selectBoxCurrencyCode, setSelectBoxCurrencyCode] = useState(constSet.CurrencyCodeArr[0].value);
  const [selectBoxVolumeCode, setSelectBoxVolumeCode] = useState(constSet.VolumeCodeArr[0].value);
  const [selectBoxPreservationType, setSelectBoxPreservationType] = useState(constSet.PreservationTypeArr[0].value);
  const [selectBoxProductionType, setSelectBoxProductionType] = useState(constSet.ProductionTypeArr[0].value);
  const [displayPriority, setDisplayPriority] = useState(0);
  const [entitySizeCode, setEntitySizeCode] = useState(constSet.ProductEntitySizeCodeArr[0].value);
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [previewThumbnailUrl, setPreviewThumbnailUrl] = useState(`${VARS.PATH.IMAGE_URL}ui/v1.0/prepareImage.png`);

  return (
    <StDivStaffProductCreation>
      <StDivCreationFormWrapper>
        <form onSubmit={productCreationOnSubmit}>
          <StTableFormTable>
            <tbody>
              <StTrFormRow className="product-section-div">
                <td colSpan="100%">상품 그룹 정보</td>
              </StTrFormRow>

              {/* Product Group Name */}
              <StTrFormRow>
                <td>상품명</td>
                <td>
                  <input type="text" name="name" placeholder="상품명" />
                </td>
              </StTrFormRow>

              {/* category */}
              <StTrFormRow>
                <td>상품카테고리</td>
                <td>
                  <select
                    name="category"
                    onChange={(e)=>selectBoxOnChange(e, selectBoxCategory, setSelectBoxCategory)}
                  >
                    {constSet.ProductCategoryArr.map((option) => (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </td>
              </StTrFormRow>

              {/* currency_code */}
              <StTrFormRow>
                <td>통화</td>
                <td>
                  <select
                    id="currency-code" name="currency_code"
                    onChange={(e)=>selectBoxOnChange(e, selectBoxCurrencyCode, setSelectBoxCurrencyCode)}
                  >
                    {constSet.CurrencyCodeArr.map((option) => (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </td>
              </StTrFormRow>

              {/* volume_code */}
              <StTrFormRow>
                <td>용량 단위</td>
                <td>
                  <select
                    id="volume-code" name="volume_code"
                    onChange={(e)=>selectBoxOnChange(e, selectBoxVolumeCode, setSelectBoxVolumeCode)}
                  >
                    {constSet.VolumeCodeArr.map((option) => (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </td>
              </StTrFormRow>

              {/* origin_country */}
              <StTrFormRow>
                <td>원산지</td>
                <td>
                  <input type="text" id="origin-country" name="origin_country" placeholder="원산지" />
                </td>
              </StTrFormRow>

              {/* production_type */}
              <StTrFormRow>
                <td>생산 방식</td>
                <td>
                  <select
                    id="production-type" name="production_type"
                    onChange={(e)=>selectBoxOnChange(e, selectBoxProductionType, setSelectBoxProductionType)}
                  >
                    {constSet.ProductionTypeArr.map((option) => (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </td>
              </StTrFormRow>

              {/* preservation_type */}
              <StTrFormRow>
                <td>보존 방식</td>
                <td>
                  <select
                    id="preservation-type" name="preservation_type"
                    onChange={(e)=>selectBoxOnChange(e, selectBoxPreservationType, setSelectBoxPreservationType)}
                  >
                    {constSet.PreservationTypeArr.map((option) => (
                      <option key={option.value} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </td>
              </StTrFormRow>

              <StTrFormRowDivider>
                <td colSpan="100%"><div /></td>
              </StTrFormRowDivider>

              <StTrFormRow className="product-section-div">
                <td colSpan="100%">상품 개체 정보</td>
              </StTrFormRow>

              {/* display priority */}
              <StTrFormRow>
                <td>그룹 내 순서</td>
                <td>
                  <input
                    type="number" id="display-priority" name="display_priority" placeholder="순서"
                    defaultValue={1}
                    onChange={(e)=>setDisplayPriority(e.target.value)}
                  />
                </td>
              </StTrFormRow>

              {/* price_per_volume */}
              <StTrFormRow>
                <td>단위 용량 당 가격</td>
                <td>
                  <span className="price-per-volume volume">
                    {`1 ${reverseFindConstantText(constSet.VolumeCodeArr, selectBoxVolumeCode)} 당 `}
                  </span>
                  <input type="number" id="price-per-volume" name="price_per_volume" placeholder="단위 용량 당 가격" />
                  <span className="price-per-volume currency">
                    {reverseFindConstantText(constSet.CurrencyCodeArr, selectBoxCurrencyCode)}
                  </span>
                </td>
              </StTrFormRow>

              {/* min_size_of_entity & max_size_of_entity */}
              <StTrFormRow>
                <td>개체 최소~최대 용량</td>
                <td>
                  <span>1 개체 당 평균 </span>
                  <input
                    type="text" className="min-size-of-entity"
                    id="min-size-of-entity" name="min_size_of_entity" placeholder="최소"
                  />
                  <span className="size-of-entity separator">~</span>
                  <input
                    type="text" className="max-size-of-entity"
                    id="max-size-of-entity" name="max_size_of_entity" placeholder="최대"
                  />
                  &nbsp;
                  <select
                    id="entity-size-code" name="entity_size_code"
                    className="size-of-entity"
                    onChange={(e)=>selectBoxOnChange(e, entitySizeCode, setEntitySizeCode)}
                  >
                    {constSet.ProductEntitySizeCodeArr.map((option, idx) => (
                      // 여기서 key로 option.value를 주면 null 일 수 있음
                      <option key={idx} value={option.value}>{option.text}</option>
                    ))}
                  </select>
                </td>
              </StTrFormRow>

              {/* description */}
              <StTrFormRow>
                <td>상품 설명 (관리자만 조회 가능)</td>
                <td>
                  <input
                    type="text" id="description" name="description"
                    placeholder="상품 설명" value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                  />
                </td>
              </StTrFormRow>

              {/* image_meta */}
              <StTrFormRow>
                <td><span>상품 대표 이미지 URL (thumbnail url:)</span></td>
                <td>
                  <StInputThumbnailUrl
                    type="text" id="image-meta" name="image_meta" placeholder={'https://...'}
                    onChange={(e)=>setThumbnailUrl(e.target.value)}
                  />
                </td>
              </StTrFormRow>
              <StTrFormRow>
                <td>
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
              </StTrFormRow>
              <StTrFormRow>
                <td
                  className="continuous-row thumbnail-preview-row"
                  colSpan={2}
                >
                  <img src={previewThumbnailUrl} alt="product thumbnail" />
                </td>
              </StTrFormRow>
            </tbody>
          </StTableFormTable>

          <LetsCreateBtn />
        </form>
      </StDivCreationFormWrapper>
    </StDivStaffProductCreation>
  );
}

const StaffProductCreation = (props) => {
  return (
    <StaffBase
      contentTitle={<ContentTitle />}
      contentBody={<ContentBody {...props} />}
    />
  )
}

export default StaffProductCreation;
