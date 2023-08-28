<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import {
  Form,
  FormItem,
  Input,
  Textarea,
  Select,
  SelectOption,
  Checkbox,
  DatePicker,
  Button,
  UploadDragger,
  UploadChangeParam,
  message,
  Divider,
  SelectProps,
  SkeletonButton,
} from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import { useRouter } from "vue-router";

import {
  issueService,
  projectService,
  taskService,
  userService,
} from "@/services";
import { filter, isEmpty, map, orderBy, sortBy } from "lodash";
import moment from "moment";
import { RouteName } from "@/shared/constants";

type IHistory = {
  createBy: string;
  createDate: string;
  from: any;
  id: number;
  issueId: number;
  to: any;
};

// ==== Data ==== //
const issueParams = ref({
  id: 0,
  projectId: "",
  priority: "LOW",
  reviewer: 1,
  taskId: "",
  reason: "1",
  bugRepeat: 0,
  titleBug: "",
  reviewDate: "",
  bugCode: "",
  checkList: true,
  checklistReason: "",
  contentBug: "",
  evidenceFile: [],
  assignee: "",
  fixer: "",
  fixDate: "",
  status: 1,
  contentFix: "",
  note: "",
  workCd: "",
  classSiff: 0,
  historyList: [
    {
      createBy: "",
      createDate: "",
      from: "",
      id: 0,
      issueId: 0,
      to: {},
    },
  ],
  noti: false,
});

const editorContent = ref<string>("");
const editorContentFixer = ref<string>("");
const isEditor = ref(false);
const isEditorFixer = ref(false);
const userInfo = ref<any>({});
const isCreate = ref<boolean>();

// ==== Option ==== //
const statusOption = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "New",
  },
  // {
  //   value: 2,
  //   label: "ReOpen",
  // },
  {
    value: 3,
    label: "Developing",
  },
  {
    value: 4,
    label: "Resolve",
  },
  {
    value: 5,
    label: "Closed",
  },
  {
    value: 6,
    label: "Reject",
  },
]);
const statusOptionDev = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "New",
  },
  {
    value: 3,
    label: "Developing",
  },
  {
    value: 4,
    label: "Resolve",
  },
  // {
  //   value: 5,
  //   label: "Closed",
  // },
  {
    value: 6,
    label: "Reject",
  },
]);

const statusOptionReOpen = ref<SelectProps["options"]>([
  {
    value: 2,
    label: "ReOpen",
  },
  {
    value: 3,
    label: "Developing",
  },
  {
    value: 4,
    label: "Resolve",
  },
  {
    value: 5,
    label: "Closed",
  },
  {
    value: 6,
    label: "Reject",
  },
]);

const statusOptionClosed = ref<SelectProps["options"]>([
  {
    value: 2,
    label: "ReOpen",
  },
  {
    value: 5,
    label: "Closed",
  },
]);

const statusOptionReject = ref<SelectProps["options"]>([
  {
    value: 2,
    label: "ReOpen",
  },
  {
    value: 6,
    label: "Reject",
  },
]);

const statusOptionCreate = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "Open",
  },
]);

const reasonOption = ref<SelectProps["options"]>([
  {
    value: "1",
    label: "Bug",
  },
  {
    value: "2",
    label: "Document Update",
  },
  {
    value: "3",
    label: "Leakage",
  },
]);
const router = useRouter();
const idIssue = ref<number>(0);
const positionId = ref<number>(0);
const isLoadIssue = ref<boolean>(false);

// ==== Method ==== //

onMounted(() => {
  getProjects();
  getAccounts();

  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);

    positionId.value = userInfo.value.position;
  }
});

watchEffect(() => {
  if (router.currentRoute.value.name === "Issue") {
    if (router.currentRoute.value.params.id) {
      idIssue.value = Number(router.currentRoute.value.params.id);
      isCreate.value = false;
      getDetailIssue();
    } else {
      isCreate.value = true;
    }
  }
});

async function getDetailIssue() {
  try {
    isLoadIssue.value = true;
    const res = await issueService.detailIssue(idIssue.value).finally(() => {
      isLoadIssue.value = false;
    });

    if (res.status === "SUCCESS") {
      for (const key in issueParams.value) {
        if (res.data.hasOwnProperty(key)) {
          issueParams.value[key] = res.data[key];
        }
      }

      // issueParams.value = res.data;
      getTasks(Number(issueParams.value.projectId));
    }
  } catch (error) {}
}

