'use strict'
const redis = require("redis")
, client = redis.createClient(), sub = redis.createClient(), pub = redis.createClient()

const logging = () => {
    let value = Math.random() * 50 + 1;
    client.set("value", value)
    console.log(value)
}

module.exports = {
    log : logging
}

// let message = "The value of this channel is "+ value
        
// pub.publish("math_channel", message)
// console.log(message);