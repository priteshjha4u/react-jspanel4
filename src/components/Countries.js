import React, { Component } from 'react';
// import { fetchCountries } from '../services/api';

class Countries extends Component {
  state = {
    list: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ list: ['India', 'USA', 'China', 'Thailand', 'Indonesia', 'Netherlands'] });
    }, 4000);
  }

  componentWillUnmount() {
    console.log('Countries component unmounted.');
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        {list.length ? (
          <ul className="list-group">
            {list.map(item => (
              <li className="list-group-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <div className="alert alert-primary">Fetching list. Please wait...</div>
        )}
      </div>
    );
  }
}

export default Countries;
