<script lang="ts" setup>
import { Ref, computed, h, onMounted, ref, toRefs, watch } from "vue";
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
  Image,
} from "ant-design-vue";
import {
  DeleteOutlined,
  PaperClipOutlined,
  DiffOutlined,
  DownOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import { commonService, projectService, taskService } from "@/services";
import { cloneDeep, map, size, isEmpty, filter } from "lodash";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useProjectStore, subtaskStore } from "@/store";

// ==== Data ==== //
const useProject = useProjectStore();
const useModal = subtaskStore();

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
  idSub: number;
  idProjectSubtask: number;
  userList: any;
}>();

const { idSub, idProjectSubtask, userList } = toRefs(props);

const emit = defineEmits<{
  (e: "updateSubtask"): void;
  (e: "closeSubtask"): void;
}>();

watch(useModal.$state, () => {
  if (useModal.isSubtaskModal) {
    userOptions.value = userList.value;
    getSubtaskDetail();
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

// async function getProjectUser(proID: number) {
//   try {
//     const req = {
//       projectId: proID,
//     };
//     const res = await projectService.getProjectUser(req);

//     const a = map(res.data, (item) => {
//       return {
//         value: item.accountId,
//         label: item.fullName,
//       };
//     });

//     userOptions.value = a;
//   } catch (err) {}
// }

const isEditTasks = computed(() => {
  return statusProject.value === "PENDING" || statusProject.value === "CANCELED"
    ? false
    : true;
});

const isStatusCanceled = computed(() => {
  return statusProject.value === "CANCELED" ? false : true;
});

function handleOkTask() {
  emit("closeSubtask");
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
    status: "OPEN",
    assigneeId: null,
    assginorId: 7,
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
    subTask: [],
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
  status: "OPEN",
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
  subTask: [],
});

const taskCode = ref("");
const isProgress = ref<boolean>(false);

async function getSubtaskDetail() {
  const res = await taskService.taskDetail(useModal.idSubtask);

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

    userOptions.value = useModal.members;
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

  if (isEmpty(editorContent.value)) {
    return;
  }

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
  handleUpdateTask();
}

async function handleUpdateTask() {
  try {
    if (idProject.value) {
      taskDetail.value.projectId = idProject.value;
    } else {
      taskDetail.value.projectId = taskDetail.value.projectDto.projectId;
    }

    const res = await taskService.updateTask(taskDetail.value).catch((err) => {
      if (err.response) {
        notification.open({
          message: "Update failed",
          description: err.response.data.data,
          style: {
            marginLeft: `${335 - 600}px`,
            color: "#42526e",
          },
          icon: () => h(InfoCircleOutlined, { style: "color: #DD360C" }),
        });
      }
    });

    if (res.status === "SUCCESS") {
      notification.open({
        message: "Update successfully",
        description: "The Sub-task information has been updated",
        style: {
          marginLeft: `${335 - 600}px`,
          color: "#42526e",
        },
        icon: () => h(CheckCircleOutlined, { style: "color: #209653" }),
      });

      useModal.setOpenModal(false);
      emit("updateSubtask");
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

function disabledDate(current) {
  const set = new Date(taskDetail.value.startDate);
  set.setHours(0, 0, 0, 0);

  return current && current.valueOf() < set;
}

function disabledDateActualStart(current) {
  const set = new Date(taskDetail.value.startDate);
  set.setHours(0, 0, 0, 0);

  return current && current.valueOf() < set;
}

function disabledDateStart(current) {
  const set = new Date(taskDetail.value.deadLine);
  set.setHours(0, 0, 0, 0);

  return current && current.valueOf() > set;
}

function disabledDateActualEnd(current) {
  const set = new Date(taskDetail.value.deadLine);
  set.setHours(0, 0, 0, 0);

  return current && current.valueOf() > set;
}

function focusChangeStatus() {
  if (!isEmpty(taskDetail.value.subTask)) {
    if (taskDetail.value.process === 100) {
      isProgress.value = false;
    } else {
      isProgress.value = true;
    }
  }
}

function handleChangeStatus() {
  if (taskDetail.value.status === "DONE") {
    taskDetail.value.process = 100;
  } else {
    taskDetail.value.process = 0;
  }
}

const convertTime = (time: any) => {
  return moment(time, "YYYY/MM/DD h:mm").fromNow();
};
</script>

<template>
  <Modal
    v-model:open="useModal.isSubtaskModal"
    wrapClassName="newStyle"
    @ok="handleOkTask"
    :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
    width="1200px"
    :footer="null"
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
              accept="image/*, .jpg, .png, .doc"
            />
            <label for="fileInput"> <PaperClipOutlined /> Attachment </label>
          </div>

          <div class="subtask">
            <template v-if="isEmpty(taskDetail.process)">
              <Progress :percent="taskDetail.process"></Progress>
            </template>
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

                  <Image
                    :width="100"
                    :src="item.fileAttachUrl"
                    class="image_preview"
                  />
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
                <div class="mb-1">
                  <span class="text-[#172b4d] font-medium mr-5">
                    {{ userInfo.fullname }}
                  </span>
                  <span class="text-[#091e42ae] font-[400]">{{
                    convertTime(acti.updateTime)
                  }}</span>
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
          <div
            class="mb-4 taskdetail__status"
            :class="{
              status_open: taskDetail.status === 'OPEN',
              status_pending:
                taskDetail.status === 'PENDING' ||
                taskDetail.status === 'INPROGRESS',
              status_done: taskDetail.status === 'DONE',
            }"
          >
            <Select
              v-model:value="taskDetail.status"
              style="width: 15rem"
              @change="handleChangeStatus"
              @focus="focusChangeStatus"
            >
              <SelectOption value="OPEN">Open</SelectOption>
              <SelectOption value="PENDING">Pending</SelectOption>
              <SelectOption value="INPROGRESS">In Progress</SelectOption>
              <SelectOption value="DONE" :disabled="isProgress"
                >Done</SelectOption
              >
            </Select>
          </div>

          <div class="taskdetail__border">
            <div class="taskdetail__title">
              <h4>Details</h4>
            </div>

            <div class="taskdetail__details">
              <div class="form-task flex">
                <label class="w-[23rem]">Assignee</label>
                <FormItem name="assignee" class="mb-4 w-full">
                  <Select
                    ref="selectAssign"
                    v-model:value="taskDetail.assigneeId"
                    :options="userList"
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

              <div class="form-task flex">
                <label class="p-0 w-[23rem]">Assigner</label>
                <FormItem name="reporter" class="mb-4 w-full">
                  <Select
                    ref="selectAssign"
                    v-model:value="taskDetail.assginorId"
                    :options="userList"
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

              <div class="form-task flex mb-4">
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
                  :disabledDate="disabledDateStart"
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
                  :disabledDate="disabledDateActualStart"
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
                  :disabledDate="disabledDateActualEnd"
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
          <Button html-type="submit" type="primary"> Update task </Button>
        </div>
      </FormItem>
    </Form>
  </Modal>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
