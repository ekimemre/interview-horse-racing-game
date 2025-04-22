import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/Base/Button.vue'

describe('BaseButton.vue', () => {
  it('renders default class', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.classes()).toContain('base-button')
    expect(wrapper.classes()).toContain('base-button--default')
  })

  it('applies type class when type is "primary"', () => {
    const wrapper = mount(BaseButton, {
      props: { type: 'primary' }
    })
    expect(wrapper.classes()).toContain('base-button--primary')
  })

  it('adds pointer-events-none class when disabled is true', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('pointer-events-none')
  })

  it('emits "clicked" event on click', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('clicked')).toBeTruthy()
    expect(wrapper.emitted('clicked').length).toBe(1)
  })

  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click Me',
        icon: '<svg class="icon"></svg>'
      }
    })
    expect(wrapper.text()).toContain('Click Me')
    expect(wrapper.find('svg.icon').exists()).toBe(true)
  })
})
