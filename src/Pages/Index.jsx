import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [realStateData, setRealStateData] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/real_state")
      .then((res) => res.json())
      .then(
        (data) => {
            if (!data.hasOwnProperty("data")) {
                setError('No hay registros');
            }
          setRealStateData(data.data);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const deleteRecord = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`/real_state/${id}`, options)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.data.length > 0) {
            setError(data.msg);
          }
          var filteredData = realStateData.filter(function (item) {
            return item.id !== id;
          });
          setRealStateData(filteredData);
        },
        (error) => {
          setError(error);
        }
      );
  };
  return (
    <div className="row">
      {error && <div className="alert">{error}</div>}
      <div className="d-flex flex-row-reverse">
        <Link className="btn btn-success ml-2" to='/create'>
            Create new record
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">City</th>
            <th scope="col">Country</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {realStateData.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.real_state_type}</td>
              <td>{item.city}</td>
              <td>{item.country}</td>
              <td>
                <Link className="btn btn-primary ml-2" to={`/update/${item.id}`}>
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteRecord(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
