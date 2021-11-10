import React from 'react';

function Info() {
    const refreshPage = () => {
        window.location.reload();
    }
    return (
        <section className="info-header" id="menu-mobile">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <ul className="list-info">
                            <li>
                                <i className="fas fa-truck big wow headShake animated" data-wow-duration="5s" data-wow-delay=".3s" data-wow-iteration="infinite" />
                                <span>Giao Hàng Nhanh</span>
                                <div className="info-header__content">
                                    <p>Giao hàng đến mọi miền của tổ quốc với chính sách ưu đãi</p>
                                </div>
                            </li>
                            <li>
                                <i className="fas fa-book-open big wow animated jello" data-wow-duration="5s" data-wow-delay=".3s" data-wow-iteration="infinite" />
                                <span>5.000 Tựa Sách</span>
                                <div className="info-header__content">
                                    <p>
                                        Với hơn 5,000 đầu sách trong mọi lĩnh vực (và tiếp tục tăng
                                        mỗi ngày), tự hào là nhà sách trên mạng có số lượng đầu sách
                                        lớn nhất Việt Nam, bạn có thể tìm được bất kỳ quyển sách nào
                                        cho mọi nhu cầu đọc sách của bạn.
                                    </p>
                                </div>
                            </li>
                            <li onClick={refreshPage}>
                                <i className="fab fa-audible big wow animated tada" data-wow-duration="5s" data-wow-delay=".3s" data-wow-iteration="infinite" />
                                <span>StaciaBook</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Info;