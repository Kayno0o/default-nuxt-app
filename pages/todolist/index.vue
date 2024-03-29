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

function updateTodo(todo: Todolist) {
  if (!editTodo.value)
    return

  $api(`/api/todolist/${editTodo.value.id}`, {
    method: 'PUT',
    body: { checked: editTodo.value.checked, content: editTodo.value.content },
  }, {
    errorMessage: 'Error while updating todo',
    successMessage: 'Successfully edited todo',
    onSuccess: () => {
      if (editTodo.value)
        todo.content = editTodo.value.content
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

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
      <div v-for="todo in data" :key="todo.id" class="flex gap-2 justify-between items-center card">
        <BaseCheckbox
          :id="`todo-check-${todo.id}`"
          :model-value="todo.checked"
          :label="editTodo?.id === todo.id ? '' : todo.content"
          @update:model-value="val => setChecked(todo, val)"
        />

        <div v-if="editTodo?.id !== todo.id" class="flex gap-2">
          <Click class="ph:pencil text-accent" @click="editTodo = { ...todo }" />
          <Click class="ph:trash text-red-5" @click="deleteTodo(todo)" />
        </div>
        <form v-else class="flex gap-2 items-center w-full" @submit.prevent="updateTodo(todo)">
          <BaseInput
            v-if="editTodo?.id === todo.id"
            :id="`todo-content-${todo.id}`"
            v-model="editTodo.content"
            small
            class="w-full"
          />
          <Click is="button" type="submit" class="ph:check-bold text-accent" />
          <Click class="ph:x text-red-5" @click="editTodo = null" />
        </form>
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
