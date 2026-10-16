import React from 'react';
import allNewsItems from '../../data/news.json';

// Only the last two years of news are shown on the home page. Older items stay in
// news.json as an archive; they are simply not rendered. The window is relative to
// the build date, so this prunes itself on every deploy with no manual upkeep.
const YEARS_SHOWN = 2;
const MIN_ITEMS = 8;          // never leave the panel near-empty if news goes quiet
const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
function monthsAgo(raw) {
  const d = String(raw ?? '').trim();
  const m = d.match(/^([A-Za-z]+)\s+(\d{4})$/);
  const now = new Date();
  if (!m || !MONTHS.includes(m[1].toLowerCase())) return 0;   // unparseable: keep it
  const year = Number(m[2]), month = MONTHS.indexOf(m[1].toLowerCase());
  return (now.getFullYear() - year) * 12 + (now.getMonth() - month);
}
const recent = allNewsItems.filter(item => monthsAgo(item.date) < YEARS_SHOWN * 12);
const newsItems = recent.length >= MIN_ITEMS ? recent : allNewsItems.slice(0, MIN_ITEMS);

export default function NewsList() {
  return (
    <div>
      <style>{`
        .news-list a {
          color: #2176b6;
        }
        .news-list a:hover {
          color: #174e7c;
          text-decoration: underline;
        }
      `}</style>
      <ul
        className="news-list"
        style={{
          maxHeight: 'var(--news-max-height, 300px)',
          overflowY: 'auto',
          paddingRight: '8px',
          margin: 0,
        }}
      >
        {newsItems.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e0e7ef', fontSize: '0.95em' }}>
            <strong>{item.date}:</strong>{' '}
            <span style={{ textAlign: 'justify', wordBreak: 'break-word', hyphens: 'auto', display: 'inline-block', width: '100%' }} dangerouslySetInnerHTML={{ __html: item.text }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
