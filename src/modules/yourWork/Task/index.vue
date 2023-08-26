<script lang="ts" setup>
import {
  Ref,
  computed,
  createVNode,
  h,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import {
  Button,
  Progress,
  Modal,
  Input,
  Textarea,
  Select,
  SelectOption,
  FormItem,
  UploadProps,
  DatePicker,
  Table,
  Tag,
  message,
  Row,
  InputNumber,
  Col,
  Dropdown,
  Slider,
  Pagination,
  Form,
  Affix,
  Menu,
  MenuItem,
  MenuDivider,
  notification,
} from "ant-design-vue";
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  FilterOutlined,
  UserOutlined,
  CalendarOutlined,
  ForwardOutlined,
  SearchOutlined,
  CloseOutlined,
  CheckOutlined,
  DiffOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons-vue";
import type { IDataSource } from "@/components";
import {
  commonService,
  projectService,
  taskService,
  userService,
  yourworkService,
} from "@/services";
import {
  cloneDeep,
  map,
  size,
  isEmpty,
  filter,
  debounce,
  sortBy,
  union,
} from "lodash";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useProjectStore, visiableModal, issueStore } from "@/store";
import { TaskModal } from "@/components";
import { RouteName } from "@/shared/constants";
import moment from "moment";
import { Rule } from "ant-design-vue/es/form";

// ==== Data ==== //
const useProject = useProjectStore();
const useModal = visiableModal();
const useIssue = issueStore();

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
      title: "Task Code",
      dataIndex: "key",
      width: 60,
      fixed: "left",
    },
    {
      title: "Task",
      key: "task",
      dataIndex: "task",
      width: "250px",
    },
    {
      title: "Due date",
      key: "due",
      dataIndex: "due",
      width: "100px",
    },
    {
      title: "Assignee",
      key: "assignee",
      dataIndex: "assignee",
      width: "120px",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      width: "60px",
    },
    {
      title: "Assignor",
      key: "assignor",
      dataIndex: "assignor",
      width: "120px",
    },
    {
      title: "Process",
      key: "process",
      dataIndex: "process",
      width: "100px",
    },
  ],
});

const value = ref<string>("");
const userInfo = ref<any>({});
const userOptions = ref<any>([]);
const currentPage = ref(1);
const idProject = ref();
const typeTask = ref<boolean>(true);
const router = useRouter();
const keyProject = ref<any>("");
const statusProject = ref<string>("");
const isRoleManager = ref<boolean>(false);
const isTaskModal = ref(false);
const idTask = ref(0);
const isTypeTask = ref("");
const countTask = ref(0);
const on = ref(false);
const iTaskCode = ref("");
const isTask = ref<boolean>(false);
const value1 = ref();
const total = ref(1);

const dataList = ref([]);

// ==== Method ==== //
onMounted(() => {
  listTask();
  getProjectDetail(idProject.value);
  getProjectUser();

  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
    isRoleManager.value = userInfo.value.role === "MANAGER" ? true : false;
  }
});

watchEffect(() => {
  console.log(idProject.value);
  idProject.value = Number(router.currentRoute.value.params.id);
  const a = router.currentRoute.value.params.key;
  keyProject.value = a;
});

const reqListTask = ref({
  pageIndex: 1,
  pageSize: 100,
  projectId: idProject.value,
});

async function getProjectUser() {
  try {
    const req = {
      projectId: idProject.value,
    };
    const res = await projectService.getProjectUser(req);

    const a = map(res.data, (item) => {
      return {
        value: item.accountId,
        label: item.fullName,
      };
    });

    userOptions.value = a;
  } catch (err) {}
}

async function getProjectDetail(projectID: number) {
  try {
    const res = await projectService.detailProject(projectID);

    projectDetail.value = res.data;
    statusProject.value = res.data.status;
  } catch (err) {}
}

const isEditTasks = computed(() => {
  return statusProject.value === "PENDING" || statusProject.value === "CANCELED"
    ? false
    : true;
});

const isStatusCanceled = computed(() => {
  return statusProject.value === "CANCELED" ? false : true;
});

const convertCate = (status: string) => {
  if (status === "MOCKUP") {
    return "Mockup";
  }
  if (status === "DESIGN") {
    return "CR";
  }
};

watch(currentPage, (val) => {
  reqListTask.value.pageIndex = val;
  listTask();
});

async function listTask() {
  dataSource.loading = true;
  console.log(reqListTask.value);

  const res = await taskService.getTask(reqListTask.value).finally(() => {
    dataSource.loading = false;
  });

  if (res.status === "SUCCESS") {
    // Get done
    const tasksDone = filter(res.data.data, (item) => item.status === "DONE");
    const tasksDoneDue = sortBy(tasksDone, (item) => new Date(item.dueDate));

    // Get not done
    const tasksNotDone = filter(
      res.data.data,
      (item) => item.status !== "DONE"
    );
    const tasksNotDoneDue = sortBy(
      tasksNotDone,
      (item) => new Date(item.dueDate)
    ).reverse();

    dataSource.data = union(tasksNotDoneDue, tasksDoneDue);

    dataList.value = res.data.data;
    dataSource.pagination.totalPage = res.data.totalRecords;
    dataSource.pagination.page = res.data.pageIndex;
    total.value = res.data.totalRecords;
  }
}

