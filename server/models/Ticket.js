const { model, Schema } = require('mongoose');

const ticketSchema = new Schema({
    title: String,
    body: String,
    createdAt: String,
    category: String,
    subCategory: String,
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    status: String,
    priority: String,
    submitUser: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Ticket', ticketSchema);