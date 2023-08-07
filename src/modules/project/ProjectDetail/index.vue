<script lang="ts" setup>
import {
  UnwrapRef,
  computed,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import {
  Table,
  Select,
  Input,
  Button,
  Textarea,
  SelectOption,
  Slider,
  InputNumber,
  SelectProps,
  DatePicker,
  message,
  Form,
  FormItem,
  RangePicker,
} from "ant-design-vue";
import { PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { projectService, userService } from "@/services";
import type { Dayjs } from "dayjs";
import { cloneDeep, isEmpty, isEqual, map, size } from "lodash";

// ==== Data ==== //

const projectParams = ref<any>({
  id: 0,
  name: "",
  content: "",
  type: "COMPANY",
  priority: "LOW",
  customer: "",
  status: "NOT_STARTED",
  progress: 0,
  periodStart: "",
  periodEnd: "",
  note: "",
  originalEstimate: "",
  projectUserList: [],
  projectWorkList: [],
});

const columns = [
  {
    dataIndex: "add",
    width: "5%",
    key: "add",
  },
  {
    title: "User",
    dataIndex: "user",
    width: "250px",
    key: "user",
  },
  {
    title: "Department",
    dataIndex: "department",
    width: "250px",
    key: "department",
  },
  {
    title: "Effort",
    dataIndex: "effort",
    key: "effort",
  },

  {
    title: "Role",
    key: "role",
  },
  {
    dataIndex: "delete",
    width: "5%",
    key: "delete",
  },
];

const props = defineProps<{
  isType?: string;
  countProject: number;
  idProject: number;
}>();

const optionsDepartment = ref<SelectProps["options"]>([
  {
    value: 0,
    label: "Developer",
  },
  {
    value: 1,
    label: "QC/QA",
  },
  {
    value: 2,
    label: "Business Analyst",
  },
  {
    value: 3,
    label: "Product Manager",
  },
  {
    value: 4,
    label: "DevOps",
  },
  {
    value: 5,
    label: "Data Engineer",
  },
]);

const { isType, countProject, idProject } = toRefs(props);
import dayjs from "dayjs";
import { Rule } from "ant-design-vue/es/form";
const dateFormat = "YYYY/MM/DD";
const value4 = ref<[Dayjs, Dayjs]>([
  dayjs("2015/01/01", dateFormat),
  dayjs("2015/01/01", dateFormat),
]);
const userOptions = ref<any>([]);
const role = ref<boolean>(false);
const emit = defineEmits<{
  (e: "refreshProjects"): void;
}>();

// ==== Method ==== //
const onDelete = (idKey: number) => {
  projectParams.projectUserList = projectParams.projectUserList.filter(
    (item) => item.id !== idKey
  );
};

const handleAdd = () => {
  projectParams.value.projectUserList.push({
    id: size(projectParams.projectUserList),
    accountId: null,
    departmentId: null,
    roleId: "MEMBER",
    effort: 0,
  });
};

watch(countProject, (newX) => {
  if (formProjectRef.value) {
    formProjectRef.value.resetFields();
    formProjectRef.value.clearValidate();
  }

  if (isType?.value === "create") {
    resetReqParams();
  } else {
    detailProject(idProject.value);
  }
});

onMounted(() => {
  getAcc();
  if (formProjectRef.value) {
    formProjectRef.value.resetFields();
    formProjectRef.value.clearValidate();
  }
  if (isType?.value === "create") {
    resetReqParams();
  } else {
    detailProject(idProject.value);
  }

  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    const userInfo = JSON.parse(savedUser);
    role.value = userInfo.role === "MANAGER" ? true : false;
  }
});

async function getAcc() {
  const req = {
    pageIndex: 1,
    pageSize: 100,
  };

  const res = await userService.getLisrUser(req);

  const a = map(res.data.data, (item) => {
    return {
      value: item.id,
      label: item.fullName,
    };
  });

  userOptions.value = a;
}

function resetReqParams() {
  projectParams.value = {
    id: 0,
    name: "",
    content: "",
    type: "COMPANY",
    priority: "LOW",
    customer: "",
    status: "NOT_STARTED",
    progress: 0,
    periodStart: "",
    periodEnd: "",
    note: "",
    originalEstimate: "",
    projectUserList: [],
    projectWorkList: [],
  };

  if (formProjectRef.value) {
    formProjectRef.value.resetFields();
    formProjectRef.value.clearValidate();
  }
}
function onFinishProject() {
  console.log(isType?.value);

  if (isType?.value === "create") {
    createProject();
  } else {
    updateProject();
  }
}

async function createProject() {
  // delete projectParams.id;
  // return;

  const res = await projectService.createProject(projectParams.value);

  if (res.status === "SUCCESS") {
    message.success("Create project successfull");
    emit("refreshProjects");
  }
}

async function updateProject() {
  const res = await projectService.updateProject(projectParams.value);

  if (res.status === "SUCCESS") {
    message.success("Update project successfull");
    emit("refreshProjects");
  }
}

async function detailProject(id: number) {
  const res = await projectService.detailProject(id);

  if (res.status === "SUCCESS") {
    projectParams.value = cloneDeep(res.data);
  }
}

// Validate
import type { FormInstance } from "ant-design-vue";
import moment from "moment";

function compareDates(date1, date2) {
  if (new Date(date1) > new Date(date2)) {
    return false;
  }

  return true;
}

let checkDateStart = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please select date");
  } else {
    if (!compareDates(value, projectParams.value.periodEnd)) {
      return Promise.reject("Password at least one special character");
    }
    return Promise.resolve();
  }
};

