"use client" 

import { Plus, Clock, Target, Star } from "lucide-react"
import { motion } from "framer-motion" 
import type { Variants } from "framer-motion"

export function JourneySection() {
  const phases = [
    {
      icon: Plus,
      title: "Phase 1: Foundations",
      description:
        "Master data structures, algorithms, and problem-solving techniques in an intensive 3-month bootcamp.",
    },
    {
      icon: Clock,
      title: "Phase 2: Real-world Projects",
      description:
        "Apply your skills to build complex projects, collaborate in teams, and prepare for technical interviews.",
    },
    {
      icon: Target,
      title: "Phase 3: Internship Placement",
      description: "We help you secure internships at top global tech companies to gain invaluable experience.",
    },
    {
      icon: Star,
      title: "Phase 4: Full-Time Conversion",
      description: "Excel in your internship and convert it into a full-time offer, launching your global career.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring" as const,  // ensures "spring" is a literal type
        stiffness: 100, 
        damping: 10 
      },
    },
  }

  return (
    <section className="w-full py-16 px-6 md:px-10 bg-[#f9fafb]">
      <motion.div
        className="max-w-6xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#221f1f] mb-4">Your Journey to Silicon Valley</h2>
        <p className="text-lg text-[#4b5563]">A proven path from learning to leadership.</p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div className="bg-[#4f46e5] text-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
              <phase.icon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-[#221f1f] mb-2">{phase.title}</h3>
            <p className="text-[#4b5563]">{phase.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
