import React from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Logo from "./Logo/Logo";

export default function Login() {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <Logo />
      <section
        className="w-96 h-80 bg-transparent 
        flex flex-col justify-center items-center rounded-md border-2 border-myGray"
      >
        <Header />
        <Main />
      </section>
        <Footer />
    </div>  );
}
