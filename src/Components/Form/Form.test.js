import { mount } from 'enzyme';
import Form from './index';

const inputs = [
    {
        inputProps: {
            name: 'roomName',
            type: 'text',
            info: 'Le nom du salon ne doit pas contenir de caractères spéciaux et dois faire entre 3 et 40 caractères',
        },
        labelProps: {
            htmlFor: 'roomName',
        },
        labelTitle: 'Nom du salon',
    },
];
const onSubmit = jest.fn();
const onChange = jest.fn();
const state = {
    roomName: '',
};
const errors = {
    roomName: '',
};
const isLoading = false;

describe('Form Component', () => {
    it('should render', () => {
        const wrapper = mount(
            <Form
                inputs={inputs}
                onSubmit={onSubmit}
                onChange={onChange}
                state={state}
                errors={errors}
                isLoading={isLoading}
            />
        );
        expect(wrapper).toBeTruthy();
    });
});
