<script lang="ts" setup>
import { createVNode, onMounted, reactive, ref } from "vue";
import {
  Tabs,
  Input,
  TabPane,
  Form,
  FormItem,
  Textarea,
  Table,
  Upload,
  Select,
  SelectOption,
  UploadChangeParam,
  message,
  Button,
  InputPassword,
  DatePicker,
  SelectProps,
  Checkbox,
  InputNumber,
  Modal,
  SkeletonButton,
} from "ant-design-vue";
import {
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";

const value = ref<string>("account006");
const activeKey = ref<string>("1");
import { commonService, userService } from "@/services";
import { cloneDeep, defaultsDeep } from "lodash";
import moment from "moment";

interface IContract {
  conName: string;
  conType: string;
  salaryBasic: string;
  branch: string;
  staffType: string;
  endDay: any;
  note: string;
  conNumber: string;
  salaryGross: string;
  salaryCap: string;
  department: string;
  payment: string;
}

const dataSource = ref<any>([]);

const columns = [
  {
    title: "Banking Name",
    dataIndex: "banking",
    key: "banking",
  },
  {
    title: "Account Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Account Number",
    dataIndex: "number",
    key: "number",
  },
];

const reqParams = ref<any>({
  id: 0,
  avatar: "",
  userName: "",
  password: "",
  roleId: 0,
  position: 0,
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
});

const contract = ref<any>({});

const optionsRole = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "STAFF",
  },
  {
    value: 2,
    label: "MANAGER",
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

const optionsContractType = ref<SelectProps["options"]>([
  {
    value: 0,
    label: "Probationary",
  },
  {
    value: 1,
    label: "Official",
  },
]);

const banksAbbreviatedNames = [
  "Vietcombank",
  "VietinBank",
  "BIDV",
  "Agribank",
  "TPBank",
  "Sacombank",
  "ACB",
  "Techcombank",
  "MB",
  "VPBank",
  "Eximbank",
  "Maritime Bank",
  "SHB",
  "SCB",
  "OCB",
];

const optionsBank = ref<SelectProps["options"]>(
  banksAbbreviatedNames.map((bankName, index) => ({
    value: bankName,
    label: bankName,
  }))
);

const infoBank = ref({
  addressBanking: "",
  accountName: "",
  accountNumber: "",
  status: "INACTIVE",
  note: "",
});

const profileParams = ref<any>({});
const isLoadProfile = ref<boolean>(false);

import { notification } from "ant-design-vue";

// ==== Method ==== //
onMounted(() => {
  getProfile();
});

async function getProfile() {
  isLoadProfile.value = true;

  const res = await userService.profileUser().finally(() => {
    isLoadProfile.value = false;
  });

  if (res.status === "SUCCESS") {
    const a = cloneDeep(res.data);
    reqParams.value = a;
    getContract();

    const convert = defaultsDeep(a, reqParams.value);

    profileParams.value = convert;
  }
}

async function getContract() {
  const res = await userService.getContractByID(reqParams.value.id);

  contract.value = res.data;
  profileParams.value.contract = res.data;
  infoBank.value = res.data.infoTransfer;
  const a = [infoBank.value];
  dataSource.value = a;
}

async function handleUpdateProfile() {
  Modal.confirm({
    title: "Do you want to save information?",
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      profileParams.value.contract.infoTransfer = infoBank.value;

      const res = await userService.updateProfile(profileParams.value);

      if (res.status === "SUCCESS") {
        // message.success("Delete successful!");
        notification.open({
          message: "Update Profile",
          description: "Personal information has been updated",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
      }
    },
    onCancel() {},
  });
}

const file = ref<any>();

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0];

  if (!file.value) return;

  try {
    const formData = new FormData();
    formData.append("file", file.value);

    const res = await commonService.uploadFile(formData);

    if (res.status === "SUCCESS") {
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="tabs mt-[5rem]">
    <Tabs v-model:activeKey="activeKey">
      <!-- Profile -->
      <TabPane key="1" tab="PROFILE">
        <div class="h-full mt-4">
          <div class="box__wrap mb-10">
            <div class="box box__top">
              <h3 class="box__title">Account Info</h3>

              <div class="box__top--wrap">
                <div class="flex items-center justify-center w-[15rem]">
                  <div>
                    <div class="box__img">
                      <img :src="reqParams.avatar" alt="" />
                    </div>

                    <div class="flex justify-center">
                      <input
                        id="fileInput"
                        class="custom-file-input"
                        type="file"
                        @change="handleFileChange"
                        accept="image/*, .jpg, .png, .doc"
                      />
                      <label for="fileInput"> Upload </label>
                    </div>
                  </div>
                </div>

                <!-- Input field -->
                <div class="w-full pl-10">
                  <Form
                    :model="reqParams"
                    :label-col="{ span: 10 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <FormItem label="Username" class="mb-6">
                      <SkeletonButton
                        active
                        :block="true"
                        v-if="isLoadProfile"
                      />

                      <Input
                        v-else
                        v-model:value="reqParams.userName"
                        :disabled="true"
                      />
                    </FormItem>

                    <FormItem label="Password" class="mb-6">
                      <SkeletonButton
                        active
                        :block="true"
                        v-if="isLoadProfile"
                      />
                      <InputPassword
                        v-else
                        v-model:value="reqParams.password"
                        :disabled="true"
                      />
                    </FormItem>

                    <FormItem label="Roles" class="mb-6">
                      <SkeletonButton
                        active
                        :block="true"
                        v-if="isLoadProfile"
                      />
                      <Select
                        v-else
                        v-model:value="reqParams.roleId"
                        :options="optionsRole"
                        placeholder="please select your role"
                        :disabled="true"
                      >
                      </Select>
                    </FormItem>

                    <FormItem label="Position" class="mb-6">
                      <SkeletonButton
                        active
                        :block="true"
                        v-if="isLoadProfile"
                      />
                      <Select
                        v-else
                        v-model:value="reqParams.position"
                        placeholder="please select your permission"
                        :options="optionsPosition"
                        :disabled="true"
                      >
                      </Select>
                    </FormItem>
                  </Form>
                </div>
              </div>
            </div>

            <div class="box box__top">
              <h3 class="box__title">Main Info</h3>
              <Form :model="reqParams">
                <div class="flex w-full">
                  <label class="w-[15rem]">
                    Fullname <span class="text-red-600">&ast;</span>
                  </label>
                  <FormItem class="w-full">
                    <SkeletonButton active :block="true" v-if="isLoadProfile" />
                    <Input v-else v-model:value="reqParams.fullName" />
                  </FormItem>
                </div>

                <div class="flex">
                  <label for="" class="w-[15rem]">Shortname</label>

                  <FormItem class="w-full">
                    <SkeletonButton active :block="true" v-if="isLoadProfile" />
                    <Input
                      v-else
                      v-model:value="reqParams.shortName"
                      :disabled="true"
                    />
                  </FormItem>
                </div>

                <div class="flex mb-8 justify-between w-full pr-[2.2rem]">
                  <div class="w-1/2">
                    <label for="" class="mr-[6.8rem]">Gender</label>
                    <SkeletonButton
                      active
                      :block="true"
                      v-if="isLoadProfile"
                      style="width: 72px"
                    />
                    <Select
                      v-else
                      v-model:value="reqParams.gender"
                      placeholder="please select your role"
                    >
                      <SelectOption value="MALE">Male</SelectOption>
                      <SelectOption value="FEMALE">Female</SelectOption>
                    </Select>
                  </div>

                  <div class="">
                    <label for="" class="mr-10">Birthday</label>
                    <SkeletonButton
                      active
                      :block="true"
                      v-if="isLoadProfile"
                      style="width: 130px"
                    />
                    <DatePicker
                      v-else
                      v-model:value="reqParams.birthday"
                      value-format="YYYY-MM-DD"
                    >
                      <template #suffixIcon>
                        <img
                          src="@/assets/images/calender.png"
                          alt=""
                          class="calender__icon"
                        />
                      </template>
                    </DatePicker>
                  </div>
                </div>

                <div class="flex">
                  <label for="" class="w-[15rem]"
                    >Personal Email
                    <span class="text-red-600">&ast;</span></label
                  >
                  <FormItem class="w-full">
                    <SkeletonButton active :block="true" v-if="isLoadProfile" />
                    <Input v-else v-model:value="reqParams.personalEmail" />
                  </FormItem>
                </div>

                <div class="flex">
                  <label for="" class="w-[15rem]"
                    >Phone <span class="text-red-600">&ast;</span></label
                  >
                  <FormItem class="w-full">
                    <SkeletonButton active :block="true" v-if="isLoadProfile" />
                    <Input v-else v-model:value="reqParams.phoneNumber" />
                  </FormItem>
                </div>

                <div class="flex">
                  <label for="" class="w-[15rem]">Address</label>
                  <FormItem class="w-full">
                    <SkeletonButton active :block="true" v-if="isLoadProfile" />
                    <Input v-else v-model:value="reqParams.address" />
                  </FormItem>
                </div>
              </Form>
            </div>
          </div>

          <!-- Other -->
          <!-- Contract -->

          <div class="box__btn">
            <Button @click="handleUpdateProfile()" type="primary">
              Update Profile
            </Button>
          </div>
        </div>
      </TabPane>

      <!-- Contract -->
      <TabPane key="2" tab="CONTRACT">
        <div class="contract">
          <Form :model="reqParams" name="normal_login" class="login-form">
            <div class="flex justify-between">
              <div class="w-[48%]">
                <div>
                  <label class="mb-2"> Contract Name </label>
                  <FormItem class="mt-3">
                    <Input
                      v-model:value="contract.contractName"
                      :disabled="true"
                    />
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2"> Contract Type </label>
                  <FormItem class="mt-3">
                    <Select
                      v-model:value="contract.contractType"
                      style="width: 100%"
                      :options="optionsContractType"
                      :disabled="true"
                    >
                    </Select>
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2"> Staff Type </label>
                  <FormItem class="mt-3">
                    <Select
                      v-model:value="contract.staffType"
                      style="width: 100%"
                      :disabled="true"
                    >
                    </Select>
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2">Note</label>
                  <FormItem class="mt-3">
                    <Textarea
                      v-model:value="contract.note"
                      :rows="5"
                      :disabled="true"
                    ></Textarea>
                  </FormItem>
                </div>
              </div>

              <div class="w-[48%]">
                <div>
                  <label class="mb-2"> Contract Number </label>
                  <FormItem class="mt-3">
                    <Input
                      v-model:value="contract.contractNumber"
                      :disabled="true"
                    />
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2">
                    Salary <span class="note--salary">(VND)</span></label
                  >
                  <FormItem class="mt-3">
                    <InputNumber
                      :disabled="true"
                      class="w-full"
                      v-model:value="contract.salaryBasic"
                      :formatter="
                        (value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      "
                      :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
                      :controls="false"
                    />
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2">Payment Method</label>
                  <FormItem class="mt-3">
                    <Select
                      v-model:value="contract.paymentMethod"
                      style="width: 100%"
                      :disabled="true"
                    >
                      <SelectOption value="Bank">Bank transfer</SelectOption>
                      <SelectOption value="Receive"
                        >Receive directly</SelectOption
                      >
                    </Select>
                  </FormItem>
                </div>

                <div class="mr-[10rem]">
                  <label class="mb-2"> Sign Day </label>
                  <FormItem class="mt-3">
                    <DatePicker value-format="YYYY-MM-DD" :disabled="true">
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

                <div>
                  <label class="mb-2"> Contract Period </label>
                  <FormItem class="mt-3">
                    <Select style="width: 100%" :disabled="true"> </Select>
                  </FormItem>
                </div>
              </div>
            </div>

            <div class="box mb-10">
              <h3 class="box__title">Banking Info</h3>
              <div class="">
                <Table
                  :dataSource="dataSource"
                  :columns="columns"
                  :pagination="false"
                >
                </Table>
              </div>
            </div>
          </Form>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
