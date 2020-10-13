<template>
    <div class="article-manage">
        <p>文章管理</p>
        <div class="filter">
            <Input v-model="companyName" placeholder="请输入"/>

            <Select v-model="city">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <Button type="primary">搜索</Button>

        </div>
        <div class="tableList">
            <Table stripe :columns="columns1" :data="data1"></Table>
            <Page
                    show-elevator
                    show-total
                    :total="page.total"
                    :current="page.current"
                    :pageSize="page.pageSize"
                    :page-list="page.pageList"
                    @on-change="changePage"/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component({
        components: {}
    })
    export default class Template extends Vue {

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
                width: 200
            },
            {
                title: 'Address',
                key: 'address'
            }
        ];
        data1: Array<any> = [

            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }, {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            },
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
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }, {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
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
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            },
            {
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
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
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }, {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            },
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
        ]


        //切换页码
        changePage(currPage: any) {
            this.page.current = currPage;
            // this.getTableList(currPage);
        }


    }
</script>

<style lang="scss" scoped>
    .article-manage {
        padding: 16px;
        height: 100%;

        p {
            font-size: 16px;
            height: 40px;
            line-height: 40px;
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


    }
</style>
