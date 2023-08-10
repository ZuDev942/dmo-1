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
      "https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10413&avatarType=project",
    userName: "",
    password: "",
    roleId: 1,
    permissionTemplateId: 1,
    phoneNumber: "",
    companyEmail: "",
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
  };
}

import type { SelectProps } from "ant-design-vue";
const optionsRole = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "User",
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

const options = ref<{ value: string }[]>([]);

const handleSearch = (val: string) => {
  let res: { value: string }[];
  if (!val || val.indexOf("@") >= 0) {
    res = [];
  } else {
    res = ["hrm.com", "fpt.edu.vn", "qq.com"].map((domain) => ({
      value: `${val}@${domain}`,
    }));
  }
  options.value = res;
};

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

// Create account
import type { FormInstance, Rule } from "ant-design-vue/es/form";
const userParams = ref<any>({
  id: 0,
  avatar: "",
  userName: "",
  password: "",
  roleId: 1,
  permissionTemplateId: 1,
  phoneNumber: "",
  companyEmail: "",
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
});

function validateEmail(email: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function isVietnamesePhoneNumberValid(number) {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
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
  fullName: [
    { required: true, message: "Please enter your name", trigger: "change" },
  ],
  companyEmail: [{ validator: checkEmail, trigger: "change" }],
  phoneNumber: [{ validator: checkPhone, trigger: "change" }],
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
  userParams.value.personalEmail = userParams.value.companyEmail;

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
  userParams.value.universityList = null;
  userParams.value.contract = null;

  const res = await userService.updateAccount(userParams.value);

  if (res.status === "SUCCESS") {
    message.success("Update account successfull");
    emit("refreshList");
  }
}
</script>

<template>
  <div class="box__container">
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
            <div class="box__avatar">
              <div class="flex">
                <div class="custom flex justify-center h-max cursor-pointer">
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

            <div>
              <div class="flex w-full justify-between">
                <div class="w-[48%]">
                  <div class="">
                    <label class="w-[25rem]">
                      Name <span class="text-red-600">&ast;</span>
                    </label>
                    <FormItem name="fullName" class="w-full">
                      <Input v-model:value="userParams.fullName" />
                    </FormItem>
                  </div>

                  <div class="">
                    <label class="w-[25rem]">
                      Personal Email
                      <span class="text-red-600">&ast;</span>
                    </label>
                    <FormItem name="companyEmail" class="w-full">
                      <Input v-model:value="userParams.companyEmail"> </Input>
                    </FormItem>
                  </div>

                  <div class="">
                    <label class="w-[20rem]">
                      Phone Number <span class="text-red-600">&ast;</span>
                    </label>
                    <FormItem name="phoneNumber" class="w-full phone">
                      <Input v-model:value="userParams.phoneNumber" />
                    </FormItem>
                  </div>

                  <div class="">
                    <label class="w-[20rem]"> Shortname </label>
                    <FormItem class="w-full">
                      <Input v-model:value="userParams.shortName" />
                    </FormItem>
                  </div>
                </div>

                <div class="w-[48%]">
                  <div class="">
                    <label class="w-[23rem]"> Role </label>
                    <FormItem name="roles" class="w-full">
                      <Select
                        v-model:value="userParams.roleId"
                        :options="optionsRole"
                        placeholder="please select your role"
                        class="w-full"
                      >
                      </Select>
                    </FormItem>
                  </div>

                  <div class="">
                    <label class="w-[23rem]"> Position </label>
                    <FormItem name="department" class="w-full">
                      <Select
                        v-model:value="userParams.permissionTemplateId"
                        :options="optionsPosition"
                        placeholder="please select your role"
                        class="w-full"
                      >
                      </Select>
                    </FormItem>
                  </div>

                  <div class="">
                    <label for="" class="w-[20rem]">Gender</label>
                    <FormItem class="w-full">
                      <Select
                        v-model:value="userParams.gender"
                        placeholder="please select your role"
                        class="w-full"
                      >
                        <SelectOption value="MALE">Male</SelectOption>
                        <SelectOption value="FEMALE">Female</SelectOption>
                      </Select>
                    </FormItem>
                  </div>

                  <div class="">
                    <label class="w-[20rem]"> Birthday </label>
                    <FormItem name="address" class="w-full">
                      <DatePicker
                        v-model:value="userParams.birthday"
                        value-format="YYYY-MM-DD"
                        class="w-full"
                        placeholder=""
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
              </div>
              <div class="">
                <label class="w-[20rem]"> Address </label>
                <FormItem name="address" class="w-full">
                  <Input v-model:value="userParams.address" />
                </FormItem>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormItem class="flex justify-center">
        <div class="flex justify-center items-center">
          <Button html-type="submit" type="primary" v-if="isType === 'create'">
            Create account
          </Button>
          <Button html-type="submit" type="primary" v-else>
            Update account
          </Button>
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
