import { getCSRF } from 'apis/csrf';

export const changeStockAmount = async (ids, amount) => {
  const data = []
  ids.forEach((id) => {
    data.push({
      inventory_name: 'default',
      product_id: id,
      action: 'set_current',
      quantity: parseInt(amount),
    })
  });

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
        'attribute': 'stock',
        'data': data,
      }),
    }
  );
  return response;
}
