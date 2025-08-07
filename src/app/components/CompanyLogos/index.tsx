"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function CompanyLogos() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.section
      className="w-full py-12 bg-white flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div variants={itemVariants}>
        <Image
          src="/images/google-logo.svg"
          width={120}
          height={40}
          alt="Google Logo"
          className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Image
          src="/images/amazon-logo.svg"
          width={120}
          height={40}
          alt="Amazon Logo"
          className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
  <div className="h-10 w-[120px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
    <Image
      src="/images/bloomberg-logo.png"
      width={300}
      height={50}
      alt="Bloomberg Logo"
      className="object-contain"
    />
  </div>
</motion.div>
 <motion.div variants={itemVariants}>
  <div className="h-10 w-[120px] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
    <Image
      src="/images/palantir-logo.jpg"
      width={500}
      height={100}
      alt="Palantiir Logo"
      className="object-contain"
    />
  </div>
</motion.div>

    </motion.section>
  )
}
