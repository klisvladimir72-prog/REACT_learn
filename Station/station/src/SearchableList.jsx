import { useState } from "react";

export const SearchableList = ({ list }) => {
  const [searchString, setSearchString] = useState("");

  const handleSearch = (event) => {
    setSearchString(event.target.value);
  };

  const filteredList = list.filter((item) =>
    item.title.toLowerCase().startsWith(searchString.toLowerCase())
  );

  const highlightStart = (text, highlight) => {
    if (!highlight) {
      return text;
    }

    const lowerText = text.toLowerCase();
    const lowerHighlight = highlight.toLowerCase();

    if (lowerText.startsWith(lowerHighlight)) {
      const matched = text.substring(0, highlight.length);
      const rest = text.substring(highlight.length);

      return (
        <>
          <mark>{matched}</mark>
          {rest}
        </>
      );
    }

    return text;
  };

  return (
    <div>
      <label htmlFor="">
        <span>Поиск</span>
        <input type="text" value={searchString} onChange={handleSearch} />
      </label>
      <ul>
        {filteredList.map((item, index) => (
          <li key={index}> {highlightStart(item.title, searchString)} </li>
        ))}
      </ul>
    </div>
  );
};
