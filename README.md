<div style="display: flex; align-items: center; justify-content: center; flex-direction: column">
    <h1 style="color: #efe7e5; border-bottom: 2px solid #efe7e5; padding: 0 1.5rem .5rem">JL Enterprise CMS</h1>
    <p>
        ![Static Badge](https://img.shields.io/badge/usage-sveltekit-orange)
        ![Vercel Badge](https://deploy-badge.vercel.app/vercel/deploy-badge)
        ![License](https://img.shields.io/badge/license-MIT-blue)
    </p>
</div>

---

## 📖 Inhoudsopgave
  * [Beschrijving](#beschrijving)
  * [Afbeelding](#afbeelding)
  * [Live pagina](#live-pagina)
  * [Missie & Visie](#missie--visie)
  * [Gebruikersaanwijzing](#gebruikersaanwijzing)
  * [Huisstijl](#huisstijl)
  * [Bronnen](#bronnen)
  * [Installatiehandleiding](#installatiehandleiding)

---

## 📝 Beschrijving
*beschrijving komt nog*

### 🔹 [Pagina]
- *[deze pagina doet...]*
- *[Dynamische data van deze pagina...]*
- *[Deze pagina interact zo met andere paginas...]*

---

## 🖼️ Afbeelding hoofdpagina
*komt nog een afbeelding*

---

## 🌐 Live pagina

🔗 **Live Demo:** [JL-CMS](https://jl-cms.vercel.app/)

---

## 🎯 Missie & Visie

* Hier komt nog een missie en visie*

---

## 🛠️ Gebruikersaanwijzing


- **Navigation Flow:** *[refereer sitemap]*
- **User Actions:** *[leg interacties uit (site builder)]*

---

## 🎨 Huisstijl
De huisstijl is dezelfde als die van de LAURALISA sites.

### 🎨 Thema

hoofdkleuren:
- **#fff**
- **#F8F5F3** 
- **#efe7e5**
- **#b07d75**
- **#fcb7ae**
- **#242423**

Font:
- **Poppins**

### 📏 Code Conventies
De principes en conventies gebruikt om de code consistent te houden

1. **Component Structure:** [Define how components are organized]
2. **Styling Guidelines:** 
- Gebruik scoped styles door standaard `<style>` zonder `global` te gebruiken (met uitzondering op variabele en body styling).
- Beperk het gebruik van !important.
- CSS classes zijn bedoeld voor themas en JS functies, verder minimaal gebruik
- CSS selectors specifiek aanroepen met parents om HTML structuur terug te vinden in CSS 
- Secties altijd bij id aanroepen
- Gebruik kebabcase voor CSS classes: `css-class`.
- Gebruik camelcase voor variabele en functies: `let userName`.

3. **API Requests:** 
- Data wordt met Drizzle ORM behandeld, refereer naar [documentatie](https://orm.drizzle.team/docs/overview).
- Er wordt gebruik gemaakt van een MySQL database
- Behandel data zoveel mogelijk in `+page.server.js`
- Refereer naar [Dataflow Diagram](https://github.com/Jaywesterlow/JL-Website-Builder/issues/16) voorbeter begrip van dataflow

4. **Accessibility (A11y):**
- Voeg altijd alt-teksten toe waar nodig.
- Gebruik semantische HTML: `<button>`, `<article>`, `<section>`, etc.

5. **Git Conventions:**
- Schrijf beschrijvende commit messages in version control format
- Gebruik branches voor features of bugs

---



## Bronnen
Hier vind je de bronnen van de tools die we hebben gebruikt. 

### [Sveltekit Docs ➡️](https://kit.svelte.dev/)
<div style="display: flex; justify-content: flex-start; align-items: center">
    <img style="height: 250px;" src="https://github.com/user-attachments/assets/27f8ed03-7202-4a01-9924-0f358fc5e75c">
    <p style="max-width: 50%; margin-left: 2rem">
        SvelteKit is ideaal voor dit project omdat het de flexibiliteit van een CMS biedt zonder de nadelen van WordPress, zoals trage laadtijden en beperkte ontwikkelmogelijkheden. Het combineert moderne webtechnieken zoals server-side rendering en efficiënte code-splitting, waardoor de prestaties en toegankelijkheid verbeteren. Daarnaast biedt het ontwikkelaars volledige controle over de structuur en functionaliteit, wat zorgt voor een snellere, gebruiksvriendelijke en beter schaalbare applicatie.
    </p>
</div>


### [Vercel Docs ➡️](https://vercel.com/docs/frameworks/sveltekit)
<div style="display: flex; justify-content: flex-start; align-items: center">
    <img style="height: 250px;" src="https://github.com/user-attachments/assets/f55ed6b2-1d62-4999-9d23-7e4fb1f00cf3">
    <p style="max-width: 50%; margin-left: 2rem">
        We deployen met Vercel omdat het perfect integreert met SvelteKit en zorgt voor snelle, schaalbare en geoptimaliseerde hosting. Vercel ondersteunt server-side rendering, edge functions en automatische deployments, waardoor het perfect aansluit op de prestaties en flexibiliteit van SvelteKit. (Daarnaast is Rich Harris, de maker van SvelteKit, sinds 2022 bij Vercel in dienst om de samenwerking tussen Sveltekit en Vercel verder te verbeteren.)
    </p>
</div>

## Installatiehandleiding  
Instructies voor het lokaal opzetten van het project, zodat ontwikkelaars de code kunnen downloaden, installeren en lokaal draaien met behulp van SvelteKit.  

### **1. Vereisten**  
Zorg ervoor dat je de volgende software hebt geïnstalleerd voordat je begint:  

- **[Node.js](https://nodejs.org/):** Zorg ervoor dat je een recente versie hebt (bij voorkeur de LTS-versie).  
- **Packetmanager:** zoals `npm` (meegeleverd met Node.js), [Yarn](https://yarnpkg.com/), of [pnpm](https://pnpm.io/).  

### **2. Repository clonen**  
Clone de repository naar je lokale apparaat met de volgende stappen:  

1. Open je terminal.  
2. Voer het volgende commando uit: `git clone https://github.com/Jaywesterlow/JL-Website-Builder/`
3. Ga naar de projectmap: `cd [project-map]`

### **3. SvelteKit installeren**
Volg deze stappen om het project op te zetten en de benodigde pakketten te installeren:

1. Open je terminal in de projectmap.
2. Installeer de afhankelijkheden:
```npm install```

of, als je Yarn gebruikt:

```yarn install```


of met pnpm:

```pnpm install```


3. Start de ontwikkelomgeving:

```npm run dev```


of met automatisch openen in de browser:

```npm run dev -- --open```


Hiermee wordt de lokale server gestart en kun je het project openen via http://localhost:5173 (of een andere poort die in de terminal wordt vermeld).

### **4. Deployen op Vercel**
Volg deze stappen om het project te deployen op Vercel:

1. Ga naar vercel.com.
2. Maak een account aan of log in.
3. Koppel je Git-repository aan Vercel.
4. Vercel detecteert automatisch dat je project SvelteKit gebruikt en stelt de juiste configuraties in.
5. Klik op Deploy om je project live te zetten.


### **5. Belangrijke NPM-scripts**
Hieronder staan de belangrijkste scripts die je kunt gebruiken tijdens de ontwikkeling:

`npm run dev`: Start de ontwikkelserver en zorgt voor live reload. Gebruik dit tijdens het ontwikkelen.

`npm run build`: Bouwt de applicatie voor productie. Dit genereert geoptimaliseerde bestanden in de `build`-map.

`npm run preview`: Voer een preview uit van de gebouwde applicatie. Handig om te controleren hoe de applicatie eruitziet voordat je deze deployt.

**Let op: Voor productie-deployment kan een [adapter](https://svelte.dev/docs/kit/adapters) nodig zijn, afhankelijk van de hostingomgeving.**
