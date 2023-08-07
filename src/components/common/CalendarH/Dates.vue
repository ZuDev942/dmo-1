<template>
  <div class="w-full">
    <div class="grid grid-cols-7 place-items-center">
      <div v-for="day in days" :key="day" class="date__week">
        <span class="text-gray-500 font-semibold">{{ day.substr(0, 3) }}</span>
      </div>

      <template v-for="(d, index) in dates" :key="d">
        <template v-if="index == 0">
          <div v-for="i in d.day" :key="i" class="date"></div>
        </template>

        <div class="date" :class="{ 'date-active': d.date === dateToday }">
          <div class="date__head flex justify-between">
            <div></div>
            <div class="text-[1.6rem]">{{ d.date }}</div>
          </div>

          <div class="date__task">
            <div class="date__des" v-for="item in d.taskList">
              {{ item.taskContent }}
            </div>
          </div>

          <div class="date__bot flex justify-between items-center">
            <div class="date__time" v-if="d.taskList">
              <img src="@/assets/images/clock.png" alt="" />
              <span>8h</span>
            </div>
            <Button
              class="date__btn"
              :class="{ 'date__btn--report': d.haveReported }"
              @click="selected(d.date)"
            >
              Report
            </Button>
          </div>
        </div>
      </template>
    </div>

    <Modal
      v-model:open="isReport"
      width="90%"
      :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
      :footer="null"
      @ok="handleOkReport"
      title="DAILY REPORT"
    >
      <div class="modal__wrap pt-[2rem]">
        <div class="todo">
          <div class="todo__search">
            <h3>TO DO TASK</h3>
            <Input v-model:value="searchTodo" placeholder="Search task..." />
          </div>

          <Table
            :columns="dataSource.columns"
            :data-source="dataSource.data"
            :pagination="false"
            bordered
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'action'">
                <div class="flex justify-center">
                  <img class="common__img" src="@/assets/images/down.png" />
                </div>
              </template>
            </template>
          </Table>
        </div>

        <br />
        <!--  -->
        <div class="daily-task">
          <div class="todo__search">
            <h3>DAILY REPORT</h3>
            <Input v-model:value="searchTodo" placeholder="Search task..." />
          </div>
          <Table
            :columns="dataSource2.columns"
            :data-source="dataSource2.data"
            :pagination="false"
            bordered
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.dataIndex === 'action'">
                <div class="flex justify-center">
                  <img class="common__img" src="@/assets/images/up-arrow.png" />
                </div>
              </template>

              <template v-if="column.dataIndex === 'effort'">
                <Input v-model:value="record.effort"></Input>
              </template>
              <template v-if="column.dataIndex === 'progress'">
                <Input v-model:value="record.effort"></Input>
              </template>
              <template v-if="column.dataIndex === 'status'">
                <Select v-model:value="record.status">
                  <SelectOption value="NOT_STARTED">Not Started</SelectOption>
                  <SelectOption value="PENDING">Pending</SelectOption>
                  <SelectOption value="PROCESSING">Processing</SelectOption>
                  <SelectOption value="COMPLETED">Completed</SelectOption>
                  <SelectOption value="CANCELED">Canceled</SelectOption>
                </Select>
              </template>
              <template v-if="column.dataIndex === 'delivery'">
                <Select v-model:value="record.delivery">
                  <SelectOption value="Undelivered">Undelivered</SelectOption>
                  <SelectOption value="Delivered">Delivered</SelectOption>
                </Select>
              </template>
              <template v-if="column.dataIndex === 'note'">
                <Input v-model:value="record.note"></Input>
              </template>
            </template>
          </Table>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { watch, onMounted, ref, reactive } from "vue";
import {
  Button,
  Modal,
  Select,
  SelectOption,
  Tag,
  Input,
  InputNumber,
  Table,
} from "ant-design-vue";
import { timesheetService } from "@/services";
import { map } from "lodash";
import type { IDataSource } from "@/components";
import { DataTable } from "@/components";
import moment from "moment";

