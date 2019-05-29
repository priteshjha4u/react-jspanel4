import React from 'react';

const RandomImage = () => {
  const width = Math.floor(Math.random() * 100 + 450);
  const height = Math.floor(Math.random() * 100 + 300);
  const src = `https://picsum.photos/${width}/${height}`;
  return <LoadImage src={src} />;
};

class LoadImage extends React.Component {
  state = {
    loaded: false,
    error: false,
    image: null
  };
  image = null;
  componentDidMount() {
    const img = new Image(); // document.createElement('img');
    img.src = this.props.src;
    img.className = 'img-fluid';
    img.onload = () => this.setState({ loaded: true });
    img.onerror = () => this.setState({ error: true });
    this.image = img;
  }
  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
      this.image = null;
    }
  }
  render() {
    if (!this.state.loaded) {
      return <div className="alert alert-info">Loading image...</div>;
    }
    if (this.state.error) {
      return <div className="alert alert-info">Error loading image {this.props.src}</div>;
    }
    return <div className="card" ref={el => this.state.loaded && this.image && el.appendChild(this.image)} />;
  }
}

export default RandomImage;
