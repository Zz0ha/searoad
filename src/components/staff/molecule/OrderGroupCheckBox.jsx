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

export default function OrderGroupCheckBox({
  checkBoxId,
  checkBoxIdSet,
  setCheckBoxIdSet,
}) {
  // 본 컴포넌트는 `checked` 속성값을 컴포넌트 내부의 상태값으로 관리하지 않는다.
  // `checked` 속성값은 부모 컴포넌트로부터 전달받은 `checkBoxIdSet`의 상태값에 따라 결정된다.
  // 그 이유는, 여러 개의 checkbox를 부모 컴포넌트에서 관리하기 위함이다.
  // 이렇게 함으로써, 부모 컴포넌트는 모든 checkbox의 상태값을 한번에 선택/해제할 수 있다.
  // 대신에 상태값의 변경 마다 리렌더링이 발생하므로, 성능상의 문제가 발생할 수 있다.
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
