import cards from '../cards';

function shuffle(array) {
  const _array = array.slice(0)
  for(let i = 0; i < array.length; i++) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      const temp = _array[i]
      _array[i] = _array[randomIndex]
      _array[randomIndex] = temp
  }
  return _array
}

export default function initializeDeck(category, level) {
  let id = 0;
  let chosenCat = cards[category].sort(() => .5 - Math.random()).slice(0, level*level/2)
  chosenCat = chosenCat.reduce((acc, type) => {
      acc.push({
          id: id++,
          type
      })
      acc.push({
          id: id++,
          type
      })
      return acc
  }, [])
  return shuffle(chosenCat)
}