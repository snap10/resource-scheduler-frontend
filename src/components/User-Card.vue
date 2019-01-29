<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="is-rounded" :src="user.profilePicturePath||'https://placehold.it/128x128'" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="heading ">{{user.username}}</p>
          <p class="subtitle is-size-6 is-marginless">{{user.givenName}} {{user.familyName}}</p>
          <p class="is-size-7">{{textThirdRow}}</p>
        </div>
        <div class="media-right">
          <a href="">
            <span class="is-invisible icon"><i class="fas fa-ellipsis-v has-text-grey"></i></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user-card',
    props: ['userForCard', 'userId','textThirdRow'],
    data() {
      return {
        status: 0,
      }
    },
    created() {
      if (this.userId) this.$store.dispatch('loadUser', this.userId)
        .then((result) => {
          this.status = 1
        }).catch((err) => {
          this.status = 2
        });
      else this.status = 1
    },
    mounted() {},
    computed: {
      computedId() {
        return this.userId || this.userForCard.id
      },
      user() {
        return this.userForCard || this.$store.getters.user(this.userId) || {}
      },
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>