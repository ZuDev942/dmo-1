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

  if (res) {
    // patch infor user to store
    userStore.$patch({
      id: res.id,
      username: res.username,
      email: res.email,
      firstname: res.firstname,
      lastname: res.lastname,
      gender: res.gender,
      image: res.image,
      token: res.token,
    });
    
    localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_NAME, res.token);

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
      <img src="@/assets/images/hrm.png" alt="" />
      <h1>HRM</h1>

      <!-- Form -->
      <Form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <FormItem
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <Input v-model:value="formState.username" placeholder="Username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </Input>
        </FormItem>

        <FormItem
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <InputPassword
            v-model:value="formState.password"
            placeholder="Password"
          >
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </InputPassword>
        </FormItem>

        <FormItem class="flex justify-between">
          <FormItem name="remember" no-style>
            <Checkbox v-model:checked="formState.remember"
              >Remember me
            </Checkbox>
          </FormItem>

          <a class="login-form-forgot" href="">Forgot password</a>
        </FormItem>

        <FormItem class="flex justify-center">
          <Button html-type="submit" class="login-form-button">
            <p v-if="!isLoading">LOG IN</p>
            <Spin v-else />
          </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
