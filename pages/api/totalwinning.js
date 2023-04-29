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
        const barcodes = await db
            .collection("barcodes")
            .find({ created: { $gte: start, $lte: end }, isWinning: true })
            .toArray();

        const totalAmount = barcodes.reduce((acc, barcode) => acc + barcode.winningAmount, 0);

        res.status(200).json({ totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to connect to database' });
    }
}
