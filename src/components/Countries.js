import React, { Component } from 'react';
// import { fetchCountries } from '../services/api';

class Countries extends Component {
  state = {
    list: []
  };
  timeout = null;
  componentDidMount() {
    this.timeout = setTimeout(() => {
      if (this.timeout) {
        this.timeout = null;
      }
      this.setState({ list: ['India', 'USA', 'China', 'Thailand', 'Indonesia', 'Netherlands'] });
    }, 4000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      console.log(`Countries component timeout with id ${this.timeout} cleared!`);
    }
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
