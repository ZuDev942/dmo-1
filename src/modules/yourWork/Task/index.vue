<script lang="ts" setup>
import { ref } from "vue";
import {
  Tabs,
  TabPane,
  Tooltip,
  Button,
  InputSearch,
  Progress,
  Modal,
  Input,
  Textarea,
  Select,
  SelectOption,
  FormItem,
} from "ant-design-vue";
import { PlusOutlined, PaperClipOutlined } from "@ant-design/icons-vue";

import draggable from "vuedraggable";

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

const activeKey = ref<string>("1");
const value = ref<string>("");
const NOTSTARTED = ref<any[]>();
const PENDING = ref<any[]>();
const PROCESSING = ref<any[]>();
const COMPLETED = ref<any[]>();
const CANCELED = ref<any[]>();
const isTask = ref<boolean>(false);
const taskDetail = ref({
  task_name: "Dich vu XFast",
  des: "",
  activity: "",
  status: "New",
  assignee: "Nguyen Thanh A",
  reporter: "Le Duc A",
});
// ==== Method ==== //
function handleOkTask() {
  isTask.value = false;
}

function handleTask() {
  isTask.value = true;
}
</script>

<template>
  <div class="tasks">
    <Tabs v-model:activeKey="activeKey" type="card">
      <!-- Profile -->
      <TabPane key="1" tab="ISSUE">
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
                  <div class="task__item">
                    <div class="task__wrap">
                      <div class="task__name">{{ meal }}</div>
                    </div>

                    <div class="task__des">
                      <div class="task__detail">
                        <img src="@/assets/images/bookmark.png" alt="" />
                        <p>Popup task detail</p>
                      </div>

                      <div class="task__staff">
                        <Tooltip>
                          <template #title>Nguyen Thanh A</template>
                          <img src="@/assets/images/avatar.jpeg" alt="" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>

            <div class="task">
              <h1>PENDING</h1>
              <draggable
                v-model="pending"
                tag="ul"
                group="meals"
                :animation="300"
              >
                <template #item="{ element: meal }">
                  <div class="task__item">
                    <div class="task__wrap">
                      <div class="task__name">{{ meal }}</div>
                    </div>

                    <div class="task__des">
                      <div class="task__detail">
                        <img src="@/assets/images/bookmark.png" alt="" />
                        <p>Popup task detail</p>
                      </div>

                      <div class="task__staff">
                        <Tooltip>
                          <template #title>Nguyen Thanh A</template>
                          <img src="@/assets/images/avatar.jpeg" alt="" />
                        </Tooltip>
                      </div>
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
                      <div class="task__name">{{ meal }}</div>
                    </div>

                    <div class="task__des">
                      <div class="task__detail">
                        <img src="@/assets/images/bookmark.png" alt="" />
                        <p>Popup task detail</p>
                      </div>

                      <div class="task__staff">
                        <Tooltip>
                          <template #title>Nguyen Thanh A</template>
                          <img src="@/assets/images/avatar.jpeg" alt="" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>

            <div class="task">
              <h1>COMPLETED</h1>
              <draggable
                v-model="notstarted"
                tag="ul"
                group="meals"
                :animation="300"
              >
                <template #item="{ element: meal }">
                  <div class="task__item">
                    <div class="task__wrap">
                      <div class="task__name">{{ meal }}</div>
                    </div>

                    <div class="task__des">
                      <div class="task__detail">
                        <img src="@/assets/images/bookmark.png" alt="" />
                        <p>Popup task detail</p>
                      </div>

                      <div class="task__staff">
                        <Tooltip>
                          <template #title>Nguyen Thanh A</template>
                          <img src="@/assets/images/avatar.jpeg" alt="" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>

            <div class="task">
              <h1>CLOSED</h1>
              <draggable
                v-model="notstarted"
                tag="ul"
                group="meals"
                :animation="300"
              >
                <template #item="{ element: meal }">
                  <div class="task__item">
                    <div class="task__wrap">
                      <div class="task__name">{{ meal }}</div>
                    </div>

                    <div class="task__des">
                      <div class="task__detail">
                        <img src="@/assets/images/bookmark.png" alt="" />
                        <p>Popup task detail</p>
                      </div>

                      <div class="task__staff">
                        <Tooltip>
                          <template #title>Nguyen Thanh A</template>
                          <img src="@/assets/images/avatar.jpeg" alt="" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </TabPane>

      <!-- Contract -->
      <TabPane key="2" tab="TASK">
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
                  <div class="task__item" @click="handleTask">
                    <div class="task__wrap">
                      <div class="task__name">{{ meal }}</div>
                    </div>
                    <!-- Processing -->
                    <div>
                      <Progress
                        :stroke-color="{
                          from: '#2bc48a',
                          to: '#2bc48a',
                        }"
                        :percent="69"
                        status="active"
                      ></Progress>
                    </div>

                    <!--  -->
                    <div class="task__des2">
                      <div class="task__category">
                        <img src="@/assets/images/label.png" alt="" />
                        <p>New development</p>
                      </div>

                      <Tooltip>
                        <template #title>Actual time/ Estimate time</template>
                        <div class="task__actual">
                          <img src="@/assets/images/checked.png" alt="" />
                          <p>0/1</p>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>

            <div class="task">
              <h1>PENDING</h1>
              <draggable
                v-model="pending"
                tag="ul"
                group="meals"
                :animation="300"
              >
                <template #item="{ element: meal }">
                  <div class="task__item">
                    <div class="task__wrap">
                      <div class="task__name">{{ meal }}</div>
                    </div>
                    <!-- Processing -->
                    <div>
                      <Progress
                        :stroke-color="{
                          from: '#2bc48a',
                          to: '#2bc48a',
                        }"
                        :percent="69"
                        status="active"
                      ></Progress>
                    </div>

                    <!--  -->
                    <div class="task__des2">
                      <div class="task__category">
                        <img src="@/assets/images/label.png" alt="" />
                        <p>New development</p>
                      </div>

                      <Tooltip>
                        <template #title>Actual time/ Estimate time</template>
                        <div class="task__actual">
                          <img src="@/assets/images/checked.png" alt="" />
                          <p>0/1</p>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>

            <!--  -->
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
                      <div class="task__name">{{ meal }}</div>
                    </div>
                    <!-- Processing -->
                    <div>
                      <Progress
                        :stroke-color="{
                          from: '#2bc48a',
                          to: '#2bc48a',
                        }"
                        :percent="69"
                        status="active"
                      ></Progress>
                    </div>

                    <!--  -->
                    <div class="task__des2">
                      <div class="task__category">
                        <img src="@/assets/images/label.png" alt="" />
                        <p>New development</p>
                      </div>

                      <Tooltip>
                        <template #title>Actual time/ Estimate time</template>
                        <div class="task__actual">
                          <img src="@/assets/images/checked.png" alt="" />
                          <p>0/1</p>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
            <!--  -->
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
                      <div class="task__name">{{ meal }}</div>
                    </div>
                    <!-- Processing -->
                    <div>
                      <Progress
                        :stroke-color="{
                          from: '#2bc48a',
                          to: '#2bc48a',
                        }"
                        :percent="69"
                        status="active"
                      ></Progress>
                    </div>

                    <!--  -->
                    <div class="task__des2">
                      <div class="task__category">
                        <img src="@/assets/images/label.png" alt="" />
                        <p>New development</p>
                      </div>

                      <Tooltip>
                        <template #title>Actual time/ Estimate time</template>
                        <div class="task__actual">
                          <img src="@/assets/images/checked.png" alt="" />
                          <p>0/1</p>
                        </div>
                      </Tooltip>
                    </div>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </TabPane>

      <!-- Search -->
      <template #rightExtra v-if="activeKey === '1'">
        <InputSearch
          v-model:value="value"
          placeholder="Search this board..."
          style="width: 200px"
          class="input_search mr-4"
        />
        <Button><PlusOutlined /> Create Issue</Button>
      </template>

      <template #rightExtra v-if="activeKey === '2'">
        <InputSearch
          v-model:value="value"
          placeholder="Search this board..."
          style="width: 200px"
          class="input_search mr-4"
        />
        <Button><PlusOutlined /> Create Task</Button>
      </template>
    </Tabs>

    <Modal
      v-model:visible="isTask"
      wrapClassName="newStyle"
      @ok="handleOkTask"
      :bodyStyle="{ padding: 0, 'border-radius': '10px' }"
      :closable="false"
      :footer="null"
      width="1000px"
    >
      <!-- <Button @click="handleOk">Close</Button> -->
      <div class="modal__header">
        <div class="modal__title">
          <img src="@/assets/images/pencil.png" alt="" />
          <h3>Add Task</h3>
        </div>
        <img src="@/assets/images/close.png" alt="" @click="handleOkTask" />
      </div>

      <div class="modal__wrap flex taskdetail">
        <div class="w-[60%]">
          <Input v-model:value="taskDetail.task_name" />
          <Button class="taskdetail__attach">
            <template #icon>
              <PaperClipOutlined />
            </template>
            Attach
          </Button>

          <div class="taskdetail__wrap">
            <p class="mb-3">Description</p>
            <Textarea
              v-model:value="taskDetail.des"
              :bordered="false"
              placeholder="Add a description..."
            ></Textarea>
          </div>

          <div class="taskdetail__wrap">
            <p class="mb-3">Attachments(2)</p>
            <div class="flex">
              <div class="taskdetail__img">
                <img src="@/assets/images/avatar.jpeg" alt="" />
                <div>Bug-img.png</div>
              </div>

              <div class="taskdetail__img">
                <img src="@/assets/images/avatar.jpeg" alt="" />
                <div>Bug-img2.png</div>
              </div>
            </div>
          </div>

          <div class="taskdetail__wrap">
            <p class="mb-3">Activity</p>
            <div class="flex">
              <div class="taskdetail__activity">
                <img src="@/assets/images/default-wg-member.jpeg" alt="" />
              </div>
              <Input
                v-model:value="taskDetail.activity"
                placeholder="Add a comment..."
              />
            </div>
          </div>
        </div>

        <div class="w-[40%] ml-5">
          <div class="taskdetail__status">
            <Select ref="selectStatus" v-model:value="taskDetail.status">
              <SelectOption value="1">New</SelectOption>
              <SelectOption value="2">ReOpen</SelectOption>
              <SelectOption value="3">Developing</SelectOption>
              <SelectOption value="4">Resolve</SelectOption>
              <SelectOption value="4">Closed</SelectOption>
              <SelectOption value="4">Reject</SelectOption>
            </Select>
          </div>

          <div class="taskdetail__border">
            <div class="taskdetail__title">
              <h4>Details</h4>
            </div>
            <div class="taskdetail__details">
              <FormItem
                label="Assignee"
                name="assignee"
                class="mb-4 taskdetail__assignee"
              >
                <Select ref="selectAssign" v-model:value="taskDetail.assignee">
                  <SelectOption value="1">Nguyen Thanh Nam</SelectOption>
                  <SelectOption value="2">Nguyen Thanh B</SelectOption>
                  <SelectOption value="3">Nguyen Thanh Pay</SelectOption>
                  <SelectOption value="4">Nguyen Thanh X</SelectOption>

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
                label="Reporter"
                name="reporter"
                class="mb-4 taskdetail__assignee"
              >
                <Select ref="selectAssign" v-model:value="taskDetail.reporter">
                  <SelectOption value="1">Nguyen Thanh Nam</SelectOption>
                  <SelectOption value="2">Nguyen Thanh B</SelectOption>
                  <SelectOption value="3">Nguyen Thanh Pay</SelectOption>
                  <SelectOption value="4">Nguyen Thanh X</SelectOption>

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
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