async function deleteTask(id: number) {
  Modal.confirm({
    title: "Do you want to delete task?",
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {
      const res = await yourworkService.deleteTask(id);

      if (res.status === "SUCCESS") {
        message.success("Delete successful!");
        listTask();
      }
    },
    onCancel() {},
  });
}

function getTaskDetail(id: number) {
  idTask.value = id;
  isTypeTask.value = "detail";
  on.value = true;
  useModal.setTaskModal(on.value);
}

function openIssueOfTask(idTask: number) {
  useIssue.setTaskId(idTask);

  router.push({
    name: RouteName.ISSUE_TASK,
    params: { id: idTask },
  });
}

function openTaskModal() {
  const newKey = generateUniqueHRKey();
  iTaskCode.value = newKey;

  on.value = true;
  isTypeTask.value = "create";
  useModal.setTaskModal(on.value);
}

function generateUniqueHRKey() {
  const existingNumbers = dataSource.data.map((item) =>
    parseInt(item.taskCode.split("-")[1])
  );

  let maxNumber = 0;

  if (!isEmpty(dataSource.data)) {
    maxNumber = Math.max(...existingNumbers);
  }

  return `${keyProject.value}-${maxNumber + 1}`;
}

function handleClear() {
  value.value = "";
}

function convertDate(date: string) {
  if (date) {
    return moment(date).format("DD-MM-YYYY");
  }

  return "";
}

const isAssign = ref(false);
const isDue = ref(false);
const searchText = ref("");

function filterAssign() {
  isAssign.value = !isAssign.value;

  if (isAssign.value) {
    dataSource.data = filter(
      dataList.value,
      (item: any) => item.assignee === userInfo.value.fullname
    );
  } else {
    dataSource.data = dataList.value;
  }
}

function filterDue() {
  isDue.value = !isDue.value;
}

function filterAll() {
  if (isAssign.value === false && isDue.value === false) {
    dataSource.data = filter(dataList.value, (item: any) =>
      item.content.toLowerCase().includes(searchText.value)
    );
  }

  if (isAssign.value === true && isDue.value === false) {
    dataSource.data = filter(
      dataList.value,
      (item: any) =>
        item.content.toLowerCase().includes(searchText.value) &&
        item.assignee === userInfo.value.fullName
    );
  }

  if (isAssign.value === true && isDue.value === true) {
    dataSource.data = filter(
      dataList.value,
      (item: any) =>
        item.content.toLowerCase().includes(searchText.value) &&
        item.assignee === userInfo.value.fullName
    );
  }
}

watch(
  searchText,
  debounce(() => {
    filterAll();
  }, 300)
);

watch(isAssign, () => {
  // filterAll();
});

const rules: Record<string, Rule[]> = {
  content: [
    { required: true, message: "Please input task name", trigger: "change" },
  ],
};

