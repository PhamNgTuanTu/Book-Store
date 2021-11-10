import queryString from "query-string";
import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import authorApi from "../../Api/authorApi";
import { setDataSachTheoTacGia } from "../../store/author";
import ErrorPage from "../ErrorPage/ErrorPage";
import AuthorTitle from "./AuthorTitle";
import Breadcrumb from "./BreadcrumAuthor";
import AuthorControl from "./AuthorControl";
import Product from "./Products";
import { Col, Row } from "reactstrap";
import Effect from "../../components/Layout/Effect";
import Info from "../../components/Layout/Info";
import Header from "../../components/Layout/Header";
import Search from "../../components/Layout/Search";
import Footer from "../../components/Layout/Footer";
import sortAZ from "../../components/Sort/SortAZ";
import sortZA from "../../components/Sort/SortZA";

Author.propTypes = {};

function Author(props) {
  const { idtacgia } = useParams();
  const history = useHistory();
  const { pathname } = useLocation();
  const { search } = useLocation();
  const parsed = queryString.parse(search);

  const dispatch = useDispatch();
  const { data, dataAuthor, totalPage, curentPage } = useSelector((state) => ({
    data: state.authors.dataSachTheoTacGia,
    dataAuthor: state.authors.dataAthor,
    totalPage: state.authors.totalPage,
    curentPage: state.authors.curentPage,
  }));
  const [title, settitle] = useState("Đang tải ...");
  const [isNumber, setIsNumber] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const totalPageCount = Math.ceil(totalPage / 10);

  const LoadData = async () => {
    let idNew = idtacgia.slice(1);
    if (idNew % idNew === 0) {
      setIsNumber(true);
      setLoading(true);
      try {
        let response = null;
        if (JSON.stringify(parsed) !== "{}") {
          response = await authorApi.getListSachTheoPage(idNew, parsed.page);
        } else {
          response = await authorApi.getListSachTheoAuthor(idNew);
        }
        dispatch(setDataSachTheoTacGia(response));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    } else {
      setIsNumber(false);
      setLoading(false);
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
      let arr = [...data];
      setDataSort(arr.sort(sortAZ));
    } else {
      let arr = [...data];
      setDataSort(arr.sort(sortZA));
    }
  }, [data, valueSort]);

  useEffect(() => {
    if (JSON.stringify(dataAuthor) !== "[]") {
      settitle(dataAuthor.name);
    }
  }, [dataAuthor]);

  useEffect(() => {
    LoadData();
    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, [page]);
  return (
    <>
      <Effect />
      <Info />
      <Header />
      <Search />
      {isNumber ? (
        <>
          <MetaTags>
            <title>StaciaBook - {title}</title>
          </MetaTags>
          <Breadcrumb data={dataAuthor} />
          <section className="grid-product">
            <div className="container">
              <div className="row">
                <AuthorTitle
                  loading={loading}
                  data={JSON.stringify(dataAuthor) !== "[]" ? dataAuthor : null}
                />
              </div>
              <div className="row">
                <div className="col-12">
                  <AuthorControl
                    data={dataAuthor}
                    onChangeSort={onChangeSort}
                  />
                  <Product data={dataSort} loading={loading} />
                </div>
              </div>
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
          </section>
        </>
      ) : (
        <ErrorPage />
      )}
      <Footer />
    </>
  );
}

export default Author;
