<script lang="ts" setup>
import {
  AppstoreAddOutlined,
  ContactsOutlined,
  ProjectOutlined,
  SendOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";

// ==== Data ==== //
const userInfo = ref<any>({});
const role = ref<boolean>(false);

// ==== Function ==== //
onMounted(() => {
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
    role.value = userInfo.value.role === "MANAGER" ? true : false;
  }
});
</script>

<template>
  <section>
    <div class="logo">
      <h1>HRM</h1>
    </div>

    <div class="menu">
      <router-link class="menu__item" to="/shop-lives">
        <div class="item__img">
          <AppstoreAddOutlined class="text-[2rem] mr-5" />
          <div class="item__name">Work Report</div>
        </div>
      </router-link>

      <router-link class="menu__item" to="/projects">
        <div class="item__img">
          <ProjectOutlined class="text-[2rem] mr-5" />
          <div class="item__name">Project</div>
        </div>
      </router-link>

      <router-link class="menu__item" to="/your-work">
        <div class="item__img">
          <ContactsOutlined class="text-[2rem] mr-5" />
          <div class="item__name">Your Work</div>
        </div>
      </router-link>

      <router-link class="menu__item" to="/users" v-if="role">
        <div class="item__img">
          <UsergroupAddOutlined class="text-[2rem] mr-5" />
          <div class="item__name">Users</div>
        </div>
      </router-link>

      <router-link class="menu__item" to="/dayoff" v-if="role">
        <div class="item__img">
          <SendOutlined class="text-[2rem] mr-5" />
          <div class="item__name">Day Off</div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
