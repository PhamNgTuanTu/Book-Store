import React from 'react';
import {Link} from 'react-router-dom';
import { useContext } from 'react'
import { DataContext } from '../../Data/DataProvider'


function percentage(num, per) {
    return (num / 100) * per;
}
function BookPopular(props) {

    const value = useContext(DataContext)
    const [products] = value.products

    // tìm tên tác giả
    const [author] = value.authors
    function nameAuthor(id) {
        return author.find(element => Number(element.id) === id);
    }

    return (
        <>
            <section className="book-new-update">
                <div className="container">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="main-book-list-product position-relative">
                                <h4 className="tittle pt-2 big wow jello animated" data-wow-duration="2s" data-wow-delay=".3s" data-wow-iteration={3}>
                                    Sách Phổ Biến
                                </h4>
                                <div className="view-all">
                                    <a href="#!">Xem Tất Cả
                                        <i className="fas fa-angle-double-right" />
                                    </a>
                                </div>
                                <div className="main-book-product">
                                    {
                                        products.map(product => (
                                            <div key={product.id} className="product big wow fadeInRightBig animated" data-wow-duration="1s" data-wow-delay=".3s">
                                                <Link to={`/chi-tiet/${product.slug}-i${product.id}`} className="full-item"> </Link>
                                                <div className="book-product__detail">
                                                    <img src={product.image} alt={product.image} width={135} height={181} />
                                                    <div className="book-product__detail-content"><a href="#!">
                                                    </a><a title={product.name} href="#!">{product.name}</a>
                                                        <h6>{nameAuthor(product.author).name}</h6>
                                                        <p className="hide-content">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="book-product__content-price">
                                                    <div className="book-product__content-price_sale position-relative ">
                                                        <div className="book-product-left">
                                                            <span className="discount">-{product.discount}%</span>
                                                        </div>
                                                        <div className="book-product-right">
                                                            <span>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                            <span>{(product.price - (percentage(product.price, product.discount))).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default BookPopular;