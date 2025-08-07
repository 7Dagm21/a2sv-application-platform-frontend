"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, type Variants } from "framer-motion"
import Link from "next/link"

// Define your transition object separately
const textTransition = { duration: 0.8, ease: [0, 0, 0.2, 1] } as const

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: textTransition,
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, delay: 0.6, ease: [0, 0, 0.2, 1] },
  },
}

const HeroSection = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center text-white overflow-hidden pt-[68px]">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ y: 0 }}
        animate={{ y: "-10%" }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "linear" }}
      >
        <Image 
          src="/images/herosection_banner.png" 
          alt="Hero Background" 
          fill 
          sizes="100vw"
          style={{ objectFit: "cover" }}
          quality={100}
        />
      </motion.div>
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="relative z-20 text-left max-w-4xl px-6 md:px-10">
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl font-bold leading-tight mb-4 drop-shadow-lg"
        >
          Forge Your Future in Tech
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, ...textTransition }}
          className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md"
        >
          Join an elite community of Africa&apos;s brightest minds, and get fast-tracked to a software engineering
          career at the world&apos;s leading tech companies.
        </motion.p>
        <motion.div variants={buttonVariants} initial="hidden" animate="visible">
          <Link href="/auth/signup" passHref>
            <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-8 py-3 rounded-md text-lg shadow-lg transition-all duration-300 hover:scale-105">
              Start Your Application
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
