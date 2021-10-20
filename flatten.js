let arr = [1, 2, [3, 4, [5, 6, [7, [8, 9, 10]]]]];

function flatten(arr) {
  return arr.reduce((previous, current, index) => {
    if (Array.isArray(current)) {
      return [...previous, ...flatten(current)];
    } else {
      previous.push(current);
    }
    return previous;
  }, []);
}