const fileList = ref([]);
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e: DragEvent) {
  console.log(e);
}

async function onFinishProject() {}

function handleChangeEditor() {
  isEditor.value = true;
  editorContent.value = issueParams.value.contentBug;
}

function handleChangeEditorFix() {
  isEditorFixer.value = true;
  editorContent.value = issueParams.value.contentFix;
}

function handleSaveText() {
  isEditor.value = false;
  issueParams.value.contentBug = editorContent.value;
}

function handleCancelText() {
  isEditor.value = false;
}

function handleSaveTextFix() {
  isEditorFixer.value = false;
  issueParams.value.contentFix = editorContentFixer.value;
}

function handleCancelTextFix() {
  isEditorFixer.value = false;
}

// Get Project
const optionsProject = ref<SelectProps["options"]>([]);
const optionsTask = ref<SelectProps["options"]>([]);
const optionsAccount = ref<SelectProps["options"]>([]);

async function getProjects() {
  const res = await projectService.getListProject({
    pageIndex: 1,
    pageSize: 100,
  });

  const convert = map(res.data.data, (item) => {
    return {
      value: item.id,
      label: item.id + " - " + item.key,
    };
  });

  optionsProject.value = convert;
}

async function getTasks(projectID: number) {
  const res = await taskService.getTask({
    pageIndex: 1,
    pageSize: 100,
    projectId: projectID,
  });

  const convert = map(res.data.data, (item) => {
    return {
      value: item.id,
      label: item.id + " - " + item.content,
    };
  });

  optionsTask.value = convert;
}

async function getAccounts() {
  const req = {
    pageIndex: 1,
    pageSize: 100,
  };

  const res = await userService.getLisrUser(req);

  const filterUser = filter(res.data.data, (item) => item.role !== "ADMIN");

  const filterReviewer = filter(
    res.data.data,
    (item) => item.fullName === userInfo.value.fullname
  );

  console.log(filterReviewer);

  issueParams.value.reviewer = filterReviewer[0].id;

  // console.log(issueParams.value);

  const convert = map(filterUser, (item) => {
    return {
      value: item.id,
      label: item.id + " - " + item.fullName,
    };
  });

  optionsAccount.value = convert;
}

function handleChangeProject(projectID) {
  getTasks(projectID);
}

async function handleCreateIssue() {
  console.log(issueParams.value);

  const res = await issueService.createIssue(issueParams.value);

  if (res.status === "SUCCESS") {
    message.success("Create issue successfull");
    // router.push({
    //   name: RouteName.ISSUES,
    // });
  }
}

async function handleUpdateIssue() {
  issueParams.value.bugRepeat += 1;

  const res = await issueService.updateIssue(issueParams.value);

  if (res.status === "SUCCESS") {
    message.success("Update issue successfull");
    getDetailIssue();
  }
}

const convertText = (text: any) => {
  if (text) {
    return text;
  }

  return "";
};

const convertDate = (date: string) => {
  if (date) {
    return moment(date).format("DD-MM-YYYY HH:mm");
  }

  return "";
};

const sortCreatedDate = (history: any) => {
  if (history) {
    return orderBy(history, (item) => new Date(item.createDate), "desc");
  }

  return [];
};

const convertHistory = (history: any) => {
  if (history.from.contentBug || history.to.contentBug) {
    return `<h4>Content Bug changed from </h4> <em>${history.from.contentBug}</em> <h4>to</h4> <em>${history.to.contentBug}</em>`;
  }

  return "";
};

const convertContentFix = (history: any) => {
  if (history.from.contentFix || history.to.contentFix) {
    return `<h4>Content Fix  changed from </h4> <em>${history.from.contentFix}</em> <h4>to</h4> <em>${history.to.contentFix}</em>`;
  }

  return "";
};

const convertTitleBug = (history: any) => {
  if (history.from.titleBug || history.to.titleBug) {
    return `<h4>Title Bug changed from </h4> <em>${history.from.titleBug} </em><h4>to</h4> <em>${history.to.titleBug}</em>`;
  }

  return "";
};

const convertReason = (history: any) => {
  if (history.from.reason || history.to.reason) {
    const option = ["Bug", "Bug", "Document Update", "Leakage"];
    const reasonFrom = option[Number(history.from.reason)];
    const reasonTo = option[Number(history.to.reason)];

    return `<h4> Reason changed from </h4> <em>${reasonFrom}</em> <h4>to</h4> <em>${reasonTo}</em>`;
  }

  return "";
};

