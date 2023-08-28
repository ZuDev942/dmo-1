<script setup lang="ts">
import dayjs from "dayjs";
import { watch, onMounted, ref, reactive, h } from "vue";
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
  Progress,
  Popover,
  Tooltip,
  notification,
  Spin,
} from "ant-design-vue";
import { projectService, timesheetService, yourworkService } from "@/services";
import {
  debounce,
  filter,
  findIndex,
  forEach,
  isEmpty,
  map,
  orderBy,
  reduce,
  size,
  sortBy,
  union,
} from "lodash";
import type { IDataSource } from "@/components";
import moment from "moment";
import {
  CheckCircleOutlined,
  CheckOutlined,
  DownCircleOutlined,
  EditOutlined,
  UpCircleOutlined,
} from "@ant-design/icons-vue";
import useEventBus from "@/eventBus";

type SelectedValues = {
  year: number;
  month: number;
};

type Date = {
  day: number;
  date: number;
  taskList: any;
  haveReported: boolean;
  off: boolean;
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
const searchDaily = ref("");
const dateToday = ref<any>(0);
const yourTasks = ref<any>([]);
const timeZone = ref<string>("");
const dateParam = ref<string>("");
const dataList = ref<any>([]);
const isCreate = ref<boolean>(false);
const currentMonth = ref<number>(0);
const selectedMonth = ref<number>(0);
const isLoad = ref<boolean>(false);
const delayTime = 500;
const originData2 = ref<any>([]);
const isLoadingView = ref<boolean>(false);
const createTime = ref<string>("");
const monthCreate = ref<number>(0);
const dateCreate = ref<number>(0);

// ==== Method ==== //
onMounted(() => {
  generateDatesForThatMonth();

  const today = new Date();
  const day = today.getDate();
  dateToday.value = day;

  currentMonth.value = today.getMonth();
  selectedMonth.value = currentMonth.value;

  //
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    const userInfo = JSON.parse(savedUser);
    createTime.value = userInfo.createTime;
    const month = new Date(userInfo.createTime);
    monthCreate.value = month.getMonth();
    dateCreate.value = month.getDate();
  }

  getYourTask();
});

// Date
watch(
  () => dateProps.selectedValues,
  (v) => {
    date.value = null;
    selectedMonth.value = v.month;
    generateDatesForThatMonth(v.month, v.year);
  },
  {
    deep: true,
  }
);

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

async function generateDatesForThatMonth(
  m = dayjs().month(),
  y = dayjs().year()
) {
  isLoadingView.value = true;

  dates.value = [];
  let d = dayjs().month(m).year(y);

  const daysInMonth = d.daysInMonth();

  //
  const req = {
    month: m + 1,
    year: y,
  };

  timeZone.value = `${y}-${m + 1}`;

  const res = await timesheetService.getDashboardPersonal(req).finally(() => {
    isLoadingView.value = false;
  });

  const aa = map(res.data, (item, index: number) => {
    return {
      date: parseInt(item.dayOfMonth),
      day: d.date(index).day(),
      taskList: item.taskList,
      haveReported: item.haveReported,
      off: item.off,
    };
  });

  dates.value = aa;
}

