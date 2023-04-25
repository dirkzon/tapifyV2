import { Module } from "vuex";
import { Actions } from "./actions";
import { AccountState } from "./types";

export const accountModule: Module<AccountState, object> = {
  state: {},
  actions: Actions,
}
