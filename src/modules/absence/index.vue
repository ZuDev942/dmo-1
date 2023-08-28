<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import {
  Form,
  FormItem,
  message,
  Select,
  SelectOption,
  Input,
  Textarea,
  Button,
  DatePicker,
} from "ant-design-vue";
import { userService, dayoffService } from "../../services";
import { filter, forEach, map } from "lodash";

// ====
interface FormAbsence {
  requestAccountId: number;
  approverId: string | undefined;
  informList: any[];
  dayOffType: string;
  sessionOff: string;
  offDay: string;
  reason: string;
  note: string;
}

const formAbsence = reactive<FormAbsence>({
  requestAccountId: 3,
  approverId: undefined,
  informList: [],
  dayOffType: "",
  sessionOff: "",
  offDay: "",
  reason: "",
  note: "",
});

const userList = ref<any>([]);
const userInfo = ref<any>({});
const list = ref<any>([]);
const approverManager = ref<any>([]);

// ==== Method ==== //
onMounted(() => {
  getUser();
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
  }
});

async function getUser() {
  const req = {
    pageIndex: 1,
    pageSize: 20,
    keyword: "",
  };

  const res = await userService.getLisrUser(req);

  const filterManager = filter(
    res.data.data,
    (item) => item.role === "MANAGER"
  );

  const filterUser = filter(
    res.data.data,
    (item) =>
      item.fullName !== userInfo.value.fullname &&
      item.role !== "MANAGER" &&
      item.role !== "ADMIN"
  );

  approverManager.value = map(filterManager, (item) => {
    return {
      value: item.id,
      label: item.fullName,
    };
  });

  userList.value = map(filterUser, (item) => {
    return {
      value: item.id,
      label: item.fullName,
    };
  });

  list.value = res.data.data;
}

const handleOkAbsence = async (e: MouseEvent) => {
  const inform: { accountId: any; fullName: any }[] = [];
  forEach(list.value, (item) => {
    forEach(formAbsence.informList, (i) => {
      if (item.id === i) {
        const acc = {
          accountId: item.id,
          fullName: item.fullName,
        };
        inform.push(acc);
      }
    });
  });

  const vietnamTimeZoneOffset = 7;
  const dateConvert = new Date(formAbsence.offDay);
  dateConvert.setHours(dateConvert.getHours() + vietnamTimeZoneOffset);
  const offDayConvert = dateConvert.toISOString();

  const reqParams = {
    requestAccountId: 3,
    approverId: formAbsence.approverId,
    informList: inform,
    dayOffType: formAbsence.dayOffType,
    sessionOff: formAbsence.sessionOff,
    offDay: offDayConvert,
    reason: formAbsence.reason,
    note: formAbsence.note,
  };

  const res = await dayoffService.postDayoff(reqParams);
  if (res) {
    message.success("Send absent successfull!");
    formAbsence.approverId = undefined;
    formAbsence.informList = [];
    formAbsence.dayOffType = "";
    formAbsence.sessionOff = "";
    formAbsence.offDay = "";
    formAbsence.reason = "";
    formAbsence.note = "";
  }
};

import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance } from "ant-design-vue";

const formRef = ref<FormInstance>();

// let checkOldPass = async (_rule: Rule, value: any) => {
//   console.log(value);
//   if (value === "") {
//     return Promise.reject("Please enter current password");
//   } else {
//     return Promise.resolve();
//   }
// };

const rules: Record<string, Rule[]> = {
  reason: [
    { required: true, message: "Please input reason off ", trigger: "change" },
  ],
  note: [
    { required: true, message: "Please input note off ", trigger: "change" },
  ],
  offDay: [
    { required: true, message: "Please select date ", trigger: "change" },
  ],
  sessionOff: [
    { required: true, message: "Please select session ", trigger: "change" },
  ],
  approverId: [
    { required: true, message: "Please select approver ", trigger: "change" },
  ],
  informList: [
    { required: true, message: "Please select HR ", trigger: "change" },
  ],
  dayOffType: [
    {
      required: true,
      message: "Please select day off type ",
      trigger: "change",
    },
  ],
};

