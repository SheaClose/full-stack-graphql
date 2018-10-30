import React, { Component } from "react";
import { ADD_PRODUCT } from "../Mutations";
import { Mutation } from "react-apollo";
import { GET_PRODUCTS } from "../Queries";
class AddProduct extends Component {
  state = { properties: ["name", "price", "color"] };
  handleTextInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        {this.state.properties.map(val => (
          <div key={val}>
            <input
              type="text"
              name={val}
              onChange={this.handleTextInput}
              placeholder={val}
            />
          </div>
        ))}

        <Mutation
          mutation={ADD_PRODUCT}
          refetchQueries={[{ query: GET_PRODUCTS }]}
        >
          {(addProduct, { loading, error }) => {
            if (loading) return <p>Loading...</p>;
            else if (error) return <p>Error :(</p>;
            else
              return (
                <button
                  onClick={() =>
                    addProduct({
                      variables: {
                        name: this.state.name,
                        price: this.state.price,
                        color: this.state.color
                      }
                    })
                  }
                >
                  Add
                </button>
              );
          }}
        </Mutation>
      </div>
    );
  }
}

export default AddProduct;
