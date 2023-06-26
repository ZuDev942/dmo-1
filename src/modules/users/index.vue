<script lang="ts" setup>
// ==== Import ==== //
import { reactive, ref, computed, watch, onMounted, createVNode } from "vue";
import {
  Button,
  InputSearch,
  Drawer,
  Modal,
  message,
  Table,
} from "ant-design-vue";
import {
  DeleteOutlined,
  CaretDownOutlined,
  FilterOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";

import type { IDataSource } from "@/components";
import { DataTable } from "@/components";
import { userService } from "@/services";
import DetailUser from "./detailUser/index.vue";

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
const value = ref<string>();
const isLoadingDetail = ref<boolean>(false);
const isType = ref<boolean>(false);

// ==== Method ==== //
onMounted(() => {
  console.log("redirict list user...");
  getList();
});

const showDrawer = () => {
  isDrawer.value = true;
  isType.value = false;
};

async function getList() {
  dataSource.loading = true;

  const res = await userService.getLisrUser().finally(() => {
    dataSource.loading = false;
  });

  if (res) {
    dataSource.data = res;
  }
}

const handleDelete = (id: any) => {
  Modal.confirm({
    title: "Do you want to delete account?",
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      const res = await userService.deleteUser();

      if (res) {
        message.success("Delete successful!");
      }
    },
    onCancel() {},
  });
};

const afterVisibleChange = (bool: boolean) => {
  console.log("close drawer", bool);
};

const handleSelectDetail = async (id: number) => {
  isDrawer.value = true;
  isType.value = true;
};
</script>

<template>
  <div class="page h-full">
    <div class="user__filter">
      <div>
        <InputSearch
          v-model:value="value"
          style="width: 300px"
          placeholder="Search by name, ID..."
        />
      </div>

      <Button class="user__btn" size="small" @click="showDrawer">
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
        <template #no="{ record }">{{ record.no }}</template>
        <template #id="{ record }">{{ record.id }}</template>
        <template #fullname="{ record }">
          <div @click="handleSelectDetail(record.no)" class="cursor-pointer">
            {{ record.name }}
          </div>
        </template>
        <template #role="{ record }">{{ record.role }}</template>
        <template #phone="{ record }">{{ record.phone }}</template>
        <template #email="{ record }">{{ record.email }}</template>
        <template #signday="{ record }">{{ record.signday }}</template>
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
        title="Create Account"
        placement="right"
        :width="'calc(100% - 213px)'"
        @after-visible-change="afterVisibleChange"
      >
        <!--  -->
        <DetailUser
          :is-loading="isLoadingDetail"
          :is-type="isType"
        ></DetailUser>
        <!--  -->
      </Drawer>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
