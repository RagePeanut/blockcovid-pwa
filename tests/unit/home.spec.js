import Home from '@/views/Home.vue';
import { mount } from '@vue/test-utils';

const $router = {
    push: jest.fn(),
};

describe('Home.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Home, {
            mocks: {
                $router,
            },
        });
    });

    it('renders', () => {
        // Test
        expect(wrapper.exists()).toBe(true); 
    });

    it('pushes to /scanner when the scan button is clicked', async () => {
        // Action
        await wrapper.find('.v-btn').trigger('click');
        // Test
        expect($router.push).toHaveBeenLastCalledWith('/scanner');
    });
});