async function selectedDate(dateSelected: any) {
  date.value = dateSelected.date;
  isReport.value = true;
  isCreate.value = dateSelected.haveReported;

  // handle date select
  const dateString = `${timeZone.value}-${date.value}`;
  const vietnamTimeZoneOffset = 7;
  const dateConvert = new Date(dateString);
  dateConvert.setHours(dateConvert.getHours() + vietnamTimeZoneOffset);
  dateParam.value = dateConvert.toISOString();

  // Handle open report - Get list task
  getYourTask();

  // Tasklist daily
  const taskList = dateSelected?.taskList;

  if (dateSelected.haveReported) {
    if (!isEmpty(taskList)) {
      const commonItems = dataYourWork.value.filter((item1) =>
        taskList.some((item2) => item2.taskId === item1.id)
      );

      const convertData2 = map(commonItems, (item) => {
        forEach(taskList, (item2) => {
          if (item.id === item2.taskId) {
            item.effort = item2.effort;
          }
        });

        return {
          ...item,
          isSelected: false,
        };
      });

      const convertData = map(dataYourWork.value, (item) => {
        return {
          ...item,
          isSelected: false,
        };
      });

      const a = map(convertData, (item, index) => {
        forEach(taskList, (item2) => {
          if (item.id === item2.taskId) {
            item.isSelected = true;
          }
        });

        return {
          ...item,
        };
      });

      dataSource.data = sortBy(a, (item) => !item.isSelected);
      dataSource2.data = convertData2;
      originData2.value = convertData2;
    }
  } else {
    dataSource.data = dataYourWork;
    dataSource2.data = [];
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
      title: "Task Code",
      dataIndex: "key",
      scopedSlots: "key",
      width: 50,
    },
    {
      title: "Task",
      dataIndex: "task",
      scopedSlots: "task",
      width: 170,
    },
    {
      title: "Progress",
      dataIndex: "progress",
      scopedSlots: "progress",
      width: 80,
    },
    {
      title: "Due date",
      dataIndex: "duedate",
      scopedSlots: "duedate",
      width: 70,
    },
    {
      title: "Status",
      dataIndex: "note",
      scopedSlots: "note",
      width: 40,
    },
    {
      title: "Status",
      dataIndex: "status",
      scopedSlots: "status",
      width: 50,
    },
    {
      title: "Effort",
      dataIndex: "effort",
      scopedSlots: "effort",
      width: 40,
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
      title: "Task Code",
      dataIndex: "key",
      scopedSlots: "key",
      width: 50,
    },
    {
      title: "Task",
      dataIndex: "task",
      scopedSlots: "task",
      width: 170,
    },
    {
      title: "Progress",
      dataIndex: "progress",
      scopedSlots: "progress",
      width: 80,
    },
    {
      title: "Due date",
      dataIndex: "duedate",
      scopedSlots: "duedate",
      width: 70,
    },
    {
      title: "Effort",
      dataIndex: "effort",
      scopedSlots: "effort",
      width: 60,
    },
    {
      title: "Status",
      dataIndex: "note",
      scopedSlots: "note",
      width: 100,
    },
  ],
});

const dataYourWork = ref<any>([]);

function handleOkReport() {
  console.log("a");
}
function handleCancel() {
  console.log("c");
}

// Your task
async function getYourTask() {
  const req = {
    pageIndex: 1,
    pageSize: 100,
  };

  const res = await yourworkService.getListTask(req);

  // Get done
  const tasksDone = filter(res.data.data, (item) => item.status === "DONE");
  const tasksDoneDue = orderBy(
    tasksDone,
    (date) => new Date(date.dueDate),
    "desc"
  );

  // Get not done
  const tasksNotDone = filter(res.data.data, (item) => item.status !== "DONE");

  const tasksNotDoneDue = orderBy(
    tasksNotDone,
    (date) => new Date(date.dueDate),
    "asc"
  );

  const dataTask = union(tasksNotDoneDue, tasksDoneDue);

  yourTasks.value = dataTask;

  dataYourWork.value = map(dataTask, (item) => {
    return {
      ...item,
      progress: item.process,
      isSelected: false,
    };
  });

  dataList.value = dataYourWork.value;
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
    message.warning("Please select task and log time for today");
    return;
  }

  isLoad.value = true;

  const req = map(dataSource2.data, (item) => {
    return {
      projectName: "Human Resource",
      taskId: item.id,
      taskName: item.content,
      priority: "LOW",
      effort: item.effort,
      progress: item.process,
      deadLine: item.dueDate,
      status: item.status,
      deliveryStatus: "NOT_YET",
      note: item.note,
    };
  });

  const reqq = {
    reportDate: dateParam.value,
    taskList: req,
  };

  if (!isCreate.value) {
    postReport(reqq);
  } else {
    putReport(reqq);
  }
}

