import React from 'react';

import ChampRune from './ChampRune';
import ChampSpell from './ChampSpell';
import ChampPortrait from './ChampPortrait';
import ChampScoreBox from './ChampScoreBox';

import './ChampInfo.scss';
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
  killRatio,
}) {
  return (
    <article className="champ-info">
      <article className="champ-spell">
        <ChampSpell spellNum={firstSpellNum} />
        <ChampSpell spellNum={secondSpellNum} />
      </article>
      <article className="champ-rune">
        <div className="main-rune-bg">
          <ChampRune runeNum={firstRuneNum} />
        </div>
        <ChampRune runeNum={secondRuneNum} />
      </article>

      <ChampPortrait championId={championId} champLevel={champLevel} />
      <ChampScoreBox
        kills={kills}
        deaths={deaths}
        assists={assists}
        goldEarned={goldEarned}
        killRatio={killRatio}
      />
    </article>
  );
}
