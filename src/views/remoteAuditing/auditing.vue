<script src="../../store/getters.js"></script>
<template>
    <div class="auditing" style="height: 100%">
        <p style="font-size: 16px;line-height: 20px;margin-bottom: 10px;">请将您的处方放置在处方采集设备下,并摆放整齐,确认处方无误后点击发送处方</p>
        <el-steps :active="active" finish-status="success">
            <!--            <el-step title="填写患者信息"></el-step>-->
            <el-step title="上传处方"></el-step>
            <el-step title="远程审方"></el-step>
        </el-steps>
        <el-divider class="divider"></el-divider>
        <div class="main2" v-show="active===1">
            <div class="photo">
                <img id="bigPriDev" style="width: 100%;height: 100%" alt="">
            </div>
            <div class="form2">
                <el-form :model="form" ref="form2" label-width="200px" class="demo-ruleForm">
                    <el-form-item label="处方类型" prop="resource">
                        <el-radio-group v-model="form2.type">
                            <el-radio v-for="item in comefrom"
                                      :key="item.value"
                                      :label="item.value"
                            >
                                {{item.label}}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--                    <el-form-item>-->
                    <el-button id="photographPriAudio" v-show="conactAgain===false" :disabled="clickPhoto"
                               style="margin-left: 131px;margin-bottom: 22px;" class="search"
                    >拍照
                    </el-button>
                    <el-button v-show="conactAgain" style="margin-left: 131px;margin-bottom: 22px;" class="search"
                               @click="takePhoto">重新呼叫
                    </el-button>
                    <div style="margin-left: 131px;margin-bottom: 22px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
                         class="demo-image__preview">
                        <el-image
                            style="width: 500px; height: 350px"
                            :src="url[0]"
                            :preview-src-list="url">
                            <div slot="error" class="image-slot"
                                 style="height: 100%;display: flex;justify-content: center;align-items: center;">
                                <i style="font-size: 50px" class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                    <!--                    </el-form-item>-->
                </el-form>
            </div>
        </div>
        <div class="main3" v-show="active===2">
            <div class="before" v-show="logins">
                <div class="loading">
                    <img
                        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576062520511&di=00fac763d7cf79087aedfed389e8754c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0152395be39c37a80121ab5d479b6c.gif"
                        alt="">
                </div>
                <div class="time">
                    <p>请稍后正在为您匹配合适的药师</p>
                    <p>{{time}}</p>
                    <el-button style="width: 200px;" @click="goBack" :disabled="isclick" class="search">返回</el-button>
                </div>
            </div>
            <div class="conact-success" v-show="logins===false">
                <div class="left-BOX">
                    <!--                    <div @click="goRoom"> 11111111</div>-->
                    <el-popover
                        placement="top-start"
                        title="证书图片"
                        trigger="hover"
                        :placement="placement"
                        content="点击查看全部图片">
                        <el-image
                            slot="reference"
                            style="height: 50%;"
                            :src="certificate[0]"
                            alt="证书图片"
                            :preview-src-list="certificate">
                        </el-image>
                    </el-popover>
                    <div style="height: 50%;">
                        <el-popover
                            placement="top-start"
                            title="处方图片"
                            trigger="hover"
                            :placement="placement"
                            content="点击查看全部图片">
                            <el-image
                                slot="reference"
                                style="height: 100%"
                                :src="recipelList[0]"
                                alt="处方图片"
                                :preview-src-list="recipelList">
                            </el-image>
                        </el-popover>
                    </div>
                </div>
                <div class="right-Box" id="remote_stream" style="position: relative;">
                    <div class="local" id="local_stream"
                         style="position: absolute; z-index: 9999;width: 200px;height: 200px;background-color: #f0f8fa;right: 0;bottom: 0px"></div>
                </div>
                <div style="position: absolute;bottom: 105px;left: 40%">
                    <label style="margin-left: 95px">切换摄像头&nbsp;&nbsp;</label>
                    <el-select v-model="chooseValue" @change="changeCamera" placeholder="请选择" >
                        <el-option
                            v-for="(item, index) in options"
                            :key="item.deviceId"
                            :label="item.label"
                            :value="index">
                        </el-option>
                    </el-select>
                    <el-button v-if="remoteLeave" @click="leaveRoom" style="margin-left: 25px">退出</el-button>
                    <el-button v-else disabled="disabled" style="margin-left: 25px">退出</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode       from "qrcodejs2"
import QWebChannel  from '../../common/qwebchannel'
import {mapGetters} from 'vuex'
// import TRTC         from 'trtc-js-sdk'

require('../../common/lib-generate-test-usersig.min')

import RtcClient from '../../common/RtcClient'

