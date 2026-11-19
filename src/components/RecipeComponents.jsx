import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Heart, Search, Trash2, UtensilsCrossed } from 'lucide-react';
import offlineRecipes from '../data/offlineRecipes';

export function RecipeImage({ src, alt, loading }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <span className="image-placeholder" role="img" aria-label={`${alt}: image unavailable`}><UtensilsCrossed size={32} strokeWidth={1.3} /><span>Image unavailable</span></span>;
  }

  return <img src={src} alt={alt} loading={loading} onError={() => setFailed(true)} />;
}

function RecipeCard({ meal, isFavourite, toggleFavourite, showRemove }) {
  const image = offlineRecipes.find((item) => item.idMeal === meal.idMeal)?.strMealThumb || meal.strMealThumb;
  return (
    <article className="recipe-card">
      <div className="card-image-wrap">
        <Link to={`/recipes/${meal.idMeal}`} className="card-image-link" aria-label={`View ${meal.strMeal}`}>
          <RecipeImage key={image} src={image} alt={meal.strMeal} loading="lazy" />
        </Link>
        <button className={`save-button ${isFavourite ? 'saved' : ''}`} onClick={() => toggleFavourite(meal)} aria-label={`${isFavourite ? 'Remove' : 'Save'} ${meal.strMeal} ${isFavourite ? 'from' : 'to'} favourites`} title={isFavourite ? 'Remove from favourites' : 'Save to favourites'} aria-pressed={isFavourite}>
          <Heart size={19} fill={isFavourite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="card-meta"><span>{meal.strCategory || 'Recipe'}</span><span className="meta-dot" /> <span>{meal.strArea || 'Kitchen inspiration'}</span></div>
      <Link to={`/recipes/${meal.idMeal}`} className="card-title"><h3>{meal.strMeal}</h3><ArrowUpRight size={19} /></Link>
      {showRemove && <button className="remove-favourite" onClick={() => toggleFavourite(meal)} aria-label={`Remove ${meal.strMeal} from favourites`}><Trash2 size={15} /> Remove from favourites</button>}
    </article>
  );
}

export function RecipeGrid({ meals, favourites, toggleFavourite, showRemove = false }) {
  return <div className="recipe-grid">{meals.map((meal) => <RecipeCard key={meal.idMeal} meal={meal} isFavourite={favourites.some((item) => item.idMeal === meal.idMeal)} toggleFavourite={toggleFavourite} showRemove={showRemove} />)}</div>;
}

export function FetchState({ loading, error, emptyMessage }) {
  if (loading) return <div className="state" role="status"><span className="spinner" /> <p>Finding something delicious...</p></div>;
  if (error) return <div className="state" role="alert"><p>{error}</p><button className="text-button" onClick={() => window.location.reload()}>Try again <ArrowRight size={16} /></button></div>;
  if (emptyMessage) return <div className="state empty-state"><Search size={28} /><h3>Nothing found just yet.</h3><p>{emptyMessage}</p></div>;
  return null;
}