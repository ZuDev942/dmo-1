<script lang="ts" setup>
// ==== Import ==== //
import { computed, reactive, ref } from "vue";
import {
  Button,
  Table,
  Drawer,
  InputSearch,
  Popover,
  Select,
  Input,
  DatePicker,
  Textarea,
  SelectOption,
} from "ant-design-vue";
import {
  EllipsisOutlined,
  ArrowDownOutlined,
  CaretDownOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import type { IDataSource } from "@/components";
import { cloneDeep } from "lodash";

// ==== Data ==== //
const dataSource = reactive<IDataSource>({
  loading: false,
  noDataText: "No data",
  pagination: {
    totalPage: 0,
    page: 1,
  },
  data: [
    {
      name: "Human Resource",
      key: "HRM",
      type: "Company",
      lead: "Vu Thanh A",
      status: "Processing",
    },
    {
      name: "Human Resource",
      key: "HRM",
      type: "Company",
      lead: "Vu Thanh A",
      status: "Processing",
    },
    {
      name: "Human Resource",
      key: "HRM",
      type: "Company",
      lead: "Vu Thanh A",
      status: "Processing",
    },
  ],
  columns: [
    {
      dataIndex: "name",
      key: "name",
      slots: { title: "customTitle", customRender: "name" },
    },
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Lead",
      key: "lead",
      dataIndex: "lead",
      slots: { customRender: "lead" },
    },
    {
      title: "Status",
      key: "status",
      slots: { customRender: "status" },
    },
  ],
});

const projectTypes = ref([
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "disabled",
    label: "Disabled",
    disabled: true,
  },
]);

const searchOn = ref<string>("");
const isProjectDetail = ref<boolean>(false);
const typeValue = ref<string>("Type");
const priorityValue = ref<string>("Priority");
const statusValue = ref<string>("Status");
const formState = ref({
  project_name: "",
  project_content: "",
  project_type: "Company",
  priority: "Medium",
  customer: "",
  status: "New",
  progress: "",
  project_effort: "",
  estimated_effort: "",
  actual_effort: "",
  period: "",
  note: "",
});

const columns = [
  {
    dataIndex: "add",
    slots: { title: "customAdd", customRender: "add" },
    width: "5%",
  },
  {
    title: "User",
    dataIndex: "user",
    slots: { title: "customUser", customRender: "user" },
  },
  {
    title: "Department",
    dataIndex: "department",
    slots: { title: "customDepartment", customRender: "department" },
  },
  {
    title: "Effort",
    dataIndex: "effort",
    slots: { title: "customEffort", customRender: "effort" },
  },
  {
    title: "Role",
    dataIndex: "role",
    slots: { title: "customRole", customRender: "role" },
  },
  {
    dataIndex: "delete",
    slots: { title: "customDelete", customRender: "delete" },
    width: "5%",
  },
];

const column2 = [
  {
    dataIndex: "add",
    slots: { title: "customAdd", customRender: "add" },
    width: 100,
  },
  {
    title: "Register day",
    dataIndex: "register",
    slots: { title: "customRegister", customRender: "register" },
  },
  {
    title: "Work CD",
    dataIndex: "work",
    slots: { title: "customWork", customRender: "work" },
  },
  {
    title: "Work Name",
    dataIndex: "workName",
    slots: { title: "customWorkname", customRender: "workName" },
  },
  {
    title: "Branch",
    dataIndex: "branch",
    slots: { title: "customBranch", customRender: "branch" },
  },
  {
    title: "Status",
    dataIndex: "status",
    slots: { title: "customStatus", customRender: "status" },
  },
  {
    title: "Project effort",
    dataIndex: "effort",
    slots: { title: "customEffort", customRender: "effort" },
  },
  {
    title: "Period",
    dataIndex: "period",
    slots: { title: "customPeriod", customRender: "period" },
  },
  {
    title: "Project effort",
    dataIndex: "effort",
    slots: { title: "customEffort", customRender: "effort" },
  },
  {
    dataIndex: "delete",
    slots: { title: "customDelete", customRender: "delete" },
    width: "5%",
  },
];

