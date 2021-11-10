import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Col, Row } from "reactstrap";
import homeApi from "../../Api/homeAPI";
import Effect from "../../components/Layout/Effect";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Info from "../../components/Layout/Info";
import Search from "../../components/Layout/Search";
import sortAZ from "../../components/Sort/SortAZ";
import sortZA from "../../components/Sort/SortZA";
import { setDataAllBook } from "../../store/books";
import Breadcrumb from "./BreadSearch";
import PageTitle from "./PageTitle";
import Product from "./Product";

AllBooks.propTypes = {};

function AllBooks(props) {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { data, totalResult, curentPage } = useSelector((state) => ({
    data: state.allbooks.data,
    totalResult: state.allbooks.totalPage,
    curentPage: state.allbooks.curentPage,
  }));
  const [loading, setLoading] = useState(false);
  const totalPageCount = Math.ceil(totalResult / 12);
  const [page, setPage] = useState(0);

  const LoadData = async () => {
    setLoading(true);
    try {
      const response = await homeApi.getAllBooks(page);
      dispatch(setDataAllBook(response));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    let pageIndex = page.selected;
    setPage(Number(pageIndex) + 1);
    const url = `${pathname}?page=${Number(pageIndex) + 1}`;
    history.push(url);
  };

  const [dataSort, setDataSort] = useState([]);
  const [valueSort, setValuSort] = useState(1);
  const onChangeSort = (e) => {
    setValuSort(Number(e.target.value));
  };

  useEffect(() => {
    if (JSON.stringify(data) !== "[]" && data.length > 0) {
      if (valueSort === 1) {
        let arr = [...data];
        setDataSort(arr.sort(sortAZ));
      } else {
        let arr = [...data];
        setDataSort(arr.sort(sortZA));
      }
    }
  }, [data, valueSort]);

  useEffect(() => {
    LoadData();
    // eslint-disable-next-line
  }, [page]);
  return (
    <>
      <MetaTags>
        <title>StaciaBook - Tìm kiếm sách</title>
      </MetaTags>
      <Effect />
      <Info />
      <Header />
      <Search />
      <div>
        <Breadcrumb />
        <section className="grid-product">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <PageTitle data={data} onChangeSort={onChangeSort} />
                <Product data={dataSort} loading={loading} />
                {loading ? null : data.length > 0 ? (
                  <Row>
                    <Col className="d-flex align-items-baseline justify-content-center">
                      <div className="mr-2">
                        <span>{`Trang ${curentPage}/${totalPageCount}`}</span>
                      </div>
                      <div>
                        <ReactPaginate
                          pageCount={totalPageCount}
                          forcePage={curentPage - 1}
                          onPageChange={handlePageChange}
                          disabledClassName="d-none"
                          previousLabel=""
                          nextLabel=""
                          breakLabel="..."
                          breakClassName="break-me"
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          subContainerClassName="pgn"
                          breakLinkClassName="page__dots"
                          containerClassName="page mt-4"
                          pageClassName="page__numbers"
                          pageLinkClassName="page__numbers-link"
                          previousClassName="page__btn"
                          previousLinkClassName="page__btn page__numbers-link page__btn-link-pre"
                          nextClassName="page__btn"
                          nextLinkClassName="page__btn page__numbers-link page__btn-link-next"
                          activeClassName="active"
                        />
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AllBooks;