function disabledDate(current) {
  // Lấy ngày hôm nay
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // So sánh ngày hiện tại với ngày được chọn (ngày hôm nay được bỏ qua)
  return current && current.valueOf() < today;
}
</script>
<template>
  <div class="page">
    <div class="page__container">
      <Form
        ref="formRef"
        name="custom-validation-ab"
        :rules="rules"
        :model="formAbsence"
        @finish="handleOkAbsence"
      >
        <div class="w-full flex justify-between">
          <div class="w-[48%]">
            <div class="">
              <label class="w-[15rem]">Requester</label>
              <FormItem name="requester" class="w-full" :aria-disabled="true">
                <Select v-model:value="userInfo.fullname" disabled></Select>
              </FormItem>
            </div>

            <div class="">
              <label class="w-[15rem]">
                Approver <span class="text-red-600">&ast;</span>
              </label>
              <FormItem name="approverId" class="w-full">
                <Select
                  v-model:value="formAbsence.approverId"
                  style="width: 100%"
                  :options="approverManager"
                ></Select>
              </FormItem>
            </div>

            <div class="">
              <label class="w-[15rem]"
                >Inform <span class="text-red-600">&ast;</span></label
              >
              <FormItem name="informList" class="w-full">
                <Select
                  v-model:value="formAbsence.informList"
                  mode="multiple"
                  style="width: 100%"
                  :options="userList"
                ></Select>
              </FormItem>
            </div>

            <div class="">
              <label class="w-[15rem]"
                >Dayoff Type <span class="text-red-600">&ast;</span></label
              >
              <FormItem name="dayOffType" class="w-full">
                <Select
                  v-model:value="formAbsence.dayOffType"
                  style="width: 100%"
                >
                  <SelectOption value="SICK_LEAVE"> Sick Leave </SelectOption>
                  <SelectOption value="UNPAID_LEAVE">Unpaid Leave</SelectOption>
                  <SelectOption value="MATERNITY_LEAVE">
                    Maternity Leave
                  </SelectOption>
                  <SelectOption value="WEDDING_LEAVE"
                    >Wedding Leave</SelectOption
                  >
                  <SelectOption value="PAID_LEAVE"> Paid Leave </SelectOption>
                  <SelectOption value="PATERNITY_LEAVE"
                    >Paternity Leave</SelectOption
                  >
                  <SelectOption value="COMPASSIONATE_LEAVE"
                    >Compassionate Leave</SelectOption
                  >
                </Select>
              </FormItem>
            </div>
          </div>

          <div class="w-[48%]">
            <div class="">
              <label class="w-[15rem]"
                >Session Off <span class="text-red-600">&ast;</span></label
              >
              <FormItem name="sessionOff" class="w-full">
                <Select
                  v-model:value="formAbsence.sessionOff"
                  style="width: 100%"
                >
                  <SelectOption value="Morning"> Morning </SelectOption>
                  <SelectOption value="Afternoon"> Afternoon </SelectOption>
                  <SelectOption value="Fullday"> Full Day </SelectOption>
                </Select>
              </FormItem>
            </div>

            <div class="">
              <label class="w-[15rem]">
                Off day <span class="text-red-600">&ast;</span>
              </label>
              <FormItem name="offDay" class="w-full">
                <DatePicker
                  v-model:value="formAbsence.offDay"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
                  :disabledDate="disabledDate"
                />
              </FormItem>
            </div>

            <div class="">
              <label class="w-[15rem]"
                >Reason <span class="text-red-600">&ast;</span></label
              >
              <FormItem name="reason" class="w-full">
                <Textarea v-model:value="formAbsence.reason" autocomplete="off">
                </Textarea>
              </FormItem>
            </div>

            <div class="">
              <label class="w-[15rem]"
                >Note <span class="text-red-600">&ast;</span></label
              >
              <FormItem name="note" class="w-full">
                <Textarea
                  v-model:value="formAbsence.note"
                  autocomplete="off"
                  placeholder="Backup công việc"
                  :rows="4"
                >
                </Textarea>
              </FormItem>
            </div>
          </div>
        </div>

        <FormItem class="flex justify-center w-full">
          <Button html-type="submit" type="primary"> Save change </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
