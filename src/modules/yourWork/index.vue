<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  Progress,
  Modal,
  Input,
  Form,
  FormItem,
  Select,
  SelectOption,
  DatePicker,
  Textarea,
  Upload,
  Button,
  UploadProps,
  Checkbox,
} from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import draggable from "vuedraggable";
import { yourworkService } from "@/services";
import { filter } from "lodash";

// ==== Data ==== //
const NOTSTARTED = ref<any[]>();
const PENDING = ref<any[]>();
const PROCESSING = ref<any[]>();
const COMPLETED = ref<any[]>();
const CANCELED = ref<any[]>();
const isIssue = ref<boolean>(false);
const issueDetail = ref({
  titleBug: "Bug mock up project abc, do dai descripsion",
  projectId: "GHTK",
  workCd: 1,
  classSiff: 1,
  priority: 1,
  contentBug: "da confirm",
  taskId: 1,
  reason: 1,
  bugRepeat: 2,
  bugCode: "external",
  checklistReason: {
    status: true,
    note: "",
  },
  status: "New",
  reviewDate: "12/12/2022",
  assignee: "Nguyen Thanh Cat",
  reviewer: "Le Duc A",
  note: "abc",
  evidenceFile: "",
  history: "",
});

const fileList1 = ref<UploadProps["fileList"]>([
  {
    uid: "-1",
    name: "xxx.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
  {
    uid: "-2",
    name: "yyy.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
]);

// ==== Method ==== //
onMounted(() => {
  console.log("redirict list task...");
  handleGetListTask();
});

function handleOkIssue() {
  isIssue.value = false;
}

function getCallLog() {
  isIssue.value = !isIssue.value;
}

async function handleGetListTask() {
  const res = await yourworkService.getListTask();

  NOTSTARTED.value = filter(res, (item) => item.status === 1);
  PENDING.value = filter(res, (item) => item.status === 2);
  PROCESSING.value = filter(res, (item) => item.status === 3);
  COMPLETED.value = filter(res, (item) => item.status === 4);
  CANCELED.value = filter(res, (item) => item.status === 5);
}
</script>

<template>
  <div class="project">
    <h1 class="project__title">Recent projects</h1>

    <!-- List project -->
    <div class="project__contain">
      <div class="project__me" v-for="item in 5" :key="'project' + item">
        <div class="project__blur">
          <img
            src="https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project"
            alt=""
          />
        </div>
        <div class="project__des">
          <h3>Human Resource</h3>
          <p>Team project</p>

          <div class="project__link">
            <!-- <span>open issue</span> -->
            <!-- <span>open task</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="work">
    <h1 class="project__title" @click="handleGetListTask">Tasks</h1>

    <div class="task__scroll">
      <div class="task__contain">
        <div class="task">
          <h1>NOT STARTED</h1>
          <draggable
            v-model="NOTSTARTED"
            tag="ul"
            group="meals"
            :animation="300"
          >
            <template #item="{ element: meal }">
              <div class="task__item" @click="getCallLog()">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal.task_name }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="meal.processing"
                    status="active"
                  ></Progress>
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <div class="task">
          <h1>PENDING</h1>
          <draggable v-model="PENDING" tag="ul" group="meals" :animation="300">
            <template #item="{ element: meal }">
              <div class="task__item">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal.task_name }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="meal.processing"
                    status="active"
                  ></Progress>
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <div class="task">
          <h1>PROCESSING</h1>
          <draggable
            v-model="PROCESSING"
            tag="ul"
            group="meals"
            :animation="300"
          >
            <template #item="{ element: meal }">
              <div class="task__item">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal.task_name }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="meal.processing"
                    status="active"
                  ></Progress>
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <div class="task">
          <h1>COMPLETED</h1>
          <draggable
            v-model="COMPLETED"
            tag="ul"
            group="meals"
            :animation="300"
          >
            <template #item="{ element: meal }">
              <div class="task__item">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal.task_name }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="meal.processing"
                    status="active"
                  ></Progress>
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <div class="task">
          <h1>CANCELED</h1>
          <draggable v-model="CANCELED" tag="ul" group="meals" :animation="300">
            <template #item="{ element: meal }">
              <div class="task__item">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal.task_name }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="meal.processing"
                    status="active"
                  ></Progress>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <!--  -->
    <Modal
      v-model:visible="isIssue"
      wrapClassName="newStyle"
      @ok="handleOkIssue"
      :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
      :closable="false"
      :footer="null"
      width="1000px"
    >
      <!-- <Button @click="handleOk">Close</Button> -->
      <div class="modal__header">
        <div class="modal__title">
          <img src="@/assets/images/pencil.png" alt="" />
          <h3>Add issue</h3>
        </div>
        <img src="@/assets/images/close.png" alt="" @click="handleOkIssue" />
      </div>

      <div class="modal__wrap">
        <Form
          ref="formRef"
          name="custom-validation"
          :model="issueDetail"
          class="grid grid-cols-2 gap-8"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <div class="left">
            <div class="mb-4 select__title">
              <Input
                v-model:value="issueDetail.titleBug"
                placeholder="Title bug"
                class="text-[1.6rem] text-hrm-color"
              />
            </div>

            <FormItem
              label="Project ID"
              name="projectID"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.projectId">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem label="Work CD" name="workCD" class="mb-4 text-hrm-color">
              <Select ref="select" v-model:value="issueDetail.workCd">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem
              label="Classiff"
              name="classiff"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem
              label="Priority"
              name="classiff"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem
              label="Content bug"
              name="contentBug"
              class="mb-4 text-hrm-color"
            >
              <Textarea
                v-model:value="issueDetail.contentBug"
                placeholder="Add a description"
              ></Textarea>
            </FormItem>

            <FormItem
              label="Task ID"
              name="classiff"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem
              label="Reason"
              name="classiff"
              class="mb-4 text-hrm-color"
            >
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <div class="flex mb-4 w-full justify-between">
              <div class="flex items-center">
                <div class="w-[155px]">Bug Repeat</div>
                <Input
                  v-model:value="issueDetail.bugRepeat"
                  disabled
                  size="small"
                  class="w-[40px] h-[32px] border-none text-center"
                ></Input>
              </div>

              <div class="flex items-center">
                <div class="w-[100px]">Bug Code</div>
                <Input
                  v-model:value="issueDetail.bugCode"
                  disabled
                  class="h-[32px] w-[170px] border-none"
                ></Input>
              </div>
            </div>

            <FormItem
              label="Checklist Reason"
              name="bugCode"
              class="mb-4 text-hrm-color"
            >
              <Checkbox v-model:checked="issueDetail.checklistReason.status">
                <Input
                  v-model:value="issueDetail.checklistReason.note"
                  :disabled="!issueDetail.checklistReason.status"
                  class="w-full"
                />
              </Checkbox>
            </FormItem>
          </div>

          <!--  -->
          <div>
            <div class="mb-4 select__status">
              <Select
                ref="selectStatus"
                v-model:value="issueDetail.status"
                class="mr-3"
              >
                <SelectOption value="1">New</SelectOption>
                <SelectOption value="2">ReOpen</SelectOption>
                <SelectOption value="3">Developing</SelectOption>
                <SelectOption value="4">Resolve</SelectOption>
                <SelectOption value="4">Closed</SelectOption>
                <SelectOption value="4">Reject</SelectOption>
              </Select>

              <DatePicker>
                <template #suffixIcon>
                  <img
                    src="@/assets/images/calender.png"
                    alt=""
                    class="calender__icon"
                  />
                </template>
              </DatePicker>
            </div>

            <div class="issue__border">
              <div class="issue__border--top">
                <h3>Details</h3>
              </div>

              <div class="p-[10px]">
                <FormItem
                  label="Assignee"
                  name="assignee"
                  class="mb-4 select__assignee"
                >
                  <Select
                    ref="selectAssign"
                    v-model:value="issueDetail.assignee"
                  >
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

                <FormItem
                  label="Reviewer"
                  name="reviewer"
                  class="mb-4 select__assignee"
                >
                  <Select
                    ref="selectReview"
                    v-model:value="issueDetail.reviewer"
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
                </FormItem>

                <FormItem label="Note" name="note" class="mb-4">
                  <Textarea v-model:value="issueDetail.note"></Textarea>
                </FormItem>

                <Upload
                  v-model:file-list="fileList1"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                >
                  <Button>
                    <UploadOutlined></UploadOutlined>
                  </Button>
                </Upload>
              </div>
            </div>

            <div class="issue__border">
              <div class="issue__border--top">
                <h3>History</h3>
              </div>
              <div class="p-[10px]">a</div>
            </div>
          </div>
        </Form>
      </div>

      <div class="modal__footer">
        <Button class="modal__btn">CREATE</Button>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
