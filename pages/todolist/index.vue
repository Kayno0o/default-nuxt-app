<script setup lang="ts">
import type { Todolist } from '~/types/entity'

definePageMeta({
  middleware: isGrantedMiddleware(['ROLE_USER']),
})

const { user } = useUserSession()

const { data, refresh } = useAPI<Todolist[]>('/api/todolist')

const editTodo = ref<Todolist | null>(null)
const newTodo = ref('')

function setChecked(todo: Todolist, checked: boolean) {
  $api(`/api/todolist/${todo.id}`, {
    method: 'PUT',
    body: { checked, content: todo.content },
  }, {
    errorMessage: 'Error while updating todo',
  })
}

function updateTodo() {
  if (!editTodo.value)
    return

  $api(`/api/todolist/${editTodo.value.id}`, {
    method: 'PUT',
    body: { checked: editTodo.value.checked, content: editTodo.value.content },
  }, {
    errorMessage: 'Error while updating todo',
    successMessage: 'Successfully edited todo',
    onSuccess: () => {
      editTodo.value = null
    },
  })
}

function deleteTodo(todo: Todolist) {
  $api(`/api/todolist/${todo.id}`, {
    method: 'DELETE',
  }, {
    errorMessage: 'Error while deleting todo',
    successMessage: 'Successfully deleted todo',
    onSuccess: () => {
      const i = data.value.findIndex(t => t.id === todo.id)
      if (i === -1)
        return

      data.value.splice(i, 1)
    },
  })
}

function addTodo() {
  $api(`/api/todolist`, {
    method: 'POST',
    body: { checked: false, content: newTodo.value },
  }, {
    errorMessage: 'Error while creating todo',
    successMessage: 'Successfully created todo',
    onSuccess: () => {
      newTodo.value = ''
      refresh()
    },
  })
}
</script>

<template>
  <div v-if="user" class="text-center">
    <BaseH1>Todolists</BaseH1>

    <div class="grid grid-cols-3 gap-x-8 gap-y-4">
      <div v-for="todo in data" :key="todo.id" class="flex justify-between items-center card">
        <BaseCheckbox
          :id="`todo-check-${todo.id}`"
          :model-value="todo.checked"
          :label="editTodo?.id === todo.id ? '' : todo.content"
          @update:model-value="val => setChecked(todo, val)"
        />
        <BaseInput
          v-if="editTodo?.id === todo.id"
          :id="`todo-content-${todo.id}`"
          v-model="editTodo.content"
          small
        />

        <div v-if="editTodo?.id !== todo.id" class="flex gap-2">
          <Click class="ph:pencil text-accent" @click="editTodo = { ...todo }" />
          <Click class="ph:trash text-red-5" @click="deleteTodo(todo)" />
        </div>
        <div v-else class="flex gap-2">
          <Click class="ph:check-bold text-accent" @click="updateTodo" />
          <Click class="ph:x text-red-5" @click="editTodo = null" />
        </div>
      </div>
    </div>

    <form class="flex items-center justify-center mt-10 gap-4" @submit.prevent="addTodo">
      <BaseInput id="todo-new" v-model="newTodo" label="Content" />
      <Click
        is="button"
        type="submit"
        class="btn-accent"
      >
        Add todo
      </Click>
    </form>
  </div>
</template>
