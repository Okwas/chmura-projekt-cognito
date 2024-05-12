import { User } from '@/stores/user-store';
import io from 'socket.io-client'

const url = window.location.origin;
console.log('url', url);

export const createSocket = (user: User) => {
    return import.meta.env.PROD ? io(url, {
        path: '/socket.io/',
        query: {
            accessToken: user.accessToken
        }
    }) : io('http://localhost:3001', {
        query: {
            accessToken: user.accessToken
        }
    })
}