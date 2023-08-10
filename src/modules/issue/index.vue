<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import {
  Button,
  Progress,
  Input,
  Table,
  Tag,
  Tooltip,
  Dropdown,
} from "ant-design-vue";
import {
  PlusOutlined,
  SearchOutlined,
  CloseOutlined,
  FilterOutlined,
} from "@ant-design/icons-vue";
import type { IDataSource } from "@/components";
import { issueService } from "@/services";
import { isEmpty } from "lodash";
import moment from "moment";

const dataSource = reactive<IDataSource>({
  loading: false,
  noDataText: "No data",
  pagination: {
    totalPage: 0,
    page: 1,
  },
  data: [1, 2, 3, 4, 5, 6],
  columns: [
    {
      title: "Project Task",
      dataIndex: "project",
      width: 100,
      fixed: "left",
    },
    {
      title: "Bug Code",
      dataIndex: "bugcode",
      width: 50,
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

// ==== Method ==== //
onMounted(() => {
  handleGetIssues();
});

function handleClear() {
  searchText.value = "";
}

async function handleGetIssues() {
  const req = {
    pageIndex: 1,
    pageSize: 10,
  };

  const res = await issueService.getIssue(req);

  if (res.status === "SUCCESS") {
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

function handleCreateTask() {}

// Filter
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

        <Dropdown :trigger="['click']">
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
        </Dropdown>
      </div>
      <div>
        <Button type="primary"><PlusOutlined /> Create Issue</Button>
      </div>
    </div>

    <div class="h-[524px]">
      <Table
        :columns="dataSource.columns"
        :data-source="dataSource.data"
        class="custom-table"
        :scroll="{ x: 2500, y: 480 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'project'">
            <div class="font-[500] cursor-pointer">Tim kiếm task đã hoàn thành</div>
            <!-- <div class="text-[#209653]">Tim kiếm task đã hoàn thành</div> -->
          </template>
          <template v-if="column.dataIndex === 'bugcode'">
            <Tag color="#FFE2DD">
              <span class="text-[#424040e0] font-[600]">HR-01-04</span>
            </Tag>
          </template>

          <template v-if="column.dataIndex === 'priority'">
            <div>Low</div>
          </template>

          <template v-if="column.dataIndex === 'classify'"> GUI </template>

          <template v-if="column.dataIndex === 'reason'">
            <div class="issue__reason">
              <!-- <img src="@/assets/images/docs.png" alt="" /> -->
              <span>Bug</span>
            </div>
          </template>

          <template v-if="column.dataIndex === 'titlebug'">
            <Tooltip>
              <template #title>Lỗi Upload ảnh khi dung lượng > 25mb</template>
              <div class="issue__overflow">
                Lỗi Upload ảnh khi dung lượng > 25mb
              </div>
            </Tooltip>
          </template>

          <template v-if="column.dataIndex === 'contentbug'">
            <div>Lỗi Upload ảnh khi dung lượng > 25mb</div>
          </template>

          <template v-if="column.dataIndex === 'bugrepeat'"> 0 </template>

          <template v-if="column.dataIndex === 'reviewer'">
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full mr-3"
                src="@/assets/images/default-wg-member.jpeg"
                alt=""
              />
              <div>Vũ Văn Đạt</div>
            </div>
          </template>

          <template v-if="column.dataIndex === 'assignee'">
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full mr-3"
                src="@/assets/images/default-wg-member.jpeg"
                alt=""
              />
              <div>Nguyễn Việt Hoàng</div>
            </div>
          </template>

          <template v-if="column.dataIndex === 'status'">
            <div>
              <Tag
                v-if="record.projectStatus === 'NOT_STARTED'"
                color="#DFE1E6"
                class="cursor-pointer"
              >
                <span
                  class="cursor-pointer text-[#44546f] font-[700] text-[1.1rem]"
                >
                  {{ convertStatus("NOT_STARTED") }}
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
            </div>
          </template>
          <template v-if="column.dataIndex === 'logdate'">
            <Tag
              color="#F4F5F7"
              class="cursor-pointer"
              v-if="checkDueDate('09-08-2023')"
            >
              <span
                class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
              >
                {{ convertDate("09-08-2023") }}
              </span>
            </Tag>

            <Tag color="#FFEBE6" class="cursor-pointer" v-else>
              <span
                class="cursor-pointer text-[#BF2600] font-[500] text-[1.3rem]"
              >
                {{ convertDate("09-08-2023") }}
              </span>
            </Tag>
          </template>
          <template v-if="column.dataIndex === 'fixdate'">
            <Tag color="#F4F5F7" class="cursor-pointer">
              <span
                class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
              >
                {{ convertDate("09-08-2023") }}
              </span>
            </Tag>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
