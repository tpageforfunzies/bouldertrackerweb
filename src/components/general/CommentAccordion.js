import React, { Component } from 'react';

import './scss/CommentAccordion.scss';

class CommentAccordion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: this.props.comments
        }

        console.log('[CommentAccordian] constructor', this.props.comments);

    }

    const fetchUsernameFromComment = (id) => {
        let url = 'https://www.hackcity.dev/v1/user/' + this.props.id.toString();
        let authHeader = { "Authorization": "Bearer ".concat(this.props.jwt) }
    }
    render() {
        return (
            <div className="accordion-container">
                <div className="blackline-100"></div>
                <h4 className="black">Comments</h4>
                <ul data-uk-accordion="collapsible: true">
                    {this.state.comments.map((comment, i) => (
                        <li key={i}>
                            <a className="uk-accordion-title" href="#"><span className="bold">From User ID:</span> {(() => this.fetchUsernameFromComment(comment.user_id))}</a>
                            <div className="uk-accordion-content">
                                <p><span className="bold">Message: </span> {comment.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    
    
}

export default CommentAccordion