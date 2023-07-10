<script lang="ts" setup>
// ==== Import ==== //
import { computed, reactive, ref } from "vue";
import {
  Button,
  Table,
  Drawer,
  InputSearch,
  Popover,
  Select,
  Input,
  DatePicker,
  Textarea,
  SelectOption,
  Tag,
} from "ant-design-vue";
import {
  EllipsisOutlined,
  ArrowDownOutlined,
  CaretDownOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import type { IDataSource } from "@/components";
import { cloneDeep } from "lodash";

// ==== Data ==== //
const dataSource = reactive<IDataSource>({
  loading: false,
  noDataText: "No data",
  pagination: {
    totalPage: 0,
    page: 1,
  },
  data: [
    {
      name: "Nguyen Thanh A",
      id: "nat911",
      reason: "Xin nghi phep do om",
      time: "29/04/2023",
      type: "Maternity Leave",
      status: "Accept",
    },
    {
      name: "Nguyen Thanh B",
      id: "nat911",
      reason: "Xin nghi phep do om",
      time: "29/04/2023",
      type: "Maternity Leave",
      status: "Accept",
    },
    {
      name: "Nguyen Thanh C",
      id: "nat911",
      reason: "Xin nghi phep do om",
      time: "29/04/2023",
      type: "Maternity Leave",
      status: "Accept",
    },
  ],
  columns: [
    {
      dataIndex: "name",
      key: "name",
      slots: { title: "customTitle", customRender: "name" },
      width: "250px",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "200px",
    },
  ],
});
const dataSource2 = reactive<IDataSource>({
  loading: false,
  noDataText: "No data",
  pagination: {
    totalPage: 0,
    page: 1,
  },
  data: [
    {
      name: "Nguyen Van A",
      id: "nat911",
      reason: "Xin nghi phep do om",
      time: "29/04/2023",
      type: "Maternity Leave",
      status: "Accept",
    },
    {
      name: "Nguyen Van B",
      id: "nat911",
      reason: "Xin nghi phep do om",
      time: "29/04/2023",
      type: "Unpaid Leave",
      status: "Accept",
    },
    {
      name: "Nguyen Van C",
      id: "nat911",
      reason: "Xin nghi phep do om",
      time: "29/04/2023",
      type: "Maternity Leave",
      status: "Accept",
    },
    {
      name: "Nguyen Quoc A",
      id: "nat911",
      reason: "Xin nghi phep do om",
      time: "29/04/2023",
      type: "Unpaid Leave",
      status: "Accept",
    },
  ],
  columns: [
    {
      dataIndex: "name",
      key: "name",
      slots: { title: "customTitle", customRender: "name" },
      width: "250px",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "200px",
    },
  ],
});
const value = ref<string>("Accept");
const search = ref<string>("");
</script>

<template>
  <div class="project h-full">
    <div class="project__head">
      <div class="project__filter">
        <InputSearch
          v-model:value="search"
          style="width: 300px"
          placeholder="Search by name..."
        />
      </div>
    </div>

    <div class="project__wrap">
      <Table
        :columns="dataSource.columns"
        :data-source="dataSource.data"
        :pagination="false"
      >
        <template #customTitle> Name </template>
        <template #name="{ text }">
          <img
            src="https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project"
            alt=""
            style="
              width: 2.4rem;
              height: 2.4rem;
              border-radius: 2px;
              margin-right: 0.5rem;
            "
          />
          {{ text }}
        </template>
        <template #key="{}">
          <span> a </span>
        </template>
        <template #type="{ record }">
          <span> Company </span>
        </template>

        <template #lead="{ record }">
          <span>
            <img
              src="@/assets/images/avatar.jpeg"
              style="
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                margin-right: 4px;
              "
            />
            {{ record.lead }}
          </span>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Button class="text-[1.3rem] mr-5">Accept</Button>
            <Button class="text-[1.3rem]">Reject</Button>
          </template>
        </template>
      </Table>
      
      <br>

      <Table
        :columns="dataSource2.columns"
        :data-source="dataSource2.data"
        :pagination="false"
        :show-header="false"
      >
        <template #customTitle> Name </template>
        <template #name="{ text }">
          <img
            src="https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project"
            alt=""
            style="
              width: 2.4rem;
              height: 2.4rem;
              border-radius: 2px;
              margin-right: 0.5rem;
            "
          />
          {{ text }}
        </template>
        <template #key="{}">
          <span> a </span>
        </template>
        <template #type="{ record }">
          <span> Company </span>
        </template>

        <template #lead="{ record }">
          <span>
            <img
              src="@/assets/images/avatar.jpeg"
              style="
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                margin-right: 4px;
              "
            />
            {{ record.lead }}
          </span>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Tag color="cyan">{{ record.status }}</Tag>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
