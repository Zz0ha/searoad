import React from "react";

const handleCheck = (
  e,
  checkedAll, setCheckedAll,
  checkBoxIdCandidates, checkBoxIdSet, setCheckBoxIdSet,
) => {
  const nextCheckedAll = !checkedAll;
  if (nextCheckedAll) {
    checkBoxIdCandidates.forEach((checkBoxId) => {
      checkBoxIdSet.add(checkBoxId);
    });
  } else {
    checkBoxIdCandidates.forEach((checkBoxId) => {
      checkBoxIdSet.delete(checkBoxId);
    });
  }
  setCheckedAll(nextCheckedAll);
  setCheckBoxIdSet(new Set(checkBoxIdSet));
};

export default function OrderGroupCheckBoxAll({
  checkBoxIdCandidates,
  checkBoxIdSet,
  setCheckBoxIdSet,
}) {
  const [checkedAll, setCheckedAll] = React.useState(false);

  return (<>
    <input
      id="orderGroupCheckBoxAll"
      type="checkbox"
      checked={checkedAll}
      onChange={(e) => handleCheck(e, checkedAll, setCheckedAll, checkBoxIdCandidates, checkBoxIdSet, setCheckBoxIdSet)}
    ></input>
    <label htmlFor="orderGroupCheckBoxAll" />
  </>);
}
