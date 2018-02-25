import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Message } from 'semantic-ui-react';
import { confirm } from '../../actions/auth';

class ConfirmationPage extends React.Component {
  state = {
    errors: '',
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props.confirm( this.props.match.params.token )
    .then( () => {
      this.setState({
        loading: false,
        success: true
      });
    })
    .catch( err => {
      this.setState({
        errors: err.response.data.errors,
        loading: false,
        success: false
      });
    });
  }

  render() {
    const { errors, loading, success } = this.state;

    return(
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading && success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>Thank you. Your account has been verified.</Message.Header>
              <Link to="/dashboard"></Link>
            </Message.Content>
          </Message>
        )}

        {!loading && !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>{errors}</Message.Header>
            </Message.Content>
          </Message>
        )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps ( state ) {
  return {
    user: state.user
  }
}

export default connect( mapStateToProps, { confirm } )( ConfirmationPage );
