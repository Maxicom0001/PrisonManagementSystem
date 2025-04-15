"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, ChevronUp, Search, Edit, Trash2, Clock, Plus, ArrowUpDown, UserPlus } from "lucide-react"
import { format, differenceInDays, parseISO } from "date-fns"
import { pl } from "date-fns/locale"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

// Typy danych
interface Prisoner {
  id: number
  imie: string
  nazwisko: string
  drugieImie?: string
  nazwiskoPanienskieMatki?: string
  pesel: string
  miejsceUrodzenia: string
  dataOsadzenia: string
  wyrok: string
  powodWyroku: string
  cela: string
  notatki: string[]
}

// Funkcja do obliczania długości wyroku w dniach
const calculateSentenceDays = (sentence: string): number => {
  const match = sentence.match(/(\d+)\s+(lat|lata|rok|miesięcy|miesiące|miesiąc)/)
  if (!match) return 365 // domyślnie 1 rok

  const value = Number.parseInt(match[1])
  const unit = match[2]

  if (unit.includes("lat") || unit.includes("rok")) {
    return value * 365
  } else if (unit.includes("miesi")) {
    return value * 30
  }

  return 365 // domyślnie 1 rok
}

// Funkcja do obliczania pozostałych dni
const calculateRemainingDays = (incarceration: string, sentenceDays: number): number => {
  const incarcerationDate = parseISO(incarceration)
  const releaseDate = addDays(incarcerationDate, sentenceDays)
  const today = new Date()

  return Math.max(0, differenceInDays(releaseDate, today))
}

// Funkcja pomocnicza do dodawania dni
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// Przykładowe dane
const mockPrisoners: Prisoner[] = [
  {
    id: 1,
    imie: "Jan",
    nazwisko: "Kowalski",
    drugieImie: "Piotr",
    nazwiskoPanienskieMatki: "Nowak",
    pesel: "80010112345",
    miejsceUrodzenia: "Warszawa",
    dataOsadzenia: "2022-05-15",
    wyrok: "5 lat",
    powodWyroku: "Oszustwo podatkowe",
    cela: "A-101",
    notatki: [
      "12.06.2022 - Dobre zachowanie, brak incydentów",
      "23.08.2022 - Uczestnictwo w programie resocjalizacyjnym",
      "05.11.2022 - Prośba o widzenie z rodziną",
      "17.01.2023 - Konflikt z współwięźniem, upomnienie",
      "28.03.2023 - Przeniesienie do innej celi",
    ],
  },
  {
    id: 2,
    imie: "Anna",
    nazwisko: "Wiśniewska",
    drugieImie: "Maria",
    nazwiskoPanienskieMatki: "Dąbrowska",
    pesel: "85020223456",
    miejsceUrodzenia: "Kraków",
    dataOsadzenia: "2021-11-20",
    wyrok: "3 lata",
    powodWyroku: "Kradzież z włamaniem",
    cela: "B-205",
    notatki: [
      "05.12.2021 - Problemy z adaptacją",
      "18.01.2022 - Rozpoczęcie terapii",
      "22.03.2022 - Poprawa zachowania",
      "14.06.2022 - Udział w warsztatach zawodowych",
      "30.09.2022 - Wniosek o przepustkę odrzucony",
    ],
  },
  {
    id: 3,
    imie: "Tomasz",
    nazwisko: "Nowak",
    drugieImie: "Adam",
    nazwiskoPanienskieMatki: "Kowalczyk",
    pesel: "75030334567",
    miejsceUrodzenia: "Poznań",
    dataOsadzenia: "2023-01-10",
    wyrok: "7 lat",
    powodWyroku: "Rozbój z użyciem niebezpiecznego narzędzia",
    cela: "A-105",
    notatki: [
      "25.01.2023 - Agresywne zachowanie",
      "12.02.2023 - Skierowanie na terapię kontroli złości",
      "05.04.2023 - Poprawa zachowania",
      "18.06.2023 - Udział w programie edukacyjnym",
      "22.08.2023 - Prośba o widzenie z adwokatem",
    ],
  },
  {
    id: 4,
    imie: "Katarzyna",
    nazwisko: "Lewandowska",
    drugieImie: "Ewa",
    nazwiskoPanienskieMatki: "Zielińska",
    pesel: "90040445678",
    miejsceUrodzenia: "Gdańsk",
    dataOsadzenia: "2022-08-05",
    wyrok: "2 lata",
    powodWyroku: "Posiadanie znacznej ilości narkotyków",
    cela: "C-301",
    notatki: [
      "15.08.2022 - Problemy zdrowotne, wizyta u lekarza",
      "27.09.2022 - Rozpoczęcie terapii uzależnień",
      "10.11.2022 - Pozytywna ocena terapeuty",
      "05.01.2023 - Udział w zajęciach artystycznych",
      "18.03.2023 - Wniosek o warunkowe zwolnienie w trakcie rozpatrywania",
    ],
  },
  {
    id: 5,
    imie: "Michał",
    nazwisko: "Wójcik",
    drugieImie: "Krzysztof",
    nazwiskoPanienskieMatki: "Kamińska",
    pesel: "82050556789",
    miejsceUrodzenia: "Wrocław",
    dataOsadzenia: "2021-06-30",
    wyrok: "4 lata",
    powodWyroku: "Oszustwo internetowe",
    cela: "B-210",
    notatki: [
      "10.07.2021 - Przydzielenie do pracy w bibliotece więziennej",
      "25.09.2021 - Pozytywna ocena pracy",
      "12.12.2021 - Udział w kursie informatycznym",
      "08.03.2022 - Konflikt z innym więźniem, upomnienie",
      "20.05.2022 - Powrót do pracy w bibliotece",
      "15.08.2022 - Wniosek o przepustkę zaakceptowany",
      "30.10.2022 - Powrót z przepustki zgodnie z planem",
      "12.01.2023 - Udział w programie resocjalizacyjnym",
      "25.03.2023 - Pozytywna ocena zachowania",
    ],
  },
]

