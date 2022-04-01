import tl_01 from './img/tl_01.svg';
import tl_02 from './img/tl_02.svg';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.webp';
import img4 from './img/img4.png';
import img5 from './img/img5.webp';

export const MENU_MAIN = [
  { name: '常用', list: [] },
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
      { name: '组合' },
      { name: '表格' },
      { name: '上下滑动' },
      { name: '左右滑动' },
      { name: '自由布局' },
      { name: '' },
    ],
  },
  {
    name: '组件',
    list: [
      { name: '分割线' },
      { name: '分隔符' },
      { name: '贴纸' },
      { name: 'SVG贴纸' },
      { name: '关注原文' },
      { name: '公众号组件' },
      { name: '二维码' },
      { name: '零件' },
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
  { key: 'tlbs009', data: `<div class='fn-tl_bs_8'><em>描边文字</em></div>` },
  { key: 'tlbs010', data: `<div class='fn-tl_bs_8'><em>描边文字</em></div>` },
  { key: 'tlbs011', data: `<div class='fn-tl_bs_8'><em>描边文字</em></div>` },
];

// 框线标题
const _TL_LINE = [
  { key: 'tlli001', data: `<div class='fn-tl_li_1'><em>世界气象日</em></div>` },
  {
    key: 'tlli002',
    data: `<div class="fn-tl_li_2"><div class="m-lt"><em>目录/contents</em></div><div class="m-rt"></div></div>`,
  },
  {
    key: 'tlli010',
    data: `<div class='fn-tl_li_10'><div>交通安全日</div></div>`,
  },
  {
    key: 'tlli011',
    data: `<div class='fn-tl_li_11'><div class='m-lt'>人民英雄</div><div class='m-rt'>永垂不朽</div></div>`,
  },
  {
    key: 'tlli012',
    data: `<div class='fn-tl_li_12'><div><div class='title'><div class='content'>师</div><div class='content'>恩</div><div class='content'>如</div><div class='content'>海</div><div class='line'></div></div><div class='day'>TEACHERS' DAY</div></div></div>`,
  },
  {
    key: 'tlli013',
    data: `<div class='fn-tl_li_13'><div><div class='bg'></div><div class='content'>露凝 · 云散</div></div></div>`,
  },
  {
    key: 'tlli014',
    data: `<div class='fn-tl_li_14'><div class='title'>01</div><div class='content'>迎建党百年<div></div></div></div>`,
  },
];

// 图片标题
const _TL_IMG = [
  {
    key: 'tlim001',
    data: `<div class='fn-tl_im_1'><img src=${tl_02} ><div class='m-lt'><em>所思日记</em></div><div class='m-rt'><div class='m-tp'><img src=${tl_01}><em>32℃</em></div><div class='m-bt'>2022年 3月18日</div></div></div>`,
  },
  {
    key: 'tlim010',
    data: `<div class='fn-tl_im_10'><div class='m-bd'>SALE</div></div>`,
  },
];

// 底色标题
const _TL_BCOL = [
  {
    key: 'tlbc001',
    data: `<div class='fn-tl_bc_1'><em>向雷锋同志学习</em><div><i></i><label>学雷锋纪念日</label><i></i></div></div>`,
  },
  {
    key: 'tlbc010',
    data: `<div class='fn-tl_bc_10'><div class='m-tl'>HAPPY NEW YEAR</div><div class='m-bd'>05</div>`,
  },
];

// 符号标题
const _TL_SYM = [
  {
    key: 'tlsy001',
    data: `<div class='fn-tl_sy_1'><i></i><em>1</em><i></i></div>`,
  },
  {
    key: 'tlsy010',
    data: `<div class='fn-tl_sy_10'><div class='m-bd'>今夜偏知春气暖</div></div>`,
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
    data: `<div class='fn-cd_bs_10'><div>请输入文字</div></div>`,
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
    key: 'cdli010',
    data: "<div class='fn-cd_li_10'><div class='m-bd'><li>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</li><li>由于两场会议会期基本重合，而且对于国家运作的重要程度都非常的高，故简称做“两会”。</li><li>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</li></div></div>",
  },
];

// 底色卡片
const _CD_BCOL = [
  {
    key: 'cdbc001',
    data: `<div class='fn-cd_bc_1'><i>1</i><div>植树节是按照法律规定宣传保护树木，并组织动员群众积极参加以植树造林为活动内容的节日。提倡通过这种活动，激发人们爱林造林的热情、意识到环保的重要性。</div></div>`,
  },
  {
    key: 'cdbc010',
    data: `<div class='fn-cd_bc_10'>
    <div class='m-tl'>
    <label>项目 | 高山滑雪</label>
    <div class='m-bd'><img src=${img2}></div>
    <em>2015年07月31日17时57分，国际奥委会第128次全会在吉隆坡举行，投票选出2022年冬奥会举办城市。</em>
    <em>2015年07月31日17时57分，国际奥委会第128次全会在吉隆坡举行，投票选出2022年冬奥会举办城市。</em>
    </div>
    </div>`,
  },
];

// 底纹卡片
const _CD_PATT = [
  {
    key: 'cdpa001',
    data: `<div class='fn-cd_bc_1 fn-cd_pa_1 '><i>1</i><div>植树节是按照法律规定宣传保护树木，并组织动员群众积极参加以植树造林为活动内容的节日。提倡通过这种活动，激发人们爱林造林的热情、意识到环保的重要性。</div></div>`,
  },
  {
    key: 'cdpa010',
    data: `<div class='fn-cd_pa_10 '><div><li>任教高中语文，目前担任XX教育“十人课堂”语文老师，深受学生、家长的喜爱。任教高中语文，目前担任XX教育“十人课堂”语文老师，深受学生、家长的喜爱。</li></div></div>`,
  },
];

// 对话/问答
const _CD_QUES = [
  {
    key: 'cdqu001',
    data: `<div class='fn-cd_qu_1'><div class="m-q"><div>两会是指什么会议？</div></div><div class="m-a"><div>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。<br>由于两场会议会期基本重合，而且对于国家运作的重要程度都非常的高，故简称做“两会”。</div></div></div>`,
  },
  {
    key: 'cdqu010',
    data: `<div class='fn-cd_qu_10'>
    <div class='m-q'><div>面对疫情 不必恐慌</div></div>
    <div class='m-a'><div><div>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验。</div></div></div>
</div>`,
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
    data: `<div class='fn-cd_ax_10'><div class="m-tl">01</div><div class='m-bd'>地球一小时是世界自然基金会应对全球气候变化所提出的一项全球性节能活动，提倡于每年三月的最后一个星期六当地时间晚上20:30。</div></div>`,
  },
];

const _CD = [_CD_BASE, _CD_LINE, _CD_BCOL, _CD_PATT, _CD_QUES, _CD_AXIS];

/* --- 图片 --- */
// 基础图片
const _IM_BASE = [
  { key: 'imbs001', data: `<div class='fn-im_bs_1'><img src=${img4} ></div>` },
  { key: 'imbs010', data: `<div class='fn-im_bs_10'><img src=${img4} ></div>` },
];

// 单图
const _IM_ONE = [
  {
    key: 'imon001',
    data: `<div class='fn-im_on_1'><div class='fn-tl_li_1'><em>01</em></div><div class="m-img"><img src=${img4} ><em></em></div></div>`,
  },
];

// 双图
const _IM_TWO = [
  {
    key: 'imtw001',
    data: `<div class='fn-im_tw_1'><div class='fn-tl_sy_1'><i></i><em>1</em><i></i></div><div class="m-bd"><div class="m-img"><img src=${img4} ></div><div class="m-img"><img src=${img4} ></div></div></div>`,
  },
];

// 三图
const _IM_THR = [
  {
    key: 'imth001',
    data: `<div class='fn-im_th_1'><em> 图标标题</em><div class="m-img"><img src=${img3} ></div><div class="m-img"><img src=${img3} ><img src=${img3} ></div></div>`,
  },
];

// 多图
const _IM_MUL = [
  {
    key: 'immu001',
    data: `<div class='fn-im_mu_1'><em> 图标标题</em><div class="m-img"><img src=${img3} ><img src=${img3} ></div><div class="m-img"><img src=${img3} ><img src=${img3} ></div></div>`,
  },
];

// 圆形图
const _IM_CIR = [
  {
    key: 'imci001',
    data: `<div class='fn-im_ci_1'><img src=${img3} ><em>立春</em> <label>二十四节气之一</label></div>`,
  },
];

// 背景图
const _IM_BACK = [
  {
    key: 'imba001',
    data: `<div class='fn-im_ba_1'><div class="m-logo"><img src=${img5} ></div><div class="m-img"><img src=${img5} ></div><div class="m-txt">立春，为二十四节气之首。立，是“开始”之意；春，代表着温暖、生长。二十四节气最初是依据“斗转星移”制定，当北斗七星的斗柄指向寅位时为立春。</div></div>`,
  },
];

const _IM = [_IM_BASE, _IM_ONE, _IM_TWO, _IM_THR, _IM_MUL, _IM_CIR, _IM_BACK];

/* --- 布局 --- */
// 基础布局
const _LY_BASE = [
  {
    key: 'lybs001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'lybs010',
    data: `<div class='fn-ly_ba_10'><div data='空白处输入文字'></div><div></div><div></div></div>`,
  },
];

// 组合
const _LY_GROP = [
  {
    key: 'lygr001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },

  {
    key: 'lygr010',
    data: `<div class='fn-im_tw_1 fn-ly_gr_10'><div class="m-bd"><div class="m-img"><img src=${img4} ></div><div class="m-img"><img src=${img4} ></div></div><div class='m-ft'>地球一小时是世界自然基金会应对全球气候变化所提出的一项全球性节能活动，提倡于每年三月的最后一个星期六当地时间晚上20:30。</div></div>`,
  },
];

// 表格
const _LY_TAB = [
  {
    key: 'lyta001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
];

// 上下滑动
const _LY_SLTB = [
  {
    key: 'lysb001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
];

// 左右滑动
const _LY_SLLR = [
  {
    key: 'lysr001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
];

// 自由布局
const _LY_FREE = [
  {
    key: 'lyfr001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
];

// 图片
const _LY = [_LY_BASE, _LY_GROP, _LY_TAB, _LY_SLTB, _LY_SLLR, _LY_FREE];

/* --- 组件 --- */
// 分割线
const _CO_SPLL = [
  {
    key: 'cosl001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  { key: 'cosl010', data: `<div class='fn-co_sp_10'><div></div></div>` },
];

// 分隔符
const _CO_SPLS = [
  {
    key: 'coss001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'coss010',
    data: `<div class='fn-co_spls_10'><div><div><div></div></div>`,
  },
];

// 贴纸
const _CO_STIC = [
  {
    key: 'cosc001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  { key: 'cosc010', data: `<div class='fn-co_st_10'><div>1</div></div>` },
];

// SVG贴纸
const _CO_SVG = [
  {
    key: 'cosg001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
];

// 关注原文
const _CO_FOC = [
  {
    key: 'cofc001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'cofc010',
    data: `<div class='fn-co_fo_10'><div><em>点击蓝字 关注我们</em><div></div>`,
  },
];

// 公众号组件
const _CO_OFFI = [
  {
    key: 'coof001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
];

// 二维码
const _CO_QRCO = [
  {
    key: 'coqr001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  {
    key: 'coqr010',
    data: `<div class='fn-co_qr_10'><div class='m-tl'> <div>春</div><div>日</div><div></div><div>光</div><div>景</div></div><div class='m-bd'><img src=${img1}></div><div class='m-ft'><div><em>微信公众号</em><em>XIUMIUS</em></div><div><em>新浪微博</em><em>@秀米XIUMI</em></div></div></div>`,
  },
];

// 零件
const _CO_PART = [
  {
    key: 'copa001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
  { key: 'copa010', data: `<div class='fn-co_pa_10'><i>01</i></div>` },
];

const _CO = [
  _CO_SPLL,
  _CO_SPLS,
  _CO_STIC,
  _CO_SVG,
  _CO_FOC,
  _CO_OFFI,
  _CO_QRCO,
  _CO_PART,
];

const importAll = (r) => {
  let images = [];
  r.keys().map((item, index) => {
    let img = `<img class="fn-emoji" src="${r(item)}">`;
    images.push({ key: item.replace('./', ''), data: img });
  });
  return images;
};

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
