import { useState } from 'react';

import * as constSet from 'constants/index';
import * as apiStaff from 'apis/staff/index';
import { reverseFindConstantText } from 'scripts/helpers/common';
import { getPrettyProductName } from 'scripts/helpers/product';
import {
  findOrderFromArray,
  cleanUpCheckedOrders,
  warmUpConfirmOrderInfoByGroup,
} from './helper';
import { randomIdLetterDigit } from 'scripts/utils';

import { StDivConfirmOrderModal } from 'styles/staff/handlers/orderControlPanel/Modal.style';

const postCreateOrder = (props) => {
  let {
    order,
    ordersArr,
    setOrdersArr,
    orderGroupId,
    setCheckedOrders,
    confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup,
    selectedProductInfo,
    modalHandler,
  } = props;

  // Product of ConfirmData to Create
  const createdProductId = selectedProductInfo.id;
  const createdPricePerVolume = selectedProductInfo.price_per_volume;
  const createdQuantity = selectedProductInfo.quantity;

  // Make ConfirmData
  confirmOrderInfoByGroup = warmUpConfirmOrderInfoByGroup(confirmOrderInfoByGroup, orderGroupId);
  const confirmOrderGroup = confirmOrderInfoByGroup[orderGroupId];
  confirmOrderGroup.confirm_order_info_list.push({
    order_id: '!new!',
    confirm_type: 'create',
    confirm_data: {
      product_id: createdProductId,
      price_per_volume: createdPricePerVolume,
      quantity: createdQuantity,
      total_price: createdPricePerVolume * createdQuantity,
    }
  });
  confirmOrderInfoByGroup[orderGroupId] = confirmOrderGroup;
  setConfirmOrderInfoByGroup({...confirmOrderInfoByGroup});

  const createdOrder = {
    id: '!new!',
    order_group_id: orderGroupId,
    product: selectedProductInfo,
    price_per_volume: createdPricePerVolume,
    quantity: createdQuantity,
    total_price: createdPricePerVolume * createdQuantity,
    is_compensation: false,
    parent: '',
    description_for_parent: '',
    created_order_id: randomIdLetterDigit(14),
    user_info: order.user_info,
    is_created: true,
  };

  const newOrdersArr = ordersArr.map((order) => {
    return order
  });
  newOrdersArr.push(createdOrder);
  setOrdersArr(newOrdersArr);
  cleanUpCheckedOrders(setCheckedOrders);

  // Modal Close
  modalHandler.modalOpen(false);
  modalHandler.setModalFlexibleCloseBtn(true);
}

const handleSearchInputKeyDown = ({
  e,
  ...props
}) => {
  if(e.key === 'Enter') {
    searchProduct({
      ...props,
    });
  }
}

const handleSearchResultRadioChange = ({
  e,
  ...props
}) => {
  const nextSelectedProduct = props.nextSelectedProduct;
  const setSelectedProduct = props.setSelectedProduct;

  setSelectedProduct({
    ...nextSelectedProduct,
  });
}


const searchProduct = (props) => {
  const searchProductName = props.searchProductName;
  const setSearchedProductArr = props.setSearchedProductArr;
  const resp = apiStaff.searchProductWithKeyword(searchProductName);

  resp.then((resp) => {
    const data = resp?.resMsg

    if(!data) {
      alert('검색에 실패했습니다.' + resp);
      return;
    }

    const searchResult = data.search_result;
    const searchScore = data.search_score;
    searchScore.forEach((scoreObj) => {
      const id = scoreObj.id;
      const score = scoreObj.score;
      const sr = searchResult.find((productGroup) => productGroup.id === id)
      if(score === 0) {
        searchResult.splice(searchResult.indexOf(sr), 1);
      }
      sr.score = score;
    });

    if(searchResult.length === 0) {
      alert('검색 결과가 없습니다.');
      return;
    }

    const searchResultArr = [];
    searchResult.forEach((productGroup) => {
      const prettySearchResultArr = productGroup.products.map(p => {
        return {
          ...productGroup,
          order_group_id: productGroup.id,
          ...p,
          prettyName: getPrettyProductName({
            ...p,
            name: productGroup.name,
            origin_country: productGroup.origin_country,
            production_type: productGroup.production_type,
            preservation_type: productGroup.preservation_type,
          }),
        }
      });
      searchResultArr.push(...prettySearchResultArr);
    });

    setSearchedProductArr(searchResultArr);
  });
}

