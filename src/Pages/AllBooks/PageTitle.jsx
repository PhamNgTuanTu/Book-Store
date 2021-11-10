import React from "react";

function PageTitle(props) {
  const { onChangeSort } = props;
  return (
    <div className="product__page__title">
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-6">
          <div className="grid-product-title">
            <h4>Tất cả sách</h4>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6">
          <div className="product__page__filter">
            <p>Order by:</p>
            <select onChange={onChangeSort}>
              <option value={1}>A-Z</option>
              <option value={2}>Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageTitle;
