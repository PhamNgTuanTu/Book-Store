import parse from "html-react-parser";
import React from "react";

function AuthorTitle(props) {
  const { data, loading } = props;
  return (
    <>
      {loading ? (
        <div className="book-update__content1 author-update mb-4 w-100">
          <div className="card-product is-loading d-flex">
            <div className="col-lg-3 col-md-3 col-sm-6 author-detail-img background-color h-100">
              <div
                className="image-product"
                style={{ width: "100%", height: "210px" }}
              ></div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12 background-color">
              <div className="author-detail-title">
                <div className="content-product">
                  <span></span>
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {data ? (
            <div className="book-update__content1 author-update mb-4 w-100">
              <div className="col-lg-3 col-md-3 col-sm-6 author-detail-img background-color h-100 d-flex align-items-center justify-content-center">
                <img
                  className="big wow fadeInUp animated img-author-av"
                  data-wow-duration="1s"
                  data-wow-delay=".3s"
                  src={`${process.env.REACT_APP_API_URL}/images/${data.image}`}
                  alt="Đang tải ..."
                  height="210px"
                />
              </div>
              <div className="col-lg-9 col-md-12 col-sm-12 background-color h-100">
                <div className="author-detail-title">
                  <h4
                    className="big wow fadeInUp animated"
                    data-wow-duration="1s"
                    data-wow-delay=".3s"
                  >
                    {data.name}
                  </h4>
                  <div
                    className="big wow fadeInUp animated featured-author featured-author2 position-relative text-author"
                    data-wow-duration="1s"
                    data-wow-delay=".3s"
                    id="style-15"
                  >
                    {parse(data.description)}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default AuthorTitle;
