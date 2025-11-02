<script setup lang="ts">
import { Button } from './components/ui/button'
import AppCard, { type AppCardAction } from './components/ui/AppCard.vue'

const basicActions: AppCardAction[] = [
  { label: 'Learn More' },
  { label: 'Dismiss' }
]

function onCardAction(payload: { action: AppCardAction; event: MouseEvent }) {
  console.log('AppCard action click:', payload.action.label)
}

const advancedActions: AppCardAction[] = [
  { label: 'Save', onClick: (action) => console.log('Inline handler:', action.label) },
  { label: 'Delete', onClick: (action) => console.log('Inline handler:', action.label) }
]
</script>

<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>
  <Button>Click me</Button>

  <section style="display:grid; gap:1rem; grid-template-columns: 1fr; max-width: 960px; margin: 2rem auto;">
    <!-- Basic usage with props only -->
    <AppCard
      title="Basic AppCard"
      content="This is a simple card using props only."
      :actions="basicActions"
      @action-click="onCardAction"
    />

    <!-- Advanced usage with slots and image -->
    <AppCard
      title="Advanced AppCard"
      imageUrl="https://picsum.photos/seed/vue-card/640/320"
      :actions="advancedActions"
      @action-click="onCardAction"
    >
      <template #header>
        <h3 class="text-xl font-semibold">Custom Header Slot</h3>
      </template>

      <p>
        This content comes from the default slot with extra formatting and an
        <a href="https://vuejs.org/" target="_blank" rel="noreferrer">external link</a>.
      </p>

      <template #footer>
        <div style="display:flex; gap:0.5rem;">
          <Button>Slot Button</Button>
        </div>
      </template>
    </AppCard>
  </section>
</template>

<style scoped></style>
