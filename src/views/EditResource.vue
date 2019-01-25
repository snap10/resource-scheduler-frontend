<template>
  <div class="resource container">
    <loader :loaded="!resourceLoading"></loader>
    <section>
      <div v-if="resource" class=" has-text-centered">
                <div class="columns is-vcentered  margin-1">
                    <!-- <div class="column is-5"> -->
                      <!--TODO make Image Upload possible-->
                        <!-- <figure class="image is-4by3"> -->
                            <!-- <img :src="getImageUrl" alt="Description"> -->
                        <!-- </figure> -->
                    <!-- </div> -->
                    <div class="column is-6 is-offset-1">
                      <div class="field">
                        <div class="control">
                          <input class="input" type="text" v-model="resource.name" placeholder="Titel"/>
                        </div>
                      </div>
                      <article class="is-4">
                        <div class="field">
                          <div class="control">
                           <textarea class="textarea" v-model="resource.description" placeholder="Beschreibung der Resource"/>
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
          <button class="button is-primary" :class="{'is-loading':postLoading}" @click="addResource">
            Hinzufügen
          </button>
        </div>
      </section>
      </div>
</template>

<script>
import resourceApi from './../api/resources'
import ResourceCard from './../components/Resource-Card.vue'
import Loader from './../components/Loader.vue'
export default {
  name: 'edit-resource',
  components: { ResourceCard, Loader },
  data () {
    return {
      resourceId: {},
      organisationId: {},
      create:false,
      loaded: false,
      toggle:false,
      postLoading:false
    }
  },
  created () {
    this.resourceId = this.$route.params.resid
    this.organisationId = this.$route.params.orgid
    if(this.resourceId)this.$store.dispatch('loadResource',this.resourceId)
    else {
        this.create=true
        this.resource.organisationId=this.organisationId
    }

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
    redirectToResource(id,orgid){
      this.$router.replace({ name: 'Resource', params: { resid:id, orgid:orgid}})
      },
    addResource(){
      if(this.validate(this.resource)){
        this.postLoading=true
        if(this.resource.id){
          //Update Resource
          resourceApi.updateResource(this.resource)
          .then(resp => {
            this.postLoading=false
            this.redirectToResource(this.resource.id,this.resource.organisationId)
          })
          .catch(err => {
            this.postLoading=false
            console.error(err)
          })
        }else{
          //Create Resource
          resourceApi.postResource(this.resource)
          .then(resp => {
            this.postLoading=false
            if(resp && resp.headers.location){
              var id= resp.headers.location.substr(resp.headers.location.lastIndexOf('/') + 1)
              this.redirectToResource(id,this.organisationId)
            }
          })
          .catch(err => {
            this.postLoading=false
            console.error(err)
          })

        }
      }
    },
    validate(res){
       if(!res.name)return false
       if(this.organisationId&&!res.organisationId)return false
       return true
    }
  },
  computed:{
    resourceLoading(){
      return this.$store.getters.resourceLoading||false
    },
    resource(){
      return this.$store.getters.resource(this.resourceId)||{}
    },
    getImageUrl(){
      return this.resource.main_picture_url || "https://cdn1.iconfinder.com/data/icons/camera-13/100/Artboard_62-512.png"
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
