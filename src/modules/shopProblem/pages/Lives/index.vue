<script lang="ts" setup>
import { ref, reactive } from "vue";
import {
  Badge,
  Calendar,
  Tabs,
  TabPane,
  Modal,
  Tag,
  Input,
  InputNumber,
  Select,
  SelectOption,
  Tooltip,
  Button,
} from "ant-design-vue";
import { DoubleRightOutlined, DoubleLeftOutlined } from "@ant-design/icons-vue";
import { Dayjs } from "dayjs";
import moment, { Moment } from "moment";
import type { IDataSource } from "@/components";
import { DataTable } from "@/components";
import { random } from "lodash";

const value = ref<Dayjs>();

const getListData = (value: Dayjs) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "1.This is warning event." },
        { type: "success", content: "2.This is usual event." },
      ];
      break;
    case 17:
      listData = [
        { type: "warning", content: "1.This is warning event." },
        { type: "success", content: "2.This is usual event." },
        { type: "error", content: "3.This is error event.", id: 1 },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "1.This is warning event" },
        { type: "success", content: "2.This is very long usual event。。...." },
        { type: "error", content: "3.This is error event 1." },
        { type: "error", content: "4.This is error event 2." },
        { type: "error", content: "5.This is error event 3." },
        { type: "error", content: "6.This is error event 4." },
      ];
      break;
    default:
  }
  return listData || [];
};

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

const isReport = ref<boolean>(false);
const searchTodo = ref<string>("");
const randomDate = random(1, 7);

function getNumber(num: number) {
  return random(1, num);
}

function handleOkReport() {
  isReport.value = true;
}

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const date = ref(moment("2017-01-25"));
const selectedValue = ref(moment("2017-01-25"));
const date1 = ref(moment("2017-01-25"));

const onSelect = (value: Moment) => {
  date.value = value;
  selectedValue.value = value;
  isReport.value = true;
};

const activeKey = ref<string>("1");
function getPhoto(img) {
  return `@/assets/images/${img}.png`;
}

function selectDate() {
  isReport.value = true;
}

function handleLoadPage() {}
</script>

