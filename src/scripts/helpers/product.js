import * as constSet from 'constants/index';
import { reverseFindConstantText } from './common';

export const getPrettyProductGroupIdentity = (productGroup) => {
  const p_origin_country = productGroup.origin_country;
  const p_production_type = reverseFindConstantText(constSet.ProductionTypeArr, productGroup.production_type);
  const p_preservation_type = reverseFindConstantText(constSet.PreservationTypeArr, productGroup.preservation_type);
  return `[${p_origin_country}] [${p_production_type}] [${p_preservation_type}]`;
}

export const getPrettyProductName = (product, excludeName=false) => {
  const p_entity_size_str = `${product.entity_size_str}`;
  const p_identity = getPrettyProductGroupIdentity(product);
  if (excludeName) {
    return ` ${p_identity} (${p_entity_size_str})`;
  } else {
    const p_name = product.name;
    return `${p_identity} ${p_name} (${p_entity_size_str})`;
  }
}

export const getPrettyProductNameArrFromGroup = (productGroup) => {
  const p_name = productGroup.name;
  const p_origin_country = productGroup.origin_country;
  const p_production_type = reverseFindConstantText(constSet.ProductionTypeArr, productGroup.production_type);
  const p_preservation_type = reverseFindConstantText(constSet.PreservationTypeArr, productGroup.preservation_type);
  const prettyProductNameArr = productGroup.products.map(p => {
    return getPrettyProductName({
      ...p,
      name: p_name,
      origin_country: p_origin_country,
      production_type: p_production_type,
      preservation_type: p_preservation_type,
    });
  });
  return prettyProductNameArr
}
