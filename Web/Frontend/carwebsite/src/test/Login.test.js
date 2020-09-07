import 'jsdom-global/register';
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Login from '../components/authentication/Login';
// import App from '../App'
import store  from '../store'
import {expect} from 'chai';
import {configure} from 'enzyme';
import sinon from 'sinon';

import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

global.expect = expect;
global.sinon = sinon;
beforeEach(() => {
  //
});

afterEach(() => {
  //
});

function render() {
    wrapper = mount(<Login />)
}
describe("Login Component Testing", () => {
    let wrapper;
  it("Render Login", () => {
    render()
    expect(wrapper.find('.textField'))
  });
});