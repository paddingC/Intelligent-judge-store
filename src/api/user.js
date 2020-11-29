import request from '@/common/request'

export function login(data) {
    return request({
        url: 'user/login',
        method: 'post',
        data
    })
}

// 【账户设置】-修改信息
export function saveCompanyInfo(data) {
    return request({
        url: 'user/saveCompanyInfo',
        method: 'post',
        data
    })
}

// 【账户设置】-修改密码
export function changepassword(data) {
    return request({
        url: 'user/changepassword',
        method: 'post',
        data
    })
}

export function getInfo(data) {
    return request({
        url: 'config/getconfig',
        method: 'post',
        data
    })
}


export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
