import { useState } from 'react';
import React from 'react';
import Header from '../Mycomponents/Home_component/Header';
import Navbar from '../Mycomponents/Home_component/Navbar';
import Rightside from '../Mycomponents/Home_component/Rightside';
import Leftside from '../Mycomponents/Home_component/Leftside';
import Footer from '../Mycomponents/Home_component/Footer';
import LoginAsAdmin from '../Mycomponents/Home_component/Login_as_admin';
function Home() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  return (
    <>
    <Header/>
    <Navbar setIsAdminLogin={setIsAdminLogin} />
    <Leftside/>
    {isAdminLogin ? <LoginAsAdmin /> : <Rightside />}
    <Footer/>
    </>
  );
}

export default Home;
