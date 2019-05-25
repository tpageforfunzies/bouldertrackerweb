import React from 'react';

import './scss/CommentAccordion.scss';

export default function CommentAccordion(props) {
    let comments = props.comments;
    return (
        <div className="accordion-container">
            <div className="blackline-100"></div>
            <h4 className="black">Comments</h4>
            <ul data-uk-accordion="collapsible: true">
                {comments.map((comment, i) => (
                    <li key={i}>
                        <a className="uk-accordion-title" href="#"><span className="bold">From User ID:</span> {comment.user_id}</a>
                        <div className="uk-accordion-content">
                            <p><span className="bold">Message: </span> {comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}