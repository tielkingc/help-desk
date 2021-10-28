import React from "react";
import { Card, Icon, Label, Button, Image } from 'semantic-ui-react';
import moment from 'moment';

function TicketCard(ticket) {    
    return (
        <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{ticket.title}</Card.Header>
                <Card.Meta>{moment(ticket.createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                {ticket.body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <p>buttons here</p>
            </Card.Content> 
        </Card>
    )
}

export default TicketCard;