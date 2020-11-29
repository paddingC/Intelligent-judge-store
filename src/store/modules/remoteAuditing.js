import {patientSave, saveDoc, deleteDoc}            from '@/api/remoteAuditing'
import {getToken, setToken, removeToken} from '@/common/cookie'


const state = {
    patientInfo: {}
}

const mutations = {
    SET_PATIENTINFO: (state, patientInfo) => {
        state.patientInfo = patientInfo
    },
}

const actions = {
    //保存患者信息
    savePatient({commit}, form) {
        return new Promise((resolve, reject) => {
            patientSave(form).then(res => {
                commit('SET_PATIENTINFO', form)
                resolve(form)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    // 保存处方单
    sxsavedoc({commit}, parms) {
        return new Promise((resolve, reject) => {
            saveDoc(parms).then(response => {
                const {data} = response
                const {prescriptionid} = data
                resolve(prescriptionid)
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    },
    deleteDoc({commit}, parms){
        return new Promise((resolve, reject) => {
            deleteDoc(parms).then(response => {
                const {data} = response
                console.log(data);
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
