import React from 'react';
import { shallow } from 'enzyme';
import App from './App';  
import fakeProps from 'react-fake-props';

describe('App', () => {
    const props = {} 
    const app = shallow(<App {...props}/>); 
    it('renders correctly', () => {
        expect(app).toMatchSnapshot();
    })
});
