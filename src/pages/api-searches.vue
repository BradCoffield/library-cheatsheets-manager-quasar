<template>
  <q-page padding>
  <q-card class="q-pa-md bg-dark q-mb-xl q-mt-xl text-primary header-card">
      <h2>API Searches</h2>
    </q-card>
   
   <!-- horizontal tabs -->
    <!-- <div class="q-gutter-y-md"  >
      <q-card>
        <q-tabs
          v-model="tab"
          
          class="text-grey-1 bg-dark"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          
          narrow-indicator
        >
          <q-tab name="mails" label="Mails" />
          <q-tab name="alarms" label="Alarms" />
          <q-tab name="movies" label="Movies" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
 
    </div> -->

    <!-- vertical tabs -->
   <div>
    <q-splitter
      v-model="splitterModel"
      dark
      class="bg-dark"
      
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          dark
          class="text-white"
        >
          <q-tab name="ebscoASC"  label="EBSCO / Academic Search Complete" />
          <q-tab name="primoArticles"  label="Primo / Articles" />
          <q-tab name="primoBooks"  label="Primo / Books" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
        <q-tab-panel name="home">
            <div class="text-h4 q-mb-md">Helpful Information</div>
            <p class="text-body1">On any cheatsheet you can display search results from various providers. </p>
            <p class="text-body1">First, you need to cache a search for the service. Then, you will, at the cheatsheet level, associate that search with that cheatsheet. Currently you may only associate one search per provider per cheatsheet.</p>
            <p class="text-body1">These help highlight relevant search providers while also giving them some idea, even if your topic isn't their topic, of the types of things they can expect from the service.</p>
          </q-tab-panel>


          <q-tab-panel name="ebscoASC">
          <ApiTableWrap displayname="EBSCO / Academic Search Complete" tablename="ebsco-searches"></ApiTableWrap>
          </q-tab-panel>

          <q-tab-panel name="primoArticles">
            <ApiTableWrap displayname="Primo / Articles" tablename="primo-article-searches"></ApiTableWrap>
          </q-tab-panel>

          <q-tab-panel name="primoBooks">
            <ApiTableWrap displayname="Primo / Books" tablename="primo-book-searches"></ApiTableWrap>
          </q-tab-panel>
        </q-tab-panels>
      </template>

    </q-splitter>
  </div>
  </q-page>
</template>

<script>
import ApiTableWrap from "../components/api-searches/ApiSearchTableWrapper"
export default {
    components: {ApiTableWrap},
data(){
    return{
        tab: 'home',
        splitterModel: 20
    }
}
}
</script>

<style>

</style>