const dataSource2 = ref([
  {
    index: 1,
    user: "Nguyen Thanh A",
    department: "HR",
    effort: "25%",
    role: "Admin",
  },
  {
    index: 2,
    user: "Nguyen Thanh B",
    department: "Developer",
    effort: "50%",
    role: "Leader",
  },
]);

const count = computed(() => dataSource2.value.length + 1);

const onDelete = (key: number) => {
  dataSource2.value = dataSource2.value.filter((item) => item.index !== key);
};

const handleAdd = () => {
  const newData = {
    index: count.value,
    user: "",
    department: "",
    effort: "",
    role: "",
  };

  dataSource2.value.push(newData);
};

// ==== Method ==== //
function handleLoadPage() {}

function handleCreateProject() {
  isProjectDetail.value = true;
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
</script>

<template>
  <div class="project h-full">
    <div class="project__head">
      <div class="project__filter">
        <InputSearch
          v-model:value="searchOn"
          style="width: 300px"
          placeholder="Search by name, ID..."
        />

        <Select v-model:value="typeValue" :options="projectTypes" class="ml-5">
          <template #suffixIcon>
            <CaretDownOutlined style="color: #172b4d" />
          </template>
        </Select>

        <Select
          v-model:value="priorityValue"
          :options="projectTypes"
          class="ml-5"
        >
          <template #suffixIcon>
            <CaretDownOutlined style="color: #172b4d" />
          </template>
        </Select>

        <Select
          v-model:value="statusValue"
          :options="projectTypes"
          class="ml-5"
        >
          <template #suffixIcon>
            <CaretDownOutlined style="color: #172b4d" />
          </template>
        </Select>
      </div>

      <Button class="project__create" @click="handleCreateProject()">
        Create project
      </Button>
    </div>

    <div class="project__wrap">
      <div class="project__list">
        <Table
          :columns="dataSource.columns"
          :data-source="dataSource.data"
          :pagination="false"
        >
          <template #customTitle> Name </template>
          <template #name="{ text }">
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
            {{ text }}
          </template>
          <template #key="{}">
            <span> a </span>
          </template>
          <template #type="{ record }">
            <span> Company </span>
          </template>
          <template #lead="{ record }">
            <span>
              <img
                src="@/assets/images/avatar.jpeg"
                style="
                  width: 2.5rem;
                  height: 2.5rem;
                  border-radius: 50%;
                  margin-right: 4px;
                "
              />
              {{ record.lead }}
            </span>
          </template>
          <template #status="{ record }">
            <div class="flex items-center justify-between">
              <span> {{ record.status }} </span>
              <span class="project__action">
                <Popover trigger="click" placement="bottomRight">
                  <template #content>
                    <p>Content</p>
                    <p>Move to trash</p>
                  </template>
                  <EllipsisOutlined style="font-size: 2.5rem" />
                </Popover>
              </span>
            </div>
          </template>
        </Table>
      </div>
    </div>

    <!--  -->
    <Drawer
      title="Create Project"
      placement="right"
      :closable="false"
      :width="'70%'"
      v-model:visible="isProjectDetail"
    >
      <div class="flex project__form">
        <div class="w-1/2 mr-3">
          <div class="mb-4">
            <label for="">
              Project name <span class="text-red-600">&ast;</span>
            </label>
            <Input v-model:value="formState.project_name" />
          </div>

          <div class="flex justify-between mb-4">
            <div class="w-1/2 mr-5">
              <label for=""> Project type </label>
              <Select ref="select" v-model:value="formState.project_type">
                <SelectOption value="jack">Jack</SelectOption>
              </Select>
            </div>

            <div class="w-1/2">
              <label for="">Priority</label>
              <Select ref="select" v-model:value="formState.priority">
                <SelectOption value="jack">Jack</SelectOption>
              </Select>
            </div>
          </div>

          <div class="flex justify-between w-full mb-4">
            <div class="w-1/2 mr-5">
              <label for="">Status</label>
              <Select ref="select" v-model:value="formState.status">
                <SelectOption value="jack">Jack</SelectOption>
              </Select>
            </div>

            <div class="w-1/2">
              <label for="">Progress</label>
              <Input v-model:value="formState.progress" />
            </div>
          </div>

          <div class="mb-4">
            <label for="">Note</label>
            <Textarea v-model:value="formState.note" :rows="5"></Textarea>
          </div>
        </div>

        <div class="w-1/2 ml-3">
          <div class="mb-4">
            <label for="">
              Project content <span class="text-red-600">&ast;</span>
            </label>
            <Input v-model:value="formState.project_name" />
          </div>

          <div class="mb-4">
            <label for="">Customer</label>
            <Input v-model:value="formState.customer" />
          </div>

          <div class="mb-4">
            <label for="">Period <span class="text-red-600">&ast;</span></label>
            <DatePicker>
              <template #suffixIcon>
                <img
                  src="@/assets/images/calender.png"
                  alt=""
                  class="calender__icon"
                />
              </template>
            </DatePicker>
            <span class="mx-3">~</span>
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

          <div class="mb-4">
            <label for="">
              Original Estimate <span class="text-red-600">&ast;</span>
            </label>
            <Input v-model:value="formState.estimated_effort" />

            <p class="project__des">
              An estimate of how much work remains until this issue will be
              resolved. <br />
              The format of this is ' *w *d *h *m ' (representing weeks, days,
              hours and minutes - where * can be any number). <br />
              Examples: 4d, 5h 30m, 60m and 3w.
            </p>
          </div>
        </div>
      </div>

      <div class="project__user">
        <Table
          :data-source="dataSource2"
          :columns="columns"
          :pagination="false"
        >
          <template #customAdd>
            <div class="cursor-pointer" @click="handleAdd">
              <PlusSquareOutlined />
            </div>
          </template>

          <template #key="{ record }"></template>

          <template #user="{ record }">
            <Select ref="select" v-model:value="record.user">
              <SelectOption value="jack">Jack</SelectOption>
            </Select>
          </template>

          <template #department="{ record }">
            <Select ref="select" v-model:value="record.department">
              <SelectOption value="jack">Jack</SelectOption>
            </Select>
          </template>

          <template #effort="{ record }">
            <Select ref="select" v-model:value="record.effort">
              <SelectOption value="jack">Jack</SelectOption>
            </Select>
          </template>

          <template #role="{ record }">
            <Select ref="select" v-model:value="record.role">
              <SelectOption value="jack">Jack</SelectOption>
            </Select>
          </template>
          <template #delete="{ record }">
            <DeleteOutlined @click="onDelete(record.index)" />
          </template>
        </Table>
      </div>

      <div class="project__user">
        <Table
          :data-source="dataSource2"
          :columns="column2"
          :pagination="false"
          :scroll="{ x: 1500, y: 300 }"
        >
          <template #customAdd>
            <div class="cursor-pointer" @click="handleAdd">
              <PlusSquareOutlined />
            </div>
          </template>

          <template #key="{ record }"></template>

          <template #user="{ record }">
            <Select ref="select" v-model:value="record.user">
              <SelectOption value="jack">Jack</SelectOption>
            </Select>
          </template>

          <template #department="{ record }">
            <Select ref="select" v-model:value="record.department">
              <SelectOption value="jack">Jack</SelectOption>
            </Select>
          </template>

          <template #effort="{ record }">
            <Select ref="select" v-model:value="record.effort">
              <SelectOption value="jack">Jack</SelectOption>
            </Select>
          </template>

          <template #role="{ record }">
            <Select ref="select" v-model:value="record.role">
              <SelectOption value="jack">Jack</SelectOption>
            </Select>
          </template>
          <template #delete="{ record }">
            <DeleteOutlined @click="onDelete(record.index)" />
          </template>
        </Table>
      </div>
    </Drawer>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
