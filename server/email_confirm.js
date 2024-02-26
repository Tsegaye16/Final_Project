import { promisify } from "util";

const EmailConfirm = async (db, req, res) => {
    try {
        const token = req.params.token; // or req.query.token depending on your setup
        console.log("Token: ", token);

        const checkTokenQuery = 'SELECT * FROM email_confirmations WHERE token = ?';
        const promisifiedQuery = promisify(db.query).bind(db);
        const [tokenInfo] = await promisifiedQuery(checkTokenQuery, [token]);
        console.log("Token Info:", tokenInfo);

        if (!tokenInfo) {
            return res.status(404).json({ message: "Token not found or expired" });
        }

        const currentTime = Date.now();
        const tokenExpirationTime = new Date(tokenInfo.expires).getTime();

        if (currentTime > tokenExpirationTime) {
            console.log("Token has expired");
            return res.status(401).json({ message: "Token has expired" });
        }

        const updateStatusQuery = 'UPDATE email_confirmations SET is_confirmed = true WHERE user_id = ?';
        await promisifiedQuery(updateStatusQuery, [tokenInfo.user_id]);

        // const deleteTokenQuery = 'DELETE FROM email_confirmations WHERE token = ?';
        // await promisifiedQuery(deleteTokenQuery, [token]);

        return res.status(200).json({ message: "Email confirmation successful" });
    } catch (err) {
        console.log("Error confirming email:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default EmailConfirm;
