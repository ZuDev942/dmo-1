<script lang="ts" setup>
import { onMounted, ref } from "vue";
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
} from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

// ==== Data ==== //
const issueParams = ref({
  id: 0,
  projectId: "",
  priority: "LOW",
  reviewer: 1,
  taskId: 0,
  reason: 1,
  bugRepeat: 0,
  titleBug: "string",
  reviewDate: "2023-08-08T08:04:49.245Z",
  bugCode: "HRM-03-93",
  checkList: true,
  checklistReason: "string",
  contentBug: "",
  evidenceFile: "",
  assignee: 0,
  fixer: 0,
  fixDate: "2023-08-08T08:04:49.245Z",
  status: 1,
  contentFix: "string",
  note: "string",
  workCd: "",
  classSiff: 0,
  noti: false,
});
const editorContent = ref<string>("");
const editorContentFixer = ref<string>("");
const isEditor = ref(false);
const isEditorFixer = ref(false);
const userInfo = ref<any>({});

// ==== Option ==== //
const statusOption = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "New",
  },
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

const reasonOption = ref<SelectProps["options"]>([
  {
    value: 1,
    label: "Bug",
  },
  {
    value: 2,
    label: "Document Update",
  },
  {
    value: 3,
    label: "Leakage",
  },
]);

// ==== Method ==== //

onMounted(() => {
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    userInfo.value = JSON.parse(savedUser);
  }
});

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
}

function handleSaveText() {
  isEditor.value = false;

  issueParams.value.contentBug = editorContent.value;
}

function handleCancelText() {
  isEditor.value = false;
}
</script>

<template>
  <div class="issueDetail__contain">
    <Form
      ref="formRef"
      name="custom-validation"
      :model="issueParams"
      class="issueDetail"
    >
      <div class="issueDetail__top">
        <div class="issueDetail__left">
          <div class="mb-[2rem]">
            <div class="issueDetail__title">Title Bug</div>
            <FormItem name="projectID" class="mb-4 text-hrm-color">
              <Input
                v-model:value="issueParams.titleBug"
                placeholder="Title bug"
              />
            </FormItem>
          </div>

          <div class="mb-[2rem]">
            <label>Content bug</label>

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
                v-html="issueParams.contentFix"
                @click="handleChangeEditor"
              ></div>
            </FormItem>
          </div>
        </div>

        <!--  -->
        <div class="issueDetail__right">
          <div class="select__status">
            <FormItem class="w-[20rem]">
              <Select
                ref="selectStatus"
                v-model:value="issueParams.status"
                class="w-[20rem]"
                :options="statusOption"
              >
              </Select>
            </FormItem>
          </div>

          <div class="issueDetail__border">
            <div class="issue__border--top">
              <h3>Details</h3>
            </div>

            <div class="p-[10px]">
              <div class="flex">
                <label class="w-[15rem]">Project ID</label>
                <FormItem name="assignee" class="mb-4 issueDetail__formitem">
                  <Select v-model:value="issueParams.assignee">
                    <SelectOption value="1">Nguyen Thanh Nam</SelectOption>
                    <SelectOption value="2">IGHTK</SelectOption>
                    <SelectOption value="3">GHTK Pay</SelectOption>
                    <SelectOption value="4">Fast X</SelectOption>

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
                <label class="w-[15rem]">Task ID</label>
                <FormItem name="assignee" class="mb-4 issueDetail__formitem">
                  <Select v-model:value="issueParams.assignee">
                    <SelectOption value="1">Nguyen Thanh Nam</SelectOption>
                    <SelectOption value="2">IGHTK</SelectOption>
                    <SelectOption value="3">GHTK Pay</SelectOption>
                    <SelectOption value="4">Fast X</SelectOption>

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

              <div class="flex items-center">
                <label class="w-[15rem]">Reviewer</label>
                <FormItem name="reviewer" class="mb-4 issueDetail__formitem">
                  <Select v-model:value="userInfo.fullname" disabled>
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
                <label class="w-[15rem]">Assignee</label>
                <FormItem name="reviewer" class="issueDetail__formitem">
                  <Select
                    ref="selectReview"
                    v-model:value="issueParams.reviewer"
                  >
                    <SelectOption value="1">Le Duc A</SelectOption>
                    <SelectOption value="2">IGHTK</SelectOption>
                    <SelectOption value="3">GHTK Pay</SelectOption>
                    <SelectOption value="4">Fast X</SelectOption>

                    <template #suffixIcon>
                      <img
                        class="w-8 h-8 rounded-full"
                        src="@/assets/images/default-wg-member.jpeg"
                        alt=""
                      />
                    </template>
                  </Select>

                  <FormItem>
                    <Checkbox v-model:checked="issueParams.noti">
                      <div class="issueDetail__checkbox">
                        Notification to assignee
                      </div>
                    </Checkbox>
                  </FormItem>
                </FormItem>
              </div>

              <div class="flex">
                <label class="w-[15rem]">Review Date</label>
                <FormItem class="issueDetail__formitem">
                  <DatePicker
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
                <label class="w-[15rem]">Reason</label>
                <FormItem name="classiff" class="mb-4 issueDetail__formitem">
                  <Select
                    v-model:value="issueParams.reason"
                    :options="reasonOption"
                  >
                  </Select>
                </FormItem>
              </div>

              <div class="flex mb-4 w-full justify-between">
                <div class="flex items-center">
                  <label class="w-[15rem]">Bug Repeat</label>
                  <Input
                    v-model:value="issueParams.bugRepeat"
                    disabled
                    size="small"
                    class="w-[5rem] h-[32px] border-none text-center"
                  ></Input>
                </div>

                <div class="flex items-center">
                  <label class="w-[100px]">Bug Code</label>
                  <Input
                    v-model:value="issueParams.bugCode"
                    disabled
                    class="h-[32px] w-[11rem] border-none"
                  ></Input>
                </div>
              </div>

              <div class="flex">
                <label class="w-[15rem]">Fixer</label>
                <FormItem name="assignee" class="mb-4 issueDetail__formitem">
                  <Select v-model:value="issueParams.fixer">
                    <SelectOption value="1">Nguyen Thanh Nam</SelectOption>
                    <SelectOption value="2">IGHTK</SelectOption>
                    <SelectOption value="3">GHTK Pay</SelectOption>
                    <SelectOption value="4">Fast X</SelectOption>

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
                  <DatePicker
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
        <div class="history" v-for="item in 6" :key="'history' + item">
          <div class="history__top">
            <div class="history__icon">
              <img src="@/assets/images/history.png" alt="" />
            </div>
            <div class="history__by">
              Updated by Nguyễn Thị Mai at 08-08-2023 13:31
            </div>
          </div>

          <div class="history__content">
            <div class="history__dot"></div>
            <div class="history__status">Status changed from Resolved to Closed</div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
