<template>
    <div class="form">
        <el-card class="box-card" style="height: 100%" v-show="active!==3">
            <div class="left">
                <div v-show="active===1">
                    <p style="font-size: 18px">
                        填写个人信息
                    </p>
                    <el-form style="padding-top: 80px;" :model="form" ref="form" status-icon :rules="rules"
                             label-width="120px"
                             class="demo-ruleForm">
                        <el-form-item
                            required
                            label="患者姓名"
                            prop="patientname"
                        >
                            <el-input style="min-width: 200px" v-model.number="form.patientname"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item
                            required
                            label="身份证"
                            prop="idcardno"
                        >
                            <el-input style="min-width: 200px" type="idcardno" v-model="form.idcardno"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item
                            required
                            label="患者联系方式"
                            prop="telphone"
                        >
                            <el-input style="min-width: 200px" type="telphone" v-model.number="form.telphone"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item style="padding-top: 150px;">
                            <el-button class="search" @click="submitForm('form')">下一步</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-show="active===2">
                    <p style="font-size: 18px;margin-bottom: 65px;">
                        填写药品信息
                    </p>
                    <el-form :model="form" ref="ruleForm" label-width="150px"
                             class="demo-ruleForm">
                        <el-form-item label="药品名称" prop="goodsname">
                            <el-autocomplete
                                v-model="form.goodsname"
                                class="searchDrug"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                            ></el-autocomplete>
                        </el-form-item>
                        <el-form-item label="规格" prop="goodstype">
                            <el-input style="min-width: 200px" v-model="form.goodstype"
                                      autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="生产厂家" prop="factoryname">
                            <el-input v-model.number="form.factoryname" style="min-width: 200px"></el-input>
                        </el-form-item>
                        <el-form-item label="数量" prop="goodsqty">
                            <el-radio v-model="form.goodsqty" label="1" border>1</el-radio>
                            <el-radio v-model="form.goodsqty" label="2" border>2</el-radio>
                        </el-form-item>
                        <el-form-item label="生产批号" prop="lotno">
                            <el-input v-model="form.lotno" style="min-width: 200px"></el-input>
                        </el-form-item>
                        <div
                            style="display: flex;justify-content: space-between;align-items: center;padding-top: 150px;">
                            <el-button type="primary" style="width: 150px" @click="active=1">返回上一步
                            </el-button>
                            <el-button style="margin-right: 100px;width: 150px" @click="callMed('ruleForm')" :disabled="finishClick" class="search">完成</el-button>
                        </div>

                    </el-form>
                </div>
            </div>
            <div class="border1px"></div>
            <div class="right">
                <div v-show="active===1">
                    <p style="font-size: 18px">
                        身份证上传 ( 正反面 )
                    </p>
                    <div class="right-box" style="padding-top: 80px;">
                        <div class="idcard">
                            <el-button type="danger" size="small" @click="delId('idCardOne')" class="del-z"
                                       icon="el-icon-delete" circle></el-button>
                            <el-button @click="delId('idCardTwo')" type="danger" size="small" class="del-f"
                                       icon="el-icon-delete" circle></el-button>
                            <el-image :src="idCardOne" class="idcard">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-s-custom" style="font-size: 100px"></i>
                                </div>
                            </el-image>
                            <el-image :src="idCardTwo" class="idcard">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                                <i class="el-icon-delete-solid del-f"></i>
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-s-custom" style="font-size: 100px"></i>
                                </div>
                            </el-image>

                        </div>
                        <div class="take-p" id="">
                            <img id="bigPriDev" :src="showPic" alt="">
                            <el-button id="photographPriForm" type="warning" style="margin:15px 0;"
                            >拍照
                            </el-button>
                        </div>
                    </div>
                </div>
                <div v-show="active===2">
                    <p style="font-size: 18px;margin-bottom: 65px;">
                        处方信息
                    </p>
                    <div class="right-box">
                        <div class="medic">
                            <div style="margin-bottom: 20px;font-size: 16px !important;">
                                <span style="margin-right: 10px;"> 处方类型</span>
                                <el-radio-group v-model="form.prescriptiontype">
                                    <el-radio v-for="item in comefrom"
                                              :key="item.value"
                                              :label="item.value"
                                              style="font-size: 16px !important;"
                                    >
                                        {{item.label}}
                                    </el-radio>
                                </el-radio-group>
                            </div>
                            <el-button @click="delId('prescriptionimage')" type="danger" size="small" class="del-m"
                                       icon="el-icon-delete" circle></el-button>
                            <el-image :src="form.prescriptionimage[0]" class="idcard">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-reading
