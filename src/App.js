import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);
  const getDetails = () => {
    axios
      .get("https://61e908277ced4a00172ff791.mockapi.io/users")
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleDelete = (id) => {
    console.log("Delete Clicked");
    fetch("https://61e908277ced4a00172ff791.mockapi.io/users/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((users) => getDetails());
  };

  const handleUpdate = (id) => {
    fetch("https://61e908277ced4a00172ff791.mockapi.io/users/" + id)
      .then((res) => res.json())
      .then((users) => formik.setValues(users));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      location: "",
      designation: "",
    },
    onSubmit: (values) => {
      console.log(values);
      if (values.id) {
        fetch(
          "https://61e908277ced4a00172ff791.mockapi.io/users/" + values.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        )
          .then((res) => res.json())
          .then((users) => getDetails());
      } else {
        fetch("https://61e908277ced4a00172ff791.mockapi.io/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((users) => getDetails());
      }
      values.username = "";
      values.email = "";
      values.location = "";
      values.designation = "";
    },

    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Username is Required";
      }
      if (!values.email) {
        errors.email = "Email is Required";
      }
      if (!values.location) {
        errors.location = "Location is Required";
      }
      if (!values.designation) {
        errors.designation = "Designation is Required";
      }
      return errors;
    },
  });
  return (
    <div className="content-wrapper">
      <div className="container mt-2">
        <div className="mt-2 headers">
          <center>
            <h1>Formik CRUD </h1>
          </center>
        </div>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col">
              <label htmlFor="username">UserName</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                className="form-control border-dark"
                placeholder="Please enter your username..."
              />
              {formik.errors.username ? (
                <div style={{ color: "red" }}>{formik.errors.username}</div>
              ) : null}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="form-control border-dark"
                placeholder="Please enter your email..."
              />
              {formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="col">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                className="form-control border-dark"
                placeholder="Please enter your location..."
              />
              {formik.errors.location ? (
                <div style={{ color: "red" }}>{formik.errors.location}</div>
              ) : null}
              <label htmlFor="designation">Designation</label>
              <input
                type="text"
                name="designation"
                id="designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                className="form-control border-dark"
                placeholder="Please enter your designation..."
              />
              {formik.errors.designation ? (
                <div style={{ color: "red" }}>{formik.errors.designation}</div>
              ) : null}
            </div>
          </div>
          <div className="mt-3">
            <center>
              <input type="submit" value="Submit" className="btn btn-success" />
            </center>
          </div>
        </form>
        <div className="mt-3">
          <table className="table table-bordered">
            <thead className="bg-warning">
              <tr>
                <th>S.No</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Location</th>
                <th>Designation</th>
                <th>Modification</th>
              </tr>
            </thead>
            <tbody className="bg-dark text-white" id="myRows">
              {data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.location}</td>
                    <td>{item.designation}</td>
                    <td className="buttons">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => handleUpdate(item.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
