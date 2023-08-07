<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
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
} from "ant-design-vue";
import {
  MenuOutlined,
  LoginOutlined,
  IdcardOutlined,
  UnlockOutlined,
  SendOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { RouteName } from "@/shared/constants";
import { useUserPage } from "@/store/modules";
import { userService } from "@/services";
import { map, isEmpty, filter } from "lodash";
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

// ==== Method ==== //
onMounted(() => {
  getUser();
  onEvent("NAME_PROJECT", handle);
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
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
  // localStorage.removeItem("userInfo");
  // localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_NAME, "");

  router.push({ name: RouteName.HOMEPAGE });
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
// Get current name page
const routeName = computed(() => {
  const currentPage = router.currentRoute.value.name;

  if (currentPage === "Users") {
    return "LIST ACCOUNT";
  }

  if (currentPage === "YourWork") {
    return "YOUR WORK";
  }

  if (currentPage === "ShopLives") {
    return "SCHEDULE";
  }

  if (currentPage === "Profile") {
    return "PROFILE";
  }

  if (currentPage === "Projects") {
    return "PROJECT LIST";
  }

  if (currentPage === "Dayoff") {
    return "DAY OFF";
  }

  if (currentPage === "Absence") {
    return "DAYOFF DETAIL";
  }

  return "";
});

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
const notiList = ref([
  {
    accountId: 1,
    fullName: "Vũ Văn Đạt",
    avatar:
      "https://i.pinimg.com/564x/bb/5a/a9/bb5aa91e1cbf43d8f47502108c61838a.jpg",
    messageTitle: "update issue and send for you",
    messageContent: "Update issue detail",
    time: "2023/08/07 16:42",
    hasSeen: false,
  },
  {
    accountId: 2,
    fullName: "Nguyễn Thành Nam",
    avatar:
      "https://i.pinimg.com/564x/bb/5a/a9/bb5aa91e1cbf43d8f47502108c61838a.jpg",
    messageTitle: "has approved off day for you",
    messageContent: "Off day of you have been approved",
    time: "2023/06/29 16:42",
    hasSeen: false,
  },
  {
    accountId: 3,
    fullName: "Vũ Văn Đạt",
    avatar:
      "https://i.pinimg.com/564x/bb/5a/a9/bb5aa91e1cbf43d8f47502108c61838a.jpg",
    messageTitle: "has seen issue for you",
    messageContent: "Please check issue in your work",
    time: "2023/06/29 16:42",
    hasSeen: true,
  },
  {
    accountId: 4,
    fullName: "Vũ Văn Đạt",
    avatar:
      "https://i.pinimg.com/564x/bb/5a/a9/bb5aa91e1cbf43d8f47502108c61838a.jpg",
    messageTitle: "has seen issue for you",
    messageContent: "Please check issue in your work",
    time: "2023/06/29 16:42",
    hasSeen: true,
  },
  {
    accountId: 5,
    fullName: "Vũ Văn Đạt",
    avatar:
      "https://i.pinimg.com/564x/bb/5a/a9/bb5aa91e1cbf43d8f47502108c61838a.jpg",
    messageTitle: "has seen issue for you",
    messageContent: "Please check issue in your work",
    time: "2023/06/29 16:42",
    hasSeen: true,
  },
]);

const convertTime = (time: any) => {
  return moment(time, "YYYY/MM/DD h:mm").fromNow();
};


</script>

<template>
  <div class="header">
    <div class="header__rou">
      <!-- <MenuOutlined class="pr-3" /> -->
      <span v-if="routeName">
        {{ routeName }}
      </span>
      <span v-else> {{ nameProject }}</span>
    </div>

    <div class="flex items-center">
      <Popover
        v-model:open="isNotification"
        trigger="click"
        style="width: 400px, padding: 0;"
        placement="bottomRight"
        class="header__setting ml-5"
      >
        <template #title>
          <div class="flex justify-between">
            <div>Notification</div>
            <div></div>
          </div>
        </template>

        <template #content>
          <div class="noti__action">
            <div>
              <Button type="primary" size="small" class="noti__action--select">
                All
              </Button>
              <Button type="primary" size="small" class="">Unread</Button>
            </div>
            <div>
              <img
                src="@/assets/images/seen.png"
                alt=""
                style="width: 2rem; height: 2rem"
              />
            </div>
          </div>

          <div class="noti">
            <div
              class="noti__contain"
              v-for="(item, index) in notiList"
              :key="'notification' + index"
            >
              <div class="noti__avatar">
                <img :src="item.avatar" alt="avatar" />
              </div>
              <div class="noti__wrap">
                <div class="noti__title">
                  <span class="noti__name">{{ item.fullName }}</span>
                  {{ item.messageTitle }}
                </div>

                <div class="noti__content noti__seen">
                  <div>{{ item.messageContent }}</div>
                  <div :class="{ unseen: item.hasSeen }">
                    {{ convertTime(item.time) }}
                  </div>
                </div>
              </div>
              <div class="noti__s">
                <div class="noti__dot" v-if="item.hasSeen"></div>
              </div>
            </div>
          </div>
        </template>
        <Badge :count="5" title="Custom hover text">
          <Avatar shape="square" :size="25">
            <template #icon><MessageOutlined /></template>
          </Avatar>
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

          <div class="setting__item" @click="handleAbsenceRequest()">
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
