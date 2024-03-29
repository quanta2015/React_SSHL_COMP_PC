import tl_01 from './img/tl_01.svg';
import tl_02 from './img/tl_02.svg';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.webp';
import img4 from './img/img4.png';
import img5 from './img/img5.webp';
import img6 from './img/img6.png';

const importAll = (r) => {
  let images = [];
  r.keys().map((item, index) => {
    let img = `<img class="fn-emoji" src="${r(item)}">`;
    images.push({ key: item.replace('./', ''), data: img });
  });
  return images;
};

export const MENU_MAIN = [
  { name: '常用', list: [{ name: '常用样式' }, { name: '常用表情' }] },
  {
    name: '标题',
    list: [
      { name: '基础标题' },
      { name: '框线标题' },
      { name: '图片标题' },
      { name: '底色标题' },
      { name: '符号标题' },
    ],
  },
  {
    name: '卡片',
    list: [
      { name: '基础卡片' },
      { name: '框线卡片' },
      { name: '底色卡片' },
      { name: '底纹卡片' },
      { name: '对话/问答' },
      { name: '轴线卡片' },
    ],
  },
  {
    name: '图片',
    list: [
      { name: '基础图片' },
      { name: '单图' },
      { name: '双图' },
      { name: '三图' },
      { name: '多图' },
      { name: '圆形图' },
      { name: '背景图' },
    ],
  },
  {
    name: '布局',
    list: [
      { name: '基础布局' },
      { name: '表格' },
      { name: '上下滑动' },
      { name: '左右滑动' },
    ],
  },
  {
    name: '组件',
    list: [
      { name: '分割线' },
      { name: '分隔符' },
      { name: '关注原文' },
      { name: '二维码' },
    ],
  },
  {
    name: 'EMOJI',
    list: [
      { name: '表情' },
      { name: '手势' },
      { name: '头像' },
      { name: '动作' },
      { name: '动物' },
      { name: '食物' },
      { name: '交通' },
      { name: '时间天气' },
      { name: '日常A' },
      { name: '日常B' },
      { name: '标志' },
      { name: '国旗' },
    ],
  },
];

/* --- 组件 --- */
// 基础标题
const _TL_BASE = [
  { key: 'tlbs001', data: `<div class='fn-tl_bs_1'>标题级别 1</div>` },
  { key: 'tlbs002', data: `<div class='fn-tl_bs_2'>标题级别 2</div>` },
  { key: 'tlbs003', data: `<div class='fn-tl_bs_3'>标题级别 3</div>` },
  { key: 'tlbs004', data: `<div class='fn-tl_bs_4'>请输入正文</div>` },
  {
    key: 'tlbs005',
    data: `<div class='fn-tl_bs_5'><li>符号列表</li><li>符号列表</li></div>`,
  },
  {
    key: 'tlbs006',
    data: `<pre class='fn-tl_bs_6'><code>printf(\`hello world!\`);</code></pre>`,
  },
  { key: 'tlbs007', data: `<div class='fn-tl_bs_7'><em>请输入标题</em></div>` },
  { key: 'tlbs008', data: `<div class='fn-tl_bs_8'><em>描边文字</em></div>` },
  { key: 'tlbs009', data: `<div class='fn-tl_bs_9'><em>描边文字</em></div>` },
  { key: 'tlbs010', data: `<div class='fn-tl_bs_10'><em>输入标题</em></div>` },
  { key: 'tlbs011', data: `<div class='fn-tl_bs_11'><em>简单阴影</em></div>` },
];

// 框线标题
const _TL_LINE = [
  { key: 'tlli001', data: `<div class='fn-tl_li_1'><em>世界气象日</em></div>` },
  {
    key: 'tlli002',
    data: `<div class="fn-tl_li_2">
                <div class="m-lt">
                  <em><section>目录/contents</section></em>
                </div>
                <div class="m-rt"></div>
              </div>`,
  },
  {
    key: 'tlli003',
    data: `<div class="fn-tl_li_3">
                <div class="m-wd">
                  <em><section>清</section></em>
                </div>
                <div class="m-wd">
                  <em><section>明</section></em>
                </div>
              </div>`,
  },
  {
    key: 'tlli010',
    data: `<div class='fn-tl_li_10'><div><section>交通安全日</section></div></div>`,
  },
  {
    key: 'tlli011',
    data: `<div class='fn-tl_li_11'><div class='m-lt'><section>人民英雄</section></div><div class='m-rt'><section>永垂不朽</section></div></div>`,
  },
  {
    key: 'tlli012',
    data: `<div class='fn-tl_li_12'><div class='m-tl'><div><section><section>师</section></section></div><div><section><section>恩</section></section></div><div><section><section>如</section></section></div><div><section>海</section></div></div><div class='m-ft'>THANKS GIVING DAY</div></div>`,
  },
  {
    key: 'tlli013',
    data: `<div class='fn-tl_li_13'><div class='m-ct'><section>露凝 · 云散</section></div></div>`,
  },
  {
    key: 'tlli014',
    data: `<div class='fn-tl_li_14'><i>01</i><div class='m-bd'><section>迎建党百年</section></div></div>`,
  },
  {
    key: 'tlli015',
    data: `<div class='fn-tl_li_15'><div><section>运动，让生命更精彩</section></div></div>`,
  },
  {
    key: 'tlli016',
    data: `<div class='fn-tl_li_16'><i><section>Part 1</section></i><div class='m-bd'><section>今夜偏知春气暖</section></div></div>`,
  },
  {
    key: 'tlli017',
    data: `<div class='fn-tl_li_17'><div><section>政务工作汇报</section></div></div>`,
  },
  {
    key: 'tlli018',
    data: `<div class='fn-tl_li_18'><div><section>暑期冲刺班</section></div></div>`,
  },
  {
    key: 'tlli019',
    data: `<div class='fn-tl_li_19'>
        <div class='m-bg'>SUMMER</div>
        <div class='m-bd'><section>立/夏时/节</section></div
        ><div class='m-ft'>SUMMER TIME</div>
        </div>`,
  },
  {
    key: 'tlli020',
    data: `
    <div class='fn-tl_li_20'>
      <div class='my-bg'> 
        <div class='m-plus'><section>+<section></div>
        <em>输入标题</em> 
      </div> 

    </div>
    `,
  },
  {
    key: 'tlli021',
    data: `
    <div class='fn-tl_li_21'>

      <div class='m-ob'> 
        <div class='m-ib'><section><em>输入标题</em> <section></div>
        
      </div> 

    </div>
    `,
  },
  {
    key: 'tlli022',
    data: `
    <div class='fn-tl_li_22'>

      <div class='m-bk'> 
        SUMMER
      </div> 
      <div class='m-m'>
        炎炎夏日
      </div>

    </div>
    `,
  },
  {
    key: 'tlli023',
    data: `
    <div class='fn-tl_li_23'>

      <div class='m-bk'> 
      </div> 
      <div class='m-ft'> 
        万物清明
      </div> 
      <div class='m-ls'>
      /念故人
      </div>

    </div>
    `,
  },
  {
    key: 'tlli024',
    data: `
    <div class='fn-tl_li_24'>

      <div class='m-lt'> 
          <div class='m-dot'></div>
      </div> 
      <div class='m-md'> 
        <section>中国航天日</section>
      </div> 
      <div class='m-lt'>
          <div class='m-dot'></div>
      </div>

    </div>
    `,
  },
  {
    key: 'tlli025',
    data: `
    <div class='fn-tl_li_25'>

      <div class='m-lt'> 
        <section>1</section>
      </div> 
      <div class='m-md'> 
        <section>中国航天日</section>
      </div> 
      <div class='m-rt'>
          <div class='m-dt'></div>
      </div>

    </div>
    `,
  },
  {
    key: 'tlli026',
    data: `
    <div class='fn-tl_li_26'>
        <div class='m-m'>
              <div class="m-hd">
                  <div class="m-lt">Grain Rain</div>
                  <div class="m-rt">
                      <section><em>谷雨时节</em>/萍始生</section>

                  </div>
              </div> 
        </div>

    </div>
    `,
  },
  {
    key: 'tlli027',
    data: `
    <div class='fn-tl_li_27'>
        <div><div class="m-num">00</div><section>通用标题</section></div>

    </div>
    `,
  },
  {
    key: 'tlli028',
    data: `
    <div class='fn-tl_li_28'>
        <div class="m-bg">
            <div class="m-rd_l"></div>
            <div class="m-curve">
                <div class="u-cr_r"></div>
                <div class="u-cr_l"></div>
            </div>
            <div class="m-rd_r"></div>
        </div>

        <div class="m-bd"><i>PANTONE长春花篮</i></div>
        <div class="m-ft"><i>PANTONE CATHARANTHUS BLUE</i></div>

    </div>
    `,
  },
  {
    key: 'tlli029',
    data: `
    <div class='fn-tl_li_29'>

    <div class="m-bg">
      <div class="m-ln"></div>
      <div class="m-tr">
        <div class="m-el"></div>
        <div class="m-hide"></div>
      </div>
    </div>
    <div class="m-bd">
      <section class="m-top"><i>冬日的</i></section>
      <section class="m-btm"><i>美好时光</i></section>
    </div>

    </div>
    `,
  },
  {
    key: 'tlli030',
    data: `
    <div class='fn-tl_li_30'>

    <div class="m-num">
      <section><i>00</i></section>
    </div>
    <div class="m-bd">  
      <section>长春花蓝</section>
    </div>

    </div>
    `,
  },
  
];

// 图片标题
const _TL_IMG = [
  {
    key: 'tlim001',
    data: `<div class='fn-tl_im_1'><img src=${tl_02} ><div class='m-lt'><em>所思日记</em></div><div class='m-rt'><div class='m-tp'><img src=${tl_01}><em>32℃</em></div><div class='m-bt'>2022年 3月18日</div></div></div>`,
  },
  {
    key: 'tlim002',
    data: `<div class="fn-tl_im_2">
                <div class="m-rt">
                  <em><section>铭记历史</section></em>
                </div>
                <img class="m-cen" src=${img1} alt="">
                <div class="m-rt">
                  <em><section>勿忘国耻</section></em>
                </div>
              </div>`,
  },
  {
    key: 'tlim003',
    data: `<div class="fn-tl_im_3">
                <img src=${img1}>
                <div class="m-wd">
                  <div class="m-ct">
                    <em><section>惊蛰</section></em>
                  </div>
                  <div class="m-lt">
                    <em><section>目录/contents</section></em>
                  </div>
              </div>
            </div>`,
  },
  {
    key: 'tlim004',
    data: `<div class="fn-tl_im_4">
                <div class="m-hb"></div>
                <div class="m-hs"></div>
                <div class="m-ct">
                  <em><section>情人节快乐<section></em>
                </div>
              </div>`,
  },
  {
    key: 'tlim005',
    data: `<div class="fn-tl_im_5">
                <div class="m-lt"></div>
                <div class="m-rt">
                  <em><section>世界艾滋病日</section></em>
                </div>
              </div>`,
  },
  {
    key: 'tlim010',
    data: `<div class='fn-tl_im_10'><div class='m-bd'><em><section>ON</section></em><em><section>SALE</section></em></div></div>`,
  },
  {
    key: 'tlim011',
    data: `<div class='fn-tl_im_11'><div class='m-tl'><em><section>20</section></em><em><section>22</section></em></div><div><section><section>元旦快乐</section></section></div><img src=${img3} ></div>`,
  },
  {
    key: 'tlim012',
    data: `<div class='fn-tl_im_12'><div class='m-img'><img src=${img4} ></div><section><section>WHITE DEW</section></section></div>`,
  },
  {
    key: 'tlim013',
    data: `<div class='fn-tl_im_13'><div><img src=${img3} ><section><section>01</section></section></div></div>`,
  },
  {
    key: 'tlim014',
    data: `<div class='fn-tl_im_14'><div class='m-tl'><em><section>2</section></em><em><section>心有猛虎，细嗅蔷薇</section></em></div><img src=${img3} ></div>`,
  },
  {
    key: 'tlim015',
    data: `
    <div class='fn-tl_im_15'>
      <div class='m-bk'>
        <div class='m-txt'>
          <div><em>清明</em></div>  
          <section>QING MING</section>
        </div>
        
      </div>
    </div>`,
  },
  {
    key: 'tlim016',
    data: `
    <div class='fn-tl_im_16'>
      <div class='m-bk1'>
        <div><em>贰</em></div>
      </div>
      <div class='m-bk2'>
      </div>
        
      
    </div>`,
  },
];

