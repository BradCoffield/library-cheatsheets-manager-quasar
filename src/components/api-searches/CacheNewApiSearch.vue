<template> 
<div>
    hi cachenewapisearch name is {{name}}
</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style></style>
