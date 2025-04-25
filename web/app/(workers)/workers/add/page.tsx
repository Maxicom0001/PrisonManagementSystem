"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardFooter, CardDescription, CardTitle } from "@/components/ui/card"
import { UserCircle } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useHeader } from "@/components/providers/header-title-provider"
import { useEffect } from "react"
import { motion } from "framer-motion"

// Przykładowe dane dla wyroków i cel
const sentences = [
  { id: "1", description: "Wyrok #1 - 5 lat" },
  { id: "2", description: "Wyrok #2 - 10 lat" },
  { id: "3", description: "Wyrok #3 - 15 lat" },
  { id: "4", description: "Wyrok #4 - dożywocie" },
]

const cells = [
  { id: "A1", description: "Cela A1 - pojedyncza" },
  { id: "A2", description: "Cela A2 - pojedyncza" },
  { id: "B1", description: "Cela B1 - dwuosobowa" },
  { id: "B2", description: "Cela B2 - dwuosobowa" },
  { id: "C1", description: "Cela C1 - wieloosobowa" },
]

// Schemat walidacji formularza
const formSchema = z.object({
  firstName: z.string().min(2, { message: "Imię musi mieć co najmniej 2 znaki" }),
  lastName: z.string().min(2, { message: "Nazwisko musi mieć co najmniej 2 znaki" }),
  pesel: z
    .string()
    .length(11, { message: "PESEL musi mieć dokładnie 11 cyfr" })
    .regex(/^\d+$/, { message: "PESEL może zawierać tylko cyfry" }),
  pensja: z.number().min(0, { message: "Pensja musi być większa od 0" }),
  buildingId: z.string({ required_error: "Wybierz budynek" }),
  jobId: z.string({ required_error: "Wybierz prace" }),
})

type FormValues = z.infer<typeof formSchema>

export default function PrisonerForm() {

        const { setHeader } = useHeader();
    
        useEffect(() => {
            setHeader([{ title: "Add Prisoner", href: "/prisoners/add" }]);
        }, []);

    
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      pesel: "",
      pensja: 0,
      buildingId: "1",
      jobId: "1",
    },
  })

  const onSubmit = async (data: FormValues) => {
    // W rzeczywistej aplikacji tutaj byłoby wysłanie danych do API
    console.log("Dane więźnia:", data)
    toast.success("Dodano więźnia", {
      description: `${data.firstName} ${data.lastName} został dodany do systemu.`,
    })
    form.reset()
  }
  return (
    <motion.div
      className="w-full max-w-4xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
    >
    <Card className="mx-auto border-2 shadow-lg">
      <CardHeader className="flex flex-row items-center gap-6 border-b pb-6">
        <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-full overflow-hidden">
          <UserCircle className="w-28 h-28 text-gray-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            New Worker
          </h1>
          <p className="text-muted-foreground">Worker ID: 12345</p>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
              {/* Imię */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input placeholder="Wprowadź imię" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          {/* Nazwisko */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko</FormLabel>
                <FormControl>
                  <Input placeholder="Wprowadź nazwisko" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PESEL */}
          <FormField
            control={form.control}
            name="pesel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PESEL</FormLabel>
                <FormControl>
                  <Input placeholder="Wprowadź PESEL" maxLength={11} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ID wyroku */}
          <FormField
            control={form.control}
            name="jobId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Praca</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz wyrok" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sentences.map((sentence) => (
                      <SelectItem key={sentence.id} value={sentence.id}>
                        {sentence.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ID celi */}
          <FormField
            control={form.control}
            name="buildingId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID celi</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz celę" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cells.map((cell) => (
                      <SelectItem key={cell.id} value={cell.id}>
                        {cell.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        {/* PESEL */}
        <FormField
            control={form.control}
            name="pensja"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pensja</FormLabel>
                <FormControl>
                  <Input placeholder="Wprowadź pensje" maxLength={11} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
                Dodaj Pracownika
            </Button> 
          </div>
          </form>
        </Form> 
      </CardContent>
    </Card>
   </motion.div>
  )
}

