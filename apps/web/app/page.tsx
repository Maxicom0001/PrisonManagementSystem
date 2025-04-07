"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2, Users, Briefcase, Settings } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function PrisonHomepage() {
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
      className="w-full max-w-7xl mx-auto px-4 py-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 className="text-3xl font-bold tracking-tight mb-8" variants={itemVariants}>
        Centrum Zarządzania Więzieniem
      </motion.h1>

      {/* Prison description and layout section */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12" variants={itemVariants}>
        <div className="space-y-4">
          <motion.h2 className="text-2xl font-semibold" variants={itemVariants}>
            O naszym więzieniu
          </motion.h2>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            Nasze więzienie to nowoczesny obiekt penitencjarny zaprojektowany zgodnie z najwyższymi standardami
            bezpieczeństwa i rehabilitacji. Posiadamy 200 cel, kompleks sportowy, warsztaty szkoleniowe oraz centrum
            medyczne. Naszym celem jest nie tylko zapewnienie bezpieczeństwa społeczeństwu, ale również skuteczna
            resocjalizacja osadzonych.
          </motion.p>
          <motion.p className="text-muted-foreground" variants={itemVariants}>
            Obiekt został otwarty w 2010 roku i od tego czasu przeszedł kilka modernizacji, aby sprostać zmieniającym
            się wymogom bezpieczeństwa i standardom opieki nad osadzonymi.
          </motion.p>
        </div>
        <motion.div
          className="bg-muted rounded-lg overflow-hidden h-[300px] relative"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src="/placeholder.svg?height=600&width=800" alt="Plan więzienia" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <p className="text-white font-medium text-lg">Plan więzienia</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation tiles */}
      <motion.h2 className="text-2xl font-semibold mb-6" variants={itemVariants}>
        Zarządzaj więzieniem
      </motion.h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={cardContainerVariants}>
        <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
          <Link href="/prisoners" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-slate-700" />
                <CardTitle>Więźniowie</CardTitle>
                <CardDescription>Zarządzaj osadzonymi, ich profilami i statusem</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Liczba osadzonych: 156</p>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
          <Link href="/workers" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <Building2 className="h-8 w-8 mb-2 text-slate-700" />
                <CardTitle>Pracownicy</CardTitle>
                <CardDescription>Zarządzaj personelem, harmonogramami i uprawnieniami</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Liczba pracowników: 78</p>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
          <Link href="/jobs" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <Briefcase className="h-8 w-8 mb-2 text-slate-700" />
                <CardTitle>Prace</CardTitle>
                <CardDescription>Przydzielaj zadania i monitoruj programy resocjalizacyjne</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Aktywne programy: 12</p>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={cardVariants} whileHover={{ y: -5 }}>
          <Link href="/manage" className="block h-full">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <Settings className="h-8 w-8 mb-2 text-slate-700" />
                <CardTitle>Zarządzanie</CardTitle>
                <CardDescription>Ustawienia, raporty i administracja systemem</CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Ostatnia aktualizacja: 2 dni temu</p>
              </CardFooter>
            </Card>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