" style="font-size: 100px"></i>
                                </div>
                            </el-image>
                        </div>
                        <div class="take-p">
                            <img :src="showPic2" alt="">
                            <el-button id="photographPri2A" type="warning" style="margin: 5px 0;"
                            >拍照
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card class="box-card2" style="height: 100%" v-show="active===3">
            <div class="before" v-show="active===3&&flage===true">
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
            <div class="conact-success" v-show="active===3&&flage===false">
                <div class="left-BOX">
                    <p style="font-weight: 700;
    font-size: 18px;
    padding: 5px 0;">执业资格证</p>
                    <el-tooltip class="item" effect="dark" content="点击查看详情" placement="bottom-start">
                        <el-image
                            style="height: 50%;"
                            :src="certificate[0]"
                            alt="证书图片"
                            :preview-src-list="certificate">
                        </el-image>
                    </el-tooltip>
                    <div style="height: 50%;">
                        <el-tooltip class="item" effect="dark" content="点击查看详情" placement="bottom-start">
                            <el-image
                                style="height: 100%"
                                :src="imageurl[0]"
                                alt="处方图片"
                                :preview-src-list="imageurl">
                            </el-image>
                        </el-tooltip>

                    </div>
                </div>
                <div class="right-Box" id="remote_stream" style="position: relative">
                    <div class="local" id="local_stream"
                         style="position: absolute; z-index: 9999;width: 200px;height: 200px;background-color: #f0f8fa;right: 0;bottom: 0"></div>
                </div>
                <div style="position: absolute;bottom: 105px;left: 41%">
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
        </el-card>
    </div>
</template>

<script>
import QWebChannel              from '../../common/qwebchannel'
import {mapGetters, mapActions} from 'vuex'
// import TRTC                     from 'trtc-js-sdk'
import RtcClient                from '../../common/RtcClient'

