import { Module } from "vuex";
import { Actions } from "./actions";
import { AccountState } from "./types";

export const AccountModule: Module<AccountState, object> = {
  actions: Actions,
}
