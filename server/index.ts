import express, { Application, NextFunction, Request, Response } from 'express';
import http from "http";
import cors from "cors";
import mongoose from 'mongoose';
import Sessions from './utils/sm/sessions';
import { Users } from './utils/db/users';
import { resolveSync } from 'bun';

await mongoose.connect(String(process.env.MONGO_URL));

const app: Application = express();
const server: http.Server = http.createServer(app);

const PORT: number = Number(process.env.PORT) || 8080;

const Sessions_: Sessions = new Sessions(String(process.env.CHARSET));




app.use(express.json());
app.use(cors({
    origin: "*",
}))

app.get('/api/health', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            health: 'ok'
        });
    } catch (Exception: any) {
        throw new Error(`/problem ${Exception}`)
    }
})

app.post('/api/create/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, email, phone, age, gender } = req.body;
        const existingUser : any = await Users.findOne({ 'creds.username': username });

        if (existingUser) {
            res.status(400).json({
                error: 'User already exists',
            });
        } else {
            const user = new Users({
                creds: {
                    username,
                    password,
                },
                data: {
                    email,
                    phone,
                    age,
                    gender,
                },
            });

            await user.save();
            const session = await Sessions_.addSession(String(username));
            res.status(200).json({
                sid: session.sid,
            });
        }
    } catch (err : any) {
        next(err);
    }
});


app.post('/api/delete/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({
            'creds.username': username
        })
        if (user) {
            await Users.deleteOne({
                'creds.username': username
            })
        }
        res.status(200).json({
            status: 'ok'
        })
    } catch (Exception: any) {
        throw new Error(`/problem ${Exception}`)
    }
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})

process.on('SIGINT', async function () {
    await mongoose.disconnect();
})