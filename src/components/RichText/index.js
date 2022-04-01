import React, { useEffect, useState } from 'react';
import E from 'wangeditor';
import { message, Spin } from 'antd';
import url from '@/common/service-utils';
import request from '@/common/fileRequest';
import './index.less';
import './lib.less';

// import {emoji} from './img/emoji'

import { MENU_MAIN, MATLIB } from './lib';

const RICHTEXT_KEY = 'SSHL_RICHTEXT_KEY';

console.log(MATLIB, 'MATLIB');

const initData = (list) => {
  let ret = [];
  list.map((m, i) => {
    m.map((o, j) => {
      o.map((p, k) => {
        list[i][j][k] = { ...p, click: 0 };
        ret.push(list[i][j][k]);
      });
    });
  });
  return [list, ret];
};

const initLib = (_main, _his) => {
  _his = _his
    .sort((a, b) => {
      return a.click - b.click;
    })
    .slice(0, 10);
  return [...[[_his]], ..._main];
};

const decodeHis = () => {
  let ret = [];
  main.map((m, i) => {
    m.map((o, j) => {
      o.map((p, k) => {
        let { key, click, ...d } = p;
        ret.push(`${i}|${j}|${k}|${key}|${click}`);
      });
    });
  });
  window.localStorage.setItem(RICHTEXT_KEY, JSON.stringify(ret));
};

const encodeHis = () => {
  // 还原历史记录
  let list = JSON.parse(window.localStorage.getItem(RICHTEXT_KEY));

  list?.map((item, i) => {
    let d = item.split('|');
    let o = main[d[0]][d[1]][d[2]];
    let key = d[3];
    if (o.key === key) {
      o.click = d[4];
    }
  });

  // 重新计算使用频率
  let _his = [];
  main.map((m, i) => {
    m.map((o, j) => {
      o.map((p, k) => {
        _his.push(main[i][j][k]);
      });
    });
  });
  his = _his
    .sort((a, b) => {
      return b.click - a.click;
    })
    .slice(0, 10);

  let _lib = [...[[his]], ...main];
  return _lib;
};

var [main, his] = initData(MATLIB);
var LIB = initLib(main, his);
var editor = null;

