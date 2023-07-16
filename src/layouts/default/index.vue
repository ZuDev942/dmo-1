<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { MenuRight } from "@/layout-components";
import {
  Popover,
  Modal,
  Input,
  Button,
  FormItem,
  Form,
  Select,
  Tooltip,
  SelectOption,
  RangePicker,
  Textarea,
  message,
} from "ant-design-vue";
import {
  MenuOutlined,
  LoginOutlined,
  IdcardOutlined,
  UnlockOutlined,
  SendOutlined,
} from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { RouteName } from "@/shared/constants";
import { useUserPage } from "@/store/modules";
import { userService, dayoffService } from "@/services";
import { map, isEmpty, forEach } from "lodash";
import type { Dayjs } from "dayjs";
type RangeValue = [Dayjs, Dayjs];

// ==== Data ==== //
const router = useRouter();
const userStore = useUserPage();
const isSetting = ref<boolean>(false);
const isChangePassword = ref<boolean>(false);
const isAbsence = ref<boolean>(false);
interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

const changePassword = reactive<IChangePassword>({
  oldPassword: "",
  newPassword: "",
});

interface FormAbsence {
  requestAccountId: number;
  approverId: any;
  informList: any[];
  dayOffType: string;
  sessionOff: string;
  offDay: any;
  reason: string;
  note: string;
}

const formAbsence = reactive<FormAbsence>({
  requestAccountId: 3,
  approverId: [],
  informList: [],
  dayOffType: "",
  sessionOff: "",
  offDay: [],
  reason: "",
  note: "",
});

const dateFormat = "YYYY/MM/DD";
const rangeDate = ref<RangeValue>();
const userList = ref<any>([]);
const userInfo = ref<any>({});

// ==== Method ==== //
onMounted(() => {
  getUser();
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
  }
});

const list = ref<any>([]);

async function getUser() {
  const req = {
    pageIndex: 1,
    pageSize: 20,
    keyword: "",
  };

  const res = await userService.getLisrUser(req);

  const a = map(res.data.data, (item) => {
    return {
      value: item.id,
      label: item.fullName,
    };
  });

  list.value = res.data.data;

  userList.value = a;
}

const isCheckField = computed(() => {
  if (
    !isEmpty(changePassword.oldPassword) ||
    !isEmpty(changePassword.newPassword)
  ) {
    return false;
  }

  return true;
});

async function handleOk() {
  const res = await userService.changePassword(changePassword).catch((err) => {
    message.error("The current password is incorrect");
  });

  if (res.status === "SUCCESS") {
    message.success("Change your password successfull!");
    isChangePassword.value = false;
  }
}

const handleOkAbsence = async (e: MouseEvent) => {
  const inform: { accountId: any; fullName: any }[] = [];

  forEach(list.value, (item) => {
    forEach(formAbsence.informList, (i) => {
      if (item.id === i) {
        console.log(item);
        const acc = {
          accountId: item.id,
          fullName: item.fullName,
        };

        inform.push(acc);
      }
    });
  });

  const reqParams = {
    requestAccountId: 3,
    approverId: formAbsence.approverId,
    informList: inform,
    dayOffType: formAbsence.dayOffType,
    sessionOff: formAbsence.sessionOff,
    offDay: "2023-07-15",
    reason: formAbsence.reason,
    note: formAbsence.note,
  };

  const res = await dayoffService.postDayoff(reqParams);

  if (res) {
    isAbsence.value = false;
    message.success("Send absent successfull!");
  }
};

function handleLogout() {
  // Reset store infor user
  localStorage.removeItem("userInfo");
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

  if (currentPage === "Dayoff") {
    return "DAY OFF";
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
              <p class="setting__name">{{ userInfo.fullname }}</p>
              <img :src="userInfo.avatar" alt="" class="setting__avatar" />
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
            <Input
              v-model:value="changePassword.oldPassword"
              placeholder="Enter current password"
            />
          </div>

          <div class="box">
            <h4>New Password</h4>
            <Input
              v-model:value="changePassword.newPassword"
              placeholder="Enter new password"
            />
          </div>

          <div class="modal__action">
            <Button
              class="modal__btn"
              @click="handleOk()"
              :disabled="isCheckField"
              >Save change</Button
            >
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
        <div class="modal__header">
          <h3>DAYOFF DETAIL</h3>
          <img src="@/assets/images/closed.png" alt="" />
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
                <Select v-model:value="userInfo.fullname" disabled></Select>
              </FormItem>

              <FormItem
                has-feedback
                label="Approver"
                name="approver"
                class="mb-3"
              >
                <Select
                  v-model:value="formAbsence.approverId"
                  style="width: 100%"
                  :options="userList"
                ></Select>
              </FormItem>

              <FormItem has-feedback label="Inform" name="inform" class="mb-3">
                <Select
                  v-model:value="formAbsence.informList"
                  mode="multiple"
                  style="width: 100%"
                  :options="userList"
                ></Select>
              </FormItem>

              <FormItem
                has-feedback
                label="Dayoff Type"
                name="dayofftype"
                class="mb-3"
              >
                <Select
                  v-model:value="formAbsence.dayOffType"
                  style="width: 100%"
                >
                  <SelectOption value="MATERNITY_LEAVE">
                    Maternity Leave
                  </SelectOption>
                  <SelectOption value="UNPAID_LEAVE">Unpaid Leave</SelectOption>
                </Select>
              </FormItem>

              <FormItem
                has-feedback
                label="Session Off"
                name="session"
                class="mb-3"
              >
                <Select
                  v-model:value="formAbsence.sessionOff"
                  style="width: 100%"
                >
                  <SelectOption value="Morning"> Morning </SelectOption>
                  <SelectOption value="Afternoon"> Afternoon </SelectOption>
                  <SelectOption value="Fullday"> Full Day </SelectOption>
                </Select>
              </FormItem>

              <FormItem has-feedback label="Off Day" name="offday" class="mb-3">
                <RangePicker
                  v-model:value="rangeDate"
                  :format="dateFormat"
                  style="width: 100%"
                  :placeholder="['DD-MM-YYYY', 'DD-MM-YYYY']"
                />
              </FormItem>

              <FormItem has-feedback label="Reason" name="reason" class="mb-3">
                <Textarea v-model:value="formAbsence.reason" autocomplete="off">
                </Textarea>
              </FormItem>

              <FormItem has-feedback label="Note" name="note" class="mb-3">
                <Textarea v-model:value="formAbsence.note" autocomplete="off">
                </Textarea>
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
