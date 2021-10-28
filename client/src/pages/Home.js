import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_TICKETS } from '../utils/queries';
import TicketCard from '../components/TicketCard';
import { Grid } from 'semantic-ui-react'

function Home(){
    const { loading, data: { getTickets: tickets} = {}} = useQuery(QUERY_TICKETS);
    console.log(tickets)

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent Tickets</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h1>Loading tickets...</h1>
                ) : (
                    tickets && tickets.map(ticket => (
                        <Grid.Column key={ticket.id} style={{ marginBottom: 20 }}>
                            <TicketCard post={ticket} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home;