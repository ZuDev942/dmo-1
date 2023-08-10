<script lang="ts" setup>
import { Ref, createVNode, onMounted, reactive, ref, watch } from "vue";
import {
  Select,
  SelectOption,
  Button,
  Table,
  Tag,
  Pagination,
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
import { cloneDeep, map, size } from "lodash";
import type { IDataSource } from "@/components";
import useEventBus from "@/eventBus";

// ==== Data ==== //
const { emitEvent } = useEventBus();
const taskDetail = ref({
  id: 0,
  projectId: 0,
  priority: "LOW",
  content: "",
  taskCode: "",
  workCd: "",
  status: "NOT_STARTED",
  assigneeId: 0,
  assginorId: 0,
  effort: 0,
  startDate: "",
  deadLine: "",
  process: 0,
  actualStartDate: "",
  actualEndDate: "",
  sprint: 0,
  parentId: 0,
  workType: "CODING",
  category: "MOCKUP",
  description: "",
  taskAttachmentList: [
    {
      fileAttachUrl: "",
    },
  ],
  taskActivityList: [
    {
      content: "",
    },
  ],
});

const isTask = ref<boolean>(false);
const userInfo = ref<any>({});
const userOptions = ref<any>([]);
const dateFormat = "YYYY/MM/DD";

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
      title: "Status",
      key: "status",
      dataIndex: "status",
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
    dataSource.data = res.data.data;
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

async function getTaskDetail(id: number) {
  isTask.value = true;

  const res = await taskService.taskDetail(id);

  if (res.status === "SUCCESS") {
    const data = res.data;
    taskDetail.value = cloneDeep(data);
    taskDetail.value.projectId = data.projectDto.projectId;
  }
}

const convertTime = (date: string) => {
  return moment(date).format("DD-MM-YYYY");
};

// Upload file
const file: Ref<File | null | undefined> = ref(null);

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.[0];

  if (!file.value) return;

  try {
    const formData = new FormData();
    formData.append("file", file.value);

    const res = await commonService.uploadFile(formData);

    if (res.status === "SUCCESS") {
      const urlList = {
        fileAttachUrl: res.data.url,
      };
      taskDetail.value.taskAttachmentList.push(urlList);
    }
  } catch (error) {
    console.error(error);
  }
};

// Content editor
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import moment from "moment";

const editorContent = ref<string>("");
const isEditor = ref(false);

function handleEditor() {
  isEditor.value = true;
}

function handleSaveActivity() {
  isEditor.value = false;

  taskDetail.value.taskActivityList.push({
    content: editorContent.value,
  });

  editorContent.value = "";
}

function handleCancelActivity() {
  isEditor.value = false;
  editorContent.value = "";
}

const isShowComment = ref(true);

function showAllComment() {}

function showComment() {}

// Update Task
const action = ref("Action");

const onFinishChange = async () => {
  await taskService.updateTask(taskDetail.value);
  isTask.value = false;
  listTask();
};

async function handleSelectAction(record: any) {
  const req = {
    id: record.id,
    progress: record.process,
    status: action.value,
  };

  const res = await taskService.updateStatusTask(req);

  action.value = "Action";

  listTask();
}

function handleDeleteActive(index: number) {
  taskDetail.value.taskActivityList.splice(index, 1);
}
//
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

const router = useRouter();

function handleOpenTask(name: string, idProject: number, keyP: string) {
  const payload = {
    name: name,
    id: idProject,
  };
  emitEvent("NAME_PROJECT", payload);
  router.push({ name: RouteName.TASKS, params: { id: idProject, key: keyP } });
}

function handleDeleteAttach(index: number) {
  taskDetail.value.taskAttachmentList.splice(index, 1);
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
</script>

<template>
  <div class="yourwork">
    <div class="project">
      <div class="flex justify-between items-center mb-4">
        <h1 class="project__title">Projects</h1>
        <Button @click="toggleShowAll()" class="">
          {{ showAll ? "Hide All" : "View All" }}
        </Button>
      </div>

      <!-- List project -->
      <div class="show-all-show-less">
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

          <template v-if="column.dataIndex === 'status'">
            <Tag
              v-if="record.projectStatus === 'NOT_STARTED'"
              color="#DFE1E6"
              class="cursor-pointer text-black"
            >
              <span
                class="cursor-pointer text-[#44546f] font-[700] text-[1.1rem]"
              >
                {{ convertStatus(record.projectStatus) }}
              </span>
            </Tag>

            <Tag
              v-else-if="record.projectStatus === 'PENDING'"
              color="#EBF4FF"
              class="cursor-pointer text-black"
            >
              <span
                class="cursor-pointer text-[#8eb4ea] font-[700] text-[1.1rem]"
              >
                {{ convertStatus(record.projectStatus) }}
              </span>
            </Tag>

            <Tag
              v-else-if="record.projectStatus === 'COMPLETED'"
              color="#FFF1EE"
              class="cursor-pointer"
            >
              <span
                class="cursor-pointer text-[#FFB7A0] font-[700] text-[1.1rem]"
              >
                {{ convertStatus(record.projectStatus) }}
              </span>
            </Tag>

            <Tag
              v-else-if="record.projectStatus === 'PROCESSING'"
              color="#F0EEFB"
              class="cursor-pointer"
            >
              <span
                class="cursor-pointer text-[#897ec1] font-[700] text-[1.1rem]"
              >
                {{ convertStatus(record.projectStatus) }}
              </span>
            </Tag>
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
      </Table>
    </div>
    <!-- <div class="paging flex justify-end">
      <Pagination
        v-model:current="dataSource.pagination.page"
        :total="dataSource.pagination.totalPage"
      />
    </div> -->
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
