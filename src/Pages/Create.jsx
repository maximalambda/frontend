import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  let history = useNavigate();

  const [countryCode, setCountryCode] = useState([]);
  const [error, setError] = useState([]);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const json = JSON.stringify(inputs);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    };
    fetch("/real_state", options)
      .then((res) => res.json())
      .then(
        (data) => {
          if (!data.hasOwnProperty("data")) {
            console.log(data);
            setError(data.errors);
          } else if (data.data) {
            history('/');
          }
        },
        (error) => {
          setError([error]);
        }
      );
  };
  useEffect(() => {

    fetch("/country_codes")
      .then((res) => res.json())
      .then(
        (data) => {
          setCountryCode(data.data);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          {error &&
            Object.keys(error).map((key, index) => (
              <div className="alert alert-danger">{error[key]}</div>
            ))}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name"
                value={inputs.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="real_state_type">Real State Type</label>
              <select
                class="form-control"
                id="real_state_type"
                name="real_state_type"
                value={inputs.real_state_type || ""}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>
                <option>house</option>
                <option>department</option>
                <option>land</option>
                <option>comercial ground</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                placeholder="Street"
                value={inputs.street || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="external_number">External number</label>
              <input
                type="text"
                className="form-control"
                id="external_number"
                name="external_number"
                placeholder="External number"
                value={inputs.external_number || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="internal_number">Internal number</label>
              <input
                type="text"
                className="form-control"
                id="internal_number"
                name="internal_number"
                placeholder="Internal number"
                value={inputs.internal_number || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="neighborhood">Neighborhood</label>
              <input
                type="text"
                className="form-control"
                id="neighborhood"
                name="neighborhood"
                placeholder="Neighborhood"
                value={inputs.neighborhood || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
                value={inputs.city || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                className="form-control"
                name="country"
                id="country"
                value={inputs.country || ""}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>
                  Choose here
                </option>

                {countryCode.map((item) => (
                  <option value={item.alpha_code_2}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="rooms">Rooms</label>
              <input
                type="number"
                className="form-control"
                id="rooms"
                name="rooms"
                placeholder="rooms"
                value={inputs.rooms || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                type="number"
                className="form-control"
                id="bathrooms"
                name="bathrooms"
                placeholder="Bathrooms"
                value={inputs.bathrooms || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <textarea
                type="text"
                className="form-control"
                id="comments"
                name="comments"
                placeholder="Comments"
                value={inputs.comments || ""}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
