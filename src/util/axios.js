import axios from 'axios'

let axios_=axios.create({
    baseURL: 'http://localhost:3000',//接口地址
    timeout: 15000  // 超时时间
});

export default axios_; 