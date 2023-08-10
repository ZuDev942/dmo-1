<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
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
} from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

const value = ref<string>("account006");
const activeKey = ref<string>("1");
import { userService } from "@/services";
import { cloneDeep } from "lodash";
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

const dataSource = [
  {
    banking: "Vietcombank",
    name: "Vu Van Dat",
    number: "1013876779",
    status: "On",
    note: "",
  },
];

const columns = [
  {
    title: "Address Banking",
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
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "10%",
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    width: "10%",
  },
];

const reqParams = ref<any>({
  id: 0,
  avatar:
    "https://i.pinimg.com/564x/43/f6/96/43f696508a59aadffaecac0b4aa2de45.jpg",
  userName: "",
  password: "",
  roleId: 1,
  permissionTemplateId: 1,
  companyEmail: "",
  fullName: "",
  shortName: "",
  gender: "MALE",
  birthday: "",
  personalEmail: "",
  phoneNumber: "",
  address: "",
  signDay: "",
  quitDay: "",
  identityCard: "",
  taxNumber: "",
  socialInsuranceId: "",
  marriedFlag: true,
  childrenDescription: "",
  bankingList: [],
  universityList: [],
  contractList: [
    {
      contractName: "",
      contractNumber: "",
      contractType: 0,
      salaryGross: 0,
      salaryBasic: null,
      salaryCapacity: 0,
      staffType: "Fulltime",
      departmentId: 0,
      paymentMethod: "Bank",
      endDay: "",
      note: "",
    },
  ],
});

const optionsRole = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "User",
  },
  {
    value: 2,
    label: "Admin",
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

// ==== Method ==== //
onMounted(() => {
  getProfile();
});

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};

async function getProfile() {
  const res = await userService.profileUser();

  // console.log(res);
  if (res.status === "SUCCESS") {
    const a = cloneDeep(res.data);
    reqParams.value = a;
  }
}

const convertTime = (date: Date) => {
  return moment(date).format("DD/MM/YYYY");
};
</script>

<template>
  <div class="tabs mt-[5rem]">
    <Tabs v-model:activeKey="activeKey">
      <!-- Profile -->
      <TabPane key="1" tab="PROFILE">
        <div class="h-full">
          <div class="box__wrap mb-10">
            <div class="box box__top">
              <h3 class="box__title">Account Info</h3>

              <div class="box__top--wrap">
                <div class="flex items-center justify-center w-[15rem]">
                  <div>
                    <div class="box__img">
                      <img :src="reqParams.avatar" alt="" />
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
                    <FormItem label="Employee ID" class="mb-3">
                      <Input
                        v-model:value="reqParams.userName"
                        :disabled="true"
                      />
                    </FormItem>

                    <FormItem label="Password" class="mb-3">
                      <InputPassword
                        v-model:value="reqParams.password"
                        :disabled="true"
                      />
                    </FormItem>

                    <FormItem label="Roles" class="mb-3">
                      <Select
                        v-model:value="reqParams.roleId"
                        :options="optionsRole"
                        placeholder="please select your role"
                        :disabled="true"
                      >
                      </Select>
                    </FormItem>

                    <FormItem label="Position" class="mb-3">
                      <Select
                        v-model:value="reqParams.permissionTemplateId"
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
              <Form
                :model="reqParams"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 16 }"
              >
                <FormItem label="Fullname" class="mb-3">
                  <Input v-model:value="reqParams.fullName" />
                </FormItem>

                <FormItem label="Shortname" class="mb-3">
                  <Input v-model:value="reqParams.shortName" />
                </FormItem>

                <div class="flex mb-3 justify-between w-full pr-[2.2rem]">
                  <div class="w-1/2">
                    <label for="" class="mr-[10.6rem]">Gender</label>
                    <Select
                      v-model:value="reqParams.gender"
                      placeholder="please select your role"
                    >
                      <SelectOption value="MALE">Male</SelectOption>
                      <SelectOption value="FEMALE">Female</SelectOption>
                    </Select>
                  </div>

                  <div class="">
                    <label for="" class="mr-10">Birthday</label>
                    <DatePicker
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

                <FormItem label="Email Personal" class="mb-3">
                  <Input v-model:value="reqParams.personalEmail" />
                </FormItem>

                <FormItem label="Phone" class="mb-3">
                  <Input v-model:value="reqParams.phoneNumber" />
                </FormItem>

                <FormItem label="Address" class="mb-3">
                  <Input v-model:value="reqParams.address" />
                </FormItem>
              </Form>
            </div>
          </div>

          <!-- Other -->
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

          <!-- Contract -->
        </div>
      </TabPane>

      <!-- Contract -->
      <TabPane key="2" tab="CONTRACT">
        <div class="contract">
          <div class="contract__wrap">
            <h3>Sign Day - {{ convertTime(reqParams.signDay) }}</h3>

            <Form
              ref="formRef"
              name="custom-validation"
              :model="reqParams"
              class="grid grid-cols-2"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }"
            >
              <FormItem label="Contract Name" name="conName" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.contractName"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Contract Type" name="conType" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.contractNumber"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Salary Basic" name="salaryBasic" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.salaryBasic"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <!-- <FormItem label="Branch" name="branch" class="mb-4">
                <Input
                  v-model:value="reqParams.br"
                  disabled
                  :bordered="false"
                />
              </FormItem> -->

              <FormItem label="Staff Type" name="staffType" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.staffType"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="End Day" name="endDay" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.endDay"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Contract Number" name="conNumber" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.contractNumber"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Salary Gross" name="salaryGross" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.salaryGross"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Salary Capacity" name="salaryCap" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.salaryCapacity"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Department" name="department" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.departmentId"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Payment Method" name="payment" class="mb-4">
                <Input
                  v-model:value="reqParams.contract.paymentMethod"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Note" name="note" class="mb-4">
                <Textarea
                  v-model:value="reqParams.contract.note"
                  disabled
                  :bordered="false"
                ></Textarea>
              </FormItem>
            </Form>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
