<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthEvent } from "@/shared";
import { RouteName } from "@/shared/constants";
import { authService } from "@/services";

import {
  Form,
  FormItem,
  Button,
  Input,
  InputPassword,
  message,
  Spin,
} from "ant-design-vue";
import { useSessionStore } from "@/store";

// ==== Data ==== //
const router = useRouter();
const isLoading = ref<boolean>(false);
interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
});

const sessionStore = useSessionStore();

// ==== Method ==== //

const onFinish = async (values: any) => {
  isLoading.value = true;

  try {
    const res = await authService
      .login(formState.username, formState.password)
      .finally(() => {
        isLoading.value = false;
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.data);
        }
      });

    if (res.status === "SUCCESS") {
      // patch infor user to store
      const userInfo = {
        avatar: res.data.avatar,
        email: res.data.email,
        fullname: res.data.fullName,
        role: res.data?.role,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      localStorage.setItem(
        import.meta.env.VITE_ACCESS_TOKEN_NAME,
        res.data.token
      );

      localStorage.setItem("userRole", userInfo.role);

      sessionStore.login(userInfo);
      // sessionStore.startSessionTimer();

      if (userInfo.role === "MANAGER") {
        router.push({ name: RouteName.PROJECTS });
      }

      if (userInfo.role === "STAFF") {
        router.push({ name: RouteName.YOUR_WORK });
      }

      if (userInfo.role === "ADMIN") {
        router.push({ name: RouteName.USERS });
      }

      message.success("Welcome to HRM");
    }
  } catch (error) {}
};

const onFinishFailed = (errorInfo: any) => {};

useAuthEvent();
</script>

<template>
  <div class="page">
    <div class="page__wrap">
      <div class="flex items-center">
        <img src="@/assets/images/logo.png" alt="" />
        <h5>Hrm</h5>
      </div>

      <div class="page__des">
        <p class="page__des--1">
          Manages all your project, move fast, stay aligned, and build better -
          together
        </p>
        <p class="page__des--2">
          Work becomes a lot more visible when it’s all in one place. It makes
          collaboration a whole lot easier.
        </p>
      </div>
    </div>
    <div class="page__right">
      <div class="login">
        <div class="flex justify-center items-center mb-[1rem]">
          <img src="@/assets/images/logo.png" alt="" />
          <p>Hrm</p>
        </div>

        <h2>Login first to your account</h2>

        <Form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div>
            <label>UserID</label>
            <FormItem
              class="mb-[2.5rem]"
              name="username"
              :rules="[
                { required: true, message: 'Please input your user id!' },
              ]"
            >
              <Input
                v-model:value="formState.username"
                placeholder="Username"
                size="large"
              >
              </Input>
            </FormItem>
          </div>

          <div>
            <label>Password</label>
            <FormItem
              class="mb-[2.5rem]"
              name="password"
              :rules="[
                { required: true, message: 'Please input your password!' },
              ]"
            >
              <InputPassword
                v-model:value="formState.password"
                placeholder="Password"
                size="large"
              >
              </InputPassword>
            </FormItem>
          </div>

          <FormItem class="mb-3 mt-[4rem]">
            <Button
              html-type="submit"
              class="login__btn"
              type="primary"
              value="large"
            >
              <div v-if="!isLoading">Login</div>
              <Spin v-else />
            </Button>
          </FormItem>

          <div class="flex justify-center">
            <a class="login-form-forgot" href="forgot">Forgot password?</a>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