function shortenText(text) {
  if (text.length <= 55) {
    return text;
  }

  const shortenedText = text.substring(0, 55 - 3) + " ...";
  return shortenedText;
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

function handleCloseModal() {
  listTask();
  isTaskModal.value = true;
  updateProgress();
}

// Xử lí progress
const projectDetail = ref<any>();

async function updateProgress() {
  const filterDone = filter(
    dataSource.data,
    (item) => item.status === "DONE"
  ).length;

  const progress = (filterDone / size(dataSource.data)) * 100;

  const processProject = parseInt(progress.toFixed(2));

  projectDetail.value.progress = processProject;

  const res = await projectService.updateProject(projectDetail.value);
}
</script>

<template>
  <div class="tasks">
    <!-- Profile -->
    <div class="py-[1rem] flex justify-between">
      <div class="flex items-center">
        <div class="project__search mr-5">
          <Input
            v-model:value="searchText"
            style="width: 300px"
            placeholder="Search ..."
          />
          <div class="project__icon">
            <SearchOutlined v-if="isEmpty(value)" class="text-[1.4rem]" />
            <CloseOutlined
              v-else
              @click="handleClear()"
              class="text-[1.4rem]"
            />
          </div>
        </div>

        <Dropdown :trigger="['click']">
          <Button class="btn__filter" @click.prevent>
            <FilterOutlined /> Filter
          </Button>

          <template #overlay>
            <div class="h-[35rem] bg-white filter_box">
              <div class="filter_box--title">Filters</div>
              <div class="filter_box--list" @click.stop>
                <div
                  class="filter_box--item justify-between"
                  @click="filterAssign()"
                >
                  <div>
                    <UserOutlined class="mr-4 font-bold" />
                    Assigned to me
                  </div>
                  <CheckOutlined
                    v-if="isAssign"
                    style="color: #209653; font-size: 1.4rem"
                  />
                </div>

                <div
                  class="filter_box--item justify-between"
                  @click="filterDue()"
                >
                  <div>
                    <CalendarOutlined class="mr-4" />
                    Due this week
                  </div>
                  <CheckOutlined
                    v-if="isDue"
                    style="color: #209653; font-size: 1.4rem"
                  />
                </div>

                <!-- <div class="filter_box--item" @click.stop>
                  <CalendarOutlined class="mr-4" />
                  Done
                </div> -->

                <div class="filter_box--line"></div>

                <div class="filter_box--date" @click.stop>
                  <div class="">
                    <div class="text-[#5e6c84] text-[1.1rem] font-[700]">
                      DATE RANGE
                    </div>

                    <div class="flex items-end px-1 mt-4">
                      <div class="w-1/2 flex flex-col">
                        <DatePicker placeholder="Start date">
                          <template #suffixIcon>
                            <img
                              src="@/assets/images/calender.png"
                              alt=""
                              class="calender__icon"
                            />
                          </template>
                        </DatePicker>
                      </div>

                      <div class="mx-[1rem] pb-[5px]">
                        <ForwardOutlined
                          style="font-size: 2rem; font-weight: 700"
                        />
                      </div>

                      <div class="w-1/2 flex flex-col">
                        <DatePicker placeholder="Due date">
                          <template #suffixIcon>
                            <img
                              src="@/assets/images/calender.png"
                              alt=""
                              class="calender__icon"
                            />
                          </template>
                        </DatePicker>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="filter_box--date">
                  <div class="text-[#5e6c84] text-[1.1rem] font-[700] mb-4">
                    CATEGORY
                  </div>

                  <div>
                    <Button size="small" class="mr-4">Mockup</Button>
                    <Button size="small">CR</Button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div v-if="isEditTasks && isRoleManager">
        <Button @click="openTaskModal()" type="primary">
          <PlusOutlined /> Create Task
        </Button>
      </div>
    </div>

    <div class="">
      <Table
        :columns="dataSource.columns"
        :data-source="dataSource.data"
        class="custom-table"
        :scroll="{ x: 1500, y: 480 }"
        :loading="dataSource.loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'key'">
            <div class="text-[#209653] font-[500]">{{ record.taskCode }}</div>
          </template>

          <template v-if="column.dataIndex === 'task'">
            <!-- <div class="cursor-pointer" @click="getTaskDetail(record.id)">
              <span class="text-[500]">
                {{ shortenText(record.content) }}
              </span>
            </div> -->
            <Dropdown :trigger="['click']">
              <span class="text-[500] cursor-pointer" @click.prevent>
                {{ shortenText(record.content) }}
              </span>
              <template #overlay>
                <Menu>
                  <MenuItem key="0" @click="getTaskDetail(record.id)">
                    Task Detail
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem key="3" @click="openIssueOfTask(record.id)">
                    View Issue of Task
                  </MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </template>

          <template v-if="column.dataIndex === 'category'">
            <Tag color="#F4F5F7" class="cursor-pointe">
              <span
                class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
              >
                {{ convertCate(record.category) }}
              </span>
            </Tag>
          </template>

          <template v-if="column.dataIndex === 'assignee'">
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full mr-3"
                src="@/assets/images/default-wg-member.jpeg"
                alt=""
              />
              <span>{{ record.assignee }}</span>
            </div>
          </template>

          <template v-if="column.dataIndex === 'assignor'">
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full mr-3"
                src="@/assets/images/default-wg-member.jpeg"
                alt=""
              />
              <span>{{ record.assignor }}</span>
            </div>
          </template>

          <template v-if="column.dataIndex === 'due'">
            <template v-if="record.status === 'DONE'">
              <Tag color="#F4F5F7" class="cursor-pointer">
                <span
                  class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
                >
                  {{ convertDate(record.dueDate) }}
                </span>
              </Tag>
            </template>

            <template v-else>
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
            </template>
          </template>

          <template v-if="column.dataIndex === 'process'">
            <Progress
              :percent="record.process"
              stroke-color="#2bc48a"
            ></Progress>
          </template>

          <template v-if="column.dataIndex === 'action'">
            <Select v-model:value="value1" class="w-full">
              <SelectOption value="NOT_STARTED">Not Started</SelectOption>
              <SelectOption value="PENDING">Pending</SelectOption>
              <SelectOption value="PROCESSING">Processing</SelectOption>
              <SelectOption value="COMPLETED">Completed</SelectOption>
              <SelectOption value="CANCELED">Canceled</SelectOption>
            </Select>
          </template>

          <template v-if="column.dataIndex === 'delete'">
            <div
              @click="deleteTask(record.id)"
              v-if="isStatusCanceled && isRoleManager"
            >
              <DeleteOutlined />
            </div>
          </template>
        </template>
      </Table>
    </div>

    <TaskModal
      :is-task-modal="isTaskModal"
      :id-task="idTask"
      :is-type-task="isTypeTask"
      :i-task-code="iTaskCode"
      @close-task-modal="handleCloseModal"
    ></TaskModal>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
