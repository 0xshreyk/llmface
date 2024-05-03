import Redis from 'ioredis';
const client = new Redis();

// Handle Redis connection errors
client.on('error', (err) => console.error('Redis Client Error:', err));

export default class Sessions {
    charset: string;

    constructor(charset: string) {
        this.charset = charset;
    }

    // Generate a random session ID
    private async generateId(): Promise<string> {
        let id = '';
        for (let i = 0; i < 10; i++) {
            id += this.charset[Math.floor(Math.random() * this.charset.length)];
        }
        return id;
    }

    // Add a new session
    public async addSession(username: string): Promise<{ sid: string }> {
        try {
            const sessionId = await this.generateId();
            await client.hset(sessionId, { username }); // Use hset to set hash field
            return { sid: sessionId };
        } catch (e: any) {
            console.error('Error adding session:', e);
            throw new Error(e.message);
        }
    }

    // Remove a session by its ID
    public async removeSession(id: string): Promise<boolean> {
        try {
            const result = await client.del(id); // Delete the hash from Redis
            return result > 0; // Returns true if a key was deleted
        } catch (e: any) {
            console.error('Error removing session:', e);
            throw new Error(e.message);
        }
    }

    // Get a session by its ID
    public async getSession(id: string): Promise<{ username: string } | null> {
        try {
            const username = await client.hget(id, 'username'); // Retrieve the username from the hash
            if (username) {
                return { username }; // Return the found username
            } else {
                return null; // If no username is found
            }
        } catch (e: any) {
            console.error('Error getting session:', e);
            throw new Error(e.message);
        }
    }
}