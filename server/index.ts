import express, { Application, NextFunction, Request, Response } from 'express';
import http from "http";
import cors from "cors";
import mongoose from 'mongoose';
import Sessions from './utils/sm/sessions';
import { Users } from './utils/db/users';


try {
    await mongoose.connect('mongodb://localhost:27017/llmface');
} catch (err: any) {
    console.log(`Error Connecting: ${err}`);

}

const app: Application = express();
const server: http.Server = http.createServer(app);

const PORT: number = Number(process.env.PORT) || 8080;

/**
 * 
 * Imported classes
 */
const Sessions_: Sessions = new Sessions(String(process.env.CHARSET));



async function checkNulls(arr: Array<any>): Promise<boolean> {
    arr.forEach(element => {
        if (element === (null || "" || undefined || 0)) return false;
    });
    return true;
}

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
        const username: string = req.body.username.toString();
        const password: string = req.body.password.toString();
        const email: string = req.body.email.toString();
        const phone: number = req.body.phone;
        const age: number = req.body.age;
        const gender: string = req.body.gender.toString();
        const existingUser: any = await Users.findOne({ 'creds.username': username });

        if (existingUser) {
            res.status(400).json({
                error: 'User already exists',
            });
        } else {

            const user = new Users({
                creds: {
                    username: username,
                    password: password,
                },
                data: {
                    email: email,
                    phone: phone,
                    age: age,
                    gender: gender,
                },
            });

            try {
                await user.save();
            } catch (err: any) {
                res.status(400).json({
                    ok: false,
                    error: err
                })
            }
            const session: { sid: String } | null = await Sessions_.addSession(username);
            if (session) {
                res.status(200).json({
                    ok: true,
                    sid: session.sid,
                });
            } else {
                res.status(400).json({
                    ok: false,
                    error: 'Internal Server Error',
                })
            }

        }
    } catch (err: any) {
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

app.post('/api/check/user', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const user: any = await Users.findOne({
            'creds.username': username,
            'creds.password': password
        })
        if (user) {
            /* Login succeeded
           Now giving the s. id. 
            */
            const addSession: any = await Sessions_.addSession(username);

            res.status(200).json({
                sid: addSession.sid,
                ok: true,
            })
        } else {
            /**
             * Login failed
             * return nothing
             */
            res.status(200).json({
                ok: false,
                error: 'Incorrect username or password',
            })
        }
    } catch (Exception: any) {
        throw new Error(`/problem ${Exception}`)
    }
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})