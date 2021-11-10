import React from "react";

function BookComming(props) {
  return (
    <>
      <section className="comming-soon-book">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="main-book-update mt-4">
                <h4
                  className="tittle big wow jello animated"
                  data-wow-duration="2s"
                  data-wow-delay=".3s"
                  data-wow-iteration={3}
                >
                  Đặt Trước
                </h4>
                <div className="main-book-update-detail2">
                  <div className="book-update__content">
                    <img src="assets/images/product/product1.jpg" alt="" />
                    <div className="book-update__content-description">
                      <div className="book-update__content-title">
                        <span>Yêu Em Bằng Mắt, Giữ Em Bằng Tim</span>
                        <h5>Dương Thụy</h5>
                        <p>
                          Phương đã từng có một tình yêu trong trẻo tinh khôi ở
                          tuổi 18 với Trung - người trợ lý tài giỏi, trung thành
                          của bà nội. Nhưng họ sớm bị chia cắt khi Phương qua
                          Pháp đoàn tụ với mẹ, và mất liên lạc trong 10 năm ròng
                          rã. Định mệnh cuối cùng cũng cho họ gặp nhau, giải tỏa
                          những hiểu lầm và nối lại mối duyên xưa. Nhưng thách
                          thức vẫn chưa hết. Một lần nữa, Phương và Trung phải
                          đứng trước lựa chọn nắm tay hoặc buông nhau
                          ra...Truyện diễn ra với bối cảnh Pháp và Việt Nam, với
                          những phân đoạn tả cảnh tả tình lãng mạn bay bổng,
                          những phút bên nhau
                        </p>
                      </div>
                      <div className="book-update__content-price">
                        <div className="content-price_sale">
                          <span className="discount">-17%</span>
                          <span>199.000 đ</span>
                          <span>165.000 đ</span>
                        </div>
                        <button
                          className="big wow pulse animated"
                          data-wow-duration="2s"
                          data-wow-delay="1s"
                          data-wow-iteration="infinite"
                        >
                          Đăng ký nhận thông tin khi có sản phẩm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookComming;
