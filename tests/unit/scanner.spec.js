import Scanner from '@/views/Scanner.vue';
import { shallowMount } from '@vue/test-utils';

const setHistoryLength = (length) => {
    delete window.history;
    Object.defineProperty(window, 'history', {
        configurable: true,
        value: {
            length,
        },
        writable: true,
    });
}

const $router = {
    go: jest.fn(),
    replace: jest.fn(),
};

describe('Scanner.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Scanner, {
            mocks: {
                $router,
            },
        });
    });

    it('renders', () => {
        expect(wrapper.exists()).toBe(true); 
    });

    describe('navigateBack is called', () => {
        it('goes to the previous page when the history length is higher than 1', () => {
            // Setup
            setHistoryLength(2);
            // Action
            wrapper.vm.navigateBack();
            // Test
            expect($router.go).toHaveBeenLastCalledWith(-1);
        });

        it('goes to the home page when the history length is 1', () => {
            // Setup
            setHistoryLength(1);
            // Action
            wrapper.vm.navigateBack();
            // Test
            expect($router.replace).toHaveBeenLastCalledWith('/');
        });
    });

    describe('onDecode is called', () => {
        it('doesn\'t update decoded when the argument is empty', () => {
            // Setup
            wrapper.vm.$data.decoded = 'previouslyDecoded';
            // Action
            wrapper.vm.onDecode('');
            // Test
            expect(wrapper.vm.$data.decoded).toEqual('previouslyDecoded');
        });

        it('doesn\'t emit a success event when the argument is empty', async () => {
            // Setup
            wrapper.vm.$data.decoded = 'previouslyDecoded';
            // Action
            wrapper.vm.onDecode('');
            await wrapper.vm.$nextTick();
            // Test
            expect(wrapper.emitted().success).toBeUndefined();
        });

        it('doesn\'t emit a success event when the argument is the same as the data', async () => {
            // Setup
            wrapper.vm.$data.decoded = 'decoded';
            // Action
            wrapper.vm.onDecode('decoded');
            await wrapper.vm.$nextTick();
            // Test
            expect(wrapper.emitted().success).toBeUndefined();
        });

        it('updates decoded', () => {
            // Action
            wrapper.vm.onDecode('decoded');
            // Test
            expect(wrapper.vm.$data.decoded).toEqual('decoded');
        });

        it('emits a success event with the correct data', async () => {
            // Action
            wrapper.vm.onDecode('decoded');
            await wrapper.vm.$nextTick();
            // Test
            expect(wrapper.emitted().success).toBeTruthy();
            expect(wrapper.emitted().success[0]).toEqual(['decoded']);
        });
    });

    describe('onInit is called', () => {
        it('doesn\'t emit any error when the initPromise resolves', async () => {
            // Action
            await wrapper.vm.onInit(Promise.resolve({ capabilities: {} }));
            await wrapper.vm.$nextTick();
            // Test
            expect(wrapper.emitted().error).toBeUndefined();            
        });

        it('emits an error when the initPromise rejects', async () => {
            // Action
            await wrapper.vm.onInit(Promise.reject(new Error()));
            await wrapper.vm.$nextTick();
            // Test
            expect(wrapper.emitted().error).toBeTruthy();

        });

        it('calls navigateBack when the initPromise rejects', async () => {
            // Setup
            wrapper.vm.navigateBack = jest.fn();
            // Action
            await wrapper.vm.onInit(Promise.reject(new Error()));
            // Test
            expect(wrapper.vm.navigateBack).toHaveBeenCalled();
        });
    });
});