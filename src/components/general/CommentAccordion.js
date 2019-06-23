import React, { Component } from 'react';
import axios from 'axios';

import './scss/CommentAccordion.scss';

class CommentAccordion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: this.props.comments,
            jwt: this.props.jwt,
            users: this.props.users
        }

        console.log('[CommentAccordian] constructor state', this.state);

    }

    getUserNameFromId(id) {
        console.log(this.state.users[id]);
        return this.state.users[id];
    }

    render() {
        return (
            <div className="accordion-container">
                <div className="blackline-100"></div>
                <h4 className="black">Comments</h4>
                <ul data-uk-accordion="collapsible: true">
                    {this.state.comments.map((comment, i) => (
                        <li key={i}>
                            <a className="uk-accordion-title" href="#"><span className="bold">From</span> {this.getUserNameFromId(comment.user_id)} </a>
                            <div className="uk-accordion-content">
                                <p><span className="bold"></span>{comment.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    
    
}

export default CommentAccordion