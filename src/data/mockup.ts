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
          // Log the data after it's fetched and added to the target
          console.log('MockData after fetching:', JSON.stringify(target, null, 2));
        })();
      }
    }

    return target[prop as keyof typeof target];
  },
});

export const mockData = mockDataProxy;

// Log the initial state of mockData
console.log('Initial mockData:', JSON.stringify(mockDataProxy, null, 2));

// Add a setTimeout to log the mockData after a short delay
setTimeout(() => {
  console.log('MockData after short delay:', JSON.stringify(mockDataProxy, null, 2));
}, 100);