// Komponent placeholdera tabeli podczas ładowania
const TableLoadingPlaceholder = () => {
  return (
    <div className="rounded-md border bg-background shadow flex-grow overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">
              <Skeleton className="h-4 w-10" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-24" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-32" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-6 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function PrisonerDatabase() {
  const [prisoners, setPrisoners] = useState<Prisoner[]>(mockPrisoners)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  // Symulacja ładowania danych
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Funkcja do ponownego załadowania danych
  const handleReload = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  // Filtrowanie więźniów na podstawie wyszukiwania
  const filteredPrisoners = prisoners.filter((prisoner) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      prisoner.id.toString().includes(searchTerm) ||
      prisoner.imie.toLowerCase().includes(searchLower) ||
      prisoner.nazwisko.toLowerCase().includes(searchLower) ||
      prisoner.dataOsadzenia.includes(searchTerm) ||
      prisoner.cela.toLowerCase().includes(searchLower)
    )
  })

  // Funkcja do formatowania daty
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: pl })
    } catch (error) {
      return dateString
    }
  }

  // Funkcja do obsługi dodawania nowego więźnia
  const handleAddPrisoner = () => {
    console.log("Dodawanie nowego więźnia")
    // Tutaj możesz dodać własną logikę dodawania więźnia
  }

  // Funkcja do obsługi edycji
  const handleEdit = (id: number) => {
    console.log(`Edytowanie więźnia o ID: ${id}`)
    // Tutaj można dodać logikę edycji
  }

  // Funkcja do obsługi usuwania
  const handleDelete = (id: number) => {
    console.log(`Usuwanie więźnia o ID: ${id}`)
    setPrisoners(prisoners.filter((prisoner) => prisoner.id !== id))
    setExpandedId(null)
  }

  // Funkcje do obsługi notatek
  const handleAddNote = (prisonerId: number) => {
    console.log(`Dodawanie nowej notatki dla więźnia o ID: ${prisonerId}`)
    // Tutaj można dodać logikę dodawania notatki
    const today = format(new Date(), "dd.MM.yyyy")
    const newNote = `${today} - Nowa notatka`

    setPrisoners(
      prisoners.map((prisoner) => {
        if (prisoner.id === prisonerId) {
          return {
            ...prisoner,
            notatki: [newNote, ...prisoner.notatki],
          }
        }
        return prisoner
      }),
    )
  }

  const handleEditNote = (prisonerId: number, noteIndex: number) => {
    console.log(`Edytowanie notatki ${noteIndex} dla więźnia o ID: ${prisonerId}`)
    // Tutaj można dodać logikę edycji notatki
  }

  const handleDeleteNote = (prisonerId: number, noteIndex: number) => {
    console.log(`Usuwanie notatki ${noteIndex} dla więźnia o ID: ${prisonerId}`)

    setPrisoners(
      prisoners.map((prisoner) => {
        if (prisoner.id === prisonerId) {
          const updatedNotes = [...prisoner.notatki]
          updatedNotes.splice(noteIndex, 1)
          return {
            ...prisoner,
            notatki: updatedNotes,
          }
        }
        return prisoner
      }),
    )
  }

  return (
    <div className="flex flex-col max-w-7xl w-full p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6 text-center">System Zarządzania Więźniami</h1>
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Wyszukaj więźnia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            disabled={loading}
          />
        </div>
        <Button onClick={handleAddPrisoner} disabled={loading}>
          <UserPlus className="h-4 w-4 mr-2" />
          Dodaj więźnia
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TableLoadingPlaceholder />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="rounded-md border bg-background shadow flex-grow overflow-auto"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px] cursor-pointer">
                    <div className="flex items-center">
                      ID
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    <div className="flex items-center">
                      Imię
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    <div className="flex items-center">
                      Nazwisko
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    <div className="flex items-center">
                      Data osadzenia
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer">
                    <div className="flex items-center">
                      Cela
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrisoners.map((prisoner) => (
                  <React.Fragment key={prisoner.id}>
                    <TableRow
                      className={expandedId === prisoner.id ? "border-b-0 hover:bg-muted/50" : "hover:bg-muted/50"}
                    >
                      <TableCell>{prisoner.id}</TableCell>
                      <TableCell>{prisoner.imie}</TableCell>
                      <TableCell>{prisoner.nazwisko}</TableCell>
                      <TableCell>{formatDate(prisoner.dataOsadzenia)}</TableCell>
                      <TableCell>{prisoner.cela}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setExpandedId(expandedId === prisoner.id ? null : prisoner.id)}
                        >
                          {expandedId === prisoner.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    <AnimatePresence>
                      {expandedId === prisoner.id && (
                        <TableRow>
                          <TableCell colSpan={6} className="p-0">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-muted/50 p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Lewa kolumna - dane osobowe */}
                                  <div className="space-y-4 md:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm font-medium">Drugie imię:</p>
                                        <p>{prisoner.drugieImie || "-"}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Nazwisko panieńskie matki:</p>
                                        <p>{prisoner.nazwiskoPanienskieMatki || "-"}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">PESEL:</p>
                                        <p>{prisoner.pesel}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Miejsce urodzenia:</p>
                                        <p>{prisoner.miejsceUrodzenia}</p>
                                      </div>
                                    </div>

                                    {/* Informacje o wyroku */}
                                    <div className="space-y-2 mt-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm font-medium">Wyrok:</p>
                                          <p>{prisoner.wyrok}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium">Powód wyroku:</p>
                                          <p>{prisoner.powodWyroku}</p>
                                        </div>
                                      </div>

                                      {/* Pozostały czas odsiadki */}
                                      <div className="mt-4">
                                        <div className="flex items-center justify-between mb-1">
                                          <p className="text-sm font-medium">Pozostały czas odsiadki:</p>
                                          <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span className="text-sm">
                                              {calculateRemainingDays(
                                                prisoner.dataOsadzenia,
                                                calculateSentenceDays(prisoner.wyrok),
                                              )}{" "}
                                              dni
                                            </span>
                                          </div>
                                        </div>
                                        <Progress
                                          value={
                                            100 -
                                            (calculateRemainingDays(
                                              prisoner.dataOsadzenia,
                                              calculateSentenceDays(prisoner.wyrok),
                                            ) /
                                              calculateSentenceDays(prisoner.wyrok)) *
                                              100
                                          }
                                          className="h-2"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                          Odbyte: {differenceInDays(new Date(), new Date(prisoner.dataOsadzenia))} dni z{" "}
                                          {calculateSentenceDays(prisoner.wyrok)} dni
                                        </p>
                                      </div>
                                    </div>

                                    {/* Przyciski akcji */}
                                    <div className="flex justify-end space-x-2 mt-4">
                                      <Button variant="outline" size="sm" onClick={() => handleEdit(prisoner.id)}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edytuj
                                      </Button>
                                      <Button variant="destructive" size="sm" onClick={() => handleDelete(prisoner.id)}>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Usuń
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Prawa kolumna - notatki */}
                                  <div className="md:col-span-1">
                                    <Card>
                                      <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                          <CardTitle className="text-sm font-medium">Notatki</CardTitle>
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-6 w-6"
                                                  onClick={() => handleAddNote(prisoner.id)}
                                                >
                                                  <Plus className="h-4 w-4" />
                                                  <span className="sr-only">Dodaj notatkę</span>
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>Dodaj nową notatkę</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      </CardHeader>
                                      <CardContent className="p-0">
                                        <ScrollArea className="h-[200px] px-4 py-2">
                                          <ul className="space-y-2">
                                            {prisoner.notatki.map((notatka, index) => (
                                              <li key={index} className="text-sm border-b pb-2 last:border-0">
                                                <div className="flex items-start justify-between group">
                                                  <span className="flex-1">{notatka}</span>
                                                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <TooltipProvider>
                                                      <Tooltip>
                                                        <TooltipTrigger asChild>
                                                          <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => handleEditNote(prisoner.id, index)}
                                                          >
                                                            <Edit className="h-3 w-3" />
                                                            <span className="sr-only">Edytuj notatkę</span>
                                                          </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                          <p>Edytuj notatkę</p>
                                                        </TooltipContent>
                                                      </Tooltip>
                                                    </TooltipProvider>
                                                    <TooltipProvider>
                                                      <Tooltip>
                                                        <TooltipTrigger asChild>
                                                          <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-destructive hover:text-destructive"
                                                            onClick={() => handleDeleteNote(prisoner.id, index)}
                                                          >
                                                            <Trash2 className="h-3 w-3" />
                                                            <span className="sr-only">Usuń notatkę</span>
                                                          </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                          <p>Usuń notatkę</p>
                                                        </TooltipContent>
                                                      </Tooltip>
                                                    </TooltipProvider>
                                                  </div>
                                                </div>
                                              </li>
                                            ))}
                                          </ul>
                                        </ScrollArea>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </TableCell>
                        </TableRow>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
                {filteredPrisoners.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Nie znaleziono więźniów spełniających kryteria wyszukiwania
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
