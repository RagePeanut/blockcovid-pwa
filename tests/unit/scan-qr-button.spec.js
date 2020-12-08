import { mount } from '@vue/test-utils';

import ScanQrButton from '@/components/ScanQrButton';

describe('ScanQrButton.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(ScanQrButton);
    });

    it('emits a click event when clicked', async () => {
        // Action
        await wrapper.find('.v-btn').trigger('click');
        await wrapper.vm.$nextTick();
        // Test
        expect(wrapper.emitted('click')).toBeTruthy();
    });
});