import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Particles from 'react-tsparticles';

const WelcomeBanner = () => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
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
        {/* Animated Chat Bubble Logo */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 4,
            ease: "easeInOut"
          }}
          className="mx-auto mb-8 w-28 h-28"
        >
          <svg viewBox="0 0 24 24" className="text-blue-400">
            {/* Modern chat bubble with message lines */}
            <path 
              fill="currentColor" 
              d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-3 12H8v-2h8v2zm0-3H8V9h8v2zm0-3H8V6h8v2z"
            />
            {/* Optional: Add small decorative elements */}
            <path 
              fill="#a78bfa" 
              d="M8 6h8v1H8z" 
              className="opacity-80"
            />
            <path 
              fill="#a78bfa" 
              d="M8 9h8v1H8z" 
              className="opacity-60"
            />
            <path 
              fill="#a78bfa" 
              d="M8 12h8v1H8z" 
              className="opacity-40"
            />
          </svg>
        </motion.div>

        {/* Main Heading with Gradient */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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
        <div className="absolute left-0 right-0 -bottom-20 flex justify-center space-x-4">
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
              className="w-3 h-3 bg-blue-400 rounded-full"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeBanner;