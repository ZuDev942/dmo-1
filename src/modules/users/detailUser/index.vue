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
  AutoComplete,
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

interface reqParams {
  employee_id: string;
  password: string;
  role: string;
  permission: string;
  email_company: string;

  fullname: string;
  shortname: string;
  gender: string;
  birthday: any;
  email_personal: string;
  address: string;
  signday: any;
  quitday: any;

  id_card: string;
  tax_number: string;
  id_social: string;
  married: string;
  children: string;

  banking: any;
  university: any;

  contract_name: string;
  contract_number: string;
  contract_type: string;
  salary_gross: string;
  salary_basic: string;
  salary_cap: string;
  department: string;
  payment: string;
  staff_type: string;
  endday: string;
  note: string;
}

const reqParams = reactive<reqParams>({
  employee_id: "",
  password: "",
  role: "Admin",
  permission: "Admin",
  email_company: "",

  fullname: "",
  shortname: "",
  gender: "Male",
  birthday: "",
  email_personal: "",
  address: "",
  signday: "",
  quitday: "",

  id_card: "",
  tax_number: "",
  id_social: "",
  married: "",
  children: "",

  banking: "",
  university: "",

  contract_name: "",
  contract_number: "",
  contract_type: "",
  salary_gross: "",
  salary_basic: "",
  salary_cap: "",
  department: "",
  payment: "",
  staff_type: "",
  endday: "",
  note: "",
});

const options = ref<{ value: string }[]>([]);

const handleSearch = (val: string) => {
  let res: { value: string }[];
  if (!val || val.indexOf("@") >= 0) {
    res = [];
  } else {
    res = ["gmail.com", "fpt.edu.vn", "qq.com"].map((domain) => ({
      value: `${val}@${domain}`,
    }));
  }
  options.value = res;
};

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
              :model="reqParams"
              :label-col="{ span: 10 }"
              :wrapper-col="{ span: 16 }"
            >
              <FormItem label="Employee ID" class="mb-3">
                <Input v-model:value="reqParams.employee_id" />
              </FormItem>

              <FormItem label="Password" class="mb-3">
                <Input v-model:value="reqParams.password" />
              </FormItem>

              <FormItem label="Roles" class="mb-3">
                <Select
                  v-model:value="reqParams.role"
                  placeholder="please select your role"
                >
                  <SelectOption value="1">User</SelectOption>
                  <SelectOption value="2">Admin</SelectOption>
                </Select>
              </FormItem>

              <FormItem label="Permission Template" class="mb-3">
                <Select
                  v-model:value="reqParams.permission"
                  placeholder="please select your permission"
                >
                  <SelectOption value="1">Member</SelectOption>
                  <SelectOption value="2">Zone two</SelectOption>
                </Select>
              </FormItem>

              <FormItem label="Email Company" class="mb-3">
                <AutoComplete
                  v-model:value="reqParams.email_company"
                  :options="options"
                  @search="handleSearch"
                >
                  <template #option="{ value: val }">
                    {{ val.split("@")[0] }} @
                    <span style="font-weight: bold">{{
                      val.split("@")[1]
                    }}</span>
                  </template>
                </AutoComplete>
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
            <Input v-model:value="reqParams.fullname" />
          </FormItem>

          <FormItem label="Shortname" class="mb-3">
            <Input v-model:value="reqParams.shortname" />
          </FormItem>

          <div class="flex mb-3 justify-between w-full pr-[2.2rem]">
            <div class="w-1/2">
              <label for="" class="mr-[10.9rem]">Gender</label>
              <Select
                v-model:value="reqParams.gender"
                placeholder="please select your role"
              >
                <SelectOption value="1">Male</SelectOption>
                <SelectOption value="2">Female</SelectOption>
              </Select>
            </div>

            <div class="">
              <label for="" class="mr-10">Birthday</label>
              <DatePicker
                v-model:value="formState['date-picker']"
                value-format="YYYY-MM-DD"
              />
            </div>
          </div>

          <FormItem label="Email Personal" class="mb-3">
            <AutoComplete
              v-model:value="reqParams.email_personal"
              :options="options"
              @search="handleSearch"
            >
              <template #option="{ value: val }">
                {{ val.split("@")[0] }} @
                <span style="font-weight: bold">{{ val.split("@")[1] }}</span>
              </template>
            </AutoComplete>
          </FormItem>

          <FormItem label="Address" class="mb-3">
            <Input v-model:value="reqParams.address" />
          </FormItem>

          <div class="flex mb-3 justify-between w-full pr-[2.2rem]">
            <div>
              <label for="" class="mr-[10.2rem]">Sign day</label>
              <DatePicker
                v-model:value="formState['date-picker']"
                value-format="YYYY-MM-DD"
              />
            </div>

            <div>
              <label for="" class="mr-4">Quit day</label>
              <DatePicker
                v-model:value="formState['date-picker']"
                value-format="YYYY-MM-DD"
              />
            </div>
          </div>
        </Form>
      </div>
    </div>

    <!-- Other -->
    <div class="box mb-10">
      <h3 class="box__title">Other Info</h3>
      <div class="flex">
        <Form
          :model="reqParams"
          name="normal_login"
          class="login-form w-[45%]"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
        >
          <FormItem label="ID Card" class="mb-3">
            <Input v-model:value="reqParams.id_card" />
          </FormItem>

          <FormItem label="Tax Number" class="mb-3">
            <Input v-model:value="reqParams.tax_number" />
          </FormItem>

          <FormItem label="ID Social Insurance" class="mb-3">
            <Input v-model:value="reqParams.id_social" />
          </FormItem>

          <FormItem label="Married" class="mb-3">
            <Input v-model:value="reqParams.married" />
          </FormItem>

          <FormItem label="Children Description" class="mb-3">
            <Input v-model:value="reqParams.children" />
          </FormItem>
        </Form>

        <div class="w-[55%]">
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
          :model="reqParams"
          name="normal_login"
          class="login-form flex"
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 16 }"
        >
          <div class="w-1/2">
            <FormItem label="Contract Name" class="mb-3">
              <Input v-model:value="reqParams.contract_name" />
            </FormItem>

            <FormItem label="Contract Type" class="mb-3">
              <Input v-model:value="reqParams.contract_type" />
            </FormItem>

            <FormItem label="Salary Basic" class="mb-3">
              <Input v-model:value="reqParams.salary_basic" />
            </FormItem>

            <FormItem label="Staff Type" class="mb-3">
              <Input v-model:value="reqParams.staff_type" />
            </FormItem>

            <FormItem label="End Day" class="mb-3">
              <Input v-model:value="reqParams.endday" />
            </FormItem>

            <FormItem label="Note" class="mb-3">
              <Input v-model:value="reqParams.note" />
            </FormItem>
          </div>

          <div class="w-1/2">
            <FormItem label="Contract Number" class="mb-3">
              <Input v-model:value="reqParams.contract_number" />
            </FormItem>

            <FormItem label="Salary Gross" class="mb-3">
              <Input v-model:value="reqParams.salary_gross" />
            </FormItem>

            <FormItem label="Salary Capacity" class="mb-3">
              <Input v-model:value="reqParams.salary_cap" />
            </FormItem>

            <FormItem label="Department" class="mb-3">
              <Input v-model:value="reqParams.department" />
            </FormItem>

            <FormItem label="Payment Method" class="mb-3">
              <Input v-model:value="reqParams.payment" />
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
