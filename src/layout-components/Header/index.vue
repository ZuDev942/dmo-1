<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import {
  Popover,
  Modal,
  Button,
  FormItem,
  Form,
  message,
  InputPassword,
  Badge,
  Avatar,
  Tabs,
  TabPane,
  Empty,
  Breadcrumb,
  BreadcrumbItem,
} from "ant-design-vue";
import {
  MenuOutlined,
  LoginOutlined,
  IdcardOutlined,
  UnlockOutlined,
  SendOutlined,
  MessageOutlined,
  BellOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { RouteName } from "@/shared/constants";
import { useUserPage } from "@/store/modules";
import { notificationService, userService } from "@/services";
import { map, isEmpty, filter, size } from "lodash";
import eventBus from "@/eventBus";
const { onEvent } = eventBus();

// ==== Data ==== //
const router = useRouter();
const isSetting = ref<boolean>(false);
const isChangePassword = ref<boolean>(false);

const userList = ref<any>([]);
const userInfo = ref<any>({});
const idProject = ref(0);
const nameProject = ref("");
const isNotification = ref(false);
const isTabs = ref("1");
const currentPage = ref<string | null>("");
const isIssue = ref(false);

// ==== Method ==== //
onMounted(() => {
  // getUser();
  getNotification();
  onEvent("NAME_PROJECT", handle);
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
  }
});

// Get current name page
const routeName = computed(() => {
  return router.currentRoute.value.name;
});

watchEffect(() => {
  if (router.currentRoute.value.name === "Issue") {
    if (router.currentRoute.value.params.id) {
      isIssue.value = false;
    } else {
      isIssue.value = true;
    }
  }
});

function handle(pay) {
  idProject.value = pay.id;
  nameProject.value = pay.name;
}

const list = ref<any>([]);
const approverAdmins = ref<any>([]);

async function getUser() {
  const req = {
    pageIndex: 1,
    pageSize: 20,
    keyword: "",
  };

  const res = await userService.getLisrUser(req);

  const filterAdmin = filter(
    res.data.data,
    (item) => item.role === "ADMIN" && item.fullName !== userInfo.value.fullname
  );
  const filterUser = filter(
    res.data.data,
    (item) => item.fullName !== userInfo.value.fullname
  );

  approverAdmins.value = map(filterAdmin, (item) => {
    return {
      value: item.id,
      label: item.fullName,
    };
  });

  userList.value = map(filterUser, (item) => {
    return {
      value: item.id,
      label: item.fullName,
    };
  });

  list.value = res.data.data;
}

// Check password
async function handleOk() {
  if (isEmpty(changePassword.oldPassword)) {
    message.error("Please enter Current password!");
    return;
  }

  if (isEmpty(changePassword.newPassword)) {
    message.error("Please enter New password");
    return;
  }

  const res = await userService.changePassword(changePassword).catch((err) => {
    message.error("The current password is incorrect");
  });

  if (res.status === "SUCCESS") {
    message.success("Change your password successfull!");
    isChangePassword.value = false;
  }
}

function handleLogout() {
  // Reset store infor user
  localStorage.removeItem("userInfo");
  localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_NAME, "");

  router.push({ name: RouteName.LOGIN });
}

function handleChangePassword() {
  isSetting.value = false;
  isChangePassword.value = true;
}

function handleAbsenceRequest() {
  // isAbsence.value = true;
  router.push({ name: RouteName.ABSENCE });
  isSetting.value = false;
}

// Change Password
import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance } from "ant-design-vue";
import moment from "moment";

const formChangeRef = ref<FormInstance>();

interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const changePassword = reactive<IChangePassword>({
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
});

