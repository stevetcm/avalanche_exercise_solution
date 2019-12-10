import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default class Users extends Component {
  addUserToDB(user) {
    // Functionality to add user to company's database
  }

  render() {
    return (
      <Fragment>
        <Typography variant="h4" component="h2">Users</Typography>
        <Typography variant="h5" component="h3">Current Users</Typography>
        <ul>
          {this.props.profiles.map(profile => (
            <li>
              <Typography variant="subtitle1" component="li">
                {`${profile.user.first_name} ${profile.user.last_name}`}
              </Typography>
            </li>
          ))}
        </ul>
        <Typography variant="h5" component="h3">Add Users</Typography>

        // Select UI Component

        // Add Button Component
      </Fragment>
    );
  }
}

Users.defaultProps = {
  profiles: null,
};

Users.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  })),
};
