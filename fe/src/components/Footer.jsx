import { Facebook, Instagram, TwitterIcon, Youtube } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';


const Footer = () => {

  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Browse Books', link: '/books' },
    { name: 'Categories', link: '/categories' },
    { name: 'New Releases', link: '/new-releases' },
    { name: 'Bestsellers', link: '/bestsellers' },
    { name: 'Author', link: '/Author' },
  ];

  const supportLinks = [
    { name: 'Help Center', link: '/help' },
    { name: 'Contact Us', link: '/contact' },
    { name: 'Privacy Policy', link: '/privacy' },
    { name: 'Terms of Service', link: '/terms' },
    { name: 'Cookie Policy', link: '/cookies' },

  ];

  return (
    <footer className="bg-[#1a2332] text-[#b8c5d6] px-20 py-4 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Footer Top Section */}
        <div className="flex justify-between gap-20 mb-10">
          {/* Brand Section */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12  flex items-center justify-center">
                <img src="/BookLogo.png" alt="BookNest Logo" className='w-40 object-center' />
              </div>
              <h2 className="text-white text-2xl font-semibold">BookNest</h2>
            </div>
            <p className="text-[#b8c5d6] leading-relaxed mb-8">
              Discover your next favorite read with our curated collection of books from around the world. Join millions of readers on their literary journey.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#243447] rounded-lg flex items-center justify-center hover:bg-[#2d4058] transition-colors">
               <TwitterIcon/>
              </a>
              <a href="#" className="w-10 h-10 bg-[#243447] rounded-lg flex items-center justify-center hover:bg-[#2d4058] transition-colors">
                <Facebook/>
              </a>
              <a href="#" className="w-10 h-10 bg-[#243447] rounded-lg flex items-center justify-center hover:bg-[#2d4058] transition-colors">
                <Instagram/>
              </a>
              <a href="#" className="w-10 h-10 bg-[#243447] rounded-lg flex items-center justify-center hover:bg-[#2d4058] transition-colors">
                <Youtube/>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-shrink-0">
            <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
             {quickLinks.map((item) => (
                <li key={item.name} className='transition-colors duration-200 cursor-pointer ease-in-out hover:text-white' onClick={() => navigate(item.link)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex-shrink-0">
            <h3 className="text-white text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">

              {supportLinks.map((item) => (
                <li key={item.name} className='transition-colors duration-200 cursor-pointer ease-in-out hover:text-white' onClick={() => navigate(item.link)}>
                  {item.name}
                </li>
              ))}
              
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#2d3d52] pt-8 flex items-center justify-between">
          <p className="text-[#8b9aaf]">© 2024 Skylit Books. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-[#8b9aaf] mr-2">Available on:</span>
            <a href="#" className="text-[#8b9aaf] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </a>
            <a href="#" className="text-[#8b9aaf] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.523 15.3414c-.5511-.0535-.3588-.4073-.3588-.4073s.7634-.9042-.1417-1.6954c-1.0027-.8833-1.8062.2313-1.8062.2313s-.4064.4485-.1485-.0479c.1456-.2796.3612-.8158-.3685-1.3818-1.3263-.9974-2.4896.7346-2.5335.8312-.0439.0965-.2134 1.0218-.2134 1.0218s-.1477.3694-.3685-.0479c-.0611-.1159-.3072-.5808-.4191-.7582-.5011-.7931-1.5645-.9296-1.9062-.6562-1.1445.9154.2797 2.4491.2797 2.4491s.2642.2922 0 .4885c-.2642.1963-1.5796.4885-1.3154 2.1419.2642 1.6534 1.5796 1.6534 1.5796 1.6534s.4412.0981 1.0569 0c.6157-.0981 1.5796-.4885 1.5796-.4885s1.5796-.5866 2.5365-.2943c.9569.2923 1.3154.2923 1.3154.2923s1.7646.5866 2.4291 0c.6645-.5866.6645-1.8493.6645-1.8493s.0439-.7827-.6645-1.3693c-.7084-.5866-.9708-.8789-.9708-.8789s-.3588-.0981.0439-.4885c.4027-.3904.9708-.6827.9708-.6827s.8788-.4885.4027-1.3693c-.476-.8808-1.7646-.2942-1.7646-.2942s-.4412.1962-.2205-.0981c.2207-.2942.7084-.7827.2207-1.3693-.4877-.5866-1.4515-.0981-1.4515-.0981s-.5289.2923-.2642-.0981c.2647-.3904.8788-.7827.6645-1.3693-.2143-.5866-1.0569-.4885-1.0569-.4885s-.9708.0981-1.0569.5866c-.0861.4885.2642.7827.2642.7827s.4412.3904.1765.7827c-.2647.3923-.7084.4885-.7084.4885s-.9708.1962-1.0569-.5866c-.0861-.7828.7084-1.6536.7084-1.6536s.9708-.9789 2.2473-.7827c1.2765.1962 1.5412 1.1732 1.5412 1.1732s.4412 1.2713-.2642 2.0539c-.7054.7827-1.7646.4885-1.7646.4885s-.8788-.0981-.8788.4885.4412.7827.4412.7827.5289.1962 1.0569 0c.528-.1962 1.0569-.7827 1.0569-.7827s1.3154-.8808 2.2473-.0981c.9319.7827.5289 1.8493.5289 1.8493s-.2642.8789-.9708 1.1732z"/>
              </svg>
            </a>
            <a href="#" className="text-[#8b9aaf] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;