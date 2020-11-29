import request from '@/common/request'

//生成处方
export function buyspecialdrug(data) {
    return request({
        url: 'prescription/buyspecialdrug',
        method: 'post',
        data
    })
}

//查询货品
export function findGood(data) {
    return request({
        url: 'goods/find',
        method: 'post',
        data
    })
}

//再次购买
export function buyAgain(data) {
    return request({
        url: 'prescription/buyAgain',
        method: 'post',
        data
    })
}

