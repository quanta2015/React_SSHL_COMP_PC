import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';
import KV from './mods/kv';

class KVList extends Component {
  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.removeIndex = this.removeIndex.bind(this);
  }

  add() {
    const { onChange, maxItems, value, dataSource } = this.props;
    if (maxItems === 0 || (maxItems !== 0 && value.length < maxItems)) {
      const newValue = value.slice();
      newValue.push({ key: dataSource[0].value });
      onChange(newValue);
    }
  }

  removeIndex(index) {
    const { value, onRemove } = this.props;
    onRemove([
      ...value.slice(0, index),
      ...value.slice(index + 1),
    ]);
  }

  changeValue(index, d) {
    const { value, onChange } = this.props;
    onChange([
      ...value.slice(0, index),
      { key: d.key, value: d.value },
      ...value.slice(index + 1),
    ]);
  }


  render() {
    const { className, dataSource, value } = this.props;
    return (
      <div className={classNames('cf-kv-list', className)}>

        {value.map((item, index) => {
          return (
            <KV
              dataSource={dataSource}
              index={index}
              className={item}
              value={item}
              key={index}
              onChange={this.changeValue}
              onRemove={this.removeIndex}
            />
);
        })}

        <div className="add"><Button onClick={this.add}>+新增条件</Button></div>
      </div>
    );
  }
}
KVList.displayName = 'CFKVList';
// KVList.propTypes = {
//   className: PropTypes.string,
//   value: PropTypes.arrayOf(
//     PropTypes.shape({
//       key: PropTypes.string,
//       value: PropTypes.string,
//     }),
//   ),
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
//   maxItems: PropTypes.number,
//   onChange: PropTypes.func,
//   onRemove: PropTypes.func,
// };
KVList.defaultProps = {
  className: '',
  onChange() { },
  onRemove() { },
};
export default KVList;
