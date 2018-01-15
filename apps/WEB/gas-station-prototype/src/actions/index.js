import options from '../option-list';


export const selectOption = (option) => {
  return {
    type: 'SELECT OPTION',
    option: options.find(o => o.key === option),
  };
};

export const swipeCard = (card) => {
  return {
    type: 'SWIPE CARD',
    card,
  };
}
