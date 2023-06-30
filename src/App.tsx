import { useState, useEffect } from "react";
import "./App.css";

function getAutocompleteResults(query: string): Promise<string[]> {
  const fruits = [
    "Apple",
    "Apricot",
    "Avocado",
    "Banana",
    "Blackberry",
    "Blueberry",
    "Cantaloupe",
    "Cherry",
    "Coconut",
    "Cranberry",
    "Dragonfruit",
    "Durian",
    "Fig",
    "Grape",
    "Grapefruit",
    "Guava",
    "Kiwi",
    "Lemon",
    "Lime",
    "Mango",
    "Orange",
    "Papaya",
    "Peach",
    "Pear",
    "Pineapple",
    "Plum",
    "Pomegranate",
    "Raspberry",
    "Strawberry",
    "Watermelon",
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fruits.filter((fruit) => fruit.toLowerCase().includes(query.toLowerCase())));
    }, Math.random() * 1000);
  });
}

function useDebounceValue(value: string, time = 250) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debounceValue;
}

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debounceQuery = useDebounceValue(query);

  useEffect(() => {
    let ignore = false;
    const populateSuggestions = async () => {
      if (!debounceQuery) {
        setSuggestions([]);
        return;
      }

      const data = await getAutocompleteResults(debounceQuery);
      if (!ignore) {
        setSuggestions(data);
      }
    };

    populateSuggestions();
  }, [debounceQuery]);

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <input className="mt-24 mb-4" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul id="suggestion-list" className="text-gray-200 flex flex-col gap-2 items-start">
        {suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
