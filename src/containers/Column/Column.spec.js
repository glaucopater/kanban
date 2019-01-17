import React from "react";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Column } from "./Column.jsx"; 

Enzyme.configure({ adapter: new Adapter() });

describe("Column", () => {
    let props, wrapper;
    const shallowRenderWithProps = () => {
        wrapper = shallow(<Column {...props} />);
    };
    beforeEach(() => {
        props = { 
        };
        shallowRenderWithProps();
    });
    it("should render a Column", () => {
        expect(wrapper.length).toBe(1); 
    });
});