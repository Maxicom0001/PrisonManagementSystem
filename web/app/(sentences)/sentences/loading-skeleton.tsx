import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function SentencesSkeleton() {
  return (
    <div className="container max-w-7xl mx-auto p-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(4)].map((_, i) => (
          <motion.div key={i} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
            <Card className="overflow-hidden h-full border-border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">
                      <div className="h-6 bg-muted animate-pulse rounded w-3/4 mb-2"></div>
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted animate-pulse rounded w-16"></div>
                    <div className="h-6 bg-muted animate-pulse rounded w-16"></div>
                  </div>
                </div>
                <CardDescription>
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded w-full"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-4/6"></div>
                </div>
                <div className="mt-3 text-sm">
                  <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}