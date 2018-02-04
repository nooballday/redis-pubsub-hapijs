'use strict'

const Hapi = require('hapi')
const redis = require("redis")
const Logging = require('./automatic-pusher/datapush').log
const sub = redis.createClient(), pub = redis.createClient()

const server = Hapi.server({
    host:'localhost',
    port:'8000'
})

server.route({
    method:'GET',
    path:'/hello',
    handler : (req, h) => {
        return 'hello word'
    }
})

const start = async () => {
    try {
        await server.start()
    } catch (error) {
        console.log(err)
        process.exit(1)
    }
    
    console.log('Server is running at: ', server.info.uri)
}

/**
* run console every 2 seconds
*/
// setInterval(Publishing, 2*1000)

const publish = () => {
    sub.on("subscribe", () => {
        setInterval(() => {
            pub.publish("a nice channel", "I am sending a message.")
        }, 2*1000)
        
    });

    return sub
}

publish().subscribe("a nice channel");

/**
* starting the hapi / API service
*/
start()