import React, { Component } from 'react';

import './scss/ImageButton.scss';

class ImageButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='white bold'>
        <label htmlFor='file-upload' class="custom-file-upload">
          Upload Profile Picture
        </label>
        <input type='file' id='file-upload' onChange={this.props.updateProfilePicProp} /> 
      </div>
    );
  }
  
}

export default ImageButton;