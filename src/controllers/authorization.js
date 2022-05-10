import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from '../database/database.js';

export async function LoginController(req, res) {

    try {

        const user = await db.collection("users").findOne({ email: req.body.email });
        if (!user) return res.status(404).send('User not found.'); // not found

        const validate = user && bcrypt.compareSync(req.body.password, user.password) ? true : false;
        if (!validate) return res.status(401).send('Invalid password.'); // unauthorized

        const token = uuid();
        await db.collection("sessions").insertOne({ token, userID: user._id });
        return res.send({ token, name: user.name });

    } catch (err) { return res.status(500).send('Error accessing database during login.'); }
}

export async function RegisterController(req, res) {

    try {

        const user = await db.collection("users").findOne({ email: req.body.email });
        if (user) return res.status(409).send('User already exists.');

        await db.collection("users").insertOne({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        return res.sendStatus(201);

    } catch (err) { return res.status(500).send('Error accessing database during registration.'); }
}

export async function LogoutController(req, res) {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if (!token) return res.sendStatus(403); // forbidden

    try {

        await db.collection("sessions").deleteOne({ token });
        res.sendStatus(200);

    } catch (err) { return res.status(500).send('Error accessing database during logout.'); }

}
