<script lang="ts" setup>
// ==== Import ==== //
import { computed, onMounted, reactive, ref, watch } from "vue";
import { Button, Table, Input, Tag, message } from "ant-design-vue";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons-vue";
import type { IDataSource } from "../../components";
import { dayoffService } from "../../services";
import moment from "moment";
import { debounce, filter, isEmpty } from "lodash";

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
      dataIndex: "name",
      key: "name",
      slots: { title: "customTitle", customRender: "name" },
      width: "250px",
    },
    {
      title: "Username",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: "250px",
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
      width: "200px",
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
  data: [],
  columns: [
    {
      dataIndex: "name",
      key: "name",
      slots: { title: "customTitle", customRender: "name" },
      width: "250px",
    },
    {
      title: "Username",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
      width: "250px",
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
      width: "200px",
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
const textSearch = ref<string>("");

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

onMounted(() => {
  getDayoff();
});

async function getDayoff() {
  dataSource.loading = true;

  const res = await dayoffService.getDayoff(reqParams).finally(() => {
    dataSource.loading = false;
  });

  if (res.status === "SUCCESS") {
    dataSource.data = res.data.data;
    dataSource.data = filter(
      res.data.data,
      (item) => item.status === "TO_APPROVE"
    );
    dataSource2.data = filter(
      res.data.data,
      (item) => item.status !== "TO_APPROVE"
    );
  }
}

watch(
  textSearch,
  debounce(() => {
    reqParams.keyword = textSearch.value;
    getDayoff();
  }, 300)
);

function handleClear() {
  textSearch.value = "";
}

const convertTime = (date: Date) => {
  return moment(date).format("DD-MM-YYYY");
};

const convertType = (type: string) => {
  if (type === "MATERNITY_LEAVE") {
    return "Maternity leave";
  }

  if (type === "UNPAID_LEAVE") {
    return "Unpaid leave";
  }

  return "";
};

async function updateStatusDayoff(type: number, id: number) {
  const req = {
    id: id,
    approveStatus: "ACCEPT",
    accountId: null,
  };

  if (type === 0) {
    req.approveStatus = "ACCEPT";
  }
  if (type === 1) {
    req.approveStatus = "REJECT";
  }

  const res = await dayoffService.putDayoff(req);

  console.log(res);
  if (res.status === "SUCCESS") {
    message.success("Update status absents successfull!");
    getDayoff();
  }
}
</script>

<template>
  <div class="project h-full">
    <div class="project__head">
      <div class="project__filter">
        <div class="user__search">
          <Input
            v-model:value="textSearch"
            style="width: 300px"
            placeholder="Search by name..."
          />
          <div class="user__icon">
            <SearchOutlined v-if="isEmpty(textSearch)" />
            <CloseOutlined v-else @click="handleClear()" />
          </div>
        </div>
      </div>
    </div>

    <div class="project__wrap">
      <Table
        :columns="dataSource.columns"
        :data-source="dataSource.data"
        :pagination="false"
        :loading="dataSource.loading"
      >
        <template #customTitle> Fullname </template>
        <template #name="{ record }">
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
          {{ record.fullName }}
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <Button
              class="text-[1.3rem] mr-5"
              @click="updateStatusDayoff(0, record.id)"
            >
              Accept
            </Button>
            <Button
              class="text-[1.3rem]"
              @click="updateStatusDayoff(1, record.id)"
              >Reject</Button
            >
          </template>

          <template v-if="column.key === 'type'">
            <span> {{ convertType(record.dayOffType) }} </span>
          </template>

          <template v-if="column.key === 'id'">
            <span> {{ record.userName }} </span>
          </template>

          <template v-if="column.key === 'reason'">
            <span> {{ record.reason }} </span>
          </template>

          <template v-if="column.key === 'time'">
            <span> {{ convertTime(record.time) }} </span>
          </template>
        </template>
      </Table>

      <br />

      <Table
        :columns="dataSource2.columns"
        :data-source="dataSource2.data"
        :pagination="false"
        :show-header="false"
      >
        <template #customTitle> Name </template>
        <template #name="{ record }">
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
          {{ record.fullName }}
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
            <Tag color="cyan" v-if="record.status === 'ACCEPT'">
              {{ record.status }}
            </Tag>
            <Tag color="orange" v-else>{{ record.status }}</Tag>
          </template>

          <template v-if="column.key === 'type'">
            <span> {{ convertType(record.dayOffType) }} </span>
          </template>

          <template v-if="column.key === 'id'">
            <span> {{ record.userName }} </span>
          </template>

          <template v-if="column.key === 'reason'">
            <span> {{ record.reason }} </span>
          </template>

          <template v-if="column.key === 'time'">
            <span> {{ convertTime(record.time) }} </span>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
