<script lang="ts" setup>
import { Ref, createVNode, onMounted, reactive, ref, watch } from "vue";
import {
  Select,
  SelectOption,
  Button,
  Table,
  Tag,
  Pagination,
  Progress,
  Empty,
} from "ant-design-vue";
import {
  PaperClipOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  BorderlessTableOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import {
  taskService,
  projectService,
  commonService,
  yourworkService,
  userService,
} from "@/services";
import { cloneDeep, map, size, sortBy } from "lodash";
import type { IDataSource } from "@/components";
import useEventBus from "@/eventBus";
import { TaskModal } from "@/components";
import { visiableModal } from "@/store";

// ==== Data ==== //
const { emitEvent } = useEventBus();
const useModal = visiableModal();

const isTaskModal = ref(false);
const idTask = ref(0);
const isTypeTask = ref("");
const countTask = ref(0);

const isTask = ref<boolean>(false);
const userInfo = ref<any>({});
const userOptions = ref<any>([]);
const dateFormat = "YYYY/MM/DD";
const iTaskCode = ref("");

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
      title: "Key",
      dataIndex: "key",
      width: 50,
      fixed: "left",
    },
    {
      title: "Task",
      key: "task",
      dataIndex: "task",
      width: "250px",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      width: "60px",
    },
    {
      title: "Assignee",
      key: "assignee",
      dataIndex: "assignee",
      width: "120px",
    },
    {
      title: "Due date",
      key: "due",
      dataIndex: "due",
      width: "100px",
    },
    {
      title: "Assignor",
      key: "assignor",
      dataIndex: "assignor",
      width: "120px",
    },
    {
      title: "Progress",
      key: "progress",
      dataIndex: "progress",
      width: "70px",
    },
  ],
});

const current = ref(2);

// ==== Method ==== //
onMounted(() => {
  yourProject();
  listTask();
  getAcc();

  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
    console.log(userInfo.value);
  }
});

function shortenText(text) {
  if (text.length <= 35) {
    return text;
  }

  const shortenedText = text.substring(0, 35 - 3) + " ...";
  return shortenedText;
}

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

// Current Project

const projects = ref<any>([]);

async function yourProject() {
  const res = await projectService.projectYourWork();

  if (res.status === "SUCCESS") {
    projects.value = res.data;
  }
}

// Task
const tasks = ref<any>([]);

async function listTask() {
  const req = {
    pageIndex: 1,
    pageSize: 100,
  };

  const res = await yourworkService.getListTask(req);

  if (res.status === "SUCCESS") {
    dataSource.data = sortBy(res.data.data, (item) => new Date(item.dueDate));

    dataSource.pagination.totalPage = res.data.totalPages;
    dataSource.pagination.page = res.data.pageIndex;
  }
}

const updateStatusTask = async (reqParams: any) => {
  await taskService.updateStatusTask(reqParams);
};

function handleOkTask() {
  isTask.value = false;
}

const convertTime = (date: string) => {
  return moment(date).format("DD-MM-YYYY");
};

const showAll = ref(false);

function toggleShowAll() {
  showAll.value = !showAll.value;
}

// Table

function convertStatus(status: string) {
  if (status === "NOT_STARTED") {
    return "NOT STARTED";
  }
  if (status === "PENDING") {
    return "PENDING";
  }
  if (status === "PROCESSING") {
    return "PROCESSING";
  }
  if (status === "COMPLETED") {
    return "COMPLETED";
  }
  if (status === "CANCELED") {
    return "CANCELED";
  }

  return "";
}

const value1 = ref();
const isSwitch = ref(false);

function switchStatus() {
  isSwitch.value = !isSwitch.value;
}

import { useRouter } from "vue-router";
import { RouteName } from "@/shared/constants";
import moment from "moment";

const router = useRouter();

function handleOpenTask(name: string, idProject: number, keyP: string) {
  const payload = {
    name: name,
    id: idProject,
  };
  emitEvent("NAME_PROJECT", payload);
  router.push({ name: RouteName.TASKS, params: { id: idProject, key: keyP } });
}

function checkDueDate(date: string) {
  const currentDate = new Date();
  const dateToCompare = new Date(date);

  // Kiểm tra xem currentDate có trước dateToCompare hay không
  if (currentDate < dateToCompare) {
    return true;
  }

  return false;
}

function convertDate(date: string) {
  if (date) {
    return moment(date).format("DD-MM-YYYY");
  }

  return "";
}

const convertCate = (status: string) => {
  if (status === "MOCKUP") {
    return "Mockup";
  }
  if (status === "DESIGN") {
    return "CR";
  }
};

function handleCloseModal() {
  isTaskModal.value = true;
}

function getTaskDetail(id: number) {
  idTask.value = id;
  isTypeTask.value = "detail";
  useModal.setTaskModal(true);
}
</script>

<template>
  <div class="yourwork">
    <div class="project">
      <div class="flex justify-between items-center mb-4">
        <h1 class="project__title">Projects</h1>
        <Button @click="toggleShowAll()" v-if="size(projects)">
          {{ showAll ? "Hide All" : "View All" }}
        </Button>
      </div>

      <!-- List project -->
      <div class="show-all-show-less" v-if="size(projects)">
        <div class="project__contain" :class="{ 'show-all': showAll }">
          <div
            class="project__me"
            v-for="item in projects"
            :key="'project' + item.id"
            @click="handleOpenTask(item.key, item.id, item.name)"
          >
            <div class="project__blur">
              <img
                src="https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project"
                alt=""
              />
            </div>
            <div class="project__des">
              <h3 class="project__des--name uppercase mb-2">{{ item.key }}</h3>
              <p>{{ item.type }}</p>

              <div class="project__link"></div>
            </div>
          </div>
        </div>
      </div>

      <Empty
        v-else
        image="https://cache.giaohangtietkiem.vn/d/0c1f1141680ddb65b6a88a8f23f21fea.png"
        :image-style="{
          height: '60px',
        }"
      >
        <template #description>
          <span class="text-[#B4B4B4]"> No project </span>
        </template>
      </Empty>
    </div>

    <div class="taskwork">
      <div>
        <h1 class="project__title">Tasks</h1>
      </div>
      <Table
        :columns="dataSource.columns"
        :data-source="dataSource.data"
        class="custom-table"
        :scroll="{ x: 1500, y: 480 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'key'">
            <div class="text-[#209653] font-[500]">{{ record.taskCode }}</div>
          </template>
          <template v-if="column.dataIndex === 'task'">
            <div class="cursor-pointer" @click="getTaskDetail(record.id)">
              <span class="text-[500]">
                {{ shortenText(record.content) }}
              </span>
            </div>
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

          <template v-if="column.dataIndex === 'progress'">
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
        </template>

        <template #emptyText>
          <div class="h-[30rem] flex items-center justify-center">
            <Empty
              image="https://cache.giaohangtietkiem.vn/d/0c1f1141680ddb65b6a88a8f23f21fea.png"
              :image-style="{
                height: '60px',
              }"
            >
              <template #description>
                <span class="text-[#B4B4B4]"> No data </span>
              </template>
            </Empty>
          </div>
        </template>
      </Table>
    </div>

    <TaskModal
      :is-task-modal="isTaskModal"
      :id-task="idTask"
      :is-type-task="isTypeTask"
      :count-task="countTask"
      :i-task-code="iTaskCode"
      @close-task-modal="handleCloseModal"
    ></TaskModal>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
