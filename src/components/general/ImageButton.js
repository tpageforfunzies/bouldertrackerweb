import React, { Component } from 'react';

import './scss/ImageButton.scss';

class ImageButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='image-upload'>
        <label htmlFor='file-upload' class="custom-file-upload">
          {this.props.title}
        </label>
        <input type='file' id='file-upload' accept="image/*;capture=camera,camcorder,filesystem" onChange={this.props.updatePic} /> 
      </div>
    );
  }
  
}

export default ImageButton;