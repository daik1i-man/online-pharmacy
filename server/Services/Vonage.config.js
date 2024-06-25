const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "f92e9d3a",
    apiSecret: "iEhkVhXH5CHfP55R"
})

module.exports = vonage;