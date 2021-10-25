const { model, Schema } = require('mongoose');

const ticketSchema = new Schema({
    ticketNumber: Number,
    title: String,
    body: String,
    createdAt: String,
    category: String,
    subCategory: String,
    assignedTo: String,
    status: String,
    priority: String,
    submitUser: String,
    body: String
})

module.exports = model('Ticket', ticketSchema);