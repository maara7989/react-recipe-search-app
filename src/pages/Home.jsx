import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import { FetchState, RecipeGrid, RecipeImage } from '../components/RecipeComponents';
import useRecipes from '../hooks/useRecipes';

export default function Home({ favourites, toggleFavourite }) {
  const { data, loading, error } = useRecipes('chicken');
  return (
    <main>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A LITTLE INSPIRATION FOR YOUR TABLE</div>
          <h1>Good food.<br /><em>Good mood.</em></h1>
          <p>For the meals worth making and the moments worth sharing. Find your next favorite recipe right here.</p>
          <div className="hero-actions"><Link className="button button-dark" to="/recipes">Explore recipes <ArrowUpRight size={18} /></Link><a className="discover-link" href="#inspiration">See what's cooking <ArrowDown size={16} /></a></div>
          <div className="hero-note"><span className="note-icon"><Sparkles size={16} /></span> A little inspiration, served fresh.</div>
        </div>
        <div className="hero-visual">
          <RecipeImage src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80" alt="A freshly prepared meal" />
          <div className="hero-image-label"><span>GOOD FOOD, GOOD COMPANY</span><strong>Made for<br /><em>sharing.</em></strong><ArrowUpRight size={19} /></div>
          <div className="hero-stamp"><span>MADE WITH</span><Heart size={20} fill="currentColor" /><span>GOOD TASTE</span></div>
        </div>
      </section>
      <div className="ticker"><div className="wrap ticker-inner"><span>COOK SOMETHING GOOD</span><span className="ticker-star">✳</span><span>SHARE SOMETHING GREAT</span><span className="ticker-star">✳</span><span>REPEAT AS OFTEN AS POSSIBLE</span><span className="ticker-star">✳</span><span>COOK SOMETHING GOOD</span></div></div>
      <section className="section wrap" id="inspiration">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> A LITTLE SOMETHING TO GET YOU STARTED</div><h2>On the menu <em>today.</em></h2><p>Some delicious ideas for your next meal.</p></div><Link className="view-all" to="/recipes">View all recipes <ArrowUpRight size={17} /></Link></div>
        {!loading && error && <p className="offline-notice" role="status">{error}</p>}
        {loading ? <FetchState loading={loading} /> : <RecipeGrid meals={data.slice(0, 4)} favourites={favourites} toggleFavourite={toggleFavourite} />}
      </section>
      <section className="bottom-banner wrap"><div><span className="banner-kicker">YOUR NEXT GREAT MEAL AWAITS</span><h2>What are you <em>craving?</em></h2><p>There is always something new to discover.</p></div><Link className="button button-light" to="/recipes">Find a recipe <ArrowUpRight size={18} /></Link><Sparkles className="banner-sparkle" size={48} strokeWidth={1} /></section>
    </main>
  );
}