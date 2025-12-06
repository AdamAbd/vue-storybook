import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
    it('renders slots correctly', () => {
        const wrapper = mount(Button, {
            slots: {
                default: 'Click me',
            },
        })
        expect(wrapper.text()).toContain('Click me')
    })

    it('applies variant classes correctly', () => {
        const wrapper = mount(Button, {
            props: {
                variant: 'destructive',
            },
            slots: {
                default: 'Delete',
            },
        })
        // Expect the class to contain destructive variant styles (usually checking for class containment)
        // Since we don't know the exact class output of 'destructive', checking if it renders is safe.
        // However, checking class list implies we know tailwind classes or the compiled output.
        // For now, let's stick to basic rendering and maybe check attribute if possible, but class checking is brittle without the implementation details of buttonVariants.
        // We can check if the component mounts without error.
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.text()).toBe('Delete')
        expect(wrapper.classes()).toContain('bg-destructive')

        // We can check if `class` prop is merged if we pass one
        // const wrapper2 = mount(Button, { props: { class: 'extra-class' } })
        // expect(wrapper2.classes()).toContain('extra-class') 
    })
})
