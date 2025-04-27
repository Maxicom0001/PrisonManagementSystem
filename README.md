# 🏛️Prison Management System

Prison Management System is a comprehensive software solution designed to streamline the management of prison
facilities, inmate records, staff activities, and security operations. It enables efficient data handling, enhances
transparency, and improves overall institutional workflow.

## 🛠️Technologies Used

* **Next.js** – A React framework for building full-stack applications with server-side rendering and API routes.

* **Tailwind CSS** – A utility-first CSS framework for fast and responsive UI styling.

* **ShadCN/UI** – A collection of pre-built, customizable UI components built on Tailwind CSS.

* **TanStack Query** – A powerful tool for managing asynchronous data fetching, caching, and synchronization.

* **Zod** – A TypeScript-first schema validation library for safely validating form and API data.

* **Framer Motion** – A motion library for creating smooth animations and interactive UI elements in React.

* **MySQL** – A relational database used to store and manage application data.

* **Next.js** Server Actions – A new feature for securely handling server-side logic without the need for separate API
  routes.

## 🖥Installation

* **Install with npm**

```bash
  npm install 
  npm run dev
```

## 👤Authors

- [@Jakub Batko](https://github.com/Nasakrator) -
- [@Mateusz Lis](https://github.com/Maxicom0001) -
- [@Bartłomiej Szymczyk](https://github.com/GunterJP) -
- [@Dawid Szymczyk](https://github.com/Crime420)-
- [@Aleksander Węglarz](https://github.com/kmcls)
- [@Dominik Zawisza](https://github.com/Dominanima)
- @Jan Żaba
- @Maria Sowula

## Documentation

### 👤 Osadzeni (`/CONVICTS`)

| Pole                      | Typ     | Uwagi                                 | Endpoint                      | Metoda |
|---------------------------|---------|---------------------------------------|-------------------------------|--------|
| ID                        | INT     | Primary Key, Auto Increment, Not Null | `/CONVICTS`                   | GET    |
| Imie                      | Text    |                                       | `/CONVICTS/{CONVICT_ID}`      | GET    |
| Nazwisko                  | Text    |                                       | `/CONVICTS`                   | POST   |
| Drugie_imie               | Text    |                                       | `/CONVICTS/{CONVICT_ID}`      | DELETE |
| Nazwisko_panienskie_matki | Text    |                                       | `/CONVICTS/{CONVICT_ID}`      | PATCH  |
| Pesel                     | INT(11) |                                       | `/CONVICTS/{CONVICT_ID}/CELL` | PATCH  |
| Miejsce_urodzenia         | String  |                                       |                               |        |
| Data_osadzenia            | Date    |                                       |                               |        |
| ID_wyroku                 | INT     |                                       |                               |        |
| ID_celi                   | INT     |                                       |                               |        |

### ⚖️ Wyroki (`/SENTENCES`)

| Pole         | Typ  | Uwagi                                 | Endpoint                   | Metoda |
|--------------|------|---------------------------------------|----------------------------|--------|
| ID           | INT  | Primary Key, Auto Increment, Not Null | `/SENTENCES`               | GET    |
| Czas_trwania | INT  |                                       | `/SENTENCES/{SENTENCE_ID}` | GET    |
| Powod        | Text |                                       | `/SENTENCES`               | POST   |
| ID_status    | INT  |                                       | `/SENTENCES/{SENTENCE_ID}` | PATCH  |
| ID_grupy     | INT  |                                       | `/SENTENCES/{SENTENCE_ID}` | DELETE |
|              |      |                                       | `/SENTENCES/{SENTENCE_ID}` | PATCH  |

### 🏢 Cele (`/CELLS`)

| Pole       | Typ | Uwagi                                 | Endpoint                        | Metoda |
|------------|-----|---------------------------------------|---------------------------------|--------|
| ID         | INT | Primary Key, Auto Increment, Not Null | `/CELLS`                        | POST   |
| Pojemnosc  | INT |                                       | `/CELLS/{CELL_ID}`              | PATCH  |
| ID_budynku | INT |                                       | `/CELLS/{CELL_ID}`              | DELETE |
| ID_Rodzaj  | INT |                                       | `/CELLS/{CELL_ID}`              | GET    |
|            |     |                                       | `/CELLS/{CELL_ID}/AVAILABILITY` | GET    |
|            |     |                                       | `/CELLS/{CELL_ID}/CONVICTS`     | GET    |
|            |     |                                       | `/CELLS`                        | GET    |

### 👥 Grupy (`/GROUPS`)

| Pole            | Typ  | Uwagi                                 | Endpoint                      | Metoda |
|-----------------|------|---------------------------------------|-------------------------------|--------|
| ID              | INT  | Primary Key, Auto Increment, Not Null | `/GROUPS/{GROUP_ID}`          | GET    |
| Nazwa_grupy     | Text |                                       | `/GROUPS`                     | POST   |
| ID_Ograniczenia | INT  | Primary Key, Auto Increment, Not Null | `/GROUPS/{GROUP_ID}`          | PATCH  |
|                 |      |                                       | `/GROUPS/{GROUP_ID}`          | DELETE |
|                 |      |                                       | `/GROUPS/{GROUP_ID}/CONVICTS` | GET    |
|                 |      |                                       | `/GROUPS`                     | GET    |

### 🏛️ Budynki (`/EDIFICES`)

| Pole    | Typ    | Uwagi                                 | Endpoint                         | Metoda |
|---------|--------|---------------------------------------|----------------------------------|--------|
| ID      | INT    | Primary Key, Auto Increment, Not Null | `/EDIFICES`                      | POST   |
| Adres   | String |                                       | `/EDIFICES/{EDIFICE_ID}`         | PATCH  |
| Funkcja | String |                                       | `/EDIFICES/{EDIFICE_ID}`         | DELETE |
|         |        |                                       | `/EDIFICES/{EDIFICE_ID}`         | GET    |
|         |        |                                       | `/EDIFICES/{EDIFICE_ID}/WORKERS` | GET    |
|         |        |                                       | `/EDIFICES`                      | GET    |

### 👮 Pracownicy (`/WORKERS`)

| Pole       | Typ     | Uwagi                                 | Endpoint               | Metoda |
|------------|---------|---------------------------------------|------------------------|--------|
| ID         | INT     | Primary Key, Auto Increment, Not Null | `/WORKERS`             | POST   |
| ID_zadania | INT     |                                       | `/WORKERS/{WORKER_ID}` | PATCH  |
| Imie       | String  |                                       | `/WORKERS/{WORKER_ID}` | DELETE |
| Nazwisko   | String  |                                       | `/WORKERS`             | GET    |
| Pesel      | INT(11) |                                       | `/WORKERS/{WORKER_ID}` | GET    |
| Pensja     | INT     |                                       |                        |        |
| ID_budynku | INT     |                                       |                        |        |

### 🟢 Statusy (`/STATUS`)

| Pole  | Typ    | Uwagi                                 | Endpoint              | Metoda |
|-------|--------|---------------------------------------|-----------------------|--------|
| ID    | INT    | Primary Key, Auto Increment, Not Null | `/STATUS`             | POST   |
| Nazwa | String |                                       | `/STATUS/{STATUS_ID}` | PATCH  |
|       |        |                                       | `/STATUS/{STATUS_ID}` | DELETE |
|       |        |                                       | `/STATUS/{STATUS_ID}` | GET    |

### 🚪 Rodzaje Cel (`/CELL TYPE`)

| Pole  | Typ    | Uwagi                                 | Endpoint               | Metoda |
|-------|--------|---------------------------------------|------------------------|--------|
| ID    | INT    | Primary Key, Auto Increment, Not Null | `/CELL TYPE`           | POST   |
| Nazwa | String |                                       | `/CELL_TYPE/{TYPE_ID}` | PATCH  |
|       |        |                                       | `/CELL_TYPE/{TYPE_ID}` | DELETE |
|       |        |                                       | `/CELL_TYPE/{TYPE_ID}` | GET    |

### 🚫 Ograniczenia (`/CONSTRAINTS`)

| Pole  | Typ    | Uwagi                                 | Endpoint                       | Metoda |
|-------|--------|---------------------------------------|--------------------------------|--------|
| ID    | INT    | Primary Key, Auto Increment, Not Null | `/CONSTRAINTS`                 | POST   |
| Nazwa | String |                                       | `/CONSTRAINTS/{CONSTRAINT_ID}` | PATCH  |
|       |        |                                       | `/CONSTRAINTS/{CONSTRAINT_ID}` | DELETE |
|       |        |                                       | `/CONSTRAINTS/{CONSTRAINT_ID}` | GET    |

### 🛠️ Zadania (`/JOB`)

| Pole  | Typ    | Uwagi                                 | Endpoint        | Metoda |
|-------|--------|---------------------------------------|-----------------|--------|
| ID    | INT    | Primary Key, Auto Increment, Not Null | `/JOB`          | POST   |
| Nazwa | String |                                       | `/JOB/{JOB_ID}` | PATCH  |
|       |        |                                       | `/JOB/{JOB_ID}` | DELETE |
|       |        |                                       | `/JOB/{JOB_ID}` | GET    |
