import React from "react";
import Dropzone from "react-dropzone";
import { Button, CardBody, Col, Form, Modal, ModalBody, Row } from "reactstrap";

ModalImage.propTypes = {};

function ModalImage(props) {
  const {
    modal,
    setModal,
    selectedFiles,
    setselectedFiles,
    onEditUser,
    loading,
  } = props;
  const toggle = () => {
    setModal(!modal);
  };

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  const remove = (file) => {
    const newFiles = [...selectedFiles]; // make a var for the new array
    newFiles.splice(file, 1); // remove the file from the array
    setselectedFiles(newFiles); // update the state
  };

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const handleEditUser = () => {
    if (onEditUser) onEditUser();
  };

  return (
    <Modal toggle={toggle} isOpen={modal} fullscreen="sm" centered={true}>
      <ModalBody>
        <Row>
          <Col className="col-12">
            <CardBody className="p-0">
              <Form>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    handleAcceptedFiles(acceptedFiles);
                  }}
                  multiple={false}
                  accept=".png, .jpg, .jpeg"
                >
                  {({ getRootProps, getInputProps }) => (
                    <div className="dropzone" {...getRootProps()}>
                      <Row>
                        <Col>
                          <div className="d-none">
                            <input {...getInputProps()} />
                          </div>
                        </Col>
                      </Row>
                      <div
                        className="w-100 h-100"
                        style={{ padding: "20px 0" }}
                      >
                        {selectedFiles.length > 0 ? (
                          <>
                            {selectedFiles.map((f, i) => {
                              return (
                                <div className="p-2 h-100" key={i}>
                                  <Row>
                                    <Col
                                      md="12"
                                      className="text-center"
                                      id="namefile"
                                    >
                                      <img
                                        height="120"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col md="12">
                                      <span>{f.name}</span>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <Col className="d-flex align-items-center justify-content-center flex-column-reverse h-100">
                            <h5>Kéo ảnh hoặc chọn từ thư viện của bạn.</h5>
                            <i
                              className="fas fa-file-upload"
                              style={{ fontSize: "50px" }}
                            ></i>
                          </Col>
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
                {JSON.stringify(selectedFiles) !== "[]" ? (
                  <Row className="mt-4">
                    <Col>
                      <Button
                        color="primary"
                        outline
                        className="mr-2"
                        onClick={handleEditUser}
                        disabled={loading}
                      >
                          {loading ? "Đang thay đổi ..." : "Cập nhật"}
                      </Button>
                      <Button onClick={remove} color="warning" outline disabled={loading}>
                        Xóa ảnh
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </Form>
            </CardBody>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default ModalImage;
