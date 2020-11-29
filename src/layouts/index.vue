<template>
    <div class="login-container" style="height: 100%">
        <el-container style="height: 100%;">
            <el-header class="el-header-box">
                <div class="left">
                    {{storeInfo.name1}}
                    <span style="font-size: 18px; font-weight: normal">
                        ({{userInfo.deptname}})
                    </span>
                </div>
                <ul class="center">
                    <li :class="{active:item.to===activeRouer}" v-for="(item ,index) in routerList1"
                        @click="setRoute(item.to)"
                        tag="li" :key="index">
                        <i :class="item.className"></i> <span>{{item.name}}</span>
                    </li>
                </ul>
                <ul class="right">
                    <li :class="{active:item.to===activeRouer}" v-for="(item ,index) in routerList2"
                        @click="setRoute(item.to)"
                        tag="li" :key="index">
                        <i :class="item.className"></i> <span>{{item.name}}</span>
                    </li>
                </ul>
            </el-header>
            <el-main class="login-main">
                <slot>
                    <router-view/>
                </slot>
            </el-main>
            <el-footer class="login-footer">
                {{storeInfo.name2}}
            </el-footer>
        </el-container>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
    name: "Layout",
    data() {
        return {
            routerList1: [
                {
                    to: '/home/remoteAuditing/auditing',
                    className: 'remoteAuditing-img',
                    name: '远程审方'
                },
                {
                    to: '/home/chronicDisease/index',
                    className: 'chronicDisease-img',
                    name: '慢病管理'
                },
                {
                    to: '/home/drugAdministration/form',
                    className: 'drugAdministration-img',
                    name: '特殊管理规定的药品'
                },
                {
                    to: '/home/pharmacyAudit',
                    className: 'pharmacyAudit-img',
                    name: '药店审核'
                },
                // {
                //     to: '/home/medicationGuidance/physicianList',
                //     className: 'medicationGuidance-img',
                //     name: '用药指导'
                // },
                {
                    to: '/home/historyRecipel',
                    className: 'historyRecipel-img',
                    name: '处方管理'
                },
                {
                    to:  '/home/advisory',
                    className: 'advisory-img',
                    name: '咨询查询'
                }
            ],
            routerList2: [
                {
                    to: '/logout',
                    className: 'logout',
                    name: '退出登录'
                },
                {
                    to: '/home/userSeting',
                    className: 'user-Seting-img',
                    name: '账户设置'
                },
                {
                    to: '/dashboard',
                    className: 'toindex',
                    name: '返回首页'
                }
            ]
        }
    },
    components: {},
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'storeInfo',
            'userInfo',
            'activeRouer',
            'callFlage'
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
        setRoute(path) {
            if (this.callFlage) {
                let url = window.location.href
                if (url.includes('/home/remoteReferral/connectPhysician')) {
                    this.$message.warning('门店结束复诊后在进行本操作')
                    return false
                } else {
                    this.$message.warning('请在结束视频通话后进行本操作')
                    return false
                }
            }
            if (path === '/home/advisory') {
                this.$message.warning('开发中...')
                return false
            }
            if (path === '/logout') {
                this.$store.commit('user/SET_REMOVERINFO')
                this.$socket.disconnect()
                sessionStorage.setItem('needUserid', '')
                sessionStorage.setItem('needCompanyid', '')
                this.$router.push({
                    path: '/'
                })
                return false
            }
            let pathNow = this.$route.path
            if (pathNow === path) {
                window.location.reload()
                return false
            }
            this.$router.push({
                path: path
            })
            this.$store.commit('app/SET_ROUTER', path)
            console.log(this.$store.state.app)
        }
    },
    mounted() {
        // this.setRoute()
        // this.$store.commit('app/SET_ROUTER', path)
        console.log(this.activeRouer)
    },
    beforeDestroy(){
        window.location.reload()
    }
}
</script>
<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .active {
        color: red;
    }

    .login-container {
        width: 100%;
        background-color: $color-common;;

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

            .center {
                flex: 1;
                text-align: right;
                padding-left: 125px;
                font-style: normal;
                font-size: 20px;
                color: #36C2AA;
                display: flex;
                justify-content: center;

                li {
                    height: 100%;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-direction: column;
                    width: 160px;

                    .remoteAuditing-img {
                        background: url("../assets/img/remoteAuditing.png") 100% 100% no-repeat;
                        background-size: contain;

                    }

                    .chronicDisease-img {
                        background: url("../assets/img/chronicDisease.png") 100% 100% no-repeat;
                        background-size: contain;

                    }

                    .drugAdministration-img {
                        background: url("../assets/img/drugAdministration.png") 100% 100% no-repeat;
                        background-size: contain;

                    }

                    .pharmacyAudit-img {
                        background: url("../assets/img/pharmacyAudit.png") 100% 100% no-repeat;
                        background-size: contain;

                    }

                    .medicationGuidance-img {
                        background: url("../assets/img/medicationGuidance.png") 100% 100% no-repeat;
                        background-size: contain;

                    }

                    .historyRecipel-img {
                        background: url("../assets/img/historyRecipel.png") 100% 100% no-repeat;
                        background-size: contain;

                    }
                    .advisory-img {
                        background: url("../assets/img/advisory.png") 100% 100% no-repeat;
                        background-size: contain;

                    }

                    i {
                        font-size: 60px;
                        height: 70px;
                        width: 50px;
                        text-align: center;
                        display: inline-block;
                        margin-bottom: 10px;
                        /*width: 30px;*/
                        /*height: 30px;*/
                    }

                    span {

                        font-size: 16px;
                        line-height: 30px;
                    }

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            .right {
                font-style: normal;
                font-size: 18px;
                color: #36C2AA;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                li {
                    //text-align: right;
                    width: 150px;
                    height: 30px;
                    line-height: 30px;

                    .logout {
                        background: url("../assets/img/logout.png");
                        background-size: cover;
                        width: 15px;
                        height: 15px;
                    }

                    .user-Seting-img {
                        background: url("../assets/img/user.png");
                        background-size: cover;
                        width: 15px;
                        height: 15px;
                    }

                    .toindex {
                        background: url("../assets/img/toindex.png");
                        background-size: cover;
                        width: 15px;
                        height: 15px;
                    }

                    i {
                        font-size: 18px;
                        display: inline-block;
                    }

                    span {
                        padding-left: 10px;
                        font-size: 16px;
                    }

                    &:hover {
                        cursor: pointer;
                    }
                }
            }
        }

        .login-main {
            /*background: url("~@/assets/img/login-bg.jpg") no-repeat;*/
            /*-webkit-background-size: 100% 100%;*/
            /*background-size: 100% 100%;*/
            background-color: rgb(242, 242, 242);
            overflow: auto;
            min-height: 750px;
            color: #454545;
            padding: 20px 130px !important;
            box-sizing: border-box;

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
