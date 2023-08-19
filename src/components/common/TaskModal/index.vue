<script lang="ts" setup>
import { Ref, computed, onMounted, ref, toRefs, watch } from "vue";
import {
  Button,
  Progress,
  Modal,
  Input,
  Textarea,
  Select,
  SelectOption,
  FormItem,
  DatePicker,
  message,
  InputNumber,
  Form,
  Tag,
  Popover,
  notification,
} from "ant-design-vue";
import {
  DeleteOutlined,
  PaperClipOutlined,
  DiffOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { commonService, projectService, taskService } from "@/services";
import { cloneDeep, map, size, isEmpty, filter } from "lodash";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useProjectStore, visiableModal } from "@/store";

// ==== Data ==== //
const useProject = useProjectStore();
const useModal = visiableModal();

const value = ref<string>("");
const userInfo = ref<any>({});
const userOptions = ref<any>([]);
const idProject = ref();
const typeTask = ref<boolean>(true);
const router = useRouter();
const keyProject = ref<any>("");
const statusProject = ref<string>("");
const isRoleManager = ref<boolean>(false);

const props = defineProps<{
  isTaskModal?: boolean;
  idTask: number;
  isTypeTask?: string;
  iTaskCode: string;
}>();

const { isTaskModal, idTask, isTypeTask, iTaskCode } = toRefs(props);

const emit = defineEmits<{
  (e: "closeTaskModal"): void;
  (e: "refreshTasks"): void;
}>();

watch(useModal.$state, () => {
  if (useModal.isTaskModal) {
    if (isTypeTask?.value === "create") {
      titleTask.value = "Create Task";
      taskDetail.value.taskActivityList = [];
      taskDetail.value.taskAttachmentList = [];
      typeTask.value = true;
      resetTask();
      getProjectUser(idProject.value);
    } else {
      typeTask.value = false;
      getTaskDetail();
    }
  } else {
    console.log("false");
  }
});

// ==== Method ==== //
onMounted(() => {
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
    isRoleManager.value = userInfo.value.role === "MANAGER" ? true : false;
  }
});

watchEffect(() => {
  idProject.value = Number(router.currentRoute.value.params.id);
  const a = router.currentRoute.value.params.key;
  keyProject.value = a;
});

async function getProjectUser(proID: number) {
  try {
    const req = {
      projectId: proID,
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

const isEditTasks = computed(() => {
  return statusProject.value === "PENDING" || statusProject.value === "CANCELED"
    ? false
    : true;
});

const isStatusCanceled = computed(() => {
  return statusProject.value === "CANCELED" ? false : true;
});

function handleOkTask() {
  emit("closeTaskModal");
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
    assigneeId: null,
    assginorId: 4,
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
    subTask: {},
    projectDto: {},
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
  projectDto: {},
  subTask: {},
});

const taskCode = ref("");

async function getTaskDetail() {
  typeTask.value = false;
  isTask.value = true;

  const res = await taskService.taskDetail(idTask?.value);

  if (res.status === "SUCCESS") {
    const data = res.data;
    taskDetail.value = cloneDeep(data);
    titleTask.value = taskDetail.value.taskCode;
    taskCode.value = taskDetail.value.taskCode;

    if (!size(taskDetail.value.taskActivityList)) {
      taskDetail.value.taskActivityList = [];
    }

    if (!size(taskDetail.value.taskAttachmentList)) {
      taskDetail.value.taskAttachmentList = [];
    }

    getProjectUser(taskDetail.value.projectDto.projectId);
  }
}

async function addSubtask(params: any) {
  const req = {
    id: taskDetail.value.id,
    subTask: params,
  };

  const res = await taskService.createSubtask(req);

  if (res.status === "SUCCESS") {
    taskDetail.value.subTask = params;
    message.success("Add subtask successfull");
  }
}

//

// Content editor
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import moment from "moment";
import { Rule } from "ant-design-vue/es/form";
import { RouteName } from "@/shared/constants";

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
    taskDetail.value.taskCode = iTaskCode.value;

    const res = await taskService.createTask(taskDetail.value);

    if (res.status === "SUCCESS") {
      message.success("Create task successfull");
      isTask.value = false;
      useModal.setTaskModal(false);
      emit("closeTaskModal");
    }
  } catch (error) {
    message.error("Error");
  }
}

