<script lang="ts" setup>
import { MenuRight, Header } from "@/layout-components";
</script>

<template>
  <div id="__main" class="flex w-full h-full">
    <div id="__menu">
      <MenuRight></MenuRight>
    </div>

    <div id="__content">
      <router-view />

      <div id="__header">
        <Header></Header>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles.scss"></style>