const ConfirmOrderModalToCreate = (props) => {
  let {
    ordersArr,
    setOrdersArr,
    checkedOrders,
    setCheckedOrders,
    confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup,
    modalHandler,
  } = props;

  const [searchProductName, setSearchProductName] = useState('');
  const [searchedProductArr, setSearchedProductArr] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    id: '', name: '',
    price_per_volume: 0,
    quantity: 0,
  });

  const [checkedOrderID] = checkedOrders;  // Set의 첫번째 요소를 가져온다.
  const order = findOrderFromArray(ordersArr, checkedOrderID);
  const orderGroupId = order.order_group_id;

  return (
    <StDivConfirmOrderModal>
      <div className="modal__header">
        <h2 className="modal__title">발주 생성</h2>
      </div>
      <div className="modal__body">
        <div className="modal__search-product">
          <input type="text"
            placeholder="상품명을 입력하세요."
            value={searchProductName}
            onChange={(e) => setSearchProductName(e.target.value)}
            onKeyDown={
              (e) => handleSearchInputKeyDown({
                e: e,
                searchProductName: searchProductName,
                searchedProductArr: searchedProductArr,
                setSearchedProductArr: setSearchedProductArr,
              })
            }
          />
          <button
            onClick={
              () => searchProduct({
                searchProductName: searchProductName,
                searchedProductArr: searchedProductArr,
                setSearchedProductArr: setSearchedProductArr,
              })
            }
          >
            검색
          </button>
        </div>
        <div className="modal__searched-product-list">
          <span>
            검색 결과
          </span>
          <ul>
            {searchedProductArr ? searchedProductArr.map((product) => {
              return (
              <li key={product.id}>
                <input
                  type="radio"
                  value={product.id}
                  name={product.id}
                  checked={selectedProduct.id === product.id}
                  onChange={(e) => handleSearchResultRadioChange({
                    e: e,
                    nextSelectedProduct: product,
                    setSelectedProduct: setSelectedProduct,
                  })}
                />
                <label htmlFor={product.id}>{product.prettyName}</label>
              </li>)
            }) : null}
          </ul>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="selected-product__title">선택된 상품:</td>
              <td>{selectedProduct.name}</td>
            </tr>
            <tr>
              <td>단가:</td>
              <td>
                <input
                  type="number"
                  value={selectedProduct.price_per_volume || 0}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      price_per_volume: parseInt(e.target.value),
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>수량{`(${reverseFindConstantText(constSet.VolumeCodeArr, selectedProduct.volume_code) || ''})`}:</td>
              <td>
                <input
                  type="number"
                  value={selectedProduct.quantity || 0}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: parseInt(e.target.value),
                    });
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>총액:</td>
              <td>{selectedProduct.price_per_volume * selectedProduct.quantity || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
          onClick={() => {
            postCreateOrder({
              order: order,
              ordersArr: ordersArr,
              setOrdersArr: setOrdersArr,
              orderGroupId: orderGroupId,
              checkedOrders: checkedOrders,
              setCheckedOrders: setCheckedOrders,
              confirmOrderInfoByGroup: confirmOrderInfoByGroup,
              setConfirmOrderInfoByGroup: setConfirmOrderInfoByGroup,
              selectedProductInfo: selectedProduct,
              modalHandler: modalHandler,
            })
          }}
        >
          확인
        </button>
      </div>
    </StDivConfirmOrderModal>
  )
}

export default function createOrders ({
  ordersArr,
  setOrdersArr,
  checkedOrders,
  setCheckedOrders,
  confirmOrderInfoByGroup,
  setConfirmOrderInfoByGroup,
  btnActive,
  modalHandler,
}) {
  if(!btnActive.create || checkedOrders.size === 0) {
    return;
  } else if(checkedOrders.size > 1) {
    alert('주문을 생성하려면 하나의 주문만 선택해야 합니다.');
    return;
  }

  const modalAttrs = {
    ordersArr: ordersArr,
    setOrdersArr: setOrdersArr,
    checkedOrders: checkedOrders,
    setCheckedOrders: setCheckedOrders,
    confirmOrderInfoByGroup: confirmOrderInfoByGroup,
    setConfirmOrderInfoByGroup: setConfirmOrderInfoByGroup,
    btnActive: btnActive,
    modalHandler: modalHandler,
  };

  let setModalFlexibleCloseBtn = modalHandler.setModalFlexibleCloseBtn;
  let modalOpen = modalHandler.modalOpen;
  let setModalContent = modalHandler.setModalContent;

  const modalContent = (
    <ConfirmOrderModalToCreate {...modalAttrs} />
  );
  setModalFlexibleCloseBtn(false);
  setModalContent(modalContent);
  modalOpen(true);
}
