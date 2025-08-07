"use client" 

import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import type { Variants } from "framer-motion"

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 10 },
  },
}

export function AlumniTestimonials() {
  const testimonials = [
    {
      quote:
        "A2SV completely changed the trajectory of my career. The training is intense, but the opportunities are unparalleled. I'm now at my dream company, and I owe it all to A2SV.",
      avatar: "/images/avatar-abel.png",
      name: "Abel Tadesse",
      title: "Software Engineer, Google",
    },
    {
      quote:
        "The problem-solving skills I learned at A2SV are invaluable. The mentors push you to be your best, and you're surrounded by people who are just as passionate as you are.",
      avatar: "/images/avatar-bethlehem.png",
      name: "Bethlehem Tadesse",
      title: "Software Engineer, Amazon",
    },
    {
      quote:
        "A2SV is more than a bootcamp. It's a family that supports you long after you've graduated. The network you build here is for life.",
      avatar: "/images/avatar-caleb.png",
      name: "Caleb Alemayehu",
      title: "Software Engineer, Palantir",
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

  return (
    <section className="w-full py-16 px-6 md:px-10 bg-[#f9fafb]">
      <motion.div
        className="max-w-6xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#221f1f]">Hear from Our Alumni</h2>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start text-left transition-all duration-300"
          >
            <CardContent className="p-0 mb-6 text-lg text-[#4b5563]">&quot;{testimonial.quote}&quot;</CardContent>
            <div className="flex items-center gap-4 mt-auto">
              <Avatar className="h-10 w-10">
                <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                <AvatarFallback>
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-[#221f1f]">{testimonial.name}</p>
                <p className="text-sm text-[#6b7280]">{testimonial.title}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
