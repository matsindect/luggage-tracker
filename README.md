# 🧳 Luggage Tracker App

A sleek and simple luggage tracker built with **Next.js**, **React Hooks**, and **Tailwind CSS**. This app allows users to add, view, and delete luggage items with local persistence and smooth animations for a great user experience.

---

## ✨ Features

- ✅ Add a luggage item (name + destination)
- 📋 List all luggage items
- ❌ Delete luggage items
- 💾 Persistent storage using browser localStorage
- ⚡ Smooth loading spinner animations for add/delete
- 🧩 Modular and scalable folder structure
- 🎨 Stylish yet minimal UI with Tailwind CSS
- 🚀 Built with functional components and React Hooks
- 🌐 Page-based routing with Next.js

---

## 📂 Project Structure

```bash
/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── luggage/
│   │   │       ├── route.ts              # POST/GET handler for luggage
│   │   │       └── [id]/
│   │   │           └── route.ts          # DELETE handler for specific luggage item
│   │   ├── page.tsx                      # Main page (Home)
│   │   ├── layout.tsx                    # Global layout
│   │   └── globals.css                   # Global styles (Tailwind import)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx                # Reusable styled button
│   │   │   ├── LoadingSpinner.tsx        # Simple loading spinner
│   │   │   └── Card.tsx                  # Card UI wrapper
│   │   ├── LuggageForm.tsx               # Form to add luggage item
│   │   ├── LuggageList.tsx               # Displays list of luggage items
│   │   └── LuggageItem.tsx               # Single item with delete functionality
│   ├── lib/
│   │   └── db.ts                         # LocalStorage utility functions
│   ├── hooks/
│   │   └── useLuggage.ts                 # Custom hook to manage luggage state
│   └── types/
│       └── index.ts                      # TypeScript types (e.g., LuggageItem)
├── public/
│   └── favicon.ico                       # App icon
├── package.json                          # Project metadata and scripts
├── tsconfig.json                         # TypeScript config
├── tailwind.config.js                    # Tailwind customization
├── postcss.config.js                     # PostCSS config for Tailwind
└── next.config.js                        # Next.js config
```
# 🚀 Getting Started

## Clone the repo 
```
git clone https://github.com/yourusername/luggage-tracker.git
cd luggage-tracker
```

## Install dependencies
```
npm install

```

## Run the development server
```
npm run dev

```
Open http://localhost:3000 in your browser to see the app in action

# 📦 Build for Production

```
npm run build
npm run start

```
## 🛠 Tech Stack

- Next.js – for server-side rendering and routing
- React Hooks – for state and lifecycle management
- Tailwind CSS – for styling
- localStorage API – for client-side persistence

# 🧠 Architecture Notes

- App state is managed via a custom React hook (useLuggage)

- Data is persisted using localStorage via helper functions in /utils/storage.ts

- UI is broken into atomic reusable components

- Spinner animations give users visual feedback during loading operations

# 📸 Screenshots


📃 License

MIT © 2025 Clive T Matsinde