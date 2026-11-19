import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import { RecipeGrid } from '../components/RecipeComponents';

export default function Favourites({ favourites, toggleFavourite }) {
  return <main className="wrap page-main favourites-page"><div className="page-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL COLLECTION</div><h1>Saved with <em>love.</em></h1><p>All the good things you want to make, in one place.</p></div><div className="intro-icon"><Heart size={37} strokeWidth={1.2} /></div></div><div className="results-heading"><div><span className="small-label">KEEPERS, ALL OF THEM</span><h2>Your <em>favourites.</em></h2></div><span className="results-count">{favourites.length} {favourites.length === 1 ? 'recipe' : 'recipes'}</span></div>{favourites.length ? <RecipeGrid meals={favourites} favourites={favourites} toggleFavourite={toggleFavourite} showRemove /> : <div className="state favourites-empty"><div className="empty-heart"><Heart size={30} /></div><h3>A little room for inspiration.</h3><p>Save recipes you love and they'll be waiting for you here.</p><Link className="button button-dark" to="/recipes">Explore recipes <ArrowUpRight size={17} /></Link></div>}</main>;
}