// 底色标题
const _TL_BCOL = [
  {
    key: 'tlbc001',
    data: `<div class='fn-tl_bc_1'><em>向雷锋同志学习</em><div><i></i><label>学雷锋纪念日</label><i></i></div></div>`,
  },
  {
    Key: 'tlbc002',
    data: `<div class="fn-tl_bc_2">
                <div class="m-cen">
                  <em>聚焦两会 · 关注民生</em>
                </div>
              </div>`,
  },
  {
    key: 'tlbc010',
    data: `<div class='fn-tl_bc_10'><div class='m-tl'><section>● HAPPY NEW YEAR ●</section></div><div class='m-bd'><div><section>年会倒计时</section></div><div><em><section>05</section></em><em><section>天</section></em></div></div>`,
  },
  {
    key: 'tlbc011',
    data: `<div class='fn-tl_bc_11'><section class='m-lt'><p>3</p></section><section class='m-bd'><p>●</p></section><section class='m-ft'><p>15</p></section></div>`,
  },
  {
    key: 'tlbc012',
    data: `<div class='fn-tl_bc_12'><div><section>养</section></div><div><section>生</section></div><div><section>之</section></div><div><section>道</section></div></div>`,
  },
  {
    key: 'tlbc013',
    data: `<div class='fn-tl_bc_13'><div class='m-ct'><div><section>霜降</section></div><div><section>First Frost</section></div></div></div>`,
  },
  {
    key: 'tlbc014',
    data: `<div class='fn-tl_bc_14'><div><section>过了腊八就是年</section></div></div>`,
  },
  {
    key: 'tlbc015',
    data: `<div class='fn-tl_bc_15'><div class='m-lt'><div><section><section>白<section></section></div><em><section>09.07</section></em><em><section>2021</section></em></div><div class='m-rt'><div><section><section>露</section></section></div></div></div>`,
  },
  {
    key: 'tlbc016',
    data: `<div class='fn-tl_bc_16'><div><section><section>峥嵘岁月，初心不改</section></section></div></div>`,
  },
  {
    key: 'tlbc017',
    data: `<div class='fn-tl_bc_17'><div class='m-font'><section>端</section></div><em><section>DUAN</section></em><em><section>WU</section></em><div class='m-font'><section>午</section></div></div>`,
  },
  {
    key: 'tlbc018',
    data: `<div class='fn-tl_bc_18'><div class='m-sq'><div></div><div></div><div></div><div></div></div><div class='m-bd'><section>赛事时间表</section></div></div>`,
  },
  {
    key: 'tlbc019',
    data: `<div class='fn-tl_bc_19'><div class='m-bd'><section><section>春季校园招聘</section></section><div class='m-cr'><div></div></div></div></div>`,
  },
  {
    key: 'tlbc020',
    data: `
    <div class='fn-tl_bc_20'>
          <div class='m-ft'>
            <div class='m-lt'>中国航天日</div>
            <div class='m-rt'>/ Space Day Of China</div>
          
          </div>
    </div>
    `,
  },
  {
    key: 'tlbc021',
    data: `
    <div class='fn-tl_bc_21'>
          <div class='m-ft'>
            <div class='m-lt'>聚焦两会 · 关注民生</div>
          
          </div>
    </div>
    `,
  },
  {
    key: 'tlbc022',
    data: `
    <div class='fn-tl_bc_22'>
        <div class='m-m'>
          <div class='m-lt'></div>
          <div class='m-bf'></div>
          <div class='m-rt'>
            
            <div class='m-wd'>聚焦两会 · 关注民生</div>
            
          </div>
          <div class='m-af'></div>
        </div>
    </div>
    `,
  },
  {
    key: 'tlbc023',
    data: `
    <div class='fn-tl_bc_23'>
        <div class='m-m'>
          <div class='m-bf'>
            <div class='m-lt'></div>
            <div class='m-rt'></div>
          </div>
          <div class='m-bd'>
            
            <div class='m-wd'>项目 | 高山滑雪</div>
            
          </div>
          <div class='m-af'>
            <div class='m-lt'></div>
            <div class='m-rt'></div>
          </div>
        </div>
    </div>
    `,
  },
  {
    key: 'tlbc024',
    data: `
    <div class="fn-tl_bc_24">
        <div class="m-num"><div class="m-bg"><section>00</section></div></div>
        <div class="m-tl"><section>次级标题</section></div>
    </div>
    `,
  },
  {
    key: 'tlbc025',
    data: `
    <div class='fn-tl_bc_25'>
        <div>
            <section>00</section>
            <div class="m-bc m-btm"></div><div class="m-bc m-top"></div><div class="m-rd"></div>
        </div>
    </div>
    `,
  },
];

// 符号标题
const _TL_SYM = [
  {
    key: 'tlsy001',
    data: `<div class='fn-tl_sy_1'><i></i><em>1</em><i></i></div>`,
  },
  {
    key: 'tlsy002',
    data: `<div class="fn-tl_sy_2">
                <div class="m-lt">
                  <div class="m-lt-wd1">
                    <section>圣</section>
                  </div>
                  <div class="m-lt-wd2">
                    <section>诞</section>
                  </div>
                  <div class="m-lt-wd1">
                    <section>快</section>
                  </div>
                  <div class="m-lt-wd2">
                    <section>乐</section>
                  </div>
                  <div class="m-lt-wd3">
                    <em><section>/ CHRISTMAS 12.25</section></em>
                  </div>
                </div>
              </div>`,
  },
  {
    key: 'tlsy003',
    data: `<div class="fn-tl_sy_3">
                <div class="m-rt"></div>
                <div class="m-cen"></div>
                <div class="m-lt">
                  <em><section>面对疫情 不必恐慌</section></em>
                </div>
              </div>`,
  },
  {
    key: 'tlsy010',
    data: `<div class='fn-tl_sy_10'><div class='m-bd'><section><section>今夜偏知春气暖</section></section></div></div>`,
  },
  {
    key: 'tlsy011',
    data: `<div class='fn-tl_sy_11'><section><section>立冬时节知多少</section></section></div>`,
  },
  {
    key: 'tlsy012',
    data: `<div class='fn-tl_sy_12'><div> <section>生命在于运动</section></div></div>`,
  },
  {
    key: 'tlsy013',
    data: `<div class='fn-tl_sy_13'><section>Winter</section><div class='m-cr'></div></div>`,
  },
  {
    key: 'tlsy014',
    data: `<div class='fn-tl_sy_14'><div class='m-tc'></div><em><section>COLD DEW</section></em><div class='m-bc'></div></div>`,
  },
  {
    key: 'tlsy015',
    data: `<div class='fn-tl_sy_15'><section><strong> ● </strong><strong>疫情快讯</strong><strong> ● </strong></section></div>`,
  },
  {
    key: 'tlsy016',
    data: `<div class='fn-tl_sy_16'><div><section>这是一个简单的动态标题</section></div></div>`,
  },
  {
    key: 'tlsy017',
    data: `<div class='fn-tl_sy_17'><div><em><section>万水千山 ,<strong>粽是情</strong></section></em></div></div>`,
  },
  {
    key: 'tlsy018',
    data: `<div class='fn-tl_sy_18'><div></div><section><section>安全提示</section></section></div>`,
  },
  {
    key: 'tlsy019',
    data: `<div class='fn-tl_sy_19'><div class='m-tl'></div><div class='m-bd'><em><section><section>今日</section></section></em><em><section><section>看点</section></section></em></div></div>`,
  },
  {
    key: 'tlsy020',
    data: 
    `
    <div class='fn-tl_sy_20'>
      <div class='m-bk'>
        清新春天风
      </div>

    </div>
    `,
  },
  {
    key: 'tlsy021',
    data: 
    `
    <div class='fn-tl_sy_21'>
      <div class='m-m'>
        <div class='m-lt'></div>
        <div class='m-md'>Earth Hour</div>
        <div class='m-lt'></div>
      </div>
    </div>
    `,
  },
  {
    key: 'tlsy022',
    data: 
    `
    <div class='fn-tl_sy_22'>

      <div class="m-hd">
        <div class="m-m">

          <div class='m-lt'>
            <div class='m-tri'></div>
            <div class='m-tri'></div>
            <div class='m-tri'></div>
          </div>

          <div class='m-rt'>
            <div class='m-big'>机动车检验标志电子化</div>
          </div>

        </div>
      </div>
    </div>
    `,
  },
  {
    key: 'tlsy023',
    data: 
    `
    <div class='fn-tl_sy_23'>

      <div class="m-hd">
        <div class="m-m">
          <div class='m-lt'></div>
          <div class='m-lt'></div>
          <div class='m-md'>面对疫情 不必恐慌</div>
          <div class='m-rt'></div>
          <div class='m-rt'></div>
        </div>
      </div>
    </div>
    `,
  },
];

const _TL = [_TL_BASE, _TL_LINE, _TL_IMG, _TL_BCOL, _TL_SYM];

/* --- 卡片 --- */
// 基础卡片
const _CD_BASE = [
  {
    key: 'cdbs001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'cdbs002',
    data: `<div class='fn-cd_bs_2'><label>请输入标题</label><em>但凡认真思考过自己的生活，想必谁都会希望活得更愉悦、美好。为了追求更好的品质、更美的东西而痛下功夫，这就是我们认为的真正意义上的时尚。</em></div>`,
  },
  {
    key: 'cdbs010',
    data: `<div class='fn-cd_bs_10'><div><div>任何时代，美好之物都与金钱和闲暇无关。创造出最美之物的，总是那些经过打磨的感知力，着眼于日常生活的目光，以及不懈努力的双手。</div></div></div>`,
  },
  {
    key: 'cdbs011',
    data: `<div class='fn-cd_bs_11'><div><section>不可以伪装，不允许欺骗，因为无时无刻不在接受考验，不遵守正直之徳，就无法成为美好的物品。<section></div></div>`,
  },
  {
    key: 'cdbs012',
    data: `<div class='fn-cd_bs_12'><div><section>选中一个模板，出现的黑色方框标志着选中的范围。插入新模板、收藏、复制，都是针对黑色方框进行操作。</section></div></div>`,
  },
  {
    key: 'cdbs013',
    data: `<div class='fn-cd_bs_13'><div><section>衣服，若是离开穿它的人，离开人的身体、心，还有生活，便没有什么好看的了。</section></div></div>`,
  },
  {
    key: 'cdbs014',
    data: `<div class='fn-cd_bs_14'><div><section>昨天是这么做的，所以今天也一样。别人是这样的，所以自己也一样。这也许轻松，但没有活过的意义。</section></div></div>`,
  },
  {
    key: 'cdbs015',
    data: `<div class='fn-cd_bs_15'><div><section>ctrl+home可以快速回到编辑区顶部选中编辑区的正文段落，再点击剪贴板里面的一个内容，会有格式刷的效果。</section></div></div>`,
  },
  {
    key: 'cdbs016',
    data: `<div class='fn-cd_bs_16'><div><section>请输入文字</section></div></div>`,
  },
  {
    key: 'cdbs017',
    data: `<div class='fn-cd_bs_17 fn-cd_bs_16'><div><section>请输入文字</section></div></div>`,
  },
  {
    key: 'cdbs018',
    data: `
    <div class='fn-cd_bs_18'>
      <div><section>蝉鸣是夏天的标志。少了它的鸣叫，就少了一份乐趣，就少了一场动人的音乐会。</section></div>
    </div>
    `,
  },
  {
    key: 'cdbs019',
    data: `
    <div class='fn-cd_bs_19'>
      <div><section>虽然我们都认为，唯有天才方能造出伟大的作品，但今天我想说，无名的工人同样能够制造出毫不逊色的杰作。</section></div>
    </div>
    `,
  },
  {
    key: 'cdbs020',
    data: `
    <div class='fn-cd_bs_20'>
      <div><section>虽然我们都认为，唯有天才方能造出伟大的作品，但今天我想说，无名的工人同样能够制造出毫不逊色的杰作。</section></div>
    </div>
    `,
  },
  {
    key: 'cdbs021',
    data: `
    <div class='fn-cd_bs_21'>

      <div>
          <div></div>
          <section>不希望人手的技艺被封存，是因为手艺能培养对美的意识。在自身周围，在人与人的联结中，在这社会中，让我们思考何为美、何为丑。</section>
          <div></div>
    
      </div>
    </div>
    `,
  },
];

