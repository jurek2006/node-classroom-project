Node Classroom Project

# Założenia

## Etap I

Przechowywanie danych - kontaktów o osobach (mogą to być później uczestnicy ale także i prowadzący kursy):

- możliwością zapisywania (do JSON)
- wyświetlanie listy wszystkich kontaktów
- wyświetlanie szczegółów kontaktu
- dodawanie kontaktu
- edycja kontaktu
- usuwanie kontaktu

Bez wymyślnego stylowania - użycie Bootstrap 4. Do widoków ejs.

### Używane:

express, eslint, nodemon



# Realizacja - etap I

## 1. Utworzenie projektu, dodanie repozytorium na github, bardzo podstawowa route.

Dodałem jeszcze nodemon, express.

## 2. Zapisywanie danych kontaktów dodanych z formularza do pliku json.

Chcemy mieć możliwość zapisywania danych kontaktów do pliku JSON w folderze data.

### Dodanie ejs jako templating engine i ustawienie podstawowego widoku (i route) 

Dodaję ejs jako templating engine. Tworzę router w pliku definiującym routes (na razie wszystkie) /routes/routes.js Utworzenie routes /, /contact/list i /contact/add

### Dodanie 404

Dodanie middleware, kontrolera i widoku dla page not found 404.

### Dodanie kontrolera user

Dodanie kontrolera user a w nim metod obsługi dla routes /contact/list i /contact/add i widoków dla nich



