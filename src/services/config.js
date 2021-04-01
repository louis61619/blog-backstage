const devBaseURL = "http://localhost:7001"
const proBaseURL = process.env.REACT_APP_SERVER_URL
export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseURL: proBaseURL

export const TIMEOUT = 5000
