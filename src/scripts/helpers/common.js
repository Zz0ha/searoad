export const reverseFindConstantText = (constantTarget, codeVal) => {
  const obj = constantTarget.find(o => o.value === codeVal);
  return obj?.text;
}

export const convertGToKg = (gramValue) => {
  if(gramValue < 1000) {
    return gramValue +'g';
  } else {
    return (gramValue / 1000) + 'kg';
  }
}
