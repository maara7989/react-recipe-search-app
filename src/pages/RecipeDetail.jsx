import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Trash2 } from 'lucide-react';
import { FetchState, RecipeImage } from '../components/RecipeComponents';
import offlineRecipes from '../data/offlineRecipes';

export default function RecipeDetail({ favourites, toggleFavourite }) {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (id.startsWith('local-')) {
      setMeal(offlineRecipes.find((item) => item.idMeal === id) || null);
      setError('');
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setMeal(null);
    axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php', { params: { i: id }, signal: controller.signal })
      .then((response) => setMeal(response.data.meals?.[0] || null))
      .catch((requestError) => { if (!axios.isCancel(requestError)) setError('We couldn\'t load this recipe. Please check your connection and try again.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);

  const isFavourite = meal && favourites.some((item) => item.idMeal === meal.idMeal);
  const ingredients = meal ? Array.from({ length: 20 }, (_, index) => ({ name: meal[`strIngredient${index + 1}`], measure: meal[`strMeasure${index + 1}`] })).filter((ingredient) => ingredient.name?.trim()) : [];
  return <main className="wrap page-main detail-page"><Link className="back-link" to="/recipes"><ArrowLeft size={17} /> Back to recipes</Link>{loading || error ? <FetchState loading={loading} error={error} /> : !meal ? <div className="state"><h2>Recipe not found.</h2><Link className="text-button" to="/recipes">Explore recipes <ArrowRight size={16} /></Link></div> : <><div className="detail-top"><div className="detail-image"><RecipeImage key={meal.strMealThumb} src={meal.strMealThumb} alt={meal.strMeal} /></div><div className="detail-summary"><div className="eyebrow"><span className="eyebrow-line" /> SOMETHING DELICIOUS</div><h1>{meal.strMeal}</h1><div className="detail-tags"><span>{meal.strCategory}</span><span>{meal.strArea} cuisine</span></div><p>Good food is always worth sharing. Gather your ingredients and make something wonderful.</p><div className="favourite-actions"><button className="button button-dark" disabled={isFavourite} onClick={() => toggleFavourite(meal)}><Bookmark size={18} /> {isFavourite ? 'Saved to favourites' : 'Add to favourites'}</button>{isFavourite && <button className="button button-saved" onClick={() => toggleFavourite(meal)}><Trash2 size={18} /> Remove from favourites</button>}</div></div></div><div className="detail-content"><section className="ingredients"><span className="small-label">THE SHOPPING LIST</span><h2>You'll <em>need.</em></h2><ul>{ingredients.map((ingredient, index) => <li key={`${ingredient.name}-${index}`}><span>{ingredient.name}</span><strong>{ingredient.measure}</strong></li>)}</ul></section><section className="instructions"><span className="small-label">LET'S GET COOKING</span><h2>Make it <em>happen.</em></h2>{meal.strInstructions?.split(/\r?\n/).filter((paragraph) => paragraph.trim()).map((paragraph, index) => <p key={index}>{paragraph}</p>)}{meal.strYoutube && <a className="text-button" href={meal.strYoutube} target="_blank" rel="noreferrer">Watch the recipe <ArrowUpRight size={17} /></a>}</section></div></>}</main>;
}