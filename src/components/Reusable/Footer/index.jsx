import React from 'react';
import Myimg from "../../../Images/My/my-1.jpg";

const FooterPage = () => {
  return (
    <div className="bg-gray-900/20 backdrop-blur-3xl">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="flex items-center justify-center gap-5 mb-10 px-5">
          <img src={Myimg} alt="Junaid Hussain" className="w-20 h-20 object-cover rounded-full" />
          <h3 className="text-3xl">Junaid Hussain</h3>
        </div>
        <div className="flex flex-col  items-center md:flex-row md:justify-between md:items-start text-gray-400">
          <div className="text-center md:text-left">
            <p className="mb-2">Contact us:</p>
            <p className="text-sm">Email: <a href="mailto:junaidahmed160@gmail.com" className="underline">junaidahmed160@gmail.com</a></p>
            <p className="text-sm">Phone: <a href="tel:+03111256303" className="underline">03111256303</a></p>
            <div className="mt-4">
              <a href="https://github.com/junaid-aly" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-yellow-300 mx-2">GitHub</a>
              <a href="https://facebook.com/junaidahmed160" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-yellow-300 mx-2">Facebook</a>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <p className="text-sm">© Beautiful Footer, 2024.</p>
            <div className="flex flex-col md:flex-row mt-4">
              <span className="px-2">About us</span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
