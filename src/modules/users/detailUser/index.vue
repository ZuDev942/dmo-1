<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import {
  Form,
  FormItem,
  Button,
  Input,
  message,
  Select,
  SelectOption,
  DatePicker,
  AutoComplete,
  Spin,
  Switch,
} from "ant-design-vue";
import { CameraOutlined } from "@ant-design/icons-vue";
import { commonService, userService } from "@/services";
import { cloneDeep, isEmpty, size } from "lodash";
import type { Ref } from "vue";

// ==== Data ==== //

const props = defineProps<{
  isLoading?: boolean;
  isType: string;
  count: number;
  idUser: number;
  idCreate: number;
}>();

const { isLoading, isType, count, idUser, idCreate } = toRefs(props);

function resetReqParams() {
  userParams.value = {
    id: 0,
    avatar:
      "https://cache.giaohangtietkiem.vn/d/1a1f5b5facda81cd956cad8cb51518d4.png",
    userName: "",
    password: "",
    roleId: null,
    position: null,
    phoneNumber: "",
    fullName: "",
    shortName: "",
    gender: "",
    birthday: "",
    personalEmail: "",
    address: "",
    signDay: "",
    quitDay: "",
    identityCard: "",
    taxNumber: "",
    socialInsuranceId: "",
    marriedFlag: true,
    childrenDescription: "",
    universityList: [],
    contract: {},
    activeFlag: true,
  };

  isManager.value = false;
}

import type { SelectProps } from "ant-design-vue";

const optionsRole = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "Staff",
  },
  {
    value: 2,
    label: "Manager",
  },
]);

const optionsPosition = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "Developer",
  },
  {
    value: 2,
    label: "Tester",
  },
  {
    value: 3,
    label: "Comtor",
  },
  {
    value: 4,
    label: "HR",
  },
  {
    value: 5,
    label: "BrSE",
  },
]);

const isManager = ref<boolean>(false);
const isLoadAcc = ref<boolean>(false);

const avatarOptions = [
  "https://cache.giaohangtietkiem.vn/d/1a1f5b5facda81cd956cad8cb51518d4.png",
  "https://cache.giaohangtietkiem.vn/d/c926875dd439623b050be8244cf7e9d7.png",
];

// ==== Method ==== //
const formUserRef = ref<FormInstance>();

onMounted(() => {
  if (formUserRef.value) {
    formUserRef.value.resetFields();
    formUserRef.value.clearValidate();
  }
  if (isType.value === "create") {
    resetReqParams();
  } else {
    getDetailUser(idUser.value);
  }
});

watch(count, (n, o) => {
  if (formUserRef.value) {
    formUserRef.value.resetFields();
    formUserRef.value.clearValidate();
  }

  if (isType.value === "create") {
    resetReqParams();
  } else {
    getDetailUser(idUser.value);
  }
});

async function getDetailUser(id: number) {
  const res = await userService.getDetailUser(id);

  if (res) {
    userParams.value = res.data;

    userParams.value.activeFlag = String(userParams.value.activeFlag);

    if (userParams.value.roleId === 1) {
      isManager.value = false;
    } else {
      isManager.value = true;
    }
  }
}

const emit = defineEmits<{
  (e: "refreshList"): void;
}>();

// Upload file
const file: Ref<File | null | undefined> = ref(null);

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0];

  if (!file.value) return;

  try {
    const formData = new FormData();
    formData.append("file", file.value);

    const res = await commonService.uploadFile(formData);

    if (res.status === "SUCCESS") {
      userParams.value.avatar = res.data.url;
    }
  } catch (error) {
    console.error(error);
  }
};

const options = ref<{ value: string }[]>([]);

const handleSearch = (val: string) => {
  let res: { value: string }[];

  if (!val || val.indexOf("@") >= 0) {
    res = [];
  } else {
    res = ["gmail.com"].map((domain) => ({
      value: `${val}@${domain}`,
    }));
  }

  options.value = res;
};

// Create account
import type { FormInstance, Rule } from "ant-design-vue/es/form";
const userParams = ref<any>({
  id: 0,
  avatar: "",
  userName: "",
  password: "",
  roleId: 1,
  position: 1,
  phoneNumber: "",
  fullName: "",
  shortName: "",
  gender: "MALE",
  birthday: "",
  personalEmail: "",
  address: "",
  signDay: "",
  quitDay: "",
  identityCard: "",
  taxNumber: "",
  socialInsuranceId: "",
  marriedFlag: true,
  childrenDescription: "",
  universityList: [],
  contract: {},
  activeFlag: true,
});

