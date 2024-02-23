import React from "react";

function CheckboxInput() {
  return (
    <li className="">
      <input type="checkbox" id="ageCheck" />
      <label htmlFor="ageCheck">[필수] 본인은 만 14세 이상입니다.</label>
    </li>
  );
}

export default CheckboxInput;
