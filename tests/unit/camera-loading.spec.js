import { mount } from '@vue/test-utils';

import CameraLoading from '@/components/CameraLoading';

describe('CameraLoading.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(CameraLoading);
    });

    it('renders', () => {
        // Test
        expect(wrapper.exists()).toBe(true);
    });
});