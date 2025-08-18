<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import router from '@/router';

const validationSchema = yup.object({
  email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email'),
  password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
})

const { handleSubmit, errors } = useForm({ validationSchema })

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const login = handleSubmit((values) => {
  localStorage.setItem('users', JSON.stringify(values))
  localStorage.setItem('token', 'jaask38283jdsjdksdk')

  router.push('/dashboard')
})
</script>

<template>
  <div class="login-view">
    <h1 class="login-view__title">Admin Login</h1>

    <form class="login-view__form" @submit.prevent="login">
      <div class="input-wrapper">
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="email"
          :class="{ 'p-invalid': errors.email }"
        />
        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="input-wrapper">
        <label for="password">Password</label>
        <InputText
          id="password"
          v-model="password"
          type="password"
          :class="{ 'p-invalid': errors.password }"
        />
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <Button type="submit" label="Login" severity="help" class="custom-button" />
    </form>
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  max-width: 500px;
  width: 100%;
  padding: 32px;
  background: #fff;
  border-radius: 8px;
  margin: 150px auto 0;
}
.login-view__title {
  color: #E363AE;
  font-weight: bold;
}
.login-view__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.input-wrapper > label {
  font-weight: bold;
}
.custom-button {
  background-color: #E363AE;
  border-color: #E363AE;
  color: white;
}
.error-message {
  color: #ff5757;
  font-size: 0.8rem;
}
::v-deep(.p-invalid) {
  border-color: #ff5757 !important;
}
::v-deep(.custom-button.p-button:hover) {
  background-color: rgba(227, 99, 174, 0.9);
  border-color: rgba(227, 99, 174, 0.9);
}
</style>