import React from 'react';
import newsItems from '../../data/news.json';

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
          maxHeight: '300px',
          overflowY: 'auto',
          paddingRight: '8px',
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
