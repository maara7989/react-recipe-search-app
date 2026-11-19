# The Recipe Edit

A React recipe search app using TheMealDB, Axios, and React Router.

## Getting started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. An internet connection is needed to fetch recipes and images from TheMealDB.

If TheMealDB is unavailable, the app shows a small offline collection that can still be searched, viewed, and saved. Its representative food photos are served by Unsplash and require an internet connection.

Search for recipes, open a card for ingredients and instructions, and use the heart button to save or remove favourites. Favourites are stored in your browser and remain available across navigation and reloads.

To create a production build, run `npm run build`.