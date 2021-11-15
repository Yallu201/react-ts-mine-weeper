import { action, makeObservable, observable } from "mobx";
import { createContext, FC, useContext } from "react";
const ONE_SECOND = 1000;
export default class GameStore {
  __seconds: number = 0;
  __mineCount: number = 10;
  __interval: NodeJS.Timeout | null = null;
  constructor() {
    makeObservable(this, {
      __seconds: observable,
      __mineCount: observable,
      addSecond: action,
      start: action,
      reset: action,
    });
  }

  get seconds() {
    return this.__seconds;
  }
  get mineCount() {
    return this.__mineCount;
  }
  addSecond() {
    this.__seconds += 1;
  }
  start() {
    this.__interval = setInterval(this.addSecond, ONE_SECOND);
  }

  reset() {
    if (!this.__interval) return;
    clearInterval(this.__interval);
    this.__interval = null;
    this.__seconds = 0;
    this.__mineCount = 10;
  }
}

export const GameContext = createContext<GameStore>(new GameStore());
export const GameProvider: FC<{ store: GameStore }> = ({ store, children }) => {
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};
export const useGameStore = () => {
  return useContext(GameContext);
};
