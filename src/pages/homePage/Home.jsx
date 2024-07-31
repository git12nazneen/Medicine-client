import React, { useContext, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Nav from '../../shared/Nav';
import Banner from '../../components/Banner';
import { AppContext } from '../../hooks/AppContext';

const Home = () => {
    const {sideCollaps} = useContext(AppContext)
    
    return (
        <div className='flex'>
           
            <Sidebar sideCollaps={sideCollaps}></Sidebar>
            <Banner></Banner>
        </div>
    );
};

export default Home;