import mongoose from 'mongoose';
const betSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    amount: { type: Number, required: true },
    user: { type: String, required: true },
    status: { type: String, enum: ['pending', 'won', 'lost'], default: 'pending' }
});
const Bet = mongoose.model('Bet', betSchema);
export default Bet;
