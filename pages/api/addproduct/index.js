import executeQuery from '../../Config/db';

export default async function handler(req, res) {
    const { n_product, description, photo , a_stock,unit_price } = req.body;
    try {
        const results = await executeQuery('INSERT INTO product(n_product, description, photo, id_category, a_stock,unit_price) VALUES (?, ?, ?, ?, ?, ?)', [n_product, description, photo,'1', a_stock, unit_price]);
        if (results) {
            res.status(200).json({ success: true, message: 'Data inserted successfully into the product table.' });
        }
    } catch (error) {
        console.error('Error inserting data into product table:', error);
        res.status(500).json({ success: false, message: 'Failed to insert data into the product table.' });
    }
}
