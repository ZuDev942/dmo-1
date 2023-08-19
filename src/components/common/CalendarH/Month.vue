<script setup lang="ts">
import { ref, computed } from "vue";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";

const monthEmit = defineEmits<{ (e: "selected", v: number): void }>();

const month = ref<number>(dayjs().month());

const cMonth = computed(() => dayjs().month(month.value).format("MMMM"));

function modifyMonth(v: any) {
  month.value += v;
  monthEmit("selected", month.value);
}
</script>

<template>
  <div class="bg-gray-700 p-3 grid place-items-center month">
    <span class="flex items-center space-x-3 select-none text-gray-50">
      <DoubleLeftOutlined class="text-[2rem]" @click="() => modifyMonth(-1)" />
      <span class="w-max text-center text-[2.2rem]">{{ cMonth }}</span>
      <DoubleRightOutlined class="text-[2rem]" @click="() => modifyMonth(1)" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.month {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