export default {
    name: "forms",
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
                return callback(new Error('身份证号不能为空'))
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
            time: 120,
            flage: true,
            restaurants: [],
            state: '',
            timeout: null,
            comefrom: [ {label: '西药', value: 1}, {label: '中药', value: 2} ],
            type: 1,
            prescriptionimage: null,
            showPic2: null,
            showPic: null,
            baseUrl: null,
            idCardOne: null,
            idCardTwo: null,
            certificate: [],
            imageurl: [],
            active: 1,
            prescriptionid: null,
            ruleForm: {
                pass: '',
                checkPass: '',
                age: '',
                radio1: '1',
                prod: ''
            },
            form: {
                patientname: '',
                idcardno: '',
                telphone: "",
                idcardimage: [],
                goodsname: '',
                factoryname: '',
                goodsqty: '1',
                goodstype: '',
                lotno: '',
                pkid: '',
                prescriptiontype: 1,
                prescriptionimage: []
            },
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
            placement: 'left-start',
            certificateList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
            ],
            recipelList: [
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            ],
            srcList: [ 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
                       'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', ],
            setInterval: null,
            restaurants: [],
            chooseValue: '',
            options: [],
            isclick: false,
            finishClick: false,
            curRoomid: ''
        }
    },
    computed: {
        ...mapGetters([
            'appInfo',
            'userInfo',
            'patientInfo',
            'token',
            'videoKey',
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
                this.flage = false
                this.curRoomid = data.roomid
                this.getKey(data.mduserid, data.roomid)
                this.$store.commit('app/SET_CALLFLAGE', true)
                this.certificate = data.pharmacistinfo.certificate
                this.imageurl = data.prescriptioninfo.imageurl
            }
        },
        approveCompletion: function (data) {
            if (this.curRoomid == data.roomid) {
                this.rtc.leave()
                this.$store.commit('app/SET_CALLFLAGE', false)
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
                this.photoInit()
                this.$socket.emit('cancelCall ')
                this.$store.commit('app/SET_CALLFLAGE', false)
                this.active = 2
                clearInterval(this.setInterval)
                this.flage = true
                this.isclick = false
            }else if (data.status === 400) {
                this.$message.warning(data.msg)
                this.isclick = false
            }
        }
    },
    methods: {
        ...mapActions(
            {
                buyspecialdrug: 'drugAdministration/buyspecialdrug',
                goodList: 'drugAdministration/findGood',
            }),
        callMed() {
            if (this.form.prescriptionimage.length === 0) {
                this.$message.warning('请上传处方照片')
                return false
            }
            if (!this.form.goodsname) {
                this.$message.warning('请录入货品')
                return false
            }
            this.finishClick = true
            this.form.companyid = this.userInfo.companyid
            this.form.deptid = this.userInfo.deptid
            this.form.userid = this.userInfo.userid
            this.form.companyname = this.userInfo.companyname
            this.form.deptname = this.userInfo.deptname
            this.form.inputmanname = this.userInfo.username
            this.buyspecialdrug(this.form).then(res => {
                console.log(res)
                console.log(this.userInfo)
                this.prescriptionid = res.prescriptionid
                this.$socket.emit('getPharmacist', JSON.stringify({
                    userid: this.userInfo.userid, companyid: this.userInfo.companyid, prescriptionid: res.prescriptionid
                }))
                this.flage = true
                this.time = 120
                this.active = 3
                this.setInterval = setInterval(() => {
                    this.time--
                    if (this.time <= 0) {
                        clearInterval(this.setInterval)
                        this.$socket.emit('cancelCall', JSON.stringify({
                            userid: this.userInfo.userid, companyid: this.userInfo.companyid
                        }))
                        this.$store.commit('app/SET_CALLFLAGE', false)
                        this.time = '链接超时'
                        this.flage = true
                        this.finishClick = false
                    }
                }, 1000)
            }).catch(err => {
                console.log(err)
                this.finishClick = false
                this.$store.commit('app/SET_CALLFLAGE', false)
            })
        },
        goBack() {
            /*this.photoInit()
            this.$socket.emit('cancelCall ')
            this.$store.commit('app/SET_CALLFLAGE', false)*/
            this.isclick = true
            this.finishClick = false
            this.$socket.emit('cancelCall', JSON.stringify({
                userid: this.userInfo.userid, companyid: this.userInfo.companyid
            }))
            /*this.active = 2
            this.flage = true
            clearInterval(this.setInterval)*/
        },
        submitForm(formName) {
            this.$refs[ formName ].validate((valid) => {
                if (valid) {
                    if (formName === 'form') {
                        if (this.idCardTwo !== null && this.idCardOne !== null) {
                            // this.$message.success('基础信息填写完毕')
                            this.form.idcardimage = []
                            this.form.idcardimage.push(this.idCardOne, this.idCardTwo)
                            console.log(this.form)
                            this.active = 2
                        } else {
                            this.$message.info('请上传身份证信息')
                        }
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[ formName ].resetFields()
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
                    // window.dialog.html_loaded("one")
                    //网页关闭函数
                    window.onbeforeunload = function () {
                        window.dialog.get_actionType("closeSignal")
                    }
                    window.onunload = function () {
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

                    //拍照按钮点击
                    document.getElementById("photographPriForm").onclick = function () {
                        dialog.photoBtnClicked("primaryDev_")
                        dialog.get_actionType("savePhotoPriDev")
                    }
                    document.getElementById("photographPri2A").onclick = function () {
                        dialog.photoBtnClicked("primaryDev_")
                        dialog.get_actionType("savePhotoPriDev")
                    }
                    //服务器返回消息
                    dialog.sendPrintInfo.connect(function (message) {
                        // that.output(message)
                        //图片保存后返回路径关键字savePhoto_success:
                        // if (message.indexOf("savePhoto_success:") >= 0) {
                        //     imgPath = message.substr(18)
                        // }
                        if (message.indexOf("priDevName") != -1) {
                            console.log(message, "-----------------")
                            let videoType = message.slice(11, message.length)
                            sessionStorage.setItem('videoType', videoType)
                        }
                    })
                    //摄像头图片展示
                    dialog.send_priImgData.connect(function (message) {
                        // var element = document.getElementById("bigPriDev")
                        let src = "data:image/jpg;base64," + message
                        // element.src = src
                        if (that.active === 1) {
                            that.showPic = src
                        } else {
                            that.showPic2 = src
                        }

                    })

                    //接收拍照base64
                    dialog.send_priPhotoData.connect(function (message) {
                        let url = "data:image/jpg;base64," + message
                        if (that.active === 1) {
                            if (that.idCardOne === null) {
                                that.idCardOne = url
                            } else {
                                that.idCardTwo = url
                            }
                        } else {
                            that.form.prescriptionimage = []
                            that.form.prescriptionimage.push(url)
                            console.log(that.form.prescriptionimage)
                        }

                        // var element = document.getElementById("devPhoto")
                        // element.src = "data:image/jpg;base64," + message
                    })
                    that.output("ready to send/receive messages!")
                    //网页加载完成信号
                    dialog.html_loaded("one")
                })
            }
        },
        output(message) {
            console.log(message)
        },
        photoInit() {
            this.baseUrl = "ws://127.0.0.1:12345"
            this.output("Connecting at " + this.baseUrl + ".")
            this.openSocket()
        },
        delId(type) {
            if (type === 'prescriptionimage') {
                this.form.prescriptionimage = []
                return
            }
            this[ type ] = null
            console.log(this[ type ])
        },
        async querySearchAsync(queryString, cb) {
            console.log(queryString, '输入的值')
            // await this.getGoodList(queryString)
            const d = await this.goodList(
                {
                    companyid: this.userInfo.companyid,
                    usestatus: 1,
                    pageIndex: '',
                    pageSize: '',
                    key: this.form.goodsname,
                    specialdrug: 1,
                }
            )
            console.log(d)
            if (d.length === 0) {
                this.form.goodstype = ''
                this.form.goodsname = ''
                this.form.pkid = ''
            }
            // var results = queryString ? d.filter(this.createStateFilter(queryString)) : this.restaurants
            var c = d.map(( item => {
                return {
                    value: item.goodsname,
                    goodstype: item.goodstype,
                    pkid: item.pkid,
                }
            } ))

            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {

                if (c.length === 0) {
                    this.$message.info("未查到该药品")

                }
                cb(c)

            }, 1500)
        },
        createStateFilter(queryString) {
            return (state) => {
                // if (state.goodsname.toLowerCase().includes(queryString.toLowerCase()) === 0 ||state.opcode.toLowerCase().includes(queryString.toLowerCase()) === 0 ){
                console.log(state, '------------')
                if (!state) {
                    this.form.goodstype = ''
                    this.form.pkid = ''
                    console.log("没查到")
                }
                return state
                // }

            }
        },
        handleSelect(item) {
            console.log(item)
            this.form.goodstype = item.goodstype
            this.form.pkid = item.pkid
        },
        getGoodList() {
            this.goodList(
                {
                    companyid: '',
                    usestatus: 1,
                    pageIndex: '',
                    pageSize: '',
                    key: this.form.goodsname,
                    specialdrug: 1,
                }
            )
                .then(res => {
                    console.log(res)
                    this.restaurants = res
                })
                .catch(err => {

                })
        },
        async createClient(config, rooID = 66666) {
            // 1创建 Client 对象
            this.client_ = TRTC.createClient({
                mode: 'videoCall', // 实时通话模式
                sdkAppId: config.sdkAppId,
                userId: config.userid,
                userSig: config.userSig,
            })
            // 远端流通过监听事件
            this.client_.on('stream-added', event => {
                const remoteStream = event.stream
                console.log('--------------远端流增加--------------')
                // 订阅远端音频和视频流
                this.client_.subscribe(remoteStream, {audio: true, video: true})
            })
            //远端流订阅成功显示远端流
            this.client_.on('stream-subscribed', event => {
                const remoteStream = event.stream
                // 远端流订阅成功，播放远端音视频流
                console.log("--------------开始播放远端留--------------")
                remoteStream.play('remote_stream')
            })
            // 监听‘stream-removed’事件
            this.client_.on('stream-removed', event => {
                const remoteStream = event.stream
                remoteStream.stop()
                console.log('监听‘stream-removed’事件')
            })
            // 远端用户退房
            this.client_.on('peer-leave', evt => {
                const userId = evt.userId
                console.log('peer-leave ' + userId)
                this.$message.info('远端用户退房')
            })
            try {
                // join the room
                await this.client_.join({roomId: rooID})
                console.log('join room success')
            } catch (error) {
                console.error('failed to join room because: ' + error)
                alert(
                    '进房失败原因：' + error)
                return
            }

            try {
                // 采集摄像头和麦克风视频流
                await this.createLocalStream({audio: true, video: true, userId: this.userInfo.userid})
                console.log('createLocalStream with audio/video success')
            } catch (error) {
                console.error('createLocalStream with audio/video failed: ' + error)
                alert(
                    '请确认已连接摄像头和麦克风并授予其访问权限！\r\n\r\n 如果您没有连接摄像头或麦克风，您可以通过调整第60行代码来关闭未连接设备的采集请求！'
                )
                try {
                    // fallback to capture camera only
                    await this.createLocalStream({audio: false, video: true, userId: this.userInfo.userid})
                } catch (error) {
                    console.error('createLocalStream with video failed: ' + error)
                    return
                }
            }
            this.localStream_.on('player-state-changed', event => {
                console.log(`local stream ${event.type} player is ${event.state}`)
                if (event.type === 'video' && event.state === 'PLAYING') {
                    // dismiss the remote user UI placeholder
                } else if (event.type === 'video' && event.state === 'STOPPPED') {
                    // show the remote user UI placeholder
                }
            })
            this.localStream_.play('local_stream')
            // 在名为 ‘local_stream’ 的 div 容器上播放本地音视频
            // let cameras = null
            // TRTC.getCameras().then(devices => {
            //     cameras = devices
            //     devices.forEach(dev => {
            //         console.log('camera label: ' + dev.label + ' deviceId: ' + dev.deviceId)
            //     })
            //     let cameraId = cameras[ 1 ].deviceId
            //     this.localStream_.switchDevice('video', cameraId).then(() => {
            //         console.log('switch camera success')
            //     })
            // })
            await this.publish()
        },
        async publish() {
            // if (this.isPublished_) {
            //     console.warn('duplicate RtcClient.publish() observed')
            //     this.$message('当前正在推流！123')
            //     return
            // }
            try {
                // 发布本地流
                await this.client_.publish(this.localStream_)
                this.$message('发布本地流成功！1')
                this.isPublished_ = true
            } catch (error) {
                console.error('failed to publish local stream ' + error)
                this.$message('发布本地流失败！222222222222222')
                this.isPublished_ = false
            }
        },
        async createLocalStream(options) {
            this.localStream_ = TRTC.createStream({
                audio: options.audio, // 采集麦克风
                video: options.video, // 采集摄像头
                userId: this.userInfo.userid
                // cameraId: getCameraId(),
                // microphoneId: getMicrophoneId()
            })
            // 设置视频分辨率帧率和码率
            this.localStream_.setVideoProfile('480p')
            await this.localStream_.initialize()
        },
        getKey(mduserid, rooID) {
            this.$store.dispatch('app/getKey', {userid: this.userInfo.userid, companyid: this.userInfo.companyid})
                .then(res => {
                    let parms = res
                    parms.rooID = rooID
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
        },
        join(config, rooID) {
            console.log(config)
            console.log(rooID)
            this.rtc = null
            if (this.rtc) return
            this.rtc = new RtcClient({
                userId: config.userid,
                roomId: rooID,
                sdkAppId: config.sdkAppId,
                userSig: config.userSig
            })
            //this.rtc.join()
            this.rtc.saveCameras()
            this.rtc.getCameraId()
            setTimeout(()=>{
                console.log(this.camerasArr);
                console.log('有没有取到摄像头');
                this.options = this.camerasArr
            },1500)
        },
        changeCamera (e) {
            this.rtc.switchCamera(e)
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
            this.$store.commit('app/SET_CALLFLAGE',false)
            this.rtc.leave()
            this.$router.replace(
                {
                    path: '/home/pharmacyAudit',
                }
            )
        },
    },
    mounted() {
        // this.createClient(this.videoKey)
        this.getGoodList()
        if (this.active !== 3) {
            this.$store.commit('app/SET_CALLFLAGE', false)
        }
    },
    created() {
        // this.ruleForm.prod = this.appInfo.name2
        this.photoInit()
        let path = this.$route.path
        this.$store.commit('app/SET_ROUTER', path)
        if (this.active !== 3) {
            this.$store.commit('app/SET_CALLFLAGE', false)
        }
        this.listenerHandle()
    },
    beforeDestroy() {
        //window.dialog.get_actionType("closeSignal")
    }
}
</script>

<style lang="scss" scoped>
    .form {
        width: 100%;
        height: 100%;

        .box-card2 {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            padding: 10px 0;

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
                    /*height: 100%;*/
                    height: 80%;
                    box-sizing: border-box;
                    background-color: #f0f8fa !important;
                    background: url("../../assets/img/videoIcon.png") no-repeat;
                    background-position:center;
                }
            }
        }

        .searchDrug {
            width: 100%;

            & /deep/ .el-input {
                min-width: 200px;
            }
        }

        .search {
            color: #FFF;
            background-color: $color-btn;
            border-color: $color-btn;
        }

        & /deep/ .el-card__body {
            height: 100%;
            display: flex;
            flex-direction: row;

            .left {
                height: 100%;
                width: 50%;
                padding: 10px 20px;
            }

            .border1px {
                width: 1px;
                border: 1px dashed #909090;
            }

            .right {

                padding: 10px 20px;
                height: 100%;
                width: 56%;

                .right-box {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .medic {
                        width: 400px;

                        position: relative;

                        .del-m {
                            position: absolute;
                            top: 43px;
                            z-index: 9999;
                            font-size: 12px;
                            left: 0;
                        }
                    }

                    .idcard {
                        width: 300px;
                        height: 200px;

                        position: relative;

                        .del-z {
                            position: absolute;
                            top: 20px;
                            z-index: 9999;
                            font-size: 12px;
                            /*right: 11px;*/
                            left: 0;
                        }

                        .del-f {
                            position: absolute;
                            top: 233px;
                            z-index: 9999;
                            font-size: 12px;
                            left: 0;
                        }

                        .image-slot {
                            width: 300px;
                            height: 200px;
                            color: #C0C4CC;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            vertical-align: middle;
                            background: #F5F7FA;
                        }
                    }

                    .take-p {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin-top: 20px;
                        margin-left: 30px;
                        min-width: 350px;
                        width: 800px;
                        height: 450px;
                        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
    }


</style>
