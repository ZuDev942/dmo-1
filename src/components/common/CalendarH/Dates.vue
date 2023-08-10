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
  Checkbox,
  Table,
  Empty,
  message,
} from "ant-design-vue";
import { timesheetService, yourworkService } from "@/services";
import { findIndex, forEach, isEmpty, map, size } from "lodash";
import type { IDataSource } from "@/components";
import moment from "moment";
import {
  DownCircleOutlined,
  EditOutlined,
  UpCircleOutlined,
} from "@ant-design/icons-vue";

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
const yourTasks = ref<any>([]);

onMounted(() => {
  console.log(dateNumber);
  generateDatesForThatMonth();

  const today = new Date();
  const day = today.getDate();
  dateToday.value = day;
  console.log(day);
  getYourTask();
});

// Date
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

function selected(dateSelected: any) {
  date.value = dateSelected.date;
  isReport.value = true;

  // handle data
  console.log(dateSelected);
  const taskList = dateSelected?.taskList;

  if (!isEmpty(taskList)) {
    const commonItems = dataSource.data.filter((item1) =>
      taskList.some((item2) => item2.taskId === item1.id)
    );

    console.log(isEmpty(taskList));

    forEach(taskList, (task) => {
      const indexTask = findIndex(
        dataSource.data,
        (item) => item.id === task.taskId
      );

      console.log("index", indexTask, dataSource.data[indexTask]);

      dataSource.data[indexTask].isSelected = true;
    });

    dataSource2.data = commonItems;
  }
}

// Modal
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
      title: "Action",
      dataIndex: "action",
      scopedSlots: "action",
      width: 35,
      fixed: "left",
    },
    {
      title: "Project",
      dataIndex: "project",
      scopedSlots: "project",
      width: 170,
    },
    {
      title: "Task",
      dataIndex: "task",
      scopedSlots: "task",
      width: 300,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      scopedSlots: "priority",
      width: 60,
    },
    {
      title: "Plan End",
      dataIndex: "planend",
      scopedSlots: "planend",
      width: 100,
    },
    {
      title: "Effort",
      dataIndex: "effort",
      scopedSlots: "effort",
      width: 60,
    },
    {
      title: "Status",
      dataIndex: "status",
      scopedSlots: "status",
      width: 100,
    },
    {
      title: "Note",
      dataIndex: "note",
      scopedSlots: "note",
      width: 100,
      fixed: "right",
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
  data: [],
  columns: [
    {
      title: "Action",
      dataIndex: "action",
      scopedSlots: "action",
      width: 35,
      fixed: "left",
    },
    {
      title: "Project",
      dataIndex: "project",
      scopedSlots: "project",
      width: 170,
    },
    {
      title: "Task",
      dataIndex: "task",
      scopedSlots: "task",
      width: 300,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      scopedSlots: "priority",
      width: 60,
    },
    {
      title: "Plan End",
      dataIndex: "planend",
      scopedSlots: "planend",
      width: 100,
    },
    {
      title: "Effort",
      dataIndex: "effort",
      scopedSlots: "effort",
      width: 60,
    },
    {
      title: "Status",
      dataIndex: "status",
      scopedSlots: "status",
      width: 100,
    },
    {
      title: "Note",
      dataIndex: "note",
      scopedSlots: "note",
      width: 100,
    },
  ],
});

function handleOkReport() {}
function handleLoadPage() {}

async function getYourTask() {
  const req = {
    pageIndex: 1,
    pageSize: 100,
  };

  const res = await yourworkService.getListTask(req);

  yourTasks.value = res.data.data;

  dataSource.data = map(res.data.data, (item) => {
    return {
      ...item,
      isSelected: false,
    };
  });
  console.log(dataSource.data);
  // data.values = res.data.data
}

function handleDown(idTask: number, index: number) {
  dataSource.data[index].isSelected = true;
  const item = dataSource.data[index];
  dataSource2.data.push(item);
}

function handleUp(idTask: number, index: number) {
  const indexTask = findIndex(dataSource.data, (item) => item.id === idTask);
  dataSource.data[indexTask].isSelected = false;
  dataSource2.data.splice(index, 1);
}

