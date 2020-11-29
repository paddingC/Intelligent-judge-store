import {dispenseAndCheck, getByDeptid, sxfinddoc, downloadfile,updatePatient, finddtl,
    savedtl} from '@/api/pharmacyAudit'


const state = {
    ncdInfo: {}
}

const mutations = {
    SET_NCDINFO: (state, ncdInfo) => {
        state.ncdInfo = ncdInfo
    },
}

const actions = {
    //审核
    dispenseAndCheck({commit}, form) {
        return new Promise((resolve, reject) => {
            dispenseAndCheck(form).then(res => {
                console.log(res)
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    finddoc({commit}, form) {
        return new Promise((resolve, reject) => {
            sxfinddoc(form).then(res => {
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    finddtl({commit}, form){
        return new Promise((resolve, reject) => {
            finddtl(form).then(res => {
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    savedtl({commit}, arr){
        return new Promise((resolve, reject) => {
            savedtl(arr).then((res) => {
                const data = res
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    updatePatient({commit}, form) {
        return new Promise((resolve, reject) => {
            updatePatient(form).then(res => {
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    getByDeptid({commit}, form) {
        return new Promise((resolve, reject) => {
            getByDeptid(form).then(res => {
                console.log(res)
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    downloadfile({commit}, url) {
        return new Promise((resolve, reject) => {
            downloadfile({
                url:url
            }).then(res => {
                console.log(res)
                const data = res.data
                resolve(data)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
