const mongoose = require("mongoose");

async function connectMongoDB(contact) {
    return mongoose.connect(contact);
}

module.exports = {
    connectMongoDB,
};