type SelectedValues = {
  year: number;
  month: number;
};

type Date = {
  day: number;
  date: number;
  taskList: any;
  haveReported: boolean;
};

const date = ref<number | null>(null);

const dateProps = defineProps<{
  selectedValues: SelectedValues;
  selectedDate: number;
}>();

const dateEmit = defineEmits<{ (e: "selected", v: number): void }>();

const dates = ref<Date[]>([]);
const currentDate = new Date();
const dateNumber = currentDate.getDate();
const isReport = ref(false);
const searchTodo = ref("");
const dateToday = ref<any>(0);

onMounted(() => {
  console.log(dateNumber);
  generateDatesForThatMonth();

  const today = new Date();
  const day = today.getDate();
  dateToday.value = day;
  console.log(day);
});

watch(
  () => dateProps.selectedValues,
  (v) => {
    date.value = null;
    generateDatesForThatMonth(v.month, v.year);
  },
  {
    deep: true,
  }
);

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function generateDatesForThatMonth(
  m = dayjs().month(),
  y = dayjs().year()
) {
  dates.value = [];
  let d = dayjs().month(m).year(y);

  const daysInMonth = d.daysInMonth();

  //
  const req = {
    month: m + 1,
    year: y,
  };

  const res = await timesheetService.getDashboardPersonal(req);

  const aa = map(res.data, (item, index: number) => {
    return {
      date: parseInt(item.dayOfMonth),
      day: d.date(index).day(),
      taskList: item.taskList,
      haveReported: item.haveReported,
    };
  });

  dates.value = aa;
}

function selected(d) {
  date.value = d;
  // dateEmit("selected", d);
  isReport.value = true;
}

// Modal
const dataSource2 = reactive<IDataSource>({
  loading: false,
  noDataText: "No data",
  pagination: {
    totalPage: 0,
    page: 1,
  },
  data: [
    {
      action: "1",
      project: "GHTK PAY",
      task: "Chuc nang thanh toan online",
      effort: "",
      progress: 88,
      status: "Pending",
      delivery: "Delivered",
      note: "2023/01/31: fix bug",
    },
    {
      action: "1",
      project: "GHTK PAY",
      task: "Chuc nang thanh toan online",
      effort: "",
      progress: 66,
      status: "Pending",
      delivery: "Delivered",
      note: "2023/01/31: fix bug",
    },
    {
      action: "1",
      project: "GHTK PAY",
      task: "Chuc nang thanh toan online",
      effort: "",
      progress: 55,
      status: "Pending",
      delivery: "Delivered",
      note: "2023/01/31: fix bug",
    },
  ],
  columns: [
    {
      title: "Action",
      dataIndex: "action",
      scopedSlots: "action",
      width: "5%",
    },
    {
      title: "Project",
      dataIndex: "project",
      scopedSlots: "project",
    },
    {
      title: "Task",
      dataIndex: "task",
      scopedSlots: "task",
    },
    {
      title: "Effort",
      dataIndex: "effort",
      scopedSlots: "effort",
      width: "6%",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      scopedSlots: "progress",
      width: "5%",
    },
    {
      title: "Status",
      dataIndex: "status",
      scopedSlots: "status",
    },
    {
      title: "Delivery Status",
      dataIndex: "delivery",
      scopedSlots: "delivery",
    },
    {
      title: "Note",
      dataIndex: "note",
      scopedSlots: "note",
    },
  ],
});
const dataSource = reactive<IDataSource>({
  loading: false,
  noDataText: "No data",
  pagination: {
    totalPage: 0,
    page: 1,
  },
  data: [
    {
      action: "1",
      project: "GHTK PAY",
      task: "Chuc nang thanh toan online",
      priority: "Medium",
      planend: "30/07/2023",
      effort: "",
      progress: "88%",
      status: "Pending",
      note: "2023/01/31: fix bug",
    },
    {
      action: "1",
      project: "GHTK PAY",
      task: "Chuc nang thanh toan online",
      priority: "Medium",
      planend: "30/07/2023",
      effort: "",
      progress: "88%",
      status: "Pending",
      note: "2023/01/31: fix bug",
    },
    {
      action: "1",
      project: "GHTK PAY",
      task: "Chuc nang thanh toan online",
      priority: "Medium",
      planend: "30/07/2023",
      effort: "",
      progress: "88%",
      status: "Pending",
      note: "2023/01/31: fix bug",
    },
  ],
  columns: [
    {
      title: "Action",
      dataIndex: "action",
      scopedSlots: "action",
      width: "5%",
    },
    {
      title: "Project",
      dataIndex: "project",
      scopedSlots: "project",
    },
    {
      title: "Task",
      dataIndex: "task",
      scopedSlots: "task",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      scopedSlots: "priority",
    },
    {
      title: "Plan End",
      dataIndex: "planend",
      scopedSlots: "planend",
    },
    {
      title: "Effort",
      dataIndex: "effort",
      scopedSlots: "effort",
      width: "6%",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      scopedSlots: "progress",
    },
    {
      title: "Status",
      dataIndex: "status",
      scopedSlots: "status",
    },
    {
      title: "Note",
      dataIndex: "note",
      scopedSlots: "note",
    },
  ],
});

