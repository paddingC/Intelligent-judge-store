/**
 * 请求统一管理
 */
import request from '../common/request'


// export const rankGender = data => Request.get('/ranking/gender', data);

//审核
export function dispenseAndCheck(data) {
    return request({
        url: 'prescription/DispenseAndCheck',
        method: 'post',
        data
    })
}

//获取人员
export function getByDeptid(data) {
    return request({
        url: 'user/getByDeptid',
        method: 'post',
        data
    })
}

//查询处方
export function sxfinddoc(data) {
    return request({
        url: 'prescription/sxfinddoc',
        method: 'post',
        data
    })
}
//保存修改
export function updatePatient(data) {
    return request({
        url: 'prescription/updatePatient',
        method: 'post',
        data
    })
}

//下载图片
export function downloadfile(data) {
    return request({
        url: 'config/downloadfile'+'?url='+data.url,
        method: 'post',
    })
}
// 细单
export function finddtl(data) {
    return request({
        url: 'prescription/finddtl',
        method: 'post',
        data
    })
}
// 保存细单
export function savedtl(data) {
    return request({
        url: 'prescription/savedtl',
        method: 'post',
        data
    })
}
