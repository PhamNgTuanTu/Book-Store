import React from 'react';

function Paginate(props) {
    return (
        <div className="pgn">
            <ul className="page">
                <li className="page__btn"><i className="fas fa-angle-left" /></li>
                <li className="page__numbers">1</li>
                <li className="page__numbers active">2</li>
                <li className="page__numbers">3</li>
                <li className="page__numbers">4</li>
                <li className="page__dots">...</li>
                <li className="page__numbers">10</li>
                <li className="page__btn"><i className="fas fa-angle-right" /></li>
            </ul>
        </div>
    );
}

export default Paginate;