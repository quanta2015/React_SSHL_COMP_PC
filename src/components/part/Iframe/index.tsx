/* eslint-disable @typescript-eslint/unbound-method */
import React, { Component } from 'react';
import './index.less';

export const ENV = (
  document.querySelector('meta[name="x-server-env"]') || { content: 'test' }
).content;

interface ItemProps {
  src?: any;
  testSrc?: any;
  productionSrc?: any;
  needPadding?: any;
  customizeWidth?: any;
  breStates?: any;
  screen?: boolean;
}
export default ({
  src,
  screen = false,
  testSrc,
  productionSrc,
  needPadding,
  customizeWidth,
  breStates = !0,
}: ItemProps) => {
  let actualSrc = src || productionSrc;
  if (window.location.host === 'newteacher.114school.com') {
    actualSrc = actualSrc.replace('t.ss', 'teacher.114school');
  }
  if (ENV === 'production' && productionSrc) {
    actualSrc = productionSrc;
  } else if (ENV !== 'production') {
    if (testSrc) {
      actualSrc = testSrc;
    } else {
      actualSrc = actualSrc
        .replace('x.ss', 'x-test.ss')
        .replace('https', 'http');
      if (!actualSrc.match('x-test.ss')) {
        actualSrc = actualSrc.replace('t.ss', 'u-test.ss');
      }
    }
  }

  // 顶部导航 56 面包屑 55 margin 48 padding 48
  const cardOutsideHeight = !breStates ? 152 : 207; // 无面包屑时 需要减去面包屑的高度 55

  return class IframeHOC extends Component {
    // iframe: React.RefObject<any>;
    // iframe: React.RefObject<unknown>;
    constructor(props) {
      super(props);

      this.state = {
        isIE: true,
        screen: false,
        calcHeight: document.body.offsetHeight - cardOutsideHeight,
      };

      this.iframe = React.createRef();
      this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.onWindowResize);

      // const elem = this.iframe.current;
      // var elem = this.iframe;

      // console.log(this.iframe.current, 'this.iframe');
      // this.requestFullScreen(elem);
    }

    requestFullScreen = () => {
      const element = this.iframe.current;
      // const { isIE, screen } = this.state;
      // this.setState({ screen: !screen });
      const requestMethod =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullScreen;
      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== 'undefined') {
        const wscript = new ActiveXObject('WScript.Shell');
        if (wscript !== null) {
          wscript.SendKeys('{F11}');
        }
      }
    };

    componentWillUnmount() {
      window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
      this.setState({
        calcHeight: document.documentElement.clientHeight - cardOutsideHeight,
      });
    }

    render() {
      // const { height } = this.props;
      // const { isIE } = this.state;
      // let { calcHeight } = this.state;
      // if (isIE) {
      //   calcHeight = 2000;
      // }

      return (
        // <PageHeaderWrapper wrapperClassName={styles.root}>
        <div className="root">
          {screen && (
            <div className="btn">
              <img
                onClick={this.requestFullScreen}
                src="https://s.ss.com/file/8b8e68fb-f2c2-4497-8c74-58e6dc298ec6.svg"
                alt=""
              />
            </div>
          )}

          {/* <Card
            bordered={false}
            style={{
              height: `${height || calcHeight}px`
            }}
            className={cls}
          > */}

          <iframe
            ref={this.iframe}
            id="mainFrame"
            title="iframe"
            className="iframe-wrapper"
            src={actualSrc}
            // style={{
            //   height: isIE ? '2000px' : '100%',
            //   width: '100%'
            // }}

            allowFullScreen="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            oallowfullscreen="true"
            msallowfullscreen="true"
            name="mapFrame"
            scrolling="no"
            frameBorder="0"
            // frameBorder="0"
            // scrolling="auto"
          />

          {/* </Card> */}
        </div>
        // </PageHeaderWrapper>
      );
    }
  };
};
