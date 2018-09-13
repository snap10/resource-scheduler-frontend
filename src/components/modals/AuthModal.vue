<template>
<div class="modal" :class="{ 'is-active':active  }">
      <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Bitte Anmelden</p>
            <button @click="closeLoginModal" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            Anscheinend bist du nicht eingeloggt, bitte melde dich an oder erstelle dir einen Account um fortzufahren.
          </section>
          <footer class="modal-card-foot">
            <button @click="closeLoginModal" class="button is-pulled-left is-outlined is-danger">Abbrechen</button>
            <router-link :to="'/login'" class="button is-pulled-right is-link">Anmelden</router-link>
            <router-link class="button is-link is-pulled-right"  :to="'/register'" >Registrieren</router-link>
          </footer>
      </div>
    </div>
</template>
<script>
export default {
   name:'auth-modal',
   props: ['active'],
   methods: {
     closeLoginModal(){
       this.active=false
       this.$emit('closeAuthModal')
     }
   }
}
</script>
<style>

</style>
