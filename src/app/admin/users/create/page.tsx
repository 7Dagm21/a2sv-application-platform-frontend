
// import Link from 'next/link';

import Header from "./components/Header";

import  Form  from "./components/Form";
export default function CreateUser() {
  return (
    <>
     
      <main className="px-2 sm:px-4 md:px-6 lg:px-8 mt-5">
        <div className="max-w-3xl mx-auto">
          <Header />
          <Form />
        </div>
      </main>
    </>
  );
}
