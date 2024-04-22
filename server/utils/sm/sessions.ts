interface cacheStyle {
    [id: string]: { username: string };
}
export default class Sessions {
    charset: string;
    cache: cacheStyle;
    constructor(charset: string) {
        this.cache = {};
        this.charset = charset;
    }
    async addSession(username: string) : Promise<any> {
        const sid: string = await this.generate_id(); // Generate unique session ID
        this.cache[sid] = { username }; // Add a new session to the cache
        return {
            sid : sid
        }
    }
    async removeSession(id: string) : Promise<boolean> {
        if (this.cache.hasOwnProperty(id)) {
            delete this.cache[id];
            return true;
        } else {
            return false;
        }
    }
    async getSession(id: string): Promise<{username : string} | null> {
        return this.cache[id] || null;
    }
    private async generate_id(): Promise<string> {
        let id = '';
        for (let i = 0; i < 10; i++) {
            id += this.charset[Math.floor(Math.random() * this.charset.length)];
        }
        return ''
    }
}