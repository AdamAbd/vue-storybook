<script setup lang="ts">
/**
 * AppCard Component
 *
 * A reusable, responsive card component following Vue 3 Composition API best practices.
 *
 * Props
 * - title (string, required): Header/title text for the card.
 * - content (string, optional, default: ""): Main body text content.
 * - imageUrl (string, optional): Source URL for an optional top image.
 * - actions (AppCardAction[], optional, default: []): List of action buttons.
 *   Each action can include:
 *     - label (string): Button text
 *     - onClick? (fn): Optional click handler invoked before event emission
 *     - disabled? (boolean): Disable the action button
 *
 * Events
 * - action-click: Emitted when an action button is clicked.
 *   Payload: { action: AppCardAction, event: MouseEvent }
 *
 * Slots
 * - header: Replace the header section content.
 * - default: Replace or extend the body content.
 * - footer: Replace the footer/actions area.
 *
 * Usage Examples
 * Basic props usage:
 * <AppCard
 *   title="Welcome"
 *   content="This is a simple card."
 *   :actions="[{ label: 'OK' }, { label: 'Cancel' }]"
 *   @action-click="({ action }) => console.log(action.label)"
 * />
 *
 * Advanced slot usage:
 * <AppCard
 *   title="Advanced"
 *   imageUrl="https://picsum.photos/seed/card/640/320"
 *   :actions="advancedActions"
 *   @action-click="onCardAction"
 * >
 *   <template #header>
 *     <h3 class="text-xl font-semibold">Custom Header</h3>
 *   </template>
 *   <p>Custom body from default slot.</p>
 *   <template #footer>
 *     <div style="display:flex; gap:.5rem"><button type="button">Extra</button></div>
 *   </template>
 * </AppCard>
 *
 * Style Guidelines
 * - Customize via CSS variables (see :root variables).
 * - Card is responsive and uses flex layout; image scales to container width.
 * - Keep action labels short; prefer 2–4 actions for clarity.
 */

import { withDefaults, defineProps, defineEmits } from 'vue'

export interface AppCardAction {
  label: string
  onClick?: (action: AppCardAction, event: MouseEvent) => void
  disabled?: boolean
}

export interface AppCardProps {
  title: string
  content?: string
  imageUrl?: string
  actions?: AppCardAction[]
}

export type AppCardEvents = {
  (e: 'action-click', payload: { action: AppCardAction; event: MouseEvent }): void
}

const props = withDefaults(defineProps<AppCardProps>(), {
  content: '',
  imageUrl: undefined,
  actions: () => [] as AppCardAction[]
})

const emit = defineEmits<AppCardEvents>()

function handleActionClick(action: AppCardAction, event: MouseEvent) {
  try {
    action.onClick?.(action, event)
  } catch {
    // Swallow handler errors to avoid breaking UI; parent still receives event.
    // Consider logging or reporting in production environments.
  }
  emit('action-click', { action, event })
}
</script>

<template>
  <section class="app-card">
    <div v-if="props.imageUrl" class="app-card__image">
      <img :src="props.imageUrl" :alt="props.title" />
    </div>

    <header class="app-card__header">
      <slot name="header">
        <h3 class="app-card__title">{{ props.title }}</h3>
      </slot>
    </header>

    <div class="app-card__body">
      <slot>
        <p v-if="props.content" class="app-card__content">{{ props.content }}</p>
      </slot>
    </div>

    <footer v-if="(props.actions && props.actions.length) || $slots.footer" class="app-card__footer">
      <slot name="footer">
        <div class="app-card__actions">
          <button
            v-for="(action, index) in props.actions"
            :key="index"
            class="app-card__button"
            :disabled="action.disabled"
            type="button"
            @click="handleActionClick(action, $event)"
          >
            {{ action.label }}
          </button>
        </div>
      </slot>
    </footer>
  </section>
  
</template>

<style scoped>
:root {
  --app-card-bg: #ffffff;
  --app-card-border: #e5e7eb; /* gray-200 */
  --app-card-title: #111827; /* gray-900 */
  --app-card-text: #374151; /* gray-700 */
  --app-card-radius: 0.75rem;
  --app-card-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
  --app-card-button-bg: #111827;
  --app-card-button-text: #ffffff;
  --app-card-button-hover-bg: #1f2937; /* gray-800 */
}

.app-card {
  display: flex;
  flex-direction: column;
  background: var(--app-card-bg);
  border: 1px solid var(--app-card-border);
  border-radius: var(--app-card-radius);
  box-shadow: var(--app-card-shadow);
  overflow: hidden;
  max-width: 100%;
}

.app-card__image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.app-card__header {
  padding: 1rem 1rem 0.5rem;
}

.app-card__title {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--app-card-title);
  font-weight: 600;
}

.app-card__body {
  padding: 0.5rem 1rem 1rem;
  color: var(--app-card-text);
}

.app-card__content {
  margin: 0;
}

.app-card__footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--app-card-border);
}

.app-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.app-card__button {
  background: var(--app-card-button-bg);
  color: var(--app-card-button-text);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.app-card__button:hover {
  background: var(--app-card-button-hover-bg);
}

@media (min-width: 640px) {
  .app-card {
    flex-direction: column;
  }
}
</style>