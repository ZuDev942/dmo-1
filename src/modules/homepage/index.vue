<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthEvent } from "@/shared";
import { RouteName } from "@/shared/constants";
import { authService } from "@/services";

import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import {
  Form,
  FormItem,
  Button,
  Input,
  InputPassword,
  Checkbox,
  message,
  Spin,
} from "ant-design-vue";
const router = useRouter();

// ==== Data
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});

const isLoading = ref<boolean>(false);
import { useUserPage } from "@/store/modules";

const userStore = useUserPage();

// ==== Method

const onFinish = async (values: any) => {
  isLoading.value = true;

  const res = await authService
    .login(formState.username, formState.password)
    .finally(() => {
      isLoading.value = false;
    });

  if (res.status === "SUCCESS") {
    // patch infor user to store
    const userInfo = {
      avatar: res.data.avatar,
      email: res.data.email,
      fullname: res.data.fullName,
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // userStore.$patch({
    //   avatar: res.data.avatar,
    //   email: res.data.email,
    //   fullname: res.data.fullName,
    // });

    localStorage.setItem(
      import.meta.env.VITE_ACCESS_TOKEN_NAME,
      res.data.token
    );

    router.push({ name: RouteName.SHOP_LIVES });

    message.success("Login success");
  } else {
    message.error("thong tin dang nhap ko chinh xac");
  }
};

const onFinishFailed = (errorInfo: any) => {
  message.error("Vui long nhap thong tin");
};

useAuthEvent();
</script>

<template>
  <div class="page">
    <div class="login">
      <div class="flex justify-center items-center flex-col">
        <img src="@/assets/images/hrm.png" alt="" />
        <h1>HRM</h1>
      </div>

      <Form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <FormItem
          class="flex flex-col items-start mb-[4rem]"
          label="User ID"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <Input v-model:value="formState.username" placeholder="Username">
          </Input>
        </FormItem>

        <FormItem
          class="flex flex-col items-start mb-[4rem]"
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <InputPassword
            v-model:value="formState.password"
            placeholder="Password"
          >
          </InputPassword>
        </FormItem>

        <FormItem class="flex justify-center mb-3">
          <div class="flex justify-center items-center">
            <Button html-type="submit" class="login__btn">
              <p v-if="!isLoading">Continue</p>
              <Spin v-else />
            </Button>
          </div>
        </FormItem>

        <div class="flex justify-center">
          <a class="login-form-forgot" href="">You can't login?</a>
        </div>
      </Form>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
