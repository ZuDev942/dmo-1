<script lang="ts" setup>
import { reactive, ref } from "vue";
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
  DatePicker,
} from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";

const value = ref<string>("account006");
const activeKey = ref<string>("1");

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

const contract = reactive<IContract>({
  conName: "SHHSG00392/33884",
  conType: "Thu viec",
  salaryBasic: "10.000.000 vnd",
  branch: "Nam Tu Liem",
  staffType: "Partime",
  endDay: "2023/05/05",
  note: "OK",
  conNumber: "ASIS2023",
  salaryGross: "12.000.000 vnd",
  salaryCap: "0",
  department: "Developer",
  payment: "Bank Transfer",
});

const dataSource = [
  {
    banking: "Vietcombank",
    name: "Vu Van Dat",
    number: "1013876779",
    status: "On",
    note: "",
  },
];

const dataSource2 = [
  {
    schools: "FPT",
    degree: "Cu nhan",
    mode: "4",
    year: "2023",
    des: "",
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
const columns2 = [
  {
    title: "Schools",
    dataIndex: "schools",
    key: "schools",
  },
  {
    title: "Degree",
    dataIndex: "degree",
    key: "degree",
  },
  {
    title: "Mode of study",
    dataIndex: "mode",
    key: "mode",
    width: "20%",
  },
  {
    title: "Graduation Year",
    dataIndex: "year",
    key: "year",
    width: "20%",
  },
  {
    title: "Description",
    dataIndex: "des",
    key: "des",
    width: "15%",
  },
];

interface FormState {
  username: string;
  password: string;
  remember: any;
}

const formState = reactive<FormState>({
  username: "a",
  password: "",
  remember: true,
});

const fileList = ref<any>();

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
</script>

<template>
  <div class="tabs">
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
                      <img src="@/assets/images/avatar.jpeg" alt="" />
                    </div>
                  </div>
                </div>

                <!-- Input field -->
                <div class="w-full pl-10 account__field">
                  <Form
                    :model="formState"
                    :label-col="{ span: 10 }"
                    :wrapper-col="{ span: 16 }"
                  >
                    <FormItem label="Employee ID" class="mb-4">
                      <Input
                        v-model:value="formState.username"
                        :bordered="false"
                        disabled
                      />
                    </FormItem>

                    <FormItem label="Password" class="mb-4">
                      <Input
                        v-model:value="formState.password"
                        :bordered="false"
                        disabled
                      />
                    </FormItem>

                    <FormItem label="Roles" class="mb-4">
                      <Select
                        v-model:value="formState.remember"
                        placeholder="please select your role"
                        disabled
                        :bordered="false"
                      >
                        <SelectOption value="shanghai">Member</SelectOption>
                        <SelectOption value="beijing">Zone two</SelectOption>
                      </Select>
                    </FormItem>

                    <FormItem label="Permission Template" class="mb-4">
                      <Select
                        v-model:value="formState.remember"
                        placeholder="please select your permission"
                        :bordered="false"
                        disabled
                      >
                        <SelectOption value="shanghai">Member</SelectOption>
                        <SelectOption value="beijing">Zone two</SelectOption>
                      </Select>
                    </FormItem>

                    <FormItem label="Email Company" class="mb-4">
                      <Input
                        v-model:value="formState.password"
                        :bordered="false"
                        disabled
                      />
                    </FormItem>
                  </Form>
                </div>
              </div>
            </div>

            <div class="box box__top">
              <h3 class="box__title">Main Info</h3>
              <Form
                :model="formState"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 16 }"
              >
                <FormItem label="Fullname" class="mb-3">
                  <Input v-model:value="formState.username" />
                </FormItem>

                <FormItem label="Shortname" class="mb-3">
                  <Input v-model:value="formState.password" />
                </FormItem>

                <div class="flex">
                  <FormItem label="Gender" class="mb-3 w-1/2">
                    <Select
                      v-model:value="formState.remember"
                      placeholder="please select your role"
                    >
                      <SelectOption value="shanghai">Member</SelectOption>
                      <SelectOption value="beijing">Zone two</SelectOption>
                    </Select>
                  </FormItem>

                  <FormItem label="Birthday" class="mb-3 w-1/2 select__status">
                    <DatePicker>
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

                <FormItem label="Email Personal" class="mb-3">
                  <Select
                    v-model:value="formState.remember"
                    placeholder="please select your permission"
                  >
                    <SelectOption value="shanghai">Member</SelectOption>
                    <SelectOption value="beijing">Zone two</SelectOption>
                  </Select>
                </FormItem>

                <FormItem label="Address" class="mb-3">
                  <Input v-model:value="formState.password" />
                </FormItem>

                <div class="flex">
                  <FormItem label="Sign Day" class="mb-3 w-1/2">
                    <Select
                      v-model:value="formState.remember"
                      placeholder="please select your role"
                    >
                      <SelectOption value="shanghai">Member</SelectOption>
                      <SelectOption value="beijing">Zone two</SelectOption>
                    </Select>
                  </FormItem>

                  <FormItem label="Quit Day" class="mb-3 w-1/2 select__status">
                    <DatePicker>
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
              </Form>
            </div>
          </div>

          <!-- Other -->
          <div class="box mb-10">
            <h3 class="box__title">Other Info</h3>
            <div class="flex account__field">
              <Form
                :model="formState"
                name="normal_login"
                class="login-form w-[40%] mr-4"
                :label-col="{ span: 9 }"
                :wrapper-col="{ span: 16 }"
              >
                <FormItem label="ID Card" class="mb-4">
                  <Input
                    v-model:value="formState.username"
                    :bordered="false"
                    disabled
                  />
                </FormItem>

                <FormItem label="Tax Number" class="mb-4">
                  <Input
                    v-model:value="formState.username"
                    :bordered="false"
                    disabled
                  />
                </FormItem>

                <FormItem label="ID Social Insurance" class="mb-4">
                  <Input
                    v-model:value="formState.username"
                    :bordered="false"
                    disabled
                  />
                </FormItem>

                <FormItem label="Married" class="mb-4">
                  <Input
                    v-model:value="formState.username"
                    :bordered="false"
                    disabled
                  />
                </FormItem>

                <FormItem label="Children Description" class="mb-4">
                  <Input
                    v-model:value="formState.username"
                    :bordered="false"
                    disabled
                  />
                </FormItem>
              </Form>

              <div class="w-[60%]">
                <div class="mb-5">
                  <h1 class="box__name">Banking</h1>
                  <Table
                    :dataSource="dataSource"
                    :columns="columns"
                    :pagination="false"
                  >
                  </Table>
                </div>

                <div>
                  <h1 class="box__name">University</h1>
                  <Table
                    :dataSource="dataSource2"
                    :columns="columns2"
                    :pagination="false"
                  >
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPane>

      <!-- Contract -->
      <TabPane key="2" tab="CONTRACT">
        <div class="contract">
          <div class="contract__wrap">
            <h3>Sign Day - 2022/03/01</h3>

            <Form
              ref="formRef"
              name="custom-validation"
              :model="contract"
              class="grid grid-cols-2"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 16 }"
            >
              <FormItem label="Contract Name" name="conName" class="mb-4">
                <Input
                  v-model:value="contract.conName"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Contract Type" name="conType" class="mb-4">
                <Input
                  v-model:value="contract.conType"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Salary Basic" name="salaryBasic" class="mb-4">
                <Input
                  v-model:value="contract.salaryBasic"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Branch" name="branch" class="mb-4">
                <Input
                  v-model:value="contract.branch"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Staff Type" name="staffType" class="mb-4">
                <Input
                  v-model:value="contract.staffType"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="End Day" name="endDay" class="mb-4">
                <Input
                  v-model:value="contract.endDay"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Contract Number" name="conNumber" class="mb-4">
                <Input
                  v-model:value="contract.conNumber"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Salary Gross" name="salaryGross" class="mb-4">
                <Input
                  v-model:value="contract.salaryGross"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Salary Capacity" name="salaryCap" class="mb-4">
                <Input
                  v-model:value="contract.salaryCap"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Department" name="department" class="mb-4">
                <Input
                  v-model:value="contract.department"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Payment Method" name="payment" class="mb-4">
                <Input
                  v-model:value="contract.payment"
                  disabled
                  :bordered="false"
                />
              </FormItem>

              <FormItem label="Note" name="note" class="mb-4">
                <Textarea
                  v-model:value="contract.note"
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