function handleOkReport() {}
function handleLoadPage() {}
</script>

<style lang="scss" scoped>
.date {
  border: 0.5px solid rgb(230, 228, 228);
  width: 100%;
  height: 17rem;
  padding: 8px;
  cursor: pointer;
  position: relative;

  &:hover {
    background: #e2e2e2c2;
  }

  &-active {
    background: #e2e2e2c2;
  }

  &__des {
    background: #2bc48a;
    color: white;
    border-radius: 2px;
    font-size: 1.2rem;
    height: 2rem;
    margin-bottom: 5px;
    padding-left: 4px;
    overflow: hidden;
  }

  &__time {
    display: flex;
    align-items: center;

    img {
      width: 1.8rem;
      height: 1.8rem;
      margin-right: 5px;
      margin-bottom: 2px;
    }
  }

  &__btn {
    background: #2bc48a;
    color: white;
    border: none;
    font-size: 1.3rem;
    padding: 0 10px;
    height: 2.7rem;
    margin-left: 5rem;

    &:hover {
      color: white;
    }

    &--report {
      background: #f69110;
      color: white;
      border: none;
      font-size: 1.3rem;
      padding: 0 10px;
      height: 2.7rem;
    }
  }

  &__week {
    width: 100%;
    padding: 5px 0;
    border: 0.5px solid rgb(230, 228, 228);
    text-align: center;
  }

  &__bot {
    position: absolute;
    bottom: 8px;
    width: 100%;
    justify-content: flex-end;
    padding-right: 15px;
  }
}

.ant-btn-primary {
  background-color: #1c9e6d;

  &:hover {
    background: #30b099;
  }
}

.todo {
  &__search {
    color: #172b4d;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    h3 {
      width: 11rem;
      margin-right: 2rem;
      font-size: 1.4rem;
    }

    input {
      width: 50rem;
    }
  }
}

.common__img {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

.ant-table-wrapper {
  background: white;
}
.ant-table-wrapper :deep(.ant-table-thead > tr > th) {
  font-size: 1.4rem;
  font-weight: 500;
  color: #44546f;
  background: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dfe1e6;
}

.ant-table-wrapper :deep(.ant-table-tbody > tr > td) {
  color: #44546f;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.ant-table-wrapper :deep(.ant-table-tbody > tr > td) {
  &:nth-child(1) {
    color: #172b4d;
    font-weight: 400;
    font-size: 1.5rem;

    &:hover {
      text-decoration: underline;
      color: #0065ff;
    }
  }
}

.ant-table-wrapper :deep(.ant-table-tbody) {
  .ant-table-row:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
  .ant-table-cell:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
}
</style>
