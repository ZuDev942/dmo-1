<script lang="ts" setup>
import { ref, onMounted, watch, toRefs } from "vue";
import { Tabs, TabPane, Button } from "ant-design-vue";
import {} from "@ant-design/icons-vue";
import moment, { Moment } from "moment";
import { random } from "lodash";
import { timesheetService } from "@/services";
import eventBus from "@/eventBus";
const { onEvent } = eventBus();

// ==== Data ==== //
const props = defineProps<{
  activeTab: string;
  dateRange: any;
  startDate: string;
  endDate: string;
}>();

const { activeTab, dateRange, startDate, endDate } = toRefs(props);
const numberWeek = ref<number>(0);
const dateInWeek = ref<any>([]);

onMounted(() => {
  onEvent("GET_MEMBER", handle);
});

function handle(payload) {
  console.log(payload);
}

watch(activeTab, () => {
  if (activeTab.value === "2") {
    console.log("out");
  }
});

watch(startDate, (n, o) => {
  console.log("a");
  reqParamsMember.value.startDate = startDate.value;
  reqParamsMember.value.endDate = endDate.value;
  dateInWeek.value = dateRange.value;
  console.log(reqParamsMember.value);

  getBoardMember();
});

// Member //
const listReportMember = ref<any>([]);

async function getBoardMember() {
  const res = await timesheetService.getDashboardMember(reqParamsMember.value);

  if (res.status === "SUCCESS") {
    listReportMember.value = res.data;
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
</script>

<template>
  <div>
    <div>
      {{ dateRange }}
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

        <template v-for="(day, dayIndex) in mem.days" :key="'day' + dayIndex">
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
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
