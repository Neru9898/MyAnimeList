import { leftMenuOpen } from "./action";
export interface RootState {
  leftMenu: boolean;
}
const initValue = {
  leftMenu: false,
};
const rootReducer = (state = initValue, action: any) => {
  switch (action.type) {
    case "openMenu":
      return { ...state, leftMenu: !state.leftMenu };
    default:
      return { ...state };
  }
};

export default rootReducer;
