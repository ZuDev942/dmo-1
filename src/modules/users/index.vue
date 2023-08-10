<script lang="ts" setup>
// ==== Import ==== //
import { reactive, ref, watch, onMounted, createVNode, computed } from "vue";
import {
  Button,
  Input,
  Modal,
  message,
  Table,
  Popover,
  FormItem,
  Form,
  Select,
  SelectOption,
  SelectProps,
  DatePicker,
  Textarea,
  InputSearch,
  InputNumber,
} from "ant-design-vue";
import {
  EllipsisOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";

import type { IDataSource } from "@/components";
import { userService } from "@/services";
import DetailUser from "./detailUser/index.vue";
import {
  cloneDeep,
  debounce,
  isEmpty,
  map,
  size,
  sortBy,
  toUpper,
  deburr,
} from "lodash";

// ==== Data ==== //
const dataSource = reactive<IDataSource>({
  loading: false,
  noDataText: "No data",
  pagination: {
    totalPage: 0,
    page: 1,
  },
  data: [],
  columns: [
    {
      title: "No",
      width: "5%",
      dataIndex: "no",
    },
    {
      title: "Name",
      dataIndex: "fullname",
    },
    {
      title: "User ID",
      dataIndex: "id",
      width: 120,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 250,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
    },
    {
      dataIndex: "action",
      width: "5%",
    },
  ],
});
const textSearch = ref<string>("");
const isLoadingDetail = ref<boolean>(false);
const isType = ref<string>("none");
const title = ref<string>("Create Account");
const count = ref<number>(0);
const idCreate = ref<number>(0);

interface IReqParams {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;
}

const reqParams = reactive<IReqParams>({
  pageIndex: 1,
  pageSize: 20,
  keyword: "",
});

const idUser = ref<number>(0);
const isAccount = ref<boolean>(false);

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

const optionContractPeriod = ref<SelectProps["options"]>([
  {
    value: 0,
    label: "6 Months",
  },
  {
    value: 1,
    label: "1 Year",
  },
  {
    value: 2,
    label: "",
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

// ==== Method ==== //
onMounted(() => {
  console.log("redirict list user...");
  getListUser();
});

const createAccount = () => {
  isAccount.value = true;
  title.value = "Create Account";
  isType.value = "create";
  count.value++;
};

async function getListUser() {
  dataSource.loading = true;

  const res = await userService.getLisrUser(reqParams).finally(() => {
    dataSource.loading = false;
  });

  if (res) {
    dataSource.data = sortBy(res.data.data, "id");
  }
}

const handleDelete = (id: any) => {
  Modal.confirm({
    title: "Do you want to delete account?",
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      const res = await userService.deleteUser(id);

      if (res.status === "SUCCESS") {
        message.success("Delete successful!");
        getListUser();
      }
    },
    onCancel() {},
  });
};

const handleSelectDetail = async (id: number) => {
  isAccount.value = true;
  idUser.value = id;
  isType.value = "detail";
  title.value = "Detail Account";
  count.value++;
};

watch(
  textSearch,
  debounce(() => {
    reqParams.keyword = textSearch.value;
    getListUser();
  }, 300)
);

function handleClear() {
  textSearch.value = "";
}

function handleRefresh() {
  isAccount.value = false;
  getListUser();
}

// Contract
const isContract = ref(false);

const reqContract = ref<any>({
  id: 0,
  accountId: 0,
  contractName: "",
  contractNumber: "",
  contractType: 0,
  salaryGross: 0,
  salaryBasic: 0,
  salaryCapacity: 0,
  staffType: "",
  departmentId: 0,
  paymentMethod: "",
  endDay: "",
  note: "",
});

const titleContract = ref("");
const isTypeContract = ref(true);
const idAccountContract = ref();

async function handleContract(idAcc: number, name: string, userName: string) {
  isContract.value = true;
  reqContract.value = {
    id: 0,
    accountId: idAcc,
    contractName: "",
    contractNumber: "",
    contractType: 0,
    salaryGross: 0,
    salaryBasic: 0,
    salaryCapacity: 0,
    staffType: "",
    departmentId: 0,
    paymentMethod: "Bank",
    endDay: "",
    note: "",
    infoTransfer: {
      addressBanking: "",
      accountName: "",
      accountNumber: "",
      status: "INACTIVE",
      note: "",
    },
  };

  const res = await userService.getContractByID(idAcc);

  if (res.status === "SUCCESS") {
    const data = res.data;
    if (size(data)) {
      titleContract.value = "CONTRACT - " + name;
      reqContract.value = cloneDeep(res.data);
      reqContract.value.contractNumber = "HRM" + idAcc;
      reqContract.value.contractName = toUpper("HRM" + deburr(userName));
      isTypeContract.value = false;
    } else {
      titleContract.value = "CREATE CONTRACT";
      reqContract.value.contractNumber = "HRM" + idAcc;
      reqContract.value.contractName = toUpper("HRM" + deburr(userName));
      isTypeContract.value = true;
    }
    console.log(reqContract.value);

    if (!isEmpty(reqContract.value.infoTransfer)) {
      infoBank.value = reqContract.value.infoTransfer;
    } else {
      infoBank.value = {
        addressBanking: "",
        accountName: "",
        accountNumber: "",
        status: "INACTIVE",
        note: "",
      };
    }
  }
}

function handleOkContract() {
  isContract.value = false;
}

async function updateContract() {
  if (reqContract.value.paymentMethod === "Receive") {
    reqContract.value.infoTransfer = null;
  } else {
    reqContract.value.infoTransfer = infoBank.value;
  }

  const res = await userService.updateContract(reqContract.value);

  if (res.status === "SUCCESS") {
    message.success("Update contract successfull");
    isContract.value = false;
  }
}

async function createContract() {
  delete reqContract.value.id;

  reqContract.value.infoTransfer = infoBank.value;
  const res = await userService
    .createContract(reqContract.value)
    .catch((err) => console.log(err));

  if (res.status === "SUCCESS") {
    message.success("Create contract successfull");
    isContract.value = false;
  }
}

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

function convertRole(role: string) {
  if (role === "MANAGER") {
    return "Manager";
  }

  if (role === "USER") {
    return "Staff";
  }

  return "Admin";
}
// Active and Inactive
const isActive = ref(true);

function handleActiveAccount() {
  isActive.value = !isActive.value;
}
</script>

<template>
  <div class="page h-full">
    <div class="user__filter">
      <div class="flex">
        <div class="search mr-[1rem]">
          <Input
            v-model:value="textSearch"
            style="width: 300px"
            placeholder="Search"
          />
          <div class="search__icon">
            <SearchOutlined
              v-if="isEmpty(textSearch)"
              style="font-size: 1.2rem"
            />
            <CloseOutlined
              v-else
              @click="handleClear()"
              style="font-size: 1.2rem"
            />
          </div>
        </div>

        <Button
          :class="{ btn__active: !isActive }"
          type="primary"
          @click="handleActiveAccount()"
        >
          {{ isActive ? "Inactive" : "Active" }}
        </Button>
      </div>

      <Button type="primary" @click="createAccount()">
        <PlusOutlined />
        Create Account
      </Button>
    </div>

    <div class="content relative">
      <Table
        :dataSource="dataSource.data"
        :columns="dataSource.columns"
        :loading="dataSource.loading"
        :scroll="{ y: 480 }"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'no'">
            {{ index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'id'">
            {{ record.userName }}
          </template>
          <template v-if="column.dataIndex === 'fullname'">
            <div @click="handleSelectDetail(record.id)" class="cursor-pointer">
              {{ record.fullName }}
            </div>
          </template>
          <template v-if="column.dataIndex === 'role'">
            <div v-if="record.role === 'MANAGER'" class="role role__m">
              {{ convertRole(record.role) }}
            </div>

            <div v-if="record.role === 'USER'" class="role role__u">
              {{ convertRole(record.role) }}
            </div>
          </template>
          <template v-if="column.dataIndex === 'phone'">
            {{ record.phone }}
          </template>
          <template v-if="column.dataIndex === 'email'">
            {{ record.email }}
          </template>
          <template v-if="column.dataIndex === 'status'">
            <div class="active">
              <div class="active__dot"></div>
              <div>Active</div>
            </div>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <div class="content__icon cursor-pointer">
              <Popover trigger="click" placement="bottomRight">
                <template #content>
                  <div
                    @click="handleSelectDetail(record.id)"
                    class="cursor-pointer h-[3.2rem] option"
                  >
                    Edit
                  </div>
                  <div
                    @click="
                      handleContract(
                        record.id,
                        record.fullName,
                        record.userName
                      )
                    "
                    class="cursor-pointer h-[3.2rem] option"
                  >
                    Contract
                  </div>
                  <div
                    @click="handleDelete(record.id)"
                    class="cursor-pointer option"
                  >
                    Delete
                  </div>
                </template>

                <div class="options">
                  <EllipsisOutlined
                    style="font-size: 2.5rem"
                    class="cursor-pointer"
                  />
                </div>
              </Popover>
            </div>
          </template>
        </template>
      </Table>

      <Modal
        v-model:open="isAccount"
        @ok="handleOkContract"
        :bodyStyle="{ padding: 0 }"
        :width="'800px'"
        :footer="false"
      >
        <DetailUser
          :is-loading="isLoadingDetail"
          :is-type="isType"
          :count="count"
          :id-user="idUser"
          :id-create="idCreate"
          @refresh-list="handleRefresh()"
        ></DetailUser>
      </Modal>

      <Modal
        v-model:open="isContract"
        wrapClassName="newStyle"
        @ok="handleOkContract"
        :bodyStyle="{ padding: 0, 'border-radius': '20px' }"
        :width="'1000px'"
        :footer="false"
        title="Contract"
        custom-class="centered-modal"
      >
        <div class="contract">
          <Form :model="reqParams" name="normal_login" class="login-form">
            <div class="flex justify-between">
              <div class="w-[48%]">
                <div>
                  <label class="mb-2"> Contract Name </label>
                  <FormItem>
                    <Input
                      v-model:value="reqContract.contractName"
                      :disabled="true"
                    />
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2"> Contract Type </label>
                  <FormItem>
                    <Select
                      v-model:value="reqContract.contractType"
                      style="width: 100%"
                      :options="optionsContractType"
                    >
                    </Select>
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2"> Staff Type </label>
                  <FormItem>
                    <Select
                      v-model:value="reqContract.staffType"
                      style="width: 100%"
                      :options="optionsStaffType"
                    >
                    </Select>
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2">Note</label>
                  <FormItem>
                    <Textarea
                      v-model:value="reqContract.note"
                      :rows="5"
                    ></Textarea>
                  </FormItem>
                </div>
              </div>

              <div class="w-[48%]">
                <div>
                  <label class="mb-2"> Contract Number </label>
                  <FormItem>
                    <Input
                      v-model:value="reqContract.contractNumber"
                      :disabled="true"
                    />
                  </FormItem>
                </div>

                <div>
                  <label class="mb-2"> Salary (VND)</label>
                  <FormItem>
                    <!-- <Input v-model:value="a" @input="handleP" /> -->
                    <InputNumber
                      class="w-full"
                      v-model:value="reqContract.salaryBasic"
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
                  <FormItem>
                    <Select
                      v-model:value="reqContract.paymentMethod"
                      style="width: 100%"
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
                  <FormItem>
                    <DatePicker value-format="YYYY-MM-DD">
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
                  <label class="mb-2"> Contract period </label>
                  <FormItem class="w-full">
                    <Select
                      v-model:value="reqContract.paymentMethod"
                      style="width: 100%"
                    >
                      <SelectOption value="Bank">6 Months</SelectOption>
                      <SelectOption value="Receive">1 Year</SelectOption>
                    </Select>
                  </FormItem>
                </div>
              </div>
            </div>

            <div class="w-full" v-if="reqContract.paymentMethod === 'Bank'">
              <table class="cTable">
                <tr class="cTable__head">
                  <th>Address Banking</th>
                  <th>Account Name</th>
                  <th>Account Number</th>
                </tr>
                <tr class="cTable__body">
                  <td>
                    <Select
                      class="w-full"
                      v-model:value="infoBank.addressBanking"
                      :options="optionsBank"
                    ></Select>
                  </td>
                  <td>
                    <Input v-model:value="infoBank.accountName"></Input>
                  </td>
                  <td>
                    <Input v-model:value="infoBank.accountNumber"></Input>
                  </td>
                </tr>
              </table>
            </div>
          </Form>
        </div>

        <div class="flex justify-center items-center">
          <Button
            @click="createContract()"
            v-if="isTypeContract"
            class="user__btn my-[1rem]"
          >
            Create
          </Button>
          <Button @click="updateContract()" v-else class="user__btn my-[1rem]"
            >Update</Button
          >
        </div>
      </Modal>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
