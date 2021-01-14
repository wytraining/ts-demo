<template>
    <div class="threeLevelMain">
        <!-- 报价容器 -->
        <div class="quoteContainer">
            <!-- 报价顶部信息 -->
            <div class="quote_info clearfix">
                <h3 class="h3_title">报价单</h3>
                <div class="quote_itemBox">
                    <div class="quote_item">
                        <span class="quote_label">客户名称：</span>
                        <p class="quote_p">{{form.custName}}</p>
                    </div>
                    <div class="quote_item">
                        <span class="quote_label">联系方式：</span>
                        <p class="quote_p">{{form.phoneNumber}}</p>
                    </div>
                </div>
                <div class="quote_itemBox">
                    <div class="quote_item">
                        <span class="quote_label">项目要求：</span>
                        <p class="quote_p">{{form.projectRequirement}}</p>
                    </div>
                    <div class="quote_item">
                        <span class="quote_label">备注：</span>
                        <p class="quote_p">{{form.remark}}</p>
                    </div>
                </div>
            </div>
            <!-- 设备选取表格 -->
            <div class="quote_table clearfix">
                <el-table
                        border
                        class="table_domQuote"
                        ref="tableDomQuote"
                        size="small"
                        :data="tableData"
                        style="width: 100%"
                >
                    <el-table-column label="序号" prop="NO" width="80" align="center"></el-table-column>
                    <el-table-column label="数据类型" prop="SJLX" align="center"></el-table-column>
                    <el-table-column label="开始时间" prop="KSSJ" align="center"></el-table-column>
                    <el-table-column label="结束时间" prop="JSSJ" align="center"></el-table-column>
                    <el-table-column label="监测因子" prop="JCYZMC" align="center"></el-table-column>
                    <el-table-column label="日均值" prop="RJZ" align="center"></el-table-column>
                    <el-table-column label="依据" prop="YZSJZ" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 审核备注容器 -->
        <div class="reasonBox clearfix">
            <div class="title_checkReason">审核备注：</div>
            <div class="checkReasonMain">
                <div class="p_box">
                    <p class="p_checkReason">{{form.checkReason}}</p>
                </div>
            </div>
        </div>
        <!-- 底部按钮容器 -->
        <div class="botmBtnContainer">
            <el-button @click="exportWord" size="small" type="primary">导出word</el-button>
            <!-- <el-button @click="exportExcelClick" size="small" type="primary">导出excel</el-button> -->
        </div>
    </div>
</template>
<script>
    export default {
        name: "home",
        data() {
            return {
                // 表单对象
                form: {
                    custName: "杰斯", // 客户姓名
                    phoneNumber: "138xxxxxxxx", // 联系方式
                    projectRequirement: "为了更美好的明天而战", // 项目要求
                    totalPrice: 140, // 合计报价
                    remark: "QEWARAEQAAAAAAAAA", // 备注
                    checkReason: '同意' // 审核备注
                },
                // 表格信息
                tableData: []
            };
        },
        created() {
            this.tableData = [
                {
                    NO: "1",
                    SJLX: '数据类型1',
                    KSSJ: '开始时间1',
                    JSSJ: '结束时间1',
                    JCYZMC: '监测因子1',
                    RJZ: '日均值1',
                    YZSJZ: '依据1',
                },
                {
                    NO: "2",
                    SJLX: '数据类型2',
                    KSSJ: '开始时间1',
                    JSSJ: '结束时间1',
                    JCYZMC: '监测因子1',
                    RJZ: '日均值1',
                    YZSJZ: '依据1',
                },
                {
                    NO: "3",
                    SJLX: '数据类型3',
                    KSSJ: '开始时间1',
                    JSSJ: '结束时间1',
                    JCYZMC: '监测因子1',
                    RJZ: '日均值1',
                    YZSJZ: '依据1',
                },
            ];
        },
        methods: {
            // 点击导出word
            exportWord: function () {
                let _this = this;
                // 读取并获得模板文件的二进制内容
                JSZipUtils.getBinaryContent("input.docx", function (error, content) {
                    // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
                    // 抛出异常
                    if (error) {
                        throw error;
                    }

                    // 创建一个JSZip实例，内容为模板的内容
                    let zip = new JSZip(content);
                    // 创建并加载docxtemplater实例对象
                    let doc = new window.docxtemplater().loadZip(zip);
                    // 设置模板变量的值
                    doc.setData({
                        ..._this.form,
                        table: _this.tableData
                    });

                    try {
                        // 用模板变量的值替换所有模板变量
                        doc.render();
                    } catch (error) {
                        // 抛出异常
                        let e = {
                            message: error.message,
                            name: error.name,
                            stack: error.stack,
                            properties: error.properties
                        };
                        console.log(JSON.stringify({error: e}));
                        throw error;
                    }

                    // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
                    let out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    });
                    // 将目标文件对象保存为目标类型的文件，并命名
                    saveAs(out, "报价单.docx");
                });
            }
        }
    };
</script>
<style lang="scss">
    * {
        margin: 0;
        padding: 0;
        font-size: 12px;
        font-family: "微软雅黑", "宋体";
        list-style: none;
        box-sizing: border-box;
    }

    // 清除浮动
    .clearfix:after {
        content: "";
        height: 0;
        line-height: 0;
        display: block;
        clear: both;
        visibility: hidden;
    }

    .clearfix {
        zoom: 1;
    }

    .quoteContainer {
        .quote_info {
            width: 800px;
            margin: 0 auto;

            .h3_title {
                float: left;
                width: 100%;
                font-size: 20px;
                line-height: 40px;
                text-align: center;
                margin-bottom: 30px;
            }

            .quote_itemBox {
                float: left;
                width: 100%;
                margin-bottom: 20px;

                .quote_item {
                    float: left;
                    width: 50%;
                    display: flex;

                    .quote_label {
                        width: 100px;
                        text-align: right;
                        line-height: 32px;
                    }

                    .quote_p {
                        flex: 1;
                        line-height: 32px;
                    }
                }
            }
        }

        .quote_table {
            padding: 0 20px;

            .table_domQuote {
                .quoteTable {
                    font-size: 14px;
                    padding-left: 30px;
                    border-top: 1px solid #ebeef5;

                    .quoteTable_sp1 {
                        display: inline-block;
                        line-height: 50px;
                    }
                }
            }
        }
    }

    .reasonBox {
        padding: 0 20px 20px 20px;

        .title_checkReason {
            line-height: 50px;
        }

        .checkReasonMain {
            .p_box {
                border: 1px solid #ebeef5;
                padding: 10px 20px;

                .p_checkReason {
                    height: 30px;
                    line-height: 30px;
                }
            }
        }
    }

    // 底部按钮
    .botmBtnContainer {
        text-align: center;
        padding: 20px;
    }
</style>
