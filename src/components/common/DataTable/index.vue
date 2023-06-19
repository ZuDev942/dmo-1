<script lang="ts" setup>
import { toRefs } from "vue";
import { Table } from "ant-design-vue";

import { IDataSource } from "./types";

interface IProps {
  dataSource: IDataSource;
}

const props = defineProps<IProps>();
const { dataSource } = toRefs(props);

const emit = defineEmits<{
  (e: "tableChange", params): void;
}>();
</script>

<template>
  <div class="h-full">
    <Table
      :dataSource="dataSource.data"
      :columns="dataSource.columns"
      bordered
      :pagination="false"
      :loading="dataSource.loading"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.scopedSlots">
          <slot
            :name="column.scopedSlots"
            :record="record"
            :column="column"
            :index="index"
          ></slot>
        </template>
      </template>

      <template #emptyText>{{
        dataSource.noDataText || "Không có dữ liệu"
      }}</template>
    </Table>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss"></style>
