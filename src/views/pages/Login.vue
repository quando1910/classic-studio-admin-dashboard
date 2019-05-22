<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col cols="10" md="8">
          <el-tabs type="border-card" :value="currentTab">
            <el-tab-pane label="Đăng Nhập Khách Hàng">
              <div class="content-dialog">
                <el-form ref="formMember" :model="formMember" label-width="120px">
                  <el-input
                    placeholder="Mã hợp đồng *"
                    v-model="formMember.codeContarct"
                    @keyup.enter.native="loginMember"
                    class="mb-3"
                  ></el-input>
                  <el-input placeholder="Số Điện Thoại *" 
                    @keyup.enter.native="loginMember"
                    v-model="formMember.phone" class="mb-3">
                  </el-input>
                  <el-row>
                    <el-col :span="12">
                      <el-button class="w-100 boder-right-none" @click="comeBack">Trở về</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button
                        class="w-100 boder-left-none"
                        type="primary"
                        @click="loginMember"
                      >Đăng Nhập</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Đăng Nhập Nhân Viên">
              <div class="content-dialog">
                <el-form ref="formUser" :model="formUser" label-width="120px">
                  <el-input
                    placeholder="Nhập đia chỉ email *"
                    v-model="formUser.email"
                    class="mb-3"
                    @keyup.enter.native="loginUser"
                  ></el-input>
                  <el-input
                    placeholder="nhập mật khẩu *"
                    v-model="formUser.password"
                    class="mb-3"
                    type="password"
                    @keyup.enter.native="loginUser"
                  ></el-input>
                  <el-row>
                    <el-col :span="12">
                      <el-button class="w-100 boder-right-none" @click="comeBack">Trở về</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button
                        class="w-100 boder-left-none"
                        type="primary"
                        @click="loginUser"
                      >Đăng Nhập</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Đăng Ký">
              <div class="content-dialog">
                <el-form ref="formRegister" :model="formRegister" label-width="120px">
                  <el-input placeholder="Mã hợp đồng *" v-model="formRegister.mhd" class="mb-3"></el-input>
                  <el-input placeholder="Họ và Tên *" v-model="formRegister.name" class="mb-3"></el-input>
                  <el-input placeholder="Số Điện Thoại *" v-model="formRegister.phone" class="mb-3"></el-input>
                  <el-input placeholder="Địa Chỉ *" v-model="formRegister.address" class="mb-3"></el-input>
                  <el-input placeholder="Link Facebook *" v-model="formRegister.fb" class="mb-3"></el-input>
                  <template>
                    <el-select
                      v-model="formRegister.gender"
                      placeholder="Chọn giới tính *"
                      class="mb-3 w-100"
                    >
                      <el-option
                        v-for="g in genders"
                        :key="g.value"
                        :label="g.label"
                        :value="g.value"
                      ></el-option>
                    </el-select>
                  </template>
                  <el-row>
                    <el-col :span="12">
                      <el-button class="w-100 boder-left-none" @click="comeBack">Trở về</el-button>
                    </el-col>
                    <el-col :span="12">
                      <el-button
                        class="w-100 boder-right-none"
                        type="primary"
                        @click="registerMember"
                      >Tạo mới</el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { AuthService } from "../../service/authService.js";

const auth = new AuthService();
export default {
  name: "Login",
  data() {
    return {
      viewerPage: "/login",
      currentTab: null,
      genders: [
        {
          value: 0,
          label: "Nữ"
        },
        {
          value: 1,
          label: "Nam"
        }
      ],
      formMember: {
        codeContarct: "",
        phone: ""
      },
      formUser: {
        email: "",
        password: ""
      },
      formRegister: {
        mhd: null,
        name: null,
        phone: null,
        address: "",
        fb: "",
        gender: null
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit");
    },
    loginMember() {
      const { codeContarct, phone } = this.formMember;
      auth.loginMember({ code: codeContarct, phone_number: phone }).then(
        res => {
          this.formReset();
          const path = auth.getToPath();
          if (res.data.member) {
            window.location = "/";
          } else if (path) {
            this.$router.push(`${path}`);
          } else {
            window.location = "/";
          }
        },
        err => {
          this.formReset();
          this.$message({
            message: "Đăng nhập không thành công!",
            type: "error"
          });
        }
      );
    },

    loginUser() {
      console.log('enter ');
      const { email, password } = this.formUser;
      auth.loginUser({ email, password }).then(
        () => {
          this.formReset();
          const path = auth.getToPath();
          console.log(path);
          if (path) {
            this.$router.push(`${path}`);
          } else {
             window.location = "/";
          }
        },
        err => {
          this.formReset();
          this.$message({
            message: "Đăng nhập không thành công!",
            type: "error"
          });
        }
      );
    },
    registerMember() {
      const { mhd, name, phone, address, fb, gender } = this.formRegister;
      auth
        .registerMember({
          code: mhd,
          name,
          phone_number: phone,
          address,
          link_facebook: fb,
          gender
        })
        .then(
          v => {
            if (v.status === 200) {
              this.currentTab = "0";
            }
            this.formReset();
          },
          e => {
            this.formReset();
            this.$message({
              message: "Đăng ký không thành công!",
              type: "error"
            });
          }
        );
    },
    comeBack() {
      this.$router.push("/home");
    },
    formReset() {
      this.formMember = {
        codeContarct: "",
        phone: ""
      };
      this.formUser = {
        email: "",
        password: ""
      };
      this.formRegister = {
        mhd: null,
        name: null,
        phone: null,
        address: "",
        fb: "",
        gender: null
      };
    }
  }
};
</script>
