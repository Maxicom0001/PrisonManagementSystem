"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useHeader } from "@/components/providers/header-title-provider"
import { useEffect } from "react"

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
  middleName: z.string().optional(),
  mothersMaidenName: z.string().min(2, { message: "Nazwisko panieńskie matki musi mieć co najmniej 2 znaki" }),
  pesel: z
    .string()
    .length(11, { message: "PESEL musi mieć dokładnie 11 cyfr" })
    .regex(/^\d+$/, { message: "PESEL może zawierać tylko cyfry" }),
  birthplace: z.string().min(2, { message: "Miejsce urodzenia musi mieć co najmniej 2 znaki" }),
  incarcerationDate: z.date({ required_error: "Data osadzenia jest wymagana" }),
  sentenceId: z.string({ required_error: "Wybierz wyrok" }),
  cellId: z.string({ required_error: "Wybierz celę" }),
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
      middleName: "",
      mothersMaidenName: "",
      pesel: "",
      birthplace: "",
      incarcerationDate: new Date(),
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
    <div className="flex flex-col space-y-4 max-w-7xl w-full p-6">
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Drugie imię */}
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drugie imię</FormLabel>
                <FormControl>
                  <Input placeholder="Wprowadź drugie imię (opcjonalnie)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nazwisko panieńskie matki */}
          <FormField
            control={form.control}
            name="mothersMaidenName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko panieńskie matki</FormLabel>
                <FormControl>
                  <Input placeholder="Wprowadź nazwisko panieńskie matki" {...field} />
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

          {/* Miejsce urodzenia */}
          <FormField
            control={form.control}
            name="birthplace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miejsce urodzenia</FormLabel>
                <FormControl>
                  <Input placeholder="Wprowadź miejsce urodzenia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Data osadzenia */}
          <FormField
            control={form.control}
            name="incarcerationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data osadzenia</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "dd MMMM yyyy", { locale: pl }) : <span>Wybierz datę</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ID wyroku */}
          <FormField
            control={form.control}
            name="sentenceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID wyroku</FormLabel>
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
            name="cellId"
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
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Dodaj więźnia
        </Button>
      </form>
    </Form>
    </div>
  )
}