// 框线卡片
const _CD_LINE = [
  {
    key: 'cdli001',
    data: `<div class='fn-cd_li_1'><div class="m-tl">机动车检验标志电子化</div><div class="m-bd"><li>公安部在16个城市试点基础上，在全国分两批推广机动车检验标志电子化，为机动车所有人、驾驶人以及相关行业和管理部门提供电子证照服务。</li>
              <li>公安部在16个城市试点基础上，在全国分两批推广机动车检验标志电子化，为机动车所有人、驾驶人以及相关行业和管理部门提供电子证照服务。</li></div></div>`,
  },
  {
    key: 'cdli002',
    data: `<div class="fn-cd_li_2">
                <img src=${img2}>
                <div class="m-ct">
                  <div class="m-wd1">
                    <em><section>清</section></em>
                  </div>
                  <div class="m-wd">
                    <em><section>明</section></em>
                  </div>
                </div>
                <div class="m-bt">
                  <em>清明节，又称踏青节、行清节、三月节、祭祖节等，节期在仲春与暮春之交。清明节源自上古时代的祖先信仰与春祭礼俗，兼具自然与人文两大内涵，既是自然节气点，也是传统节日。</em>
                </div>
              </div>`,
  },
  {
    key: 'cdli003',
    data: `<div class="fn-cd_li_3">
                <div class="m-ab"></div>
                <div class="m-tp">
                  <em>3.15</em></div>
                <div class="m-bt">
                  <em>国际消费者权益日是每年的3月15日，由国际消费者联盟组织于1983年确定，目的在于扩大消费者权益保护的宣传。</em>
                  <em>国际消费者权益日是每年的3月15日，由国际消费者联盟组织于1983年确定，目的在于扩大消费者权益保护的宣传。</em>
                </div>
              </div>`,
  },
  {
    key: 'cdli004',
    data: `<div class="fn-cd_li_4"><div class="m-tp"><div class="m-tp-lt"></div><div class="m-tp-rt"></div></div><div class="m-cen"><p>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化。</p><br><p>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化。</p></div><div class="m-bt"><div class="m-bt-lt"></div><div class="m-bt-rt"></div></div></div>`,
  },
  {
    key: 'tlli005',
    data: `<div class="fn-cd_li_5"><div class="m-lt"><em>目录/contents</em></div><div class="m-rt"></div></div>`,
  },
  {
    key: 'cdli010',
    data: "<div class='fn-cd_li_10'><div class='m-bd'><li>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</li><li>由于两场会议会期基本重合，而且对于国家运作的重要程度都非常的高，故简称做“两会”。</li><li>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</li></div></div>",
  },
  {
    key: 'cdli011',
    data: `<div class='fn-cd_li_11'><div><section>01</section></div><section>雷锋精神是中华民族传统美德的一种积淀，是一种随着时代进步而不断发展的与时俱进的精神。</section></div>`,
  },
  {
    key: 'cdli012',
    data: `<div class='fn-cd_li_12'> <div class='m-tl'><div>THANKSGIVING</div><div>DAY</div></div><em>感恩节是美国人民独创的一个古老节日，也是美国人合家欢聚的节日。 初时感恩节没有固定日期，由美国各州临时决定。直到美国独立后的1863年，林肯总统宣布感恩节为全国性节日 。</em><div class='m-ft'><div></div><div></div><div></div><div></div></div></div>`,
  },
  {
    key: 'cdli013',
    data: `<div class='fn-cd_li_13'> <div class='m-ig'><img src=${img2} ></div><div class='m-ct'><div><section>面对疫情 不必恐慌</section></div><div>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验，取得了来之不易的重大成果。统筹推进疫情防控和经济社会发展工作，抓紧恢复生产生活秩序，更是让我国成为2020年全球唯一实现经济正增长的主要经济体。</div></div>  </div>`,
  },
  {
    key: 'cdli014',
    data: "<div class='fn-cd_li_14'><div class='m-tl'><section><section>星辰大海，永不止步</section></section></div><em>浪漫的名字里印刻着中国航天人的艰苦付出、无私奉献，致敬。骄傲，致敬，为中国航天人点赞，我们的征途是星辰大海！可上九天揽月，可下五洋捉鳖，星辰大海，永不止步。致敬为中国航天事业奋斗的所有科研人员，祝福中国航天。</em></div>",
  },
  {
    key: 'cdli015',
    data: "<div class='fn-cd_li_15'><div class='m-bd'><section>中国互联网企业100强榜单主要参考互联网企业年度发展数据，评价指标既覆盖收入、利润、人力资本等财务指标，也覆盖流量、活跃用户数等业务指标。数据统计采用了计算复合指标的方法，计算得出各家企业在企业规模、社会影响、发展潜力和社会责任四个维度上的得分，加权平均后确定排名。</section></div></div>",
  },
  {
    key: 'cdli016',
    data: "<div class='fn-cd_li_16'><div class='m-tl'></div><div class='m-bd'><section>中国互联网企业100强榜单主要参考互联网企业年度发展数据，评价指标既覆盖收入、利润、人力资本等财务指标，也覆盖流量、活跃用户数等业务指标。数据统计采用了计算复合指标的方法，计算得出各家企业在企业规模、社会影响、发展潜力和社会责任四个维度上的得分，加权平均后确定排名。</section></div></div>",
  },
  {
    key: 'cdli017',
    data: "<div class='fn-cd_li_17'><em><section>2021/09/03</section></em><div class='m-tl'><section>抗日战争胜利纪念日</section></div><div class='m-bd'><section>中国人民抗日战争胜利纪念日，是每个中国人都该铭记的日子。铭记历史，吾辈自强！我们从未遗忘！如今，硝烟散去，和平安宁，然而曾经那段血泪写就的过去不能忘，那场不屈不挠的抗争不敢忘。铭记历史，吾辈自强！我们从未遗忘！</section></div></div>",
  },
  {
    key: 'cdli018',
    data: "<div class='fn-cd_li_18'><div class='m-tl'><section>生命在于运动</section></div><em>排球场地设备简单，比赛规则容易掌握。既可在球场上比赛和训练，亦可以在一般空地上活动，运动量可大可小，适合于不同年龄、不同性别、不同体质、不同训练程度的人。</em><div class='m-ft'><div></div></div></div>",
  },
  {
    key: 'cdli019',
    data: "<div class='fn-cd_li_19'><div><section>愚人节。节期为公历4月1日，是从19世纪开始在西方兴起流行的民间节日，并未被任何国家认定为法定节日。在这一天人们以各种方式互相欺骗和捉弄，往往在玩笑的最后才揭穿并宣告捉弄对象为“愚人”。</section></div></div>",
  },
  {
    key: 'cdli020',
    data: `
    <div class="fn-cd_li_20">
      <div class="m-bk">
      <section><em>人生是一次旅行，在旅程中遇到的每一个人、每一件事，都有可能成为一生中难忘的风景。</em></section>

      </div>
    </div>
    `,
  },
  {
    key: 'cdli021',
    data: `
    <div class="fn-cd_li_21">
      <div class="m-bk">
        <div class='m-lt'>
          <div class='m-cir'><em>1</em></div>

        </div>
        <div class='m-rt'>
          <div class='m-big'>世界地球日</div>
          <div class='m-sml'>The World Earth Day</div>
          
        </div>

      </div>
      <div class='m-bt'>
        <div class = 'm-txt'>
          <section><em>世界地球日即每年的4月22日，是一个专为世界环境保护而设立的节日，旨在提高民众现有环境问题的意识。</em></section>
        </div>
      </div>
    </div>
    `,
  },
  {
    key: 'cdli022',
    data: `
    <div class="fn-cd_li_22">
      <div class="m-hd">
        <div class="m-m">

          <div class='m-lt'>
            <div class='m-tr'></div>
            <div class='m-tr'></div>
            <div class='m-tr'></div>
          </div>

          <div class='m-rt'>
            <div class='big'>今日要闻</div>
          </div>

        </div>
      </div>

      <div class='m-bd'>
        <div class='m-tl'>
          <section><em>公安部在16个城市试点基础上，在全国分两批推广机动车检验标志电子化。</em></section>
        </div>
        <div class = 'm-m'>
          <div class='m-line'>
            <div class='m-d'>
              <div class = 'num'>1</div>
              <div class = 'dot'>></div>
              <section>公安部在16个城市试点基础上，在全国分两批推广机动车检验标志电子化，为机动车所有人。</section>
            </div>
            <div class='m-d'>
              <div class = 'num'>2</div>
              <div class = 'dot'>></div>
              <section>公安部在16个城市试点基础上，在全国分两批推广机动车检验标志电子化，为机动车所有人。</section>
            </div>
          </div>
          <div class='m-line'>
            <div class='m-d'>
              <div class = 'num'>3</div>
              <div class = 'dot'>></div>
              <section>公安部在16个城市试点基础上，在全国分两批推广机动车检验标志电子化，为机动车所有人。</section>            
            </div>
            <div class='m-d'>
              <div class = 'num'>4</div>
              <div class = 'dot'>></div>
              <section>公安部在16个城市试点基础上，在全国分两批推广机动车检验标志电子化，为机动车所有人。</section>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
  },
  {
    key: 'cdli023',
    data: `
    <div class="fn-cd_li_23">
      <div class='fn-tl_li_24'>

        <div class='m-lt'> 
            <div class='m-dot'></div>
        </div> 
        <div class='m-md'> 
          <section>SPACE DAY OF CHINA</section>
        </div> 
        <div class='m-lt'>
            <div class='m-dot'></div>
        </div>

      </div>
      <div class='m-bd'>
        <div class='m-wd'><section>中国航天日，是为了纪念中国航天事业成就，发扬中国航天精神而计划设立的一个纪念日。首个航天日，习主席要求科学家帮助实现中国成为全球天空巨头的梦想。</section></div>
        <div class='m-wd'><section>中国航天日，是为了纪念中国航天事业成就，发扬中国航天精神而计划设立的一个纪念日。首个航天日，习主席要求科学家帮助实现中国成为全球天空巨头的梦想。</section></div>
      </div>

    </div>
    `,
  },
  {
    key: 'cdli024',
    data: `
    <div class="fn-cd_li_24">
        <div class="m-tl">
          <section>四</section>
          <section>字</section>
          <section>标</section>
          <section>题</section>
          <div></div>
        </div>
        <div class="m-bd">
          <div class="txt">这些所谓的“兼职”信息往往是通过短视频、网络等媒介发布，兼职刷单100%为诈骗，求职者要通过正规渠道查询招聘单位的信息，查看是否有工商登记信息，避免上当受骗。</div>
        </div>

    </div>
    `,
  },
];

// 底色卡片
const _CD_BCOL = [
  {
    key: 'cdbc001',
    data: `<div class='fn-cd_bc_1'><i>1</i><div>植树节是按照法律规定宣传保护树木，并组织动员群众积极参加以植树造林为活动内容的节日。提倡通过这种活动，激发人们爱林造林的热情、意识到环保的重要性。</div></div>`,
  },
  {
    key: 'cdbc002',
    data: `<div class="fn-cd_bc_2"><div class="m-tp"></div><div class="m-bt"><em>植树节是按照法律规定宣传保护树木，并组织动员群众积极参加以植树造林为活动内容的节日。提倡通过这种活动，激发人们爱林造林的热情、意识到环保的重要性。</em></div></div>`,
  },
  {
    key: 'cdbc010',
    data: `<div class='fn-cd_bc_10'>
                    <div class='m-tl'>
                      <label><section><section>项目 | 高山滑雪</section></section></label>
                      <div class='m-bd'><img src=${img2}></div>
                      <section>2015年07月31日17时57分，国际奥委会第128次全会在吉隆坡举行，投票选出2022年冬奥会举办城市。</section>
                      <section>2015年07月31日17时57分，国际奥委会第128次全会在吉隆坡举行，投票选出2022年冬奥会举办城市。</section>
                    </div>
                  </div>`,
  },
  {
    key: 'cdbc011',
    data: `<div class='fn-cd_bc_11'>
                  <img src=${img2}>
                <div class='m-bd'>
                  <em><section>雷锋精神是中华民族传统美德的一种积淀，是一种随着时代进步而不断发展的与时俱进的精神。</section></em>
                  </div>
              </div>`,
  },
  {
    key: 'cdbc012',
    data: `<div class='fn-cd_bc_12'><div class='m-tl'><section>01</section><div><em><section>在招岗位</section></em><em><section>2022 RECRUIT /</section></em></div></div><em><section>2022年校园招聘会即将开始，为满足各用人单位校园招聘的需求，帮助我校求职同学找到心仪的工作。2022年校园招聘会即将开始，为满足各用人单位校园招聘的需求，帮助我校求职同学找到心仪的工作，现对2021年校园招聘相关事宜进行如下安排。</section></em></div>`,
  },
  {
    key: 'cdbc013',
    data: `<div class='fn-cd_bc_13'><div class='m-img'><img src=${img3}></div><em><section>1986年1月10日，广州市公安局率先建立我国第一个110报警服务台，正式开展110接处警工作。1987年6月，公安部发文要求各大中城市公安局在一两年内普遍建立110报警服务台，尽快投入使用。自此，110报警电话正式发展成为110报警服务台。</section></em><div class='m-ft'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`,
  },
  {
    key: 'cdbc014',
    data: `<div class='fn-cd_bc_14'><div class='m-tl'>澳门回归 | 纪念日</div><em><section>1986年1月10日，广州市公安局率先建立我国第一个110报警服务台，正式开展110接处警工作。1987年6月，公安部发文要求各大中城市公安局在一两年内普遍建立110报警服务台，尽快投入使用。自此，110报警电话正式发展成为110报警服务台。</section></em></div>`,
  },
  {
    key: 'cdbc015',
    data: `<div class='fn-cd_bc_15'><div class='m-tl'><section><section>大寒</section></section></div><section>大寒，是二十四节气中的最后一个节气。斗指丑；太阳黄经达300°；于每年公历1月20—21日交节。</section><section>于每年公历1月20—21日交节；大寒同小寒一样，也是表示天气寒冷程度的节气，大寒是天气寒冷到极致的意思。</section></div>`,
  },
  {
    key: 'cdbc016',
    data: `<div class='fn-cd_bc_16'><div class='m-tl'><section>全年工作总结</section></div><em><section>1986年1月10日，广州市公安局率先建立我国第一个110报警服务台，正式开展110接处警工作。1987年6月，公安部发文要求各大中城市公安局在一两年内普遍建立110报警服务台，尽快投入使用。自此，110报警电话正式发展成为110报警服务台。</section></em></div>`,
  },
  {
    key: 'cdbc017',
    data: `<div class='fn-cd_bc_17'><em><section>119</section></em><div class='m-bd'><div><section>//</section><section>注意防火</section><section>//</section></div><em>时光荏苒，不知不觉中，紧张繁忙的一年即将过去，或颓废，或激情。在过去2021年工作中，在公司领导的带领下，严格按照各项工作流程展开工作，恪尽职守，目标明确。</em></div></div>`,
  },
  {
    key: 'cdbc018',
    data: `<div class='fn-cd_bc_18'><div class='m-bd'><section>清明节，又称踏青节、行清节、三月节、祭祖节等，节期在仲春与暮春之交。清明节源自上古时代的祖先信仰与春祭礼俗，兼具自然与人文两大内涵，既是自然节气点,也是传统节日。</section></div></div>`,
  },
  {
    key: 'cdbc019',
    data: `
    <div class='fn-cd_bc_19'>
      <div class='m-m'>
        <div class='m-hd'>
          <div class='m-cir'>世</div>
          <div class='m-cir'>界</div>
          <div class='m-cir'>读</div>
          <div class='m-cir'>书</div>
          <div class='m-cir'>日</div>

        </div>
        <div class='m-bd'>
          <section>4月23日世界读书日全称“世界图书与版权日”，又称“世界图书日”。1995年11月15日正式确定每年4月23日为“世界图书日”。其设立目的是推动更多的人去阅读和写作，希望所有人都能尊重和感谢为人类文明做出过巨大贡献的文学、文化、科学、思想大师们，保护知识产权。</section>
        </div>

        <div class='m-ft'>读书使人进步</div>
      </div>
    </div>
    `,
  },
  {
    key: 'cdbc020',
    data: `
    <div class='fn-cd_bc_20'>
      <div class='m-m'>
        <div class='m-bk'>

          

          <div class='m-bd'>
            <div class='m-lt'>
              <section class='m-big'>1.10</section>
              <section class='m-sml'>Jan.</section>
            </div>

            <div class='m-rt'>
                <div class='m-hd'>
                  <section><em>2022.1.10</em></section>
                </div> 
                <div class='m-bd'>
                  <section>
                  <em>1986年1月10日，广州市公安局率先建立我国第一个110报警服务台，正式开展110接处警工作。1987年6月，公安部发文要求各大中城市公安局在一两年内普遍建立110报警服务台，尽快投入使用。自此，110报警电话正式发展成为110报警服务台。</em>
                  </section>
                </div>
            </div>
          </div>
          

          
        </div>
        
      </div>
    </div>
    `,
  },
  {
    key: 'cdbc021',
    data: `
    <div class='fn-cd_bc_21'>
      <div class='m-m'>
          <div class='m-hd1'>

          </div> 
          <div class='m-hd'>
            <section><em>如何申请法律援助</em></section>
          </div> 

          <div class='m-m'>
            <div class='m-lt'>
              <div class='m-tri'></div>
            </div>
            <div class='m-bd'>
              
              <section>
              <em>由政府设立的法律援助机构或者非政府设立的合法律所组织法律援助的律师。为经济困难或特殊案件的人尤其是农村给予无偿提供法律服务的一项法律保障制度。</em>
              </section>
              
            </div>
            <div class='m-rt'>
              <div class='m-tri'></div>
            </div>
          </div>
        </div>
    </div>
    `,
  },
  {
    key: 'cdbc022',
    data: `
    <div class='fn-cd_bc_22'>
      <div class='m-m'>


            <div class='m-bd'>
              
              <div class='m-txt'>
              <section>
              <em>中国航天日，是为了纪念中国航天事业成就，发扬中国航天精神而计划设立的一个纪念日。设立“中国航天日”，就是要铭记历史、传承精神，激发全民尤其是青少年崇尚科学、探索未知、敢于创新的热情。</em>
              </section>
              </div>
            </div>

      </div>

    </div>
    `,
  },
  {
    key: 'cdbc023',
    data: `
    <div class='fn-cd_bc_23'>
      <div class="m-m">

          <div class="m-hd">
              <div class="m-lt">#3</div>
              <div class="m-rt">
                  <section>雨生百谷</section>
              </div>
          </div>
          <div class="m-nk">
              <section>Grain Rain, One of The Twenty-Four Solar Terms</section>
          </div>
          <div class="m-bd">

              <section>谷雨是二十四节气的第六个节气，也是春季最后一个节气，每年4月19日～21日时太阳到达黄经30°时为谷雨，源自古人“雨生百谷”之说。同时也是播种移苗、埯瓜点豆的最佳时节。</section>
          </div>


      </div>

    </div>
    `,
  },
  {
    key: 'cdbc024',
    data: `
    <div class='fn-cd_bc_24'>
      <div class="m-m">

          <div class="m-hd">
              <div class="m-lt">惊蛰</div>
              <div class="m-rt">2022.03.05</div>
          </div>

          <div class="m-bd">

              <section>
                <div class='m-dot'></div>
                ​时至惊蛰，阳气上升、气温回暖、春雷乍动、雨水增多，万物生机盎然。农耕生产与大自然的节律息息相关。
              </section>
              <section>
                <div class='m-dot'></div>
                惊蛰节气在农耕上有着相当重要的意义，它是古代农耕文化对于自然节令的反映。
              </section>

          </div>


      </div>

    </div>
    `,
  },
  {
    key: 'cdbc025',
    data: `
    <div class='fn-cd_bc_25'>
    <div class='fn-co_fo_16'>
      <div class='m-lt'> 
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
      </div> 
      <div class='m-md'> 
        <section>惊蛰，又名“启蛰”，是二十四节气中的第三个节气。斗指丁，太阳到达黄经345°，于公历3月5－6日交节。惊蛰反映的是自然生物受节律变化影响而出现萌发生长的现象。</section>
      </div> 
      <div class='m-lt'>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
      </div>
    </div>

    </div>
    `,
  },
];

