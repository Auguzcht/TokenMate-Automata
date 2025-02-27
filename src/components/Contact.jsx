import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiMapPin } from 'react-icons/fi';

// Import profile images
import alfredProfile from '@/assets/Alfred-Picture.jpg';
import joshuaProfile from '@/assets/Joshua-Picture.jpg';
import hannaProfile from '@/assets/Hanna-Picture.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Update authors array
  const authors = [
    {
      name: "Alfred Nodado",
      role: "Full-Stack Developer",
      linkedin: "https://www.linkedin.com/in/alfred-nodado-b24647251",
      image: alfredProfile
    },
    {
      name: "Joshua Famor",
      role: "Model Architect",
      linkedin: "https://www.linkedin.com/in/joshua-famor-069a94254/",
      image: joshuaProfile
    },
    {
      name: "Hanna Sato",
      role: "Researcher",
      linkedin: "https://www.linkedin.com/in/hanna-keziah-sato-1811162b5",
      image: hannaProfile
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: '// your access key here //',
          ...formData
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // First, add these variants at the top of your component
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.02,
      boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      boxShadow: '0 0 10px rgba(236, 72, 153, 0.2)',
      transition: { duration: 0.1 }
    }
  };

  const iconVariants = {
    idle: { x: 0 },
    hover: {
      x: [0, 5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    loading: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-20 overflow-hidden">
      {/* Updated mesh gradient animation - horizontal movement */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{ 
            background: [
              'radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%), radial-gradient(at 100% 50%, rgba(236, 72, 153, 0) 0%, transparent 70%)',
              'radial-gradient(at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 70%), radial-gradient(at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
              'radial-gradient(at 100% 50%, rgba(139, 92, 246, 0) 0%, transparent 70%), radial-gradient(at 0% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 70%)'
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
        
        {/* Enhanced noise overlay */}
        <div 
          className="absolute inset-0 opacity-15 animate-grain"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'soft-light'
          }}
        />
        
        {/* Updated gradient overlays for seamless footer transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-transparent to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] via-transparent to-[#0D1117] opacity-90" />
        
        {/* Add bottom fade for smooth footer transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0D1117]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Title */}
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]">
              Get in Touch
            </span>
          </motion.h2>

          {/* Authors Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {authors.map((author, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="backdrop-blur-xl bg-[#1A1F2B]/70 p-6 rounded-2xl border border-[#EC4899]/20 
                         hover:border-[#EC4899]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="relative w-20 h-20 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        background: [
                          'linear-gradient(0deg, #8B5CF6, #EC4899)',
                          'linear-gradient(180deg, #EC4899, #8B5CF6)',
                          'linear-gradient(360deg, #8B5CF6, #EC4899)'
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Profile Image Container */}
                    <motion.div
                      className="absolute inset-[2px] rounded-full overflow-hidden bg-[#1A1F2B]"
                    >
                      <img
                        src={author.image}
                        alt={author.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </motion.div>
                  </motion.div>
            
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{author.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{author.role}</p>
                    <motion.a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#EC4899] hover:text-[#8B5CF6] transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <FiLinkedin className="text-lg group-hover:scale-110 transition-transform" />
                      <span>Connect on LinkedIn</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-xl bg-[#1A1F2B]/70 p-8 rounded-2xl border border-[#EC4899]/20"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
                
                {/* Google Maps Panel */}
                <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-[#EC4899]/20 group">
                  <div className="absolute inset-0 z-10 pointer-events-none border border-[#EC4899]/20 rounded-xl 
                                  group-hover:border-[#EC4899]/50 transition-colors duration-300" />
                  <iframe
                    src="https://www.google.com/maps/embed/v1/place?key='// your access key here //'&q=7.063147997693241,125.59601687835966&zoom=17"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgraded"
                    className="grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  ></iframe>
                </div>
              
                <div className="flex items-center gap-3 text-gray-300">
                  <FiMapPin className="text-[#EC4899]" />
                  <span>Gen. Douglas MacArthur Hwy, Talomo, Davao City, Davao del Sur, Philippines, 8000</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 pt-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0D1117]/50 border border-[#EC4899]/20 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#EC4899]/50"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0D1117]/50 border border-[#EC4899]/20 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#EC4899]/50"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 bg-[#0D1117]/50 border border-[#EC4899]/20 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-[#EC4899]/50
                             resize-none"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isSubmitting}
                  className="mt-4 w-full group relative inline-flex items-center justify-center px-8 py-3 
                           rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-70"
                >
                  {/* Gradient Background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6] to-[#8B5CF6]"
                    initial={{ backgroundPosition: '0% 50%' }}
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop"
                    }}
                    style={{
                      backgroundSize: '300% 300%'
                    }}
                  />
                  
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-2 text-white font-medium">
                    <span>
                      {isSubmitting ? 'Sending...' : 
                       submitStatus === 'success' ? 'Message Sent!' : 
                       submitStatus === 'error' ? 'Try Again' : 
                       'Send Message'}
                    </span>

                    <motion.div
                      variants={iconVariants}
                      initial="idle"
                      animate={isSubmitting ? "loading" : "idle"}
                      whileHover={!isSubmitting ? "hover" : undefined}
                      className="flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <motion.div 
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      ) : submitStatus === 'success' ? (
                        <motion.svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <path d="M20 6L9 17L4 12" />
                        </motion.svg>
                      ) : submitStatus === 'error' ? (
                        <motion.svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </motion.svg>
                      ) : (
                        <FiSend className="text-lg group-hover:translate-x-1 transition-transform" />
                      )}
                    </motion.div>
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;