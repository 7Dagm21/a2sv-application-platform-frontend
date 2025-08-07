"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

const textVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] as const },
  },
}

const imageVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] as const, delay: 0.2 },
  },
}

export function BuiltByEngineers() {
  return (
    <section className="w-full py-16 px-6 md:px-10 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="text-left"
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#221f1f] mb-4">
            Built by Engineers, for Engineers
          </h2>
          <p className="text-lg text-[#4b5563]">
            A2SV is not just a program; it&apos;s a community. We&apos;re on a mission to
            identify Africa&apos;s most brilliant minds and provide them with the resources,
            mentorship, and opportunities to solve humanity&apos;s greatest challenges.
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center md:justify-end"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Image
            src="/images/team-collaboration.jpg"
            width={600}
            height={400}
            alt="Team Collaboration"
            className="rounded-lg shadow-lg object-cover w-full h-auto max-w-md md:max-w-none"
          />
        </motion.div>
      </div>
    </section>
  )
}
