<script lang="ts" setup>
import { ref } from "vue";
import {
  Progress,
  Modal,
  Input,
  Form,
  FormItem,
  Select,
  SelectOption,
  DatePicker,
} from "ant-design-vue";
import draggable from "vuedraggable";

// ==== Data ==== //
const notstarted = ref([
  "Cap nhat du an moi, tien do lam viec",
  "Cap nhat du an moi, tien do lam viec",
  "Cap nhat du an moi, tien do lam viec",
  "Cap nhat du an moi, tien do lam viec",
  "Cap nhat du an moi, tien do lam viec Chicken",
]);

const pending = ref([
  "Bat Cap nhat du an moi, tien do lam viec soup",
  "Spicy Cap nhat du an moi, tien do lam viec",
  "Cap nhat du an moi, tien do lam viec from Taco Bell",
]);

const processing = ref([
  "Bat Cap nhat du an moi, tien do lam viec soup",
  "Spicy Cap nhat du an moi, tien do lam viec",
  "Cap nhat du an moi, tien do lam viec from Taco Bell",
]);

const completed = ref([
  "Bat Cap nhat du an moi, tien do lam viec soup",
  "Spicy Cap nhat du an moi, tien do lam viec",
  "Cap nhat du an moi, tien do lam viec from Taco Bell",
]);

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
  assignee: 1,
  reviewer: 2,
  note: "abc",
  evidenceFile: "",
  history: "",
});

// ==== Method ==== //
function handleOkIssue() {
  isIssue.value = false;
}

function getCallLog() {
  isIssue.value = !isIssue.value;
}
</script>

<template>
  <div class="project">
    <h1 class="project__title">Projects</h1>

    <!-- List project -->
    <div class="project__contain">
      <div class="project__item" v-for="item in 5" :key="item + 's'">
        <img src="@/assets/images/bar-graph.png" alt="" />
        <div class="project__name">
          <h1>MASTER_DEV</h1>
          <p>MASTER_DEV</p>
        </div>
      </div>
    </div>
  </div>

  <div class="work">
    <h1 class="project__title">Tasks</h1>

    <div class="task__scroll">
      <div class="task__contain">
        <div class="task">
          <h1>NOT STARTED</h1>
          <draggable
            v-model="notstarted"
            tag="ul"
            group="meals"
            :animation="300"
          >
            <template #item="{ element: meal }">
              <div class="task__item" @click="getCallLog()">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="69"
                    status="active"
                  ></Progress>
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <div class="task">
          <h1>PENDING</h1>
          <draggable v-model="pending" tag="ul" group="meals" :animation="300">
            <template #item="{ element: meal }">
              <div class="task__item">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="69"
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
            v-model="processing"
            tag="ul"
            group="meals"
            :animation="300"
          >
            <template #item="{ element: meal }">
              <div class="task__item">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="69"
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
            v-model="completed"
            tag="ul"
            group="meals"
            :animation="300"
          >
            <template #item="{ element: meal }">
              <div class="task__item">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="69"
                    status="active"
                  ></Progress>
                </div>
              </div>
            </template>
          </draggable>
        </div>

        <div class="task">
          <h1>CLOSED</h1>
          <draggable
            v-model="completed"
            tag="ul"
            group="meals"
            :animation="300"
          >
            <template #item="{ element: meal }">
              <div class="task__item">
                <div class="task__wrap">
                  <img src="@/assets/images/task.png" alt="" />
                  <div class="task__name">{{ meal }}</div>
                </div>
                <div>
                  <Progress
                    :stroke-color="'#2BC48A'"
                    :percent="69"
                    status="active"
                  ></Progress>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <Modal
      v-model:visible="isIssue"
      wrapClassName="newStyle"
      @ok="handleOkIssue"
      :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
      :closable="false"
      :footer="null"
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
          class="grid grid-cols-2"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <div class="left">
            <FormItem name="titleBug" class="mb-3">
              <Input
                v-model:value="issueDetail.titleBug"
                placeholder="Title bug"
              />
            </FormItem>

            <FormItem label="Project ID" name="projectID" class="mb-3">
              <Select ref="select" v-model:value="issueDetail.projectId">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem label="Work CD" name="workCD" class="mb-3">
              <Select ref="select" v-model:value="issueDetail.workCd">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem label="Classiff" name="classiff" class="mb-3">
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem label="Priority" name="classiff" class="mb-3">
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem label="Content bug" name="classiff" class="mb-3">
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem label="Task ID" name="classiff" class="mb-3">
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>

            <FormItem label="Reason" name="classiff" class="mb-3">
              <Select ref="select" v-model:value="issueDetail.classSiff">
                <SelectOption value="1">Moshop</SelectOption>
                <SelectOption value="2">IGHTK</SelectOption>
                <SelectOption value="3">GHTK Pay</SelectOption>
                <SelectOption value="4">Fast X</SelectOption>
              </Select>
            </FormItem>
          </div>

          <div>
            <FormItem name="status" class="mb-3 flex">
              <Select ref="selectStatus" v-model:value="issueDetail.status">
                <SelectOption value="1">New</SelectOption>
                <SelectOption value="2">ReOpen</SelectOption>
                <SelectOption value="3">Developing</SelectOption>
                <SelectOption value="4">Resolve</SelectOption>
                <SelectOption value="4">Closed</SelectOption>
                <SelectOption value="4">Reject</SelectOption>
              </Select>

              <DatePicker >
                <template #suffixIcon>
                  <!-- <SmileOutlined /> -->
                  <img src="@/assets/images/calender.png" alt="" class="calender__icon"/>
                </template>
              </DatePicker>
            </FormItem>

            <div class="issue__border">
              <FormItem>

              </FormItem>

            </div>
          </div>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
