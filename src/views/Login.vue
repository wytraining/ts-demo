<template>
    <div class="login_body">
        <div class="login_main">
            <div class="login_main_title"></div>
            <div class="login_main_list">
                <Form
                        ref="loginForm"
                        :model="loginForm"
                        :rules="ruleForm"
                        :label-width="0"
                >
                    <FormItem prop="userName">
                        <Input
                                type="text"
                                v-model="loginForm.userName"
                                placeholder="用户名"
                                size="large"
                                @keyup.enter.native="loginSubmit('loginForm')"
                        >
                            <Icon
                                    type="ios-person-outline"
                                    slot="prepend"
                            ></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input
                                type="password"
                                v-model="loginForm.password"
                                placeholder="密码"
                                size="large"
                                @keyup.enter.native="loginSubmit('loginForm')"
                        >
                            <Icon
                                    type="ios-lock-outline"
                                    slot="prepend"
                            ></Icon>
                        </Input>
                    </FormItem>
                    <!-- <FormItem prop="codeValue">
						<Row>
							<Col span="14">
							<Input class="code_input" type="text" v-model="loginForm.codeValue" placeholder="验证码" size="large"
							 @keyup.enter.native="loginSubmit('loginForm')">
							</Input>
							</Col>
							<Col span="8" offset="2" style="height:36px;">
							<img class="code_img" type="image" id="checkImg" :src="codeImg" />
							</Col>
						</Row>
					</FormItem> -->
                    <FormItem>
                        <Button
                                type="primary"
                                @click.prevent="loginSubmit('loginForm')"
                                size="large"
                                long
                        >登 录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import qs from "qs";
    let Base64 = require('js-base64').Base64;
    import { Vue, Component } from "vue-property-decorator";
    import { FormItem, Icon, Form, Input, Button } from 'iview';

    const validateName = (rule: any, value: string, callback: Function) => {
        if (value === "") {
            callback(new Error("用户名不能为空"));
        } else {
            callback();
        }
    };
    const validatePass = (rule: any, value: string, callback: Function) => {
        if (value === "") {
            callback(new Error("密码不能为空"));
        } else {
            callback();
        }
    };
    // const validateCode = (rule, value, callback) => {
    // 	if (value === '') {
    // 		callback(new Error('验证码不能为空'));
    // 	}
    // 	setTimeout(() => {
    // 		if (value.length == 4) {
    // 			this.$http.get("/rest/authox/checkCodeValidate?value=" + this.loginForm.codeValue).then(res => {
    // 				if (res.data === 'false') {
    // 					callback(new Error('验证码错误'));
    // 				} else {
    // 					callback();
    // 				}
    // 			}).catch(err => {
    // 				console.log(err);
    // 			});

    // 		} else {
    // 			callback(new Error('验证码错误'));
    // 		}
    // 	}, 800);
    // };
    @Component({
        components: {
            FormItem,
            Icon,
            Form,
            Input,
            Button
        }
    })
    export default class login extends Vue {
        codeImg = "";
        codeCheck = {};
        loginForm = {
            userName: "",
            codeValue: "",
            password: ""
        };
        ruleForm = {
            userName: [
                {
                    validator: validateName,
                    trigger: "blur"
                }
            ],
            password: [
                {
                    validator: validatePass,
                    trigger: "blur"
                }
            ]
            // codeValue: [{
            // 	validator: validateCode,
            // 	trigger: 'blur'
            // }]
        };

        created() {
            //this.getCodeImg();
        }

        getCodeImg() {
            this.$http
                .get("/rest/authox/checkCode?size=120*36")
                .then(res => {
                    this.codeImg = "data:image/gif;base64," + res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }

        loginSubmit(name: string) {
            const form: any = this.$refs[name];
            form.validate((valid: any) => {
                if (valid) {
                    this.$http({
                        url: "/login",
                        method: "post",
                        data: qs.stringify({
                            username: this.loginForm.userName,
                            //明文
                            password: this.loginForm.password,
                            //base64加密
                            // password: Base64.encode(this.loginForm.password),
                            checkCode: this.loginForm.codeValue
                        }),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    })
                        .then(res => {
                            if (this.$route.query.redirect) {
                                this.$router.push(<string>(
                                    this.$route.query.redirect
                                ));
                            } else {
                                this.$router.push("/main");
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            this.$Message.error("登录失败!");
                        });
                } else {
                    this.$Message.error("登录失败!");
                }
            });
        }
    }
</script>
<style lang="scss" scoped>
    .login_body {
        background: url("../assets/login/background.png") no-repeat fixed center;
        background-size: cover;
        width: 100%;
        height: 100%;

        .login_main {
            position: absolute;
            left: calc(50% - 200px);
            top: calc(50% - 200px);
            text-align: center;
            width: 400px;
            height: 340px;
            border-radius: 8px;
            padding: 0 40px;
            background-color: rgb(255, 255, 255);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.22);

            .login_main_title {
                width: 100%;
                height: 90px;
                background: url("../assets/login/title.png") no-repeat;
                background-position: center;
            }

            .code_img {
                width: 100%;
                height: 36px;
            }
        }
    }
</style>
