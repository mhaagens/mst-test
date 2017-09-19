import React from 'react';
import sinon from 'sinon';
//import { expect } from 'chai';
import { shallow } from 'enzyme';

import Home from "./Home.js";

describe("it should render <Home />", () => {
	it("renders the app shell", () => {
		const wrapper = shallow(<Home />);
		expect(wrapper.find(".wrapper")).toExist;
	})
});