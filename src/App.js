import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import List from "./components/List";
import AddProduct from "./components/AddProduct";
import axios from "axios";
import { GET_PRODUCTS } from "./Queries";
import logo from "./logo.png";
import "./App.css";

let client = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER}/graphql`
});

class App extends Component {
  state = { user: null };
  componentDidMount() {
    axios.get(`/api/user`).then(res => this.setState({ user: res.data }));
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={GET_PRODUCTS} variables={{}}>
          {({ loading, data }) => {
            if (loading) return <h1>...loading</h1>;
            if (!this.state.user)
              return (
                <div className="login">
                  <a href={`${process.env.REACT_APP_SERVER}/login`}>Login</a>
                </div>
              );
            return (
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to GraphQL</h1>
                </header>
                <AddProduct />
                <List data={data} />
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
