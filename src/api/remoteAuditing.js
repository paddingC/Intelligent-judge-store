import request from '@/common/request'

//保存患者
export function patientSave(data) {
    return request({
        url: 'patient/save',
        method: 'post',
        data
    })
}

// 保存处方单
export function saveDoc(data) {
    return request({
        url: 'prescription/sxsavedoc',
        method: 'post',
        data
    })
}

// 作废
export function deleteDoc(data) {
    return request({
        url: 'prescription/deleteDoc',
        method: 'post',
        data
    })
}
/*
export function login2(data) {
    return request({
        url: '/roleqyweb/webuser/role/user/login',
        method: 'get',
        params:data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {token}
    })
}

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
*/
