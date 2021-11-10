import React, { useState } from "react";
import { useDispatch } from "react-redux";
import imageApi from "../../Api/imageApi";
import userApi from "../../Api/userApi";
import modalError from "../../components/Custom/modal/Error";
import { editUserData } from "../../store/user";
import ModalImage from "./ModalImage";

Avatar.propTypes = {};

function Avatar(props) {
  const { data, loadingImg } = props;
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [selectedFiles, setselectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async () => {
    if (
      JSON.stringify(selectedFiles) !== "[]" &&
      JSON.stringify(data) !== "[]"
    ) {
      try {
        setLoading(true);
        const response = await imageApi.addImageApi(selectedFiles[0], 1);
        let arr = {
          name: data.name,
          address: data.address,
          phone: data.phone,
          email: data.email,
          image: response.data,
        };
        const responseUser = await userApi.editUser(arr);
        setselectedFiles([]);
        dispatch(editUserData(responseUser.data));
        setModal(false);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 422) {
          if (error.response.data.errors[`image`]) {
            modalError("Lỗi định dạng vui lòng chọn tệp khác.");
            setLoading(false);
          }
        }
      }
    }
  };

  return (
    <>
      {loadingImg ? (
        <div className="img-upload-image">
          <div className="gr-imgae-user">
            <div className="card-product is-loading d-flex pt-0 pb-0">
              <div className="col-md-12 author-detail-img background-color h-100 ">
                <div
                  className="image-product"
                  style={{ width: "100%", height: "180px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="profile-img">
            {JSON.stringify(data) !== "[]" && data.image !== "" ? (
              <div className="img-upload-image">
                <div className="gr-imgae-user">
                  <img
                    className="image-avatar"
                    src={`${process.env.REACT_APP_API_URL}/images/${data.image}`}
                    alt=""
                  />
                </div>
              </div>
            ) : (
              <div className="img-upload-image">
                <div className="gr-imgae-user">
                  <img
                    className="image-avatar"
                    src={
                      window.location.origin +
                      "/assets/images/icon/icon_user.png"
                    }
                    alt=""
                  />
                </div>
              </div>
            )}
            <div className="file btn btn-lg btn-primary" onClick={toggle}>
              Thay đổi ảnh
            </div>
          </div>
        </>
      )}
      <ModalImage
        loading={loading}
        onEditUser={handleUpdateUser}
        modal={modal}
        setModal={setModal}
        setselectedFiles={setselectedFiles}
        selectedFiles={selectedFiles}
      />
    </>
  );
}

export default Avatar;
