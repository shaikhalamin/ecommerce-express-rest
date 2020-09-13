
const Queue = require('bee-queue');
const redisConfig = require("../../../config/redis.config.js");

const options = {
    removeOnSuccess: true,
    isWorker: false,
    sendEvents: false,
    redis: {
        host: redisConfig.HOST,
        port: redisConfig.PORT,
        password: redisConfig.PASSWORD,
    }
}

const orderQueue = new Queue('order', options);

const placeOrder = (orderObj) => {
    return orderQueue.createJob(orderObj).save();
}

orderQueue.on("succeeded", (job) => {
    //send notifications like email and push notifications
    console.log(job.data);

})

const orderStatus = (orderId) => {

    return orderQueue.getJob(orderId).then((job) => {

        return {
            progress: job.progress,
            status: job.status,
            order: job.data

        };
    });
}

module.exports = {
    placeOrder,
    orderStatus
}
