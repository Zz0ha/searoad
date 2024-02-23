import { getCSRF } from 'apis/csrf';

//상품등록
export const addProducts = async (payload) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/products/`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    }
  );
  return response;
};

// 상품 조회
export const getProductsAll = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/product-groups/`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  ).then((res) => res.json());
  return response;
}

// 상품 정보 변경
export const changeProductProfile = async (props) => {
  let {
    productId,
    apiPayload,
  } = props;

  let {
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
  } = apiPayload;

  const token = await getCSRF();

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/products/${productId}/profile/`,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'name': name,
        'category': category,
        'currency_code': currencyCode,
        'volume_code': volumeCode,
        'preservation_type': preservationType,
        'production_type': productionType,
        'origin_country': originCountry,
        'image_meta': JSON.stringify({
          'thumbnail_url': thumbnailUrl,
        }),
        'display_priority': displayPriority,
        'entity_size_code': entitySizeCode,
        'min_size_of_entity': minSizeOfEntity,
        'max_size_of_entity': maxSizeOfEntity,
        'price_per_volume': pricePerVolume,
        'description': description,
      }),
    }
  );
  return response;
}

// 상품 상태 변경
export const changeProductStatus = async (ids, statusName, statusValue) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/products/`,
    {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'product_ids': ids,
        'attribute': 'status',
        'data': {
          [statusName]: statusValue,
        },
      }),
    }
  );
  return response;
}

// 상품 삭제
export const deleteProduct = async (ids) => {
  const token = await getCSRF();
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/staff/products/`,
    {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': token,
      },
      credentials: 'include',
      body: JSON.stringify({
        'product_ids': ids,
      }),
    }
  );
  return response;
}
