<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from "vue";
import {
  Table,
  Select,
  Input,
  Button,
  Textarea,
  SelectOption,
  SelectProps,
  DatePicker,
  message,
  Form,
  FormItem,
  Modal,
} from "ant-design-vue";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  TeamOutlined,
  AuditOutlined,
} from "@ant-design/icons-vue";
import { projectService, userService } from "@/services";
import type { Dayjs } from "dayjs";
import { Rule } from "ant-design-vue/es/form";
import { cloneDeep, filter, isEmpty, isEqual, map, size } from "lodash";

// ==== Data ==== //
const props = defineProps<{
  isProjectModal: boolean;
  idProject: number;
  isTypeProject?: string;
  countProject: number;
}>();

const { isProjectModal, idProject, isTypeProject, countProject } =
  toRefs(props);

const emit = defineEmits<{
  (e: "closeProjectModal"): void;
  (e: "refreshProjects"): void;
}>();

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
    width: 250,
    key: "user",
  },
  {
    title: "Position",
    dataIndex: "department",
    width: 150,
    key: "department",
  },
  // {
  //   title: "Effort",
  //   dataIndex: "effort",
  //   key: "effort",
  // },

  {
    title: "Role",
    key: "role",
    width: 100,
  },
  {
    dataIndex: "delete",
    width: "5%",
    key: "delete",
  },
];

const optionsDepartment = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "Developer",
  },
  {
    value: 2,
    label: "Tester",
  },
  {
    value: 3,
    label: "Comtor",
  },
  {
    value: 4,
    label: "HR",
  },
  {
    value: 5,
    label: "BrSE",
  },
]);

const userOptions = ref<any>([]);
const role = ref<boolean>(false);

// ==== Method ==== //
function handleOk() {
  emit("closeProjectModal");
}

// ==== Method ==== //
const onDelete = (idKey: number) => {
  projectParams.value.projectUserList =
    projectParams.value.projectUserList.filter((item) => item.id !== idKey);
};

