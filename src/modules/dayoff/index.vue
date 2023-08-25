<script lang="ts" setup>
// ==== Import ==== //
import { computed, createVNode, onMounted, reactive, ref, watch } from "vue";
import {
  Button,
  Table,
  Tag,
  message,
  Tabs,
  TabPane,
  Modal,
  Select,
  SelectOption,
  Segmented,
} from "ant-design-vue";
import type { IDataSource } from "@/components";
import { dayoffService } from "@/services";
import moment from "moment";
import { debounce, filter, sortBy } from "lodash";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

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
      title: "Name",
      width: "250px",
    },
    {
      title: "User ID",
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
      title: "Off date",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Off type",
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
      title: "Name",
      width: "250px",
    },
    {
      title: "User ID",
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
      title: "Off date",
      key: "time",
      dataIndex: "time",
    },
    {
      title: "Off type",
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
    const dateToday = new Date();

    // dataSource.data = filterDate1;

    dataSource.data = filter(
      res.data.data,
      (item) => item.status === "TO_APPROVE"
    );

    dataSource2.data = filter(
      res.data.data,
      (item) => item.status !== "TO_APPROVE"
    );

    const a = filter(res.data.data, (item) => item.status !== "TO_APPROVE");

    const b = sortByDateBefore(a);
    console.log(b);

    dataSource.data = sortBy(dataSource.data, (item) => new Date(item.time));

    dataSource2.data = b;
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

  if (type === "SICK_LEAVE") {
    return "Sick leave";
  }

  if (type === "PAID_LEAVE") {
    return "Paid leave";
  }

  if (type === "WEDDING_LEAVE") {
    return "Wedding leave";
  }

  if (type === "PATERNITY_LEAVE") {
    return "Paternity leave";
  }

  if (type === "COMPASSIONATE_LEAVE") {
    return "Compassionate leave";
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

  Modal.confirm({
    title: "Do you want to reject this holiday?",
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      const res = await dayoffService.putDayoff(req);

      if (res.status === "SUCCESS") {
        message.success("Update status absents successfull!");
        getDayoff();
      }
    },
    onCancel() {},
  });
}

async function updateStatusDayoff2(status: string, id: number) {
  const req = {
    id: id,
    approveStatus: status,
    accountId: null,
  };

  Modal.confirm({
    title: "Do you want to reject this holiday?",
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      const res = await dayoffService.putDayoff(req);

      if (res.status === "SUCCESS") {
        message.success("Update status absents successfull!");
        getDayoff();
      }
    },
    onCancel() {},
  });
}

const activeKey = ref("1");
const type = ref("");
const status = ref("");
const data = reactive(["ACCEPT", "REJECT"]);
const valuea = ref<any>("ACCEPT");

function handleChangeStatus(idDayoff: number) {}

function checkDueDate(date) {
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() - 1);

  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const currentDate = new Date(tomorrowDate);
  const dateToCompare = new Date(date);

  if (currentDate >= dateToCompare) {
    return false;
  }

  return true;
}

function sortByDateBefore(dateArray) {
  const targetTimestamp = new Date().getTime();

  const sortedDates = sortBy(dateArray, (date) => {
    const dateTimestamp = new Date(date).getTime();
    return dateTimestamp < targetTimestamp ? 0 : 1;
  });

  return sortedDates;
}
</script>

<template>
  <div class="project">
    <Tabs v-model:activeKey="activeKey">
      <TabPane key="1" tab="Absence request">
        <Table
          :columns="dataSource.columns"
          :data-source="dataSource.data"
          :pagination="false"
          :loading="dataSource.loading"
          :scroll="{ y: 700 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'status'">
              <Button
                class="text-[1.3rem] mr-5"
                @click="updateStatusDayoff(0, record.id)"
              >
                Accept
              </Button>
              <Button
                class="text-[1.3rem]"
                @click="updateStatusDayoff(1, record.id)"
              >
                Reject
              </Button>
            </template>

            <template v-if="column.dataIndex === 'name'">
              <div class="flex items-center">
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
              </div>
            </template>

            <template v-if="column.dataIndex === 'type'">
              <span> {{ convertType(record.dayOffType) }} </span>
            </template>

            <template v-if="column.dataIndex === 'id'">
              <span> {{ record.userName }} </span>
            </template>

            <template v-if="column.dataIndex === 'reason'">
              <span> {{ record.reason }} </span>
            </template>

            <template v-if="column.dataIndex === 'time'">
              <span> {{ convertTime(record.time) }} </span>
            </template>
          </template>
        </Table>
      </TabPane>
      <TabPane key="2" tab="Approval History">
        <Table
          :columns="dataSource2.columns"
          :data-source="dataSource2.data"
          :pagination="false"
          :scroll="{ y: 530 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'status'">
              <template v-if="checkDueDate(record.time)">
                <Select
                  v-model:value="record.status"
                  @change="updateStatusDayoff2(record.status, record.id)"
                >
                  <SelectOption value="ACCEPT">ACCEPT</SelectOption>
                  <SelectOption value="REJECT">REJECT</SelectOption>
                </Select>
              </template>

              <template v-else>
                <Tag color="#F0EEFB" v-if="record.status === 'ACCEPT'">
                  <span class="text-[#968cd8] font-[600] text-[1.2rem]">
                    {{ record.status }}
                  </span>
                </Tag>
                <Tag color="#e6f4f2" v-else>
                  <span class="text-[#54b3a5] font-[600] text-[1.2rem]">
                    {{ record.status }}
                  </span>
                </Tag>
              </template>
            </template>

            <template v-if="column.dataIndex === 'name'">
              <div class="flex items-center">
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
              </div>
            </template>

            <template v-if="column.dataIndex === 'type'">
              <span> {{ convertType(record.dayOffType) }} </span>
            </template>

            <template v-if="column.dataIndex === 'id'">
              <span> {{ record.userName }} </span>
            </template>

            <template v-if="column.dataIndex === 'reason'">
              <span> {{ record.reason }} </span>
            </template>

            <template v-if="column.dataIndex === 'time'">
              <span> {{ convertTime(record.time) }} </span>
            </template>
          </template>
        </Table>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
