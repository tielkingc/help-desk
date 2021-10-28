import { gql } from 'graphql-tag';

export const QUERY_TICKETS = gql`
     {
        getTickets {
            ticketNumber
            title
            body
            category
            subCategory
            status
            priority
            submitUser
            assignedTo
            createdAt
        }
     }  
`;