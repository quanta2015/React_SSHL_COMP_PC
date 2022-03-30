export default (params) => {
  const { parentId } = params;
  console.log(!parentId, 'parentId');
  if (!parentId) {
    return {
      data: {
        dataSource: [
          {
            key: '330108-S000351',
            label: '家校通讯录',
            type: 'school-root',
            iconType: 'org',
            isLeaf: false,
            params: null,
          },
        ],
      },
      success: true,
      code: '200',
      errorMsg: null,
    };
  }
  return {
    data: {
      dataSource: [
        {
          key: '5d8a464a621a11eb97de00163e084289',
          label: '产品校园校区',
          type: 'base-campus',
          iconType: 'dept',
          isLeaf: false,
          params: null,
        },
        {
          key: '5d9651d8621a11eb97de00163e084289',
          label: '产品校园校区1',
          type: 'base-campus',
          iconType: 'dept',
          isLeaf: false,
          params: null,
        },
        {
          key: '5da4c68c621a11eb97de00163e084289',
          label: '产品校园校区2课后服务',
          type: 'base-campus',
          iconType: 'dept',
          isLeaf: false,
          params: null,
        },
        {
          key: '5db597c8621a11eb97de00163e084289',
          label: '产品校园校区3',
          type: 'base-campus',
          iconType: 'dept',
          isLeaf: false,
          params: null,
        },
        {
          key: '5dcbda10621a11eb97de00163e084289',
          label: '产品校园校区4',
          type: 'base-campus',
          iconType: 'dept',
          isLeaf: false,
          params: null,
        },
        {
          key: '5ff43f6076234e03863580c4a79db3f7',
          label: '自定义校区',
          type: 'custom-campus',
          iconType: 'dept',
          isLeaf: false,
          params: null,
        },
      ],
    },
    success: true,
    code: '200',
    errorMsg: null,
  };
};
