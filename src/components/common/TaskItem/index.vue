<script lang="ts" setup>
import { toRefs } from "vue";
import { Progress } from "ant-design-vue";

const props = defineProps<{
  infoTask: any;
}>();

const { infoTask } = toRefs(props);
</script>

<template>
  <div class="task__item">
    <div class="task__wrap">
      <img src="@/assets/images/task.png" alt="" />
      <div class="task__name">{{ infoTask.content }}</div>
    </div>
    <div>
      <Progress
        :stroke-color="'#2BC48A'"
        :percent="infoTask.process"
        status="active"
      ></Progress>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
