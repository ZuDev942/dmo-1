<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from "vue";
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
  Checkbox,
  Textarea,
  InputPassword,
} from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { userService } from "@/services";
import { cloneDeep, map } from "lodash";
import type { UnwrapRef } from "vue";

// ==== Data ==== //

const fileList = ref<any>();
interface DataItem {
  addressBanking: string;
  accountName: string;
  accountNumber: string;
  status: string;
  note: string;
}

interface DataUniver {
  schools: string;
  degreeLevel: number;
  modeOfStudy: string;
  graduationYear: string;
  description: string;
}

const data: DataItem[] = [];
const data2: DataUniver[] = [];
const dataSource = ref(data);
const dataSource2 = ref(data2);

const columns = [
  {
    title: "Address Banking",
    dataIndex: "banking",
    slots: { title: "customBanking", customRender: "banking" },
  },
  {
    title: "Account Name",
    dataIndex: "name",
    slots: { title: "customAccname", customRender: "name" },
  },
  {
    title: "Account Number",
    dataIndex: "number",
    slots: { title: "customNumber", customRender: "number" },
  },
  {
    title: "Status",
    dataIndex: "status",
    slots: { title: "customStatus", customRender: "status" },
    width: "10%",
  },
  {
    title: "Note",
    dataIndex: "note",
    slots: { title: "customNote", customRender: "note" },
    width: "10%",
  },
];
const columns2 = [
  {
    title: "Schools",
    dataIndex: "schools",
    slots: { title: "customSchools", customRender: "schools" },
  },
  {
    title: "Degree",
    dataIndex: "degree",
    slots: { title: "customDegree", customRender: "degree" },
  },
  {
    title: "Mode of study",
    dataIndex: "mode",
    slots: { title: "customMode", customRender: "mode" },
    width: "20%",
  },
  {
    title: "Graduation Year",
    dataIndex: "year",
    slots: { title: "customYear", customRender: "year" },
    width: "20%",
  },
  {
    title: "Description",
    dataIndex: "des",
    slots: { title: "customDes", customRender: "des" },
    width: "15%",
  },
];

const props = defineProps<{
  isLoading?: boolean;
  isType: string;
  count: number;
  idUser: number;
  idCreate: number;
}>();

const { isLoading, isType, count, idUser, idCreate } = toRefs(props);

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

function resetReqParams() {
  reqParams.value = {
    id: 16,
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
  };

  dataSource.value = [
    {
      addressBanking: "",
      accountName: "",
      accountNumber: "",
      status: "",
      note: "",
    },
  ];

  dataSource2.value = [
    {
      schools: "",
      degreeLevel: 0,
      modeOfStudy: "",
      graduationYear: "",
      description: "",
    },
  ];
}

import type { SelectProps } from "ant-design-vue";
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

const optionsContractType = ref<SelectProps["options"]>([
  {
    value: 0,
    label: "Thu viec",
  },
  {
    value: 1,
    label: "Chinh thuc",
  },
]);

const optionsStaffType = ref<SelectProps["options"]>([
  {
    value: "Parttime",
    label: "Parttime",
  },
  {
    value: "Fulltime",
    label: "Fulltime",
  },
]);

const optionsDepartment = ref<SelectProps["options"]>([
  {
    value: 0,
    label: "Developer",
  },
  {
    value: 1,
    label: "QC/QA",
  },
  {
    value: 2,
    label: "Business Analyst",
  },
  {
    value: 3,
    label: "Product Manager",
  },
  {
    value: 4,
    label: "DevOps",
  },
  {
    value: 5,
    label: "Data Engineer",
  },
]);

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

watch(count, (n, o) => {
  if (isType.value === "create") {
    resetReqParams();
  } else {
    getDetailUser(idUser.value);
  }
});

async function getDetailUser(id: number) {
  const res = await userService.getDetailUser(id);

  if (res) {
    const a = cloneDeep(res.data);
    reqParams.value = a;
    const banking = reqParams.value.bankingList;
    const univer = reqParams.value.universityList;
    dataSource.value = cloneDeep(banking);
    dataSource.value = cloneDeep(univer);
  }
}

async function handleCreateAccount() {
  reqParams.value.bankingList = cloneDeep(dataSource.value);
  reqParams.value.universityList = cloneDeep(dataSource2.value);

  const res = await userService.createUser(reqParams.value);

  if (res.status === "SUCCESS") {
    // Do st
    message.success("Create account successfull");
    emit("refreshList");
  }
}

async function handleUpdateAccount() {
  const res = await userService.updateAccount(reqParams.value);

  if (res.status === "SUCCESS") {
    message.success("Update account successfull");
    emit("refreshList");
  }
}

onMounted(() => {
  // console.log("call api...", idUser.value);
  if (isType.value === "create") {
    resetReqParams();
  } else {
    getDetailUser(idUser.value);
  }
});

const emit = defineEmits<{
  (e: "refreshList"): void;
}>();

const convertCurrency = (num: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(num);
};
</script>

