<script setup lang="ts">
import { reactive, ref, toRefs, watch } from "vue";

import { UploadOutlined } from "@ant-design/icons-vue";
import {
  Form,
  FormItem,
  Button,
  Input,
  Upload,
  message,
  Select,
  SelectOption,
  DatePicker,
  Table,
} from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { userService } from "@/services";

// ==== Data
interface FormState {
  username: string;
  password: string;
  remember: any;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});

const fileList = ref<any>();

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

const props = defineProps<{
  isLoading?: boolean;
  isType: boolean;
}>();

const { isLoading, isType } = toRefs(props);

// ==== Method ==== //
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

watch(isType, (newValue, oldValue) => {
  if (newValue === true) {
    console.log("detail...");
    getDetailUser();
  } else {
    console.log("create...");
  }
});

async function getDetailUser() {
  const res = await userService.getDetailUser(1);

  if (res) {
    console.log(res);
  }
}
</script>

<template>
  <div>
    <div class="box__wrap mb-10">
      <div class="box box__top">
        <h3 class="box__title">Account Info</h3>

        <div class="box__top--wrap">
          <div class="flex items-center justify-center w-[15rem]">
            <div>
              <div class="box__img">
                <img src="@/assets/images/avatar.jpeg" alt="" />
              </div>

              <Upload
                v-model:file-list="fileList"
                name="file"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleChange"
              >
                <Button>
                  <UploadOutlined></UploadOutlined>
                  Upload
                </Button>
              </Upload>
            </div>
          </div>

          <!-- Input field -->
          <div class="w-full pl-10">
            <Form
              :model="formState"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
            >
              <FormItem label="Employee ID" class="mb-3">
                <Input v-model:value="formState.username" />
              </FormItem>

              <FormItem label="Password" class="mb-3">
                <Input v-model:value="formState.password" />
              </FormItem>

              <FormItem label="Roles" class="mb-3">
                <Select
                  v-model:value="formState.remember"
                  placeholder="please select your role"
                >
                  <SelectOption value="shanghai">Member</SelectOption>
                  <SelectOption value="beijing">Zone two</SelectOption>
                </Select>
              </FormItem>

              <FormItem label="Permission Template" class="mb-3">
                <Select
                  v-model:value="formState.remember"
                  placeholder="please select your permission"
                >
                  <SelectOption value="shanghai">Member</SelectOption>
                  <SelectOption value="beijing">Zone two</SelectOption>
                </Select>
              </FormItem>

              <FormItem label="Email Company" class="mb-3">
                <Input v-model:value="formState.password" />
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

            <FormItem label="Birthday" class="mb-3 w-1/2">
              <DatePicker
                v-model:value="formState['date-picker']"
                value-format="YYYY-MM-DD"
              />
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

            <FormItem label="Quit Day" class="mb-3 w-1/2">
              <DatePicker
                v-model:value="formState['date-picker']"
                value-format="YYYY-MM-DD"
              />
            </FormItem>
          </div>
        </Form>
      </div>
    </div>

    <!-- Other -->
    <div class="box mb-10">
      <h3 class="box__title">Other Info</h3>
      <div class="flex">
        <Form
          :model="formState"
          name="normal_login"
          class="login-form w-[40%]"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
        >
          <FormItem label="ID Card" class="mb-3">
            <Input v-model:value="formState.username" />
          </FormItem>

          <FormItem label="Tax Number" class="mb-3">
            <Input v-model:value="formState.username" />
          </FormItem>

          <FormItem label="ID Social Insurance" class="mb-3">
            <Input v-model:value="formState.username" />
          </FormItem>

          <FormItem label="Married" class="mb-3">
            <Input v-model:value="formState.username" />
          </FormItem>

          <FormItem label="Children Description" class="mb-3">
            <Input v-model:value="formState.username" />
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

    <!-- Contract -->
    <div class="box">
      <h3 class="box__title">Contract</h3>
      <div>
        <Form
          :model="formState"
          name="normal_login"
          class="login-form flex"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
        >
          <div class="w-1/2">
            <FormItem label="Contract Name" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Contract Type" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Salary Basic" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Branch" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Staff Type" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="End Day" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Note" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>
          </div>

          <div class="w-1/2">
            <FormItem label="Contract Number" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Salary Gross" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Salary Capacity" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Department" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>

            <FormItem label="Payment Method" class="mb-3">
              <Input v-model:value="formState.username" />
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
