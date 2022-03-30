import OriginSelectUser from './select-user';
import {
  PropTypes,
  SelectUserFuncArgProps,
  SelectUserStaticFunctions,
  IlistItem,
  Value as ValueProps
} from './interface';
import show from './show';
type SelectUser = typeof OriginSelectUser & SelectUserStaticFunctions;
const SelectUser = OriginSelectUser as SelectUser;

SelectUser.show = function showFn(props: SelectUserFuncArgProps) {
  return show(props);
};

export { PropTypes, SelectUserFuncArgProps, ValueProps, IlistItem };

export default SelectUser;
