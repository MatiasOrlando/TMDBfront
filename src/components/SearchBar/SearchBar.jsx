import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MDBCol } from "mdbreact";
import { contexto } from "../../Context/Context";

const SearchBar = () => {
  const { setSearchTerm, handleSubmit } = useContext(contexto);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0px 20px 20px",
      }}
    >
      <MDBCol md="6">
        <Form className="d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Search for a movie, tv show..."
            aria-label="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <Button
            type="submit"
            className="btn btn-light"
            style={{ marginLeft: "10px" }}
          >
            Search
          </Button>
        </Form>
      </MDBCol>
    </div>
  );
};

export default SearchBar;
