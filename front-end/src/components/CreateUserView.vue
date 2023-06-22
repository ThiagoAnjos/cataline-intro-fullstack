<template>
  <section>
    <h5 class="title">Novo usuário</h5>
    <form @submit.prevent="createUser">
      <input type="text" placeholder="Nome" v-model="form.name" />
      <input type="text" placeholder="E-mail" v-model="form.email" />
      <button type="submit">Adicionar</button>
    </form>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>