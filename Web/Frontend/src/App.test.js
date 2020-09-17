
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import store  from './store'
import { shallow, render, mount } from 'enzyme';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Homepage from './components/authentication/Homepage';
import Dashboard from './components/customer/Dashboard.js';
// import Carslistadmin from './components/admin/Carslistadmin.js';
import Rentalhistory from './components/admin/Rentalhistory.js';
import Userslist from './components/admin/Userslist.js';
configure({ adapter: new Adapter() });
describe('Login component test with Enzyme', () => {
    it("renders without crashing", () => {
        shallow(<Provider store={store}><Login /></Provider>);
      });
    // it("renders Account header", () => {
    //     const wrapper = shallow(<Provider store={store}><Login /></Provider>);
    //     const container = <div className='login'></div>
    //     const mm = wrapper.find('.login')
    //     console.log(wrapper)
    //     expect(wrapper.find('login')).toEqual(true);
    // });
    // it("renders Account header", () => {
    //     const wrapper = shallow(<Provider store={store}><Navigation /></Provider>);
    //     const container = <div className='login'></div>
    //     const mm = wrapper.find('login')
        
    //     expect(wrapper.find('login')).toEqual(true);
    // });
});

describe('Signup component test with Enzyme', () => {
    it("Sign Up renders without crashing", () => {
        shallow(<Provider store={store}><Signup /></Provider>);
      });    
});

describe('Homepage component test with Enzyme', () => {
    it("Homepage renders without crashing", () => {
        shallow(<Provider store={store}><Homepage /></Provider>);
      });
    
});

// describe('test', () => {
//     const signup = shallow(<Provider store={store}><Signup /></Provider>);
//     const fakeUser = {
//         email : "nhi@gmail.com",
//         password: "123456",
//         confirm_password: "123456",
//         username: nhipham,
//         role: 'Customer'
//     };

    
// })

describe('Customer Dashboard component test with Enzyme', () => {
    it("Dashboard renders without crashing", () => {
        shallow(<Provider store={store}><Dashboard /></Provider>);
      });    
});
describe('Admin Rental history component test with Enzyme', () => {
    it("Rentalh istory renders without crashing", () => {
        shallow(<Provider store={store}><Rentalhistory /></Provider>);
      });    
});
describe('Admin User lists component test with Enzyme', () => {
    it("Admin Users list renders without crashing", () => {
        shallow(<Provider store={store}><Userslist /></Provider>);
      });    
});