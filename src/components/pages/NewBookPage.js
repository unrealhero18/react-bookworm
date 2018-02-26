import React from 'react';
import { Segment } from 'semantic-ui-react';
import SearchBookForm from '../forms/SearchBookForm';
import BookForm from '../forms/BookForm';

class NewBookPage extends React.Component {
  state = {
    book: null
  };

  onBookSelect = book => this.setState({ book });

  addBook = () => console.log( 'log' );

  render() {
    return (
      <Segment>
        <h1>Add new book to your collection</h1>
        <SearchBookForm
          onBookSelect={this.onBookSelect}
        />

        {this.state.book &&
          <BookForm
            book={this.state.book}
            submit={this.addBook}
          />
        }
      </Segment>
    );
  }
}

export default NewBookPage;