<template>
  <div class="schedule">
    <Tabs v-model:activeKey="activeKey" type="card">
      <!--  -->
      <template #tabBarExtraContent>
        <div class="flex items-center">
          <Button class="schedule__btn--next">
            <DoubleLeftOutlined />
          </Button>
          <h2>June 2023 {{}}</h2>
          <Button class="schedule__btn--next">
            <DoubleRightOutlined />
          </Button>

          <Button class="schedule__btn">Today</Button>
        </div>
      </template>
      <!-- Daily report -->
      <TabPane key="1" tab="Personal">
        <!-- <div class="daily">
          <Calendar v-model:value="value" @select="onSelect(date)">
            <template #dateCellRender="{ current }">
              <ul class="events">
                <li v-for="item in getListData(current)" :key="item.content">
                  <Badge :status="item.type" :text="item.content" />
                </li>
              </ul>
            </template>
          </Calendar>
        </div> -->

        <div class="calendar">
          <div class="grid grid-cols-7">
            <div class="branch__day text-center">Monday</div>
            <div class="branch__day text-center">Tuesday</div>
            <div class="branch__day text-center">Wednesday</div>
            <div class="branch__day text-center">Thursday</div>
            <div class="branch__day text-center">Friday</div>
            <div class="branch__day text-center">Saturday</div>
            <div class="branch__day text-center">Sunday</div>
          </div>

          <div class="grid grid-cols-7">
            <template v-for="a in 30" :key="'calendar' + a">
              <div
                class="branch__cal flex flex-col"
                v-if="a === 4 || a === 7 || a === 12"
              >
                <div class="branch__title">
                  <h3>Daily Report</h3>
                  <h3>{{ a }}</h3>
                </div>

                <div class="branch__task h-full">
                  <div class="branch__des">1.Tranning Master...</div>
                  <div class="branch__des">2.Tranning Master...</div>
                </div>

                <div class="branch__bot flex justify-between items-center">
                  <div class="branch__time">
                    <img src="@/assets/images/clock.png" alt="" />
                    <span>8h</span>
                  </div>

                  <Button class="branch__btn" @click="selectDate()"
                    >Report</Button
                  >
                </div>
              </div>

              <!--  -->
              <div
                class="branch__cal branch__match flex flex-col"
                v-else-if="a === 17"
              >
                <div class="branch__title">
                  <div class="flex items-center" @click="selectDate()">
                    <h3>Daily Report</h3>
                    <img
                      src="@/assets/images/edit.png"
                      alt=""
                      style="
                        width: 1.6rem;
                        height: 1.6rem;
                        margin-left: 5px;
                        margin-bottom: 5px;
                        cursor: pointer;
                      "
                    />
                  </div>

                  <h3>{{ a }}</h3>
                </div>

                <div class="branch__task h-full">
                  <Tooltip>
                    <template #title
                      >Traning master dev season 3 with many talent
                      text</template
                    >
                    <div class="branch__des">1.Tranning Master...</div>
                  </Tooltip>
                  <Tooltip>
                    <template #title>prompt text</template>
                    <div class="branch__des">1.Tranning Master...</div>
                  </Tooltip>
                </div>

                <div class="branch__bot flex justify-between items-center">
                  <div class="branch__time">
                    <img src="@/assets/images/clock_white.png" alt="" />
                    <span>8h</span>
                  </div>
                  <!-- <Button class="branch__btn">Report</Button> -->
                </div>
              </div>

              <!--  -->
              <div class="branch__cal flex flex-col justify-between" v-else>
                <div class="branch__title">
                  <h3>Task</h3>
                  <h3>{{ a }}</h3>
                </div>

                <div class="branch__bot flex justify-between items-center">
                  <div class="branch__time">
                    <!-- <img src="@/assets/images/clock.png" alt="" />
                    <span>8h</span> -->
                  </div>
                  <Button class="branch__green" @click="selectDate()">
                    Report
                  </Button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <Modal
          v-model:visible="isReport"
          width="90%"
          :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
          :closable="false"
          :footer="null"
          @ok="handleOkReport"
        >
          <div class="modal__header">
            <h3>MORNING REPORT</h3>
            <img
              src="@/assets/images/closed.png"
              alt=""
              @click="handleOkReport"
            />
          </div>

          <div class="modal__wrap">
            <div class="todo">
              <div class="todo__search">
                <h3>TO DO TASK</h3>
                <Input
                  v-model:value="searchTodo"
                  placeholder="Search task..."
                />
              </div>

              <DataTable
                :dataSource="dataSource"
                @table-change="handleLoadPage"
              >
                <template #action>
                  <img class="common__img" src="@/assets/images/down.png" />
                </template>
                <template #project="{ record }">{{ record.project }}</template>
                <template #task="{ record }">
                  {{ record.task }}
                </template>
                <template #priority="{ record }">{{
                  record.priority
                }}</template>
                <template #planend="{ record }">{{ record.planend }}</template>
                <template #effort="{ record }">{{ record.effort }}</template>
                <template #progress="{ record }">{{
                  record.progress
                }}</template>
                <template #status="{ record }">
                  <Tag color="#2bc48a">
                    {{ record.status }}
                  </Tag>
                </template>
                <template #note="{ record }">{{ record.note }} </template>
              </DataTable>
            </div>

            <br />
            <!--  -->
            <div class="daily-task">
              <div class="todo__search">
                <h3>DAILY REPORT</h3>
                <Input
                  v-model:value="searchTodo"
                  placeholder="Search task..."
                />
              </div>

              <DataTable
                :dataSource="dataSource2"
                @table-change="handleLoadPage"
              >
                <template #action>
                  <img class="common__img" src="@/assets/images/up-arrow.png" />
                </template>
                <template #project="{ record }">{{ record.project }}</template>
                <template #task="{ record }">
                  {{ record.task }}
                </template>
                <template #effort="{ record }">
                  <Input v-model:value="record.effort" />
                </template>
                <template #progress="{ record }">
                  <InputNumber
                    v-model:value="record.progress"
                    :min="0"
                    :max="100"
                    :formatter="(value) => `${value}%`"
                    :parser="(value) => value.replace('%', '')"
                  />
                </template>
                <template #status="{ record }">
                  <Tag color="#2bc48a">
                    {{ record.status }}
                  </Tag>
                </template>
                <template #delivery="{ record }">
                  <Select
                    ref="select"
                    v-model:value="record.delivery"
                    style="width: 120px"
                  >
                    <template #suffixIcon></template>
                    <SelectOption value="1">Delivered</SelectOption>
                    <SelectOption value="2">Undelivered</SelectOption>
                  </Select>
                </template>
                <template #note="{ record }">
                  <Input v-model:value="record.note" />
                </template>
              </DataTable>
            </div>
          </div>
        </Modal>
      </TabPane>

      <!-- List member report -->
      <TabPane key="2" tab="Members">
        <div class="branch h-full">
          <div class="grid grid-cols-8">
            <div class="branch__day text-center">Member</div>
            <div class="branch__day text-center">Monday</div>
            <div class="branch__day text-center">Tuesday</div>
            <div class="branch__day text-center">Wednesday</div>
            <div class="branch__day text-center">Thursday</div>
            <div class="branch__day text-center">Friday</div>
            <div class="branch__day text-center">Saturday</div>
            <div class="branch__day text-center">Sunday</div>
          </div>

          <div class="grid grid-cols-8" v-for="itemm in 7" :key="'aa' + itemm">
            <div class="branch__per flex justify-center items-center flex-col">
              <img src="@/assets/images/avatar.jpeg" alt="" />
              <p>Nguyen Thanh A</p>
            </div>

            <template v-for="item in 7" :key="'a' + item">
              <div
                class="branch__per flex flex-col justify-between"
                :class="{ branch__active: item === 2 }"
              >
                <div>
                  <div class="branch__title2">
                    <img
                      v-if="item === 2"
                      src="@/assets/images/checklist_1.png"
                      alt=""
                      style="width: 1.6rem; height: 1.6rem"
                    />
                    <img
                      v-else
                      src="@/assets/images/checklist.png"
                      alt=""
                      style="width: 1.6rem; height: 1.6rem"
                    />

                    <h3>Task</h3>
                  </div>

                  <div
                    class="branch__task h-full"
                    v-if="item === getNumber(item)"
                  >
                    <div class="branch__des">1.Tranning Master...</div>
                    <div class="branch__des">2.Tranning Master...</div>
                  </div>
                </div>

                <!-- <div
                  class="branch__bot flex justify-between items-center"
                  v-if="item === randomDate"
                >
                  <div class="branch__time"></div>
                  <Button class="branch__btn">Report</Button>
                </div> -->
              </div>
            </template>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
