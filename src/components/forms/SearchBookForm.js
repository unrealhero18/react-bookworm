import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Dropdown } from 'semantic-ui-react';

class SearchBookForm extends React.Component {
  state = {
    query: '',
    loading: false,
    options: [],
    books: {}
  }

  onSearchChange = ( e, data ) => {
    clearTimeout( this.timer );

    this.setState({
      query: data.searchQuery
    });

    this.timer = setTimeout( this.fetchOptions, 1000 );
  }

  fetchOptions = () => {
    if ( !this.state.query ) {
      return;
    }

    this.setState({ loading: true });

    axios.get(`/api/books/search?q=${this.state.query}`)
    .then( res => res.data.books )
    .then( books => {
      const options = [];
      const booksHash = {};

      books.forEach( book => {
        booksHash[book.goodreadsId] = book;

        options.push({
          key: book.goodreadsId,
          value: book.goodreadsId,
          text: book.title
        });
      });

      this.setState({
        loading: false,
        options: options,
        books: booksHash
      });
    });
  };

  onChange = ( e, data ) => {
    this.setState({
      query: data.value
    });

    this.props.onBookSelect( this.state.books[data.value] );
  };

  render() {
    const { loading, options, query } = this.state;

    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder="Search for a book by title"
          value={query}
          onSearchChange={this.onSearchChange}
          options={options}
          loading={loading}
          onChange={this.onChange}
        />
      </Form>
    );
  }
}

PropTypes.SearchBookForm = {
  onBookSelect: PropTypes.func.isRequired
}

export default SearchBookForm;