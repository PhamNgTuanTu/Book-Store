import React from 'react';
import { Link } from 'react-router-dom';

Breadcrumb.propTypes = {
    
};

function Breadcrumb(props) {
    var { result } = props;
    const refreshPage = () => {
        window.location.reload();
    }
    return (
        <section className="breadcrumb-cate">
            <div className="container">
                <div className="row">
                    <div className="col-12 p-0">
                        <ul id="breadcrumb">
                            <li>
                                <Link to="/"><i className="fa fa-home" aria-hidden="true" style={{ marginRight: 5 }} />
                                    <span className="pgn-home">Trang Chủ</span> </Link>
                            </li>
                            <li>
                                <Link to="#" onClick={refreshPage}><i className="fas fa-align-center" style={{ marginRight: 5 }} />
                                    <span className="pgn-cate">Thể Loại</span> </Link>
                            </li>
                            <li>
                                <Link to={`/c${result.category.id}/${result.category.slug}`}><i className="fas fa-book" style={{ marginRight: 5 }} />
                                    <span className="pgn-cate-item">{result.category.name}</span> </Link>
                            </li>
                            <li>
                                <Link to="#" onClick={refreshPage} style={{ marginRight: 5 }}>
                                    <i className="fas fa-book-open" />
                                    <p>{result.name}</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Breadcrumb;