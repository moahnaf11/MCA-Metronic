import React from 'react';

function highlightMatch(
  text: string,
  searchTerm: string,
): React.JSX.Element | string {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} className="bg-yellow-200 font-semibold">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}



export default highlightMatch;
