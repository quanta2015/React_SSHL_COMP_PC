import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { memoize } from 'lodash';

const { Group: TagGroup, Selectable: SelectableTag } = Tag;

const formatDataSource = memoize((dataSource = []) => {
  return dataSource.reduce((result, { activityCode, activityName, activityRoleName }) => {
    const _roleName = activityRoleName || '其他';
    return {
      ...result,
      [_roleName]: [
        ...(result[_roleName] || []), {
          value: activityCode,
          text: activityName,
        },
      ],
    };
  }, {});
});

export default class TagRadio extends Component {
  itemChangeHandler = memoize((name) => (checked) => {
    const value = checked ? name : null;
    this.props.onChange(value);
  })

  renderItems(activities) {
    return (
      <TagGroup>
        {
          activities.map(({ text, value }) => {
            return (
              <SelectableTag
                key={value}
                checked={value === this.props.value}
                onChange={this.itemChangeHandler(value)}
                size="small"
              >
                {text}
              </SelectableTag>
            );
          })
        }
      </TagGroup>
    );
  }

  render() {
    const { dataSource } = this.props;
    const roleMap = formatDataSource(dataSource);
    if (!dataSource || dataSource.length === 0) return <p>无</p>;
    return (
      <div className="cf-tag-radio">
        {
          Object.keys(roleMap).map((roleName) => {
            return (
              <div className="cf-tag-radio-item" key={roleName}>
                <div className="cf-tag-radio-label-wrap">
                  <label className="cf-tag-radio-label">{roleName}</label>
                </div>
                <div className="cf-tag-radio-content">
                  {this.renderItems(roleMap[roleName])}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
// TagRadio.propTypes = {
//   dataSource: PropTypes.arrayOf(PropTypes.shape({
//     activityCode: PropTypes.string,
//     activityName: PropTypes.string,
//     activityRoleName: PropTypes.string,
//   })),
//   onChange: PropTypes.func,
//   // 组件值——当前选中的 activityCode
//   value: PropTypes.string,
// };
TagRadio.defaultProps = {
  onChange() { },
};
