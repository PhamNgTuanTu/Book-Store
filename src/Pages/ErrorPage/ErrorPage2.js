import React from 'react';
import { MetaTags } from 'react-meta-tags';
import { Col, Row } from 'reactstrap';
import Footer from '../../components/Layout/Footer';
import HeaderLogo from '../../components/Layout/HeaderLogo';
import Info from '../../components/Layout/Info';

function ErrorPage2(props) {
    return (
        <>
            <MetaTags>
                <title>StaciaBook - Not Found</title>
            </MetaTags>
            <Info />
            <HeaderLogo />
            <div className="container">
                <Row>
                    <Col md="12" xl="6" className="d-flex align-items-center justify-content-center">
                        <div className="number">404</div>
                    </Col>
                    <Col md="12" xl="6" className="d-flex align-items-center justify-content-center">
                        <div className="text"><span>Ooops...</span><br></br>Không tìm thấy trang</div>
                    </Col>
                </Row>

            </div>
            <Footer />
        </>
    );
}

export default ErrorPage2;