async function postReport(reqParams: any) {
  const res = await timesheetService.postReportDaily(reqParams).finally(() => {
    isLoad.value = false;
  });

  if (res.status === "SUCCESS") {
    isReport.value = false;
    notification.open({
      message: "Report daily successfully",
      description: "Daily report has been updated",
      style: {
        color: "#42526e",
      },
      icon: () => h(CheckCircleOutlined, { style: "color: #209653" }),
    });
    generateDatesForThatMonth();
  }
}

async function putReport(reqParams: any) {
  const res = await timesheetService.putReportDaily(reqParams).finally(() => {
    isLoad.value = false;
  });

  if (res.status === "SUCCESS") {
    isReport.value = false;
    notification.open({
      message: "Update report  successfully",
      description: "Daily report has been updated",
      style: {
        // marginLeft: `${335 - 600}px`,
        color: "#42526e",
      },
      icon: () => h(CheckCircleOutlined, { style: "color: #209653" }),
    });
    generateDatesForThatMonth();
  }
}

function convertDate(date: string) {
  if (date) {
    return moment(date).format("DD-MM-YYYY");
  }

  return "";
}

function checkDueDate(date) {
  const currentDate = new Date();
  const dateToCompare = new Date(date);

  // Kiểm tra xem currentDate có trước dateToCompare hay không
  if (currentDate < dateToCompare) {
    return true;
  }

  return false;
}

function convertEffort(taskList: any) {
  if (!isEmpty(taskList)) {
    const totalEffort = taskList.reduce((sum, item) => sum + item.effort, 0);

    return totalEffort;
  }

  return "";
}

const effortTotal = (taskList: any) => {
  if (!isEmpty(taskList)) {
    const totalEffort = taskList.reduce((sum, item) => sum + item.effort, 0);

    return totalEffort;
  }

  return 0;
};

watch(
  searchTodo,
  debounce(() => {
    dataSource.data = filter(dataList.value, (item: any) =>
      item.content.toLowerCase().includes(searchTodo.value)
    );
  }, 300)
);

watch(
  searchDaily,
  debounce(() => {
    dataSource2.data = filter(originData2.value, (item: any) =>
      item.content.toLowerCase().includes(searchDaily.value)
    );
  }, 300)
);

