import /* compose, */ { withProps } from 'recompose';

type EventName = string;
export interface WithEventArg {
  [callbackName: string]: EventName;
};

export const withEvent = (arg: WithEventArg) => {
  return withProps((ownerProps: any) => (
    Object.keys(arg).reduce((result, callbackName) => ({
      ...result,
      [callbackName](...args: any[]) {
        ownerProps.onEmit(arg[callbackName], ...args);
        return ownerProps[callbackName] && ownerProps[callbackName](...args);
      },
    }), {})
  ));
};