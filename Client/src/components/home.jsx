import React, { Component } from "react";
import BookForm from "./bookForm";
import CommentForm from "./commentForm";
import { getBooks, getComments } from "../services/bookService";
import CurrentCommentForm from "./currentCommentForm";
import { getStocks } from "../services/stockService";

class Home extends Component {
  state = {
    stockXValues: [],
    stockYValues: []
  };

  async componentDidMount() {
    const { data: stockData } = await getStocks("NFLX");
    let stockXValues = [];
    let stockYValues = [];
    for (var key in stockData["Time Series (Daily)"]) {
      stockXValues.push(key);
      stockYValues.push(stockData["Time Series (Daily)"][key]['1. open']);
    }
    this.setState({ stockXValues, stockYValues})
    // const { data: books } = await getBooks();
    // const { data: comments } = await getComments();
    // this.setState({ books, comments });
    console.log(this.state);
  }

  // refreshBooks = async () => {
  //   const { data: books } = await getBooks();
  //   this.setState({ books });
  // };
  // refreshComments = async () => {
  //   const { data: comments } = await getComments();
  //   await this.setState({ comments });
  // };
  // refreshCurrentComments = async bookId => {
  //   await this.refreshComments();
  //   await this.handleBook(bookId);
  // };
  // handleBook = async bookId => {
  //   var currentBook = this.state.books.filter(book => {
  //     return book._id === bookId;
  //   });
  //   var currentComments = this.state.comments.filter(comment => {
  //     return comment.book._id === bookId;
  //   });
  //   await this.setState({ currentBook, currentComments });
  // };

  render() {
    const { books, currentBook, currentComments } = this.state;

    return (
      <div>
        <h1>New Project</h1>
      </div>
    );
  }
}

export default Home;