// 底纹卡片
const _CD_PATT = [
  {
    key: 'cdpa001',
    data: `<div class='fn-cd_bc_1 fn-cd_pa_1 '><i>1</i><div>植树节是按照法律规定宣传保护树木，并组织动员群众积极参加以植树造林为活动内容的节日。提倡通过这种活动，激发人们爱林造林的热情、意识到环保的重要性。</div></div>`,
  },
  {
    key: 'cdpa002',
    data: `<div class="fn-cd_pa_2"><div class="m-cen"><em><section>从最开始对新冠痘情的猝不及防，到全民抗疫的众志成城、共克时艰，从最开始对新冠疫情的蠡不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验，取得了来之不易的重大成果。</section></em></div></div>`,
  },
  {
    key: 'cdpa003',
    data: `<div class="fn-cd_pa_3">
                    <div class="m-ct"></div>
                    <div class="m-wd">
                        <em>凉风至，白露生</em><em>寒蝉鸣</em><em>夏色藏云天，秋声动木叶</em><em>所有丰收,</em><em>都是对耕种的犒赏</em><em>一叶一报秋，绵柔话丰收</em><em>立秋雨淋淋，遍地是黄金</em>
                    </div>
                  </div>`,
  },
  {
    key: 'cdpa004',
    data: `<div class="fn-cd_pa_4"><img src=${img3}><div class="m-ct"><em><section>立 / 夏 / 时 / 节</section></em><div class="m-ct-ct"></div><em><section>SUMMER TIME</section></em></div></div>`,
  },
  {
    key: 'cdpa005',
    data: `<div class="fn-cd_pa_5">
                  <div class="m-ct">
                      <em><section>小年通常被视为忙年的开始，意味着人们开始准备年货、扫尘、祭灶等，准备干干净净过个好年，表达了人们—种辞旧迎新、迎祥纳福的美好愿望。由于各地风俗不同，被称为"小年"的日子也不尽相同。</section></em>
                  </div>
                </div>`,
  },
  {
    key: 'cdpa010',
    data: `<div class='fn-cd_pa_10 '><div><li>任教高中语文，目前担任XX教育“十人课堂”语文老师，深受学生、家长的喜爱。任教高中语文，目前担任XX教育“十人课堂”语文老师，深受学生、家长的喜爱。</li></div></div>`,
  },
  {
    key: 'cdpa011',
    data: `<div class='fn-cd_pa_11 '><div><section>小年通常被视为忙年的开始，意味着人们开始准备年货、扫尘、祭灶等，准备干干净净过个好年，表达了人们一种辞旧迎新、迎祥纳福的美好愿望。由于各地风俗不同，被称为“小年”的日子也不尽相同。</section></div></div>`,
  },
  {
    key: 'cdpa012',
    data: `<div class='fn-cd_pa_12 '><div class='m-tl'><em><section>人物简介</section></section></em><em><section><section>/profile/</section></section></em></div><div class='m-bd'><section>任教高中语文，目前担任“十人课堂”语文老师，所谓“知人而善教”。提倡在教学的同时深入了解学生，意在培养学生成长、成才，教会学生守正树德，昂扬自信。</section></div></div>`,
  },
  {
    key: 'cdpa013',
    data: `<div class='fn-cd_pa_13 '><img src=${img3}><div><em>1</em><section><section>时光荏苒，不知不觉中，紧张繁忙的半年即将过去，或颓废，或激情。过去半年的工作中，在公司领导的带领下，严格按照各项工作流程展开工作，恪尽职守，目标明确。</section></section></div></div>`,
  },
  {
    key: 'cdpa014',
    data: `<div class='fn-cd_pa_14 '><img src=${img3}><div><em>SUMMARY</em></div><section><section>时光荏苒，不知不觉中，紧张繁忙的半年即将过去，或颓废，或激情。过去半年的工作中，在公司领导的带领下，严格按照各项工作流程展开工作，恪尽职守，目标明确。</section></section></div>`,
  },
  {
    key: 'cdpa015',
    data: `
    <div class='fn-cd_pa_15 '>
      <div>
        <div class='text'><li>任教高中语文，目前担任XX教育“十人课堂”语文老师，深受学生、家长的喜爱。任教高中语文，目前担任XX教育“十人课堂”语文老师，深受学生、家长的喜爱。</li></div>

      </div>
    </div>
    `,
  },
  {
    key: 'cdpa016',
    data: `
    <div class='fn-cd_pa_16'>
      <div>
        <div class='text'><li>艾蒿一束，飘幸福清香，绕着你；香粽一串，携甜蜜相伴，围着你；香囊一个，表情意万千，粘着你；龙舟一盏，载顺利清风，念着你。端午节到了，愿你生活里粽有幸福和甜蜜，粽有情意和顺利。</li></div>

      </div>
    </div>
    `,
  },
];

