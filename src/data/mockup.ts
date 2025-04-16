import { Group } from './interfaces';
import { getGroupStructure } from './groupStructure';

let cachedData: Group[] | null = null;

const mockDataProxy = new Proxy([] as Group[], {
  get(target, prop) {
    if (typeof Array.prototype[prop as keyof typeof Array.prototype] === 'function') {
      return Array.prototype[prop as keyof typeof Array.prototype].bind(target);
    }

    if (target.length === 0) {
      if (cachedData) {
        target.push(...cachedData);
      } else {
        (async () => {
          const fullData = await getGroupStructure();
          cachedData = fullData;
          target.splice(0, target.length, ...fullData);
        })();
      }
    }

    return target[prop as keyof typeof target];
  },
});

export const mockData = mockDataProxy;
