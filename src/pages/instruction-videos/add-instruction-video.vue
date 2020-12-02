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
        <template v-if="tags.length > 0 && editTags == false">
          <div class="row">
            <div
              style="font-size: 16px;"
              class="col-6"
              v-for="(item, index) in tags"
              :key="index"
            >
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
        <template v-if="tags.length > 0 && editTags == true">
          <div class="row">
            <div class="col-6" v-for="(item, index) in tags" :key="index">
              <div class="q-ma-md" style="font-size: 16px;">
                {{ item.name }}
                <q-icon
                  name="edit"
                  color="cyan-7"
                  @click="editThisTag(item.name, index)"
                >
                  <q-tooltip
                    content-class="bg-cyan-7"
                    content-style="font-size: 16px"
                    :delay="500"
                  >
                    Edit tag
                  </q-tooltip></q-icon
                >

                <q-icon
                  name="delete"
                  color="red-9"
                  @click="deleteThisTag(item.name, index)"
                >
                  <q-tooltip
                    content-class="bg-red-9"
                    content-style="font-size: 16px"
                    :delay="500"
                  >
                    Delete tag
                  </q-tooltip>
                </q-icon>
              </div>
            </div>
          </div>
          <div class="row">
            <q-btn
              class="q-ma-md"
              label="Create New Tag"
              color="secondary"
              @click="editThisTag('', null)"
            ></q-btn>
          </div>
        </template>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat @click="editTags = true" v-if="editTags == false"
          >Edit Tags</q-btn
        >
        <q-btn flat @click="editTags = false" v-if="editTags == true"
          >Done Editing</q-btn
        >
      </q-card-actions>
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
        <template>
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
          <div class="text-body1" v-else>
            <q-icon name="warning" style="font-size:24px" /> No subheadings
            currently exist for <b>{{ selectedHeading }}</b
            >. You may create one!
          </div>
        </template>
      </q-card-section>
    </q-card>

    <q-btn
      label="Submit"
      color="secondary"
      @click="toFirestore"
      class="q-mt-md"
    ></q-btn>

    <!-- edit tag dialog -->
    <q-dialog v-model="editThisTagDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="edit" color="dark" text-color="white" />
          <span class="q-ml-sm">
            <q-input
              color="dark"
              filled
              v-model="tagActivelyBeingEdited.name"
              label="Tag Name"
            >
            </q-input>
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Save"
            color="secondary"
            v-close-popup
            @click="saveTagEdit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- delete tag dialog -->
    <q-dialog v-model="deleteThisTagDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red-8" text-color="white" />
          <span class="q-ml-sm">
            Are you sure you want to delete:
            <b>{{ tagActivelyBeingEdited.name }}</b
            >?
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="secondary"
            v-close-popup
            @click="saveTagDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- err/suc dialogs -->
    <q-dialog v-model="successDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="done_outline" color="dark" text-color="white" />
          <span class="q-ml-sm">Successfully created!!</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Create Another"
            color="secondary"
            v-close-popup
            @click="clearDatastore"
          />
          <q-btn flat label="Go Home" color="secondary" v-close-popup to="/" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="errorDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="error_outline" color="dark" text-color="white" />
          <span class="q-ml-sm">Error Creating Cheatsheet</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Clear Form"
            color="secondary"
            v-close-popup
            @click="clearDatastore"
          />

          <q-btn flat label="Close" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      successDialog: false,
      errorDialog: false,
      editTags: false,
      editThisTagDialog: false,
      deleteThisTagDialog: false,
      tagActivelyBeingEdited: { name: "", index: null },
      dataStore: {
        name: "",
        updated: "",
        url: "",
        length: "",
        tags: [],
        pageHeading: "",
        pageSubheading: ""
      },
      tags: [
        // { name: "Scholarly Articles", selected: false },
        // { name: "Understanding & Evaluating Sources", selected: false },
        // { name: "Search Strategy", selected: false },
        // { name: "Database Tutorials", selected: false },
        // { name: "Research Tools", selected: false },
        // { name: "Citing", selected: false },
        // { name: "MLA Citing", selected: false },
        // { name: "APA Citing", selected: false },
        // { name: "AMA Citing", selected: false },
        // { name: "Additional Useful Videos", selected: false }
      ],
      headings: [
        { name: "Scholarly Articles", selected: false, subheadings: [] },
        {
          name: "Understanding & Evaluating Sources",
          selected: false,
          subheadings: []
        },
        { name: "Search Strategy", selected: false, subheadings: [] },
        { name: "Database Tutorials", selected: false, subheadings: [] },
        { name: "Research Tools", selected: false, subheadings: [] },
        {
          name: "Citing",
          selected: false,
          subheadings: [
            { name: "MLA Citing", selected: false },
            { name: "APA Citing", selected: false },
            { name: "AMA Citing", selected: false }
          ]
        },

        { name: "Additional Useful Videos", selected: false, subheadings: [] }
      ],
      selectedHeading: "",
      selectedSubheading: "",
      ref: this.$firestore.collection("InstructionVideos"),
      ref2: this.$firestore.collection("InstructionVideosTags")
    };
  },

  methods: {
    getDate() {
      let date = new Date();
      return date.toISOString();
    },
    toFirestore(evt) {
      let self = this;
      evt.preventDefault();

      // grab needed data bits from different places and get them all into datastore bc it is what goes to firestore
      this.dataStore.pageHeading = this.selectedHeading;
      this.dataStore.pageSubheading = this.selectedSubheading;
      this.dataStore.updated = this.getDate();
      // filter this.tags for selected and map just the names of those ones into this.dataStore.tags
      this.dataStore.tags = this.tags
        .filter(i => i.selected == true)
        .map(i => i.name);

      try {
        this.ref
          .doc(this.dataStore.name)
          .set(this.dataStore, { merge: true })
          .then(function() {
            console.log("Document successfully written!");
            self.successDialog = true;
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
            self.errorDialog = true;
          });
      } catch (error) {
        console.error(error, "errorr");
        self.errorDialog = true;
      }
    },
    clearDatastore() {
      this.dataStore = {
        name: "",
        updated: "",
        length: "",
        tags: [],
        pageHeading: "",
        pageSubheading: ""
      };
      this.selectedHeading = "";
      this.selectedSubheading = "";
      this.tags.forEach(i => {
        i.selected = false;
      });
      this.headings.forEach(i => {
        i.selected = false;
      });
    },

    editThisTag(name, index) {
      console.log(name, index);
      this.tagActivelyBeingEdited.name = name;
      this.tagActivelyBeingEdited.index = index;
      this.editThisTagDialog = true;
    },
    deleteThisTag(name, index) {
      console.log(name, index);
      this.tagActivelyBeingEdited.name = name;
      this.tagActivelyBeingEdited.index = index;
      this.deleteThisTagDialog = true;
    },

    saveTagEdit() {
      //this handles if it is a new tag
      if (this.tagActivelyBeingEdited.index == null) {
        let temp = { name: this.tagActivelyBeingEdited.name, selected: false };
        this.tags.push(temp);
      }
      //this is for editing existing tags
      if (this.tagActivelyBeingEdited.index !== null) {
        this.tags[
          this.tagActivelyBeingEdited.index
        ].name = this.tagActivelyBeingEdited.name;
      }
      this.updateTagListWithFirestore();
    },
    saveTagDelete() {
      this.tags.splice(this.tagActivelyBeingEdited.index, 1);
      this.updateTagListWithFirestore();
    },
    updateTagListWithFirestore() {
      let tagList = this.tags;
      let tagsForFirestore = { tagList: tagList };
      try {
        this.tags = [];
        this.ref2
          .doc("tags")
          .set(tagsForFirestore)
          .then(function() {
            console.log("Document successfully written!");
            self.successDialog = true;
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
            self.errorDialog = true;
          });
      } catch (error) {
        console.error(error, "errorr");
        self.errorDialog = true;
      }
    }
  },
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
  },
  created() {
    this.tags = [];
    let getExistingTags = () => {
      this.ref2.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, doc.data());
          if (doc.data().tagList) {
            doc.data().tagList.forEach(i => {
              this.tags.push(i);
            });
          }
        });
      });
    };
    getExistingTags();
  }
};
</script>

<style></style>
