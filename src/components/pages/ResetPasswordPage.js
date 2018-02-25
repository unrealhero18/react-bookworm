import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';
import ResetPasswordForm from '../forms/ResetPasswordForm';
import { resetPassword, validateToken } from '../../actions/auth';

class ResetPasswordPage extends React.Component {
  state = {
    loading: true,
    success: false
  }

  componentDidMount() {
    this.props.validateToken( this.props.match.params.token )
      .then( () => this.setState({ loading: false, success: true }) )
      .catch( () => this.setState({ loading: false, success: false }) );
  }

  submit = data => this.props.resetPassword( data )
    .then( () => this.props.history.push( '/login' ) );

  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;

    return (
      <div>
        { loading && <Message>Loading</Message> }

        { !loading && success &&
          <ResetPasswordForm
            token={token}
            submit={this.submit}
          />
        }

        { !loading && !success && <Message>Invalid Token</Message> }
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default connect( null, { resetPassword, validateToken } )( ResetPasswordPage )