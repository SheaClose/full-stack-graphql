let products = require("../model");

module.exports = {
  Query: {
    message() {
      return "Hello World";
    },
    products() {
      return products;
    },
    productsCheaperThan(_, { price }, req) {
      return products.filter(prod => prod.price < price);
    },
    user(_, __, { user }) {
      if (user) return user;
      else throw new Error("No user found");
    }
  },
  Mutation: {
    addProduct(_, product, req) {
      const id = products.slice().pop() ? products.slice().pop().id + 1 : 0;
      products.push({ ...product, id });
      return products;
    },
    deleteProduct(_, { id }, req) {
      products = products.filter(c => +c.id !== +id);
      return products;
    }
  }
};
