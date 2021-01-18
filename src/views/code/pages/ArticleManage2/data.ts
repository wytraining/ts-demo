import {ColumnConfig, OptionConfig} from "@/interface";
import {MessageItem} from '@/api/code/interface'

export const cityList: OptionConfig[] = [
    {value: 'hz', label: '杭州'},
    {value: 'jh', label: '金华'},
    {value: 'sx', label: '绍兴'},
];

export const pollutionList: OptionConfig[] = [
    {value: 'fs', label: '废水'},
    {value: 'fq', label: '废气'}
];

export const columns: ColumnConfig[] = [
    {
        type: 'index',
        title: '序号',
        width: 70,
        align: 'center'
    },
    {
        title: '企业名称',
        key: 'COMPANYNAME',
    },
    {
        title: '留言内容',
        key: 'PROBLEM',
        tooltip: true
    },
    {
        title: '回复内容',
        key: 'REPLY',
        tooltip: true
    },
    {
        title: '留言时间',
        key: 'CREATETIME',
    },
    {
        title: '联系方式',
        key: 'CONTACT',
    },
    {
        title: '操作',
        slot: 'action',
        align: 'right'
    }
];

export const tableList: MessageItem[] = [
    {
        COMPANYID: "1577022063846008089602",
        COMPANYNAME: "浙江振元安防科技有限公司",
        CONTACT: "18857861667",
        CREATETIME: "2020-09-04 14:14:33",
        ID: "ac0d1ddae6ea4c439da92431e8c2e09c",
        PROBLEM: "环保码上的公司名称不对。",
        REPLY: "公司名称已修改，感谢您的反馈与支持！"
    },
    {
        COMPANYID: "1577022063846008089602",
        COMPANYNAME: "浙江振元安防科技有限公司22",
        CONTACT: "18857861667",
        CREATETIME: "2020-09-04 14:14:33",
        ID: "ac0d1ddae6ea4c439da92431e8c2e09c",
        PROBLEM: "环保码上的公司名称不对。",
        REPLY: "公司名称已修改，感谢您的反馈与支持！"
    }
];