<script lang="ts" setup>
// ==== Import ==== //
import { reactive, ref, computed, watch, onMounted, createVNode } from "vue";
import { Button, InputSearch, Drawer, Modal, message } from "ant-design-vue";
import {
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
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
      scopedSlots: "no",
      className: "align-top",
    },
    {
      title: "ID",
      //   width: "50%",
      scopedSlots: "id",
      className: "align-top",
    },
    {
      title: "Fullname",
      dataIndex: "action",
      scopedSlots: "fullname",
      className: "align-top",
    },
    {
      title: "Role",
      dataIndex: "action",
      scopedSlots: "role",
      className: "align-top",
    },
    {
      title: "Phone",
      dataIndex: "action",
      scopedSlots: "phone",
      className: "align-top",
    },
    {
      title: "Email",
      dataIndex: "action",
      scopedSlots: "email",
      className: "align-top",
    },
    {
      title: "Signday",
      dataIndex: "action",
      scopedSlots: "signday",
      className: "align-top",
    },
    {
      title: "",
      dataIndex: "action",
      scopedSlots: "action",
      className: "align-top",
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

function handleLoadPage(current: any) {
  dataSource.pagination.page = current.page;
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
    <div class="page__top">
      <div>
        <Button class="btn" size="small" @click="showDrawer">
          <PlusOutlined />
          Create Account
        </Button>
        <Button class="btn" size="small">
          <FilterOutlined />
          Inactive
        </Button>
      </div>

      <div>
        <InputSearch
          v-model:value="value"
          placeholder="Search by ID, name..."
          style="width: 200px"
        />
      </div>
    </div>

    <div class="content relative">
      <DataTable :dataSource="dataSource" @table-change="handleLoadPage">
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
      </DataTable>

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