function containsSpecialCharacter(str) {
  const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?/~`\\|\-=\\[\]\"\'\\\\]/;

  return regex.test(str);
}

let checkOldPass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please enter current password");
  } else {
    if (!containsSpecialCharacter(value)) {
      return Promise.reject("Password at least one special character");
    }
    return Promise.resolve();
  }
};

let checkNewPass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please enter new password");
  } else {
    ""
    if (!containsSpecialCharacter(value)) {
      return Promise.reject("Password at least one special character");
    }

    if (changePassword.newPassword === changePassword.oldPassword) {
      return Promise.reject(
        "The new password must be different from the current password."
      );
    }
    return Promise.resolve();
  }
};

let checkRePass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please enter repeat password");
  } else {
    if (!containsSpecialCharacter(value)) {
      return Promise.reject("Password at least one special character");
    }

    if (changePassword.newPassword !== changePassword.repeatPassword) {
      return Promise.reject("New password does not match.");
    }
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  oldPassword: [{ validator: checkOldPass, trigger: "change" }],
  newPassword: [{ validator: checkNewPass, trigger: "change" }],
  repeatPassword: [{ validator: checkRePass, trigger: "change" }],
};

async function onFinishChange() {
  const reqPassword = {
    oldPassword: changePassword.oldPassword,
    newPassword: changePassword.newPassword,
  };

  try {
    const res = await userService.changePassword(reqPassword);

    if (res.status === "SUCCESS") {
      message.success("Change your password successfull!");
      isChangePassword.value = false;
      handleLogout();
    }
  } catch (error) {
    message.error("Current password is incorrect");
  }
}

// Notification
const notiListAll = ref<any>([]);
const notiListUnread = ref<any>([]);
const countNoti = ref(0);

function handleOpenNoti() {
  if (!isNotification.value) {
    getNotification();
  }
}

const convertTime = (time: any) => {
  return moment(time, "YYYY/MM/DD h:mm").fromNow();
};

async function getNotification() {
  const req = {
    pageIndex: 1,
    pageSize: 50,
  };

  const res = await notificationService.getNotification(req);

  if (res.status === "SUCCESS") {
    notiListAll.value = res.data.data;
    notiListUnread.value = filter(
      res.data.data,
      (item) => item.hasSeen === false
    );

    countNoti.value = size(notiListUnread.value);
  }
}

async function handleSelectNoti(idNoti: number, index: number, metaData: any) {
  console.log(metaData);
  const res = await notificationService
    .putSeenNotification(idNoti)
    .finally(() => {
      notiListAll.value[index].hasSeen = true;
      isNotification.value = false;
    });

  if (metaData.type === "task") {
    router.push({
      name: RouteName.YOUR_WORK,
    });
  }

  if (metaData.type === "issue") {
    router.push({
      name: RouteName.ISSUE,
      params: { id: metaData.id },
    });
  }

  if (metaData.type === "project") {
    router.push({
      name: RouteName.PROJECTS,
    });
  }
}

function replaceString(title: string) {
  return title.replace(/'/g, "");
}

async function seenAll() {
  const res = await notificationService.putSeenAll();

  if (res.status === "SUCCESS") {
    getNotification();
  }
}
</script>

<template>
  <div class="header">
    <div class="header__rou">
      <Breadcrumb v-if="routeName === 'Projects'">
        <BreadcrumbItem>Project Management</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'Profile'">
        <BreadcrumbItem>Information </BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'Tasks'">
        <BreadcrumbItem>
          <a href="/projects">Project Management</a>
        </BreadcrumbItem>
        <BreadcrumbItem>Task</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'Dayoff'">
        <BreadcrumbItem>Day Off</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'Absence'">
        <BreadcrumbItem>Absence Request</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'YourWork'">
        <BreadcrumbItem>Your Work</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'ShopLives'">
        <BreadcrumbItem>Work Report</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'Users'">
        <BreadcrumbItem>User Management</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'Issues'">
        <BreadcrumbItem>
          <a href="/projects">Project Management</a>
        </BreadcrumbItem>
        <BreadcrumbItem>Issue Management</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'IssueTask'">
        <BreadcrumbItem>
          <a href="/projects">Project Management</a>
        </BreadcrumbItem>
        <BreadcrumbItem>Issue Of Task</BreadcrumbItem>
      </Breadcrumb>

      <Breadcrumb v-if="routeName === 'Issue'">
        <BreadcrumbItem>Project Management</BreadcrumbItem>
        <BreadcrumbItem>
          <a href="/issues">Issue Management</a>
        </BreadcrumbItem>
        <BreadcrumbItem v-if="isIssue">Create Issue</BreadcrumbItem>
        <BreadcrumbItem v-else>Issue Detail</BreadcrumbItem>
      </Breadcrumb>
    </div>

    <div class="flex items-center">
      <Popover
        v-if="userInfo.role !== 'ADMIN'"
        v-model:open="isNotification"
        trigger="click"
        style="width: 400px, padding: 0;"
        placement="bottom"
        class="header__setting ml-5"
      >
        <template #title>
          <div class="flex justify-between">
            <div>Notification</div>
            <div></div>
          </div>
        </template>

        <template #content>
          <Tabs v-model:activeKey="isTabs">
            <TabPane key="1">
              <template #tab>
                <span> All </span>
              </template>
              <div class="noti">
                <div
                  v-if="size(notiListAll)"
                  class="noti__contain"
                  v-for="(item, index) in notiListAll"
                  :key="'notification' + index"
                  @click="handleSelectNoti(item.id, index, item.metaData)"
                >
                  <div class="noti__avatar">
                    <img
                      src="https://i.pinimg.com/564x/a3/5f/37/a35f37a877e8b32497bf8e0e88581286.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div class="noti__wrap">
                    <div class="noti__title">
                      {{ replaceString(item.messageTitle) }}
                    </div>

                    <div class="noti__content noti__seen">
                      <div>{{ item.messageContent }}</div>
                      <div :class="{ unseen: !item.hasSeen }">
                        {{ convertTime(item.createTime) }}
                      </div>
                    </div>
                  </div>
                  <div class="noti__s">
                    <div class="noti__dot" v-if="!item.hasSeen"></div>
                  </div>
                </div>

                <template v-else>
                  <Empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    :image-style="{
                      height: '60px',
                    }"
                  >
                    <template #description>
                      <span> No data </span>
                    </template>
                  </Empty>
                </template>
              </div>
            </TabPane>

            <TabPane key="2">
              <template #tab>
                <span> Unread</span>
              </template>
              <div class="noti">
                <div
                  v-if="size(notiListUnread)"
                  class="noti__contain"
                  v-for="(item, index) in notiListUnread"
                  :key="'notification' + index"
                >
                  <div class="noti__avatar">
                    <img
                      src="https://i.pinimg.com/564x/a3/5f/37/a35f37a877e8b32497bf8e0e88581286.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div class="noti__wrap">
                    <div class="noti__title">
                      {{ replaceString(item.messageTitle) }}
                    </div>

                    <div class="noti__content noti__seen">
                      <div>{{ item.messageContent }}</div>
                      <div :class="{ unseen: !item.hasSeen }">
                        {{ convertTime(item.createTime) }}
                      </div>
                    </div>
                  </div>
                  <div class="noti__s">
                    <div class="noti__dot" v-if="!item.hasSeen"></div>
                  </div>
                </div>

                <template v-else>
                  <Empty
                    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                    :image-style="{
                      height: '60px',
                    }"
                  >
                    <template #description>
                      <span> Read it all </span>
                    </template>
                  </Empty>
                </template>
              </div>
            </TabPane>
          </Tabs>
        </template>
        <Badge :count="countNoti" :overflow-count="10" @click="handleOpenNoti">
          <div class="noti__not">
            <img src="@/assets/images/notification.png" alt="" />
          </div>
        </Badge>
      </Popover>

      <Popover
        v-model:open="isSetting"
        title="ACCOUNT"
        trigger="click"
        style="width: 200px, padding: 0;"
        placement="bottomRight"
        class="header__setting ml-5"
      >
        <template #content>
          <div class="flex items-center setting__box">
            <img :src="userInfo.avatar" alt="" class="setting__avatar" />
            <div class="pl-4">
              <h4>{{ userInfo.fullname || "null" }}</h4>
              <p>{{ userInfo.email || "null" }}</p>
            </div>
          </div>

          <router-link class="setting__item" to="/profile">
            <IdcardOutlined class="pr-3" /> Profile
          </router-link>

          <div class="setting__item" @click="handleChangePassword()">
            <UnlockOutlined class="pr-3" /> Change Password
          </div>

          <div
            class="setting__item"
            @click="handleAbsenceRequest()"
            v-if="userInfo.role !== 'ADMIN'"
          >
            <SendOutlined class="pr-3" /> Absence Request
          </div>

          <div class="setting__log" @click="handleLogout()">
            <LoginOutlined class="pr-3" /> Log out
          </div>
        </template>

        <div class="setting">
          <img :src="userInfo.avatar" alt="" class="setting__avatar mr-3" />
          <p class="setting__name">{{ userInfo.fullname }}</p>
        </div>
      </Popover>
    </div>

    <!-- Change Password -->
    <Modal
      v-model:open="isChangePassword"
      wrapClassName="newStyle"
      @ok="handleOk"
      :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
      :footer="null"
      :width="500"
      title="Change password"
    >
      <!-- <Button @click="handleOk">Close</Button> -->

      <div class="modal__content">
        <Form
          ref="formChangeRef"
          :model="changePassword"
          name="normal_changepassword"
          class="changepass-form"
          :rules="rules"
          @finish="onFinishChange"
        >
          <div class="mb-4 note">
            Your password must be at least 6 characters, including numbers,
            letters and special characters (!$@%).
          </div>
          <div>
            <label>Current Password</label>
            <FormItem class="mb-[2rem] mt-2" name="oldPassword">
              <InputPassword v-model:value="changePassword.oldPassword">
              </InputPassword>
            </FormItem>
          </div>

          <div>
            <label>New Password</label>
            <FormItem class="mb-[2rem] mt-2" name="newPassword">
              <InputPassword v-model:value="changePassword.newPassword">
              </InputPassword>
            </FormItem>
          </div>

          <div>
            <label>Repeat Password</label>
            <FormItem class="mb-[3rem] mt-2" name="repeatPassword">
              <InputPassword v-model:value="changePassword.repeatPassword">
              </InputPassword>
            </FormItem>
          </div>

          <FormItem class="flex justify-center mb-3">
            <div class="flex justify-center items-center">
              <Button html-type="submit" type="primary"> Save change </Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
