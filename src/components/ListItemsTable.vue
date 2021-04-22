<template>
  <div class=" ">
    <q-table
      title=""
      :data="data"
      :columns="columns"
      row-key="key"
      :pagination="initialPagination"
      :filter="filter"
      :grid="$q.screen.lt.md"
      :wrap-cells="wrapCells"
      :loading="loading"
      dark
    >
 
             <template v-slot:top-left>
            <q-space />
            <q-input outlined bg-color="accent" debounce="300" color="grey" v-model="filter" label="Search">
              <template v-slot:append>
                <q-icon name="search" color="grey" />
              </template>
            </q-input>
          </template>
              <template v-slot:top-right>
            <q-btn
              label="Create New"
              outline
              v-close-popup
              :to="createNewLink"
          /></template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            dense
            round
            flat
            color="grey"
            @click="editItem(props)"
            icon="edit"
            ><q-tooltip content-style="font-size: 16px">Edit</q-tooltip></q-btn
          >

          <q-btn
            dense
            round
            flat
            color="grey"
            @click="deleteItem(props)"
            icon="delete"
            ><q-tooltip content-style="font-size: 16px"
              >Delete</q-tooltip
            ></q-btn
          >
        </q-td>
      </template>
    </q-table>
    <delete-dialog
      :show="showDeleteDialog"
      :itemID="deleteItemData"
      :collectionName="collection"
    ></delete-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DeleteDialog from "components/DeleteDialog.vue";

export default {
  name: "EditPhysicalCollectionsTable",
  components: { DeleteDialog },
  props: {
    name: String,
    columns: Array,
    data: Array,
    sortBy: String,
    loading: Boolean,
    collection: String,
    createNewLink: String
  },
  computed: {
    // collectionFormatted() {
    //    return "college_publications"
    // }
  },
  data() {
    return {
      filter: "",
      showDeleteDialog: false,
      deleteItemData: "",
      wrapCells: true,
      // collectionFormatted: this.collection.replace(" ", "_").toLowerCase(),
      initialPagination: {
        sortBy: this.sortBy,
        descending: false,
        page: 1,
        rowsPerPage: 25
      }
    };
  },

  methods: {
    ...mapActions("store", ["updateEditCheatsheet"]),

    editItem(item) {
      console.log(item);
      this.updateEditCheatsheet(item.key);
      this.$router.push({
        name: "edit-cheatsheet"
        // params: { id: item.key }
      });
    },
    deleteItem(item) {
      console.log("in edit table component", item, item.key);
      this.deleteItemData = item.key;
      this.showDeleteDialog = true;
    }
  }
};
</script>
