import React, { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, Heart, UtensilsCrossed } from 'lucide-react';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Favourites from './pages/Favourites';

function readFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem('recipe-edit-favourites') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Header({ count }) {
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Link className="brand" to="/" aria-label="The Recipe Edit home">
          <span className="brand-mark"><UtensilsCrossed size={19} strokeWidth={2} /></span>
          <span>the recipe <em>edit.</em></span>
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/favourites" className="nav-favourites"><Heart size={16} /> <span>Favourites</span>{count > 0 && <span className="count">{count}</span>}</NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return <footer className="footer"><div className="wrap footer-inner"><Link className="brand footer-brand" to="/"><span className="brand-mark"><UtensilsCrossed size={17} /></span><span>the recipe <em>edit.</em></span></Link><p>Good food is always a good idea.</p><span>RECIPES BY THEMEALDB</span></div></footer>;
}

export default function App() {
  const [favourites, setFavourites] = useState(readFavourites);
  useEffect(() => {
    try { localStorage.setItem('recipe-edit-favourites', JSON.stringify(favourites)); } catch { }
  }, [favourites]);

  function toggleFavourite(meal) {
    setFavourites((current) => current.some((item) => item.idMeal === meal.idMeal) ? current.filter((item) => item.idMeal !== meal.idMeal) : [...current, meal]);
  }

  const props = { favourites, toggleFavourite };
  return <><ScrollToTop /><Header count={favourites.length} /><Routes><Route path="/" element={<Home {...props} />} /><Route path="/recipes" element={<Recipes {...props} />} /><Route path="/recipes/:id" element={<RecipeDetail {...props} />} /><Route path="/favourites" element={<Favourites {...props} />} /><Route path="*" element={<main className="wrap page-main state"><h1>Page not found.</h1><Link className="button button-dark" to="/">Go home <ArrowRight size={17} /></Link></main>} /></Routes><Footer /></>;
}