<template>
    <div class="article-manage">
        <p>文章管理</p>
        <div class="filter">
            <Input v-model="companyName" placeholder="请输入"/>

            <Select v-model="city">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <DatePicker type="date" placeholder="请选择"></DatePicker>

            <Button type="primary">搜索</Button>

        </div>
        <div class="tableList">
            <Table stripe :columns="columns1" :data="tableList" :loading="loading">
                <template slot-scope="{row, index}" slot="action">
                    <span @click="deleteModal=true">删除</span>
                </template>
            </Table>
            <Page
                    show-elevator
                    show-total
                    :total="page.total"
                    :current="page.current"
                    :pageSize="page.pageSize"
                    :page-list="page.pageList"
                    @on-change="changePage"/>
        </div>

        <Modal v-model="deleteModal" title="删除数据" @on-ok="confirmDeletaModal" @on-cancel="cancelDeletaModal" :mask-closable="false">
            <!--<p>确认删除数据？</p>-->
            <delete-modal></delete-modal>
        </Modal>


    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import DeleteModal from './components/DeleteModal.vue'

    @Component({
        components: {
            DeleteModal
        }
    })
    export default class Template extends Vue {

        deleteModal: boolean = false; //删除弹窗

        loading: boolean = false;
        //分页器
        page: any = {
            total: 20, //总共条数
            current: 1, //当前页数
            pageSize: Math.floor(
                (document.documentElement.clientHeight - 320) / 45
            ), //每页条数
            pageList: [10, 20]
        };

        // height = document.documentElement.clientHeight - 240; //表格高度
        companyName: string = "";

        city: string = "";
        cityList: Array<any> = [
            {
                value: 'New York',
                label: 'New York'
            },
            {
                value: 'London',
                label: 'London'
            }
        ];

        columns1: Array<any> = [
            {
                type: 'index',
                width: 90,
                align: 'center',
                title: '序号'
            },
            {
                title: 'Name',
                key: 'name',
                width: 200
            },
            {
                title: 'Age',
                key: 'age',
                width: 200,
                align: 'center',
                renderHeader: (h: any, params: any) => {
                    return h('span', [
                        h('Button',{
                            class: 'ageBtn'
                        },'age'),
                        h('Button',{
                            class: 'ageBtn'
                        },'test'),
                    ])
                }
            },
            {
                title: 'Address',
                key: 'address'
            },
            {
                title: '操作',
                slot: 'action',
                align: 'right'
            }
        ];
        tableList: Array<any> = [
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
                date: '2016-10-01'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
        ];

        getTableList() {
            this.loading = true;
            let params = {
                currentPage: this.page.current,
                pageSize: this.page.pageSize,
            };
            this.$http.get("dljkss/findComOnlineMonthRate", {params: params}).then(res => {
                this.tableList = res.data.result;
                //修改分页器信息
                this.page.total = res.data.totalcount; //总条数
                this.page.current = res.data.pageindex; //当前页
                this.loading = false;
            })
        }

        //切换页码
        changePage(currPage: any) {
            this.page.current = currPage;
            // this.getTableList(currPage);
        }

        //确认
        confirmDeletaModal() {
            console.log("ok");
        }

        //取消
        cancelDeletaModal() {
            console.log("cancelModal");
        }


    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/variables.scss";
    ::v-deep.article-manage {
        padding: 16px;
        height: 100%;

        p {
            font-size: 16px;
            height: 40px;
            line-height: 40px;
            color: $delete-color;
        }

        .filter {
            height: 50px;
            line-height: 50px;

            > div {
                width: 200px;
                margin-right: 20px;
            }
        }

        .tableList {
            height: calc(100% - 180px);
            /*.ivu-table-wrapper {
                height: 100%;
                .ivu-table {
                    height: 100%;
                    .ivu-table-body {
                        overflow-x: hidden;
                        height: calc(100% - 52px);
                        overflow-y: auto;
                    }
                }
            }*/
        }

        .ageBtn {
            background: #57a3f3;
            color: #fff;
        }


    }
</style>
