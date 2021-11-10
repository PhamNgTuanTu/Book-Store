import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useDispatch, useSelector } from "react-redux";
import homeApi from "../../Api/homeAPI";
import Effect from "../../components/Layout/Effect";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Info from "../../components/Layout/Info";
import Search from "../../components/Layout/Search";
import {
  setData,
  setDataAuthor,
  setDataDisMost,
  setDataSachRanDom,
  setDataSlider,
  setLoadingAuthor,
  setLoadingDisMost,
  setLoadingSachRanDom,
  setLoadingSachUpdate,
  setLoadingSilder
} from "../../store/home";
import BookIsDisCount from "./BookIsDisCount";
import BookNewUpdate from "./BookNewUpdate";
import BookRanDom from "./BookRanDom";
import HighlightsAuthor from "./HighlightsAuthor";
import Slider from "./Slider";

TrangChu.propTypes = {};

function TrangChu(props) {
  const dispatch = useDispatch();
  const {
    dataSlider,
    loadingSlider,
    loadingSachUpdate,
    dataSachUpdate,
    dataSachRanDom,
    loadingSachRanDom,
    dataDisCount,
    loadingDisCount,
    dataAuthor,
    dataBookOfAuthor,
    loadingAuthor,
  } = useSelector((state) => ({
    dataSlider: state.home.dataSlider,
    loadingSlider: state.home.loadingSlider,
    loadingSachUpdate: state.home.loadingUpdate,
    dataSachUpdate: state.home.dataSachMoiCapNhat,
    dataSachRanDom: state.home.dataSachRanDom,
    loadingSachRanDom: state.home.loadingSachRanDom,
    dataDisCount: state.home.dataDisMost,
    loadingDisCount: state.home.loadingDisMost,
    dataAuthor: state.home.dataAuthor,
    loadingAuthor: state.home.loadingAuthor,
    dataBookOfAuthor: state.home.dataBookOfAuthor,
  }));

  const LoadData = async () => {
    try {
      //slider
      const res = await homeApi.getListSlider();
      dispatch(setDataSlider(res.data));
      dispatch(setLoadingSilder(false));

      //Sách giảm giá cao
      const resDisCount = await homeApi.getBooksMostDiscount();
      dispatch(setDataDisMost(resDisCount.data));
      dispatch(setLoadingDisMost(false));

      //sách mới cập nhật
      const resBooks = await homeApi.getSachMoiCapNhat(6);
      dispatch(setData(resBooks.data));
      dispatch(setLoadingSachUpdate(false));

      //tác giả nổi bật
      const resAuthor = await homeApi.getAuthorNoiBat();
      dispatch(setDataAuthor(resAuthor));
      dispatch(setLoadingAuthor(false));

      //sách random
      const resSachRanDom = await homeApi.getBooksRanDom(6);
      dispatch(setDataSachRanDom(resSachRanDom.data));
      dispatch(setLoadingSachRanDom(false));
    } catch (error) {
      console.error(error);
      dispatch(setLoadingSilder(false));
      dispatch(setLoadingDisMost(false));
      dispatch(setLoadingSachUpdate(false));
      dispatch(setLoadingAuthor(false));
      dispatch(setLoadingSachRanDom(false));
    }
  };

  useEffect(() => {
    LoadData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Effect />
      <Info />
      <Header />
      <Search />
      <div>
        <MetaTags>
          <title>StaciaBook</title>
        </MetaTags>
        <Slider data={dataSlider} loading={loadingSlider} />
        <BookIsDisCount data={dataDisCount} loading={loadingDisCount} />
        <BookNewUpdate loading={loadingSachUpdate} data={dataSachUpdate} />
        <HighlightsAuthor loading={loadingAuthor} data={dataAuthor} dataBooks={dataBookOfAuthor}/>
        <BookRanDom loading={loadingSachRanDom} data={dataSachRanDom} />
      </div>
      <Footer />
    </>
  );
}

export default TrangChu;