// 对话/问答
const _CD_QUES = [
  {
    key: 'cdqu001',
    data: `<div class='fn-cd_qu_1'><div class="m-q"><div>两会是指什么会议？</div></div><div class="m-a"><div>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。<br>由于两场会议会期基本重合，而且对于国家运作的重要程度都非常的高，故简称做“两会”。</div></div></div>`,
  },
  {
    key: 'cdqu002',
    data: `<div class="fn-cd_qu_2">
                <div class="m-tp">
                  <div class="m-tp-lt">
                    <em><section>聚焦</section></em>
                  </div>
                  <div class="m-tp-rt">
                    <em><section>两会是指什么会议？</section></em>
                  </div>
                </div>
                <div class="m-bt">
                  <div class="m-bt-tp">
                    <em>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</em>
                  </div>
                  <div class="m-bt-cen">
                    <em>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</em>
                  </div>
                  <div class="m-bt-bt">
                    <em><section>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</section></em>
                  </div>
                </div>
              </div>`,
  },
  {
    key: 'cdqu003',
    data: `<div class='fn-cd_qu_3'>
                  <div class="m-wd">
                      <em class='m-wd-tp'><section>面对疫情 不必恐慌</section></em>
                      <em><section>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验。</section></em>
                  </div>
                  <div class="m-wd">
                      <em class='m-wd-tp'>面对疫情 不必恐慌</em>
                      <em><section>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验。</section></em>
                  </div>
                  <div class="m-wd">
                      <em class='m-wd-tp'><section>面对疫情 不必恐慌</section></em>
                      <em><section>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验。</section></em>
                  </div>
                </div>`,
  },
  {
    key: 'cdqu010',
    data: `<div class='fn-cd_qu_10'>
              <div class='m-q'><div>面对疫情 不必恐慌</div></div>
              <div class='m-a'><div><div>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验。</div></div></div>
          </div>`,
  },
  {
    key: 'cdqu011',
    data: `<div class='fn-cd_qu_11'><em>Q</em><div></div></div>`,
  },
  {
    key: 'cdqu012',
    data: `<div class='fn-cd_qu_12'><div><section>请输入文字</section></div></div>`,
  },
  {
    key: 'cdqu013',
    data: `<div class='fn-cd_qu_13'><div class='m-img'><img src=${img3}></div><div class='m-bd'><section><section>输入对话输入对话<section></section></div></div>`,
  },
  {
    key: 'cdqu014',
    data: `<div class='fn-cd_qu_14'><div><em>输入文字输入文字</em><em>输入文字输入文字</em></div></div>`,
  },
  {
    key: 'cdqu015',
    data: `
    <div class='fn-cd_qu_15'>
      <div class="main">

        <div class="head">
          <div class="left">Q1</div>
          <div class="right">什么是人口普查？</div>
        </div>
        <div class="neck">
          <div class="triangle"></div>
        </div>

        <div class="body">
        <section>人口普查是重大的国情国力调查，涉及每一个人、每一个家庭以及社会的各个方面。2020年11月1日零时，第七次全国人口普查开始。（人民日报）</section>
        </div>
      </div>


    </div>
    `,
  },
  {
    key: 'cdqu016',
    data: `
    <div class='fn-cd_qu_16'>
      <div class="main">

          <div class="head">
              <div class="left">A</div>
              <div class='middle'>
                  <div class='triangle'></div> 
              </div>
              <div class="right">
                  <section>国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开。</section>
              </div>
          </div>
      </div>

      <div class="else">

          <div class="head">
              <div class="right">
                  <section>国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开。</section>
              </div>
              <div class='middle'>
                  <div class='triangle'></div> 
              </div>
              <div class="left">B</div>
          </div>

      </div>
    </div>

    
    `,
  },
  {
    key: 'cdqu017',
    data: `
    <div class='fn-cd_qu_17'>
      <div class="main">

          <div class="head">

              <div class='middle'>
                  <div class='triangle'></div> 
              </div>
              <div class="right">
                  <section>输入文字输入文字</section>
              </div>
          </div>
      </div>

      <div class="else">

          <div class="head">
              <div class="right">
                  <section>输入文字输入文字</section>
              </div>
              <div class='middle'>
                  <div class='triangle'></div> 
              </div>

          </div>

      </div>
    </div>

    
    `,
  },
  {
    key: 'cdqu018',
    data: `
    <div class='fn-cd_qu_18'>
      <div class="main">

          <div class="head">

          </div>
          <div class="body">

              <div class='on'>
                  <section>输入标题</section>
              </div>
              <div class="under">
                  <section>输入文字</section>
              </div>
          </div>          

      </div>
    </div>
    `,
  },
  
  
];

// 轴线卡片
const _CD_AXIS = [
  {
    key: 'cdax001',
    data: `<div class='fn-cd_ax_1'><div class="m-ax"><div class="m-tl"><em>立春</em> <label>二十四节气之一</label></div><div class="m-bd"><div>立春，为二十四节气之首。立，是“开始”之意；春，代表着温暖、生长。<br>二十四节气最初是依据“斗转星移”制定，当北斗七星的斗柄指向寅位时为立春。</div></div></div><div class="m-ax"><div class="m-tl"><em>立春</em> <label>二十四节气之一</label></div><div class="m-bd"><div>立春，为二十四节气之首。立，是“开始”之意；春，代表着温暖、生长。<br>二十四节气最初是依据“斗转星移”制定，当北斗七星的斗柄指向寅位时为立春。</div></div></div><div class="m-ax"><div class="m-tl"><em>立春</em> <label>二十四节气之一</label></div><div class="m-bd"><div>立春，为二十四节气之首。立，是“开始”之意；春，代表着温暖、生长。<br>二十四节气最初是依据“斗转星移”制定，当北斗七星的斗柄指向寅位时为立春。</div></div></div></div>`,
  },
  {
    key: 'cdax010',
    data: `<div class='fn-cd_ax_10'><div class="m-tl"><section>01</section></div><div class='m-bd'>地球一小时是世界自然基金会应对全球气候变化所提出的一项全球性节能活动，提倡于每年三月的最后一个星期六当地时间晚上20:30。</div></div>`,
  },
  {
    key: 'cdax011',
    data: `<div class='fn-cd_ax_11'><div><em><section>1</section></em><label><section>春雷乍动</section></label></div><div><section>时至惊蛰，阳气上升、气温回暖、春雷乍动、雨水增多，万物生机盎然。农耕生产与大自然的节律息息相关。</section></div><div><em><section>2</section></em><label><section>春雷乍动</section></label></div><div><section>时至惊蛰，阳气上升、气温回暖、春雷乍动、雨水增多，万物生机盎然。农耕生产与大自然的节律息息相关。</section></div><div><em><section>3</section></em><label><section>春雷乍动</section></label></div><div><section>时至惊蛰，阳气上升、气温回暖、春雷乍动、雨水增多，万物生机盎然。农耕生产与大自然的节律息息相关。</section></div></div>`,
  },
  {
    key: 'cdax012',
    data: `<div class='fn-cd_ax_12 fn-cd_li_10'><div class='m-bd'><li>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</li><li>由于两场会议会期基本重合，而且对于国家运作的重要程度都非常的高，故简称做“两会”。</li><li>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</li></div></div>`,
  },
  {
    key: 'cdax013',
    data: `<div class='fn-cd_ax_13'><div><em><section>01</section></em><label>高山滑雪</label></div><div><section>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</section></div><div><em><section>02</section></em><label>高山滑雪</label></div><div><section>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</section></div><div><em><section>03</section></em><label>高山滑雪</label></div><div><section>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</section></div></div>`,
  },
  {
    key: 'cdax014',
    data: `<div class='fn-cd_ax_14 fn-tl_im_13'>
        <div><img src=${img3} ><section><section>01</section></section>
        </div>
        <div><section>据第二次世界大战结束后远东国际军事法庭和南京军事法庭的有关判决和调查，在大屠杀中有20万以上乃至30万以上中国平民和战俘被日军杀害。</section></div>
        
        <div><img src=${img3} ><section><section>01</section></section>
        </div>
        <div><section>据第二次世界大战结束后远东国际军事法庭和南京军事法庭的有关判决和调查，在大屠杀中有20万以上乃至30万以上中国平民和战俘被日军杀害。</section></div>
        
        <div><img src=${img3} ><section><section>01</section></section></div>
        
        <div><section>据第二次世界大战结束后远东国际军事法庭和南京军事法庭的有关判决和调查，在大屠杀中有20万以上乃至30万以上中国平民和战俘被日军杀害。</section></div></div>`,
  },
  {
    key: 'cdax015',
    data: `<div class='fn-cd_ax_15'><div><em><section>01</section></em><div><section>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</section></div></div><div><em><section>02</section></em><div><section>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</section></div></div><div><em><section>03</section></em><div><section>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</section></div></div></div>`,
  },
  {
    key: 'cdax016',
    data: `
    <div class='fn-cd_ax_16'>
      <div class="m-m">

          <div class="m-hd">
              <div class="m-lt">01</div>
          </div>
          <div class="m-nk">
              <section>协会会员每年召开一次地区论坛</section>
          </div>
          <div class="m-bd">
              <div class="m-lt">
                  <section>通过采取发行刊物及举办会议的形式，协会提供法律领域发展的最新动态，并积极解决阻碍民主、和平发展的问题。</section>
              </div>
          </div>

          <div class='m-ft'>
          </div>
      </div>
    </div>
    `,
  },
  {
    key: 'cdax017',
    data: `
    <div class='fn-cd_ax_17'>
      <div class="m-m">
        <div class='m-hd'>
          <div class='m-lt'></div>
          <div class='m-md'>Earth Hour</div>
          <div class='m-lt'></div>
        </div>
        <div class='m-bd'>
          <section>地球一小时是世界自然基金会应对全球气候变化所提出的一项全球性节能活动，提倡于每年三月的最后一个星期六当地时间晚上20:30。</section>
        </div>
      </div>
    </div>
    `,
  },
  {
    key: 'cdax018',
    data: `
    <div class='fn-cd_ax_18'>
      <div class="m-m">
        <div class='m-hd'>
            <div class='m-hd'>
                <div class='m-lt'></div>
                <div class='m-rt'>01 聚焦时间点 </div>
            </div>
            <div class='m-bd'>
                <div class='m-rt'>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</div>
            </div>

        </div>
        <div class='m-hd'>
            <div class='m-hd'>
                <div class='m-lt'></div>
                <div class='m-rt'>01 聚焦时间点 </div>
            </div>
            <div class='m-bd'>
                <div class='m-rt'>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</div>
            </div>
        </div>
        <div class='m-hd'>
            <div class='m-hd'>
                <div class='m-lt'></div>
                <div class='m-rt'>01 聚焦时间点 </div>
            </div>
            <div class='m-bd'>
                <div class='m-rt'>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</div>
            </div>   
        </div>
      </div>
    </div>
    `,
  },
  {
    key: 'cdax019',
    data: `
    <div class='fn-cd_ax_19'>
      <div class="m-m">
        <div class='m-hd'>
            <div class='m-hd'>
                <div class='m-lt'>五四青年节  为青春高歌</div>
                <div class='m-rt'></div>
                <div class='m-bt'></div>
            </div>
            <div class='m-bd'>
                <div class='m-rt'>五四青年节源于中国1919年反帝爱国的“五四运动”，五四爱国运动是一次彻底的反对帝国主义和封建主义的爱国运动。</div>
            </div>

        </div>
        <div class='m-hd'>
            <div class='m-hd'>
                <div class='m-lt'>五四青年节  为青春高歌</div>
                <div class='m-rt'></div>
                <div class='m-bt'></div>
            </div>
            <div class='m-bd'>
                <div class='m-rt'>五四青年节源于中国1919年反帝爱国的“五四运动”，五四爱国运动是一次彻底的反对帝国主义和封建主义的爱国运动。</div>
            </div>

        </div>
        <div class='m-hd'>
            <div class='m-hd'>
                <div class='m-lt'>五四青年节  为青春高歌</div>
                <div class='m-rt'></div>
                <div class='m-bt'></div>
            </div>
            <div class='m-bd'>
                <div class='m-rt'>五四青年节源于中国1919年反帝爱国的“五四运动”，五四爱国运动是一次彻底的反对帝国主义和封建主义的爱国运动。</div>
            </div>

        </div>
    </div>
    `,
  },
  {
    key: 'cdax020',
    data: `
        <div class="fn-cd_ax_20">
            <div class="m-bd">
                <div class="m-tl"><section>做好疫情防控</section><div></div></div>
                <div class="m-txt">我们相信前路光明，阴霾终会散去，我们定同舟共济,风雨共度一切都会好起来。我们相信前路光明，阴霾终会散去，我们定同舟共济,风雨共度一切都会好起来。</div>
            </div>
            <div class="m-bd">
                <div class="m-tl"><section>做好疫情防控</section><div></div></div>
                <div class="m-txt">我们相信前路光明，阴霾终会散去，我们定同舟共济,风雨共度一切都会好起来。我们相信前路光明，阴霾终会散去，我们定同舟共济,风雨共度一切都会好起来。</div>
            </div>
            <div class="m-bd">
                <div class="m-tl"><section>做好疫情防控</section><div></div></div>
                <div class="m-txt">我们相信前路光明，阴霾终会散去，我们定同舟共济,风雨共度一切都会好起来。我们相信前路光明，阴霾终会散去，我们定同舟共济,风雨共度一切都会好起来。</div>
            </div>
        </div>
    `,
  },
];

const _CD = [_CD_BASE, _CD_LINE, _CD_BCOL, _CD_PATT, _CD_QUES, _CD_AXIS];

/* --- 图片 --- */
// 基础图片
const _IM_BASE = [
  { key: 'imbs001', data: `<div class='fn-im_bs_1'><img src=${img4} ></div>` },
  { key: 'imbs010', data: `<div class='fn-im_bs_10'><img src=${img4} ></div>` },
  {
    key: 'imbs011',
    data: `<div class='fn-im_ba_11'><div><img src=${img2}></div> </div>`,
  },
  {
    key: 'imbs012',
    data: `<div class='fn-im_ba_12'><div><img src=${img2}></div> </div>`,
  },
  {
    key: 'imbs013',
    data: `<div class='fn-im_ba_13'><div><img src=${img2}></div> </div>`,
  },
  {
    key: 'imbs014',
    data: `<div class='fn-im_ba_14'><div><img src=${img3}></div></div>`,
  },
  {
    key: 'imbs015',
    data: `<div class='fn-im_ba_15'><div><div ><img src=${img2}></div> </div></div>`,
  },
];

