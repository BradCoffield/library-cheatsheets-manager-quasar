<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Add Instruction Video</h2>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Name"
        v-model="dataStore.name"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="URL"
        v-model="dataStore.url"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-input
        label="Length"
        v-model="dataStore.length"
        class="bg-dark text-white q-pa-md ch-input"
        dark
      ></q-input>
    </q-card>
    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          Video Tags
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              Helps organize videos and allows users to filter and sort.
            </q-tooltip></q-icon
          >
        </div>
        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="tags.length > 0">
          <div class="row">
            <div class="col-3" v-for="(item, index) in tags" :key="index">
              <q-checkbox
                :label="item.name"
                v-model="item.selected"
                color="dark"
                dark
              ></q-checkbox>
            </div>
          </div>

          <!-- </li> -->
        </template>
      </q-card-section>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          Public Page Heading
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              What is the top level heading this link should be organized under
              on the public page.
            </q-tooltip></q-icon
          >
        </div>
        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="headings.length > 0">
          <div class="row">
            <div class="col-3" v-for="(item, index) in headings" :key="index">
              <q-radio
                :label="item.name"
                v-model="selectedHeading"
                :val="item.name"
                dark
              ></q-radio>
            </div>
          </div>
        </template>
      </q-card-section>
    </q-card>

    <q-card padding dark class="q-mt-md q-pa-sm" v-if="selectedHeading != ''">
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          Public Page Subheading <q-chip square>Optional</q-chip>
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-secondary"
              content-style="font-size: 16px"
            >
              This allows for further organization beneath larger headings. For
              example, "Citing" would be a heading and "APA Citing" a
              subheading.
            </q-tooltip></q-icon
          >
        </div>
        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="subheadingsEmpty">
          <div class="text-body1">
            <q-icon name="warning" style="font-size:24px" /> No subheadings
            currently exist for <b class="underline">{{ selectedHeading }}</b>. You may create one!
          </div>
        </template>
        <template v-else>
          <div class="row" v-if="appropriateSubheadings.length > 0">
            <div
              class="col-3"
              v-for="(item, index) in appropriateSubheadings"
              :key="index"
            >
              <q-radio
                :label="item.name"
                v-model="selectedSubheading"
                :val="item.name"
                dark
              ></q-radio>
            </div>
          </div>
        </template>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      dataStore: {
        name: "",
        updated: "",
        url: "",
        length: "",
        tags: []
      },
      tags: [
        { name: "Scholarly Articles", selected: false },
        { name: "Understanding & Evaluating Sources", selected: false },
        { name: "Search Strategy", selected: false },
        { name: "Database Tutorials", selected: false },
        { name: "Research Tools", selected: false },
        { name: "Citing", selected: false },
        { name: "MLA Citing", selected: false },
        { name: "APA Citing", selected: false },
        { name: "AMA Citing", selected: false },
        { name: "Additional Useful Videos", selected: false }
      ],
      headings: [
        { name: "Scholarly Articles", selected: false },
        { name: "Understanding & Evaluating Sources", selected: false },
        { name: "Search Strategy", selected: false },
        { name: "Database Tutorials", selected: false },
        { name: "Research Tools", selected: false },
        {
          name: "Citing",
          selected: false,
          subheadings: [
            { name: "MLA Citing", selected: false },
            { name: "APA Citing", selected: false },
            { name: "AMA Citing", selected: false }
          ]
        },

        { name: "Additional Useful Videos", selected: false }
      ],
      selectedHeading: "",
      subheadings: [],
      selectedSubheading: "",
      subheadingsEmpty: true
    };
  },
  methods: {},
  computed: {
    appropriateSubheadings: function() {
      let self = this;
      let filtered = self.headings.filter(function(item) {
        return item.name == self.selectedHeading;
      });
      if (filtered[0]) {
          self.subheadingsEmpty = false;
        return filtered[0].subheadings;
      }
    }
  }
};
</script>

<style>
.underline{
    text-decoration: underline 1px solid;;
}
</style>
