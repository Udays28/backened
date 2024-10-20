import Bet from '../models/Bet.js';
// Get all bets
const getBets = async (req, res) => {
    const bets = await Bet.find();
    res.json(bets);
};
// Place a bet
const placeBet = async (req, res) => {
    const { number, amount, user } = req.body;
    const bet = new Bet({ number, amount, user });
    await bet.save();
    res.status(201).json(bet);
};
export { getBets, placeBet };
