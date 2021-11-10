import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import detailsApi from "../../Api/detailsAPI";
import { setDataDetails, setLoadingDetails } from "../../store/details";
import ErrorPage from "../ErrorPage/ErrorPage";
import Breadcrumb from "./Breacump";
import InfoDetailBook from "./detailInFoBook";
import DetailBook from "./DetailsBook";
import Loading from "./Loading";
import ListProduct from "./ListProduct";
import categoryApi from "../../Api/categoryApi";
import { setDataSachTheoTheLoai } from "../../store/categorys";
import Effect from "../../components/Layout/Effect";
import Info from "../../components/Layout/Info";
import Header from "../../components/Layout/Header";
import Search from "../../components/Layout/Search";
import Footer from "../../components/Layout/Footer";

function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

function Details(props) {
  const dispatch = useDispatch();
  //lấy id từ url
  let match = useRouteMatch();
  var id = match.params.id;
  const { storeData, dataSachThem } = useSelector((state) => ({
    storeData: state.details.data,
    dataSachThem: state.categorys.dataSachTheoTheLoai,
  }));
  const [dataFiler, setDataFilter] = useState([]);

  const [title, settitle] = useState("Đang tải ...");
  // cắt chuỗi với dấu -
  const arString = id.split("-");

  // lấy phần tử cuối
  const arLastAray = arString.slice(-1)[0];

  // cắt chuỗi bỏ đi .html
  const arLastArayNew = arLastAray.split(".");

  // lấy phần tử đầu
  const idold = arLastArayNew.slice(0, 1)[0]; // i + id

  // lấy được id của sản phẩm
  const idNew = idold.slice(1);

  const [loading, setLoading] = useState(false);

  const loadData = async (id) => {
    if (isNumber(id)) {
      setLoading(true);
      try {
        const response = await detailsApi.getSachTheoId(id);
        dispatch(setDataDetails(response.data));
        dispatch(setLoadingDetails(false));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const loadDataCungLoai = async (id) => {
    try {
      const res = await categoryApi.getListSachTheoCate(id);
      dispatch(setDataSachTheoTheLoai(res));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isNumber(idNew)) {
      const result = dataSachThem.filter((x) => Number(x.id) !== Number(idNew));
      setDataFilter(result);
    }
    // eslint-disable-next-line
  }, [dataSachThem]);

  useEffect(() => {
    if (JSON.stringify(storeData) !== "[]") {
      settitle(storeData.name);
      loadDataCungLoai(storeData.category.id);
    }
    // eslint-disable-next-line
  }, [storeData]);

  useEffect(() => {
    loadData(idNew);
    if (JSON.stringify(storeData) !== "[]") {
      settitle(storeData.name);
    }
    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, [idNew]);

  return (
    <>
      <MetaTags>
        <title>StaciaBook - {title}</title>
      </MetaTags>
      <Effect />
      <Info />
      <Header />
      <Search />
      {loading ? (
        <Loading />
      ) : (
        <>
          {isNumber(idNew) && JSON.stringify(storeData) !== "[]" ? (
            <>
              <Breadcrumb result={storeData} />
              <DetailBook result={storeData} />
              <InfoDetailBook result={storeData} />
              <ListProduct
                data={JSON.stringify(dataFiler) !== "[]" ? dataFiler : null}
              />
            </>
          ) : (
            <ErrorPage />
          )}
        </>
      )}
       <Footer />
    </>
  );
}

export default Details;
