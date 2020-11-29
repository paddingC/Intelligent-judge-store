<template>
    <div class="login-container">
        <el-container style="height: 100%">
            <el-header class="el-header-box">
                <div class="left">
                    {{storeInfo.name1}}
                    <span style="font-size: 18px; font-weight: normal">
                        ({{userInfo.deptname}})
                    </span>
                </div>
                <ul class="right">
                    <router-link to="/home/userSeting" tag="li" exact-active-class exact><i
                        class="user-Seting-img"></i> <span>账户设置</span></router-link>
                    <li @click="routerTO"><i class="logout"></i> <span>退出登录</span></li>
                </ul>
            </el-header>
            <el-main class="login-main">
                <ul class="main-ul">
                    <router-link tag="li" class="main-li" :to="{ path: '/home/remoteAuditing/auditing' }">远程审方
                    </router-link>
                    <router-link tag="li" class="main-li" :to="{ path: '/home/chronicDisease/index' }">慢病管理
                    </router-link>
                    <router-link tag="li" class="main-li" :to="{ path: '/home/drugAdministration/form' }">特殊管理规定的药品
                    </router-link>
                    <router-link tag="li" class="main-li" :to="{ path: '/home/pharmacyAudit' }">药店审核</router-link>
                    <router-link tag="li" class="main-li" :to="{ path: '/home/medicationGuidance/physicianList' }">用药咨询</router-link>
                    <router-link tag="li" class="main-li" :to="{ path: '/home/remoteReferral/doctorList' }">远程复诊</router-link>
                </ul>

            </el-main>
            <el-footer class="login-footer">
                {{storeInfo.name2}}
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "dashboard",
    data() {
        return {}

    },
    mounted () {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    },
    created() {
        console.log(this.userInfo);
        this.$store.commit('app/SET_CALLFLAGE', false)
        this.$store.commit('app/SET_ROUTER', '')
    },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'storeInfo',
            'userInfo'
            // ...
        ])
    },
    sockets: {
        connect: function () {
            console.log('链接成功')
        },
        connecting: function () {
            console.log('正在连接')
        },
        connect_failed: function () {
            console.log('连接失败')
        },
        disconnect: function () {
            console.log('断开连接')
        },
        error: function () {
            console.log('错误发生，并且无法被其他事件类型所处理')
        },
    },
    methods: {
        cantGo() {
            this.$message.warning("待开发")
        },
        routerTO() {
            this.$store.commit('user/SET_REMOVERINFO')
            this.$socket.disconnect()
            sessionStorage.setItem('needUserid', '')
            sessionStorage.setItem('needCompanyid', '')
            this.$router.replace('/login')
        }
    },
    beforeDestroy(){
        window.location.reload()
    }
}
</script>


<style lang="scss" scoped>
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg: #fff;
    $light_gray: black;
    $cursor: black;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            /*border: 1px solid #dbdbdb;*/
            background: #ffffff;
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
        height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial';

        .el-header-box {
            height: 100px !important;
            background: inherit;
            background-color: rgba(240, 248, 250, 1);
            border: none;
            border-radius: 0px;
            line-height: 100px;
            display: flex;
            justify-content: space-between;

            .left {
                font-weight: 700;
                font-style: normal;
                font-size: 28px;
                color: #36C2AA;
            }

            .right {

                font-style: normal;
                font-size: 20px;
                color: #36C2AA;
                display: flex;
                justify-content: space-around;
                align-items: center;

                li {
                    width: 150px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .logout {
                        background: url("../assets/img/logout.png");
                        background-size: cover;
                    }

                    .user-Seting-img {
                        background: url("../assets/img/user.png");
                        background-size: cover;
                    }

                    i {
                        display: inline-block;
                        width: 30px;
                        height: 30px;

                    }

                    span {
                        padding-left: 10px;
                    }

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }

        .login-main {
            background: url("~@/assets/img/login-bg.png") no-repeat;
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .main-ul {
                width: 100%;
                display: flex;
                justify-content: space-around;
                /*align-items: center;*/
                flex-wrap: nowrap;

                .main-li {
                    cursor: pointer;
                    background-color: #dbe7f3;
                    height: 200px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 200px;
                    border-radius: 50%;
                    text-align: center;
                    border: 1px solid #49c7b2;
                    font-size: 26px;
                    box-shadow: 0 12px 14px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

                    color: #49c7b2;
                }
            }
        }

        .login-footer {
            text-align: center;
            height: 70px !important;
            background: inherit;
            background-color: rgba(240, 248, 250, 1);
            border: none;
            border-radius: 0px;
            line-height: 70px;
            font-weight: 700;
            font-style: normal;
            font-size: 28px;
            color: #36C2AA;
        }


        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }

    .el-input {
        background-color: #fff !important;
    }
</style>

