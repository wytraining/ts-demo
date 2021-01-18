<template>
    <div class="article-manage2">
        <p>ts规范</p>

        <div class="filter">
            <Input v-model="filter.companyName" placeholder="请输入"/>
            <Select v-model="filter.city">
                <Option v-for="item in data.city" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="filter.pollution">
                <Option v-for="item in data.pollution" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <DatePicker v-model="filter.beginTime" type="date" placeholder="请选择"></DatePicker>
            <DatePicker v-model="filter.endTime" type="date" placeholder="请选择"></DatePicker>
            <Button @click="search" type="primary">搜索</Button>
        </div>

        <div class="tableList">
            <Table stripe :columns="table.columns" :data="table.tableList" :loading="table.loading">
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
                    @on-change="changePage"/>
        </div>


    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";
    import {cityList, pollutionList, columns, tableList} from "./data";
    import {PageConfig, TableConfig} from "@/interface/index";
    import {MessageTarget} from '@/api/code/interface'
    import {codeApi} from '@/api'
    import dayjs from 'dayjs'

    @Component({
        components: {}
    })
    export default class ArticleManage2 extends Vue {

        filter: MessageTarget = {
            companyName: '',
            city: '',
            pollution: '',
            beginTime: '',
            endTime: ''
        };

        data = {
            city: cityList,
            pollution: pollutionList
        };

        page: PageConfig = {
            current: 1,
            pageSize: 20,
            total: 20
        };

        table: TableConfig = {
            loading: false,
            columns: columns,
            tableList: tableList,
            height: document.documentElement.clientHeight - 240
        };

        async getTableList() {
            this.table.loading = true;
            try {
                const params: MessageTarget = {
                    ...this.filter,
                    beginTime: this.filter.beginTime ? dayjs(this.filter.beginTime).format('YYYY-MM-DD') : '',
                    endTime: this.filter.endTime ? dayjs(this.filter.endTime).format('YYYY-MM-DD') : ''
                };
                const res = await codeApi.getMessageList(params);
                this.table.tableList = res.result;
                this.page.current = res.pageindex;
                this.page.total = res.totalcount;
            } catch (e) {
                this.$Message.error('err!');
            } finally {
                this.table.loading = false;
            }
        }

        //切换页码
        changePage(currPage: number) {
            this.page.current = currPage;
            this.getTableList();
        }

        search() {
            this.page.current = 1;
            this.getTableList();
        }

        created() {
            this.search();
        }

    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/variables";

    .article-manage2 {
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
        }


    }
</style>

