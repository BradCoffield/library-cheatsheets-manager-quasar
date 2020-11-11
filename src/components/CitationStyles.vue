<template> 

  <q-card padding dark class="q-mt-md q-pa-sm">
    heyyyyy {{this.id}}
      <q-card-section>
        <div class="text-h4 text-white text-bold ">
          <q-checkbox
            dark
            v-model="dataStore.citation_styles.metadata.useInProduction"
             label=""
            color="dark"
          />
          Citation Styles
          <q-icon
            name="far fa-question-circle"
            dark
            style="font-size: 18px;"
            class="text-accent"
          >
            <q-tooltip
              content-class="bg-grey-9"
              content-style="font-size: 16px"
            >
              Include useful content for selected citation styles.
            </q-tooltip></q-icon
          >
        </div>
        <hr dark />
      </q-card-section>
      <q-card-section>
        <template v-if="citationStylesController.length > 0">
          <div class="row">
            <div
              class="col"
              v-for="(item, index) in citationStylesController"
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

</template>

<script>
export default {
    props:["id",],
  data: function() {
    return {
        dataStore: {
     
        citation_styles: {
          metadata: {
            useInProduction: false
          },
          toUse: []
        },
       
      },
      ref: this.$firestore.collection("Cheatsheets"), //name of the collection in firestore that contains all your real data
      ref2: this.$firestore.collection("CitationStylesRepository")
    };
  }
};
</script>

<style></style>
