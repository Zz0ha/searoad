import React, { useEffect } from "react";

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

export default function CheckBoxAll({
  checkBoxId,
  checkBoxIdCandidates,
  checkBoxIdSet,
  setCheckBoxIdSet,
  labelComponent,
}) {
  const [checkedAll, setCheckedAll] = React.useState(false);

  useEffect(() => {
    const totalSize = checkBoxIdCandidates.length;
    const checkedSize = checkBoxIdSet.size;
    if (totalSize === checkedSize) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checkBoxIdCandidates, checkBoxIdSet]);

  return (<>
    <input
      id={`${checkBoxId}`}
      type="checkbox"
      checked={checkedAll}
      onChange={(e) => handleCheck(e, checkedAll, setCheckedAll, checkBoxIdCandidates, checkBoxIdSet, setCheckBoxIdSet)}
    ></input>
    {
      labelComponent ?
      (
        labelComponent
      ) :
      (
        <label htmlFor={`${checkBoxId}`} />
      )
    }
  </>);
}