// 单图
const _IM_ONE = [
  {
    key: 'imon001',
    data: `<div class='fn-im_on_1'><div class='fn-tl_li_1'><em>01</em></div><div class="m-img"><img src=${img4} ><em></em></div></div>`,
  },
  {
    key: 'imon002',
    data: `<div class="fn-im_on_2"><img src=${img2}></div>`,
  },
  {
    key: 'imon003',
    data: `<div class="fn-im_on_3"><div class="m-lt"><div class="m-lt-tp"><em><section>清</section></em><em><section>明</section></em></div><div class="m-lt-ct"><em><section>清明时节雨纷纷</section></em></div><div class="m-lt-ct"><em><section>路上行人欲断魂</section></em></div></div><img src=${img3}></div>`,
  },
  {
    key: 'imon004',
    data: `<div class="fn-im_on_4"><img src=${img1}><div class="m-lt"><em><section>清明时节雨纷纷</section></em><em><section>路上行人欲断魂</section></em></div></div>`,
  },
  {
    key: 'imon005',
    data: `<div class="fn-im_on_5"><div class="m-lt"><em><section>清</section></em><em><section>明</section></em></div><img src=${img1}></div>`,
  },
  {
    key: 'imon006',
    data: `<div class="fn-im_on_6"><div class="m-img"><img src=${img1}></div></div>`,
  },
  {
    key: 'imon007',
    data: `<div class="fn-im_on_7"><div class="m-img"><img src=${img1}></div><div class="m-lt"><em><section>清明时节雨纷纷</section></em><em><section>路上行人欲断魂</section></em><em><section>借问酒家何处有</section></em><em><section>牧童遥指杏花村</section></em></div></div>`,
  },
  {
    key: 'imon008',
    data: `<div class="fn-im_on_8"><div class="m-top"><div class="m-top-cir"></div><div class="m-top-cir"></div><div class="m-top-cir"></div><div class="m-top-cir"></div></div><div><img src=${img2}><div class="m-bt"></div></div></div>`,
  },
  { key: 'imon009', data: `<div class="fn-im_on_9"><img src=${img3} ></div>` },
  {
    key: 'imon010',
    data: `<div class='fn-im_on_10'><div class="m-img"><img src=${img3} ></div> <em>惊蛰</em><label>2022.03.05</label></div>`,
  },
  {
    key: 'imon011',
    data: `<div class='fn-im_on_11'><img src=${img3} ><div class='m-bd'><div><em>清</em><em>明</em></div></div></div>`,
  },
  {
    key: 'imon012',
    data: `<div class='fn-im_on_12'><div class='m-bd'><div><em>清</em><em>明</em></div></div><img src=${img3} > </div>`,
  },
  {
    key: 'imon013',
    data: `<div class='fn-im_on_13'><div class="m-img"><img src=${img3} ></div><div class='m-bd'><div><em><section>清</section></em><em><section>明</section></em></div><div><em><section>Qing</section></em><em><section>Ming</section></em><em><section>时</section></em><em><section>节</section></em></div></div></div>`,
  },
  {
    key: 'imon014',
    data: `<div class='fn-im_on_14'><div class='m-img'><img src=${img4} ></div></div>`,
  },
  {
    key: 'imon015',
    data: `
    <div class='fn-im_on_15'>
      <div class='m-lt'>
          <div class='m-lt'></div>
      </div>
      <div class="m-m">
        <div class='m-hd'>
          <div class='m-lt'></div>
          <div class='m-md'>Earth Hour</div>
          <div class='m-lt'></div>
        </div>
        <div class='m-bd'>
            <div class='m-img'><img src=${img4} ></div>        
        </div>
      </div>

    </div>
    `,
  },
  {
    key: 'imon016',
    data: `
    <div class='fn-im_on_16'>

      <div class="m-m">
          <div class='m-bd'>
              <div class='m-img'><img src=${img4} ></div>  
          </div>
          <div class='m-ft'>
            <div class='m-lt'>中国航天日</div>
            <div class='m-rt'>/ Space Day Of China</div>
          
          </div>
      </div>

    </div>
    `,
  },
  {
    key: 'imon017',
    data: `
    <div class='fn-im_on_17'>

      <div class="m-m">

          <div class='m-hd'>
            <div class='m-lt'> 
                <div class='m-dot'></div>
            </div> 
            <div class='m-md'> 
              <section>SPACE DAY OF CHINA</section>
            </div> 
            <div class='m-lt'>
                <div class='m-dot'></div>
            </div>
          
          </div>
          <div class='m-bd'>
              <div class='m-img'><img src=${img4} ></div>  
          </div>
      </div>

    </div>
    `,
  },
  {
    key: 'imon018',
    data: `
    <div class='fn-im_on_18'>
    <div class="fn-co_qr_16">
      <div>
          <div class="m-hd">黎明与黑暗</div>
          <div class="m-img">
              <img src="${img4}">
          </div>
          <div class="m-hd"><section>Once we dreamt that we were strangers.

          We wake up to find that we were dear to each other.</section></div>
          <div></div>
      </div>
    </div>

    </div>
    `,
  },
];

// 双图
const _IM_TWO = [
  {
    key: 'imtw001',
    data: `
    <div class='fn-im_tw_1'>
      <div class='fn-tl_sy_1'>
        <i></i><em>1</em><i></i>
      </div>
      <div class="m-bd">
          <div class="m-img">
              <img src=${img4} >
          </div>
          <div class="m-img">
              <img src=${img4} >
          </div>
      </div>
    </div>
    `,
  },
  {
    key: 'imtw002',
    data: `<div class="fn-im_tw_2">
                <div class="m-lt">
                  <img src=${img2}>
                  <div class="m-wd">
                    <em>梨花风气正清明</em>
                  </div>
                </div>
                <div class="m-lt">
                  <img src=${img2}>
                  <div class="m-wd">
                    <em>游子寻春半出城</em>
                  </div>
                </div>
              </div>`,
  },
  {
    key: 'imtw003',
    data: `<div class="fn-im_tw_3">
                  <div class="m-img"> 
                      <img src=${img2} alt="">
                      <img src=${img2} alt="">
                  </div>
                  <div class="m-wd">
                      <em>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化。</em>
                      <em>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城。</em>
                  </div>
                </div>`,
  },
  {
    key: 'imtw004',
    data: `<div class="fn-im_tw_4">
                  <div class="m-img">
                  <img class="m-img2" src=${img2} alt="">
                  <img class="m-img1" src=${img2} alt="">
                  </div>
                  <div class="m-wd">
                      <em>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化。</em>
                      <em>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰。</em>
                  </div>
                </div>`,
  },
  {
    key: 'imtw005',
    data: `<div class="fn-im_tw_5">
                    <div class="m-img">
                        <img class="m-img1" src=${img2} alt="">
                        <img class="m-img2" src=${img2} alt="">
                    </div>
                  </div>`,
  },
  {
    key: 'imtw010',
    data: `<div class='fn-im_tw_10'><em><section>02</section></em><div class="m-limg"><div><img src=${img3} ></div><div><img src=${img3} ></div></div></div>`,
  },
  {
    key: 'imtw011',
    data: `<div class='fn-im_tw_11'><div class='m-img'><img src=${img3} ></div><div class='m-bd'><div><em><section>清</section></em><em><section>明</section></em></div><div><em>Qing</em><em>Ming</em><em>时</em><em>节</em></div><img src=${img3}></div></div>`,
  },
  {
    key: 'imtw012',
    data: `<div class='fn-im_tw_12'><div class='m-img'><img src=${img3} ><img src=${img3}></div><div class='m-bd'><div><em><section>清</section></em><em><section>明</section></em></div><div><em><section>Qing</section></em><em><section>Ming</section></em><em><section>时</section></em><em><section>节</section></em></div></div></div>`,
  },
  {
    key: 'imtw013',
    data: `
    <div class='fn-im_tw_13'>
      
      <div class="m-m">
        <div class='m-lt'>
          <div class='m-bd'>
            <div class='m-hd'>
              <div class='m-lt'></div>
              <div class='m-md'>Earth Hour</div>
              <div class='m-lt'></div>
            </div>

            <div class='m-img'>
              <img src=${img4} >
            </div>
            <div class='m-img'>
              <img src=${img4} >
            </div>
          </div>
        </div>
        
        <div class='m-rt'>
            <div class='m-rt'></div>
        </div>
      </div>


    </div>
    `,
  },
  {
    key: 'imtw014',
    data: `
    <div class='fn-im_tw_14'>
      
      <div class="m-m">
          <div class='m-hd'>
              <div class='fn-tl_li_24'>

                <div class='m-lt'> 
                    <div class='m-dot'></div>
                </div> 
                <div class='m-md'> 
                  <section>SPACE DAY OF CHINA</section>
                </div> 
                <div class='m-lt'>
                    <div class='m-dot'></div>
                </div>

              </div>
          </div>

          <div class='m-bd'>
              <div class='m-img'>
                  <img src=${img3} >
              </div>
              <div class='m-img'>
                  <img src=${img3} >
              </div>
          </div>
      </div>


    </div>
    `,
  },
];

// 三图
const _IM_THR = [
  {
    key: 'imth001',
    data: `<div class='fn-im_th_1'>
              <em> 图标标题</em>
              <div class="m-img">
                <img src=${img3} >
              </div>
              <div class="m-img">
                <img src=${img3} >
                <img src=${img3} >
              </div>
            </div>`,
  },
  {
    key: 'imth010',
    data: `<div class='fn-im_th_10'><div class="m-bd"><div class='m-img'><img src=${img3} ></div><div class='m-img'><img src=${img3} ></div><div class='m-img'><img src=${img3} ></div></div><em>图丨全年工作成果展示</em></div>`,
  },
  {
    key: 'imth002',
    data: `<div class='fn-im_th_2'>
              <div class="m-lt">
                  <img class="m-lt-tp" src=${img3} alt="">
                  <img class="m-lt-bt" src=${img3} alt="">
              </div>
              <div class="m-rt">
                  <div class="m-rt-tp"><em>02</em></div>
                  <img class="m-rt-bt" src=${img3} alt="">
              </div>
            </div>`,
  },
  {
    key: 'imth003',
    data: `
    <div class='fn-im_th_3'>
      <div class="m-m">
        <div class='m-lt'>
          <div class='m-bd'>
            <div class='m-img'>
              <img src=${img3} >
            </div>
            <div class='m-img'>
              <img src=${img3} >
            </div>
          </div>
        </div>
        
        <div class='m-rt'>
            <div class='m-hd'>
              <div class='m-lt'></div>
              <div class='m-md'>Earth Hour</div>
              <div class='m-lt'></div>
            </div>  
            <div class='m-img'>
              <img src=${img3} >
            </div>

        </div>
      </div>
    </div>
    `,
  },
];

// 多图
const _IM_MUL = [
  {
    key: 'immu001',
    data: `<div class='fn-im_mu_1'><em> 图标标题</em><div class="m-img"><img src=${img3} ><img src=${img3} ></div><div class="m-img"><img src=${img3} ><img src=${img3} ></div></div>`,
  },
  {
    key: 'immu002',
    data: `
    <div class='fn-im_mu_2'>
      <div class="m-m">
          <div class='m-hd'>
              <div class='fn-tl_li_24'>

                <div class='m-lt'> 
                    <div class='m-dot'></div>
                </div> 
                <div class='m-md'> 
                  <section>SPACE DAY OF CHINA</section>
                </div> 
                <div class='m-lt'>
                    <div class='m-dot'></div>
                </div>

              </div>
          </div>

          <div class='m-bd'>
              <div class='m-img'>
                  <img src=${img3} >
                  <img src=${img3} >
              </div>
              <div class='m-img'>
                  <img src=${img3} >
                  <img src=${img3} >
              </div>
          </div>
      </div>

    </div>
    `,
  },
];

