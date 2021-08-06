import axios from "axios"

let auth = JSON.parse(localStorage.getItem('auth_key'))
const user = auth ? auth.user: null
const jwt = auth ? auth.jwt: null

const apiUrl = process.env.VUE_APP_API_HOST

export default {
    isAuthen() {
        return (user !== null) && (jwt !== null)
    },
    getApiHeader() {
        if (jwt !== null) {
            return {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
        }
    },
    getUser() {
        return user
    },
    getJwt() {
        return jwt
    },
    getRole() {
        return user.role.name
    },
    isRoleAuthenticated() {
        return this.isAuthen() && user.role.name === "Authenticated"
    },
    async login( body ) {
        try {
          let res = await axios.post(apiUrl + "/auth/local", body)
          if (res.status === 200) {
            localStorage.setItem('auth_key', JSON.stringify(res.data))
            return {
                success: true,
                jwt: res.data.jwt,
                user: res.data.user
            }
          } else {
            return {
                success: false,
                message: "Unknown Status Code" + res.status
            }
          }
        } catch (e) {
          console.log(e.response.data.message[0].messages[0].message)
          if (e.response.status === 400) {
            return {
                success: false,
                message: e.response.data.message[0].messages[0].message
            }
          } else {
            console.log(res)
            return {
                success: false,
                message: "Unknown error"
            }
          }
        }
    },
    logout() {
        localStorage.removeItem('auth_key')
    },
    /*register({ username, email, password}, ) {

    }*/
}