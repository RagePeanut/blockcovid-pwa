import { mount } from '@vue/test-utils';

import CameraOverlay from '@/components/CameraOverlay';

describe('CameraOverlay.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(CameraOverlay);
    });

    it('renders', () => {
        // Test
        expect(wrapper.exists()).toBe(true);
    });

    describe('torch button', () => {
        it('renders the button when torchSupported is true', async () => {
            // Action
            wrapper.setProps({
                torchSupported: true,
            });
            await wrapper.vm.$nextTick();
            // Test
            expect(wrapper.find('.v-btn').exists()).toBe(true);
        });
    
        it('doesn\'t render the button when torchSupported is false', async () => {
            // Action
            wrapper.setProps({
                torchSupported: false,
            });
            await wrapper.vm.$nextTick();
            // Test
            expect(wrapper.find('.v-btn').exists()).toBe(false);
        });
    
        it('renders the correct icon when torchActive is true', async () => {
            // Setup - Action
            wrapper.setProps({
                torchSupported: true,
                torchActive: true,
             });
            await wrapper.vm.$nextTick();
            // Tests
            expect(wrapper.findComponent({ ref: 'torch-on' }).exists()).toBe(true);
            expect(wrapper.findComponent({ ref: 'torch-off' }).exists()).toBe(false);
        });

        it('renders the correct icon when torchActive is false', async () => {
            // Setup - Action
            wrapper.setProps({
                torchSupported: true,
                torchActive: false,
             });
            await wrapper.vm.$nextTick();
            // Tests
            expect(wrapper.findComponent({ ref: 'torch-on' }).exists()).toBe(false);
            expect(wrapper.findComponent({ ref: 'torch-off' }).exists()).toBe(true);
        });

        it('emits a torch-click when the button is clicked', async () => {
            // Setup
            wrapper.setProps({
                torchSupported: true,
            });
            await wrapper.vm.$nextTick();
            // Action
            await wrapper.find('.v-btn').trigger('click');
            await wrapper.vm.$nextTick();
            // Test
            expect(wrapper.emitted('torch-click')).toBeTruthy();
        });
    });
});