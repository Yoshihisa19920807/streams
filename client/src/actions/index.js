import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = () => {
  // bindActionCreators is automatically called
  return {
    type: SIGN_IN
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}