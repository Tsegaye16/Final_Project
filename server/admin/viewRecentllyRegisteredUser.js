const recentlyRegistered = (db, req, res) => {
    const adminData = "SELECT * FROM users WHERE role_name = ?";
    db.query(adminData, ['null'],(err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'An error occurred while processing the request' });
        }

        if (result.length === 0) {
            // No user found, send a message to the client side
            return res.status(404).json({ message: 'No user found' });
        }

        // User(s) found, send the result to the client side
        res.send(result);
    });
};

export default recentlyRegistered;
