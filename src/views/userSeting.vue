<template>
    <div class="userSeting" v-loading="loading">
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="我的账户" name="first">
                <el-form :inline="true" :model="companyInfo" label-width="120px" class="form-inline">
                    <el-form-item label="用户姓名">
                        <el-input class="inputL" disabled="" v-model="companyInfo.username"
                                  placeholder="注册日期"></el-input>
                    </el-form-item>
                    <el-form-item label="药店全称">
                        <el-input class="inputL" disabled="" v-model="companyInfo.deptname"
                                  placeholder="注册日期"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input class="inputL" v-model="companyInfo.telephone" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="药店地址">
                        <el-input class="inputL" v-model="companyInfo.address" placeholder="药店地址"></el-input>
                    </el-form-item>
                    <el-form-item label="注册日期">
                        <el-input class="inputL" disabled="" v-model="companyInfo.registerdate"
                                  placeholder="注册日期"></el-input>
                    </el-form-item>
                    <el-form-item style="width:840px; padding-left: 120px;margin-top: 50px;">
                        <el-button class="search" @click="onSubmit" :loading="companyLoading">提交</el-button>
                    </el-form-item>
                </el-form>
                <!--                <video id="player-container-id" preload="auto" width="640" height="360" playsinline webkit-playsinline>-->
                <!--                </video>-->
            </el-tab-pane>

            <el-tab-pane label="修改密码" name="second">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px"
                         class="demo-ruleForm">
                    <el-form-item required label="原密码" prop="oldpwd">
                        <el-input style="width: 400px" type="password" v-model="ruleForm.oldpwd"></el-input>
                    </el-form-item>
                    <el-form-item required label="新密码" prop="newpwd">
                        <el-input style="width: 400px" type="password" v-model="ruleForm.newpwd"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item required label="确认新密码" prop="againpwd">
                        <el-input type="password" style="width: 400px" v-model="ruleForm.againpwd"
                                  autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="search" @click="submitForm('ruleForm')"
                                   :loading="passwordLoading">提交
                        </el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "userSeting",
    data() {
        var checkPassOld = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入密码'))
            }
            setTimeout(() => {
                callback()
            }, 1000)
        }
        var newpwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.ruleForm.againpwd !== '') {
                    this.$refs.ruleForm.validateField('againpwd')
                }
                callback()
            }
        }
        var againpwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.newpwd) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            loading: true,
            passwordLoading: false,
            companyLoading: false,
            appMsg: {},
            companyInfo: {
                address: '',
                telephone: '',
                deptid: '',
                username: '',
                deptname: '',
                registerdate: ''
            },
            activeName: 'first',
            ruleForm: {
                newpwd: '',
                againpwd: '',
                oldpwd: '',
                loginid: ''
            },
            rules: {
                oldpwd: [
                    {validator: checkPassOld, trigger: 'blur'}
                ],
                newpwd: [
                    {validator: newpwd, trigger: 'blur'}
                ],
                againpwd: [
                    {validator: againpwd, trigger: 'blur'}
                ],
            }
        }
    },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'appInfo',
            'userInfo'
            // ...
        ])
    },
    methods: {
        ...mapActions({
            'saveCompanyInfo': 'user/saveCompanyInfo',
            'changepassword': 'user/changepassword',
            'getInfo': 'user/getInfo',
        }),
        onSubmit() {
            this.companyLoading = true
            this.saveCompanyInfo(this.companyInfo)
                .then(res => {
                    this.$message.success('修改成功')
                    this.getConfig()
                    this.companyLoading = false
                })
                .catch(err => {
                    console.log(err)
                    this.companyLoading = false
                })
        },
        submitForm(formName) {
            this.passwordLoading = true
            this.$refs[ formName ].validate((valid) => {
                if (valid) {
                    const {name} = this.userInfo.token
                    this.ruleForm.loginid = name
                    this.changepassword(this.ruleForm)
                        .then(res => {
                            this.$message.success("修改成功")
                            this.passwordLoading = false
                        }).catch(err => {
                        this.passwordLoading = false
                        console.log(err)
                    })
                } else {
                    console.log('error submit!!')
                    this.passwordLoading = false
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[ formName ].resetFields()
        },
        getConfig() {
            const {userid, companyid} = this.userInfo
            console.log(userid)
            console.log(companyid)
            this.getInfo({userid, companyid})
                .then(res => {

                    /*                    lowesttime	number	最小审方时长
                                        country	string	区/县
                                        address	string	地址
                                        enterdate	string	建档日期
                                        city	string	市
                                        telephone	string	联系电话
                                        contactman	string	联系人
                                        companyid	string	公司ID
                                        province	string	省
                                        configid	string	配置ID
                                        logopath	string	logo地址
                                        companyname	string	企业全称
                                        companysortname	string	企业简称*/

                    setTimeout(() => {
                        this.loading = false
                        this.companyInfo = {
                            address: res.address,
                            telephone: res.telephone,
                            deptid: res.userinfo.deptid,
                            username: res.userinfo.username,
                            deptname: res.companyname,
                            registerdate: res.enterdate
                        }
                    }, 1000)
                }).catch(err => {
                this.loading = false
                console.log(err)
            })
        }
    },
    created() {
        // console.log(TCPlayer)
        /*this.$nextTick(()=>{
            var player = TCPlayer('player-container-id', { // player-container-id 为播放器容器ID，必须与html中一致
                fileID: '7447398157015849771', // 请传入需要播放的视频filID 必须
                appID: '1256993030' // 请传入点播账号的appID 必须
                //其他参数请在开发文档中查看
            });
        })*/

        /*        let obj1 = {a: 0, b: {c: 0}}
                let obj2 = {d: 0, g: {c: 0}}
                obj2 = Object.assign(obj2, obj1)
                console.log(obj2)*/
        this.getConfig()
        let path = this.$route.path
        if (path !== '/home/userSeting') { return }
        this.$store.commit('app/SET_ROUTER', path)
    }
}
</script>

<style lang="scss" scoped>
    .userSeting {
        width: 100%;
        height: 100%;

        & /deep/ .el-tabs--border-card {
            height: 100%;
        }

        & /deep/ .el-tabs__content {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60vh;
            width: 100%;
        }

        .form-inline {
            width: 900px;
            display: flex;
            flex-wrap: wrap;
            /*justify-content: center;*/
            /*align-items: center;*/
            .inputL {
                width: 300px;
            }
        }

        .search {
            color: #FFF;
            background-color: $color-btn;
            border-color: $color-btn;
        }
    }
</style>