const formProjectRef = ref<FormInstance>();

const rules: Record<string, Rule[]> = {
  name: [
    {
      message: "Please input project key",
      trigger: "change",
      required: true,
    },
  ],
  content: [
    {
      required: true,
      message: "Please input project name",
      trigger: "change",
    },
  ],
  periodStart: [{ validator: checkDateStart, trigger: "change" }],
  periodEnd: [
    {
      required: true,
      message: "Please select date ",
      trigger: "change",
    },
  ],
};

const isTypeCustomer = computed(() => {
  return projectParams.value.type === "PROJECT" ? true : false;
});

function handleGenerate() {
  const words = projectParams.value.content.split(" ");
  const initialLetters = words.map((word) => word.charAt(0).toUpperCase());
  const result = initialLetters.join("");
  projectParams.value.name = result;
}
</script>
<template>
  <Form
    ref="formProjectRef"
    :model="projectParams"
    name="normal_project"
    :rules="rules"
    @finish="onFinishProject()"
  >
    <div class="flex project__form">
      <div class="w-1/2 mr-3">
        <div class="mb-4">
          <label for=""> Name <span class="text-red-600">&ast;</span> </label>
          <FormItem class="mb-[2rem] mt-2" name="content">
            <Input
              v-model:value="projectParams.content"
              @input="handleGenerate()"
            />
          </FormItem>
        </div>

        <div class="flex justify-between mb-4">
          <div class="w-1/2 mr-5">
            <label for=""> Type </label>
            <Select ref="selectType" v-model:value="projectParams.type">
              <SelectOption value="COMPANY">Company</SelectOption>
              <SelectOption value="PROJECT">Project</SelectOption>
            </Select>
          </div>

          <div class="w-1/2">
            <label for="">Priority</label>
            <Select v-model:value="projectParams.priority">
              <SelectOption value="LOW">Low</SelectOption>
              <SelectOption value="MEDIUM">Medium</SelectOption>
              <SelectOption value="HIGH">High</SelectOption>
              <SelectOption value="URGENT">Urgen</SelectOption>
            </Select>
          </div>
        </div>

        <div class="flex justify-between w-full mb-4">
          <div class="w-1/2 mr-5">
            <label for="">Status</label>
            <Select v-model:value="projectParams.status">
              <SelectOption value="NOT_STARTED">Not Started</SelectOption>
              <SelectOption value="PENDING">Pending</SelectOption>
              <SelectOption value="PROCESSING">Processing</SelectOption>
              <SelectOption value="COMPLETED">Completed</SelectOption>
              <SelectOption value="CANCELED">Canceled</SelectOption>
            </Select>
          </div>

          <div class="w-1/2">
            <label for="">Progress</label>
            <div class="flex">
              <Slider
                v-model:value="projectParams.progress"
                :min="0"
                :max="100"
                class="w-full"
              />
              <InputNumber
                v-model:value="projectParams.progress"
                :min="0"
                :max="100"
                class="w-[8rem]"
              />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label for="">Description</label>
          <Textarea v-model:value="projectParams.note" :rows="5"></Textarea>
        </div>
      </div>

      <div class="w-1/2 ml-3">
        <div class="mb-4">
          <label for=""> Key <span class="text-red-600">&ast;</span> </label>
          <FormItem class="mb-[2rem] mt-2" name="name">
            <Input v-model:value="projectParams.name" />
          </FormItem>
        </div>

        <div class="mb-4">
          <label for="">Customer</label>
          <Input
            v-model:value="projectParams.customer"
            :disabled="!isTypeCustomer"
          />
        </div>

        <div class="mb-4">
          <label for=""
            >Period
            <span class="text-red-600">&ast;</span>
          </label>

          <div class="flex">
            <FormItem name="periodStart">
              <DatePicker
                v-model:value="projectParams.periodStart"
                value-format="YYYY-MM-DD"
              >
                <template #suffixIcon>
                  <img
                    src="@/assets/images/calender.png"
                    alt=""
                    class="calender__icon"
                  />
                </template>
              </DatePicker>
            </FormItem>

            <span class="mx-5">~</span>
            <FormItem name="periodEnd">
              <DatePicker
                v-model:value="projectParams.periodEnd"
                value-format="YYYY-MM-DD"
              >
                <template #suffixIcon>
                  <img
                    src="@/assets/images/calender.png"
                    alt=""
                    class="calender__icon"
                  />
                </template>
              </DatePicker>
            </FormItem>
          </div>
        </div>

        <div class="mb-4">
          <label for=""> Original Estimate </label>
          <Input v-model:value="projectParams.originalEstimate" />

          <p class="project__des">
            An estimate of how much work remains until this issue will be
            resolved. <br />
            The format of this is ' *w *d *h *m ' (representing weeks, days,
            hours and minutes - where * can be any number). <br />
            Examples: 4d, 5h 30m, 60m and 3w.
          </p>
        </div>
      </div>
    </div>

    <div class="project__user">
      <Table
        :data-source="projectParams.projectUserList"
        :columns="columns"
        :pagination="false"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'add'">
            <PlusSquareOutlined @click="handleAdd()" />
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'user'">
            <Select
              ref="select"
              v-model:value="record.accountId"
              :options="userOptions"
              class="w-[15rem]"
            >
            </Select>
          </template>

          <template v-else-if="column.key === 'department'">
            <Select
              ref="select"
              v-model:value="record.departmentId"
              :options="optionsDepartment"
            >
            </Select>
          </template>

          <template v-else-if="column.key === 'effort'">
            <Select ref="select" v-model:value="record.effort">
              <SelectOption value="25">25%</SelectOption>
              <SelectOption value="50">50%</SelectOption>
              <SelectOption value="75">75%</SelectOption>
              <SelectOption value="100">100%</SelectOption>
            </Select>
          </template>

          <template v-else-if="column.key === 'role'">
            <Select ref="select" v-model:value="record.roleId">
              <SelectOption value="LEADER">Leader</SelectOption>
              <SelectOption value="SUB">Sub Leader</SelectOption>
              <SelectOption value="MEMBER">Member</SelectOption>
            </Select>
          </template>

          <template v-else-if="column.key === 'delete'">
            <DeleteOutlined @click="onDelete(record.id)" />
          </template>
        </template>
      </Table>
    </div>

    <FormItem class="flex justify-center mb-3 mt-3">
      <div class="flex justify-center items-center">
        <Button html-type="submit" type="primary" v-if="isType === 'create'">
          Create Project
        </Button>
        <Button html-type="submit" type="primary" v-else>
          Update Project
        </Button>
      </div>
    </FormItem>
  </Form>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