async function handleUpdateTask() {
  try {
    taskDetail.value.projectId = idProject.value;
    console.log(taskDetail.value);

    const res = await taskService.updateTask(taskDetail.value);

    if (res.status === "SUCCESS") {
      message.success("Update task successfull");

      useModal.setTaskModal(false);
      emit("closeTaskModal");
      isTask.value = false;
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

const rules: Record<string, Rule[]> = {
  content: [
    { required: true, message: "Please input task name", trigger: "change" },
  ],
};

// ==== Handle Subtask ==== //
const listSubtask = ref<any>([]);
const isCreateSubtask = ref<boolean>(false);
const textCreateSubtask = ref<string>("");

function handleAddSubTask() {
  isCreateSubtask.value = true;
}

function handleCreateSubtask() {
  isCreateSubtask.value = false;

  const params = {
    id: 0,
    priority: "LOW",
    content: textCreateSubtask.value,
    taskCode: `${taskCode.value}1`,
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
    taskAttachmentList: [],
    taskActivityList: [],
    projectDto: taskDetail.value.projectDto,
    subTask: null,
  };

  addSubtask(params);

  textCreateSubtask.value = "";
}

function handleCanceled() {
  isCreateSubtask.value = false;
}

async function handleChangeStatusSubtask(statusSubtask: string) {
  let status = "";
  if (statusSubtask === "NOT_STARTED") {
    status = "OPEN";
  }
  if (statusSubtask === "PENDING") {
    status = "PENDING";
  }
  if (statusSubtask === "PROCESSING") {
    status = "IN PROGRESS";
  }
  if (statusSubtask === "COMPLETED") {
    status = "DONE";
  }
  if (statusSubtask === "CANCELED") {
    status = "REOPEN";
  }

  const req = {
    id: taskDetail.value.subTask.id,
    progress: 0,
    status: statusSubtask,
  };

  taskDetail.value.subTask.status = statusSubtask;

  taskDetail.value.process = setProgressTask();

  // return;
  const res = await taskService.updateStatusTask(req);
}

function setProgressTask() {
  const subtask: any = [];

  subtask.push(taskDetail.value.subTask);

  const filterDone = filter(
    subtask,
    (item) => item.status === "COMPLETED"
  ).length;

  const progress = (filterDone / size(subtask)) * 100;

  return progress;
}

function convertStatus(status: string) {
  if (status === "NOT_STARTED") {
    return "OPEN";
  }
  if (status === "PENDING") {
    return "PENDING";
  }
  if (status === "PROCESSING") {
    return "IN PROGRESS";
  }
  if (status === "COMPLETED") {
    return "DONE";
  }
  if (status === "CANCELED") {
    return "REOPEN";
  }
  return "";
}

function checkStatus(status: string) {}

function disabledDate(current) {
  const set = new Date(taskDetail.value.startDate);
  set.setHours(0, 0, 0, 0);

  return current && current.valueOf() < set;
}
</script>

<template>
  <Modal
    v-model:open="useModal.isTaskModal"
    wrapClassName="newStyle"
    @ok="handleOkTask"
    :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
    :footer="null"
    width="1200px"
    :title="titleTask"
  >
    <Form
      ref="formTaskRef"
      :model="taskDetail"
      name="normal_user"
      :rules="rules"
      @finish="onFinishChange"
      class="task__form"
    >
      <div class="modal__wrap flex taskdetail">
        <div class="w-[60%]">
          <FormItem name="content">
            <Input
              v-model:value="taskDetail.content"
              placeholder="Enter task name"
              class="text-[2rem] text-hrm-color font-[500]"
            />
          </FormItem>

          <div class="my-[2rem] flex">
            <input
              id="fileInput"
              class="custom-file-input"
              type="file"
              @change="handleFileChange"
            />
            <label for="fileInput"> <PaperClipOutlined /> Attach</label>

            <div class="task__btn" v-if="isTypeTask === 'detail'">
              <Button
                class="subtask__create--btn h-[3.4rem]"
                @click="handleAddSubTask()"
                :disabled="!isStatusCanceled"
              >
                <DiffOutlined /> Create Subtask
              </Button>
            </div>
          </div>

          <div class="subtask" v-if="isTypeTask === 'detail'">
            <p class="mb-3" v-if="!isEmpty(listSubtask)">Subtask</p>
            <template v-if="isEmpty(taskDetail.process)">
              <Progress :percent="taskDetail.process"></Progress>
            </template>

            <div class="subtask__list" v-if="!isEmpty(taskDetail.subTask)">
              <div class="subtask__item flex justify-between items-center">
                <div class="subtask__content">
                  <img
                    src="https://hoondea.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10557?size=medium"
                  />
                  <div class="subtask__code">
                    {{ taskDetail.subTask?.taskCode }}
                  </div>
                  <div class="subtask__name">
                    {{ taskDetail.subTask?.content }}
                  </div>
                </div>

                <div class="subtask__status">
                  <Popover trigger="click">
                    <template #content>
                      <div
                        v-if="taskDetail.subTask.status !== 'NOT_STARTED'"
                        @click="handleChangeStatusSubtask('NOT_STARTED')"
                        class="mb-2"
                      >
                        <Tag color="#E3FCEF">
                          <span
                            style="color: #006644"
                            class="font-[500]"
                            v-if="taskDetail.subTask.status === 'COMPLETED'"
                          >
                            REOPEN
                          </span>
                          <span
                            style="color: #006644"
                            class="font-[500]"
                            v-else
                          >
                            OPEN
                          </span>
                        </Tag>
                      </div>

                      <div
                        v-if="taskDetail.subTask.status !== 'PENDING'"
                        @click="handleChangeStatusSubtask('PENDING')"
                        class="mb-2"
                      >
                        <Tag color="#E3FCEF">
                          <span style="color: #006644" class="font-[500]">
                            PENDING
                          </span>
                        </Tag>
                      </div>

                      <div
                        v-if="taskDetail.subTask.status !== 'PROCESSING'"
                        @click="handleChangeStatusSubtask('PROCESSING')"
                        class="mb-2"
                      >
                        <Tag color="#E3FCEF">
                          <span style="color: #006644" class="font-[500]">
                            IN PROGRESS
                          </span>
                        </Tag>
                      </div>

                      <div
                        v-if="taskDetail.subTask.status !== 'COMPLETED'"
                        @click="handleChangeStatusSubtask('COMPLETED')"
                      >
                        <Tag color="#E3FCEF">
                          <span style="color: #006644" class="font-[500]">
                            DONE
                          </span>
                        </Tag>
                      </div>
                    </template>
                    <div>
                      <Tag color="#DDEBFF" class="cursor-pointe">
                        <span
                          class="cursor-pointer text-[#0052CC] font-[600] text-[1.2rem]"
                        >
                          {{ convertStatus(taskDetail.subTask.status) }}
                          <DownOutlined />
                        </span>
                      </Tag>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>

            <div class="subtask__create" v-if="isCreateSubtask">
              <Input v-model:value="textCreateSubtask" />
              <div class="subtask__wrap">
                <button class="subtask__btn" @click="handleCreateSubtask()">
                  Create
                </button>
                <button class="subtask__btn" @click="handleCanceled()">
                  Cancel
                </button>
              </div>
            </div>
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
                  <span class="btn__text--a" @click="handleDeleteActive(index)"
                    >Delete</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-[44rem] w-[44rem] ml-5">
          <div class="mb-4">
            <Select
              v-model:value="taskDetail.status"
              v-if="typeTask"
              style="width: 15rem"
            >
              <SelectOption value="NOT_STARTED">Open</SelectOption>
            </Select>

            <Select
              v-model:value="taskDetail.status"
              v-else
              style="width: 15rem"
            >
              <SelectOption value="NOT_STARTED">Open</SelectOption>
              <SelectOption value="PENDING">Pending</SelectOption>
              <SelectOption value="PROCESSING">In Progress</SelectOption>
              <SelectOption value="COMPLETED">Done</SelectOption>
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

              <div class="flex mb-4">
                <label class="w-[15rem]">Work Type</label>
                <Select v-model:value="taskDetail.workType" class="w-[17rem]">
                  <SelectOption value="CODING">Coding</SelectOption>
                  <SelectOption value="DESIGN">Design</SelectOption>
                  <SelectOption value="CORRECT_CODE">Correct Code</SelectOption>
                </Select>
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
                  :disabledDate="disabledDate"
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
                <InputNumber v-model:value="taskDetail.effort" addon-after="h">
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

      <FormItem
        class="flex justify-center"
        v-if="isStatusCanceled || isRoleManager"
      >
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
</template>

<style scoped lang="scss" src="./styles.scss"></style>