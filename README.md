# Tavol.ai Interactive Journey Demo

A clickable mobile prototype of the Tavol.ai onboarding and planning journey, based on the Design System 2.2 and User Journey Guide assets.

## Run

```bash
cd demo
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## What it covers

- **Dana Okafor path:** Sign in → About you → Recipe books → Just me → Household → Shared meals (Gather)
- **Interest branching:** Not for me / Some / Very controls which stages appear and Full vs Quick depth
- **Office stage:** appears only if Office meals is rated Some or Very
- **Mocked Sous:** scripted AI copy and import animation; no real auth, OCR, or MCP APIs

## Controls

- Desktop: phone frame, stage stepper, **Reset**
- Mobile (&lt;640px): full-bleed app UI; **Reset demo** under You

## Stack

Vite + React + TypeScript, Lucide icons, Design System pantry palette (Sorrel / Tomato / Saffron / Beet).
