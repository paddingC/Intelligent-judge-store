import {getByKey, findInstructionList} from '@/api/advisory'


const state = {
}

const mutations = {

}

const actions = {
    getByKey({commit}, form) {
        return new Promise((resolve, reject) => {
            getByKey(form).then(res => {
                console.log(res)
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    findInstructionList({commit}, form) {
        return new Promise((resolve, reject) => {
            findInstructionList(form).then(res => {
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
