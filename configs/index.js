'use strict'
const local = "localhost";
const local_ip = "127.0.0.1";
const local_protocol = "http://";
const local_port = 3000;
const CONFIG = {
    SERVER : {
        PORT : local_port,
        DOMAIN : local,
        IP : local_ip,
        PROTOCOL: local_protocol, 
        ASSET : () => {
            let port_url = local_port ? ":" : null;
            if( port_url )
                port_url = port_url + local_port;
            return local_protocol + local + port_url;
        }
    }, 
    database : {
        type: 'postgres',
        username: 'postgres',
        password: 'admin123',
        database_name: 'blog',
        host: local_ip,
        dialect: 'postgres',
        logging : false
    },
    REDIS : {
        DOMAIN : local,
        IP : local_ip,
        PORT : 6379
    },
    TimeExpireAccessToken : 30,
    salt : 5,
    EVENT : {
        CONNECTTION                        : 'connection',
        AUTHENTICATION                     : 'AUTHENTICATION',
        DISCONNECT                         : 'disconnect',
        CHANNEL_MESSAGE                    : 'CHANNEL_MESSAGE',
        SOCKET_LISTEN_JOIN_CHANNEL_COMMENT : "SOCKET_LISTEN_JOIN_CHANNEL_COMMENT",
        SOCKET_RESPONSE_JOIN_CHANNEL       : "SOCKET_RESPONSE_JOIN_CHANNEL",
        CHANNEL_MESSAGE_RESPONSE           : "CHANNEL_MESSAGE_RESPONSE",
        SOCKET_LISTEN_GET_LIST_NOTIFICATION: "SOCKET_LISTEN_GET_LIST_NOTIFICATION",
        NOTIFICATION_RESPONSE              : "NOTIFICATION_RESPONSE",
    }
};
module.exports = CONFIG;