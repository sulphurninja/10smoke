import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
    
  try {
    await client.connect();
    const { start, end } = req.query;
    const db = client.db('test');
    const bets = await db
      .collection('bets')
      .find({
        createdAt: {
          $gte: new Date(start),
          $lte: new Date(end),
        },
      })
      .sort({ createdAt: -1 })
      .toArray();

    const betDetails = bets.map((bet) => ({
      createdAt: bet.createdAt,
      totalAmount: bet.totalAmount,
    }));

    res.status(200).json({ betDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to connect to database' });
  } 
}
