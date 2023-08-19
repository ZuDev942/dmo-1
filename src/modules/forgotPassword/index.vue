<script setup lang="ts">
import { reactive, ref } from "vue";
import { authService } from "@/services";
import type { Rule } from "ant-design-vue/es/form";
import { Form, FormItem, Button, Input, message } from "ant-design-vue";

// ==== Data ==== //
interface FormState {
  email: string;
}

const formState = reactive<FormState>({
  email: "",
});

const isSend = ref(true);
const isError = ref(false);

// ==== Method ==== //

async function onFinish() {
  const req = {
    email: formState.email,
  };

  try {
    const res = await authService.forgotPassword(req).catch((err) => {
      if (err.response) {
        isError.value = true;
      }
    });

    if (res.status === "SUCCESS") {
      isSend.value = false;
    }
  } catch (error) {
    isError.value = true;
  }
}

function resendLink() {
  isSend.value = true;
}

function validateEmail(email: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

let checkEmail = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please enter an email address");
  } else {
    if (!validateEmail(value)) {
      return Promise.reject("Please enter a valid email address");
    }
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  email: [{ validator: checkEmail, trigger: "blur" }],
};

function handleInput() {
  isError.value = false;
}
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
        <div class="login__img flex justify-center items-center mb-[1rem]">
          <img src="@/assets/images/logo.png" alt="" />
          <p class="page__logo">Hrm</p>
        </div>

        <h2 v-if="isSend">Can't log in?</h2>

        <Form
          v-if="isSend"
          :model="formState"
          :rules="rules"
          name="normal_forgot"
          @finish="onFinish"
        >
          <p class="page__link">We'll send a recovery link to</p>

          <FormItem class="mb-[2.5rem]" name="email">
            <Input
              v-model:value="formState.email"
              size="large"
              placeholder="Enter email"
              @input="handleInput()"
            />
          </FormItem>

          <FormItem class="mb-[1rem] mt-[3rem] flag">
            <div class="flag__error" v-if="isError">
              Registered email does not exist
            </div>
            <Button
              html-type="submit"
              class="login__btn"
              type="primary"
              value="large"
            >
              Send email
            </Button>
          </FormItem>

          <div class="flex justify-center">
            <a class="login-form-forgot" href="/">Return to log in</a>
          </div>
        </Form>

        <div v-else>
          <div class="page__send">
            <img src="@/assets/images/mail.png" alt="" />
          </div>

          <div class="page__send--des">
            <p>We sent a recovery link to you at</p>
            <h3>{{ formState.email }}</h3>
          </div>

          <div class="flex justify-center">
            <a class="page__a" href="/">Return to log in</a>
            <span class="mx-3">.</span>
            <a class="page__a" @click="resendLink()">Resend recovery link</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
