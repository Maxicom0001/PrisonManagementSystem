"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Building, Gavel, ArrowRight, Calendar, AlertCircle } from "lucide-react"
import { useHeader } from "@/components/providers/header-title-provider"
import { useEffect } from "react"
// Mock data - in a real app this would come from an API
const prisonData = {
  prisoners: {
    total: 1248,
    newest: {
      id: "P-7821",
      name: "John Doe",
      date: "2023-04-01",
    },
    nextRelease: {
      id: "P-5432",
      name: "Mike Johnson",
      date: "2023-04-15",
    },
    oldest: {
      id: "P-1122",
      name: "Robert Smith",
      years: 18,
      admissionDate: "2005-06-12",
    },
  },
  workers: {
    current: 87,
    total: 102,
    jobs: 24,
  },
  prison: {
    availableCells: 42,
    totalCells: 1300,
    buildings: 8,
    cellBlocks: 12,
  },
  sentences: {
    longest: {
      id: "P-1234",
      years: 25,
      crime: "Armed Robbery",
    },
    shortest: {
      id: "P-9876",
      years: 0.5,
      crime: "Petty Theft",
    },
    newest: {
      id: "P-7821",
      years: 4,
      crime: "Fraud",
    },
    totalActive: 1248,
    completed: 3567,
    pendingAppeal: 42,
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Dashboard() {
    const { setTitle } = useHeader()
    
    useEffect(() => {
        setTitle("Dashboard")
    },[])

  return (
    <div className="container mx-auto max-w-7xl md:p-5 sm:p-7">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Prison Management Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of prison statistics, inmates, and personnel</p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Prisoners Tile */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full overflow-hidden flex flex-col p-0">
            <CardHeader className="bg-red-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Users className="h-5 w-5" />
                Prisoners
              </CardTitle>
              <CardDescription>Inmate statistics and information</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <span className="text-muted-foreground text-sm">Total Inmates</span>
                  <motion.span
                    className="text-3xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {prisonData.prisoners.total}
                  </motion.span>
                  <div className="mt-2 flex items-center text-xs text-muted-foreground">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>
                      Facility at {Math.round((prisonData.prisoners.total / prisonData.prison.totalCells) * 100)}%
                      capacity
                    </span>
                  </div>
                </div>

                <div className="flex flex-col p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <span className="text-muted-foreground text-sm">Longest Stay</span>
                  <span className="font-medium">{prisonData.prisoners.oldest.name}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                      {prisonData.prisoners.oldest.years} years
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Since {new Date(prisonData.prisoners.oldest.admissionDate).getFullYear()}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    {prisonData.prisoners.oldest.id}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Newest Prisoner</span>
                  <span className="font-medium">{prisonData.prisoners.newest.name}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs text-muted-foreground">
                      {new Date(prisonData.prisoners.newest.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    {prisonData.prisoners.newest.id}
                  </Button>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-sm">Next Release</span>
                  <span className="font-medium">{prisonData.prisoners.nextRelease.name}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs text-muted-foreground">
                      {new Date(prisonData.prisoners.nextRelease.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    {prisonData.prisoners.nextRelease.id}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-red-500/5 py-2 mt-auto w-full px-4">
              <Button variant="ghost" size="sm" className="ml-auto text-red-600">
                View All Prisoners <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Workers Tile */}
        <motion.div variants={itemVariants}>
          <Card className="h-full overflow-hidden flex flex-col p-0">
            <CardHeader className="bg-blue-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Users className="h-5 w-5" />
                Workers
              </CardTitle>
              <CardDescription>Staff and employment data</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-4 flex-1">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Staff</span>
                  <motion.span
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {prisonData.workers.current}
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Staff</span>
                  <motion.span
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {prisonData.workers.total}
                  </motion.span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Available Jobs</span>
                  <motion.span
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {prisonData.workers.jobs}
                  </motion.span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-blue-500/5 py-2 mt-auto px-4">
              <Button variant="ghost" size="sm" className="ml-auto text-blue-600">
                Manage Staff <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Prison Tile */}
        <motion.div variants={itemVariants}>
          <Card className="h-full overflow-hidden flex flex-col p-0">
            <CardHeader className="bg-green-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Building className="h-5 w-5" />
                Prison
              </CardTitle>
              <CardDescription>Facility and infrastructure</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-4 flex-1">
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground text-sm">Available Cells</span>
                  <div className="flex items-end gap-2">
                    <motion.span
                      className="text-3xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {prisonData.prison.availableCells}
                    </motion.span>
                    <span className="text-muted-foreground text-sm">of {prisonData.prison.totalCells}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <motion.div
                      className="bg-green-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(prisonData.prison.availableCells / prisonData.prison.totalCells) * 100}%`,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-muted-foreground text-sm">Cell Blocks</span>
                  <div className="flex items-end gap-2">
                    <motion.span
                      className="text-3xl font-bold"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {prisonData.prison.cellBlocks}
                    </motion.span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <motion.div
                      className="bg-green-700 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-muted-foreground">Buildings</span>
                  <motion.div
                    className="flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {Array.from({ length: prisonData.prison.buildings }).map((_, i) => (
                      <div key={i} className="w-3 h-6 bg-green-200 rounded-sm first:rounded-l-md last:rounded-r-md" />
                    ))}
                  </motion.div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-green-500/5 py-2 mt-auto px-4">
              <Button variant="ghost" size="sm" className="ml-auto text-green-600">
                View Facilities <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Sentences Tile */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full overflow-hidden relative flex flex-col p-0">
            <CardHeader className="bg-amber-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <Gavel className="h-5 w-5" />
                Sentences
              </CardTitle>
              <CardDescription>Conviction and sentencing information</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-4 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-muted-foreground text-sm">Longest Sentence</span>
                  <span className="text-xl font-bold">{prisonData.sentences.longest.years} years</span>
                  <span className="text-sm text-muted-foreground mt-1">{prisonData.sentences.longest.crime}</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    {prisonData.sentences.longest.id}
                  </Button>
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="text-muted-foreground text-sm">Shortest Sentence</span>
                  <span className="text-xl font-bold">{prisonData.sentences.shortest.years} years</span>
                  <span className="text-sm text-muted-foreground mt-1">{prisonData.sentences.shortest.crime}</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    {prisonData.sentences.shortest.id}
                  </Button>
                </motion.div>
                <motion.div
                  className="flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-muted-foreground text-sm">Newest Sentence</span>
                  <span className="text-xl font-bold">{prisonData.sentences.newest.years} years</span>
                  <span className="text-sm text-muted-foreground mt-1">{prisonData.sentences.newest.crime}</span>
                  <Button variant="outline" size="sm" className="mt-2">
                    {prisonData.sentences.newest.id}
                  </Button>
                </motion.div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <span className="text-muted-foreground text-sm">Active</span>
                  <motion.span
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {prisonData.sentences.totalActive}
                  </motion.span>
                </div>
                <div className="flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <span className="text-muted-foreground text-sm">Completed</span>
                  <motion.span
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {prisonData.sentences.completed}
                  </motion.span>
                </div>
                <div className="flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                  <span className="text-muted-foreground text-sm">Appeals</span>
                  <motion.span
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {prisonData.sentences.pendingAppeal}
                  </motion.span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-amber-500/5 py-2 mt-auto w-full px-4">
              <Button variant="ghost" size="sm" className="ml-auto text-amber-600">
                View All Sentences <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Clock Tile */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full overflow-hidden flex flex-col p-0">
            <CardHeader className="bg-purple-500/10 pb-2 pt-4 px-4 m-0 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Clock className="h-5 w-5" />
                Schedule
              </CardTitle>
              <CardDescription>Today's prison schedule</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-4 flex-1">
              <div className="space-y-4">
                {[
                  { time: "06:00", activity: "Wake-up call", status: "Completed" },
                  { time: "07:00", activity: "Breakfast", status: "Completed" },
                  { time: "08:30", activity: "Work assignments", status: "In progress" },
                  { time: "12:00", activity: "Lunch", status: "Upcoming" },
                  { time: "17:00", activity: "Dinner", status: "Upcoming" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium w-12">{item.time}</div>
                      <div className="text-sm">{item.activity}</div>
                    </div>
                    <Badge
                      variant={
                        item.status === "Completed"
                          ? "outline"
                          : item.status === "In progress"
                            ? "secondary"
                            : "default"
                      }
                      className={
                        item.status === "Completed"
                          ? "text-muted-foreground"
                          : item.status === "In progress"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300"
                            : ""
                      }
                    >
                      {item.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-purple-500/5 py-2 mt-auto px-4">
              <Button variant="ghost" size="sm" className="ml-auto text-purple-600">
                Full Schedule <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
