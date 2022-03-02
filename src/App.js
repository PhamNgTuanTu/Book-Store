import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import homeApi from './Api/homeAPI';
import PrivateRoute from './components/Custom/PrivateRoute';
import PrivateRouteShipper from './components/Custom/PrivateRouteShipper';
import ScrollToTop from './components/Custom/ScrollTop';
import AllBooks from './Pages/AllBooks';
import Author from './Pages/Author';
import BookBestSelling from './Pages/BookSell';
import Cart from './Pages/Cart';
import CateGory from './Pages/Category';
import Details from './Pages/Detail';
import ErrorPage2 from './Pages/ErrorPage/ErrorPage2';
import QuenMatKhau from './Pages/ForgetPass';
import RecoverPass from './Pages/ForgetPass/RecoverPass';
import GiaoHang from './Pages/GiaoHang';
import ViewDetail from './Pages/GiaoHang/ViewDetail';
import TrangChu from './Pages/Home';
import GioiThieu from './Pages/Mota/GioiThieu';
import Order from './Pages/Order';
import ViewOrder from './Pages/Order/ViewOrder';
import Profile from './Pages/Profile';
import ResultSearch from './Pages/ResultSearch';
import { setDataTacGia, setDataTheLoai, setLoadingMenu } from './store/home';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQbw8xRf_4PJqQGHI3HrSK6pRu3ouHvQM",
  authDomain: "staciabook-sell.firebaseapp.com",
  projectId: "staciabook-sell",
  storageBucket: "staciabook-sell.appspot.com",
  messagingSenderId: "1083115553384",
  appId: "1:1083115553384:web:fdb5139d60aa46a2b6b1dd",
  measurementId: "G-GLVFX1BK27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const { dataTheLoai, dataTacGia, loading } = useSelector((state) => ({
        dataTheLoai: state.home.dataMenuTheLoai,
        dataTacGia: state.home.dataMenuTacGia,
        loading: state.home.loadingMenu,
    }));

    const LoadData = async () => {
        try {
            const response = await homeApi.getListMenu();
            dispatch(setDataTacGia(response.data.author));
            dispatch(setDataTheLoai(response.data.category));
            dispatch(setLoadingMenu(false));
        } catch (error) {
            dispatch(setLoadingMenu(false));
        }
    };

    useEffect(() => {
        LoadData();
        // eslint-disable-next-line
    }, [pathname]);
    return (
        <>
            {
                loading ? <div id="preloder">
                    <div className="loader" />
                </div> :
                    <Router>
                        <ScrollToTop />
                        <Switch>
                            <Route exact path="/" component={TrangChu} />
                            <Route path="/chi-tiet/:id" component={Details} />
                            <Route exact path="/sach-ban-chay" component={BookBestSelling} />
                            <Route exact path="/tat-ca-sach" component={AllBooks} />
                            <Route exact path="/ket-qua-tim-kiem" component={ResultSearch} />
                            {dataTheLoai.map((val, i) => {
                                return (
                                    <Route key={i} path={`/:id/${val.slug}`} component={CateGory} />
                                )
                            })}
                            {dataTacGia.map((val, i) => {
                                return (
                                    <Route key={i} path={`/:idtacgia/${val.slug}`} component={Author} />
                                )
                            })}
                            <Route exact path="/quen-mat-khau" component={QuenMatKhau} />
                            <Route path="/khoi-phuc-mat-khau" component={RecoverPass} />
                            <Route exact path="/gio-hang" component={Cart} />
                            <Route exact path="/gioi-thieu" component={GioiThieu} />
                            <PrivateRoute exact path="/trang-ca-nhan" component={Profile} />
                            <PrivateRoute exact path="/dat-hang" component={Order} />
                            <PrivateRoute exact path="/xem-don-hang" component={ViewOrder} />
                            <Route exact path="/dang-nhap-giao-hang" component={GiaoHang} />
                            <PrivateRouteShipper exact path="/dich-vu-giao-hang" component={ViewDetail} />

                            <Route path="*" component={ErrorPage2} />
                        </Switch>
                    </Router>
            }
        </>
    );
}

export default App;
