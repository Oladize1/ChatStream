import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Particles from 'react-tsparticles';

const WelcomeBanner = () => {
  return (
    <div className="relative flex justify-center items-center  h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Animated Particles Background */}
      <Particles
        options={{
          particles: {
            number: { value: 80 },
            size: { value: 3 },
            move: { 
              enable: true,
              speed: 2,
              outModes: 'bounce'
            },
            links: {
              enable: true,
              distance: 150,
              color: '#818cf8',
              opacity: 0.4,
              width: 1
            }
          }
        }}
        className="absolute inset-0 z-0"
      />

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center px-4"
      >
        {/* Animated Chat Bubble Icon */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 4
          }}
          className="mx-auto mb-8 w-24 h-24 text-purple-400"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 24 24" 
            className="w-full h-full"
          >
            <path d="M20 2H4C2.897 2 2 2.897 2 4v20l4-4h14c1.103 0 2-0.897 2-2V4C22 2.897 21.103 2 20 2zM20 16H5.172L4 17.172V4h16v12z"/>
          </svg>
        </motion.div>

        {/* Main Heading with Gradient */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            ChatStream
          </span>
        </h1>

        {/* Typing Animation Subtitle */}
        <div className="text-xl md:text-2xl text-gray-300 h-12 mb-8">
          <TypeAnimation
            sequence={[
              'Real-time messaging',
              1000,
              'Secure conversations',
              1000,
              'Built for speed',
              1000,
              'Welcome!',
              2000
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
          />
        </div>

        {/* Floating Dots Animation */}
        <div className="absolute left-0 right-0 flex justify-center space-x-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -15, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-3 h-3 bg-purple-400 rounded-full"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeBanner;
