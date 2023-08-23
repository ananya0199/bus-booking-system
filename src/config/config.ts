import dotenv from 'dotenv';

dotenv.config();
const jwtkey = process.env.jwt_secret || '';
const PORT = process.env.PORT ? Number(process.env.PORT) : 1337;

export const config = {
    server: {
        port: PORT
    },
    jwt: {
        key: jwtkey
    }
}