console.log(RtcClient)
export default {
    name: "auditing",
    data() {
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'))
            } else {
                const reg = /^1(2|3|4|5|6|7|8|9)\d{9}$/
                console.log(reg.test(value))
                if (reg.test(value)) {
                    callback()
                } else {
                    return callback(new Error('请输入正确的手机号'))
                }
            }
        }
        var checkId = (rule, value, callback) => {
            if (!value) {
                callback()
            } else {
                const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
                console.log(reg.test(value))
                if (reg.test(value)) {
                    callback()
                } else {
                    return callback(new Error('请输入正确的身份证'))
                }
            }
        }
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('患者姓名不能为空'))
            } else {
                callback()
            }
        }
        return {
            rtc: null,
            placement: 'top-end',
            certificateList: [],
            recipelList: [],
            time: 120,
            logins: false,
            setInterval: null,
            conactAgain: false,
            rules: {
                telphone: [
                    {validator: checkPhone, trigger: 'blur'}
                ],
                patientname: [
                    {validator: checkName, trigger: 'blur'}
                ],
                idcardno: [
                    {validator: checkId, trigger: 'blur'}
                ]
            },
            url: [],
            srcList: [],
            certificate: [], //证书图片
            active: 1,
            link: "我是二维码",
            form: {
                patientname: '',
                telphone: '',
                idcardno: "",
                openid: "",
            },
            form2: {
                type: 1,
            },
            comefrom: [ {label: '西药', value: 1},
                {label: '中药', value: 2} ],
            baseUrl: null,
            userId: 'a999999',
            client_: null,
            isPublished_: false,
            localStream_: null,
            videoType: null,
            hasIn: true,
            chooseValue: '',
            options: [],
            remoteState: false,
            isclick: false, //返回按钮不可多次点击
            clickPhoto: false,
            curRoomid: ''
        }
    },
    computed: {
        ...mapGetters([
            'patientInfo',
            'userInfo',
            'token',
            'videoKey',
            'callFlage',
            //'inType',
            //'inObj',
            'prescriptionid',// 处方ID
            'camerasArr',
            'remoteLeave'
            // ...
        ])
    },
    sockets: {
        connect: function () {
            console.log('socket 链接成功--------------------')
            this.$socket.emit('login', JSON.stringify({
                userid: this.userInfo.userid, companyid: this.userInfo.companyid
            }))
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
        // 有药师接单
        videoResults: function (data) {
            clearInterval(this.setInterval)
            console.log(data, "-------------ideoResults:远程审方-------------")
            if (data.type === 1) {
                this.logins = false
                this.curRoomid = data.roomid
                this.getKey(data.roomid)
                this.certificate = data.pharmacistinfo.certificate
                this.recipelList = []
                this.recipelList = data.prescriptioninfo.imageurl
                this.$store.commit('app/SET_CALLFLAGE', true)
                //this.$store.commit('user/SET_INTYPE', true)
                //this.$store.commit('user/inObj', data)
            }
        },
        approveCompletion: function (data) {
            if (this.curRoomid == data.roomid){
                this.$store.commit('app/SET_CALLFLAGE', false)
                this.rtc.leave()
                this.$router.replace({
                    path: '/home/pharmacyAudit',
                    query: {
                        reason: data.reason,
                        approvalstatus: data.approvalstatus,
                    }
                })
            }
        },
        cancelCallback: function (data) {
            if (data.status === 200) {
                this.$store.commit('app/SET_CALLFLAGE', false)
                this.active = 1
                this.conactAgain = true
                this.isclick = false
                clearInterval(this.setInterval)
            }else if (data.status === 400) {
                this.$message.warning(data.msg)
                this.isclick = false
            }
        }
    },
    methods: {
        goBack() {
            this.isclick = true
            this.clickPhoto = false
            this.$socket.emit('cancelCall', JSON.stringify({
                userid: this.userInfo.userid, companyid: this.userInfo.companyid
            }))

        },
        openSocket() {
            const that = this
            var socket = new WebSocket(this.baseUrl)
            socket.onclose = function () {
                console.error("web channel closed")
            }
            socket.onerror = function (error) {
                console.error("web channel error: " + error)
            }
            socket.onopen = function () {
                that.output("WebSocket start connect")
                new QWebChannel(socket, function (channel) {
                    // make dialog object accessible globally
                    window.dialog = channel.objects.dialog
                    //网页关闭函数
                    window.onbeforeunload = function () {
                        console.log('网页关闭函数')
                        window.dialog.get_actionType("closeSignal")
                    }
                    window.onunload = function () {
                        console.log('网页关闭函数onunload')
                        window.dialog.get_actionType("closeSignal")
                    }
                    //反初始化
                    // document.getElementById("closeHtml").onclick = function () {
                    //     dialog.get_actionType("closeSignal")
                    //     var element = document.getElementById("bigPriDev")
                    //     element.src = ""
                    // }
                    //初始化
                    // document.getElementById("openHtml").onclick = function () {
                    window.dialog.html_loaded("one")
                    // }
                    //点击拍照按钮
                    document.getElementById("photographPriAudio").onclick = function () {
                        this.clickPhoto = true
                        dialog.photoBtnClicked("primaryDev_")
                        dialog.get_actionType("savePhotoPriDev")
                    }
                    //服务器返回消息
                    dialog.sendPrintInfo.connect(function (message) {
                        // that.output(message,"-----------------------")
                        if (message.indexOf("priDevName") != -1) {
                            console.log(message, "-----------------")
                            console.log(message.length)
                            let videoType = message.slice(11, message.length)
                            console.log(videoType)
                            sessionStorage.setItem('videoType', videoType)
                        }
                        // 图片保存后返回路径关键字savePhoto_success:
                        if (message.indexOf("savePhoto_success:") >= 0) {
                            let imgPath = message.substr(18)
                            console.log(imgPath, '图片保存后返回路径关键字savePhoto_success')
                        }
                    })
                    //接收图片流用来展示，多个，较小的base64数据
                    dialog.send_priImgData.connect(function (message) {
                        var element = document.getElementById("bigPriDev")
                        if (element) {
                            element.src = "data:image/jpg;base64," + message
                        }
                    })
                    //接收拍照base64
                    dialog.send_priPhotoData.connect(function (message) {
                        that.url = []
                        that.url.push("data:image/jpg;base64," + message)
                        that.sxSaveDoc()
                    })
                    that.output("ready to send/receive messages!")
                    //网页加载完成信号
                    dialog.html_loaded("one")
                })
            }
        },
        output(message) {
            var c = `%c ${message}`
            console.log(c, "color:orange;font-size:16px")
        },
        // 初始化高拍仪
        photoInit() {
            this.baseUrl = "ws://127.0.0.1:12345"
            this.output("Connecting at " + this.baseUrl + ".")
            this.openSocket()
        },
        takePhoto() {
            this.sxSaveDoc()
        },
        changeCamera (e){
            console.log(e);
            // 0 高拍仪 1 摄像头
            this.rtc.switchCamera(e)
        },
        submitForm(formName) {
            this.$refs[ formName ].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('remoteAuditing/savePatient', this.form)
                        .then(res => {
                            this.photoInit()
                            this.next()
                        }).catch(err => {
                        console.log(err, 'err')
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[ formName ].resetFields()
        },
        next() {
            if (this.active++ > 2) this.active = 0
        },
        qrcode() {
            let qrcode = new QRCode('qrcode', {
                width: 300,
                height: 300,        // 高度
                text: this.link,   // 二维码内容
                // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                // background: '#f0f',   // 背景色
                // foreground: '#ff0'    // 前景色
            })
        },
        getParms() {
            return {
                prescriptiontype: this.form2.type, //处方类型
                patient: this.form.patientname,// 患者姓名
                idcard: this.form.idcardno,// 身份证号
                insiderphone: this.form.telphone,// 手机号
                patientid: '',// 患者ID 微信登录 传
                inputmanid: this.userInfo.userid,// 录入人ID
                deptid: this.userInfo.deptid,// 部门ID
                companyid: this.userInfo.companyid,// 入驻企业ID
                attribute: '1',// 普通处方
                comefrom: '1',// 拍照处方
                imageurl: this.url,//处方图片base64 数组
                companyname: this.userInfo.companyname,
                deptname: this.userInfo.deptname,
                inputmanname: this.userInfo.username
            }
        },
        //点击拍照
        sxSaveDoc() {
            const that = this
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.3)'
            })
            const parms = this.getParms()
            this.$store.dispatch('remoteAuditing/sxsavedoc', parms).then(prescriptionid => {
                that.$socket.emit('getPharmacist', JSON.stringify({
                    userid: parms.inputmanid, companyid: parms.companyid, prescriptionid: prescriptionid
                }))
                // that.prescriptionid = prescriptionid
                this.$store.commit('user/SET_PRESCRIPTIONID', prescriptionid)
                that.active = 2
                that.logins = true
                loading.close()
                that.time = 120
                that.setInterval = setInterval(() => {
                    that.time--
                    if (that.time <= 0) {
                        this.$socket.emit('cancelCall', JSON.stringify({
                            userid: this.userInfo.userid, companyid: this.userInfo.companyid
                        }))
                        clearInterval(that.setInterval)
                        this.$store.commit('app/SET_CALLFLAGE', false)
                        that.time = '链接超时'
                    }
                }, 1000)
            }).catch(err => {
                loading.close()
                console.log(err, 'err')
                this.$store.commit('app/SET_CALLFLAGE', false)
            })
        },
        getKey(rooID) {
            // if (!this.videoKey.userSig) {
            // let id = mduserid + '_1_' + this.prescriptionid
            this.$store.dispatch('app/getKey', {userid: this.userInfo.userid,  companyid: this.userInfo.companyid})
                .then(res => {
                    let parms = res
                    parms.rooID = rooID
                    console.log(parms)
                    this.$nextTick(() => {
                        window.dialog.get_actionType("closeSignal")
                        // this.createClient(this.videoKey, rooID)
                        this.join(this.videoKey, rooID)
                    })
                })
                .catch(err => {
                    this.$message.warning('获取视频配置信息失败')
                    console.log(err)
                })
            // }

        },
        join(config, rooID) {
            this.rtc = null
            if (this.rtc) return
            this.rtc = new RtcClient({
                userId: config.userid,
                roomId: rooID,
                sdkAppId: config.sdkAppId,
                userSig: config.userSig
            })
            // this.rtc.join()
            this.rtc.saveCameras()
            this.rtc.getCameraId()
            setTimeout(()=>{
                console.log(this.camerasArr);
                console.log('有没有取到摄像头');
                this.options = this.camerasArr
            },1500)
        },
        listenerHandle () {
            // 键盘值
            document.onkeydown=function (e) {
                var ev = window.event || e;
                var code = ev.keyCode || ev.which;
                console.log('jhhhh',code);
                if (code == 116||(ev.ctrlKey==true && code==82) ||(ev.ctrlKey==true && code==116)) {
                    ev.cancelBubble = true;
                    ev.preventDefault();
                    return false;
                }
            }
            document.oncontextmenu=function(){return false}
        },
        leaveRoom () {
            this.$store.commit('app/SET_CALLFLAGE', false)
            this.rtc.leave()
            this.$router.replace({path: '/home/pharmacyAudit',})
        }
    },
    mounted() {
        this.$nextTick(function () {
            this.photoInit()
        })
        console.log(this.remoteLeave);
    },
    created() {
        let path = this.$route.path
        if (path !== '/home/remoteAuditing/auditing') { return }
        this.$store.commit('app/SET_ROUTER', path)
        if (this.active !== 3) {
            this.$store.commit('app/SET_CALLFLAGE', false)
        }
        // 快捷键
        this.listenerHandle()

    },
    beforeDestroy() {
        this.$socket.emit('cancelCall', JSON.stringify({
            userid: this.userInfo.userid, companyid: this.userInfo.companyid
        }))
        window.location.reload()
        this.$nextTick(() => {
            if (!!window.dialog.get_actionType) {
                window.dialog.get_actionType("closeSignal")
            }
            clearInterval(this.setInterval)
        })
    }
}
</script>
<style>
    .el-step__head.is-success, .el-step__title.is-success {
        color        : #36c2aa;
        border-color : #36c2aa;
    }
    .el-step.is-horizontal .el-step__line {
        height : 2px;
        top    : 30px;
        left   : 0;
        right  : 0;
    }
    .el-step__icon.is-text {
        border-radius : 50%;
        border        : 2px solid;
        border-color  : inherit;
    }
    .el-step__icon {
        width     : 62px;
        height    : 62px;
        font-size : 28px;
    }
