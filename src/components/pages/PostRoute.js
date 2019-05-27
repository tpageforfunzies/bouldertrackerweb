import React, { Component } from 'react';
import { BrowserRouter as Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Select from 'react-select';

import './scss/PostRoute.scss';

class PostRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      grade: '',
      id: this.props.id,
      error: false,
      goBack: false,
      star_rating: 0,
      numMoves: 0,
      beta: [],
      numMovesOptions: [
        { value: 0, label: '0'},
        { value: 1, label: '1'},
        { value: 2, label: '2'},
        { value: 3, label: '3'},
        { value: 4, label: '4'},
        { value: 5, label: '5'},
        { value: 6, label: '6'},
        { value: 7, label: '7'},
        { value: 8, label: '8'},
        { value: 9, label: '9'},
        { value: 10, label: '10'}
      ],
      bodyPartOptions: [
        { value: 'Left Hand', label: 'Left Hand'},
        { value: 'Right Hand', label: 'Right Hand'},
        { value: 'Left Foot', label: 'Left Foot'},
        { value: 'Right Foot', label: 'Right Foot'}
      ],
      moveOptions: [
        { value: 'Jug', label: 'Jug'},
        { value: 'Slope', label: 'Slope'},
        { value: 'Crimp', label: 'Crimp'},
        { value: 'Pinch', label: 'Pinch'},
        { value: 'Pocket', label: 'Pocket'},
        { value: 'Bump', label: 'Bump'},
        { value: 'Smear', label: 'Smear'},
        { value: 'Edge', label: 'Edge'},
        { value: 'Flag', label: 'Flag'},
        { value: 'Toe Hook', label: 'Toe Hook'},
        { value: 'Heel Hook', label: 'Heel Hook'},
        { value: 'Drop Knee', label: 'Drop Knee'},
        { value: 'Mantle', label: 'Mantle'} 
      ]
    }
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  }

  handleGradeChange = e => {
    this.setState({
      grade: e.target.value
    });
  }

  handleRatingChange = rating => {
    this.setState({
      star_rating: rating
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let header = { "Authorization": "Bearer ".concat(this.props.jwt) };
    console.log('header', header);
    try {
      axios({
        method: 'post',
        url: 'https://www.hackcity.dev/v1/route/new',
        headers: header,
        data: {
          name: this.state.name,
          grade: this.state.grade,
          user_id: this.state.id 
        }
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          goBack: true
        })
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: true,
          goBack: false
        })
      });
    } catch(err) {
      console.log(err);
    }
  }

  handleNumMovesChange = option => {
    this.setState({
      numMoves: option.value
    });
    console.log('[handleNumMovesChange]', 'moves changed to '.concat(option.value).toString());
  }

  handleBodyPartOptionsChange = option => {
    console.log('[handleBodyPartOptions]', option.value)
  }

  handleMoveOptionsChange = option => {
    console.log('[handleMoveOptions]', option.value)
  }

  render() {
    console.log('rendering PostRoute');

    let betaForm = [];

    if(this.state.numMoves > 0) {
      for(let i = 0; i < this.state.numMoves; i++) {
        betaForm.push(
          <div>
            <p className="black bold">Move {i+1}:</p>
            <div className="betaForm-container">
              
              <Select 
                options={this.state.bodyPartOptions} 
                className="bodypart-selector"
                defaultValue={this.state.bodyPartOptions[0]}
                onChange={this.handleBodyPartOptionsChange.bind(this)}
              />
              <Select 
                options={this.state.moveOptions} 
                className="move-selector"
                defaultValue={this.state.moveOptions[0]}
                onChange={this.handleMoveOptionsChange.bind(this)}
              />
            </div>
          </div>
        )
      }
    } else {
      betaForm.push(<p className="bold">Select number of moves to enter beta</p>);
    }

    if (this.props.id > 0) {
      if (this.state.goBack) {
        this.props.history.push('/profile');
      }
      return (
        <div className="add-form">
          <h2 className="bold">Add Route</h2>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Route Name"
              onChange={this.handleNameChange.bind(this)}
              value={this.state.email} 
            />
            <input 
              type="text" 
              name="grade" 
              placeholder="Route Grade"
              onChange={this.handleGradeChange.bind(this)}
              value={this.state.password} 
            />
            <h3 className="bold black">Your rating:</h3>
            <StarRatings
              rating={this.state.star_rating}
              starRatedColor="#B60B31"
              changeRating={this.handleRatingChange.bind(this)}
              numberOfStars={5}
              name='rating'
            />
            <h3 className="bold black">Beta(optional):</h3>
            <p className="bold black">Select number of moves</p>
            <Select 
              options={this.state.numMovesOptions} 
              className="moves-selector"
              defaultValue={this.state.numMovesOptions[0]}
              onChange={this.handleNumMovesChange.bind(this)}
            />
            {betaForm}
            <input 
              type="submit" 
              value="Submit" 
            />

          </form>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
    
  }
}

export default withRouter(PostRoute);