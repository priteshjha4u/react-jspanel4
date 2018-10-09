import React, { Component } from 'react';
import { fetchSampleUsers } from '../services/api';

class SampleUsers extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetchSampleUsers().then(data => {
      this.setState({ users: data });
    });
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        {users.length ? (
          users.map((user, index) => {
            return (
              <div className="card" key={`${user.email}${user.phone}` || index} style={{ marginTop: '5px' }}>
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{user.username}</h6>
                  <p className="card-text">
                    {user.email}
                    <br />
                    {user.website}
                    <br />
                    {user.phone}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="alert alert-primary">Fetching users. Please wait...</div>
        )}
      </div>
    );
  }
}

export default SampleUsers;
