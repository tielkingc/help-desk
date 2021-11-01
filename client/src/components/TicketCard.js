import React from "react";
import { Table } from 'semantic-ui-react';
import moment from 'moment';

function TicketCard({ticket: { title, createdAt, body}}) {    
    return (
        <Table striped>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Date Joined</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Called</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            <Table.Row>
                <Table.Cell>John Lilki</Table.Cell>
                <Table.Cell>September 14, 2013</Table.Cell>
                <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                <Table.Cell>No</Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
    )
}

export default TicketCard;