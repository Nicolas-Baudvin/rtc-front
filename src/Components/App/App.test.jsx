import {shallow} from "enzyme";
import App from "./index";

describe('<App />', () => {
    it('should render', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeTruthy();
    });
})