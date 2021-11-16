import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({
  path,
  children,
  Component,
  ...restProps
}) {
  const { shipper } = useSelector((state) => state.shipper);

  return shipper?.token ?
    (
      <Route path={path} component={Component} {...restProps} />
    )
    :
    (
      <>
        <Redirect to="/dang-nhap-giao-hang" />
      </>
    );
}