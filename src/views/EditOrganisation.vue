<template>
  <div class="has-background-light">
    <div class="margin-2"></div>
      <loader :loaded="!organisationLoading"></loader>
    <div class="organisation container">

      <section class="has-background-white padding-1">
        <div v-if="organisation" class=" has-text-centered">
            <h1 class="title">Organisation erstellen/bearbeiten</h1>
          <div class="columns">
            <div class="column">
              <div class="field">
                <div class="control">
                  <input class="input" type="text" v-model="organisation.name" placeholder="Titel" />
                </div>
              </div>
              <article class="is-4">
                <div class="field">
                  <div class="control">
                    <textarea class="textarea" v-model="organisation.description" placeholder="Beschreibung der Organisation" />
                    </div>
                        </div>
                      </article>
                    </div>
                </div>
            </div>
          <div class="column">
          <!-- TODO make Image Upload possible -->
          <!-- <figure class="image is-4by3"> -->
          <!-- <img :src="getImageUrl" alt="Description"> -->
          <!-- </figure> -->
          </div>
    </section>
        <div class="margin-2"></div>
    <section class="has-background-white padding-1">
      <h1 class="is-size-5">Details</h1>
      <div class="">TODO</div>
    </section>
            <div class="margin-2"></div>
      <section>
        <div class="has-text-centered">
          <button class="button is-link" :class="{'is-loading':postLoading}" @click="submitClick">
            {{saveText}}
          </button>
        </div>
      </section>
      <div class="height-2"></div>
      </div>
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
      organisation:{},
      organisationid: null,
      create:false,
      postLoading:false,
      loaded: false,
      toggle:false
    }
  },
  created () {
    this.organisationid = this.$route.params.orgid
    if(this.organisationid)organisationApi.getOrganisation(this.organisationid)
    .then(response =>{
      this.organisation=response.data
    })
    else this.create=true

  },
  methods:{
    submitClick(){
        if(this.validate(this.organisation)){
          if(this.create)this.addOrganisation() 
          else this.saveOrganisation()
        }else{}
    },
    addOrganisation(){
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
    },
    saveOrganisation(){
        this.postLoading=true
        organisationApi.saveOrganisation(this.organisation)
        .then(resp => {
          this.postLoading=false
            this.$router.push({ name: 'Organisation', params: { orgid:this.organisationid}})
        })
        .catch(err => {
          this.postLoading=false
          console.error(err)
        })
    },
    validate(res){
       if(!res.name)return false
       return true
    }
  },
  computed:{
    saveText(){
      return (this.create)?'Hinzufügen':'Speichern'
    },
    organisationLoading(){
      return this.$store.getters.organisationLoading||false
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