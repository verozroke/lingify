<template>
  <v-parallax
    class="bg"
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  >
    <div class="overlay">
      <div class="hero">
        <ui-lingify-title :size="72" style="margin-bottom: 20px" />
        <v-row style="gap: 8px">
          <nuxt-link to="/login">
            <v-btn
              prepend-icon="mdi-login"
              color="teal-accent-4"
              class="text-transform-none"
              >Войти</v-btn
            >
          </nuxt-link>
          <nuxt-link to="/register">
            <v-btn
              color="teal-accent-4"
              prepend-icon="mdi-account-plus"
              class="text-transform-none"
              >Регистрация</v-btn
            >
          </nuxt-link>
        </v-row>
      </div>
    </div>
  </v-parallax>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg {
  height: calc(100vh - 48px);
  width: 100vw;
  position: relative;
}

.text-transform-none {
  text-transform: none;
}

.overlay {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000085;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