async function handleReportDaily() {
  if (isEmpty(dataSource2.data)) {
    message.warning("Please select task and work notes for today");
    return;
  }

  const req = map(dataSource2.data, (item) => {
    return {
      projectName: "Human Resource",
      taskId: item.id,
      taskName: item.content,
      priority: "LOW",
      effort: 8,
      progress: 0,
      deadLine: item.dueDate,
      status: item.projectStatus,
      deliveryStatus: "NOT_YET",
      note: "abc",
    };
  });

  console.log(req);

  const res = await timesheetService.postReportDaily(req);

  if (res.status === "SUCCESS") {
    isReport.value = false;
  }
}
</script>

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

        <div
          class="date"
          :class="{
            'date-active': d.date === dateToday,
            warning: !d.haveReported && d.date < dateToday,
          }"
        >
          <div class="date__head flex justify-between">
            <div v-if="d.haveReported" class="text-[#374151] font-[500]">
              <EditOutlined />
              Daily report
            </div>
            <div v-else></div>
            <div class="text-[1.6rem] date__text">{{ d.date }}</div>
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
              v-if="d.date <= dateToday"
              class="date__btn"
              :class="{ 'date__btn--report': d.haveReported }"
              @click="selected(d)"
            >
              Report
            </Button>
          </div>
        </div>
      </template>
    </div>

    <Modal
      v-model:open="isReport"
      width="80%"
      :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
      :footer="null"
      @ok="handleOkReport"
      title="DAILY REPORT"
    >
      <div class="modal__wrap pt-[2rem]">
        <div class="todo">
          <h3 class="todo__title">TO DO TASK</h3>
          <div class="todo__search">
            <Input v-model:value="searchTodo" placeholder="Search task..." />
          </div>

          <Table
            class="table__top"
            :columns="dataSource.columns"
            :data-source="dataSource.data"
            :pagination="false"
            :scroll="{ y: 125, x: 2000 }"
            bordered
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'action'">
                <Button
                  class="column__item flex items-center w-full justify-center"
                  @click="handleDown(record.id, index)"
                  :disabled="record.isSelected"
                  type="text"
                >
                  <DownCircleOutlined />
                </Button>
              </template>

              <template v-if="column.dataIndex === 'project'">
                <div
                  class="column__item"
                  :class="{ select: record.isSelected }"
                >
                  Human resource
                </div>
              </template>

              <template v-if="column.dataIndex === 'task'">
                <div
                  class="column__item"
                  :class="{ select: record.isSelected }"
                >
                  {{ record.content }}
                </div>
              </template>

              <template v-if="column.dataIndex === 'priority'">
                <div
                  class="column__item"
                  :class="{ select: record.isSelected }"
                >
                  Low
                </div>
              </template>

              <template v-if="column.dataIndex === 'planend'">
                <div
                  class="column__item"
                  :class="{ select: record.isSelected }"
                >
                  {{ record.dueDate }}
                </div>
              </template>

              <template v-if="column.dataIndex === 'effort'">
                <div
                  class="column__item"
                  :class="{ select: record.isSelected }"
                >
                  {{ record.effort }}
                </div>
              </template>

              <template v-if="column.dataIndex === 'status'">
                <div
                  class="column__item"
                  :class="{ select: record.isSelected }"
                >
                  {{ record.projectStatus }}
                </div>
              </template>

              <template v-if="column.dataIndex === 'note'">
                <div
                  class="column__item"
                  :class="{ select: record.isSelected }"
                ></div>
              </template>
            </template>
          </Table>
        </div>

        <br />
        <!--  -->
        <div class="todo">
          <h3 class="todo__title">DAILY REPORT</h3>
          <div class="todo__search">
            <Input v-model:value="searchTodo" placeholder="Search task..." />
          </div>
          <Table
            :columns="dataSource2.columns"
            :data-source="dataSource2.data"
            :pagination="false"
            bordered
            :scroll="{ y: 125, x: 2000 }"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'action'">
                <div
                  class="column__item flex justify-center w-full"
                  @click="handleUp(record.id, index)"
                >
                  <UpCircleOutlined />
                </div>
              </template>

              <template v-if="column.dataIndex === 'project'">
                <div class="column__item">Human resource</div>
              </template>

              <template v-if="column.dataIndex === 'task'">
                <div class="column__item">
                  {{ record.content }}
                </div>
              </template>

              <template v-if="column.dataIndex === 'priority'">
                <div class="column__item">Low</div>
              </template>

              <template v-if="column.dataIndex === 'planend'">
                <div class="column__item">
                  {{ record.dueDate }}
                </div>
              </template>

              <template v-if="column.dataIndex === 'effort'">
                <div class="column__item">
                  {{ record.effort }}
                </div>
              </template>

              <template v-if="column.dataIndex === 'status'">
                <div class="column__item">
                  {{ record.projectStatus }}
                </div>
              </template>

              <template v-if="column.dataIndex === 'note'">
                <div class="column__item"></div>
              </template>
            </template>
          </Table>
        </div>
      </div>
      <div class="flex justify-center w-full">
        <Button @click="handleReportDaily()" type="primary">Report</Button>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.todo {
  border: 1px solid #dfe1e6;
  padding: 1rem 2rem;
  border-radius: 1rem;
  position: relative;
  padding-top: 1.5rem;

  &__title {
    position: absolute;
    z-index: 9;
    top: -12px;
    background: white;
    padding: 0 1rem;
    color: #172b4d;
    font-size: 1.3rem;
  }
}
.column__item {
  width: 100%;
  height: 100%;
  padding: 0.5rem;

  &.select {
    background: #4c9aff1a;
    border: 1px solid #4c9aff1a;
  }

  button {
    border: none;
  }
}
.date {
  border: 0.5px solid rgb(230, 228, 228);
  width: 100%;
  height: 17rem;
  padding: 8px;
  cursor: pointer;
  position: relative;

  &__task{
    height: 7rem;
    overflow: auto;
  }

  &:hover {
    background: rgb(230, 228, 228);
  }

  &-active {
    background: rgb(230, 228, 228);
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

  &.warning {
    .date__text {
      color: red;
    }
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
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dfe1e6;
}

.ant-table-wrapper :deep(.ant-table-tbody > tr > td) {
  color: #44546f;
  padding: 0;
}

.ant-table-wrapper :deep(.ant-table-tbody > tr > td) {
  &:nth-child(1) {
    color: #172b4d;
    font-weight: 400;
    font-size: 1.5rem;

    // &:hover {
    //   text-decoration: underline;
    //   color: #0065ff;
    // }
  }
}

.ant-table-wrapper :deep(.ant-table-tbody) {
  .ant-table-row:hover {
    background-color: #f0f0f0;
    cursor: pointer;
  }
  // .ant-table-cell:hover {
  //   background-color: #f0f0f0;
  //   cursor: pointer;
  // }
}
</style>
