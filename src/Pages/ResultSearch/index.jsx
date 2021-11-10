import queryString from "query-string";
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
import { setDataSearch, setParamsSearch } from "../../store/search";
import Breadcrumb from "./BreadSearch";
import PageTitle from "./PageTitle";
import Product from "./Product";

ResultSearch.propTypes = {};

function ResultSearch(props) {
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { dataSearch, paramsSearch, totalResult, curentPage } = useSelector(
    (state) => ({
      dataSearch: state.search.data,
      paramsSearch: state.search.params,
      totalResult: state.search.totalPage,
      curentPage: state.search.curentPage,
    })
  );
  const [loading, setLoading] = useState(false);
  const totalPageCount = Math.ceil(totalResult / 12);
  const [page, setPage] = useState(0);
  const { search } = useLocation();
  const parsed = queryString.parse(search);

  const LoadData = async () => {
    setLoading(true);
    try {
      let response = null;
      if (JSON.stringify(parsed) !== "{}") {
        response = await homeApi.search(paramsSearch, page);
        dispatch(setParamsSearch(paramsSearch));
        dispatch(setDataSearch(response));
      }
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
    if (valueSort === 1) {
      let arr = [...dataSearch];
      setDataSort(arr.sort(sortAZ));
    } else {
      let arr = [...dataSearch];
      setDataSort(arr.sort(sortZA));
    }
  }, [dataSearch, valueSort]);

  useEffect(() => {
    if (paramsSearch === "") {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [paramsSearch]);

  useEffect(() => {
    LoadData();
    return () => {
      setLoading(false);
    };
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
                <PageTitle
                  data={paramsSearch}
                  dataResult={dataSearch}
                  result={totalResult}
                  onChangeSort={onChangeSort}
                />
                <Product data={dataSort} loading={loading} />
                {loading ? null : dataSearch.length > 0 ? (
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

export default ResultSearch;
