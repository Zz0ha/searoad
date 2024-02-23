import CheckBoxAll from 'components/molecule/CheckBoxAll';
import { ProductModificationModal } from './ProductModificationModal';

import { simpleAlert } from 'apis/errors/errorMap';
import * as apiStaff from 'apis/staff/index';

import { StDivControlPanelButtonGroup } from 'styles/staff/ControlPanel.style';
import {
  StDivProductListControlPanel,
  StDivProductListControlPanelButtonGroup,
  StDivCheckBoxAllWrapper,
  StButtonProductListControlPanel,
} from './ProductListControlPanel.style';

const handleCtrlPanelBtnClick = async (props) => {
  const {
    setProductGroupsArr,
    checkedProductIdSet,
    setCheckedProductIdSet,
    apiFunc,
  } = props;

  if(checkedProductIdSet.size === 0) {
    return;
  }

  const response = await apiFunc();
  if(response.status < 400) {
    setCheckedProductIdSet(new Set());
  }

  const resp = await apiStaff.getProductsAll();
  if(resp?.resMsg instanceof Array) {
    setProductGroupsArr(resp.resMsg);
  }

  simpleAlert(response);
}

const ProductListControlPanel = (props) => {
  const {
    productGroupsArr,
    setProductGroupsArr,
    checkedProductIdSet,
    setCheckedProductIdSet,
    modalHandler,
  } = props;

  const statusFunAttrs = {
    checkedProductIdSet,
    setCheckedProductIdSet,
  }

  return (
    <StDivProductListControlPanel className="flex horizontal">
      {/* 체크박스 */}
      <StDivProductListControlPanelButtonGroup>
        <div className="group-title"><b>전체선택</b>:</div>
        <StDivCheckBoxAllWrapper className="group-item">
          <CheckBoxAll
            checkBoxId={'product-list__checkbox-all'}
            checkBoxIdCandidates={
              productGroupsArr.reduce((acc, productGroup) => {
                return acc.concat(productGroup.products.map((product) => product.id));
              }, [])
            }
            checkBoxIdSet={checkedProductIdSet}
            setCheckBoxIdSet={setCheckedProductIdSet}
          />
        </StDivCheckBoxAllWrapper>
      </StDivProductListControlPanelButtonGroup>

      {/* 상품상태 */}
      <StDivControlPanelButtonGroup className="product-status">
        <div className="group-title"><b>상품상태 변경</b>:</div>
        <div className="group-item button-wrapper">
          <StButtonProductListControlPanel
            className={`status-start ${checkedProductIdSet.size > 0 ? 'active' : ''}`}
            onClick={() => handleCtrlPanelBtnClick({
              ...props,
              apiFunc: () => apiStaff.changeProductStatus(Array.from(checkedProductIdSet), 'is_sale_start', true),
              statusFunAttrs: statusFunAttrs,
            })}
          >
            판매시작
          </StButtonProductListControlPanel>

          <StButtonProductListControlPanel
            className={`status-pause ${checkedProductIdSet.size > 0 ? 'active' : ''}`}
            onClick={() => handleCtrlPanelBtnClick({
              ...props,
              apiFunc: () => apiStaff.changeProductStatus(Array.from(checkedProductIdSet), 'visible', false),
              statusFunAttrs: statusFunAttrs,
            })}
          >
            판매 일시중지
          </StButtonProductListControlPanel>

          <StButtonProductListControlPanel
            className={`status-pause ${checkedProductIdSet.size > 0 ? 'active' : ''}`}
            onClick={() => handleCtrlPanelBtnClick({
              ...props,
              apiFunc: () => apiStaff.changeProductStatus(Array.from(checkedProductIdSet), 'visible', true),
              statusFunAttrs: statusFunAttrs,
            })}
          >
            판매 재개
          </StButtonProductListControlPanel>

          <StButtonProductListControlPanel
            className={`status-finish ${checkedProductIdSet.size > 0 ? 'active' : ''}`}
            onClick={() => handleCtrlPanelBtnClick({
              ...props,
              apiFunc: () => apiStaff.changeProductStatus(Array.from(checkedProductIdSet), 'is_sale_end', true),
              statusFunAttrs: statusFunAttrs,
            })}
          >
            판매종료
          </StButtonProductListControlPanel>
        </div>
      </StDivControlPanelButtonGroup>

      {/* 재고 */}
      <StDivProductListControlPanelButtonGroup className="product-inventory">
        <div className="group-title"><b>재고관리</b>:</div>
        <div className="group-item flex horizontal item-gap">
          <input className="inventory-amount-input"></input>
          <div className="button-wrapper">
            <StButtonProductListControlPanel
              className={`inventory-change ${checkedProductIdSet.size > 0 ? 'active' : ''}`}
              onClick={() => {
                const inventoryAmount = document.querySelector('.inventory-amount-input').value;
                handleCtrlPanelBtnClick({
                  ...props,
                  apiFunc: () => apiStaff.changeStockAmount(Array.from(checkedProductIdSet), inventoryAmount),
                  statusFunAttrs: statusFunAttrs,
                })
              }}
            >
              재고수정
            </StButtonProductListControlPanel>
          </div>
        </div>
      </StDivProductListControlPanelButtonGroup>

      {/* 상품정보 */}
      <StDivProductListControlPanelButtonGroup className="product-modify">
        <div className="group-title"><b>상품 편집</b>:</div>
        <div className="group-item button-wrapper">
          <StButtonProductListControlPanel
            className={`modify-profile ${checkedProductIdSet.size === 1 ? 'active' : ''}`}
            onClick={() => {
              if(checkedProductIdSet.size !== 1) {
                return;
              }
              const modalContent = (
                <ProductModificationModal {...{
                  setCheckedProductIdSet: setCheckedProductIdSet,
                  productId: checkedProductIdSet.values().next().value,
                  productGroupsArr: productGroupsArr,
                  setProductGroupsArr: setProductGroupsArr,
                  modalHandler: modalHandler,
                }
                 } />
              );
              modalHandler.setModalFlexibleCloseBtn(false);
              modalHandler.setModalContent(modalContent);
              modalHandler.modalOpen(true);
            }}
          >
            정보 수정
          </StButtonProductListControlPanel>
          <StButtonProductListControlPanel
            className={`modify-delete ${checkedProductIdSet.size > 0 ? 'active' : ''}`}
            onClick={() => handleCtrlPanelBtnClick({
              ...props,
              apiFunc: () => apiStaff.deleteProduct(Array.from(checkedProductIdSet)),
              statusFunAttrs: statusFunAttrs,
            })}
          >
            삭제
          </StButtonProductListControlPanel>
        </div>
      </StDivProductListControlPanelButtonGroup>
    </StDivProductListControlPanel>
  );
}

export default ProductListControlPanel;
