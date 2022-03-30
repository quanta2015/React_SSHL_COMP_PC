import React, { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { Drawer, Skeleton } from 'antd';
// @ts-ignore
// import ImagesUpload from 'ss-images-upload';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import { RouteComponentProps , withRouter, generatePath } from 'react-router-dom';
import ComposeForm from '@/components/compose-form';
import { ButtonList } from '@/components/button';
import Net from '@/services';
import useAsyncEffect from '@/common/use-async-effect';
import comsMap from './coms-map';
import styles from './index.less';

export type Type = 'customer' | 'employee';
const REQUEST_URLS = {
  customer: {
    detail: '/user/customer/manage/detail',
    edit: '/contacts-v1/personnel-student-form/:userId',
    delete: '/user/customer/manage/batchDelete',
    items: '/user/customer/columns/getDetailFormColumns',
  },
  employee: {
    detail: '/user/employee/manage/detail',
    edit: '/contacts-v1/personnel-employee-form/:userId',
    delete: '/user/employee/manage/batchDelete',
    items: '/user/employee/columns/getDetailFormColumns',
  },
};

export default withRouter(({ history, route }: RouteComponentProps) => {
  const {
    visible,
    type,
    userId,
    params,
  }: {
    visible: boolean;
    type: Type;
    userId: string | number;
    params: any;
  } = useSelector((state) => state.personnel);
  const dispatch = useDispatch();
  const [controls, setControls] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [title, setTitle] = useState(null);
  const [requesting, setRequesting] = useState(true);
  const hideDlg = useCallback(() => {
    dispatch({ type: 'personnel/hide' });
  }, [visible]);
  const goEdit = useCallback(() => {
    const pathName = generatePath(REQUEST_URLS[type].edit, { userId });
    history.push(
      `${pathName}?redirecUrl=${encodeURIComponent(location.pathname)}`,
    );
    hideDlg();
  }, [userId, type, params]);

  useAsyncEffect(async () => {
    if (!visible || !userId) return;
    // 获取相应的表单项
    setRequesting(true);
    const {
      data: { dataSource },
    } = await Net.request(REQUEST_URLS[type].items, { method: 'GET' });
    setBaseData(dataSource);
    setControls(
      dataSource
        .filter((item: any) => {
          return item.name !== 'userName';
        })
        .filter((item: any) => {
          return item.name !== 'gender';
        })
        .filter((item: any) => {
          return item.name !== 'birthday';
        })
        .filter((item: any) => {
          return item.name !== 'avatar';
        }),
    );
    setRequesting(false);
  }, [visible, userId, type]);

  useAsyncEffect(async () => {
    if (!visible || !userId) return;
    const {
      data: { formValue },
    } = await Net.request(REQUEST_URLS[type]?.detail, {
      method: 'GET',
      data: { userId },
    });

    const arr: any = cloneDeep(formValue);
    if (arr) {
      delete arr.userName;
      delete arr.avatar;
      delete arr.gender;
      delete arr.birthday;
    }
    setTitle(formValue);
  }, [visible, userId, type]);

  const footer = useMemo(() => {
    // 后面条件是为了无管理员权限访问时，弹窗信息中不展示下面三个btn
    if (!type || history?.location?.pathname?.indexOf('-noper') !== -1) {
      return null;
    }
    return (
      <div className={styles.footerWrapper}>
        <ButtonList
          dataSource={[
            {
              text: '取消',
              onClick: hideDlg,
            },
            {
              uiType: 'request',
              text: '删除',
              confirmBeforeClick: {
                content: '您确认要删除该用户吗？',
              },
              request: {
                url: REQUEST_URLS[type].delete,
                method: 'PUT',
                data: { id: userId, idList: [userId], ...params },
              },
              onSuccess() {
                history.go(0);
              },
              buttonProps: { loading: requesting },
            },
            {
              uiType: 'default',
              text: '修改',
              onClick: goEdit,
              buttonProps: { loading: requesting, type: 'primary' },
            },
          ]}
        />
      </div>
    );
  }, [requesting, type, userId, hideDlg]);
  return (
    <Drawer
      style={{
        top: 'unset',
        right: visible ? '24px' : '-360px',
        bottom: '49px',
        height: '580px',
        width: '360px',
        transition: 'all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1)',
      }}
      mask={false}
      className={classNames(styles.detailModal, styles.userModal)}
      visible={visible}
      onClose={hideDlg}
      footer={footer}
      title={
        <div className="user-title-content">
          {
            baseData.find((item) => item.name === 'avatar') && null
            // <ImagesUpload key={title?.avatar} groupId={title?.avatar} edit={1} isAvatar />
          }

          <div className="user-info">
            <p className="user-name" title={title?.userName}>
              {title?.userName?.length > 8
                ? `${title?.userName?.substring(0, 7)}...`
                : title?.userName}
            </p>
            {baseData.find((item) => item.name === 'gender') && (
              <span>
                {title?.gender !== null || title?.birthday?.length > 0 ? (
                  <p className="user-card">
                    {title?.gender !== null ? (
                      <span className="user-gender">
                        {['女', '男'][title?.gender]}
                      </span>
                    ) : null}
                    <span>{title?.birthday}</span>
                  </p>
                ) : null}
              </span>
            )}
          </div>
        </div>
      }
    >
      {visible && (
        <>
          {requesting ? (
            <>
              <div>
                <Skeleton.Avatar active size="large" />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
              <div style={{ marginTop: 15 }}>
                <Skeleton.Input style={{ width: 100 }} active /> :
                <Skeleton.Input style={{ width: 150, marginLeft: 5 }} active />
              </div>
            </>
          ) : (
            <ComposeForm
              controls={controls}
              comsMap={comsMap}
              hideRequiredMark
              labelCol={{ span: 8 }}
              labelAlign="left"
              initialValuesRequest={{
                url: REQUEST_URLS[type]?.detail,
                method: 'GET',
                search: { userId, ...params },
              }}
            />
          )}
        </>
      )}
    </Drawer>
  );
});
