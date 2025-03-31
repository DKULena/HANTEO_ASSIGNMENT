import { memo } from 'react';

const ContentListItem = memo(({ item }) => {
  return (
    <li className="item">
      <a 
        href={item.link} 
        className="item-link" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <div className="item-image" aria-hidden="true">
          {item.imageUrl && (
            <img 
              src={item.imageUrl} 
              alt="" 
              loading="lazy" 
              width="48" 
              height="48" 
            />
          )}
        </div>
        <div className="item-title">{item.title}</div>
      </a>
    </li>
  );
});

ContentListItem.displayName = 'ContentListItem';

export default ContentListItem;