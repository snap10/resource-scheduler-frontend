<template>
<div class="modal" :class="{ 'is-active':active  }">
      <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Send Report</p>
            <button @click="closeModal" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <form>
              
            </form>
          </section>
          <footer class="modal-card-foot">
            <button @click="closeModal" class="button is-pulled-left is-outlined is-danger">Cancel</button>
            <button @click="createReport" class="button is-pulled-right is-outlined is-link">Send</button>
          </footer>
      </div>
    </div>
</template>
<script>
export default {
   name:'send-report-modal',
   props: ['active'],
   methods: {
     closeModal(){
       this.$emit('closeReportModal')
     },
     createReport(){
       // TODO 
     }
   }
}
</script>
<style>

</style>