const convertFixDate = (history: any) => {
  if (history.from.fixDate || history.to.fixDate) {
    const from = moment(history.from.fixDate).format("DD-MM-YYYY");
    const to = moment(history.to.fixDate).format("DD-MM-YYYY");

    return `<h4> Fixdate changed from </h4> <em>${from}</em> <h4>to</h4> <em>${to}</em>`;
  }

  return "";
};

const convertReviewDate = (history: any) => {
  if (history.from.reviewDate || history.to.reviewDate) {
    const from = moment(history.from.reviewDate).format("DD-MM-YYYY");
    const to = moment(history.to.reviewDate).format("DD-MM-YYYY");

    return `<h4> Review date changed from </h4> <em>${from}</em> <h4>to</h4> <em>${to}</em>`;
  }

  return "";
};
</script>

<template>
  <div class="issueDetail__contain">
    <Form
      ref="formRef"
      name="custom-validation"
      :model="issueParams"
      class="issueDetail"
      @finish="onFinishProject"
    >
      <div class="issueDetail__top">
        <div class="issueDetail__left">
          <div class="mb-[2rem]">
            <FormItem name="projectID" class="mb-4 text-hrm-color">
              <SkeletonButton
                active
                :block="true"
                v-if="isLoadIssue"
                style="height: 46px"
              />
              <Input
                v-else
                v-model:value="issueParams.titleBug"
                placeholder="Title bug"
                size="large"
                class="text-[2rem] text-hrm-color font-[500]"
              />
            </FormItem>
          </div>

          <div class="mb-[2rem]">
            <label>Content bug <span class="text-red-600">&ast;</span></label>

            <div v-if="isEditor" class="w-full mt-4">
              <div class="w-full">
                <QuillEditor
                  v-model:content="editorContent"
                  content-type="html"
                />
              </div>
              <div class="flex mt-[1rem] justify-end">
                <Button
                  class="mr-[1rem] issueDetail__btn"
                  @click="handleSaveText()"
                >
                  Save
                </Button>
                <Button class="issueDetail__btn2" @click="handleCancelText()"
                  >Cancel</Button
                >
              </div>
            </div>

            <FormItem v-else name="projectID" class="mb-4 mt-4 text-hrm-color">
              <div
                class="issueDetail__edit"
                v-html="issueParams.contentBug"
                @click="handleChangeEditor"
              ></div>
            </FormItem>
          </div>

          <div class="mb-[2rem]">
            <UploadDragger
              v-model:fileList="fileList"
              name="file"
              :multiple="true"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
              @drop="handleDrop"
            >
              <p class="ant-upload-drag-icon">
                <InboxOutlined></InboxOutlined>
              </p>
              <p class="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </UploadDragger>
          </div>

          <div class="mb-[2rem]">
            <label>Content Fix</label>

            <div v-if="isEditorFixer" class="w-full mt-4">
              <div class="w-full">
                <QuillEditor
                  v-model:content="editorContentFixer"
                  content-type="html"
                />
              </div>
              <div class="flex mt-[1rem] justify-end">
                <Button
                  class="mr-[1rem] issueDetail__btn"
                  @click="handleSaveTextFix()"
                >
                  Save
                </Button>
                <Button class="issueDetail__btn2" @click="handleCancelTextFix()"
                  >Cancel</Button
                >
              </div>
            </div>

            <FormItem v-else name="projectID" class="mb-4 mt-4 text-hrm-color">
              <div
                class="issueDetail__edit"
                v-html="issueParams.contentFix"
                @click="handleChangeEditorFix"
              ></div>
            </FormItem>
          </div>
        </div>

        <!--  -->
        <div class="issueDetail__right">
          <div class="select__status flex justify-between">
            <FormItem class="w-[20rem]">
              <SkeletonButton active :block="true" v-if="isLoadIssue" />
              <template v-else>
                <!-- Create -->
                <Select
                  v-if="isCreate"
                  ref="selectStatus"
                  v-model:value="issueParams.status"
                  class="w-[20rem]"
                  :options="statusOptionCreate"
                >
                </Select>

                <!-- Update -->
                <template v-else>
                  <!-- Tester -->
                  <template v-if="positionId === 2">
                    <!-- New -->
                    <Select
                      ref="selectStatus"
                      v-model:value="issueParams.status"
                      class="w-[20rem]"
                      :options="statusOption"
                    ></Select>
                  </template>

                  <!-- Normal -->
                  <template v-else>
                    <!-- New -->
                    <Select
                      v-if="issueParams.status === 1"
                      ref="selectStatus"
                      v-model:value="issueParams.status"
                      class="w-[20rem]"
                      :options="statusOptionDev"
                    >
                    </Select>

                    <Select
                      v-else-if="issueParams.status === 5"
                      ref="selectStatus"
                      v-model:value="issueParams.status"
                      class="w-[20rem]"
                      :options="statusOptionClosed"
                    ></Select>

                    <Select
                      v-else-if="issueParams.status === 6"
                      ref="selectStatus"
                      v-model:value="issueParams.status"
                      class="w-[20rem]"
                      :options="statusOptionReject"
                    ></Select>

                    <Select
                      v-else-if="issueParams.status === 2"
                      ref="selectStatus"
                      v-model:value="issueParams.status"
                      class="w-[20rem]"
                      :options="statusOptionReOpen"
                    ></Select>

                    <Select
                      v-else
                      ref="selectStatus"
                      v-model:value="issueParams.status"
                      class="w-[20rem]"
                      :options="statusOptionDev"
                    ></Select>
                  </template>
                </template>
              </template>
            </FormItem>

            <div>
              <Button @click="handleCreateIssue" v-if="isCreate" type="primary"
                >Create</Button
              >
              <Button @click="handleUpdateIssue" v-else type="primary"
                >Update</Button
              >
            </div>
          </div>

          <div class="issueDetail__border">
            <div class="issue__border--top">
              <h3>Details</h3>
            </div>

            <div class="p-[10px]">
              <div class="flex">
                <label class="w-[15rem]"
                  >Project ID <span class="text-red-600">&ast;</span></label
                >
                <FormItem name="assignee" class="mb-4 issueDetail__formitem">
                  <SkeletonButton active :block="true" v-if="isLoadIssue" />
                  <Select
                    v-else
                    v-model:value="issueParams.projectId"
                    :options="optionsProject"
                    @change="handleChangeProject"
                  >
                  </Select>
                </FormItem>
              </div>

              <div class="flex">
                <label class="w-[15rem]"
                  >Task ID <span class="text-red-600">&ast;</span></label
                >
                <FormItem name="assignee" class="mb-4 issueDetail__formitem">
                  <SkeletonButton active :block="true" v-if="isLoadIssue" />
                  <Select
                    v-else
                    v-model:value="issueParams.taskId"
                    :options="optionsTask"
                  >
                  </Select>
                </FormItem>
              </div>

              <div class="flex items-center">
                <label class="w-[15rem]"
                  >Reviewer <span class="text-red-600">&ast;</span></label
                >
                <FormItem name="reviewer" class="mb-4 issueDetail__formitem">
                  <SkeletonButton active :block="true" v-if="isLoadIssue" />

                  <Select v-else v-model:value="userInfo.fullname" disabled>
                    <template #suffixIcon>
                      <img
                        class="w-8 h-8 rounded-full"
                        :src="userInfo.avatar"
                        alt=""
                      />
                    </template>
                  </Select>
                </FormItem>
              </div>

              <div class="flex">
                <label class="w-[15rem]"
                  >Assignee <span class="text-red-600">&ast;</span></label
                >
                <FormItem
                  name="reviewer"
                  class="issueDetail__formitem assignee"
                >
                  <SkeletonButton active :block="true" v-if="isLoadIssue" />

                  <Select
                    v-else
                    ref="selectReview"
                    v-model:value="issueParams.assignee"
                    :options="optionsAccount"
                  >
                    <template #suffixIcon>
                      <img
                        class="w-8 h-8 rounded-full"
                        src="@/assets/images/default-wg-member.jpeg"
                        alt=""
                      />
                    </template>
                  </Select>

                  <FormItem class="mb-3">
                    <SkeletonButton
                      active
                      :block="true"
                      v-if="isLoadIssue"
                      style="height: 20px"
                    />

                    <Checkbox v-else v-model:checked="issueParams.noti">
                      <div class="issueDetail__checkbox">
                        Notification to assignee
                      </div>
                    </Checkbox>
                  </FormItem>
                </FormItem>
              </div>

              <div class="flex">
                <label class="w-[15rem]"
                  >Review Date <span class="text-red-600">&ast;</span></label
                >
                <FormItem class="issueDetail__formitem">
                  <SkeletonButton active :block="true" v-if="isLoadIssue" />
                  <DatePicker
                    v-else
                    v-model:value="issueParams.reviewDate"
                    value-format="YYYY-MM-DD"
                  >
                    <template #suffixIcon>
                      <img
                        src="@/assets/images/calender.png"
                        alt=""
                        class="issueDetail__icon"
                      />
                    </template>
                  </DatePicker>
                </FormItem>
              </div>

              <div class="flex">
                <label class="w-[15rem]"
                  >Reason <span class="text-red-600">&ast;</span></label
                >
                <FormItem name="classiff" class="mb-4 issueDetail__formitem">
                  <SkeletonButton active :block="true" v-if="isLoadIssue" />
                  <Select
                    v-else
                    v-model:value="issueParams.reason"
                    :options="reasonOption"
                  >
                  </Select>
                </FormItem>
              </div>

              <div class="flex mb-4 w-full justify-between">
                <div class="flex items-center">
                  <label class="w-[15rem]">Number updates</label>
                  <SkeletonButton
                    active
                    :block="true"
                    v-if="isLoadIssue"
                    style="width: 5rem"
                  />
                  <Input
                    v-else
                    v-model:value="issueParams.bugRepeat"
                    disabled
                    size="small"
                    class="w-[5rem] h-[32px] border-none text-center"
                  ></Input>
                </div>

                <div class="flex items-center">
                  <label class="w-[100px]">Bug Code</label>
                  <SkeletonButton
                    active
                    :block="true"
                    v-if="isLoadIssue"
                    style="width: 11rem"
                  />

                  <Input
                    v-else
                    v-model:value="issueParams.bugCode"
                    disabled
                    class="h-[32px] w-[11rem] border-none"
                  ></Input>
                </div>
              </div>

              <div class="flex">
                <label class="w-[15rem]">Fixer</label>
                <FormItem name="assignee" class="mb-4 issueDetail__formitem">
                  <SkeletonButton active :block="true" v-if="isLoadIssue" />

                  <Select
                    v-else
                    v-model:value="issueParams.fixer"
                    :options="optionsAccount"
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
                <label class="w-[15rem]">Fix Date</label>
                <FormItem class="issueDetail__formitem">
                  <SkeletonButton active :block="true" v-if="isLoadIssue" />

                  <DatePicker
                    v-else
                    v-model:value="issueParams.fixDate"
                    value-format="YYYY-MM-DD"
                  >
                    <template #suffixIcon>
                      <img
                        src="@/assets/images/calender.png"
                        alt=""
                        class="issueDetail__icon"
                      />
                    </template>
                  </DatePicker>
                </FormItem>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider orientation="left">History</Divider>

      <div class="issueDetail__history">
        <div
          class="history"
          v-for="item in sortCreatedDate(issueParams.historyList)"
          :key="'history' + item"
        >
          <template v-if="!isEmpty(item.from)">
            <div class="history__top">
              <div class="history__icon">
                <img src="@/assets/images/history.png" alt="" />
              </div>
              <div class="history__by">
                Updated by {{ convertText(item.createBy) }} at
                {{ convertDate(item.createDate) }}
              </div>
            </div>

            <div class="history__content">
              <div class="history__status">
                <!-- Status changed from Resolved to Closed -->
                <!-- {{ convertHistory(item) }} -->
                <ul class="ml-5">
                  <li
                    v-html="convertTitleBug(item)"
                    v-if="item.from.titleBug || item.to.titleBug"
                  ></li>
                  <li
                    v-html="convertHistory(item)"
                    v-if="item.from.contentBug || item.to.contentBug"
                  ></li>
                  <li
                    v-html="convertContentFix(item)"
                    v-if="item.from.contentFix || item.to.contentFix"
                  ></li>
                  <li
                    v-html="convertReason(item)"
                    v-if="item.from.reason || item.to.reason"
                  ></li>
                  <li
                    v-html="convertFixDate(item)"
                    v-if="item.from.fixDate || item.to.fixDate"
                  ></li>
                  <li
                    v-html="convertReviewDate(item)"
                    v-if="item.from.reviewDate || item.to.reviewDate"
                  ></li>
                </ul>
              </div>
            </div>
          </template>
        </div>
      </div>
    </Form>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
