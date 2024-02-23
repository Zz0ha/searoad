import React from 'react';

const handleCheck = (
  e,
  checkBoxId,
  checkBoxIdSet,
  setCheckBoxIdSet,
) => {
  const nextCheckedOrNot = !checkBoxIdSet.has(checkBoxId);
  if (nextCheckedOrNot) {
    checkBoxIdSet.add(checkBoxId);
  } else {
    checkBoxIdSet.delete(checkBoxId);
  }
  setCheckBoxIdSet(new Set(checkBoxIdSet));
};

export default function CheckBox({
  checkBoxId,
  checkBoxIdSet,
  setCheckBoxIdSet,
}) {
  return (<>
    <input
      id={checkBoxId}
      type="checkbox"
      checked={checkBoxIdSet.has(checkBoxId)}
      onChange={(e) => handleCheck(e, checkBoxId, checkBoxIdSet, setCheckBoxIdSet)}
    >
    </input>
    <label htmlFor={checkBoxId}></label>
  </>);
};
