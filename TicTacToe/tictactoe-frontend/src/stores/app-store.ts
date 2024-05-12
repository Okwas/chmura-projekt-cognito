/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StagesType } from '../types';
import { JOIN_GAME } from '../../../socket.messages';
import JoinDto from '../../../dto/game/join.input.dto';
import { createSocket } from '@/api/client';
import { User } from './user-store';


export interface AppStore {
  stage: StagesType,
  joinGame: (data: JoinDto, user: User) => void
  joinGameLoading: boolean,
  setStage: (stage: StagesType) => void
}

export let socket: any = null;

export const useAppStore = create<AppStore, [['zustand/devtools', never]]>(
  devtools((set, get) => ({
    stage: 'login',
    joinGameLoading: false,
    joinGame: (data: JoinDto, user:User) => {
        socket = createSocket(user);
        socket.emit(JOIN_GAME, data);
        set({joinGameLoading: true})
    },
    setStage: (stage: StagesType) => {
      set({stage: stage, joinGameLoading: false})
    }
  }))
);
