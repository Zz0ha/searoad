const BooleanItem = (props) => {
  const booleanValue = props.booleanValue;
  return (
    <div
      className={`boolean-item ${booleanValue?"boolean-item__true":"boolean-item__false"}`}
      style={{
        margin: "0 auto",
        width: "9px",
        height: "9px",
        backgroundColor: booleanValue ? `rgba(0, 128, 0)` : `rgba(128, 128, 128, 30%)`,
        borderRadius: "50%",
      }}
    />
  )
}

export default BooleanItem;
