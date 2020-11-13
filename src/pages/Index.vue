<template>
  <q-page class="flex flex-center">
    <img
      class="image-frame"
      alt="RMC Library"
      src="https://www.rocky.edu/sites/default/files/library-building-outside-02.jpg"
    />
    <div class="q-pa-md q-gutter-sm"></div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {};
  },
  created: function() {
    console.log("ehhhh!");
  }
};
</script>
<style lang="scss">
.image-frame {
  box-shadow: #77879e 0px 0px 2px;
  padding: 1rem;
 }
</style>
