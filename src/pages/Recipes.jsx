import React, { useState } from 'react';
import { ArrowRight, ChefHat, Search, X } from 'lucide-react';
import { FetchState, RecipeGrid } from '../components/RecipeComponents';
import useRecipes from '../hooks/useRecipes';

export default function Recipes({ favourites, toggleFavourite }) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const { data, loading, error } = useRecipes(query);

  function handleSubmit(event) {
    event.preventDefault();
    setQuery(input.trim());
  }

  return (
    <main className="wrap page-main">
      <div className="page-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> THE RECIPE COLLECTION</div><h1>Find your next <em>favorite.</em></h1><p>A little inspiration for whatever you're in the mood for.</p></div><div className="intro-icon"><ChefHat size={38} strokeWidth={1.2} /></div></div>
      <form className="search-form" onSubmit={handleSubmit} role="search"><Search size={21} /><label className="sr-only" htmlFor="recipe-search">Search recipes</label><input id="recipe-search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Search for a dish..." />{input && <button className="clear-button" type="button" onClick={() => setInput('')} aria-label="Clear search"><X size={18} /></button>}<button className="button button-dark search-button" type="submit">Search <ArrowRight size={17} /></button></form>
      <div className="results-heading"><div><span className="small-label">{query ? 'SEARCH RESULTS' : 'EXPLORE THE COLLECTION'}</span><h2>{query ? <>Results for <em>“{query}”</em></> : <>A little bit of <em>everything.</em></>}</h2></div>{!loading && <span className="results-count">{data.length} {data.length === 1 ? 'recipe' : 'recipes'}</span>}</div>
      {!loading && error && <p className="offline-notice" role="status">{error}</p>}
      {loading || data.length === 0 ? <FetchState loading={loading} emptyMessage="Try searching for a different dish." /> : <RecipeGrid meals={data} favourites={favourites} toggleFavourite={toggleFavourite} />}
    </main>
  );
}