import React from 'react';

import ChampRune from './ChampRune';
import ChampSpell from './ChampSpell';
import ChampPortrait from './ChampPortrait';
import ChampScoreBox from './ChampScoreBox';
export default function ChampInfo({
  firstSpellNum,
  secondSpellNum,
  firstRuneNum,
  secondRuneNum,
  championId,
  champLevel,
  kills,
  deaths,
  assists,
  goldEarned,
  totalKill,
}) {
  return (
    <article className="champ-info">
      <ChampSpell
        firstSpellNum={firstSpellNum}
        secondSpellNum={secondSpellNum}
      />
      <ChampRune firstRuneNum={firstRuneNum} secondRuneNum={secondRuneNum} />
      <ChampPortrait championId={championId} champLevel={champLevel} />
      <ChampScoreBox
        kills={kills}
        deaths={deaths}
        assists={assists}
        goldEarned={goldEarned}
        totalKill={totalKill}
      />
    </article>
  );
}
