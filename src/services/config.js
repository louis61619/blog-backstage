const devBaseURL = "http://127.0.0.1:7001"
const proBaseURL = process.env.REACT_APP_SERVER_URL
export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseURL: proBaseURL

export const TIMEOUT = 5000
