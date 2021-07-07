import axios from 'axios' 

const baseUrl = 'https://dev-school-back.herokuapp.com/api/auth/reset'

const login = async credentials => {
    const { data } = await axios.post(baseUrl, credentials)
    return data
}

export default { login }