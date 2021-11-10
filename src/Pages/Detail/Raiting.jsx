import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import reviewAPI from "../../Api/reviewAPI";

Raiting.propTypes = {};

function Raiting(props) {
  const { data } = props;
  const [point, setPoint] = useState(0);
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
    if (JSON.stringify(data) !== "[]" && data) {
      try {
        const res = await reviewAPI.getReview(data.id);
        const resPoint = await reviewAPI.getReviewPoint(data.id);
        setPoint(Math.round(Number(resPoint.data.average) * 10) / 10);
        setResData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const loadStart = (sl) => {
    let arr = [0, 0, 0, 0, 0];
    for (let i = 0; i < sl; i++) {
      arr[i] = 1;
    }
    return arr.map((val, i) => {
      return (
        <React.Fragment key={i}>
          {val === 1 ? (
            <i className="fas fa-star mx-1" style={{ color: "#ff3f3f" }}></i>
          ) : (
            <i className="far fa-star mx-1" style={{ color: "#ff3f3f" }}></i>
          )}
        </React.Fragment>
      );
    });
  };
  useEffect(() => {
    loadData();
    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <h5>Đang tải nhận xét ...</h5>
      ) : (
        <>
          {JSON.stringify(resData) !== "[]" && resData.length > 0 ? (
            <>
              <h5>Đánh giá bình luận</h5>
              <div
                className="d-flex align-items-baseline justify-content-start mt-3"
                style={{ marginLeft: "20px" }}
              >
                <h4>
                  <strong>
                    {point} <i className="fas fa-star"></i>
                  </strong>
                </h4>
                <span className="ml-2">
                  trên 5.0 <i className="far fa-star"></i>
                </span>
              </div>
              <div className="row justify-content-between mt-3">
                <div className="col-12 mx-2">
                  <Row>
                    <Col className="mx-4">
                      <Card
                        outline
                        color="info"
                        body
                        className="pt-0 card-review"
                        id="style-15"
                      >
                        {JSON.stringify(resData) !== "[]" && resData.length > 0
                          ? resData.map((val, i) => {
                              return (
                                <Row key={i} className="mt-3 border-review">
                                  <Col className="d-flex align-items-center">
                                    {val.user.image ? (
                                      <div className="gr-image-raiting">
                                        <img
                                          className="image-raiting-user"
                                          src={`${process.env.REACT_APP_API_URL}/images/${val.user.image}`}
                                          alt="Đang tải ..."
                                        />
                                      </div>
                                    ) : (
                                      <div className="gr-image-raiting-null">
                                        <i className="fas fa-user-circle"></i>
                                      </div>
                                    )}
                                    <div className="ml-3 d-flex flex-column align-items-start">
                                      <h6 className="ml-1">
                                        <em>{val.user.name}</em>
                                      </h6>
                                      <span className="d-flex align-items-center mt-2">
                                        {loadStart(Number(val.rating))}
                                      </span>
                                      <span
                                        className="d-flex align-items-center mt-2 ml-1"
                                        style={{ fontSize: "13px" }}
                                      >
                                        {val.created_at}
                                      </span>
                                      <h6 className="mt-2">
                                        <i>{val.comment}</i>
                                      </h6>
                                    </div>
                                  </Col>
                                </Row>
                              );
                            })
                          : null}
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </>
          ) : (
            <h5>Chưa có đánh giá !</h5>
          )}
        </>
      )}
    </>
  );
}

export default Raiting;