<template>
  <div class="box__container">
    <div>
      <div class="box__wrap mb-10">
        <div class="box box__top">
          <h3 class="box__title">Account Info {{ isType }}</h3>

          <div class="box__top--wrap">
            <div class="flex items-center justify-center w-[15rem]">
              <div>
                <div class="box__img">
                  <img :src="reqParams.avatar" alt="" />
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
                <Input v-model:value="reqParams.id" />
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
                  <Input v-model:value="reqParams.userName" />
                </FormItem>

                <FormItem label="Password" class="mb-3">
                  <InputPassword v-model:value="reqParams.password" />
                </FormItem>

                <FormItem label="Phone" class="mb-3">
                  <Input v-model:value="reqParams.phoneNumber" />
                </FormItem>

                <FormItem label="Roles" class="mb-3">
                  <Select
                    v-model:value="reqParams.roleId"
                    :options="optionsRole"
                    placeholder="please select your role"
                  >
                  </Select>
                </FormItem>

                <FormItem label="Permission Template" class="mb-3">
                  <Select
                    v-model:value="reqParams.permissionTemplateId"
                    placeholder="please select your permission"
                    :options="optionsRole"
                  >
                  </Select>
                </FormItem>

                <FormItem label="Email Company" class="mb-3">
                  <AutoComplete
                    v-model:value="reqParams.companyEmail"
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
              <AutoComplete
                v-model:value="reqParams.personalEmail"
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
                <label for="" class="mr-[9.8rem]">Sign day</label>
                <DatePicker
                  v-model:value="reqParams.signDay"
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

              <div>
                <label for="" class="mr-4">Quit day</label>
                <DatePicker
                  v-model:value="reqParams.quitDay"
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
              <Input v-model:value="reqParams.identityCard" />
            </FormItem>

            <FormItem label="Tax Number" class="mb-3">
              <Input v-model:value="reqParams.taxNumber" />
            </FormItem>

            <FormItem label="ID Social Insurance" class="mb-3">
              <Input v-model:value="reqParams.socialInsuranceId" />
            </FormItem>

            <FormItem label="Married" class="mb-3">
              <Checkbox v-model:checked="reqParams.marriedFlag"></Checkbox>
            </FormItem>

            <FormItem label="Children Description" class="mb-3">
              <Textarea
                v-model:value="reqParams.childrenDescription"
              ></Textarea>
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
                <template #banking="{ record }">
                  <Input v-model:value="record.addressBanking" />
                </template>

                <template #name="{ record }">
                  <Input v-model:value="record.accountName" />
                </template>

                <template #number="{ record }">
                  <Input v-model:value="record.accountNumber" />
                </template>

                <template #status="{ record }">
                  <Input v-model:value="record.status" />
                </template>

                <template #note="{ record }">
                  <Input v-model:value="record.note" />
                </template>
              </Table>
            </div>

            <div>
              <h1 class="box__name">University</h1>
              <Table
                :dataSource="dataSource2"
                :columns="columns2"
                :pagination="false"
              >
                <template #schools="{ record }">
                  <Input v-model:value="record.schools" />
                </template>

                <template #degree="{ record }">
                  <Input v-model:value="record.degreeLevel" />
                </template>

                <template #mode="{ record }">
                  <Input v-model:value="record.modeOfStudy" />
                </template>

                <template #year="{ record }">
                  <Input v-model:value="record.graduationYear" />
                </template>

                <template #des="{ record }">
                  <Input v-model:value="record.description" />
                </template>
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
                <Input v-model:value="reqParams.contractList[0].contractName" />
              </FormItem>

              <FormItem label="Contract Type" class="mb-3">
                <Select
                  v-model:value="reqParams.contractList[0].contractType"
                  style="width: 100%"
                  :options="optionsContractType"
                >
                </Select>
              </FormItem>

              <FormItem label="Salary Basic" class="mb-3">
                <Input
                  v-model:value="reqParams.contractList[0].salaryBasic"
                  overlay-class-name="numeric-input"
                />
              </FormItem>

              <FormItem label="Staff Type" class="mb-3">
                <Select
                  v-model:value="reqParams.contractList[0].staffType"
                  style="width: 100%"
                  :options="optionsStaffType"
                >
                </Select>
              </FormItem>

              <FormItem label="End Day" class="mb-3">
                <DatePicker
                  v-model:value="reqParams.contractList[0].endDay"
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
              </FormItem>

              <FormItem label="Note" class="mb-3">
                <Input v-model:value="reqParams.contractList[0].note" />
              </FormItem>
            </div>

            <div class="w-1/2">
              <FormItem label="Contract Number" class="mb-3">
                <Input
                  v-model:value="reqParams.contractList[0].contractNumber"
                />
              </FormItem>

              <FormItem label="Salary Gross" class="mb-3">
                <Input v-model:value="reqParams.contractList[0].salaryGross" />
              </FormItem>

              <FormItem label="Salary Capacity" class="mb-3">
                <Input
                  v-model:value="reqParams.contractList[0].salaryCapacity"
                />
              </FormItem>

              <FormItem label="Department" class="mb-3">
                <Select
                  v-model:value="reqParams.contractList[0].departmentId"
                  style="width: 100%"
                  :options="optionsDepartment"
                >
                </Select>
              </FormItem>

              <FormItem label="Payment Method" class="mb-3">
                <Select
                  v-model:value="reqParams.contractList[0].paymentMethod"
                  style="width: 100%"
                >
                  <SelectOption value="Bank">Bank transfer</SelectOption>
                  <SelectOption value="Receive">Receive directly</SelectOption>
                </Select>
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
    </div>

    <div class="box__save">
      <Button
        v-if="isType === 'create'"
        class="box__btn"
        size="small"
        @click="handleCreateAccount()"
      >
        Create account
      </Button>
      <Button
        v-else
        class="box__btn"
        size="small"
        @click="handleUpdateAccount()"
      >
        Update account
      </Button>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./styles.scss"></style>
