import * as React from 'react';
import useCollection from '../useCollection';
import { format } from 'date-fns';
import './mynews.scss';

function MyNews() {
  const news = useCollection('links', 'date');
  const [lastUpdated, setLastUpdated] = React.useState(null);

  React.useEffect(() => {
    if (news.length) {
      let mostRecent = -Infinity;
      news.forEach(({ date }) => {
        if (!mostRecent || date.seconds > mostRecent) {
          console.log(date.seconds, 'date');
          mostRecent = date.seconds;
        }
      });
      setLastUpdated(mostRecent);
    }
  }, [news]);
  return (
    <div className="MyNews">
      <h4 className="MyNews__header">Articles I Found Interesting/Helpful</h4>
      <small>
        <a name="links" />
        Last updated: {new Date(lastUpdated * 1000).toLocaleDateString()}
      </small>
      <ul className="MyNews__list">
        {news &&
          news.slice(0, 5).map(({ author, title, url }) => (
            <li className="MyNews__list__item">
              <a href={url} className="MyNews__link">
                {title}
              </a>
              <strong>{author}</strong>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MyNews;
