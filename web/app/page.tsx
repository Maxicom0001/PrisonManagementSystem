"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, Users, Briefcase, Settings } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useHeader } from "@/components/providers/header-title-provider"
import { useEffect } from "react"
import { PrisonersCounter, WorkersCounter, LastUpdateCounter, ActiveJobsCounter } from "../components/own/statistics"

export default function PrisonHomepage() {

  const { setHeader} = useHeader()

  useEffect(() => {
      setHeader([{title: "Home", href: "/"}])
  },[])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <motion.div
      className="w-full max-w-7xl p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="text-3xl font-bold tracking-tight mb-8" variants={itemVariants}>
        Prison Management Center
      </motion.h1>
  
      {/* Prison description and layout section */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" variants={itemVariants}>
        <div className="space-y-4">
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            About Our Prison
          </motion.h2>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            Our prison is a modern correctional facility designed in accordance with the highest standards of
            security and rehabilitation. We have 200 cells, a sports complex, vocational workshops, and a medical
            center. Our goal is not only to ensure public safety but also effective rehabilitation of inmates.
          </motion.p>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            The facility was opened in 2010 and has since undergone several upgrades to meet evolving safety
            requirements and inmate care standards.
          </motion.p>
        </div>
        <motion.div
          className="bg-muted rounded-lg overflow-hidden h-[300px] relative"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src="/placeholder.svg?height=600&width=800" alt="Prison layout" fill className="object-cover w-full" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <p className="text-white font-medium text-lg">Prison Layout</p>
          </div>
        </motion.div>
      </motion.div>
  
      {/* Navigation tiles */}
      <motion.h2 className="text-2xl font-semibold mb-6" variants={itemVariants}>
        Manage the Prison
      </motion.h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={cardContainerVariants}>
        <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
          <Link href="/prisoners" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-slate-700" />
                <CardTitle>Prisoners</CardTitle>
                <CardDescription>Manage inmates, their profiles and status</CardDescription>
              </CardHeader>
              <CardFooter>
                <PrisonersCounter />
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
  
        <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
          <Link href="/workers" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <Building2 className="h-8 w-8 mb-2 text-slate-700" />
                <CardTitle>Staff</CardTitle>
                <CardDescription>Manage personnel, schedules and permissions</CardDescription>
              </CardHeader>
              <CardFooter>
                <WorkersCounter />
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
  
        <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
          <Link href="/jobs" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <Briefcase className="h-8 w-8 mb-2 text-slate-700" />
                <CardTitle>Jobs</CardTitle>
                <CardDescription>Assign tasks and monitor rehabilitation programs</CardDescription>
              </CardHeader>
              <CardFooter>
                <ActiveJobsCounter />
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
  
        <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
          <Link href="/manage" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <Settings className="h-8 w-8 mb-2 text-slate-700" />
                <CardTitle>Administration</CardTitle>
                <CardDescription>Settings, reports and system administration</CardDescription>
              </CardHeader>
              <CardFooter>
                <LastUpdateCounter />
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}  