const checkDate = () => {};
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
          :class="[
            {
              'date-active': d.date === dateToday,
              warning:
                !d.haveReported &&
                d.date < dateToday &&
                currentMonth === selectedMonth,
              'date-off': d.off,
              // 'create-time':
              //   monthCreate === currentMonth && d.date < dateCreate,
            },
          ]"
        >
          <div class="date__head flex justify-between">
            <div v-if="d.haveReported" class="text-[#374151] font-[500]">
              <CheckOutlined />
              Reported
            </div>
            <div v-else></div>
            <div class="text-[1.6rem] date__text">{{ d.date }}</div>
            <!-- {{ index }} -->
          </div>

          <div class="date__task">
            <Popover placement="bottom" trigger="click">
              <template #content>
                <div class="date__pop" v-for="item in d.taskList">
                  {{ item.taskContent }}
                </div>
              </template>

              <div class="date__des" v-for="item in d.taskList">
                {{ item.taskContent }}
              </div>
            </Popover>
          </div>

          <div class="date__bot flex justify-between items-center">
            <div class="date__time" v-if="d.taskList">
              <template v-if="effortTotal(d.taskList) < 8">
                <img src="@/assets/images/clock-error.png" alt="" />

                <span>
                  <Tooltip>
                    <template #title>Work time not enough</template>
                    <span class="effort-err">
                      {{ convertEffort(d.taskList) }}h
                    </span>
                  </Tooltip>
                </span>
              </template>

              <template v-else>
                <img src="@/assets/images/clock.png" alt="" />

                <span> {{ convertEffort(d.taskList) }}h </span>
              </template>
            </div>

            <!-- Nếu select tháng chọn = tháng hiện tại -->
            <template v-if="currentMonth === selectedMonth">
              <!-- Nếu mà tháng hiện tại = tháng tạo mới tk -->
              <!-- <template v-if="monthCreate === currentMonth">
                <template v-if="d.date >= dateCreate">
                  <template v-if="d.date <= dateToday">
                    <Button
                      class="date__btn"
                      :class="{ 'date__btn--report': d.haveReported }"
                      @click="selectedDate(d)"
                      v-if="!d.off"
                    >
                      Report
                    </Button>
                  </template>

                  <template v-else>
                    <Button class="date__btn" v-if="!d.off" :disabled="true">
                      Report
                    </Button>
                  </template>
                </template>

                <template v-else> </template>
              </template>

              <template v-else>
                <template v-if="d.date <= dateToday">
                  <Button
                    class="date__btn"
                    :class="{ 'date__btn--report': d.haveReported }"
                    @click="selectedDate(d)"
                    v-if="!d.off"
                  >
                    Report
                  </Button>
                </template>

                <template v-else>
                  <Button class="date__btn" v-if="!d.off" :disabled="true">
                    Report
                  </Button>
                </template>
              </template> -->
              <template v-if="d.date <= dateToday">
                <Button
                  class="date__btn"
                  :class="{ 'date__btn--report': d.haveReported }"
                  @click="selectedDate(d)"
                  v-if="!d.off"
                >
                  Report
                </Button>
              </template>

              <template v-else>
                <Button class="date__btn" v-if="!d.off" :disabled="true">
                  Report
                </Button>
              </template>
            </template>
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
      @cancel="handleCancel"
      title="DAILY REPORT"
    >
      <Spin :spinning="isLoad" :delay="delayTime">
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
              :scroll="{ y: 125, x: 1500 }"
              bordered
            >
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'action'">
                  <div
                    class="column__item"
                    :class="{ select: record.isSelected }"
                  >
                    <Button
                      class="flex items-center w-full justify-center"
                      @click="handleDown(record.id, index)"
                      :disabled="record.isSelected"
                      type="text"
                    >
                      <DownCircleOutlined />
                    </Button>
                  </div>
                </template>

                <template v-if="column.dataIndex === 'key'">
                  <div
                    class="column__item"
                    :class="{ select: record.isSelected }"
                  >
                    {{ record.taskCode }}
                  </div>
                </template>

                <template v-if="column.dataIndex === 'task'">
                  <div
                    class="column__item px-[1rem]"
                    :class="{ select: record.isSelected }"
                  >
                    {{ record.content }}
                  </div>
                </template>

                <template v-if="column.dataIndex === 'progress'">
                  <div
                    class="column__item px-[1rem]"
                    :class="{ select: record.isSelected }"
                  >
                    <!-- {{ record.progress }} -->
                    <Progress
                      :stroke-color="'#0DAF60'"
                      :percent="record.progress"
                    ></Progress>
                  </div>
                </template>

                <template v-if="column.dataIndex === 'duedate'">
                  <div
                    class="column__item"
                    :class="{ select: record.isSelected }"
                  >
                    <Tag
                      color="#F4F5F7"
                      class="cursor-pointer"
                      v-if="checkDueDate(record.dueDate)"
                    >
                      <span
                        class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
                      >
                        {{ convertDate(record.dueDate) }}
                      </span>
                    </Tag>

                    <Tag color="#FFEBE6" class="cursor-pointer" v-else>
                      <span
                        class="cursor-pointer text-[#BF2600] font-[500] text-[1.3rem]"
                      >
                        {{ convertDate(record.dueDate) }}
                      </span>
                    </Tag>
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

                <template v-if="column.dataIndex === 'note'">
                  <div
                    class="column__item"
                    :class="{ select: record.isSelected }"
                  >
                    {{ record.status }}
                  </div>
                </template>
              </template>
            </Table>
          </div>

          <br />
          <!--  -->
          <div class="todo">
            <h3 class="todo__title">DAILY REPORT</h3>
            <div class="todo__search">
              <Input v-model:value="searchDaily" placeholder="Search task..." />
            </div>
            <Table
              :columns="dataSource2.columns"
              :data-source="dataSource2.data"
              :pagination="false"
              bordered
              :scroll="{ y: 125, x: 1500 }"
            >
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.dataIndex === 'action'">
                  <div class="column__item">
                    <Button
                      class="flex items-center w-full justify-center"
                      @click="handleUp(record.id, index)"
                      type="text"
                    >
                      <UpCircleOutlined />
                    </Button>
                  </div>
                </template>

                <template v-if="column.dataIndex === 'key'">
                  <div class="column__item">
                    {{ record.taskCode }}
                  </div>
                </template>

                <template v-if="column.dataIndex === 'task'">
                  <div class="column__item px-[1rem]">
                    {{ record.content }}
                  </div>
                </template>

                <template v-if="column.dataIndex === 'progress'">
                  <div class="column__item px-[1rem]">
                    <Progress
                      :stroke-color="'#0DAF60'"
                      :percent="record.progress"
                    ></Progress>
                  </div>
                </template>

                <template v-if="column.dataIndex === 'duedate'">
                  <div class="column__item">
                    <Tag
                      color="#F4F5F7"
                      class="cursor-pointer"
                      v-if="checkDueDate(record.dueDate)"
                    >
                      <span
                        class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
                      >
                        {{ convertDate(record.dueDate) }}
                      </span>
                    </Tag>

                    <Tag color="#FFEBE6" class="cursor-pointer" v-else>
                      <span
                        class="cursor-pointer text-[#BF2600] font-[500] text-[1.3rem]"
                      >
                        {{ convertDate(record.dueDate) }}
                      </span>
                    </Tag>
                  </div>
                </template>

                <template v-if="column.dataIndex === 'effort'">
                  <div class="column__item">
                    <Input v-model:value="record.effort" suffix="h" />
                  </div>
                </template>

                <template v-if="column.dataIndex === 'status'">
                  <div class="flex items-center justify-center">
                    <Select v-model:value="record.status" style="width: 12rem">
                      <SelectOption value="OPEN">Open</SelectOption>
                      <SelectOption value="PENDING">Pending</SelectOption>
                      <SelectOption value="INPROGRESS"
                        >In Progress</SelectOption
                      >
                      <SelectOption value="DONE">Done</SelectOption>
                    </Select>
                  </div>
                </template>

                <template v-if="column.dataIndex === 'note'">
                  <div class="column__item">
                    <Input v-model:value="record.note" />
                  </div>
                </template>
              </template>
            </Table>
          </div>
        </div>
        <div class="flex justify-center w-full pt-[2rem]">
          <Button @click="handleReportDaily()" type="primary">Report</Button>
        </div>
      </Spin>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.effort-err {
  color: red;
}

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
  height: 4.1rem;
  padding: 0.5rem 1.5rem;
  display: flex;
  align-items: center;

  &.select {
    background: #4c9aff1a;
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

  &__task {
    height: 7rem;
    overflow: auto;
  }

  &-active {
    background: #cae4d584;
    border: 0.5px solid #cae4d584;
  }

  &-off {
    background: #2a3d4c71;

    &:hover {
      background: #2a3d4c71;
    }
  }

  &__des {
    background: #2bc48a;
    color: white;
    border-radius: 2px;
    font-size: 1.2rem;
    height: 2rem;
    margin-bottom: 5px;
    padding-left: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__pop {
    background: #2bc48a;
    color: white;
    border-radius: 2px;
    font-size: 1.2rem;
    height: 2rem;
    margin-bottom: 5px;
    padding-left: 4px;
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

.ant-progress :deep(.ant-progress-inline) {
  margin-bottom: 0;
}

.create-time {
  .date__text {
    color: #172b4d !important;
  }
}
</style>
