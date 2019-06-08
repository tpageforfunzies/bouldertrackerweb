import React, { Component } from 'react';

class ImageButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='white bold'>
        <label htmlFor='file-upload'>
          Upload Profile Picture
        </label>
        <input type='file' id='single' onChange={this.props.updateProfilePicProp} /> 
      </div>
    );
  }
  
}

export default ImageButton;