const RichText = ({ value, onChange, appCode, requestUrl }) => {
  const [isInput, setIsInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sel, setSel] = useState(0);
  const [selSub, setSelsub] = useState(0);
  const [lib, setLib] = useState(LIB);

  const selMenu=(e,p)=> {
    p.stopPropagation()
    setSel(e)
    setSelsub(0)
  }

  const selSubMenu=(i,j,p)=> {
    p.stopPropagation()
    setSel(i)
    setSelsub(j)
  }


  useEffect(() => {
    // 初始化历史点击率
    setLib(encodeHis());

    editor = new E('#rich-text');
    editor.config.focus = true;
    editor.config.showLinkImg = false;
    editor.config.showLinkVideo = false;
    editor.config.uploadImgShowBase64 = true; // base 64 存储图片
    editor.config.uploadImgMaxSize = 50 * 1024 * 1024; // 上传图片大小2M
    editor.config.uploadVideoMaxSize = 200 * 1024 * 1024;
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    editor.config.uploadVideoAccept = ['mp4', 'MP4', 'AVI', 'avi'];
    editor.config.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间
    editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3'];
    editor.config.onchangeTimeout = 1000; // 修改为 500ms
    editor.config.uploadImgServer = `${
      requestUrl || url.file
    }/web/file/uploadReturnUrl`;
    // 限制一次最多上传 1 张图片
    editor.config.uploadImgMaxLength = 1;
    editor.config.uploadVideoServer = `${
      requestUrl || url.file
    }/web/file/uploadReturnUrl`;
    editor.config.customAlert = function (s, t) {
      switch (t) {
        case 'success':
          message.success(s);
          break;
        case 'info':
          message.info(s);
          break;
        case 'warning':
          message.warning(s);
          break;
        case 'error':
          message.error(s);
          break;
        default:
          message.info(s);
          break;
      }
    };
    editor.config.customUploadImg = function (files, insert) {
      setLoading(true);
      // files 是 input 中选中的文件列表
      if (files[0]) {
        const formData = new FormData();
        const { name } = files[0];
        formData.append('file', files[0], name);
        formData.append('success_action_status', '200');
        request(
          `${
            requestUrl || url.file
          }/web/file/uploadReturnUrl?appCode=${appCode}`,
          {
            method: 'POST',
            data: formData,
          },
        )
          .then((data) => {
            if (data) {
              // 上传代码返回结果之后，将图片插入到编辑器中
              insert(data);
              setLoading(false);
            }
          })
          .catch(() => {
            setLoading(false);
            message.error('上传失败');
          });
      } else {
        setLoading(false);
        // message.info('请选择要上传的图片');
      }
    };

    editor.config.customUploadVideo = function (files, insert) {
      setLoading(true);
      // files 是 input 中选中的文件列表
      if (files[0]) {
        const formData = new FormData();
        const { name } = files[0];
        formData.append('file', files[0], name);
        formData.append('success_action_status', '200');
        request(
          `${
            requestUrl || url.file
          }/web/file/uploadReturnUrl?appCode=${appCode}`,
          {
            method: 'POST',
            data: formData,
          },
        )
          .then((data) => {
            if (data) {
              // 上传代码返回结果之后，将图片插入到编辑器中
              insert(data);
              setLoading(false);
            }
          })
          .catch(() => {
            setLoading(false);
            message.error('上传失败');
          });
      } else {
        setLoading(false);
        // message.info('请选择要上传的图片');
      }
    };

    editor.config.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo', // 重复
    ];
    editor.config.lang = {
      设置标题: 'Title',
      字号: 'Size',
      文字颜色: 'Color',
      设置列表: 'List',
      有序列表: '',
      无序列表: '',
      对齐方式: 'Align',
      靠左: '',
      居中: '',
      靠右: '',
      正文: 'p',
      链接文字: 'link text',
      链接: 'link',
      上传图片: 'Upload',
      网络图片: 'Web',
      图片link: 'image url',
      插入视频: 'Video',
      格式如: 'format',
      上传: 'Upload',
      创建: 'init',
    };
    // 配置 onchange 回调函数
    editor.config.onchange = function (newHtml) {
      setIsInput(true);
      onChange(newHtml);
    };

    // 一定要创建
    editor.create();

    // for(let i=90;i<200;i++) {
    //   editor.cmd.do('insertHTML',`<img class="fn-emoji" src="${emoji[i]}">`)
    // }

    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor.destroy();

      // 保存历史点击率
      decodeHis();
    };
  }, []);

  useEffect(() => {
    if (editor && value && !isInput) {
      setTimeout(() => {
        editor.txt.html(value);
      }, 0);
    }
  }, [value]);

  const insert = (id, key) => {
    // console.log(`${sel} ${selSub} ${id}`)
    // console.log(key)

    let _his = [];
    main.map((m, i) => {
      m.map((o, j) => {
        o.map((p, k) => {
          // 判断是否是选择样式
          if (key === p.key) {
            // 0:常用  >0: others
            const _sel = sel === 0 ? sel : sel - 1;
            // console.log(main)
            const html = main[_sel][selSub][id].data;
            editor.cmd.do('insertHTML', html);

            if (sel < 6) {
              editor.txt.append('<br>');
            }

            // 点击计数器
            main[i][j][k].click++;
          }
          _his.push(main[i][j][k]);
        });
      });
    });
    // 排序取前10个
    _his = _his
      .sort((a, b) => {
        return b.click - a.click;
      })
      .slice(0, 10);
    let _lib = [...[[_his]], ...main];

    setLib(_lib);
  };

  console.log(`${sel} ${selSub} `);
  console.log(lib);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className="g-rt">
        <div className="m-bar">
          <div className="m-menu">
            {MENU_MAIN.map((item, i) => (
              <div
                key={i}
                className={i == sel ? 'm-item sel' : 'm-item'}
                onClick={selMenu.bind(this, i)}
              >
                {item.name}
                <div className="m-sub_menu">
                  {item.list.map((o, j) => (
                    <div
                      key={j}
                      className="m-sub"
                      onClick={selSubMenu.bind(this,i, j)}
                    >
                      {o.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="m-wrap">
            {lib[sel][sel === 0 ? 0 : selSub].map((item, i) => (
              <div
                className={sel < 6 ? 'm-sect' : 'm-sect m-emo'}
                key={i}
                dangerouslySetInnerHTML={{ __html: item.data }}
                onClick={insert.bind(this, i, item.key)}
              ></div>
            ))}
          </div>
        </div>

        <div id="rich-text" className="m-richtext" />
      </div>
    </Spin>
  );
};
export default RichText;
