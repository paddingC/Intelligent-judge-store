import request from '@/common/request'

//查询执业药师
export function getByKey(data) {
    return request({
        url: 'pharmacist/getByKey',
        method: 'post',
        data
    })
}

//查询用药咨询
export function findInstructionList(data) {
    return request({
        url: 'pharmacist/findInstructionList',
        method: 'post',
        data
    })
}


