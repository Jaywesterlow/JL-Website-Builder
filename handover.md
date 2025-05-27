# Beste developers

Ik ben Jaymar Westerlow, de hoofdontwikkelaar van het JL CMS project. In dit document is bedoeld als een toelichting  over het project en hoe je het het beste kunt opstarten.

---

## Huidige status van het project

De huidige status van het project is een minimaal werkend prototype met basisfunctionaliteiten:

- De hoofdpagina is minimaal bewerkt zodat deze later gewijzigd kan worden.
- /auth leidt naar de authenticatiepagina waar gebruikers kunnen inloggen of registreren.
- Na het inloggen kunnen gebruikers hun site en profiel beheren en toegang krijgen tot het dashboard.
- Op het dashboard zijn de "Pagina's", "Menu's" en "Media" pagina's gemaakt en volledig functioneel.
- Database is gelinked en data wordt daar naartoe gestuurd en opgehaald.

---

## Belangrijkste werkende features

De huidige functies van het project zijn:

- **Login**  
- **Pagina (toevoegen, bewerken, verwijderen)**  
- **Media (toevoegen, verwijderen)**  
- **Menu (toevoegen, wijzigen)**
- **WYSIWYG editor**  

---

## Aandachtspunten en uitdagingen

De grootste uitdaging voor jullie is het toevoegen van verschillende thema's.
Daarnaast is het belangrijk om consistentie te waarborgen in de gebruikerservaring en functionaliteit.

---

## Code Conventies & Best Practices

### Naamgeving & Structuur

- Gebruik duidelijke, beschrijvende namen voor variabelen, functies en bestanden.
- Bestands- en componentnamen gebruiken `PascalCase`.
- Houd functies klein en specifiek.
- Orden code binnen bestanden op consistente wijze:
  1. Imports
  2. Exports ($props)
  3. Constante, en aanpasbare waarden (const, let)
  4. functies
  5. HTML
  6. CSS

### Formatting & Stijl

- Gebruik **ESLint** en **Prettier** voor automatische codeformattering en linting.
- Consistente indentatie (2 spaties).
- Geen inline styles (tenzij functioneel nodig).
- Geen classes (tenzij functioneel nodig).
- Specifieke selectors voor styling om conflicts te vermijden.

### Componentontwikkeling

- Componenten maken gebruik van Svelte 5's Runes modus.
- Elke component is gemaakt om makkelijk hergebruikbaar te zijn.
- Documenteer props en expected behavior over het component in dit bestand.

---

## Toegankelijkheid (a11y)

- Gebruik altijd semantische HTML (`<button>`, `<label>`, `<nav>`, etc.).
- Zorg voor voldoende kleurcontrast (WCAG AA als minimum).
- Voeg `aria-*` attributen toe waar semantiek niet genoeg is.
- Formulieren moeten correct gelabeld zijn met `<label for="">`.
- Interactieve elementen moeten focusbaar en via toetsenbord bereikbaar zijn.
- Test altijd met de vooraf ingestelde Playwright configuratie.
- Test met screenreader (NVDA voor windows of VoiceOver voor Mac), Lighthouse en Axe-core (geintegreerd in playwright).
- Geef visuele focus aan interactieve elementen (geen `outline: none`).

---

## Performance

- Importeer enkel wat nodig is.
- Gebruik lazy-loading voor zwaardere componenten of routes.
- Optimaliseer afbeeldingen (moderne formaten, juiste afmetingen, lazy loading).
- Vermijd onnodige renders of grote afhankelijkheden.
- Monitor Lighthouse scores op performance en pas structureel aan.

---

## Teststrategie

### Componenttests

- Elk component moet minimaal een test bevatten die:
  - Rendert zonder fouten
  - De verwachte output toont bij standaardprops
  - Events correct afhandelt

### E2E-tests

- Gebruik Playwright voor toegankelijkheid en performance.
- Test op verschillende browsers en devices.

### Voorwaarden voor een merge

- Alle tests moeten slagen, anders duidelijk aangegeven in PR.
- Geen nieuwe errors.
- Geen console.logs, TODO’s of tijdelijke mocks in PR’s.

---

## Pull Request Richtlijnen

- Volg de PR-template.
- Beschrijf duidelijk de toevoegingen, wijzigingen en context.
- Vermeld welke testen zijn uitgevoerd en hoe.
- Voeg screenshots toe indien visuele aanpassingen buiten het ontwerp om zijn gedaan.
- Vraag om review van minstens 1 teamlid voor merge.
- Link relevante issues via `Closes #...`.

---

## Gebruik van Better Comments

De Better Comments extensie (VS Code) wordt gebruikt om structuur en duidelijkheid te behouden in commentaar. Hanteer deze conventies:

```ts
// ! Belangrijk: moet refactored worden bij herstructurering van form
// ? Zou deze validatie ook op veldniveau moeten komen?
// TODO: Voeg fallback toe voor API-timeouts
// FIXME: Crasht bij null response (zie issue #14)
// NOTE: Deze component is alleen zichtbaar bij admin users


---

## Aanbevolen eerste stappen

Als ik verder zouden bouwen, zou we beginnen met het volgende:

1. Samen met het team brainstormen over het uitwerken van de andere dashboard pagina's (Dashboard, Instellingen, Account, etc.) en nieuwe features die toegevoegd kunnen worden.  
2. Een projectbord opstellen en de taken verdelen.

---

Veel succes met het project!

Met vriendelijke groet,  
De voorgaande bijdragers aan de *JL CMS*  

**Jaymar Westerlow, Sagar Bhatia**
