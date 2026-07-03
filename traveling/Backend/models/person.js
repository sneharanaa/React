const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Refers to the User model
    },
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'tripdata' 
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    personNames: {
        type: [String],
        required: true
    },
    personNumber: {
        type: [Number] ,
        required : true
    },
    foodType: {
        type: String,
        enum: ['vegetarian', 'nonvegetarian'],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'upi', 'card' , 'online'],
        required: true
    },
    paymentDetails: {
        cardNumber: {
            type: String,
            required: function() { return this.paymentMethod === 'card'; }
        },
        upiId: {
            type: String,
            required: function() { return this.paymentMethod === 'upi'; }
        }
    },
    totalCharge: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Person', personSchema);
