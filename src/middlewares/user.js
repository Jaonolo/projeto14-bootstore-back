import db from '../database/database.js';

export async function UserValidator(req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();

    if (!token) return res.status(401).send("No token found."); // unauthorized

    try {

        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("No session found."); // unauthorized

        const user = await db.collection("users").findOne({ _id: session.userId });
        if (!user) return res.status(401).send("No user found."); // unauthorized

        res.locals.user = user;
        next();

    } catch (err) { return res.status(500).send('Error trying to get user through session.'); }

}