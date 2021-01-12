<template>
  <q-page padding>
    <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>Edit Instruction Video</h2>
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
          Cheatsheet Association
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
              Select which cheatsheets on which this video should be included.
            </q-tooltip></q-icon
          >
        </div>

        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="existingCheatsheetsController.length > 0">
          <div class="row">
            <div
              style="font-size: 16px;"
              class="col-6"
              v-for="(item, index) in existingCheatsheetsController"
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
      </q-card-section>
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
                  @click="editThisMetadata(item.name, index, 'tag')"
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
                  @click="deleteThisMetadata(item.name, index, 'tag')"
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
              @click="editThisMetadata('', null, 'tag')"
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

    <q-card padding dark class="q-mt-md q-pa-sm" style="font-size: 16px;">
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
        <template v-if="headings.length > 0 && editHeadings == false">
          <div class="row">
            <div class="col-6" v-for="(item, index) in headings" :key="index">
              <q-radio
                :label="item.name"
                v-model="selectedHeading"
                :val="item.name"
                dark
              ></q-radio>
            </div>
          </div>
        </template>
        <template v-if="headings.length > 0 && editHeadings == true">
          <div class="row">
            <div class="col-6" v-for="(item, index) in headings" :key="index">
              <div class="q-ma-md" style="font-size: 16px;">
                {{ item.name }}
                <q-icon
                  name="edit"
                  color="cyan-7"
                  @click="editThisMetadata(item.name, index, 'heading')"
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
                  @click="deleteThisMetadata(item.name, index, 'heading')"
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
              label="Create New Heading"
              color="secondary"
              @click="editThisMetadata('', null, 'heading')"
            ></q-btn>
          </div>
        </template>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat @click="editHeadings = true" v-if="editHeadings == false"
          >Edit Headings</q-btn
        >
        <q-btn flat @click="editHeadings = false" v-if="editHeadings == true"
          >Done Editing</q-btn
        >
      </q-card-actions>
    </q-card>

    <q-card
      padding
      dark
      class="q-mt-md q-pa-sm"
      v-if="selectedHeading != '' && editHeadings == false"
    >
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
          <!-- listing out subheadings for selection -->
          <template
            v-if="appropriateSubheadings.length > 0 && editSubheadings == false"
          >
            <div class="row">
              <div
                class="col-6"
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
          <!-- listing out subheadings for editing -->
          <template
            v-else-if="
              appropriateSubheadings.length > 0 && editSubheadings == true
            "
          >
            <div class="row">
              <div
                class="col-6"
                v-for="(item, index) in appropriateSubheadings"
                :key="index"
              >
                <div class="q-ma-md" style="font-size: 16px;">
                  {{ item.name }}
                  <q-icon
                    name="edit"
                    color="cyan-7"
                    @click="editThisMetadata(item.name, index, 'subheading')"
                  >
                    <q-tooltip
                      content-class="bg-cyan-7"
                      content-style="font-size: 16px"
                      :delay="500"
                    >
                      Edit subheading
                    </q-tooltip></q-icon
                  >

                  <q-icon
                    name="delete"
                    color="red-9"
                    @click="deleteThisMetadata(item.name, index, 'subheading')"
                  >
                    <q-tooltip
                      content-class="bg-red-9"
                      content-style="font-size: 16px"
                      :delay="500"
                    >
                      Delete subheading
                    </q-tooltip>
                  </q-icon>
                </div>
              </div>
            </div>
            <div class="row">
              <q-btn
                class="q-ma-md"
                label="Create New Subheading"
                color="secondary"
                @click="editThisMetadata('', null, 'subheading')"
              ></q-btn>
            </div>
          </template>

          <div class="text-body1" v-else>
            <q-icon name="warning" style="font-size:24px" /> No subheadings
            currently exist for <b>{{ selectedHeading }}</b
            >.
            <div class="row">
              <q-btn
                class="q-ma-md q-mt-lg q-ml-lg"
                label="Create New Subheading"
                color="secondary"
                @click="editThisMetadata('', null, 'subheading')"
              ></q-btn>
            </div>
          </div>
        </template>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          @click="editSubheadings = true"
          v-if="editSubheadings == false"
          >Edit Subheadings</q-btn
        >
        <q-btn
          flat
          @click="editSubheadings = false"
          v-if="editSubheadings == true"
          >Done Editing</q-btn
        >
      </q-card-actions>
    </q-card>

    <q-btn
      label="Submit"
      color="secondary"
      @click="toFirestore"
      class="q-mt-md"
    ></q-btn>

    <!-- edit metadata dialog -->
    <q-dialog v-model="editThisMetadataDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="edit" color="dark" text-color="white" />
          <span class="q-ml-sm">
            <q-input
              color="dark"
              filled
              v-model="metadataActivelyBeingEdited.name"
              label="Name"
              ref="editMetadataInput"
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
            @click="saveMetadataEdit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- delete tag dialog -->
    <q-dialog v-model="deleteThisMetadataDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red-8" text-color="white" />
          <span class="q-ml-sm">
            Are you sure you want to delete:
            <b>{{ metadataActivelyBeingEdited.name }}</b
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
            @click="deleteMetadata"
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
import _ from "lodash";
export default {
  data() {
    return {
      successDialog: false,
      errorDialog: false,
      editTags: false,
      editHeadings: false,
      editSubheadings: false,
      editThisMetadataDialog: false,
      deleteThisMetadataDialog: false,
      indexOfParentHeading: null,
      metadataActivelyBeingEdited: { name: "", index: null, type: "" },
      existingCheatsheets: [],
      existingCheatsheetsController: [],
      dataStore: {
        name: "",
        updated: "",
        url: "",
        length: "",
        tags: [],
        pageHeading: "",
        pageSubheading: "",
        associatedSubjects: []
      },
      tags: [],
      headings: [],
      selectedHeading: "",
      selectedSubheading: "",
      ref: this.$firestore.collection("InstructionVideos"),
      ref2: this.$firestore.collection("InstructionVideosMetadata"),
      refCheatsheets: this.$firestore.collection("Cheatsheets")
    };
  },

  methods: {
    focusInput() {
      this.$nextTick(() => {
        this.$refs.editMetadataInput.focus();
      });
    },
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
      this.existingCheatsheetsController.forEach(q => {
        if (q.selected === true) {
          this.dataStore.associatedSubjects.push(q.name);
        }
      });
      let deDupedArray = _.uniq(this.dataStore.associatedSubjects);
      console.log(deDupedArray);

      this.dataStore.associatedSubjects = deDupedArray;

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
        pageSubheading: "",
        associatedSubjects: []
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

    editThisMetadata(name, index, type) {
      console.log(name, index);
      this.metadataActivelyBeingEdited.name = name;
      this.metadataActivelyBeingEdited.index = index;
      this.metadataActivelyBeingEdited.type = type;
      this.editThisMetadataDialog = true;
      this.focusInput();
    },
    deleteThisMetadata(name, index, type) {
      console.log(name, index);
      this.metadataActivelyBeingEdited.name = name;
      this.metadataActivelyBeingEdited.index = index;
      this.metadataActivelyBeingEdited.type = type;
      this.deleteThisMetadataDialog = true;
      this.focusInput();
    },
    saveMetadataEdit() {
      //needed for when creating a new one
      let temp = {
        name: this.metadataActivelyBeingEdited.name,
        selected: false
      };
      if (this.metadataActivelyBeingEdited.type == "tag") {
        console.log("type:", this.metadataActivelyBeingEdited.type);
        //this handles if it is a new tag
        if (this.metadataActivelyBeingEdited.index == null) {
          this.tags.push(temp);
        }
        //this is for editing existing tags
        if (this.metadataActivelyBeingEdited.index !== null) {
          this.tags[
            this.metadataActivelyBeingEdited.index
          ].name = this.metadataActivelyBeingEdited.name;
        }
        let tagsForFirestore = { tagList: this.tags };
        this.updateMetadataWithFirestore("tags", tagsForFirestore);
      }
      if (this.metadataActivelyBeingEdited.type == "heading") {
        //this handles if it is a new heading
        if (this.metadataActivelyBeingEdited.index == null) {
          this.headings.push(temp);
        }
        //this is for editing existing heading
        if (this.metadataActivelyBeingEdited.index !== null) {
          this.headings[
            this.metadataActivelyBeingEdited.index
          ].name = this.metadataActivelyBeingEdited.name;
        }
        let headingsForFirestore = { headingList: this.headings };
        this.updateMetadataWithFirestore("headings", headingsForFirestore);
      }
      if (this.metadataActivelyBeingEdited.type == "subheading") {
        let self = this;
        this.headings.filter(function(item, index) {
          if (item.name == self.selectedHeading) {
            //this is the important bit, the grabbing of the appropriate index so we can use it below
            self.indexOfParentHeading = index;
            return;
          }
        });
        //new subheading
        if (this.metadataActivelyBeingEdited.index == null) {
          this.headings[this.indexOfParentHeading].subheadings.push({
            name: this.metadataActivelyBeingEdited.name,
            selected: false
          });
        }
        //this is for editing existing heading
        if (this.metadataActivelyBeingEdited.index !== null) {
          this.headings[this.indexOfParentHeading].subheadings[
            this.metadataActivelyBeingEdited.index
          ].name = this.metadataActivelyBeingEdited.name;
        }
        //because the subheadings are nested underneath the headings data we are updating the headings to firestore
        let headingsForFirestore = { headingList: this.headings };
        this.updateMetadataWithFirestore("headings", headingsForFirestore);
      }
    },
    deleteMetadata() {
      if (this.metadataActivelyBeingEdited.type == "tag") {
        this.tags.splice(this.metadataActivelyBeingEdited.index, 1);
        let tagsForFirestore = { tagList: this.tags };
        this.updateMetadataWithFirestore("tags", tagsForFirestore);
      }
      if (this.metadataActivelyBeingEdited.type == "heading") {
        this.headings.splice(this.metadataActivelyBeingEdited.index, 1);
        let headingsForFirestore = { headingList: this.headings };
        this.updateMetadataWithFirestore("headings", headingsForFirestore);
      }
      if (this.metadataActivelyBeingEdited.type == "subheading") {
        let self = this;
        this.headings.filter(function(item, index) {
          if (item.name == self.selectedHeading) {
            //this is the important bit, the grabbing of the appropriate index so we can use it below
            self.indexOfParentHeading = index;
            return;
          }
        });
        self.headings[self.indexOfParentHeading].subheadings.splice(
          self.metadataActivelyBeingEdited.index
        );
        let headingsForFirestore = { headingList: this.headings };
        this.updateMetadataWithFirestore("headings", headingsForFirestore);
      }
    },
    updateMetadataWithFirestore(docName, values) {
      try {
        this.tags = [];
        this.headings = [];
        this.ref2
          .doc(docName)
          .set(values)
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
    console.log("eh", this.$route.params.id);
    this.tags = [];
    let getExistingMetadata = () => {
      this.ref2.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id, doc.data());
          if (doc.data().tagList) {
            doc.data().tagList.forEach(i => {
              this.tags.push(i);
            });
          }
          if (doc.data().headingList) {
            doc.data().headingList.forEach(i => {
              this.headings.push(i);
            });
          }
        });
      });
    };

    let getAndProcessExistingCheatsheets = () => {
      this.refCheatsheets
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.existingCheatsheets.push(doc.id);
          });
        })
        .then(() => {
          this.existingCheatsheetsController = this.existingCheatsheets.map(
            item => {
              let rObj = {};
              rObj.name = item;
              rObj.selected = false;
              // console.log(rObj);
              return rObj;
            }
          );
        });
    };

    let getVideoWeAreEditing = () => {
      this.ref
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("here");
            this.dataStore = doc.data();

            if (doc.data().pageHeading) {
              this.selectedHeading = doc.data().pageHeading;
            }
            if (doc.data().pageSubheading) {
              this.selectedSubheading = doc.data().pageSubheading;
            }
            if (doc.data().tags.length > 0) {
              doc.data().tags.forEach(tagg => {
                console.log(tagg);
                console.log(this.tags);
                this.tags.forEach(i => {
                  if (i.name == tagg) {
                    i.selected = true;
                  }
                });
                // this.tags[tag]
              });
            }
          }
        });
    };
    getVideoWeAreEditing();
    getExistingMetadata();
    getAndProcessExistingCheatsheets();
  }
};
</script>

<style></style>