// 圆形图
const _IM_CIR = [
  {
    key: 'imci001',
    data: `<div class='fn-im_ci_1'><img src=${img3} ><em>立春</em> <label>二十四节气之一</label></div>`,
  },
  {
    key: 'imci010',
    data: `<div class='fn-im_ci_10 fn-cd_bc_1'><i>2</i><img src=${img3} ></div>`,
  },
  {
    key: 'imci011',
    data: `<div class='fn-im_ci_11'><img src=${img3} ><div class='m-bd'><div><em><section>清</section></em><em><section>明</section></em></div><div><em>Qing</em><em>Ming</em><em>时</em><em>节</em></div></div></div>`,
  },
  {
    key: 'imci012',
    data: `
    <div class='fn-im_ci_12'>
      <div class="m-m">
          <div class='m-lt'>
              <div class='m-img'>
                  <img src=${img3} >
              </div>
          </div>
          <div class='m-rt'>
              <div class='fn-tl_li_24'>

                <div class='m-lt'> 
                    <div class='m-dot'></div>
                </div> 
                <div class='m-md'> 
                  <section>SPACE DAY OF CHINA</section>
                </div> 
                <div class='m-lt'>
                    <div class='m-dot'></div>
                </div>

              </div>
          <div>
      </div>
    
    </div>
    `,
  },
  {
    key: 'imci013',
    data: `
    <div class='fn-im_ci_13'>
          <div class="m-img">
              <img src="${img4}">
          </div>
          <div class='m-nk'><div></div></div>
          <div class='m-wd'>黎明</div>

    
    </div>
    `,
  },
];

// 背景图
const _IM_BACK = [
  {
    key: 'imba001',
    data: `<div class='fn-im_ba_1'><div class="m-logo"><img src=${img5} ></div><div class="m-img"><img src=${img5} ></div><div class="m-txt">立春，为二十四节气之首。立，是“开始”之意；春，代表着温暖、生长。二十四节气最初是依据“斗转星移”制定，当北斗七星的斗柄指向寅位时为立春。</div></div>`,
  },
  {
    key: 'imba010',
    data: `<div class='fn-im_ba_10'><div class="m-logo"><img src=${img5} ></div><div class="m-img"><img src=${img5} ></div><div class="m-txt"><section>谷雨是二十四节气的第六个节气，也是春季最后一个节气，每年4月19日～21日时太阳到达黄经30°时为谷雨，源自古人“雨生百谷”之说。同时也是播种移苗、埯瓜点豆的最佳时节。</section></div></div>`,
  },
];

const _IM = [_IM_BASE, _IM_ONE, _IM_TWO, _IM_THR, _IM_MUL, _IM_CIR, _IM_BACK];

/* --- 布局 --- */
// 基础布局
const _LY_BASE = [
  {
    key: 'lybs001',
    data: `<div class='fn-ly_bs_1'><div class="m-grid"></div>
            <div class="m-grid"></div></div>`,
  },
  {
    key: 'lybs002',
    data: `<div class="fn-ly_bs_2"><div class="m-grid"></div>
            <div class="m-grid m-gf2"></div></div>`,
  },
  {
    key: 'lybs003',
    data: `<div class="fn-ly_bs_3"><div class="m-grid m-gf2"></div>
            <div class="m-grid"></div></div>`,
  },
  {
    key: 'lybs004',
    data: `<div class="fn-ly_bs_4"><div class="m-grid"></div>
            <div class="m-grid m-gf2"></div><div class="m-grid"></div></div>`,
  },
  {
    key: 'lybs005',
    data: `<div class="fn-ly_bs_5"><div class="m-grid"></div>
            <div class="m-grid"></div><div class="m-grid"></div></div>`,
  },
  {
    key: 'lybs006',
    data: `<div class="fn-ly_bs_6"><div class="m-grid"></div>
            <div class="m-grid"></div><div class="m-grid"></div><div class="m-grid"></div></div>`,
  },
  {
    key: 'lybs007',
    data: `<div class="fn-ly_bs_7"><div class="m-grid"></div>
            <div class="m-grid"></div><div class="m-grid"></div><div class="m-grid"></div><div class="m-grid"></div></div>`,
  },
  {
    key: 'lybs010',
    data: `<div class='fn-ly_ba_10'><div data='空白处输入文字'></div><div></div><div></div></div>`,
  },
  {
    key: 'lybs011',
    data: `
    <div class='fn-ly_ba_11'>
      <div></div>
    </div>
    `,
  },
  {
    key: 'lybs012',
    data: `
    <div class='fn-ly_ba_11'>
      <div></div>
      <div></div>
    </div>`,
  },
  {
    key: 'lybs013',
    data: `
    <div class='fn-ly_ba_11'>
      <div></div>
      <div></div>
      <div></div>
    </div>`,
  },
  {
    key: 'lybs014',
    data: `
    <div class='fn-ly_ba_11'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    `,
  },
];

