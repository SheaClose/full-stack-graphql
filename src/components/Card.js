import React from "react";
import { Mutation } from "react-apollo";
import { DELETE_PRODUCT } from "../Mutations";
import { GET_PRODUCTS } from "../Queries";

const Card = props => (
  <div style={cardStyle}>
    <p>Product:</p>
    <h1>{props.name}</h1>
    <p>{props.price}</p>
    <br />
    <p>{props.color}</p>
    <Mutation
      mutation={DELETE_PRODUCT}
      refetchQueries={[{ query: GET_PRODUCTS }]}
      variables={{ id: props.id }}
    >
      {(deleteProduct, { err, loading }) => {
        if (err) return <h1>{err}</h1>;
        if (loading) return <h1>...loading</h1>;
        else return <button onClick={deleteProduct}>Delete</button>;
      }}
    </Mutation>
  </div>
);

export default Card;

const cardStyle = {
  height: "300px",
  width: "250px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  border: "3px solid black",
  margin: "5px",
  padding: "10px",
  borderRadius: "3px"
};
