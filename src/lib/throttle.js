/** @flow */

export const throttle = (func: Function, time: number) => {
  let delayed = false;
  const noop = () => {};
  let delayedFunc = noop;
  return (...args: *[]) => {
    if (!delayed) {
      delayed = true;
      func(...args);
      setTimeout(() => {
        delayed = false;
        delayedFunc();
        delayedFunc = noop;
      }, time);
    } else {
      delayedFunc = () => func(...args);
    }
  };
};
