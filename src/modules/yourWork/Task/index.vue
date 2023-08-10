<script lang="ts" setup>
import { Ref, createVNode, onMounted, reactive, ref, watch } from "vue";
import {
  Button,
  InputSearch,
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
  includes,
  sortBy,
} from "lodash";

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
    // {
    //   title: "Process",
    //   key: "process",
    //   dataIndex: "process",
    //   width: "100px",
    // },
    {
      title: "",
      key: "delete",
      dataIndex: "delete",
      width: "25px",
    },
  ],
});
const value = ref<string>("");
const userInfo = ref<any>({});
const userOptions = ref<any>([]);
const currentPage = ref(1);
const idProject = ref();
const typeTask = ref<boolean>(true);

// ==== Method ==== //
onMounted(() => {
  listTask();
  getAcc();

  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
  }
});

import { watchEffect } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const keyProject = ref<any>("");

watchEffect(() => {
  idProject.value = Number(router.currentRoute.value.params.id);
  const a = router.currentRoute.value.params.key;
  keyProject.value = a;
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

function handleOkTask() {
  isTask.value = false;
}

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
}

const convertCate = (status: string) => {
  if (status === "MOCKUP") {
    return "Mockup";
  }
  if (status === "DESIGN") {
    return "CR";
  }
};

const value1 = ref();
const total = ref(1);
const reqListTask = ref({
  pageIndex: 1,
  pageSize: 100,
  projectId: idProject.value,
});

const dataList = ref([]);

watch(currentPage, (val) => {
  reqListTask.value.pageIndex = val;
  listTask();
});

async function listTask() {
  const res = await taskService.getTask(reqListTask.value);

  if (res.status === "SUCCESS") {
    // Sort due date
    const dueThisWeek = sortBy(res.data.data, (item) => new Date(item.dueDate));
    dataSource.data = dueThisWeek;

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
const isTask = ref<boolean>(false);

function resetTask() {
  taskDetail.value = {
    id: 0,
    projectId: idProject.value,
    priority: "LOW",
    content: "",
    taskCode: "",
    workCd: "",
    status: "NOT_STARTED",
    assigneeId: 2,
    assginorId: 3,
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
    taskAttachmentList: [],
    taskActivityList: [],
  };
}

const taskDetail = ref<any>({
  id: 0,
  projectId: idProject.value,
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

async function getTaskDetail(id: number) {
  titleTask.value = keyProject.value;
  typeTask.value = false;
  isTask.value = true;

  const res = await taskService.taskDetail(id);

  if (res.status === "SUCCESS") {
    const data = res.data;
    taskDetail.value = cloneDeep(data);
    if (!size(taskDetail.value.taskActivityList)) {
      taskDetail.value.taskActivityList = [];
    }

    if (!size(taskDetail.value.taskAttachmentList)) {
      taskDetail.value.taskAttachmentList = [];
    }
  }
}

//

// Content editor
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import moment from "moment";
import { Rule } from "ant-design-vue/es/form";

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

//
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

// Task
const titleTask = ref("Add task");

function openTaskModal() {
  titleTask.value = "Add task";
  typeTask.value = true;
  isTask.value = true;
  taskDetail.value.taskActivityList = [];
  taskDetail.value.taskAttachmentList = [];
  resetTask();
}

function generateUniqueHRKey(existingKeys) {
  const existingNumbers = existingKeys.map((item) =>
    parseInt(item.taskCode.split("-")[1])
  );
  const maxNumber = Math.max(...existingNumbers);

  return `HR-${maxNumber + 1}`;
}

function onFinishChange() {
  if (typeTask.value) {
    handleCreateTask();
  } else {
    handleUpdateTask();
  }
}

async function handleCreateTask() {
  try {
    taskDetail.value.projectId = idProject.value;

    const newKey = generateUniqueHRKey(dataSource.data);
    taskDetail.value.taskCode = newKey;

    const res = await taskService.createTask(taskDetail.value);

    if (res.status === "SUCCESS") {
      message.success("Create task successfull");
      isTask.value = false;
      listTask();
    }
  } catch (error) {
    message.error("Error");
  }
}

async function handleUpdateTask() {
  try {
    taskDetail.value.projectId = idProject.value;

    const res = await taskService.updateTask(taskDetail.value);

    if (res.status === "SUCCESS") {
      message.success("Update task successfull");
      isTask.value = false;
      listTask();
    }
  } catch (error) {
    message.error("Error");
  }
}

function handleDeleteActive(index) {
  taskDetail.value.taskActivityList.splice(index, 1);
}

function handleDeleteAttach(index: number) {
  taskDetail.value.taskAttachmentList.splice(index, 1);
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
                    <!-- <Button size="small" class="mr-4">CR</Button> -->
                    <Button size="small">CR</Button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Dropdown>
      </div>
      <div>
        <Button @click="openTaskModal()" type="primary"
          ><PlusOutlined /> Create Task</Button
        >
      </div>
    </div>
    <div class="h-[524px]">
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

          <!-- <template v-if="column.dataIndex === 'process'">
            <Progress
              :percent="record.process"
              stroke-color="#2bc48a"
            ></Progress>
          </template> -->

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
            <div @click="deleteTask(record.id)">
              <DeleteOutlined />
            </div>
          </template>
        </template>
      </Table>
    </div>

    <Modal
      v-model:open="isTask"
      wrapClassName="newStyle"
      @ok="handleOkTask"
      :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
      :footer="null"
      width="1200px"
      :title="titleTask"
    >
      <!--  -->
      <Form
        ref="formTaskRef"
        :model="taskDetail"
        name="normal_user"
        :rules="rules"
        @finish="onFinishChange"
      >
        <div class="modal__wrap flex taskdetail">
          <div class="w-[60%]">
            <FormItem name="content">
              <Input
                v-model:value="taskDetail.content"
                placeholder="Enter task name"
              />
            </FormItem>

            <div class="my-[2rem]">
              <input
                id="fileInput"
                class="custom-file-input"
                type="file"
                @change="handleFileChange"
              />
              <label for="fileInput"> <PaperClipOutlined /> Attach</label>
            </div>

            <div class="taskdetail__wrap">
              <p class="mb-3">Description</p>
              <Textarea
                v-model:value="taskDetail.description"
                :bordered="false"
                placeholder="Add a description..."
              ></Textarea>
            </div>

            <div class="taskdetail__wrap">
              <p class="mb-3">
                Attachments({{ size(taskDetail.taskAttachmentList) }})
              </p>
              <div class="flex">
                <template v-if="size(taskDetail.taskAttachmentList)">
                  <div
                    class="taskdetail__img"
                    v-for="(item, index) in taskDetail.taskAttachmentList"
                  >
                    <div
                      class="taskdetail__icon"
                      @click="handleDeleteAttach(index)"
                    >
                      <DeleteOutlined style="font-size: 2rem" />
                    </div>
                    <img :src="item.fileAttachUrl" alt="" />
                  </div>
                </template>
              </div>
            </div>

            <div class="taskdetail__wrap">
              <p class="mb-3">Activity</p>

              <div class="flex h-max">
                <div class="taskdetail__activity">
                  <img src="@/assets/images/default-wg-member.jpeg" alt="" />
                </div>

                <div
                  class="taskdetail__activity--box"
                  @click="handleEditor()"
                  v-if="!isEditor"
                >
                  <p>Add a comment...</p>
                </div>

                <div v-else class="w-full">
                  <div class="w-full">
                    <QuillEditor
                      v-model:content="editorContent"
                      content-type="html"
                    />
                  </div>
                  <div class="flex mt-[1rem]">
                    <Button class="mr-[1rem]" @click="handleSaveActivity()">
                      Save
                    </Button>
                    <Button @click="handleCancelActivity()">Cancel</Button>
                  </div>
                </div>
              </div>

              <div
                v-for="(acti, index) in taskDetail.taskActivityList"
                class="flex mt-[2rem]"
              >
                <div class="taskdetail__activity">
                  <img src="@/assets/images/default-wg-member.jpeg" alt="" />
                </div>
                <div class="taskdetail__comment">
                  <div class="text-[#172b4d] font-medium mb-1">
                    {{ userInfo.fullname }}
                  </div>
                  <p v-html="acti.content" class="text-sm mb-2"></p>
                  <div class="btn__text flex items-center">
                    <span class="btn__text--a">Edit</span>
                    <span class="flex items-center mx-2">.</span>
                    <span
                      class="btn__text--a"
                      @click="handleDeleteActive(index)"
                      >Delete</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-[40%] ml-5">
            <div class="taskdetail__status">
              <Select
                ref="selectStatus"
                v-model:value="taskDetail.status"
                v-if="typeTask"
              >
                <SelectOption value="NOT_STARTED">Not Started</SelectOption>
                <SelectOption value="PENDING">Pending</SelectOption>
                <SelectOption value="PROCESSING">Processing</SelectOption>
              </Select>
              <Select
                ref="selectStatus"
                v-model:value="taskDetail.status"
                v-else
              >
                <SelectOption value="NOT_STARTED">Not Started</SelectOption>
                <SelectOption value="PENDING">Pending</SelectOption>
                <SelectOption value="PROCESSING">Processing</SelectOption>
                <SelectOption value="COMPLETED">Completed</SelectOption>
                <SelectOption value="CANCELED">Canceled</SelectOption>
              </Select>
            </div>

            <div class="taskdetail__border">
              <div class="taskdetail__title">
                <h4>Details</h4>
              </div>

              <div class="taskdetail__details">
                <div class="flex">
                  <label class="w-[23rem]">Assignee</label>
                  <FormItem name="assignee" class="mb-4 w-full">
                    <Select
                      ref="selectAssign"
                      v-model:value="taskDetail.assigneeId"
                      :options="userOptions"
                    >
                      <template #suffixIcon>
                        <img
                          class="w-8 h-8 rounded-full"
                          src="@/assets/images/default-wg-member.jpeg"
                          alt=""
                        />
                      </template>
                    </Select>
                  </FormItem>
                </div>

                <div class="flex">
                  <label class="p-0 w-[23rem]">Assginor</label>
                  <FormItem name="reporter" class="mb-4 w-full">
                    <Select
                      ref="selectAssign"
                      v-model:value="taskDetail.assginorId"
                      :options="userOptions"
                    >
                      <template #suffixIcon>
                        <img
                          class="w-8 h-8 rounded-full"
                          src="@/assets/images/default-wg-member.jpeg"
                          alt=""
                        />
                      </template>
                    </Select>
                  </FormItem>
                </div>

                <!-- <div class="flex">
                  <label class="p-0 w-[23rem]">Progress</label>
                  <FormItem class="w-full">
                    <Row class="w-full">
                      <Col :span="14">
                        <Slider
                          v-model:value="taskDetail.process"
                          :min="0"
                          :max="100"
                        />
                      </Col>
                      <Col :span="2">
                        <InputNumber
                          v-model:value="taskDetail.process"
                          :min="0"
                          :max="100"
                          style="margin-left: 16px"
                        />
                      </Col>
                    </Row>
                  </FormItem>
                </div> -->

                <div class="form-task mb-4">
                  <label class="w-[15rem]">Start date</label>
                  <DatePicker
                    v-model:value="taskDetail.startDate"
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
                </div>

                <div class="form-task mb-4">
                  <label class="w-[15rem]">Due date</label>
                  <DatePicker
                    v-model:value="taskDetail.deadLine"
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
                </div>

                <div class="form-task mb-4">
                  <label class="w-[15rem]">Effort</label>
                  <InputNumber
                    v-model:value="taskDetail.effort"
                    addon-after="h"
                  >
                  </InputNumber>
                </div>

                <div class="form-task mb-4">
                  <label class="w-[15rem]">Category</label>
                  <Select v-model:value="taskDetail.category" class="w-[17rem]">
                    <SelectOption value="MOCKUP">Mockup</SelectOption>
                    <SelectOption value="DESIGN">CR</SelectOption>
                    <!-- <SelectOption value="CR">CR</SelectOption> -->
                  </Select>
                </div>

                <div class="form-task mb-4">
                  <label class="w-[15rem]">Actual Start Date </label>
                  <DatePicker
                    v-model:value="taskDetail.actualStartDate"
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
                </div>

                <div class="form-task mb-4">
                  <label class="w-[15rem]">Actual End Date </label>
                  <DatePicker
                    v-model:value="taskDetail.actualEndDate"
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
                </div>
              </div>
            </div>
          </div>
        </div>

        <FormItem class="flex justify-center">
          <div class="flex justify-center items-center">
            <Button html-type="submit" type="primary" v-if="typeTask">
              Create task
            </Button>
            <Button html-type="submit" type="primary" v-else>
              Update task
            </Button>
          </div>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
