"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { Variants, Easing } from "framer-motion"

// Force the easing array to the proper type
const easingValue = [0, 0, 0.2, 1] as unknown as Easing

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easingValue },
  },
}

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.4, ease: easingValue },
  },
}

export function CallToAction() {
  return (
    <motion.section
      className="w-full py-16 px-6 md:px-10 bg-[#4f46e5] text-white text-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to change your life?
        </h2>
        <p className="text-lg mb-8">
          The next application cycle is now open. Take the first step toward
          your dream career.
        </p>
        <motion.div variants={buttonVariants}>
          <Link href="/auth/signup" passHref>
            <Button className="bg-white hover:bg-[#f3f4f6] text-[#4f46e5] px-8 py-3 rounded-md text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105">
              Apply Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
