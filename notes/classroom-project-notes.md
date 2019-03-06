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

express, eslint, nodemon, uuid, mocha + expect



# Realizacja - etap I

## 1. Utworzenie projektu, dodanie repozytorium na github, bardzo podstawowa route.

Dodałem jeszcze nodemon, express.

## 2. Zapisywanie danych kontaktów dodanych z formularza do pliku json.

Chcemy mieć możliwość zapisywania danych kontaktów do pliku JSON w folderze data.

### Dodanie ejs jako templating engine i ustawienie podstawowego widoku (i route) 

Dodaję ejs jako templating engine. Tworzę router w pliku definiującym routes (na razie wszystkie) /routes/routes.js Utworzenie routes /, /contact/list i /contact/add

### Dodanie 404

Dodanie middleware, kontrolera i widoku dla page not found 404.

### Dodanie kontrolera user i widoków 

Dodanie kontrolera user a w nim metod obsługi dla routes /contact/list i /contact/add i widoków dla nich

### Dodanie includes początku i końca dokumentu html oraz nawigacji do widoków

### Refaktor nazw z user do contact

### Wypełnienie nawigacji

Przekazanie path do widoku ejs za pomocą app.locals. 

Dodanie bardzo podstawowego stylu w public/css (serwowanego statycznie przez express)

### Dodanie modelu Contact i pobieranie listy kontaktów z pliku json

Funkcja odczytywania kontaktów getContacts w modelu Contact.

Funkcje odczytu/parsowania pliku JSON w utils/fileUtils

Dodanie folderu data na dane a w nim contacts.json zapisującego listę kontaktów.

### Dodanie testów dla readJsonFile

Dodanie mocha i mjackson/expect do testów

#### Problem ścieżek zapisu w testach

przy testowaniu funkcji odczytu z plików , która używa path.dirname(process.mainModule.filename), ścieżka nie jest względem folderu głównego ale względem folderu mocha - np. path.dirname(process.mainModule.filename).

**Problem rozwiązałem (trochę nieoczekiwanie dla mnie) za pomocą refaktoryzacji kodu generowania ścieżki w samej funkcji zapisu (a nie jak myślałem początkowo, szukając obejścia) za pomocą path.resolve() i wtedy w testach zupełnie nic nie trzeba zmieniać.**

#### Jak sprawdzić, czy została wczytana tablica odpowiednich obiektów:

Sprawdzanie czy jest tablicą https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Array/isArray

Sprawdzanie czy tablica zawiera odpowiednie obiekty: https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98

Dodanie custom matchera - ale tylko w pliku fileSystemUtils.test.js

https://jestjs.io/docs/en/asynchronous

Testy zostawiam na bardzo podstawowym poziomie:

- czy udaje się wczytać poprawną tablicę kontaktów z poprawnego pliku
- czy jest reject dla pliku, który nie istnieje
- czy jest reject dla pliku, który nie jest poprawnym json

### Wyświetlanie listy kontaktów w widoku contact-list

Proste wyświetlenie listy kontaktów w paragrafach

### Testowanie metody statycznej getContacts

W modelu contact. Jeśli był błąd odczytu pliku powinna zwracać pustą tablicę. (do przetestowania później, gdy będzie można podmieniać plik contacts.json). Jeśli udało się odczytać poprawnie to tablicę kontaktów z pliku.

### Zapis kontaktu do pliku

Dodanie metody zapisu json do pliku + testy.

Dodanie metody usuwającej plik i rozbudowanie testu zapisującego plik o jego usunięcie na zakończenie.

Dodanie metody zapisującej kontakty w modelu contacts. Naprawić test getContacts (bo teraz, przy zapisie przecież zmieniają się dane, a w teście jest "na sztywno").

Dodać metodę zapisu pojedynczego kontaktu w modelu contact. - Naprawić - żeby była edycja, gdy podajemy istniejące już id.

Do zrobienia - **zrefaktoryzować .save kontaktu w modelu contact. + Zastanowić się w nim, czy jeśli podano contakt ze zdefiniowanym id, ale taki nie został znaleziony na liście zapisanych kontaktów, to powinien zostać wyrzucony błąd - zamiast zapisania kontaktu z nowym id.** 

Dodać formularz zapisywania nowego kontaktu.

### Strona wyświetlania szczegółów kontaktu

Na razie strona wyświetlania szczegółów - bez formularza. 

Dodanie w modelu contacts metody getById - pobierającej dane kontaktu o zadanym id i wyświetlaniu szczegółów kontaktu.

### Zamiana losowego id na unikalny

Dodanie uuid