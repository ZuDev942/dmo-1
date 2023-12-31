<script lang="ts" setup>
import { createVNode, onMounted, reactive, ref, watch, watchEffect } from "vue";
import {
  Button,
  Progress,
  Input,
  Table,
  Tag,
  Tooltip,
  Dropdown,
  Modal,
  Drawer,
} from "ant-design-vue";
import {
  PlusOutlined,
  SearchOutlined,
  CloseOutlined,
  FilterOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import type { IDataSource } from "@/components";
import { issueService } from "@/services";
import { debounce, filter, isEmpty } from "lodash";
import moment from "moment";
import router from "@/router";
import { RouteName } from "@/shared/constants";
import { issueStore } from "@/store";
import { IssueDetail } from "@/components";

const useIssue = issueStore();

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
      title: "Bug Code",
      dataIndex: "bugcode",
      width: 50,
      fixed: "left",
    },
    {
      title: "Project Task",
      dataIndex: "project",
      width: 100,
    },
    {
      title: "Title Bug",
      dataIndex: "titlebug",
      width: 80,
    },
    {
      title: "Reason bug",
      dataIndex: "reason",
      width: 40,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: 50,
    },
    {
      title: "Classify",
      dataIndex: "classify",
      width: 50,
    },
    {
      title: "Content Bug",
      dataIndex: "contentbug",
      width: 100,
    },
    {
      title: "Bug Repeat",
      dataIndex: "bugrepeat",
      width: 50,
    },
    {
      title: "Reviewer",
      dataIndex: "reviewer",
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 50,
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      width: 70,
    },
    {
      title: "Log Date",
      dataIndex: "logdate",
      width: 50,
    },
    {
      title: "Fix Date",
      dataIndex: "fixdate",
      width: 50,
    },
  ],
});
const value = ref<string>("");
const searchText = ref("");
const idProject = ref<number>();
const positionId = ref<number>(0);
const originIssues = ref<any>([]);

// ==== Method ==== //
onMounted(() => {
  handleGetIssues();

  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    const userInfo = JSON.parse(savedUser);

    positionId.value = userInfo.position;
  }
});

watchEffect(() => {
  idProject.value = Number(router.currentRoute.value.params.id);
});

function handleClear() {
  searchText.value = "";
}

async function handleGetIssues() {
  dataSource.loading = true;

  const req = {
    projectId: useIssue.idProject,
  };

  const res = await issueService.getIssueByProject(req).finally(() => {
    dataSource.loading = false;
  });

  if (res.status === "SUCCESS") {
    originIssues.value = res.data;
    dataSource.data = res.data;
  }
}

