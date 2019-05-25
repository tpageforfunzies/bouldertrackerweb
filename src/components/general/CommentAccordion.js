import React from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

export default function CommentAccordion(props) {
    let comments = props.comments;
    console.log(comments);
    return (
        <Accordion allowZeroExpanded={true} allowMultipleExpanded={true}>
            {comments.map((comment, index) => (
                <AccordionItem key={comment.ID}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Comment ID: {comment.ID}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>Message: {comment.content}</AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
}