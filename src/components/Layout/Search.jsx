import React from "react";
import { Formik, FastField, Form } from "formik";
import homeApi from "../../Api/homeAPI";
import { useDispatch } from "react-redux";
import { setDataSearch, setParamsSearch } from "../../store/search";
import { useHistory } from "react-router";

function Search() {
  const dispatch = useDispatch();
  const histpry = useHistory();
  const initialValues = {
    key: "",
  };
  const onSearch = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await homeApi.search(values.key);
      dispatch(setParamsSearch(values.key));
      dispatch(setDataSearch(response));
      setSubmitting(false);
      resetForm({});
      histpry.push("/ket-qua-tim-kiem");
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <section className="search mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12 header-search">
            <Formik
              initialValues={initialValues}
              onSubmit={onSearch}
            >
              {(formikProps) => {
                const { isSubmitting } = formikProps;
                return (
                  <Form>
                    <div className="inner-form" id="TooltipSearch">
                      <div className="input-field first-wrap">
                        <div className="svg-wrapper">
                          <i
                            className="fas fa-search big wow flash animated"
                            data-wow-duration="3s"
                            data-wow-delay=".3s"
                            data-wow-iteration="infinite"
                          />
                        </div>
                        <FastField
                          id="search"
                          type="text"
                          name="key"
                          placeholder="Tìm kiếm sách ..."
                        />
                      </div>

                      <div className="input-field second-wrap">
                        <button
                          className="btn-search"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Đang tìm ..." : "Tìm Sách"}
                        </button>
                      </div>
                    </div>
                    <span className="info">
                      ex. Kinh Doanh, Quy Luật Cuộc Đời, Nguyễn Nhật Ánh,...
                    </span>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;
