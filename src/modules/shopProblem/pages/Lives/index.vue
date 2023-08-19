<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { Tabs, TabPane, Button } from "ant-design-vue";
import { CalendarH } from "@/components";
import moment from "moment";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons-vue";
import useEventBus from "@/eventBus";
import { timesheetService } from "@/services";
import { filter, isEmpty } from "lodash";

// ==== Data ==== //
const { emitEvent } = useEventBus();
const activeKey = ref("1");
const dateInWeek = ref<any>([]);
const numberWeek = ref<number>(0);
const dateToday = ref<number>(0);
const userInfo = ref<any>();
const isManager = ref<boolean>(true);

// ==== Method ==== //
onMounted(() => {
  const today = new Date();
  dateToday.value = today.getDate();

  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
  }

  isManager.value = userInfo.value.role === "MANAGER" ? true : false;
});

watch(activeKey, () => {
  if (activeKey.value === "2") {
    numberWeek.value = getWeekNumber(new Date());
    dateInWeek.value = getWeekDates(numberWeek.value, 2023);

    reqParamsMember.value.startDate = dateInWeek.value[0];
    reqParamsMember.value.endDate = dateInWeek.value[6];

    getBoardMember();
  }
});

function getWeekNumber(date) {
  return moment(date).isoWeek();
}

// Get date in week
function getWeekDates(weekNumber, year) {
  const startOfWeek = moment()
    .year(year)
    .isoWeek(weekNumber)
    .startOf("isoWeek");
  const weekDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const a = startOfWeek.clone().add(i, "days").format("YYYY-MM-DD");
    weekDates.push(a);
  }

  return weekDates;
}

function handlePre() {
  const num = --numberWeek.value;
  const date = getWeekDates(num, 2023);
  dateInWeek.value = date;

  reqParamsMember.value.startDate = dateInWeek.value[0];
  reqParamsMember.value.endDate = dateInWeek.value[6];

  getBoardMember();
}

function handleNext() {
  const num = ++numberWeek.value;
  const date = getWeekDates(num, 2023);
  dateInWeek.value = date;

  reqParamsMember.value.startDate = dateInWeek.value[0];
  reqParamsMember.value.endDate = dateInWeek.value[6];
  getBoardMember();
}

// Member //
const listReportMember = ref<any>([]);

async function getBoardMember() {
  const res = await timesheetService.getDashboardMember(reqParamsMember.value);

  if (res.status === "SUCCESS") {
    console.log(res.data);
    const filterUser = filter(
      res.data,
      (item: any) => item.accountId !== 2 && item.accountId !== 3
    );

    listReportMember.value = filterUser;
  }
}

const reqParamsMember = ref({
  startDate: "2023-07-31",
  endDate: "2023-08-06",
});

function convertDate(index: number) {
  if (index === 0) {
    return "Monday";
  }
  if (index === 1) {
    return "Tuesday";
  }
  if (index === 2) {
    return "Wednesday";
  }
  if (index === 3) {
    return "Thursday";
  }
  if (index === 4) {
    return "Friday";
  }
  if (index === 5) {
    return "Saturday";
  }
  if (index === 6) {
    return "Sunday";
  }
}

const convertTime = (date: Date) => {
  if (date) {
    return moment(date).format("DD/MM");
  }

  return "";
};

const weekFromTo = (date: any) => {
  if (date) {
    return moment(date).format("DD/MM/YYYY");
  }

  return "";
};

const compareDay = (date, today) => {
  if (parseInt(date) === today) {
    return true;
  } else {
    return false;
  }
};

function convertEffort(taskList: any) {
  if (!isEmpty(taskList)) {
    const totalEffort = taskList.reduce((sum, item) => sum + item.effort, 0);

    return totalEffort;
  }

  return "";
}
</script>

<template>
  <div class="schedule">
    <Tabs v-model:activeKey="activeKey" type="card">
      <!--  -->
      <template #tabBarExtraContent>
        <template v-if="activeKey === '2'">
          <div class="flex justify-between w-[75rem]">
            <div class="flex items-center">
              <Button @click="handlePre()" class="mr-5 mb-1 btn__action">
                <DoubleLeftOutlined
                  class="text-[1.5rem]"
                  style="color: #172b4d"
                />
              </Button>
              <span class="w-max text-center text-[2rem] text-[#172b4d]">
                {{ weekFromTo(dateInWeek[0]) }} -
                {{ weekFromTo(dateInWeek[6]) }}
              </span>
              <Button @click="handleNext()" class="ml-5 mb-1 btn__action">
                <DoubleRightOutlined
                  class="text-[1.5rem]"
                  style="color: #172b4d"
                />
              </Button>
            </div>
            <div class="flex items-center">
              <Button class="schedule__btn">Today</Button>
            </div>
          </div>
        </template>
      </template>
      <TabPane key="1" tab="Personal">
        <CalendarH></CalendarH>
      </TabPane>

      <!-- List member report -->
      <TabPane key="2" tab="Members" v-if="isManager">
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
                :class="{
                  branch__active: compareDay(day.dayOfMonth, dateToday),
                }"
              >
                <div class="branch__cont">
                  <div class="branch__title2">
                    <h3>Task</h3>
                  </div>

                  <div class="branch__task h-full">
                    <div class="branch__des" v-for="task in day.taskList">
                      {{ task.taskContent }}
                    </div>
                  </div>

                  <div class="branch__time" v-if="!isEmpty(day.taskList)">
                    <img src="@/assets/images/clock.png" alt="" />
                    <span>{{ convertEffort(day.taskList) }}h</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
