<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from "vue";
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
import { DataTable, CalendarH } from "@/components";
import { filter, forEach, map, random } from "lodash";
import { timesheetService } from "@/services";

const value = ref<Dayjs>();

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

onMounted(() => {});

// Member //
const listReportMember = ref<any>([]);
const dateNow = ref("");

function getTodayDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  return day;
}

let currentWeekStart: moment.Moment | undefined; // Biến để lưu trữ ngày bắt đầu của tuần hiện tại

function getDaysOfWeek(action: "increase" | "decrease"): string[] {
  if (typeof currentWeekStart === "undefined") {
    // Nếu biến trạng thái chưa tồn tại, đặt ngày bắt đầu là Chủ Nhật của tuần hiện tại
    currentWeekStart = moment().startOf("week");
  } else {
    // Điều chỉnh ngày bắt đầu dựa vào hành động
    if (action === "decrease") {
      // Giảm ngày bắt đầu xuống tuần trước
      currentWeekStart.subtract(1, "week");
    } else if (action === "increase") {
      // Tăng ngày bắt đầu lên tuần trước đó
      currentWeekStart.add(1, "week");
    }
  }

  const daysOfWeek: string[] = [];
  for (let i = 0; i < 7; i++) {
    const day = moment(currentWeekStart).add(i, "days");
    const dayFormatted = day.format("YYYY-MM-DD");
    daysOfWeek.push(dayFormatted);
  }

  return daysOfWeek;
}

function getDateNow(): string[] {
  const currentWeekStart = moment().startOf("week");
  const daysOfWeek: string[] = [];
  for (let i = 0; i < 7; i++) {
    const day = moment(currentWeekStart).add(i, "days");
    const dayFormatted = day.format("YYYY-MM-DD");
    daysOfWeek.push(dayFormatted);
  }
  return daysOfWeek;
}

async function getBoardMember() {
  const res = await timesheetService.getDashboardMember(reqParamsMember.value);

  if (res.status === "SUCCESS") {
    listReportMember.value = res.data;
  }
}

watch(activeKey, () => {
  if (activeKey.value === "2") {
    getBoardMember();
    dateInWeek.value = getDateNow();
    // console.log(dateInWeek.value);
  }
});

const reqParamsMember = ref({
  startDate: "2023-07-31",
  endDate: "2023-08-06",
});

const dateInWeek = ref<any>([]);

function handlePre() {
  // dateInWeek.value = getDaysOfWeek("increase");
  reqParamsMember.value.startDate = "2023-07-31";
  reqParamsMember.value.endDate = "2023-08-06";

  getBoardMember();
}

function handleNext() {
  // dateInWeek.value = getDaysOfWeek("increase");
  reqParamsMember.value.startDate = "2023-07-31";
  reqParamsMember.value.endDate = "2023-08-06";

  getBoardMember();
}

function convertDate(index: number) {
  if (index === 0) {
    return "Sunday";
  }
  if (index === 1) {
    return "Monday";
  }
  if (index === 2) {
    return "Tuesday";
  }
  if (index === 3) {
    return "Wednesday";
  }
  if (index === 4) {
    return "Thursday";
  }
  if (index === 5) {
    return "Friday";
  }
  if (index === 6) {
    return "Saturday";
  }
}

const convertTime = (date: Date) => {
  if (date) {
    return moment(date).format("DD/MM");
  }

  return "";
};

const convertCurrent = (date: Date) => {
  if (date) {
    const a = moment(date).format("DD");
    return parseInt(a);
  }

  return "";
};
</script>

<template>
  <div class="schedule">
    <Tabs v-model:activeKey="activeKey" type="card">
      <!--  -->
      <template #tabBarExtraContent>
        <div class="flex items-center">
          <Button class="schedule__btn">Today</Button>
        </div>
      </template>
      <TabPane key="1" tab="Personal">
        <CalendarH></CalendarH>
      </TabPane>

      <!-- List member report -->
      <TabPane key="2" tab="Members">
        <div>
          <Button @click="handlePre()"> sau </Button>
          <Button @click="handleNext()"> trước </Button>
        </div>
        <div class="branch h-full">
          <div class="grid grid-cols-8">
            <div class="branch__day text-center">Member</div>
            <div
              v-for="(date, dateIndex) in dateInWeek"
              :key="'week' + dateIndex"
              class="branch__day text-center"
            >
              {{ convertTime(date) }} {{ convertDate(dateIndex) }}
            </div>
          </div>

          <div
            class="grid grid-cols-8"
            v-for="(mem, index) in listReportMember"
            :key="'aa' + index"
          >
            <div class="branch__per flex justify-center items-center flex-col">
              <img src="@/assets/images/avatar.jpeg" alt="" />
              <p>{{ mem.fullName }}</p>
            </div>

            <template
              v-for="(day, dayIndex) in mem.days"
              :key="'day' + dayIndex"
            >
              <div
                class="branch__per flex flex-col justify-between"
                :class="{ branch__active: day === 2 }"
              >
                <div>
                  <div class="branch__title2">
                    <!-- <img
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
                    /> -->

                    <h3>Task</h3>
                  </div>

                  <!-- <div
                    class="branch__task h-full"
                    v-if="item === getNumber(item)"
                  >
                    <div class="branch__des">1.Tranning Master...</div>
                    <div class="branch__des">2.Tranning Master...</div>
                  </div> -->
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
