export const fetchBusinesses = (setBusinesses) => {
  fetch("/businesses")
    .then((r) => r.json())
    .then((arrayOfBusinesses) => {
      setBusinesses(arrayOfBusinesses);
    });
};