// 表格
const _LY_TAB = [
  {
    key: 'lyta001',
    data: `<div class='fn-ly_ta_1'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div>
              </div>`,
  },
  {
    key: 'lyta002',
    data: `<div class='fn-ly_ta_1'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta003',
    data: `<div class='fn-ly_ta_1'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta004',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_red'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div>
              </div>`,
  },
  {
    key: 'lyta005',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_red'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta006',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_red'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta007',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_green'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div>
              </div>`,
  },
  {
    key: 'lyta008',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_green'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta009',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_green'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta010',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_blue'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div>
              </div>`,
  },
  {
    key: 'lyta011',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_blue'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta012',
    data: `<div class='fn-ly_ta_1 fn-ly_ta_blue'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  



  {
    key: 'lyta013',
    data: `
    <div class='fn-ly_ta_2 fn-ly_ta_sky'>
        <div class="m-row">
            <div class="m-col"></div>
            <div class="m-col"></div>
            <div class="m-col"></div>
        </div>
        <div class="m-row">
            <div class="m-col"></div>
            <div class="m-col"></div>
            <div class="m-col"></div>
        </div>
        <div class="m-row">
            <div class="m-col"></div>
            <div class="m-col"></div>
            <div class="m-col"></div>
        </div>
                  
    </div>
    `,
  },
  {
    key: 'lyta014',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_sky'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta015',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_sky'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta016',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_red'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div>
              </div>`,
  },
  {
    key: 'lyta017',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_red'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta018',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_red'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta019',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_green'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div>
              </div>`,
  },
  {
    key: 'lyta020',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_green'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta021',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_green'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta022',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_blue'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div>
              </div>`,
  },
  {
    key: 'lyta023',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_blue'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta024',
    data: `<div class='fn-ly_ta_2 fn-ly_ta_blue'><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div><div class="m-row"><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div><div class="m-col"></div></div></div>`,
  },
  {
    key: 'lyta025',
    data: `
    <div class='fn-ly_ta_3 fn-ly_ta_sky'>
        <div class="m-row">
            <div class="m-col"></div>
            <div class="m-col"></div>
            <div class="m-col"></div>
        </div>
        <div class="m-row">
            <div class="m-col"></div>
            <div class="m-col"></div>
            <div class="m-col"></div>
        </div>
        <div class="m-row">
            <div class="m-col"></div>
            <div class="m-col"></div>
            <div class="m-col"></div>
        </div>
                  
    </div>
    `,
  },

];

// 上下滑动
const _LY_SLTB = [
  {
    key: 'lysb001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'lysb010',
    data: `<div class='fn-ly_sl_10'><div><img src=${img2}><em>清明节，又称踏青节、行清节、三月节、祭祖节等，节期在仲春与暮春之交。清明节源自上古时代的祖先信仰与春祭礼俗，兼具自然与人文两大内涵，既是自然节气点，也是传统节日。</em><img src=${img2}></div></div>`,
  },
];
// 左右滑动
const _LY_SLLR = [
  {
    key: 'lysr001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
];

const _LY = [_LY_BASE, _LY_TAB, _LY_SLTB, _LY_SLLR];

/* --- 组件 --- */
// 分割线
const _CO_SPLL = [
  {
    key: 'cosl001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'cosl002',
    data: `<div class="fn-co_sp_2">
              <div class="m-wd"><em>3.15</em></div>
            </div>`,
  },
  {
    key: 'cosl003',
    data: `<div class="fn-co_sp_3"><div class="m-odd"></div><div class="m-even"></div><div class="m-odd"></div><div class="m-even"></div><div class="m-odd"></div><div class="m-even"></div><div class="m-odd"></div></div>`,
  },
  {
    key: 'cosl004',
    data: `<div class="fn-co_sp_4">
              <div class="m-lt"></div>
              <div class="m-rt"></div>
            </div>`,
  },
  {
    key: 'cosl005',
    data: `<div class="fn-co_sp_5">
              <div class="m-lt"></div>
              <div class="m-rt"></div>
            </div>`,
  },
  {
    key: 'cosl006',
    data: `<div class="fn-co_sp_6"><div class="m-lt"><div class="m-lt-lt"></div><div class="m-lt-ct"></div><div class="m-lt-rt"></div></div><div class="m-rt"><div class="m-rt-lt"></div><div class="m-rt-rt"></div></div></div>`,
  },
  { key: 'cosl010', data: `<div class='fn-co_sp_10'><div></div></div>` },
  { key: 'cosl010', data: `<div class='fn-co_sp_10'><div></div></div>` },
  { key: 'cosl011', data: `<div class='fn-co_sp_11'><div></div></div>` },
  { key: 'cosl013', data: `<div class='fn-co_sp_13'><div></div></div>` },
  { key: 'cosl014', data: `<div class='fn-co_sp_14'><div></div></div>` },
  {
    key: 'cosl015',
    data: `<div class='fn-co_sp_15'><div><em>THE</em></div><div><em>END</em></div></div>`,
  },
  {
    key: 'cosl016',
    data: `<div class="fn-co_sp_16"><div></div></div>`,
  },
  {
    key: 'cosl017',
    data: `
    <div class="fn-co_sp_17">
        <div class='m-lt'></div>
        <div class='m-md'></div>
        <div class='m-lt'></div>
    </div>
    `,
  },
  {
    key: 'cosl018',
    data: `
    <div class="fn-co_sp_18">
        <div class='m-md'></div>
        <div class='m-lt'></div>
    </div>
    `,
  },
  {
    key: 'cosl019',
    data: `
    <div class="fn-co_sp_19">
        <div class='m-lt'></div>
        <div class='m-md'></div>
        <div class='m-lt'></div>
    </div>
    `,
  },
  {
    key: 'cosl020',
    data: `
    <div class="fn-co_sp_20">
        <div class='m-md'></div>

    </div>
    `,
  },
];

// 分隔符
const _CO_SPLS = [
  {
    key: 'coss001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'coss002',
    data: `<div class='fn-co_spls_2'>
              <div class="m-hb"></div>
              <div class="m-hs"></div>
            </div>`,
  },
  {
    key: 'coss003',
    data: `<div class='fn-co_spls_3'>
              <div class="m-lt"></div>
              <div class="m-rt"></div>
            </div>`,
  },
  {
    key: 'coss004',
    data: `<div class='fn-co_spls_4'>
              <div class="m-lt"></div>
              <div class="m-rt"></div>
            </div>`,
  },
  {
    key: 'coss005',
    data: `<div class='fn-co_spls_5'>
              <div class="m-lt"></div>
              <div class="m-ct"></div>
              <div class="m-rt"></div>
            </div>`,
  },
  {
    key: 'coss006',
    data: `<div class='fn-co_spls_6'>
              <div class="m-ct"></div>
            </div>`,
  },
  {
    key: 'coss007',
    data: `<div class='fn-co_spls_7'>
              <div class="m-lt"><em>01</em></div>
            </div>`,
  },
  {
    key: 'coss008',
    data: `<div class='fn-co_spls_8'>
              <div class="m-lt"><em>2</em></div>
            </div>`,
  },
  {
    key: 'coss009',
    data: `<div class="fn-co_spls_9">
              <i>1</i>
            </div>`,
  },
  {
    key: 'coss020',
    data: `<div class='fn-co_spls_20'>
              <div class="m-lt"><em>4</em></div>
              <div class="m-rt"></div>
            </div>`,
  },
  {
    key: 'coss021',
    data: `<div class='fn-co_spls_21'>
              <div class="m-lt"><em>2</em></div>
            </div>`,
  },
  {
    key: 'coss010',
    data: `<div class='fn-co_spls_10'><div><div><div></div></div>`,
  },
  {
    key: 'coss011',
    data: `<div class='fn-co_spls_11'><div></div></div>`,
  },
  {
    key: 'coss012',
    data: `<div class='fn-co_spls_12'><div></div></div>`,
  },
  {
    key: 'coss013',
    data: `<div class='fn-co_spls_13'><div></div></div>`,
  },
  {
    key: 'coss014',
    data: `<div class='fn-co_spls_14'><div></div></div>`,
  },
  {
    key: 'coss015',
    data: `
    <div class='fn-co_spls_15'>
        <div class='m-hd'></div>
        <div class='m-bd'>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class='m-bd'>
            <div></div>
            <div></div>
        </div>
    </div>
    
    `,
  },
  {
    key: 'coss016',
    data: `
    <div class='fn-co_spls_16'>
            <div></div>
            <div></div>
    </div>
    
    `,
  },
  {
    key: 'coss017',
    data: `
    <div class='fn-co_spls_17'>
            <div><div></div></div>
    </div>
    
    `,
  },
  {
    key: 'coss018',
    data: `
    <div class='fn-co_spls_18'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
    </div>
    
    `,
  },
  {
    key: 'coss019',
    data: `
    <div class='fn-co_spls_19'>
            <div></div>
            <div></div>
            <div></div>
    </div>
    
    `,
  },
];

// 关注原文
const _CO_FOC = [
  {
    key: 'cofc001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'cofc002',
    data: `<div class="fn-co_fo_2">
              <div class="m-wd-tp">
                  <em>点击蓝字 关注我们</em>
              </div>
              <div class="m-wd-bt">
                  <em>World Health Day</em>
              </div>
            </div>`,
  },
  {
    key: 'cofc003',
    data: `<div class="fn-co_fo_3">
              <div class="m-wd-tp">
                  <em>点击蓝字</em>
              </div>
              <div class="m-wd-bt">
                  <em>关注我们</em>
              </div>
          </div>`,
  },
  {
    key: 'cofc004',
    data: `<div class="fn-co_fo_4">
              <div class="m-wd-tp">
                  <em>点击蓝字</em>
              </div>
              <div class="m-wd-bt">
                  <em>关注我们</em>
              </div>
            </div>`,
  },
  {
    key: 'cofc005',
    data: `<div class="fn-co_fo_5">
              <div class="m-hb"></div>
              <div class="m-wd-tp">
                  <em>点击蓝字</em>
              </div>
              <div class="m-wd-bt">
                  <em>关注我们</em>
              </div>
            </div>`,
  },
  {
    key: 'cofc006',
    data: `<div class="fn-co_fo_6">
              <div class="m-wd-tp">
                  <em>点击蓝字</em>
              </div>
              <div class="m-wd-bt">
                  <em>关注我们</em>
              </div>
            </div>`,
    key: 'cofc010',
    data: `<div class='fn-co_fo_10 fn-tl_bc_13'><div><section>点击蓝字 关注我们</section></div></div>`,
  },
  {
    key: 'cofc011',
    data: `<div class='fn-co_fo_11 fn-tl_bc_13'><div class='m-ct'><div><section>点击蓝字 关注我们</section></div><div><section>First Frost</section></div></div></div>`,
  },
  {
    key: 'cofc012',
    data: `<div class='fn-co_fo_12'><div>点击蓝字 关注我们</div></div>`,
  },
  {
    key: 'cofc013',
    data: `<div class='fn-co_fo_13'><div>点击蓝字 关注我们</div></div>`,
  },
  {
    key: 'cofc001',
    data: `<div class='fn-co_fo_14'><div>点击蓝字·关注我们</div></div>`,
  },  
  {
    key: 'cofc015',
    data: `
    <div class='fn-co_fo_15'>
      <div class='m-lt'> 
        <section></section>
      </div> 
      <div class='m-md'> 
        <section>点击蓝字 关注我们</section>
      </div> 
      <div class='m-rt'>
          <div class='m-dt'></div>
      </div>
    </div>
    `,
  },
  {
    key: 'cofc016',
    data: `
    <div class='fn-co_fo_16'>
      <div class='m-lt'> 
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
      </div> 
      <div class='m-md'> 
        <section>点击蓝字 关注我们</section>
      </div> 
      <div class='m-lt'>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
          <div class='m-dt'></div>
      </div>
    </div>
    `,
  },
  {
    key: 'cofc017',
    data: `
    <div class='fn-co_fo_17'>
        <div>
          <section class="m-bf">
              点击蓝字
          </section>
          <section class="m-af">
              关注我们
          </section>
        </div>
        <em></em>
    </div>
    `,
  },
  {
    key: 'cofc018',
    data: `
    <div class='fn-co_fo_18'>
      <div class="m-m">

          <div class="m-hd">
              <div class="m-lt">01</div>
              <div class="m-nk">
                  <section>点击蓝字，关注我们</section>
              </div>
          </div>
      </div>
    </div>
    `,
  },
  {
    key: 'cofc019',
    data: `
    <div class='fn-co_fo_19'>
      <div class="m-m">

          <div class="m-lt">
              <div></div>
              <div></div>
          </div>
          <div class="m-rt">
              <div class='m-lt'>点击蓝字 关注我们  </div>
              <div class='m-rt'>//  World Health Day</div>
          </div>
      </div>
    </div>
    `,
  },
  {
    key: 'cofc020',
    data: `
    <div class='fn-co_fo_20'>
      <div class="m-m">

          <div class="m-lt">点击蓝字 关注我们</div>
          <div class="m-rt">
              <div>✦</div>
              <div>✦</div>
          </div>
      </div>
    </div>
    `,
  },
  
];

// 二维码
const _CO_QRCO = [
  {
    key: 'coqr001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'coqr002',
    data: `<div class='fn-co_qr_2'><div class="m-lt"><div></div><div></div><div></div><div></div></div><div class="m-ct"><img src=${img6} alt=""></div><div class="m-bt"><em>微信号 | xiumius</em><em>新浪微博 | 秀米XIUMI</em></div></div>`,
  },
  {
    key: 'coqr003',
    data: `<div class='fn-co_qr_3'><div class="m-tp"><em>XIUMIUS</em></div><div class="m-ct"><img src=${img6} alt=""></div><div class="m-bt"><em class="m-bt-odd">微信公众号</em><em>XIUMIUS</em><em class="m-bt-odd">新浪微博</em><em>@秀米XIUMI</em></div></div>`,
  },
  {
    key: 'coqr004',
    data: `<div class='fn-co_qr_4'>
              <div class="m-lt">
                  <img src=${img6} alt="">
              </div>
              <div class="m-rt">
                  <em>XIUMIUS</em>
                  <em>微信号 | XIUMIUS</em>
              </div>
            </div>`,
  },
  {
    key: 'coqr005',
    data: `<div class='fn-co_qr_5'>
              <div class="m-lt">
                  <img src=${img6} alt="">
              </div>
              <div class="m-ct"></div>
              <div class="m-rt">
                  <em>微信公众号 | XIUMIUS</em>
                  <em>新浪微博 | @秀米XIUMI</em>
              </div>
            </div>`,
  },
  {
    key: 'coqr006',
    data: `<div class='fn-co_qr_6'>
              <div class="m-lt">
                  <img src=${img6} alt="">
              </div>
              <div class="m-rt">
                  <em>微信公众号 | XIUMIUS</em>
                  <em>新浪微博 | @秀米XIUMI</em>
              </div>
            </div>`,
  },
  {
    key: 'coqr010',
    data: `<div class='fn-co_qr_10'><div class='m-tl'> <div>春</div><div>日</div><div></div><div>光</div><div>景</div></div><div class='m-bd'><img src=${img1}></div><div class='m-ft'><div><em>微信公众号</em><em>XIUMIUS</em></div><div><em>新浪微博</em><em>@秀米XIUMI</em></div></div></div>`,
    key: 'coqr010',
    data: `<div class='fn-co_qr_10'>
      <div class='m-tl'> <div>春</div><div>日</div><div></div><div>光</div><div>景</div></div>
      <div class='m-bd'><img src=${img6}></div>
      <em>SPRING COMING</em>
      <div class='m-ft'><div><em>微信公众号</em><em>XIUMIUS</em></div><div><em>新浪微博</em><em>@秀米XIUMI</em></div></div></div>`,
  },
  {
    key: 'coqr011',
    data: `<div class='fn-co_qr_11'>
      <div class='m-tl'>XIUMIUS</div>
      <div class='m-bd'><img src=${img6}></div>
      <div class='m-ft'><em>微信公众号</em><em>XIUMIUS</em><em>新浪微博</em><em>@秀米XIUMI</em></div></div>`,
  },
  {
    key: 'coqr012',
    data: `<div class='fn-co_qr_12'>
      <div class='m-img'><img src=${img6}></div>
      <div class='m-bd'><div><em>//</em><em>注意防火</em><em>//</em></div><em>微信公众号:XIUMIUS</em><em>新浪微博:@秀米XIUMI</em></div></div>`,
  },
  {
    key: 'coqr013',
    data: `<div class='fn-co_qr_13 fn-tl_bc_15'>
      <div class='m-bd'><img src=${img6}></div>
      <div class='m-lt'><div><section><section>白<section></section></div><em><section>09.07</section></em><em><section>2021</section></em></div><div class='m-rt'><div><section><section>露</section></section></div></div></div>`,
  },
  {
    key: 'coqr014',
    data: `<div class='fn-co_qr_14'>
      <div class='m-img'><img src=${img6}></div>
      <div class='m-bd'>
      <em>XIUMIUS</em><em>微信号 | xiumius</em><em>新浪微博 | 秀米XIUMI</em></div></div>`,
  },
  {
    key: 'coqr015',
    data: `
    <div class="fn-co_qr_15">
    <div>
        <div class="m-img">
            <img src="${img6}">
        </div>
        <div class="m-bd">
            <em class="m-txt">创业资讯</em>
            <em>微信号：xiumius</em>
            <div>
                <em>新浪微博：秀米XIUMI</em>
            </div>
        </div>
        <div class="u-rd"></div>
    </div>
</div>
    `,
  },
  {
    key: 'coqr016',
    data: `
    <div class="fn-co_qr_16">
      <div>
          <div class="m-hd">秀米XIUMI</div>
          <div class="m-img">
              <img src="${img6}">
          </div>
          <div class="m-hd"><section>DAWN & DARK</section></div>
          <div></div>
      </div>
    </div>
    `,
  },
  {
    key: 'coqr017',
    data: `
    <div class="fn-co_qr_17">
      <div>

          <div class="m-img">
              <img src="${img6}">
          </div>
          <div class='fn-tl_bc_20'>
                <div class='m-ft'>
                  <div class='m-lt'>中国航天日</div>
                  <div class='m-rt'>/ Space Day Of China</div>
                
                </div>
          </div>

      </div>
    </div>
    `,
  },
  {
    key: 'coqr018',
    data: `
    <div class="fn-co_qr_18">
      <div class='fn-cd_bc_19'>
        <div class='m-m'>
          <div class='m-hd'>
            <div class='m-cir'>秀</div>
            <div class='m-cir'>米</div>

          </div>
          <div class='m-bd'>
              <img src="${img6}">
          </div>

          <div class='m-ft'><section>读书使人进步</section></div>
        </div>
      </div>
    </div>
    `,
  },
  {
    key: 'coqr019',
    data: `
    <div class="fn-co_qr_19">
        <div class='m-hd'>
            <div class='m-bd'>
                <div class='m-lt'>
                    <section>新浪微博｜秀米XIUMI</section>
                    <section>微信号｜xiumius</section>
                </div>
                <div class='m-rt'>
                    <img src="${img6}">
                </div>
            </div> 

        </div>
        <div class='m-ft'>
            <div class='m-hd'>
                <section>世界读书日</section>
                
            </div>
            <div></div>
            <div class='m-ft'><section>WORLD BOOK & COPYRIGHT DAY</section></div>
        </div>

    </div>
    `,
  },
];

const _CO = [_CO_SPLL, _CO_SPLS, _CO_FOC, _CO_QRCO];

/* --- EMOJI --- */
var _EM_FA = importAll(
  require.context('./emo/01 face', false, /\.(png|jpe?g|svg)$/),
);
var _EM_GE = importAll(
  require.context('./emo/02 gest', false, /\.(png|jpe?g|svg)$/),
);
var _EM_HE = importAll(
  require.context('./emo/03 head', false, /\.(png|jpe?g|svg)$/),
);
var _EM_AC = importAll(
  require.context('./emo/04 act', false, /\.(png|jpe?g|svg)$/),
);
var _EM_AN = importAll(
  require.context('./emo/05 anim', false, /\.(png|jpe?g|svg)$/),
);
var _EM_FO = importAll(
  require.context('./emo/06 food', false, /\.(png|jpe?g|svg)$/),
);
var _EM_TR = importAll(
  require.context('./emo/07 traf', false, /\.(png|jpe?g|svg)$/),
);
var _EM_TI = importAll(
  require.context('./emo/08 time', false, /\.(png|jpe?g|svg)$/),
);
var _EM_C1 = importAll(
  require.context('./emo/09 com1', false, /\.(png|jpe?g|svg)$/),
);
var _EM_C2 = importAll(
  require.context('./emo/10 com2', false, /\.(png|jpe?g|svg)$/),
);
var _EM_RE = importAll(
  require.context('./emo/11 rect', false, /\.(png|jpe?g|svg)$/),
);
var _EM_NA = importAll(
  require.context('./emo/12 nati', false, /\.(png|jpe?g|svg)$/),
);

const _EM = [
  _EM_FA,
  _EM_GE,
  _EM_HE,
  _EM_AC,
  _EM_AN,
  _EM_FO,
  _EM_TR,
  _EM_TI,
  _EM_C1,
  _EM_C2,
  _EM_RE,
  _EM_NA,
];

export const MATLIB = [_TL, _CD, _IM, _LY, _CO, _EM];
