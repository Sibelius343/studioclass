require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const PORT = process.env.PORT
const GCLOUD_LB_IP = process.env.GCLOUD_LB_IP

module.exports = {
    MONGODB_URI, PORT, GCLOUD_LB_IP
}