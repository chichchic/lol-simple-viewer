import React from 'react';

import ChampRune from './ChampRune';
import ChampSpell from './ChampSpell';
import ChampPortrait from './ChampPortrait';
import ChampScoreBox from './ChampScoreBox';
export default function ChampInfo() {
  return (
    <article className="champ-info">
      <ChampSpell firstSpellNum={4} secondSpellNum={32} />
      <ChampRune firstRuneNum={8437} secondRuneNum={8000} />
      <ChampPortrait champNum={12} level={18} />
      <ChampScoreBox
        kills={3}
        deaths={3}
        assists={3}
        goldEarned={300}
        totalKill={7}
      />
    </article>
  );
}
