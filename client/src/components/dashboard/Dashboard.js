import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTable from "react-data-table-component";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { upload_pdf } from '../../actions/pdf_upload';

const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true
  },
  {
    name: "Uploader",
    selector: "director",
    sortable: true
  },
  {
    name: "Viewd number",
    selector: "runtime",
    sortable: true,
    right: true
  }
];

const pdfs_datas = []

const Dashboard = ({
  auth: { user }
}) => {

  const [openModal, setOpenModal] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const onChangeHandler =(e) => {
    setSelectFile(e.target.files[0]);
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    const data = new FormData() 
    data.append('file', selectFile)
    upload_pdf(data)
  }
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
          
          <Fragment>
            <button className="btn btn-success my-1" onClick={() => setOpenModal(true)}>
              Upload New PDF
            </button>
            <div className="list_pdf mt-5">
              <DataTable
                title="PDF Lists"
                columns={columns}
                data={pdfs_datas}
                defaultSortFieldId={1}
                pagination
                selectableRows
              />
            </div>
          </Fragment>

          <Modal 
            show={openModal} 
            onHide={()=> setOpenModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
              <Modal.Header closeButton>
                <Modal.Title>Upload PDF</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={ onClickHandler } className="form">
                  <input type="file" name="file" onChange={onChangeHandler}/>
                  <div className="form-group mt-2">
                    <label htmlFor="title">Title : </label>
                    <input type="text" name="title" className="form-control" onChange = { onChange }/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="description">Description : </label>
                    <textarea name="description" className="form-control" onChange = { onChange } rows="4"/>
                  </div>
                  <div className="form-group mt-2">
                    <button type="submit" className="btn btn-success from-control">Save</button>
                  </div>
                </form>
              </Modal.Body>
          </Modal>
      </Fragment>
    </>
  );
};

Dashboard.propTypes = {
  upload_pdf: PropTypes.func,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { upload_pdf })(
  Dashboard
);