function validateFullName(fullname) {
  const regex = /^[\p{L}\s']+$/u;

  return regex.test(fullname);
}

function isVietnameseCharacter(char) {
  // Việtnamese characters range: U+0030 - U+024F
  const vietnameseCharacterRegex = /[\u0030-\u024F]/;
  return vietnameseCharacterRegex.test(char);
}

function validateEmail(email: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function isVietnamesePhoneNumberValid(number) {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
}

let checkName = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please enter name");
  } else {
    if (!validateFullName(value)) {
      return Promise.reject("Name cannot contain special characters");
    }

    if (!isVietnameseCharacter(value)) {
      return Promise.reject("Name cannot contain special characters");
    }
  }
};

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

let checkPhone = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please enter phone number");
  } else {
    if (!isVietnamesePhoneNumberValid(value)) {
      return Promise.reject(" Please enter a valid phone number");
    }
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  fullName: [{ validator: checkName, trigger: "change" }],
  personalEmail: [{ validator: checkEmail, trigger: "change" }],
  phoneNumber: [{ validator: checkPhone, trigger: "change" }],
  position: [
    { required: true, message: "Please select position", trigger: "change" },
  ],
  roleId: [
    { required: true, message: "Please select role", trigger: "change" },
  ],
};

async function onFinishChange() {
  // return;
  if (isType.value === "create") {
    handleCreateAccount();
  } else {
    handleUpdateAccount();
  }
}

async function handleCreateAccount() {
  try {
    const res = await userService.createUser(userParams.value);

    if (res.status === "SUCCESS") {
      message.success("Create account successfull");
      emit("refreshList");
    }
  } catch (error) {
    console.log("err");
  }
}

async function handleUpdateAccount() {
  isLoadAcc.value = true;
  userParams.value.universityList = null;
  userParams.value.contract = null;

  const res = await userService.updateAccount(userParams.value).finally(() => {
    isLoadAcc.value = false;
  });

  if (res.status === "SUCCESS") {
    message.success("Update account successfull");
    emit("refreshList");
  }
}

function handleChangeRole() {
  if (userParams.value.roleId === 2) {
    isManager.value = true;
  } else {
    isManager.value = false;
  }
}

function handleChangeGender() {
  if (isType.value !== "create") {
    return;
  }

  if (userParams.value.gender === "MALE") {
    userParams.value.avatar = avatarOptions[0];
  } else {
    userParams.value.avatar = avatarOptions[1];
  }
}

function handleInputPhone(event) {
  const input = event.target.value;
  // Loại bỏ các ký tự không phải số từ giá trị đang nhập
  const numericInput = input.replace(/[^\d]/g, "");
  userParams.value.phoneNumber = numericInput;
}
const delayTime = 500;

function disabledDate(current) {
  // Lấy ngày hôm nay
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // So sánh ngày hiện tại với ngày được chọn (ngày hôm nay được bỏ qua)
  return current && current.valueOf() > today;
}

function capitalizeEachWord(str: string): string {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, (a) => {
    return a.toUpperCase();
  });
}

