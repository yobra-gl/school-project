// Footer.js
import React from 'react';

const Footer = () => {
    const footerNavs = [
        {
            href: 'javascript:void(0)',
            name: 'Terms'
        },
        {
            href: 'javascript:void(0)',
            name: 'License'
        },
        {
            href: 'javascript:void(0)',
            name: 'Privacy'
        },
        {
            href: 'javascript:void(0)',
            name: 'About us'
        }
    ];

    return (
        <footer className="pt-10  bg-gray-900">
            <div className="max-w-screen-xl mx-auto px-4 text-custom-orange md:px-8">
                <div className="space-y-6 sm:max-w-md sm:mx-auto sm:text-center">
                    <img src="https://i.imgur.com/PMVjBLQ.png" className="w-32 sm:mx-auto" alt="Logo" />
                    <p>
                        Delivering cars you need, Driving your dreams to your doorstep,
                        Bridging the gap between desire and driveway
                    </p>
                    <div className="items-center gap-x-3 space-y-3 sm:flex sm:justify-center sm:space-y-0">
                        <a href="Home" className="block py-2 px-4 text-center text-custom-orange font-medium bg-black-600 border border-custom-orange duration-150 hover:border-black-900 active:bg-black-9700 rounded-lg shadow-lg hover:shadow-none">
                            Let's View
                        </a>
                       
                    </div>
                </div>
                <div className="mt-10 py-10 border-t items-center justify-between sm:flex">
                    <p>© Brian Mburu 2024. All rights reserved.</p>
                    <ul className="flex flex-wrap items-center gap-4 mt-6 sm:text-sm sm:mt-0">
                        {
                            footerNavs.map((item, idx) => (
                                <li key={idx} className="text-custom-orange hover:text-gray-500 duration-150">
                                    <a href={item.href}>
                                        {item.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
