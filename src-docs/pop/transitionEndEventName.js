export default () => {
  const el = document.createElement('span');
  const transitions = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  for (let transition in transitions) { // eslint-disable-line
    if (el.style[transition] !== undefined) {
      return transitions[transition];
    }
  }
  return null;
};
