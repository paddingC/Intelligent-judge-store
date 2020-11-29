<template>
    <div class="advisory">
        <div class="form-serch">
            <el-form :inline="true" class="left" :model="formInline" label-width="80px">
                <el-form-item label="执业药师">
                    <el-autocomplete
                        v-model="formInline.pharmacistname"
                        class="searchDrug"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                        class="search-w"
                        v-model="formInline.searchbegindate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        class="search-w"
                        v-model="formInline.searchenddate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <el-form class="right">
                <el-form-item>
                    <el-button class="search" type="success" @click="search">查询</el-button>
                    <el-button @click="clearBtn">清空</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <vxe-table
                height="470px"
                :loading="loading"
                border
                ref="tableData"
                :header-cell-style="headClass"
                highlight-hover-row
                :data="tableData">
                <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
                <vxe-table-column type="index" title="序号" width="60"></vxe-table-column>
                <vxe-table-column field="regdate" title="咨询时间" sortable formatter="toDateString"></vxe-table-column>
                <vxe-table-column field="pharmacistname" title="执业药师" sortable ></vxe-table-column>
                <vxe-table-column field="time" title="咨询时长" sortable :formatter="timeM"></vxe-table-column>
            </vxe-table>
            <div class="pagination">
                <vxe-pager
                perfect
                :loading="pageloading"
                :current-page="tablePage.currentPage"
                :page-size="tablePage.pageSize"
                :total="tablePage.totalResult"
                :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                @page-change="handlePageChange">
                </vxe-pager>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: "index",
    data () {
        return {
            formInline: {
                searchbegindate: '',
                searchenddate: '',
                pharmacistid: ''
            },
            tablePage: {
                currentPage: 1,
                pageSize: 20,
                totalResult: 0
            },
            pageloading: false,
            loading: true,
            tableData: []
        }
    },
    mounted(){
        this.getList()
    },
    computed: {
        ...mapGetters([ 'userInfo' ]),
    },
    methods: {
        ...mapActions(
            {
                getKey: 'advisory/getByKey',
                findList: 'advisory/findInstructionList',
            }
        ),
        async querySearchAsync(queryString, cb) {
            console.log(queryString, '输入的值')
            const d = await this.getKey(
                {
                    companyid: this.userInfo.companyid,
                    key: this.formInline.pharmacistname,
                }
            )
            if (d.length === 0) {
                this.formInline.pharmacistname = ''
                this.formInline.pharmacistid = ''
            }
            var c = d.map(( item => {
                return {
                    value: item.pharmacistname,
                    pharmacistid: item.pharmacistid,
                }
            } ))
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                if (c.length === 0) {
                    this.$message.info("未查到该执业药师")
                }
                cb(c)
            }, 1000)
        },
        handleSelect(item) {
            this.formInline.pharmacistname = item.value
            this.formInline.pharmacistid = item.pharmacistid
        },
        search(){
            this.getList()
        },
        clearBtn () {
            this.formInline = {
                searchbegindate: '',
                searchenddate: '',
                pharmacistid: ''
            }
        },
        getList() {
            this.loading = true
            this.findList({
                pageIndex: this.tablePage.currentPage,
                pageSize: this.tablePage.pageSize,
                deptid: this.userInfo.deptid,
                searchbegindate: this.formInline.searchbegindate,
                searchenddate: this.formInline.searchenddate,
                pharmacistid: this.formInline.pharmacistid
            }).then(res => {
                this.tableData = res.list
                this.tablePage.totalResult = res.info
                this.loading = false
            }).catch(err => {
                console.log(err)
                this.loading = false
            })
        },
        handlePageChange ({currentPage, pageSize}) {
            this.tablePage.currentPage = currentPage
            this.tablePage.pageSize = pageSize
            this.getList()
        },
        headClass({row, column, rowIndex, columnIndex}) {
            return 'background:#36c2aa;'
        },
        timeM ({row, column}) {
            var result = row.time;
            var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
            var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
            var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
            return result = h + ":" + m + ":" + s;
        },
    },
    beforeDestroy() {
        window.location.reload()
    }
}
</script>

<style scoped lang="scss">
    .advisory {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        padding: 20px;
        background-color: #fff;
        .search {
            color: #FFF;
            background-color: $color-btn;
            border-color: $color-btn;
        }

        & /deep/ .el-image-viewer__close {
              color: red;
          }

        .search-w {
            width: 210px !important;
        }

        .form-serch {
            height: 145px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
            border: 1px solid #c9c9c9;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
        }

    }
</style>
