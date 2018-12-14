<template>
  <div class="resource container">
    <loader :loaded="!resourceLoading"></loader>
    <section>
      <div v-if="resource" class=" has-text-centered">
                <div class="columns is-vcentered">
                    <div class="column is-5">
                      <!--TODO make Image Upload possible-->
                        <figure class="image is-4by3">
                            <img :src="getImageUrl" alt="Description">
                        </figure>
                    </div>
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
          <button class="button is-primary" @click="addResource">
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
      resourceid: {},
      create:false,
      loaded: false,
      toggle:false
    }
  },
  created () {
    this.resourceid = this.$route.params.id
    if(this.resourceid)this.$store.dispatch('loadResource',this.resourceid)
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
    addResource(){
      if(validate(this.resource)){
        resourceApi.postResource(this.resouce)
        .then(resp => {
          if(resp && resp.headers.Location){
            this.$router.push({ name: 'Resource', params: { id:resp.headers.Location }})
          }
        })
        .catch(err => {
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
    resourceLoading(){
      return this.$store.getters.resourceLoading||false
    },
    resource(){
      return this.$store.getters.resource(this.resourceid)||{}
    },
    getImageUrl(){
      return this.resource.main_picture_url || "https://cdn1.iconfinder.com/data/icons/camera-13/100/Artboard_62-512.png"
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
