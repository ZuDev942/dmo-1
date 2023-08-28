<script lang="ts" setup>
// ==== Import ==== //
import { createVNode, onMounted, reactive, ref, watch } from "vue";
import {
  Button,
  Table,
  Input,
  Popover,
  Select,
  Modal,
  message,
  Tooltip,
  Tag,
  AvatarGroup,
  Avatar,
} from "ant-design-vue";
import {
  EllipsisOutlined,
  CaretDownOutlined,
  SearchOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import type { IDataSource } from "@/components";
import { ProjectModal, Loading } from "@/components";
import { projectService } from "@/services";
import useEventBus from "../../eventBus";
import { debounce, isEmpty, size } from "lodash";
import { useRouter } from "vue-router";
import { RouteName } from "@/shared/constants";
import { useProjectStore, issueStore } from "@/store";

// ==== Data ==== //
const useIssue = issueStore();
const { emitEvent } = useEventBus();
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
      title: "Name",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "Key",
      dataIndex: "content",
      width: 140,
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "120px",
    },
    {
      title: "Team",
      dataIndex: "lead",
      width: "200px",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "200px",
    },
  ],
});

const projectTypes = ref([
  {
    value: "COMPANY",
    label: "Company",
  },
  {
    value: "PROJECT",
    label: "Project",
  },
  {
    value: "ALL",
    label: "Type",
  },
]);

const projectStatus = ref([
  {
    value: "NOT_STARTED",
    label: "Not Started",
  },
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "PROCESSING",
    label: "Processing",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "CANCELED",
    label: "Canceled",
  },
  {
    value: "ALL",
    label: "Status",
  },
]);

const projectPriority = ref([
  {
    value: "LOW",
    label: "Low",
  },
  {
    value: "MEDIUM",
    label: "Medium",
  },
  {
    value: "HIGH",
    label: "High",
  },
  {
    value: "URGENT",
    label: "Urgent",
  },
  {
    value: "ALL",
    label: "Priority",
  },
]);

const searchOn = ref<string>("");
const isProjectDetail = ref<boolean>(false);
const typeValue = ref<string>("Type");
const priorityValue = ref<string>("Priority");
const statusValue = ref<string>("Status");

const reqParams = ref<any>({
  pageIndex: 1,
  pageSize: 20,
  keyword: null,
  type: null,
  status: null,
  priority: null,
});

const role = ref<boolean>(false);
const userProject = useProjectStore();

// ==== Method ==== //
onMounted(() => {
  getListProject();
  const savedUser = localStorage.getItem("userInfo");

  if (savedUser) {
    const userInfo = JSON.parse(savedUser);
    role.value = userInfo.role === "MANAGER" ? true : false;
  }
});

const typeDetail = ref<string>("");
const countProject = ref<number>(0);
const idProject = ref<number>(0);

watch(typeValue, () => {
  if (typeValue.value === "ALL") {
    reqParams.value.type = null;
  } else {
    reqParams.value.type = typeValue.value;
  }

  getListProject();
});

watch(statusValue, () => {
  if (statusValue.value === "ALL") {
    reqParams.value.status = null;
  } else {
    reqParams.value.status = statusValue.value;
  }
  getListProject();
});

watch(priorityValue, () => {
  if (priorityValue.value === "ALL") {
    reqParams.value.priority = null;
  } else {
    reqParams.value.priority = priorityValue.value;
  }
  getListProject();
});

watch(
  searchOn,
  debounce(() => {
    reqParams.value.keyword = searchOn.value;

    getListProject();
  }, 300)
);

function handleClear() {
  searchOn.value = "";
}

const titleProject = ref("");
function handleCreateProject() {
  isProjectDetail.value = true;
  typeDetail.value = "create";
  countProject.value += 1;
  titleProject.value = "Create Project";
}

function handleSelectDetail(idPro: number) {
  isProjectDetail.value = true;
  typeDetail.value = "detail";
  countProject.value += 1;
  idProject.value = idPro;
  titleProject.value = "Detail Project";
}

async function getListProject() {
  dataSource.loading = true;

  const res = await projectService
    .getListProject(reqParams.value)
    .finally(() => {
      dataSource.loading = false;
    });

  if (res.status === "SUCCESS") {
    const data = res.data.data;

    const statusOrder = {
      PROCESSING: 1,
      NOT_STARTED: 2,
      PENDING: 3,
      COMPLETED: 4,
      CANCELED: 5,
    };

    const sortedStatusList = data.sort((a, b) => {
      return statusOrder[a.projectStatus] - statusOrder[b.projectStatus];
    });

    dataSource.data = sortedStatusList;
  }
}

// async function handleDeleteProject(idProject: number) {
//   Modal.confirm({
//     title: "Do you want to delete account?",
//     icon: createVNode(ExclamationCircleOutlined),
//     async onOk() {
//       const res = await projectService.deleteProject(idProject);
//       if (res.status === "SUCCESS") {
//         message.success("Delete successful!");
//         getListProject();
//       }
//     },
//     onCancel() {},
//   });
// }

