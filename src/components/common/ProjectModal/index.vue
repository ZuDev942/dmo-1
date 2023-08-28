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
  Tooltip,
  Progress,
  Spin,
  SkeletonButton,
} from "ant-design-vue";
import {
  PlusSquareOutlined,
  DeleteOutlined,
  TeamOutlined,
  AuditOutlined,
  InfoOutlined,
} from "@ant-design/icons-vue";
import { projectService, userService } from "@/services";
import type { Dayjs } from "dayjs";
import { Rule } from "ant-design-vue/es/form";
import {
  cloneDeep,
  filter,
  findIndex,
  forEach,
  isEmpty,
  isEqual,
  isError,
  map,
  pick,
  size,
} from "lodash";

// ==== Data ==== //
const props = defineProps<{
  isProjectModal?: boolean;
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
});

const columns = [
  {
    dataIndex: "add",
    width: "5%",
    key: "add",
  },
  {
    title: "Staff",
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
const isHide = ref<boolean>(false);
const isNotstarted = ref<boolean>(false);
const isProgressFull = ref<boolean>(false);
const isLoadProject = ref<boolean>(false);
const isLoadDetail = ref<boolean>(false);
const delayTime = 500;

// ==== Method ==== //
function handleOk() {
  userOptions.value = map(userOptions.value, (item) => {
    return {
      ...item,
      disabled: false,
    };
  });
  emit("closeProjectModal");
}

function findIndexUser(accountId: number) {
  return findIndex(userOptions.value, (item: any) => item.value === accountId);
}

const onDelete = (idKey: number, accountId: number) => {
  projectParams.value.projectUserList =
    projectParams.value.projectUserList.filter((item) => item.id !== idKey);

  if (accountId) {
    userOptions.value[findIndexUser(accountId)].disabled = false;
  }
};

const filterOption = (input: string, option: any) => {
  console.log(option.label.toLowerCase());
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

function handleChangeUser(user: any, index: number, accountId: number) {
  if (accountId) {
    userOptions.value[findIndexUser(accountId)].disabled = true;
  }

  const userSelected = filter(
    originListUser.value,
    (item: any) => item.id === user.accountId
  );

  const pickObject = pick(userSelected[0], ["fullName", "position", "id"]);

  projectParams.value.projectUserList[index].accountId = pickObject.id;
  projectParams.value.projectUserList[index].departmentId = pickObject.position;
  projectParams.value.projectUserList[index].fullName = pickObject.fullName;
}

const handleAdd = () => {
  projectParams.value.projectUserList.push({
    id: size(projectParams.value.projectUserList) + 1,
    accountId: null,
    fullName: "",
    departmentId: null,
    departmentName: 0,
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
const isManager = ref(false);

onMounted(() => {
  getAcc();
  if (formProjectRef.value) {
    formProjectRef.value.resetFields();
    formProjectRef.value.clearValidate();
  }

  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    const userInfo = JSON.parse(savedUser);
    role.value = userInfo.role === "MANAGER" ? true : false;
  }
});

const originListUser = ref<any>([]);
const infoManager = ref<any>({});

async function getAcc() {
  const req = {
    pageIndex: 1,
    pageSize: 100,
  };

  const res = await userService.getLisrUser(req);

  const filterUser = filter(
    res.data.data,
    (item) => item.role !== "MANAGER" && item.role !== "ADMIN"
  );

  originListUser.value = filterUser;

  const a = map(filterUser, (item) => {
    return {
      value: item.id,
      label: item.id + " - " + item.fullName,
      disabled: false,
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
  };

  if (formProjectRef.value) {
    formProjectRef.value.resetFields();
    formProjectRef.value.clearValidate();
  }

  isSelectStatus.value = true;
  isErrorDate.value = false;
  isErrorEnd.value = false;
  messageError.value = "";
}

function disabledDateStart(current) {
  const set = new Date(projectParams.value.periodEnd);
  set.setHours(0, 0, 0, 0);

  return current && current.valueOf() > set;
}

function handleChangePeriodStart() {
  isErrorDate.value = false;
}

function handleChangePeriodEnd() {
  isErrorEnd.value = false;
}

function onFinishProject() {
  if (projectParams.value.status !== "NOT_STARTED") {
    if (isEmpty(projectParams.value.periodStart)) {
      isErrorDate.value = true;
      messageError.value = "Please select period start";
      return;
    }

    if (isEmpty(projectParams.value.periodEnd)) {
      isErrorEnd.value = true;
      messageError.value = "Please select period end";
      return;
    }
  }

  if (isTypeProject?.value === "create") {
    createProject();
  } else {
    updateProject();
  }
}

async function createProject() {
  isLoadProject.value = true;

  const filterManager = {
    id: 111,
    accountId: 7,
    fullName: "Vũ Văn Đạt",
    departmentId: 1,
    departmentName: 0,
    roleId: "LEADER",
    effort: 0,
  };

  projectParams.value.projectUserList.push(filterManager);

  const res = await projectService
    .createProject(projectParams.value)
    .finally(() => {
      isLoadProject.value = false;
    });

  if (res.status === "SUCCESS") {
    message.success("Create project successfull");
    emit("refreshProjects");
  }
}

async function updateProject() {
  isLoadProject.value = true;

  const filterManager = {
    id: 111,
    accountId: 7,
    fullName: "Vũ Văn Đạt",
    departmentId: 1,
    departmentName: 0,
    roleId: "LEADER",
    effort: 0,
  };

  projectParams.value.projectUserList.push(filterManager);

  const res = await projectService
    .updateProject(projectParams.value)
    .finally(() => {
      isLoadProject.value = false;
    });

  if (res.status === "SUCCESS") {
    message.success("Update project successfull");
    emit("refreshProjects");
  }
}

async function detailProject(id: number) {
  isErrorDate.value = false;
  isErrorEnd.value = false;
  isLoadDetail.value = true;

  const res = await projectService.detailProject(id).finally(() => {
    isLoadDetail.value = false;
  });

  if (res.status === "SUCCESS") {
    projectParams.value = cloneDeep(res.data);

    projectParams.value.projectUserList = filter(
      projectParams.value.projectUserList,
      (item) => item.accountId !== 7
    );

    if (!isEmpty(projectParams.value.projectUserList)) {
      forEach(userOptions.value, (item1, index) => {
        forEach(projectParams.value.projectUserList, (item2) => {
          if (item1.value === item2.accountId) {
            userOptions.value[index].disabled = true;
          }
        });
      });
    }

    if (projectParams.value.progress === null) {
      projectParams.value.progress = 0;
    }

    // Nếu trạng thái project -> khác not started
    isNotstarted.value =
      projectParams.value.status === "NOT_STARTED" ? true : false;

    if (projectParams.value.status !== "NOT_STARTED") {
      isSelectStatus.value = false;
      isProgress.value = true;
    } else {
      isSelectStatus.value = true;
      isProgress.value = false;
    }

    // Nếu trạng thái -> 100%
    if (projectParams.value.progress === 100) {
      isProgressFull.value = true;
    }

    // Nếu status là canceled
    if (projectParams.value.status === "CANCELED") {
      isHide.value = true;
    } else {
      isHide.value = false;
    }

    console.log(projectParams.value);
  }
}

// Validate
import type { FormInstance } from "ant-design-vue";

function hasSpecialCharacters(inputString) {
  const pattern = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;
  return pattern.test(inputString);
}

let checkKey = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input project key");
  } else {
    if (hasSpecialCharacters(value)) {
      return Promise.reject(
        "Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters."
      );
    }
    return Promise.resolve();
  }
};

let checkName = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("Please input project name");
  } else {
    if (hasSpecialCharacters(value)) {
      return Promise.reject(
        "The project name cannot contain special characters"
      );
    }
    return Promise.resolve();
  }
};

const formProjectRef = ref<FormInstance>();

const rules: Record<string, Rule[]> = {
  name: [{ validator: checkKey, trigger: "change" }],
  content: [{ validator: checkName, trigger: "change" }],
};

function capitalizeEachWord(str: string): string {
  return str.toLowerCase().replace(/(?:^|\s)\S/g, (a) => {
    return a.toUpperCase();
  });
}

watch(
  projectParams,
  (newValue) => {
    projectParams.value.content = capitalizeEachWord(
      projectParams.value.content
    );
  },
  {
    deep: true,
  }
);

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
const isSelectStatus = ref(true);
const isProgress = ref(false);

function handleSelectStatus(status: any) {
  if (status === "NOT_STARTED") {
    isSelectStatus.value = true;
    isProgress.value = false;
    isErrorDate.value = false;
    isErrorEnd.value = false;
  } else {
    isSelectStatus.value = false;
    isProgress.value = true;
  }
}

//
const isErrorDate = ref<boolean>(false);
const isErrorEnd = ref<boolean>(false);
const messageError = ref<string>("");

function handleChangeStart() {
  if (
    new Date(projectParams.value.periodStart) >
    new Date(projectParams.value.periodEnd)
  ) {
    isErrorDate.value = true;
    messageError.value = "The start date cannot be greater than the end date";
  } else {
    isErrorDate.value = false;
  }

  return true;
}

const isCheckPeriodEnd = ref(false);

function handleClickEnd() {
  if (!isEmpty(projectParams.value.periodStart)) {
    isCheckPeriodEnd.value = true;
  } else {
    isCheckPeriodEnd.value = false;
  }
}

function handleChangeEnd() {
  isCheckPeriodEnd.value = false;
  if (isEmpty(projectParams.value.periodStart)) {
    projectParams.value.periodEnd = "";
    isErrorEnd.value = true;
    messageError.value = "Please select period start date";
    return;
  }

  isErrorDate.value = false;
}

function handleBlurEnd() {
  console.log("e");
  isCheckPeriodEnd.value = false;
}

function disabledDate(current) {
  const set = new Date(projectParams.value.periodStart);
  set.setHours(0, 0, 0, 0);

  return current && current.valueOf() < set;
}

function handleBlur() {
  console.log("a");
}

function handleFocus(accountId: number) {
  console.log("e", accountId);
}
</script>
<template>
  <Modal
    v-model:open="isProjectModal"
    :title="isTypeProject === 'create' ? 'Create' : 'Detail'"
    :width="'800px'"
    @ok="handleOk"
    @cancel="handleOk"
    :footer="null"
  >
    <Spin :spinning="isLoadProject" :delay="delayTime">
      <Form
        ref="formProjectRef"
        :model="projectParams"
        name="normal_project"
        :rules="rules"
        @finish="onFinishProject()"
        class="project__con"
      >
        <div class="flex project__form">
          <div class="w-1/2 mr-3">
            <div class="mb-4">
              <label for="">
                Name <span class="text-red-600">&ast;</span>
              </label>
              <FormItem class="mb-[2rem] mt-2" name="content">
                <SkeletonButton active :block="true" v-if="isLoadDetail" />
                <Input v-model:value="projectParams.content" v-else />
              </FormItem>
            </div>

            <div class="flex justify-between mb-4">
              <div class="w-1/2 mr-5">
                <label for=""> Type </label>
                <SkeletonButton active :block="true" v-if="isLoadDetail" />
                <Select
                  v-else
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
                <SkeletonButton active :block="true" v-if="isLoadDetail" />
                <Input
                  v-else
                  v-model:value="projectParams.customer"
                  :disabled="!isTypeCustomer"
                />
              </div>
            </div>

            <div class="mb-4">
              <label for="">Description</label>
              <SkeletonButton
                active
                :block="true"
                v-if="isLoadDetail"
                class="sk_textarea"
              />

              <Textarea
                v-else
                v-model:value="projectParams.note"
                :rows="5"
                placeholder="Description of the project"
              ></Textarea>
            </div>
          </div>

          <div class="w-1/2 ml-3">
            <div class="mb-4">
              <div
                class="flex text-[#44546f] text-[1.3rem] font-[500] items-center mb-4"
              >
                <span class="mr-2">Key</span>
                <Tooltip>
                  <template #title>
                    Choose a descriptive prefix for your project’s issue keys to
                    recognize work from this project.
                  </template>
                  <span class="project__key">
                    <InfoOutlined />
                  </span>
                </Tooltip>
                <span class="text-red-600">&ast;</span>
              </div>
              <FormItem class="mb-[2rem] mt-2" name="name">
                <SkeletonButton active :block="true" v-if="isLoadDetail" />
                <Input
                  v-else
                  v-model:value="projectParams.name"
                  @input="handleChaneKey"
                />
              </FormItem>
            </div>

            <div class="flex mb-4">
              <div class="w-1/2 mr-5">
                <label for="">Priority</label>
                <SkeletonButton active :block="true" v-if="isLoadDetail" />
                <Select v-model:value="projectParams.priority" v-else>
                  <SelectOption value="LOW">Low</SelectOption>
                  <SelectOption value="MEDIUM">Medium</SelectOption>
                  <SelectOption value="HIGH">High</SelectOption>
                  <SelectOption value="URGENT">Urgen</SelectOption>
                </Select>
              </div>

              <div class="w-1/2">
                <label for="">Status</label>
                <SkeletonButton active :block="true" v-if="isLoadDetail" />
                <Select
                  v-else
                  ref="statusRef"
                  v-model:value="projectParams.status"
                  @change="handleSelectStatus"
                  :disabled="isHide"
                >
                  <template v-if="isTypeProject === 'create'">
                    <SelectOption value="NOT_STARTED">Not Started</SelectOption>
                    <!-- <SelectOption value="PENDING">Pending</SelectOption> -->
                    <!-- <SelectOption value="PROCESSING">Processing</SelectOption> -->
                  </template>

                  <template v-else>
                    <template v-if="!isNotstarted">
                      <SelectOption value="PENDING">Pending</SelectOption>
                      <SelectOption value="PROCESSING">Processing</SelectOption>
                      <SelectOption
                        value="COMPLETED"
                        :disabled="!isProgressFull"
                        >Completed</SelectOption
                      >
                      <SelectOption value="CANCELED">Canceled</SelectOption>
                    </template>
                    <template v-else>
                      <SelectOption value="NOT_STARTED"
                        >Not Started</SelectOption
                      >
                      <SelectOption value="PENDING">Pending</SelectOption>
                      <SelectOption value="PROCESSING">Processing</SelectOption>
                      <SelectOption
                        value="COMPLETED"
                        :disabled="!isProgressFull"
                        >Completed</SelectOption
                      >
                      <SelectOption value="CANCELED">Canceled</SelectOption>
                    </template>
                  </template>
                </Select>
              </div>
            </div>

            <div class="flex justify-between mb-4">
              <div class="w-[48%]">
                <label for="">
                  Period Start
                  <span class="text-red-600" v-if="!isSelectStatus">&ast;</span>
                </label>
                <FormItem name="periodStart">
                  <SkeletonButton active :block="true" v-if="isLoadDetail" />
                  <DatePicker
                    v-else
                    v-model:value="projectParams.periodStart"
                    value-format="YYYY-MM-DD"
                    class="w-full"
                    placeholder="None"
                    @change="handleChangePeriodStart"
                  >
                    <template #suffixIcon>
                      <img
                        src="@/assets/images/calender.png"
                        alt=""
                        class="calender__icon"
                      />
                    </template>
                  </DatePicker>
                  <div class="error" v-if="isErrorDate">{{ messageError }}</div>
                  <div class="error" v-if="isErrorEnd">{{ messageError }}</div>
                </FormItem>
              </div>

              <div class="w-[48%]">
                <label for="">
                  Period End
                  <span class="text-red-600" v-if="!isSelectStatus">&ast;</span>
                </label>
                <FormItem name="periodEnd" class="w-full">
                  <SkeletonButton active :block="true" v-if="isLoadDetail" />
                  <DatePicker
                    v-else
                    v-model:value="projectParams.periodEnd"
                    value-format="YYYY-MM-DD"
                    class="w-full"
                    placeholder="None"
                    :disabledDate="disabledDate"
                    @change="handleChangePeriodEnd"
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

            <div class="" v-if="!isSelectStatus">
              <label for="">Progress</label>
              <Progress
                :stroke-color="{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }"
                :percent="projectParams.progress"
                class="w-[97%]"
              ></Progress>
            </div>
          </div>
        </div>

        <div class="text-[#44546f] text-[1.3rem] font-[500]">
          Member join to project
        </div>

        <div class="project__user">
          <Table
            :data-source="projectParams.projectUserList"
            :columns="columns"
            :pagination="false"
          >
            <template #headerCell="{ column }">
              <template v-if="column.key === 'add'">
                <PlusSquareOutlined
                  @click="handleAdd()"
                  v-if="!isHide && role"
                />
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
                  @change="handleChangeUser(record, index, record.accountId)"
                  @focus="handleFocus(record.accountId)"
                  @blur="handleBlur"
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
                  <template #suffixIcon></template>
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
                  <SelectOption value="SUB_LEADER">Sub Leader</SelectOption>
                  <SelectOption value="MEMBER">Member</SelectOption>
                </Select>
              </template>

              <template v-else-if="column.key === 'delete'">
                <DeleteOutlined
                  @click="onDelete(record.id, record.accountId)"
                  v-if="!isHide && role"
                />
              </template>
            </template>
          </Table>
        </div>

        <FormItem
          class="flex justify-center mb-3 mt-3 project__bot"
          v-if="!isHide && role"
        >
          <div
            class="flex justify-center items-center w-full"
            v-if="!isHide && role"
          >
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
    </Spin>
  </Modal>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
