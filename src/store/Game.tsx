import { action, makeObservable, observable } from "mobx";
import { createContext, FC, useContext } from "react";
const ONE_SECOND = 1000;
export default class GameStore {
  __seconds: number = 0;
  __mineCount: number = 10;
  __interval: NodeJS.Timeout | null = null;
  __isGameOver: boolean = false;
  constructor() {
    makeObservable(this, {
      __seconds: observable,
      __mineCount: observable,
      addSecond: action,
      start: action,
      reset: action,
      gameOver: action,
    });
  }

  get seconds() {
    return this.__seconds;
  }
  get mineCount() {
    return this.__mineCount;
  }
  get isGameOver() {
    return this.__isGameOver;
  }
  addSecond() {
    this.__seconds += 1;
  }
  start() {
    if (this.__interval) return;
    this.__interval = setInterval(this.addSecond.bind(this), ONE_SECOND);
  }

  reset() {
    this.__interval = null;
    this.__seconds = 0;
    this.__mineCount = 10;
    this.__isGameOver = false;
    if (!this.__interval) return;
    clearInterval(this.__interval);
  }

  gameOver() {
    this.__isGameOver = true;
    if (!this.__interval) return;
    clearInterval(this.__interval);
  }
}

export const GameContext = createContext<GameStore>(new GameStore());
// .tsx 파일에서만 jsx 문법 사용가능
export const GameProvider: FC<{ store: GameStore }> = ({ store, children }) => {
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};
export const useGameStore = () => {
  return useContext(GameContext);
};
