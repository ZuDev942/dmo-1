<script lang="ts" setup>
import { ref } from "vue";
import { MenuRight } from "@/layout-components";
import { Popover } from "ant-design-vue";
import {
  MenuOutlined,
  SettingOutlined,
  LoginOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { RouteName } from "@/shared/constants";
const router = useRouter();
import { useUserPage } from "@/store/modules";

// ==== Data ====
const hide = () => {
  visible.value = false;
};

const userStore = useUserPage();

// ==== Method ====
const visible = ref<boolean>(false);

function handleLogout() {
  console.log("Logout...");
  // Reset state infor user
  userStore.$reset();

  localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_NAME, "");
  router.push({ name: RouteName.HOMEPAGE });
}
</script>

<template>
  <div id="__main" class="flex w-full h-full">
    <!-- MenuRight -->
    <div id="__menu">
      <MenuRight></MenuRight>
    </div>

    <!-- Content -->
    <div id="__content">
      <router-view />

      <div class="header">
        <div class="header__rou">
          <MenuOutlined class="pr-3" /> LIST ACCOUNT
        </div>
        <div>
          <Popover
            v-model:visible="visible"
            title="ACCOUNT"
            trigger="click"
            style="width: 200px"
            placement="bottomRight"
          >
            <template #content>
              <div class="flex items-center setting__box">
                <img :src="userStore.image" alt="" class="setting__avatar" />
                <div class="pl-4">
                  <h4>{{ userStore.username }}</h4>
                  <p>{{ userStore.email }}</p>
                </div>
              </div>

              <router-link class="setting__item" to="/profile">
                <SettingOutlined class="pr-3" /> Profile
              </router-link>

              <div class="setting__item">
                <SettingOutlined class="pr-3" /> Change Password
              </div>
              <div class="setting__log" @click="handleLogout()">
                <LoginOutlined class="pr-3" /> Log out
              </div>
            </template>

            <div class="setting">
              <p class="setting__name">{{ userStore.username }}</p>
              <img :src="userStore.image" alt="" class="setting__avatar" />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
