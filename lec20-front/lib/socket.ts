
import { io, Socket} from 'socket.io-client'

let socket: Socket | null = null

export function connectionSocket(token: string){
    if(socket?.connected) return socket

    socket = io(process.env.NEXT_PUBLIC_API_URL, {
        auth: {
            'authorization': `Bearer ${token}`
        }
    })

    return socket
}


export function getSocket() {
    return socket
}