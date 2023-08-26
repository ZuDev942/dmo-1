<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { Tabs, TabPane, Button, Affix, Tooltip } from "ant-design-vue";
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

function handleSelectToday() {
  numberWeek.value = getWeekNumber(new Date());
  dateInWeek.value = getWeekDates(numberWeek.value, 2023);

  reqParamsMember.value.startDate = dateInWeek.value[0];
  reqParamsMember.value.endDate = dateInWeek.value[6];

  getBoardMember();
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
    const filterUser = filter(
      res.data,
      (item: any) => item.accountId !== 14 && item.accountId !== 7
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

const effortTotal = (taskList: any) => {
  if (!isEmpty(taskList)) {
    const totalEffort = taskList.reduce((sum, item) => sum + item.effort, 0);

    return totalEffort;
  }

  return 0;
};

const top = ref<number>(50);
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
              <Button class="schedule__btn" @click="handleSelectToday()">
                Today
              </Button>
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
          <Affix :offset-top="top">
            <div class="grid grid-cols-8 bg-white">
              <div class="branch__day text-center">Member</div>
              <div
                v-for="(date, dateIndex) in dateInWeek"
                :key="'week' + dateIndex"
                class="branch__day text-center"
              >
                {{ convertTime(date) }} {{ convertDate(dateIndex) }}
              </div>
            </div>
          </Affix>

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
              v-if="!isEmpty(mem.days)"
              v-for="(day, dayIndex) in mem.days"
              :key="'day' + dayIndex"
            >
              <div
                class="branch__per flex flex-col justify-between"
                :class="{
                  branch__active: compareDay(day.dayOfMonth, dateToday),
                  branch__off: day.off,
                }"
              >
                <div class="branch__cont">
                  <div class="branch__title2">
                    <h3 class="hidden">{{ dayIndex }}</h3>
                  </div>

                  <div class="branch__task h-full">
                    <div class="branch__des" v-for="task in day.taskList">
                      {{ task.taskContent }}
                    </div>
                  </div>

                  <div class="branch__time" v-if="!isEmpty(day.taskList)">
                    <template v-if="effortTotal(day.taskList) < 8">
                      <img src="@/assets/images/clock-error.png" alt="" />

                      <span>
                        <Tooltip>
                          <template #title>Work time not enough</template>
                          <span class="branch__errEffort">
                            {{ convertEffort(day.taskList) }}h
                          </span>
                        </Tooltip>
                      </span>
                    </template>

                    <template v-else>
                      <img src="@/assets/images/clock.png" alt="" />

                      <span> {{ convertEffort(day.taskList) }}h </span>
                    </template>
                  </div>
                </div>
              </div>
            </template>

            <template
              v-else
              v-for="(day, dayIndexNull) in 7"
              :key="'dayNull' + dayIndexNull"
            >
              <div class="branch__per flex flex-col justify-between">
                <div class="branch__cont">
                  <div class="branch__title2">
                    <h3 class="hidden">{{ day }}</h3>
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
