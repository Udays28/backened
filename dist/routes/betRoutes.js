import express from 'express';
// Create a new router
const router = express.Router();
// Define the GET /api/bets route
router.get('/bets', async (req, res) => {
    try {
        // Mock response (replace this with your actual database logic)
        const bets = [
            { id: 1, amount: 100, status: 'open' },
            { id: 2, amount: 150, status: 'closed' },
        ];
        res.json(bets);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching bets' });
    }
});
// Export the router
export default router;