const filterOption = (input: string, option: any) => {
  console.log(option.label.toLowerCase());
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

function handleChangeUser(value: any, index: number) {
  const userSelected = filter(
    originListUser.value,
    (item: any) => item.id === value
  );

  projectParams.value.projectUserList[index].departmentId = 1;
}

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

  if (isTypeProject?.value === "create") {
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
  if (isTypeProject?.value === "create") {
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

const originListUser = ref([]);

async function getAcc() {
  const req = {
    pageIndex: 1,
    pageSize: 100,
  };

  const res = await userService.getLisrUser(req);

  originListUser.value = res.data.data;
  const a = map(res.data.data, (item) => {
    return {
      value: item.id,
      label: item.id + " - " + item.fullName,
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
  if (isTypeProject?.value === "create") {
    createProject();
  } else {
    updateProject();
  }
}

async function createProject() {
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

function compareDates(date1, date2) {
  if (new Date(date1) > new Date(date2)) {
    return false;
  }

  return true;
}

function compareDatesEnd(date1, date2) {
  if (new Date(date1) < new Date(date2)) {
    return false;
  }

  return true;
}

let checkDateStart = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please select date");
  } else {
    if (!compareDates(value, projectParams.value.periodEnd)) {
      return Promise.reject(
        "The start date cannot be greater than the end date"
      );
    }
    return Promise.resolve();
  }
};

let checkDateEnd = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please select date");
  } else {
    if (!compareDatesEnd(value, projectParams.value.periodStart)) {
      return Promise.reject(
        "The end date must not be less than the start date"
      );
    }
    // if (formProjectRef.value) {
    //   formProjectRef.value.resetFields();
    //   formProjectRef.value.clearValidate();
    // }

    console.log(formProjectRef.value);

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
      validator: checkDateEnd,
      trigger: "change",
    },
  ],
};

const isTypeCustomer = computed(() => {
  return projectParams.value.type === "PROJECT" ? true : false;
});

function handleChangeType() {
  if (projectParams.value.type === "COMPANY") {
    projectParams.value.customer = "";
  }
}

function handleChaneKey(event: Event) {
  const target = event.target as HTMLInputElement;
  projectParams.value.name = target.value.toUpperCase();
}
</script>
<template>
  <Modal
    v-model:open="isProjectModal"
    :title="isTypeProject"
    :width="'800px'"
    @ok="handleOk"
    @cancel="handleOk"
  >
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
              <Input v-model:value="projectParams.content" />
            </FormItem>
          </div>

          <div class="flex justify-between mb-4">
            <div class="w-1/2 mr-5">
              <label for=""> Type </label>
              <Select
                ref="selectType"
                v-model:value="projectParams.type"
                @change="handleChangeType"
              >
                <SelectOption value="COMPANY">
                  <div class="flex items-center">
                    <div class="select__icon select__company">
                      <AuditOutlined style="color: #0052cc" />
                    </div>
                    Company
                  </div>
                </SelectOption>
                <SelectOption value="PROJECT">
                  <div class="flex items-center">
                    <div class="select__icon select__project">
                      <TeamOutlined style="color: #5243aa" />
                    </div>
                    Project
                  </div>
                </SelectOption>
              </Select>
            </div>

            <div class="w-1/2">
              <label for="">Customer</label>
              <Input
                v-model:value="projectParams.customer"
                :disabled="!isTypeCustomer"
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="">Description</label>
            <Textarea
              v-model:value="projectParams.note"
              :rows="5"
              placeholder="Description of the project"
            ></Textarea>
          </div>
        </div>

        <div class="w-1/2 ml-3">
          <div class="mb-4">
            <label for=""> Key <span class="text-red-600">&ast;</span> </label>
            <FormItem class="mb-[2rem] mt-2" name="name">
              <Input
                v-model:value="projectParams.name"
                @input="handleChaneKey"
              />
            </FormItem>
          </div>

          <div class="flex mb-4">
            <div class="w-1/2 mr-5">
              <label for="">Priority</label>
              <Select v-model:value="projectParams.priority">
                <SelectOption value="LOW">Low</SelectOption>
                <SelectOption value="MEDIUM">Medium</SelectOption>
                <SelectOption value="HIGH">High</SelectOption>
                <SelectOption value="URGENT">Urgen</SelectOption>
              </Select>
            </div>

            <div class="w-1/2">
              <label for="">Status</label>
              <Select
                v-model:value="projectParams.status"
                v-if="isTypeProject === 'create'"
              >
                <SelectOption value="NOT_STARTED">Not Started</SelectOption>
                <SelectOption value="PENDING">Pending</SelectOption>
                <SelectOption value="PROCESSING">Processing</SelectOption>
              </Select>
              <Select v-model:value="projectParams.status" v-else>
                <SelectOption value="NOT_STARTED">Not Started</SelectOption>
                <SelectOption value="PENDING">Pending</SelectOption>
                <SelectOption value="PROCESSING">Processing</SelectOption>
                <SelectOption value="COMPLETED">Completed</SelectOption>
                <SelectOption value="CANCELED">Canceled</SelectOption>
              </Select>
            </div>
          </div>

          <!-- <div class="flex mb-4"> -->
          <div>
            <label for="">
              Start date
              <span class="text-red-600">&ast;</span>
            </label>
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
          </div>

          <div class="">
            <label for="">
              Plan end
              <span class="text-red-600">&ast;</span>
            </label>
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
          <!-- </div> -->
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

          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'add'">
              {{ index + 1 }}
            </template>

            <template v-if="column.key === 'user'">
              <Select
                v-model:value="record.accountId"
                show-search
                placeholder="Select a person"
                class="w-[15rem]"
                :options="userOptions"
                :filter-option="filterOption"
                @change="handleChangeUser(record.accountId, index)"
              >
              </Select>
            </template>

            <template v-else-if="column.key === 'department'">
              <Select
                ref="select"
                v-model:value="record.departmentId"
                :options="optionsDepartment"
                :disabled="true"
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
          <Button
            html-type="submit"
            type="primary"
            v-if="isTypeProject === 'create'"
          >
            Create Project
          </Button>
          <Button html-type="submit" type="primary" v-else>
            Update Project
          </Button>
        </div>
      </FormItem>
    </Form>
    <template #footer> </template>
  </Modal>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
