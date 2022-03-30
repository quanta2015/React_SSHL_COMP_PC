/* eslint-disable no-shadow */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input, Icon } from 'antd';
import { get } from 'lodash';
import CFSelect from '../../select/index';
import comsMap from './coms-map';


class KV extends Component {
  constructor(props) {
    super(props);
    this.onRemove = this.onRemove.bind(this);
    this.keyChange = this.keyChange.bind(this);
    this.valueChange = this.valueChange.bind(this);
  }

  onRemove(item) {
    item.preventDefault();
    const { index } = this.props;
    this.props.onRemove(index, item);

    // if (confirm('确定要删除吗')) {
    //   this.props.onRemove(index, item);
    // }
  }

  keyChange(v) {
    const { onChange, index } = this.props;
    onChange(index, { key: v, value: '' });
  }

  valueChange(v) {
    const { value, onChange, index } = this.props;
    onChange(index, {
      key: get(value, 'key'),
      value: v,
    });
  }


  render() {
    const { className, dataSource, value } = this.props;

    const select = (
      <CFSelect
        dataSource={dataSource}
        onChange={this.keyChange}
        multiple={false}
        canInput={false}
        value={get(value, ['key'])}
      />
    );
    const Com = comsMap[get(dataSource.find(item => item.value === value.key), 'uiType', 'input')];

    const item = dataSource.find(item => item.value === value.key);

    return (
      <Input.Group className={classNames('cf-kv', className)}>
        <CFSelect
          dataSource={dataSource}
          onChange={this.keyChange}
          multiple={false}
          canInput={false}
          value={get(value, ['key'])}
        />
        <Com

          {...get(item, 'props', {})}
          value={get(value, ['value'])}
          onChange={this.valueChange}
        />
        <a onClick={this.onRemove} href="#" className="remove"><Icon type="ashbin" size="small" className="icon" /></a>
      </Input.Group>
    );
  }
}
KV.displayName = 'CFKV';
// KV.propTypes = {
//   className: PropTypes.string,
//   index: PropTypes.number,
//   value: PropTypes.shape(PropTypes.object),
//   dataSource: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string,
//       value: PropTypes.string,
//       uiType: PropTypes.string,
//       props: PropTypes.shape({
//         label: PropTypes.string,
//         value: PropTypes.string,
//       }),
//     }),
//   ),
//   onChange: PropTypes.func,
//   onRemove: PropTypes.func,
// };
KV.defaultProps = {
  onChange() { },
  onRemove() { },
};
export default KV;
