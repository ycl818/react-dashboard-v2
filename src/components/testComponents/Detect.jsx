import React, { useState, useEffect } from "react";

const data = {
  name: "John",
  age: 30,
  hobbies: ["reading", "swimming"],
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    country: "USA",
    location: {
      lat: 37.7749,
      lng: -122.4194,
    },
  },
};

function Detect() {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [availableKeys, setAvailableKeys] = useState([]);

  useEffect(() => {
    setAvailableKeys(getKeysForLevel(data, selectedLevel));
  }, [selectedLevel]);

  function getKeysForLevel(obj, level) {
    if (level === 1) {
      return Object.keys(obj);
    }

    return Object.entries(obj)
      .filter(
        ([_, value]) =>
          typeof value === "object" &&
          value !== null &&
          Array.isArray(value) === false
      )
      .map(([key, value]) => {
        const childKeys = getKeysForLevel(value, level - 1);
        console.log("file: Detect.jsx:36 ~ .map ~ childKeys:", childKeys);

        return childKeys.map((childKey) => `${key}.${childKey}`);
      })
      .flat();
  }

  function handleLevelChange(e) {
    setSelectedLevel(Number(e.target.value));
  }

  return (
    <div>
      <label>
        Select level:
        <select value={selectedLevel} onChange={handleLevelChange}>
          {Array.from({ length: getMaxDepth(data) }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Level {i + 1}
            </option>
          ))}
        </select>
      </label>
      {availableKeys.map((key) => (
        <p key={key}>{JSON.stringify(getNestedValue(data, key))}</p>
      ))}
    </div>
  );
}

function getMaxDepth(obj) {
  let maxDepth = 0;
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null) {
      maxDepth = Math.max(maxDepth, getMaxDepth(value));
    }
  }
  return maxDepth + 1;
}

function getNestedValue(obj, key) {
  return key.split(".").reduce((acc, cur) => acc[cur], obj);
}

export default Detect;
