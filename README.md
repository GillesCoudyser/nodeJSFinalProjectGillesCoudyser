# MotoGP Championship API

Deze API is de eerste uitwerking van de Node.js API Assignment, in de stijl van de cursus tot en met hoofdstuk 5.

## Wat zit er nu in?

- Express API met aparte route modules
- Vier gelinkte data collections in arrays:
  - teams
  - riders
  - races
  - results
- Circuits zitten embedded in races
- Joi-validatie bij alle POST- en PUT-requests
- Built-in middleware:
  - `express.json()`
  - `express.urlencoded()`
  - `express.static()`
- Third-party middleware:
  - `helmet`
  - `morgan`
  - `config`
  - `pug`
- Custom logger middleware
- Pug homepagina
- REST Client testbestand

MongoDB, authentication, authorization, tests en deployment komen later in de cursus en zijn daarom nog niet toegevoegd.

## Installatie

```bash
npm install
```

## Server starten

```bash
npm start
```

De API draait standaard op:

```text
http://localhost:3000
```

## Development

Als `nodemon` globaal geinstalleerd is:

```bash
npm run dev
```

## Endpoints

### Teams

```text
GET    /api/teams
GET    /api/teams/:id
POST   /api/teams
PUT    /api/teams/:id
DELETE /api/teams/:id
```

### Riders

```text
GET    /api/riders
GET    /api/riders/:id
POST   /api/riders
PUT    /api/riders/:id
DELETE /api/riders/:id
```

### Races

```text
GET    /api/races
GET    /api/races/:id
POST   /api/races
PUT    /api/races/:id
DELETE /api/races/:id
```

### Results

```text
GET    /api/results
GET    /api/results/:id
GET    /api/results/race/:raceId
POST   /api/results
PUT    /api/results/:id
DELETE /api/results/:id
```

Totaal: 21 API endpoints.

## Volgende stappen

- MongoDB en Mongoose toevoegen
- ObjectId-validatie toevoegen
- Users, JWT en rollen toevoegen
- Admin-only routes beschermen
- Tests toevoegen
- API-documentatie en deployment toevoegen
