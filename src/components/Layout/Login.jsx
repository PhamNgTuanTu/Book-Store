import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import Login from "../Custom/Login";
import Signup from "../Custom/Signup";

LoginAndSignup.propTypes = {};

function LoginAndSignup(props) {
  const { modal, toggle, setModal, setModalUser } = props;
  const [slideLogin, setSlideLogin] = useState([true]);
  const [slideSigin, setSlideSigin] = useState([false]);
  const refReset = React.createRef();
  const refReset2 = React.createRef();

  const onClickLogin = () => {
    setSlideLogin(!slideLogin);
    slideLogin ? setSlideSigin(false) : setSlideSigin(true);
    refReset.current.click();
    refReset2.current.click();
  };
  const onClickSigin = () => {
    setSlideSigin(!slideSigin);
    slideSigin ? setSlideLogin(false) : setSlideLogin(true);
    refReset.current.click();
    refReset2.current.click();
  };

  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={toggle} centered>
          <ModalBody>
            <button
              className="close"
              onClick={toggle}
              style={{
                position: "absolute",
                top: 0,
                right: 5,
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
            <div className="form-structor">
              <div className={slideSigin ? "signup" : "signup slide-up"}>
                <Signup
                  onClick={onClickSigin}
                  refReset={refReset}
                  setModal={setModal}
                  setModalUser={setModalUser}
                />
              </div>
              <div className={slideLogin ? "login slide-up" : "login"}>
                <Login
                  onClick={onClickLogin}
                  refReset={refReset2}
                  setModal={setModal}
                  setModalUser={setModalUser}
                />
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default LoginAndSignup;