function shortenText(text) {
  if (text.length <= 35) {
    return text;
  }

  const shortenedText = text.substring(0, 35 - 3) + " ...";
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

const convertDate = (date) => {
  if (date) {
    return moment(date).format("DD-MM-YYYY");
  }

  return "";
};

const convertReason = (reason: string) => {
  if (reason === "1") {
    return "Bug";
  }

  if (reason === "2") {
    return "Document";
  }

  if (reason === "3") {
    return "Lackage";
  }

  return "";
};

const convertStatus = (status: number) => {
  if (status === 1) {
    return "NEW";
  }
  if (status === 2) {
    return "RE OPEN";
  }
  if (status === 3) {
    return "DEVELOPING";
  }
  if (status === 4) {
    return "RESOLVE";
  }
  if (status === 5) {
    return "CLOSED";
  }
  if (status === 6) {
    return "REJECT";
  }
  return "";
};

function handleCreateTask() {}

// Filter

function handleOpenIssue() {
  router.push({
    name: RouteName.ISSUE,
    // params: { id: null },
    path: 'issue',

  });
  const idP = idProject.value;
  useIssue.setProjectID(idP);
  // isOpenIssue.value = true;
}

function handleGetIssueDetail(idIssue: number) {
  router.push({
    name: RouteName.ISSUE,
    path: 'issue',
    params: { id: idIssue },
  });
}

async function deleteTask(id: number) {
  Modal.confirm({
    title: "Do you want to delete issue?",
    icon: createVNode(ExclamationCircleOutlined),
    async onOk() {},
    onCancel() {},
  });
}

watch(
  searchText,
  debounce(() => {
    handleSearch();
  }, 300)
);

function handleSearch() {
  dataSource.data = filter(originIssues.value, (item: any) =>
    item.taskName.toLowerCase().includes(searchText.value)
  );
}

const isOpenIssue = ref<boolean>(false);
const isTypeIssue = ref<string>("create");
const afterOpenChange = (bool: boolean) => {
  console.log("open", bool);
};
</script>

<template>
  <div class="issue">
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

        <!-- <Dropdown :trigger="['click']">
          <Button class="btn__filter" @click.prevent>
            <FilterOutlined /> Filter
          </Button>

          <template #overlay>
            <div class="filter">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Praesentium, quo porro in sit laborum ullam veritatis quos esse
              maxime. Nesciunt incidunt distinctio cumque eum quo dolores? Cum
              saepe atque adipisci.
            </div>
          </template>
        </Dropdown> -->
      </div>

      <div v-if="positionId === 2">
        <Button type="primary" @click="handleOpenIssue()">
          <PlusOutlined /> Create Issue {{ positionId }}
        </Button>
      </div>
    </div>

    <div class="h-[524px]">
      <Table
        :columns="dataSource.columns"
        :data-source="dataSource.data"
        class="custom-table"
        :scroll="{ x: 2300, y: 480 }"
        :loading="dataSource.loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'project'">
            <div
              class="font-[500] cursor-pointer"
              @click="handleGetIssueDetail(record.id)"
            >
              {{ shortenText(record.taskName) }}
            </div>
          </template>
          <template v-if="column.dataIndex === 'bugcode'">
            <Tag color="#FFE2DD">
              <span class="text-[#424040e0] font-[600]">
                {{ record.bugCode }}
              </span>
            </Tag>
          </template>

          <template v-if="column.dataIndex === 'priority'">
            <div>{{ record.priority }}</div>
          </template>

          <template v-if="column.dataIndex === 'classify'"> GUI </template>

          <template v-if="column.dataIndex === 'reason'">
            <div class="issue__reason">
              <!-- <img src="@/assets/images/docs.png" alt="" /> -->
              <span>{{ convertReason(record.reason) }}</span>
            </div>
          </template>

          <template v-if="column.dataIndex === 'titlebug'">
            <Tooltip>
              <template #title>{{ record.titleBug }}</template>
              <div class="issue__overflow">
                {{ shortenText(record.titleBug) }}
              </div>
            </Tooltip>
          </template>

          <template v-if="column.dataIndex === 'contentbug'">
            <div v-html="shortenText(record.contentBug)" class="flex"></div>
          </template>

          <template v-if="column.dataIndex === 'bugrepeat'">
            {{ record.bugRepeat }}
          </template>

          <template v-if="column.dataIndex === 'reviewer'">
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full mr-3"
                src="@/assets/images/default-wg-member.jpeg"
                alt=""
              />
              <div>{{ record.reviewerName }}</div>
            </div>
          </template>

          <template v-if="column.dataIndex === 'assignee'">
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full mr-3"
                src="@/assets/images/default-wg-member.jpeg"
                alt=""
              />
              <div>{{ record.assigneeName }}</div>
            </div>
          </template>

          <template v-if="column.dataIndex === 'status'">
            <Tag color="#DFE1E6" class="cursor-pointer">
              <span
                class="cursor-pointer text-[#44546f] font-[700] text-[1.1rem]"
              >
                {{ convertStatus(record.status) }}
              </span>
            </Tag>
            <!-- <div>

              <Tag
                v-else-if="record.status === 'CANCELED'"
                color="#DFFCF0"
                class="cursor-pointer"
              >
                <span
                  class="cursor-pointer text-[#216E4E] font-[700] text-[1.1rem]"
                >
                  {{ convertStatus("CANCELED") }}
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
                  {{ convertStatus("PENDING") }}
                </span>
              </Tag>
            </div> -->
          </template>

          <template v-if="column.dataIndex === 'logdate'">
            <Tag
              color="#F4F5F7"
              class="cursor-pointer"
              v-if="checkDueDate(record.reviewDate)"
            >
              <span
                class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
              >
                {{ convertDate(record.reviewDate) }}
              </span>
            </Tag>

            <Tag color="#FFEBE6" class="cursor-pointer" v-else>
              <span
                class="cursor-pointer text-[#BF2600] font-[500] text-[1.3rem]"
              >
                {{ convertDate(record.reviewDate) }}
              </span>
            </Tag>
          </template>

          <template v-if="column.dataIndex === 'fixdate'">
            <Tag color="#F4F5F7" class="cursor-pointer">
              <span
                class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
              >
                {{ convertDate(record.fixDate) }}
              </span>
            </Tag>
          </template>
          <template v-if="column.dataIndex === 'delete'">
            <div @click="deleteTask(record.id)">
              <DeleteOutlined />
            </div>
          </template>
        </template>
      </Table>
    </div>

    <Drawer
      v-model:open="isOpenIssue"
      class="custom-class"
      root-class-name="root-class-name"
      :style="{ position: 'absolute' }"
      title="Basic Drawer"
      placement="right"
      @after-open-change="afterOpenChange"
    >
      <IssueDetail :is-type-issue="isTypeIssue"></IssueDetail>
    </Drawer>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
