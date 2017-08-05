import button from './button';
import hr from './hr';
import input from './input';
import pop from './pop';
import preview from './preview';
import showcase from './showcase';

export function isPc() {
  const uaInfo = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const agents = ['Android', 'iPhone', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let i = 0; i < agents.length; i += 1) {
    if (uaInfo.indexOf(agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

export function retina() {
  if (isPc()) {
    return;
  }
  const classNames = [];
  const pixelRatio = (typeof window !== 'undefined') && (window.devicePixelRatio || 1);
  classNames.push(`pixel-ratio-${Math.floor(pixelRatio)}`);

  if (pixelRatio >= 2) {
    classNames.push('retina');
  }

  const html = document.getElementsByTagName('html')[0];

  classNames.forEach(className => html.classList.add(className));
}

const components = {
  button,
  hr,
  input,
  pop,
  preview,
  showcase,
};

const install = (Vue) => {
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
  });

  retina();
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
};

export {
  install,
};