watch(
  userParams,
  (newValue) => {
    userParams.value.fullName = capitalizeEachWord(userParams.value.fullName);
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="box__container">
    <Spin :spinning="isLoadAcc" :delay="delayTime">
      <Form
        ref="formUserRef"
        :model="userParams"
        name="normal_user"
        class="user-form"
        :rules="rules"
        @finish="onFinishChange"
      >
        <div class="box__wrap flex flex-col">
          <!-- Input field -->
          <div class="w-full pt-[4rem]">
            <div class="flex">
              <!-- Avatar -->
              <div>
                <div class="box__avatar mt-5">
                  <div class="flex">
                    <div
                      class="custom flex justify-center h-max cursor-pointer"
                    >
                      <input
                        id="fileInput"
                        class="custom-file-input cursor-pointer"
                        type="file"
                        @change="handleFileChange"
                      />
                      <div class="box__img cursor-pointer">
                        <img :src="userParams.avatar" alt="" />
                      </div>
                      <label for="fileInput">
                        <div class="custom__plus">
                          <CameraOutlined
                            style="
                              font-size: 1.8rem;
                              color: white;
                              font-weight: 600;
                            "
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div
                  class="w-full mt-[3rem] flex pl-[3rem]"
                  v-if="isType !== 'create'"
                >
                  <Switch
                    v-model:checked="userParams.activeFlag"
                    checked-children="Deactive"
                    un-checked-children="Active"
                  />
                </div>
              </div>

              <div>
                <section class="">
                  <div class="flex justify-between">
                    <div class="w-[49%]">
                      <label class="w-[25rem]">
                        Name <span class="text-red-600">&ast;</span>
                      </label>

                      <FormItem name="fullName" class="w-full">
                        <Input v-model:value="userParams.fullName" />
                      </FormItem>
                    </div>

                    <div class="w-[49%]">
                      <label class="w-[23rem]">
                        Role <span class="text-red-600">&ast;</span></label
                      >
                      <FormItem name="roleId" class="w-full">
                        <Select
                          v-model:value="userParams.roleId"
                          :options="optionsRole"
                          placeholder="Please select role"
                          class="w-full"
                          @change="handleChangeRole"
                        >
                        </Select>
                      </FormItem>
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <div
                      :class="{ 'w-[49%]': !isManager, 'w-full': isManager }"
                    >
                      <label class="w-[25rem]">
                        Personal Email
                        <span class="text-red-600">&ast;</span>
                      </label>

                      <FormItem name="personalEmail" class="w-full">
                        <AutoComplete
                          v-model:value="userParams.personalEmail"
                          :options="options"
                          @search="handleSearch"
                        >
                          <template #options="{ value: val }">
                            {{ val.split("@")[0] }} @
                            <span style="font-weight: bold">{{
                              val.split("@")[1]
                            }}</span>
                          </template>
                        </AutoComplete>
                      </FormItem>
                    </div>

                    <div class="w-[49%]" v-if="!isManager">
                      <label class="w-[23rem]">
                        Position <span class="text-red-600">&ast;</span></label
                      >
                      <FormItem name="position" class="w-full">
                        <Select
                          v-model:value="userParams.position"
                          :options="optionsPosition"
                          placeholder="Please select position"
                          class="w-full"
                        >
                        </Select>
                      </FormItem>
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <div class="w-[49%]">
                      <label class="w-[20rem]">
                        Phone Number <span class="text-red-600">&ast;</span>
                      </label>
                      <FormItem name="phoneNumber" class="w-full phone">
                        <Input
                          v-model:value="userParams.phoneNumber"
                          @input="handleInputPhone"
                        />
                      </FormItem>
                    </div>

                    <div class="w-[49%]">
                      <label for="" class="w-[20rem]">Gender</label>
                      <FormItem class="w-full">
                        <Select
                          v-model:value="userParams.gender"
                          placeholder="Please select gender"
                          class="w-full"
                          @change="handleChangeGender"
                        >
                          <SelectOption value="MALE">Male</SelectOption>
                          <SelectOption value="FEMALE">Female</SelectOption>
                        </Select>
                      </FormItem>
                    </div>
                  </div>

                  <div class="flex justify-between">
                    <div class="w-[49%]">
                      <label class="w-[20rem]"> Shortname </label>
                      <FormItem class="w-full">
                        <Input v-model:value="userParams.shortName" />
                      </FormItem>
                    </div>

                    <div class="w-[49%]">
                      <label class="w-[20rem]"> Birthday </label>
                      <FormItem name="address" class="w-full">
                        <DatePicker
                          v-model:value="userParams.birthday"
                          value-format="YYYY-MM-DD"
                          class="w-full"
                          placeholder=""
                          :disabledDate="disabledDate"
                        >
                          <template #suffixIcon>
                            <img
                              src="@/assets/images/calender.png"
                              alt=""
                              class="calender__icon"
                            />
                          </template>
                        </DatePicker>
                      </FormItem>
                    </div>
                  </div>
                  <!--  -->
                  <div class="w-full">
                    <label class="w-[20rem]"> Address </label>
                    <FormItem name="address" class="w-full">
                      <Input v-model:value="userParams.address" />
                    </FormItem>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <FormItem class="flex justify-center">
          <div class="flex justify-center items-center">
            <Button
              html-type="submit"
              type="primary"
              v-if="isType === 'create'"
            >
              Create account
            </Button>
            <Button html-type="submit" type="primary" v-else>
              Update account
            </Button>
          </div>
        </FormItem>
      </Form>
    </Spin>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
