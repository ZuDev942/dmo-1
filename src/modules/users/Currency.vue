<template>
  <input ref="inputRef" type="text" />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);

    return { inputRef };
  },
};
</script>

<style>
input {
  height: 3.2rem;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  width: 100%;
  border-radius: 6px;
  padding: 0 11px;
}

/* input[type=text]:focus{
} */
</style>
