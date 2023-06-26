<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { MenuRight } from "@/layout-components";
import {
  Popover,
  Modal,
  Input,
  Button,
  FormItem,
  Form,
  Select,
} from "ant-design-vue";
import {
  MenuOutlined,
  SettingOutlined,
  LoginOutlined,
  IdcardOutlined,
  UnlockOutlined,
  SendOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { RouteName } from "@/shared/constants";
import { useUserPage } from "@/store/modules";

// ==== Data ==== //
const router = useRouter();
const userStore = useUserPage();
const isSetting = ref<boolean>(false);
const isChangePassword = ref<boolean>(false);
const isAbsence = ref<boolean>(false);
interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  repPassword: string;
}

const changePassword = reactive<IChangePassword>({
  currentPassword: "",
  newPassword: "",
  repPassword: "",
});

interface FormAbsence {
  requester: string;
  approver: string;
  inform: any[];
  dayofftype: string;
  session: string;
  offday: any;
  reason: string;
  note: string;
}

const formAbsence = reactive<FormAbsence>({
  requester: "Nguyen Thanh A",
  approver: "",
  inform: ["Luong Quynh Trang"],
  dayofftype: "",
  session: "",
  offday: "",
  reason: "",
  note: "",
});
// ==== Method ==== //
const handleOk = (e: MouseEvent) => {
  isChangePassword.value = false;
};

const handleOkAbsence = (e: MouseEvent) => {
  isChangePassword.value = false;
};

function handleLogout() {
  console.log("Logout...");
  // Reset state infor user
  userStore.$reset();

  localStorage.setItem(import.meta.env.VITE_ACCESS_TOKEN_NAME, "");
  router.push({ name: RouteName.HOMEPAGE });
}

function handleChangePassword() {
  isSetting.value = false;
  isChangePassword.value = true;
}

function handleAbsenceRequest() {
  isAbsence.value = true;
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

  return "";
});
const options: { value: string; disabled: boolean }[] = [];
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
          <MenuOutlined class="pr-3" /> {{ routeName }}
        </div>
        <div>
          <Popover
            v-model:visible="isSetting"
            title="ACCOUNT"
            trigger="click"
            style="width: 200px, padding: 0;"
            placement="bottomRight"
          >
            <template #content>
              <div class="flex items-center setting__box">
                <img :src="userStore.image" alt="" class="setting__avatar" />
                <div class="pl-4">
                  <h4>{{ userStore.username || "null" }}</h4>
                  <p>{{ userStore.email || "null" }}</p>
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
              <p class="setting__name">{{ userStore.username }}</p>
              <img :src="userStore.image" alt="" class="setting__avatar" />
            </div>
          </Popover>
        </div>
      </div>

      <!-- Change Password -->
      <Modal
        v-model:visible="isChangePassword"
        wrapClassName="newStyle"
        @ok="handleOk"
        :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
        :closable="false"
        :footer="null"
        :width="400"
      >
        <!-- <Button @click="handleOk">Close</Button> -->
        <div class="modal__header">
          <h3>CHANGE THE PASSWORD</h3>
          <img src="@/assets/images/closed.png" alt="" @click="handleOk" />
        </div>

        <div class="modal__content">
          <div class="box">
            <h4>Current Password</h4>
            <Input v-model:value="changePassword.currentPassword" />
          </div>

          <div class="box">
            <h4>New Password</h4>
            <Input v-model:value="changePassword.newPassword" />
          </div>

          <div class="box">
            <h4>Repeat Password</h4>
            <Input v-model:value="changePassword.repPassword" />
          </div>

          <div class="modal__action">
            <Button class="modal__btn" @click="handleOk">SAVE</Button>
          </div>
        </div>
      </Modal>

      <!-- Absent Request -->
      <Modal
        v-model:visible="isAbsence"
        wrapClassName="newStyle"
        @ok="handleOkAbsence"
        :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
        :closable="false"
        :footer="null"
      >
        <!-- <Button @click="handleOk">Close</Button> -->
        <div class="modal__header">
          <h3>DAYOFF DETAIL</h3>
          <img
            src="@/assets/images/closed.png"
            alt=""
            @click="handleOkAbsence"
          />
        </div>

        <div class="modal__content w-full">
          <div class="w-full">
            <Form
              ref="formRef"
              name="custom-validation-ab"
              :model="formAbsence"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 16 }"
            >
              <FormItem
                has-feedback
                label="Requester"
                name="requester"
                class="mb-3"
                :aria-disabled="true"
              >
                <Select v-model:value="formAbsence.requester" disabled>
                </Select>
              </FormItem>

              <FormItem
                has-feedback
                label="Approver"
                name="approver"
                class="mb-3"
              >
                <Input
                  v-model:value="formAbsence.approver"
                  autocomplete="off"
                />
              </FormItem>

              <FormItem has-feedback label="Inform" name="inform" class="mb-3">
                <!-- <Input v-model:value="formAbsence.inform" autocomplete="off" /> -->
                <Select
                  v-model:value="formAbsence.inform"
                  mode="multiple"
                  style="width: 100%"
                  placeholder="Please select"
                  :options="options"
                ></Select>
              </FormItem>

              <FormItem
                has-feedback
                label="Dayoff Type"
                name="dayofftype"
                class="mb-3"
              >
                <Input
                  v-model:value="formAbsence.dayofftype"
                  autocomplete="off"
                />
              </FormItem>

              <FormItem
                has-feedback
                label="Session Off"
                name="session"
                class="mb-3"
              >
                <Input v-model:value="formAbsence.session" autocomplete="off" />
              </FormItem>

              <FormItem has-feedback label="Off Day" name="offday" class="mb-3">
                <Input v-model:value="formAbsence.offday" autocomplete="off" />
              </FormItem>

              <FormItem has-feedback label="Reason" name="reason" class="mb-3">
                <Input v-model:value="formAbsence.reason" autocomplete="off" />
              </FormItem>

              <FormItem has-feedback label="Note" name="note" class="mb-3">
                <Input v-model:value="formAbsence.note" autocomplete="off" />
              </FormItem>
            </Form>
          </div>
          <div class="modal__action">
            <Button class="modal__btn" @click="handleOkAbsence">SAVE</Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