const convertType = (type: string) => {
  if (type === "PROJECT") {
    return "Project";
  } else {
    return "Company";
  }
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

function shortenText(text) {
  if (text.length <= 35) {
    return text;
  }

  const shortenedText = text.substring(0, 35 - 3) + " ...";
  return shortenedText;
}

const router = useRouter();

function handleOpenTask(
  idProject: number,
  nameProject: string,
  keyP: string,
  project: any
) {
  const payload = {
    name: nameProject,
    id: idProject,
  };

  const userList = project.projectUserList;

  userProject.setUserJoinProject(userList);

  emitEvent("NAME_PROJECT", payload);
  router.push({
    name: RouteName.TASKS,
    params: { id: idProject, key: keyP },
  });
}

function handleOpenIssue(idProject: number, nameProject: string, keyP: string) {
  const payload = {
    name: nameProject,
    id: idProject,
  };

  emitEvent("NAME_PROJECT", payload);

  useIssue.setProjectID(idProject);

  router.push({
    name: RouteName.ISSUES,
    params: { id: idProject, key: keyP },
  });
}

function handleCloseModal() {
  isProjectDetail.value = false;
}

function handleRefresh(){
  isProjectDetail.value = false;
  getListProject();
}

// Tạm thời
const avatarUrls = [
  "https://cache.giaohangtietkiem.vn/d/9dae58757a70d9a7820fd5b257ecb5d3.jpeg",
  "https://cache.giaohangtietkiem.vn/d/1a1f5b5facda81cd956cad8cb51518d4.png",
  "https://cache.giaohangtietkiem.vn/d/6caec50ca78b8906b50d0c6e357b692c.jpeg",
  "https://cache.giaohangtietkiem.vn/d/1a1f5b5facda81cd956cad8cb51518d4.png",
  "https://cache.giaohangtietkiem.vn/d/9dae58757a70d9a7820fd5b257ecb5d3.jpeg",
];
</script>

<template>
  <div class="project h-full">
    <div class="project__head">
      <div class="project__filter flex">
        <div class="project__search">
          <Input
            v-model:value="searchOn"
            style="width: 300px"
            placeholder="Search"
          />
          <div class="project__icon">
            <SearchOutlined v-if="isEmpty(searchOn)" class="text-[1.4rem]" />
            <CloseOutlined
              v-else
              @click="handleClear()"
              class="text-[1.4rem]"
            />
          </div>
        </div>

        <Select
          v-model:value="typeValue"
          :options="projectTypes"
          class="ml-5 w-[10rem]"
        >
          <template #suffixIcon>
            <CaretDownOutlined style="color: #172b4d" />
          </template>
        </Select>

        <Select
          v-model:value="statusValue"
          :options="projectStatus"
          class="ml-5 w-[13rem]"
        >
          <template #suffixIcon>
            <CaretDownOutlined style="color: #172b4d" />
          </template>
        </Select>

        <Select
          v-model:value="priorityValue"
          :options="projectPriority"
          class="ml-5"
        >
          <template #suffixIcon>
            <CaretDownOutlined style="color: #172b4d" />
          </template>
        </Select>
      </div>

      <Button type="primary" @click="handleCreateProject()" v-if="role">
        Create project
      </Button>
    </div>

    <div class="project__wrap">
      <div class="project__list">
        <Table
          :data-source="dataSource.data"
          :columns="dataSource.columns"
          :loading="dataSource.loading"
          :scroll="{ y: 480 }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'name'">
              <div
                @click="handleSelectDetail(record.id)"
                class="flex items-center"
              >
                <img
                  src="https://hoondea.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project"
                  alt=""
                  style="
                    width: 2.4rem;
                    height: 2.4rem;
                    border-radius: 2px;
                    margin-right: 0.5rem;
                  "
                />
                <Tooltip>
                  <template #title>{{ record.key }}</template>
                  {{ shortenText(record.key) }}
                </Tooltip>
              </div>
            </template>

            <template v-if="column.dataIndex === 'content'">
              <div class="font-[500]">{{ record.name }}</div>
            </template>

            <template v-if="column.dataIndex === 'type'">
              <Tag color="#F4F5F7" class="cursor-pointe">
                <span
                  class="cursor-pointer text-[#42526E] font-[500] text-[1.3rem]"
                >
                  <span> {{ convertType(record.type) }} </span>
                </span>
              </Tag>
            </template>

            <template v-if="column.dataIndex === 'lead'">
              <div class="flex items-center">
                <AvatarGroup
                  :max-count="4"
                  :max-style="{ color: '#f56a00', backgroundColor: '#fde3cf' }"
                >
                  <template v-for="(user, uIndex) in record.projectUserList">
                    <Tooltip placement="top">
                      <template #title>{{ user.fullName }}</template>
                      <Avatar :src="avatarUrls[uIndex]"> </Avatar>
                    </Tooltip>
                  </template>
                </AvatarGroup>
              </div>
            </template>

            <template v-if="column.dataIndex === 'status'">
              <div class="flex items-center justify-between">
                <div>
                  <Tag
                    v-if="record.projectStatus === 'NOT_STARTED'"
                    color="#DFE1E6"
                    class="cursor-pointer"
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
                </div>
                <span class="project__action">
                  <Popover trigger="click" placement="bottomRight">
                    <template #content>
                      <div
                        class="option"
                        @click="
                          handleOpenTask(
                            record.id,
                            record.key,
                            record.name,
                            record
                          )
                        "
                      >
                        Open Task
                      </div>
                      <div
                        class="option"
                        @click="
                          handleOpenIssue(record.id, record.key, record.name)
                        "
                      >
                        Open Issue
                      </div>
                      <!-- <div
                        class="option"
                        @click="handleDeleteProject(record.id)"
                      >
                        Delete
                      </div> -->
                    </template>
                    <EllipsisOutlined style="font-size: 2.5rem" />
                  </Popover>
                </span>
              </div>
            </template>
          </template>
        </Table>
      </div>
    </div>

    <ProjectModal
      :id-project="idProject"
      :is-project-modal="isProjectDetail"
      :is-type-project="typeDetail"
      :count-project="countProject"
      @close-project-modal="handleCloseModal()"
      @refresh-projects="handleRefresh()"
    ></ProjectModal>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
