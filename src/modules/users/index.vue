<script lang="ts" setup>
// ==== Import ==== //
import { reactive, ref, computed, watch, onMounted, createVNode } from "vue";
import { Button, Input, Drawer, Modal, message, Table } from "ant-design-vue";
import {
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";

import type { IDataSource } from "@/components";
import { userService } from "@/services";
import DetailUser from "./detailUser/index.vue";
import moment from "moment";
import { debounce, isEmpty } from "lodash";

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
      slots: { title: "customNo", customRender: "no" },
    },
    {
      title: "ID",
      dataIndex: "id",
      slots: { title: "customId", customRender: "id" },
      width: 200,
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      slots: { title: "customFullname", customRender: "fullname" },
    },
    {
      title: "Role",
      dataIndex: "role",
      slots: { title: "customRole", customRender: "role" },
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      slots: { title: "customPhone", customRender: "phone" },
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      slots: { title: "customEmail", customRender: "email" },
      width: 200,
    },
    {
      title: "Signday",
      dataIndex: "signday",
      slots: { title: "customSignday", customRender: "signday" },
      width: 150,
    },
    {
      dataIndex: "action",
      slots: { title: "customAction", customRender: "action" },
      width: "5%",
    },
  ],
});
const isDrawer = ref<boolean>(false);
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
// ==== Method ==== //
onMounted(() => {
  console.log("redirict list user...");
  getListUser();
});

const createAccount = () => {
  isDrawer.value = true;
  title.value = "Create Account";
  isType.value = "create";
  count.value++;
  console.log(typeof generateUniqueId())
  // idCreate.value = generateUniqueId().toN;
};

const showDetail = () => {
  isDrawer.value = true;
  isType.value = "detail";
  idUser.value = 14;
};

async function getListUser() {
  dataSource.loading = true;

  const res = await userService.getLisrUser(reqParams).finally(() => {
    dataSource.loading = false;
  });

  if (res) {
    dataSource.data = res.data.data;
  }
}

function generateUniqueId() {
  const uniqueId = `${Math.floor(Math.random() * 1000)}`;

  const existingId = dataSource.data.find((item) => item.id === uniqueId);
  if (existingId) {
    generateUniqueId();
  } else {
    return uniqueId;
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
  isDrawer.value = true;
  idUser.value = id;
  isType.value = "detail";
  title.value = "Detail Account";
  count.value++;
};

const convertTime = (date: Date) => {
  return moment(date).format("DD-MM-YYYY");
};

watch(
  textSearch,
  debounce(() => {
    reqParams.keyword = textSearch.value;
    getListUser();
  }, 300)
);

async function getDetailUser() {
  const res = userService.getDetailUser(1);

  console.log(res);
}

function handleClear() {
  textSearch.value = "";
}

function handleRefresh() {
  isDrawer.value = false;
  getListUser();
}
</script>

<template>
  <div class="page h-full">
    <div class="user__filter">
      <div class="user__search">
        <Input
          v-model:value="textSearch"
          style="width: 300px"
          placeholder="Search by name, ID..."
        />
        <div class="user__icon">
          <SearchOutlined v-if="isEmpty(textSearch)" />
          <CloseOutlined v-else @click="handleClear()" />
        </div>
      </div>

      <Button class="user__btn" size="small" @click="createAccount()">
        <PlusOutlined />
        Create Account
      </Button>
    </div>

    <div class="content relative">
      <Table
        :dataSource="dataSource.data"
        :columns="dataSource.columns"
        :pagination="false"
        :loading="dataSource.loading"
        :scroll="{ y: 500 }"
      >
        <template #no="{ record }">{{ record.id }}</template>
        <template #id="{ record }">{{ record.userName }}</template>
        <template #fullname="{ record }">
          <div @click="handleSelectDetail(record.id)" class="cursor-pointer">
            {{ record.fullName }}
          </div>
        </template>
        <template #role="{ record }">
          <div v-if="record.role"></div>
          {{ record.role }}
        </template>
        <template #phone="{ record }">{{ record.phone }}</template>
        <template #email="{ record }">{{ record.email }}</template>
        <template #signday="{ record }">{{
          convertTime(record.signDay)
        }}</template>
        <template #action="{ record }">
          <div class="content__icon">
            <DeleteOutlined
              @click="handleDelete(record.id)"
              style="color: white"
            />
          </div>
        </template>
      </Table>

      <!-- Detail & Create User -->
      <Drawer
        v-model:visible="isDrawer"
        class="custom-class"
        :title="title"
        placement="right"
        :width="'calc(100% - 213px)'"
      >
        <!--  -->
        <DetailUser
          :is-loading="isLoadingDetail"
          :is-type="isType"
          :count="count"
          :id-user="idUser"
          :id-create="idCreate"
          @refresh-list="handleRefresh()"
        ></DetailUser>
        <!--  -->
      </Drawer>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
