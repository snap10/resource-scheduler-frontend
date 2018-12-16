<template>
  <div class="organisation container">
    <loader :loaded="!organisationLoading"></loader>
    <section>
      <div v-if="organisation" class=" has-text-centered">
                <div class="columns is-vcentered margin-1">
                  <!-- <div class="column is-5"> -->
                      <!--TODO make Image Upload possible-->
                        <!-- <figure class="image is-4by3"> -->
                            <!-- <img :src="getImageUrl" alt="Description"> -->
                        <!-- </figure> -->
                    <!-- </div> -->
                    <div class="column is-6 is-offset-1">
                      <div class="field">
                        <div class="control">
                          <input class="input" type="text" v-model="organisation.name" placeholder="Titel"/>
                        </div>
                      </div>
                      <article class="is-4">
                        <div class="field">
                          <div class="control">
                           <textarea class="textarea" v-model="organisation.description" placeholder="Beschreibung der Organisation"/>
                          </div>
                        </div>
                      </article>
                    </div>
                </div>
            </div>
    </section>
        <div class="margin-2"></div>
    <section class="hero is-warning margin-1">
      <h1 class="is-size-5">Details</h1>
      <div class="">TODO</div>
    </section>
            <div class="margin-2"></div>
      <section>
        <div class="has-text-centered">
          <button class="button is-primary" :class="{'is-loading':postLoading}" @click="addOrganisation">
            Hinzufügen
          </button>
        </div>
      </section>
      </div>
</template>

<script>
import organisationApi from './../api/organisations'
import Loader from './../components/Loader.vue'
export default {
  name: 'edit-organisation',
  components: { Loader },
  data () {
    return {
      organisationid: null,
      create:false,
      postLoading:false,
      loaded: false,
      toggle:false
    }
  },
  created () {
    this.organisationid = this.$route.params.orgid
    if(this.organisationid)this.$store.dispatch('loadOrganisation',this.organisationid)
    else this.create=true

  },
  methods:{
    isGreaterThan(date1,date2){
      console.log(date1,date2)
      return date1>date2
    },
    toggleEvent(evt){
      evt.clicked=!evt.clicked||false
      this.toggle=!this.toggle
      console.log(evt)
    },
     redirectToResource(id){
        this.$router.replace({ name: 'Organisation', params: { orgid:id}})
    },
    addOrganisation(){
      if(this.validate(this.organisation)){
        this.postLoading=true
        organisationApi.postOrganisation(this.organisation)
        .then(resp => {
          this.postLoading=false
          if(resp && resp.headers.location){
            console.log(resp.headers.location)
            var id= resp.headers.location.substr(resp.headers.location.lastIndexOf('/') + 1)
            this.$router.push({ name: 'Organisation', params: { orgid:id}})
          }
        })
        .catch(err => {
          this.postLoading=false
          console.error(err)
        })
      }else{
        //TODO
      }
    },
    validate(res){
       if(!res.name)return false
       return true
    }
  },
  computed:{
    organisationLoading(){
      return this.$store.getters.organisationLoading||false
    },
    organisation(){
      return this.$store.getters.organisation(this.organisationid)||{}
    },
    getImageUrl(){
      return this.organisation.main_picture_url || ""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeline-marker{
  z-index: 10;
}
</style>