</style>
<style lang="scss" scoped>
    .auditing {
        padding: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

        .divider {
            margin: 9px 0px;
        }

        .search {
            color: #FFF;
            background-color: $color-btn;
            border-color: $color-btn;
        }

        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .main1 {
            display: flex;
            flex: 1;
            justify-content: space-around;
            align-items: center;

            .qrcode {

                width: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .form {
                flex: 1;
            }
        }

        .main2 {
            flex: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: row;

            .photo {
                width: 700px;
                height: 100%;
                /*background-color: rosybrown;*/
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            }

            .form2 {
                align-self: flex-start;
                min-width: 600px;
                height: 100%;
            }
        }

        .main3 {
            /*height: 100%;*/
            padding: 10px 0;
            height: 540px;
            /*flex: 1;*/
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: row;

            .before {
                width: 500px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                /*align-items: center;*/
                align-items: center;
                height: 400px;

                .loading {
                    width: 200px;
                    height: 200px;

                    img {
                        height: 100%;
                        width: 100%;
                    }
                }

                .time {
                    box-sizing: border-box;
                    padding-top: 20px;
                    text-align: center;

                    p {
                        font-size: 23px;
                        padding: 15px;
                    }
                }
            }

            .conact-success {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                /*align-items: center;*/
                align-items: center;
                width: 100%;
                height: 100%;
                box-sizing: border-box;

                .left-BOX {
                    width: 40%;
                    height: 100%;
                    overflow: hidden;
                    box-sizing: border-box;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .right-Box {
                    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                    width: 56%;
                    /*height: 80%;*/
                    height: 100%;
                    box-sizing: border-box;
                    background-color: #f0f8fa !important;
                    background: url("../../assets/img/videoIcon.png") no-repeat;
                    background-position:center;
                }
            }
        }
    }
</style>

