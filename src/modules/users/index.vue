<script lang="ts" setup>
import { reactive, ref, computed, watch, onMounted } from "vue";
import { Button, InputSearch, message } from "ant-design-vue";
import {
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons-vue";

import type { IDataSource } from "@/components";
import type { SelectProps } from "ant-design-vue";
import { map, findIndex } from "lodash";
import { DataTable } from "@/components";
import { shopService } from "@/services";
import { useCurrentPage } from "@/store";
import { subYears, format } from "date-fns";
import { crossSiteEvent } from "@/shared";
// ==== Import ==== //
import { userService } from "@/services";

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
// ==== Method ==== //

onMounted(() => {
  console.log("redirict list user...");
  getList();
});

async function getList() {
  dataSource.loading = true;

  const res = await userService.getLisrUser().finally(() => {
    dataSource.loading = false;
  });

  if (res) {
    dataSource.data = res;
  }
}

// interface IReqParams {
//   taskType?: number;
//   from?: string;
//   to?: string;
//   limit?: number;
//   isCallAgain?: any;
// }

// const PAGE_SIZE = 10;

// const reqParams = reactive<IReqParams>({
//   taskType: 0,
//   from: format(subYears(new Date(), 10), "yyyy-MM-dd"),
//   to: format(new Date(), "yyyy-MM-dd"),
//   limit: PAGE_SIZE,
//   isCallAgain: null,
// });

// const currentPage = computed(() => {
//   return useCurrentPage();
// });

// const listStatus = ref<SelectProps["options"]>([
//   {
//     value: null,
//     label: "Trạng thái",
//   },
//   {
//     value: 0,
//     label: "Chưa liên hệ",
//   },
//   {
//     value: 1,
//     label: "Liên hệ lại",
//   },
// ]);

// const isShowCallLog = ref<boolean>(false);
// const isStatusCallLog = ref<boolean>(false);
// const options = ref<any[]>();
// const taskId = ref<number>(0);
// const isCallAgain = ref<number | any>(null);

// const lastShop = ref<any[]>([
//   {
//     after: "",
//   },
// ]);
// const callLogIds = ref<any[]>([]);

function handleLoadPage(current: any) {
  dataSource.pagination.page = current.page;
  console.log("a");
  //   getShopTaskList();
}

async function handleDelete(id: any) {
  console.log("ID:", id);

  const res = await userService.deleteUser()

  console.log(res)
}

const value = ref<string>();
</script>

<template>
  <div class="page h-full">
    <div class="page__top">
      <div>
        <InputSearch
          v-model:value="value"
          placeholder="Search by ID, name..."
          style="width: 200px"
        />
      </div>

      <div>
        <Button class="btn" size="small">
          <FilterOutlined />
          Inactive
        </Button>
        <Button class="btn" size="small">
          <PlusOutlined />
          Create Account
        </Button>
      </div>
    </div>

    <div class="content">
      <DataTable :dataSource="dataSource" @table-change="handleLoadPage">
        <template #no="{ record }"> {{ record.no }} </template>
        <template #id="{ record }">{{ record.id }}</template>
        <template #fullname="{ record }">{{ record.name }}</template>
        <template #role="{ record }">{{ record.role }}</template>
        <template #phone="{ record }">{{ record.phone }}</template>
        <template #email="{ record }">{{ record.email }}</template>
        <template #signday="{ record }">{{ record.signday }}</template>
        <template #action="{ record }">
          <DeleteOutlined @click="handleDelete(record.id)" />
        </template>
      </DataTable>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
