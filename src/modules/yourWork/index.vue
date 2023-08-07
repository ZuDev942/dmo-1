<script lang="ts" setup>
import { Ref, createVNode, onMounted, reactive, ref, watch } from "vue";
import {
  Modal,
  Input,
  FormItem,
  Select,
  SelectOption,
  Textarea,
  Button,
  Row,
  Col,
  Slider,
  Table,
  InputNumber,
  Progress,
  Tag,
  Pagination,
  message,
  DatePicker,
  Form,
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
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Summary",
      key: "task",
      dataIndex: "task",
    },
    {
      title: "Start date",
      key: "start",
      dataIndex: "start",
    },
    {
      title: "Due date",
      key: "due",
      dataIndex: "due",
    },
    {
      title: "Task progress",
      key: "process",
      dataIndex: "process",
      width: "250px",
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

// watch(
//   () => taskDetail.value,
//   (newValue, oldValue) => {
//     updateTask();
//   },
//   { deep: true, immediate: true }
// );

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

function handleDeleteActive(index) {
  taskDetail.value.taskActivityList.splice(index, 1);
}
//
const showAll = ref(false);

function toggleShowAll() {
  showAll.value = !showAll.value;
}

// Table

const convertStatus = (status: string) => {
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
};

const value1 = ref();
const isSwitch = ref(false);

function switchStatus() {
  isSwitch.value = !isSwitch.value;
}

// async function deleteTask(id: number) {
//   Modal.confirm({
//     title: "Do you want to delete task?",
//     icon: createVNode(ExclamationCircleOutlined),
//     async onOk() {
//       const res = await yourworkService.deleteTask(id);

//       if (res.status === "SUCCESS") {
//         message.success("Delete successful!");
//         listTask();
//       }
//     },
//     onCancel() {},
//   });
// }

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

    <!-- <div class="work">
      <h1 class="project__title">Tasks</h1>
      <div class="">
        <Table
          :columns="dataSource.columns"
          :data-source="dataSource.data"
          :pagination="false"
          class="custom-table"
          bordered
        >
          <template #headerCell="{ column }">
            <template v-if="column.dataIndex === 'status'">
              <span>
                <BorderlessTableOutlined style="font-weight: 500" />
                Status
              </span>
            </template>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'task'">
              <div class="cursor-pointer" @click="getTaskDetail(record.id)">
                {{ record.content }}
              </div>
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
                v-else-if="record.projectStatus === 'CANCELED'"
                color="#DFFCF0"
                class="cursor-pointer"
              >
                <span
                  class="cursor-pointer text-[#216E4E] font-[700] text-[1.1rem]"
                >
                  {{ convertStatus(record.projectStatus) }}
                </span>
              </Tag>

              <Tag
                v-else-if="
                  record.projectStatus === 'PENDING' ||
                  'PROCESSING' ||
                  'COMPLETED'
                "
                color="#DEEBFF"
                class="cursor-pointer"
              >
                <span
                  class="cursor-pointer text-[#0055CC] font-[700] text-[1.1rem]"
                >
                  {{ convertStatus(record.projectStatus) }}
                </span>
              </Tag>
            </template>

            <template v-if="column.dataIndex === 'process'">
              <Progress
                :percent="record.process"
                stroke-color="#2bc48a"
              ></Progress>
            </template>

            <template v-if="column.dataIndex === 'action'">
              <Select
                v-model:value="action"
                class="w-full"
                @change="handleSelectAction(record)"
              >
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

      <Modal
        v-model:open="isTask"
        wrapClassName="newStyle"
        @ok="handleOkTask"
        :bodyStyle="{ padding: 0, 'border-radius': '10px', height: '1000' }"
        :footer="null"
        width="1200px"
        title="Add Task"
      >
        <Form
          ref="formUserRef"
          :model="taskDetail"
          name="normal_user"
          class="user-form"
          @finish="onFinishChange()"
        >
          <div class="modal__wrap flex taskdetail">
            <div class="w-[60%]">
              <Input
                v-model:value="taskDetail.content"
                placeholder="Enter task name"
              />

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
                <div class="flex items-center mb-5">
                  <div class="mr-5">Show:</div>
                  <Button
                    type="primary"
                    class="btn__active mr-[1rem]"
                    :class="{}"
                    size="small"
                    @click="showAllComment()"
                    >All</Button
                  >
                  <Button
                    type="primary"
                    class="btn__active active"
                    size="small"
                    @click="showComment()"
                    >Comment</Button
                  >
                </div>
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
                  :class="convertStatus(taskDetail.status)"
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

                  <div class="flex">
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
                  </div>

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
                    <Select
                      v-model:value="taskDetail.category"
                      class="w-[17rem]"
                    >
                      <SelectOption value="MOCKUP">Mockup</SelectOption>
                      <SelectOption value="DESIGN">Design</SelectOption>
                      <SelectOption value="CR">CR</SelectOption>
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
              <Button html-type="submit" type="primary"> Update task </Button>
            </div>
          </FormItem>
        </Form>
      </Modal>
    </div> -->

    <div class="taskwork">
      <Table
        :columns="dataSource.columns"
        :data-source="dataSource.data"
        :pagination="false"
        class="custom-table"
      >
        <template #headerCell="{ column }">
          <template v-if="column.dataIndex === 'status'">
            <span>
              <BorderlessTableOutlined style="font-weight: 500" />
              Status
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'code'">
            <div class="text-[#8993a4] font-[500]">HRM-01</div>
          </template>

          <template v-if="column.dataIndex === 'task'">
            <div class="cursor-pointer" @click="getTaskDetail(record.id)">
              {{ shortenText(record.content) }}
            </div>
          </template>

          <template v-if="column.dataIndex === 'start'">
            Aug 12, 2023
          </template>
          <template v-if="column.dataIndex === 'due'"> Aug 12, 2023 </template>

          <template v-if="column.dataIndex === 'process'">
            <Progress
              :percent="record.process"
              stroke-color="#0DAF60"
            ></Progress>
          </template>
        </template>
      </Table>
    </div>
    <div class="paging flex justify-end">
      <Pagination
        v-model:current="dataSource.pagination.page"
        :total="dataSource.pagination.totalPage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
