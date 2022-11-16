import {get} from '../config'

// Mock
export default {
    getDashboard: (params, config) => get('/login_info', params, config)
}
