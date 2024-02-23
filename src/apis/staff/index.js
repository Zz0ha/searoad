// wildcard importing으로 api 폴더 내의 모든 파일을 불러와서 all export 하면 좋을텐데.. 아래 방식 정도밖에 안되네
// import * as apiProduct from './product';
// import * as apiOrder from './order';

// export {
//   apiProduct,
//   apiOrder,
// };


// 일일히 export 해본다..
// 그리고 사용하는 곳에서는 import * as apiStaff from 'apis/staff'; 로 사용한다.
import {
  addProducts,
  getProductsAll,
  changeProductStatus,
  deleteProduct,
} from './product';

import {
  changeStockAmount,
} from './inventory';

import {
  getOrdersWithQuery,
  putOrderGroupStatus,
} from './order';

import { postConfirmOrder } from './confirmOrder';

import {
  searchProductWithKeyword,
} from './search';

import {
  getDefectsAll,
  postDefectToReceived,
  postDefectToConfirmed,
} from './defect';

import {
  postPaymentRefundOfDefect,
  putPaymentDirectChange,
} from './payment';

export {
  // Product
  addProducts,
  getProductsAll,
  changeProductStatus,
  deleteProduct,
  // Inventory
  changeStockAmount,
  // Order
  getOrdersWithQuery,
  putOrderGroupStatus,
  postConfirmOrder,
  // Search
  searchProductWithKeyword,
  // Defect
  getDefectsAll,
  postDefectToReceived,
  postDefectToConfirmed,
  // Payment
  postPaymentRefundOfDefect,
  putPaymentDirectChange,
}
