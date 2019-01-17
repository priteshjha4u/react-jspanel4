import React from 'react';
import cat from '../assets/icons/cat.svg';

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
    this.init = false;
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  componentDidMount() {
    const cat = document.getElementById('cat');
    let x = 0;
    let y = 0;
    if (cat) {
      try {
        const offset = cat.getBoundingClientRect();
        x = Math.round(offset.x) + 25;
        y = Math.round(offset.y) + 20;
      } catch (e) {
        console.log(e.message);
      }
    }
    this.init = true;
    this.setState({ x, y }, () => {
      document.addEventListener('mousemove', this.handleMouseMove);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  render() {
    const { x, y } = this.state;
    if (!this.init) {
      return null;
    }
    const s = {
      position: 'absolute',
      zIndex: '999',
      top: `${y > 15 ? (y > window.innerHeight - 50 ? window.innerHeight - 50 : y - 10) : 5}px`,
      left: `${x > 80 ? x - 80 : 5}px`,
      width: '25px',
      height: '25px'
    };
    return <img src={cat} alt="cat" style={s} />;
  }
}

export default MouseTracker;
