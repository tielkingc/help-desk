import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_TICKETS } from '../utils/queries';
import TicketCard from '../components/TicketCard';
import { Container, Table } from 'semantic-ui-react';
import moment from 'moment'

function Home(){
    const { loading, data: { getTickets: tickets}} = useQuery(QUERY_TICKETS);
    console.log(tickets)

    return (
        <Container>
            <Table striped>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Date Created</Table.HeaderCell>
                    <Table.HeaderCell>Assigned User</Table.HeaderCell>
                    <Table.HeaderCell>Submit User</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {tickets && tickets.map((ticket) => (
                        <Table.Row key={ticket.id}>
                            <Table.Cell>{ticket.title}</Table.Cell>
                            <Table.Cell>{moment(ticket.createdAt).format("MM/D/YYYY - HH:mm")}</Table.Cell>
                            <Table.Cell>{ticket.assignedTo}</Table.Cell>
                            <Table.Cell>{ticket.submitUser}</Table.Cell>
                        </Table.Row>
                    ))}
                
                </Table.Body>
            </Table>
        </Container>
    )
}

export default Home;