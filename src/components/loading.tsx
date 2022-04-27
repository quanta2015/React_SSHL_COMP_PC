import { Spin } from 'antd';
import { withProps } from 'recompose';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export default withProps((props: Props) => {
  return {
    wrapperClassName: classNames(props.className, 'global-loading'),
  };
})(Spin);
