import tl_01 from './img/tl_01.svg';
import tl_02 from './img/tl_02.svg';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.webp';
import img4 from './img/img4.png';
import img5 from './img/img5.webp';

export const MENU_MAIN = [
  { name: '常用', list: [{ name: '常用样式' }, { name: '常用EMO' }] },
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
    data: `<div class='fn-tl_li_12'><div class='m-tl'><div>师</div><div>恩</div><div>如</div><div>海</div></div><div class='m-ft'>THANKS GIVING DAY</div></div>`,
  },
  {
    key: 'tlli013',
    data: `<div class='fn-tl_li_13'><div class='m-ct'>露凝 · 云散</div></div>`,
  },
  {
    key: 'tlli014',
    data: `<div class='fn-tl_li_14'><i>01</i><div class='m-bd'>迎建党百年</div></div>`,
  },
  {
    key: 'tlli015',
    data: `<div class='fn-tl_li_15'><div>运动，让生命更精彩</div></div>`,
  },
  {
    key: 'tlli016',
    data: `<div class='fn-tl_li_16'><i>Part 1</i><div class='m-bd'>今夜偏知春气暖</div></div>`,
  },
  {
    key: 'tlli017',
    data: `<div class='fn-tl_li_17'><div>政务工作汇报</div></div>`,
  },
  {
    key: 'tlli018',
    data: `<div class='fn-tl_li_18'><div>暑期冲刺班</div></div>`,
  },
  {
    key: 'tlli019',
    data: `<div class='fn-tl_li_19'><div class='m-bg'>SUMMER</div><div class='m-bd'>立/夏时/节</div><div class='m-ft'>SUMMER TIME</div></div>`,
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
  {
    key: 'tlim011',
    data: `<div class='fn-tl_im_11'><div class='m-tl'><em>20</em><em>22</em></div><div>元旦快乐</div><img src=${img3} ></div>`,
  },
  {
    key: 'tlim012',
    data: `<div class='fn-tl_im_12'><div class='m-img'><img src=${img4} ></div><em>WHITE DEW</em></div>`,
  },
  {
    key: 'tlim013',
    data: `<div class='fn-tl_im_13'><img src=${img3} ><em>01</em></div>`,
  },
  {
    key: 'tlim014',
    data: `<div class='fn-tl_im_14'><div class='m-tl'><em>2</em><em>心有猛虎，细嗅蔷薇</em></div><img src=${img3} ></div>`,
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
  {
    key: 'tlbc011',
    data: `<div class='fn-tl_bc_11'><div class='m-tl'>3</div><div class='m-bd'></div><div class='m-ft'>15</div></div>`,
  },
  {
    key: 'tlbc012',
    data: `<div class='fn-tl_bc_12'><div>养</div><div>生</div><div>之</div><div>道</div></div>`,
  },
  {
    key: 'tlbc013',
    data: `<div class='fn-tl_bc_13'><div class='m-ct'><div>霜降</div><div>First Frost</div></div></div>`,
  },
  {
    key: 'tlbc014',
    data: `<div class='fn-tl_bc_14'><div>过了腊八就是年</div></div>`,
  },
  {
    key: 'tlbc015',
    data: `<div class='fn-tl_bc_15'><div class='m-lt'><div>白</div><em>09.07</em><em>2021</em></div><div class='m-rt'><div>露</div></div></div>`,
  },
  {
    key: 'tlbc016',
    data: `<div class='fn-tl_bc_16'><div>峥嵘岁月，初心不改</div></div>`,
  },
  {
    key: 'tlbc017',
    data: `<div class='fn-tl_bc_17'><div class='m-font'>端</div><em>DUAN</em><em>WU</em><div class='m-font'>午</div></div>`,
  },
  {
    key: 'tlbc018',
    data: `<div class='fn-tl_bc_18'><div class='m-sq'><div></div><div></div><div></div><div></div></div><em>赛事时间表</em></div>`,
  },
  {
    key: 'tlbc019',
    data: `<div class='fn-tl_bc_19'><div class='m-bd'>春季校园招聘</div><div class='m-cr'><div></div></div></div>`,
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
  {
    key: 'tlsy011',
    data: `<div class='fn-tl_sy_11'><div>立冬时节知多少</div></div>`,
  },
  {
    key: 'tlsy012',
    data: `<div class='fn-tl_sy_12'><div>生命在于运动</div></div>`,
  },
  {
    key: 'tlsy013',
    data: `<div class='fn-tl_sy_13'><em>Winter</em><div class='m-cr'></div></div>`,
  },
  {
    key: 'tlsy014',
    data: `<div class='fn-tl_sy_14'><div class='m-tc'></div><em>COLD DEW</em><div class='m-bc'></div></div>`,
  },
  {
    key: 'tlsy015',
    data: `<div class='fn-tl_sy_15'><div>疫情快讯</div></div>`,
  },
  {
    key: 'tlsy016',
    data: `<div class='fn-tl_sy_16'><div>这是一个简单的动态标题</div></div>`,
  },
  {
    key: 'tlsy017',
    data: `<div class='fn-tl_sy_17'><div><em>万水千山 ,</em><em>粽是情</em></div></div>`,
  },
  {
    key: 'tlsy018',
    data: `<div class='fn-tl_sy_18'><div></div><em>安全提示</em></div>`,
  },
  {
    key: 'tlsy019',
    data: `<div class='fn-tl_sy_19'><div class='m-tl'></div><div class='m-bd'><em>今日</em><em>看点</em></div></div>`,
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
    data: `<div class='fn-cd_bs_10'><div>任何时代，美好之物都与金钱和闲暇无关。创造出最美之物的，总是那些经过打磨的感知力，着眼于日常生活的目光，以及不懈努力的双手。</div></div>`,
  },
  {
    key: 'cdbs011',
    data: `<div class='fn-cd_bs_11'><div>不可以伪装，不允许欺骗，因为无时无刻不在接受考验，不遵守正直之徳，就无法成为美好的物品。</div></div>`,
  },
  {
    key: 'cdbs012',
    data: `<div class='fn-cd_bs_12'><div>选中一个模板，出现的黑色方框标志着选中的范围。插入新模板、收藏、复制，都是针对黑色方框进行操作。</div></div>`,
  },
  {
    key: 'cdbs013',
    data: `<div class='fn-cd_bs_13'><div>衣服，若是离开穿它的人，离开人的身体、心，还有生活，便没有什么好看的了。</div></div>`,
  },
  {
    key: 'cdbs014',
    data: `<div class='fn-cd_bs_14'><div>昨天是这么做的，所以今天也一样。别人是这样的，所以自己也一样。这也许轻松，但没有活过的意义。</div></div>`,
  },
  {
    key: 'cdbs015',
    data: `<div class='fn-cd_bs_15'><div>ctrl+home可以快速回到编辑区顶部选中编辑区的正文段落，再点击剪贴板里面的一个内容，会有格式刷的效果。</div></div>`,
  },
  {
    key: 'cdbs016',
    data: `<div class='fn-cd_bs_16'><div>请输入文字</div></div>`,
  },
  {
    key: 'cdbs017',
    data: `<div class='fn-cd_bs_17 fn-cd_bs_16'><div>请输入文字</div></div>`,
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
  {
    key: 'cdli011',
    data: `<div class='fn-cd_li_11'><div>雷锋精神是中华民族传统美德的一种积淀，是一种随着时代进步而不断发展的与时俱进的精神。</div></div>`,
  },
  {
    key: 'cdli012',
    data: `<div class='fn-cd_li_12'> <div class='m-tl'><div>THANKSGIVING</div><div>DAY</div></div><em>感恩节是美国人民独创的一个古老节日，也是美国人合家欢聚的节日。 初时感恩节没有固定日期，由美国各州临时决定。直到美国独立后的1863年，林肯总统宣布感恩节为全国性节日 。</em><br></br><div class='m-ft'><div></div><div></div><div></div><div></div></div></div>`,
  },
  {
    key: 'cdli013',
    data: `<div class='fn-cd_li_13'> <div class='m-ig'><img src=${img2} ></div><div class='m-ct'><div>面对疫情 不必恐慌</div><div>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验，取得了来之不易的重大成果。统筹推进疫情防控和经济社会发展工作，抓紧恢复生产生活秩序，更是让我国成为2020年全球唯一实现经济正增长的主要经济体。</div></div>  </div>`,
  },
  {
    key: 'cdli014',
    data: "<div class='fn-cd_li_14'><div class='m-tl'>星辰大海，永不止步</div><em>浪漫的名字里印刻着中国航天人的艰苦付出、无私奉献，致敬。骄傲，致敬，为中国航天人点赞，我们的征途是星辰大海！可上九天揽月，可下五洋捉鳖，星辰大海，永不止步。致敬为中国航天事业奋斗的所有科研人员，祝福中国航天。</em></div>",
  },
  {
    key: 'cdli015',
    data: "<div class='fn-cd_li_15'><div class='m-bd'>中国互联网企业100强榜单主要参考互联网企业年度发展数据，评价指标既覆盖收入、利润、人力资本等财务指标，也覆盖流量、活跃用户数等业务指标。数据统计采用了计算复合指标的方法，计算得出各家企业在企业规模、社会影响、发展潜力和社会责任四个维度上的得分，加权平均后确定排名。</div></div>",
  },
  {
    key: 'cdli016',
    data: "<div class='fn-cd_li_16'><div class='m-tl'></div><div class='m-bd'>中国互联网企业100强榜单主要参考互联网企业年度发展数据，评价指标既覆盖收入、利润、人力资本等财务指标，也覆盖流量、活跃用户数等业务指标。数据统计采用了计算复合指标的方法，计算得出各家企业在企业规模、社会影响、发展潜力和社会责任四个维度上的得分，加权平均后确定排名。</div></div>",
  },
  {
    key: 'cdli017',
    data: "<div class='fn-cd_li_17'><em>2021/09/03</em><div class='m-tl'>抗日战争胜利纪念日</div><div class='m-bd'>中国人民抗日战争胜利纪念日，是每个中国人都该铭记的日子。铭记历史，吾辈自强！我们从未遗忘！如今，硝烟散去，和平安宁，然而曾经那段血泪写就的过去不能忘，那场不屈不挠的抗争不敢忘。铭记历史，吾辈自强！我们从未遗忘！</div></div>",
  },
  {
    key: 'cdli018',
    data: "<div class='fn-cd_li_18'><div class='m-tl'>生命在于运动</div><em>排球场地设备简单，比赛规则容易掌握。既可在球场上比赛和训练，亦可以在一般空地上活动，运动量可大可小，适合于不同年龄、不同性别、不同体质、不同训练程度的人。</em><div class='m-ft'><div></div></div></div>",
  },
  {
    key: 'cdli019',
    data: "<div class='fn-cd_li_19'><div>愚人节。节期为公历4月1日，是从19世纪开始在西方兴起流行的民间节日，并未被任何国家认定为法定节日。在这一天人们以各种方式互相欺骗和捉弄，往往在玩笑的最后才揭穿并宣告捉弄对象为“愚人”。</div></div>",
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
    data: `<div class='fn-cd_bc_10'><div class='m-tl'><label>项目 | 高山滑雪</label><div class='m-bd'><img src=${img2}></div><em>2015年07月31日17时57分，国际奥委会第128次全会在吉隆坡举行，投票选出2022年冬奥会举办城市。</em><em>2015年07月31日17时57分，国际奥委会第128次全会在吉隆坡举行，投票选出2022年冬奥会举办城市。</em></div></div>`,
  },
  {
    key: 'cdbc011',
    data: `<div class='fn-cd_bc_11'><div class='m-img'><img src=${img2}></div><div class='m-bd'>雷锋精神是中华民族传统美德的一种积淀，是一种随着时代进步而不断发展的与时俱进的精神。</div></div>`,
  },
  {
    key: 'cdbc012',
    data: `<div class='fn-cd_bc_12'><label>01</label><div class='m-tl'><div>在招岗位</div><div>2022 RECRUIT /</div></div><em>2022年校园招聘会即将开始，为满足各用人单位校园招聘的需求，帮助我校求职同学找到心仪的工作。2022年校园招聘会即将开始，为满足各用人单位校园招聘的需求，帮助我校求职同学找到心仪的工作，现对2021年校园招聘相关事宜进行如下安排。</em></div>`,
  },
  {
    key: 'cdbc013',
    data: `<div class='fn-cd_bc_13'><div class='m-img'><img src=${img3}></div><em>1986年1月10日，广州市公安局率先建立我国第一个110报警服务台，正式开展110接处警工作。1987年6月，公安部发文要求各大中城市公安局在一两年内普遍建立110报警服务台，尽快投入使用。自此，110报警电话正式发展成为110报警服务台。</em><div class='m-ft'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`,
  },
  {
    key: 'cdbc014',
    data: `<div class='fn-cd_bc_14'><div class='m-tl'>澳门回归 | 纪念日</div><em>1986年1月10日，广州市公安局率先建立我国第一个110报警服务台，正式开展110接处警工作。1987年6月，公安部发文要求各大中城市公安局在一两年内普遍建立110报警服务台，尽快投入使用。自此，110报警电话正式发展成为110报警服务台。</em></div>`,
  },
  {
    key: 'cdbc015',
    data: `<div class='fn-cd_bc_15'><div class='m-tl'>大寒</div><ul><li>大寒，是二十四节气中的最后一个节气。斗指丑；太阳黄经达300°；于每年公历1月20—21日交节。</li><li>于每年公历1月20—21日交节；大寒同小寒一样，也是表示天气寒冷程度的节气，大寒是天气寒冷到极致的意思。</li><ul></div>`,
  },
  {
    key: 'cdbc016',
    data: `<div class='fn-cd_bc_16'><div class='m-tl'>全年工作总结</div><em>1986年1月10日，广州市公安局率先建立我国第一个110报警服务台，正式开展110接处警工作。1987年6月，公安部发文要求各大中城市公安局在一两年内普遍建立110报警服务台，尽快投入使用。自此，110报警电话正式发展成为110报警服务台。</em></div>`,
  },
  {
    key: 'cdbc017',
    data: `<div class='fn-cd_bc_17'><em>119</em><div class='m-bd'><label>注意防火</label>时光荏苒，不知不觉中，紧张繁忙的一年即将过去，或颓废，或激情。在过去2021年工作中，在公司领导的带领下，严格按照各项工作流程展开工作，恪尽职守，目标明确。</div></div>`,
  },
  {
    key: 'cdbc018',
    data: `<div class='fn-cd_bc_18'><div class='m-bd'>清明节，又称踏青节、行清节、三月节、祭祖节等，节期在仲春与暮春之交。清明节源自上古时代的祖先信仰与春祭礼俗，兼具自然与人文两大内涵，既是自然节气点,也是传统节日。</div></div>`,
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
  {
    key: 'cdpa011',
    data: `<div class='fn-cd_pa_11 '><div>小年通常被视为忙年的开始，意味着人们开始准备年货、扫尘、祭灶等，准备干干净净过个好年，表达了人们一种辞旧迎新、迎祥纳福的美好愿望。由于各地风俗不同，被称为“小年”的日子也不尽相同。</div></div>`,
  },
  {
    key: 'cdpa012',
    data: `<div class='fn-cd_pa_12 '><div class='m-tl'><em>人物简介</em><em>/profile/</em></div><div class='m-bd'>任教高中语文，目前担任“十人课堂”语文老师，所谓“知人而善教”。提倡在教学的同时深入了解学生，意在培养学生成长、成才，教会学生守正树德，昂扬自信。</div></div>`,
  },
  {
    key: 'cdpa013',
    data: `<div class='fn-cd_pa_13 '><img src=${img3}><div><em>1</em><em>时光荏苒，不知不觉中，紧张繁忙的半年即将过去，或颓废，或激情。过去半年的工作中，在公司领导的带领下，严格按照各项工作流程展开工作，恪尽职守，目标明确。</em></div></div>`,
  },
  {
    key: 'cdpa014',
    data: `<div class='fn-cd_pa_14 '><img src=${img3}><div><em>SUMMARY</em></div><em>时光荏苒，不知不觉中，紧张繁忙的半年即将过去，或颓废，或激情。过去半年的工作中，在公司领导的带领下，严格按照各项工作流程展开工作，恪尽职守，目标明确。</em></div>`,
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
    data: `<div class='fn-cd_qu_10'><div class='m-q'><div>面对疫情 不必恐慌</div></div><div class='m-a'><div><div>从最开始对新冠疫情的猝不及防，到全民抗疫的众志成城、共克时艰，再到实现疫情防控常态化，我们积累了丰富的抗疫经验。</div></div></div></div>`,
  },
  {
    key: 'cdqu011',
    data: `<div class='fn-cd_qu_11'><em>Q</em><div></div></div>`,
  },
  {
    key: 'cdqu012',
    data: `<div class='fn-cd_qu_12'><div><em>请输入文字</em></div></div>`,
  },
  {
    key: 'cdqu013',
    data: `<div class='fn-cd_qu_13'><img src=${img3}><div><em>输入名字</em><em>输入对话输入对话</em></div></div>`,
  },
  {
    key: 'cdqu014',
    data: `<div class='fn-cd_qu_14'><div><em>输入文字输入文字</em><em>输入文字输入文字</em></div></div>`,
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
    data: `<div class='fn-cd_ax_10'><div class="m-tl">01</div><div class='m-bd'>地球一小时是世界自然基金会应对全球气候变化所提出的一项全球性节能活动，提倡于每年三月的最后一个星期六当地时间晚上20:30。</div><div class="m-tl">02</div><div class='m-bd'>地球一小时是世界自然基金会应对全球气候变化所提出的一项全球性节能活动，提倡于每年三月的最后一个星期六当地时间晚上20:30。</div><div class="m-tl">03</div><div class='m-bd'>地球一小时是世界自然基金会应对全球气候变化所提出的一项全球性节能活动，提倡于每年三月的最后一个星期六当地时间晚上20:30。</div></div>`,
  },
  {
    key: 'cdax011',
    data: `<div class='fn-cd_ax_11'><div><em>1</em><label>春雷乍动</label></div><em>时至惊蛰，阳气上升、气温回暖、春雷乍动、雨水增多，万物生机盎然。农耕生产与大自然的节律息息相关。</em><div><em>2</em><label>春雷乍动</label></div><em>时至惊蛰，阳气上升、气温回暖、春雷乍动、雨水增多，万物生机盎然。农耕生产与大自然的节律息息相关。</em><div><em>3</em><label>春雷乍动</label></div><em>时至惊蛰，阳气上升、气温回暖、春雷乍动、雨水增多，万物生机盎然。农耕生产与大自然的节律息息相关。</em></div>`,
  },
  {
    key: 'cdax012',
    data: `<div class='fn-cd_ax_12 fn-cd_li_10'><div class='m-bd'><li>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</li><li>由于两场会议会期基本重合，而且对于国家运作的重要程度都非常的高，故简称做“两会”。</li><li>两会是对自1959年以来历年召开的中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。</li></div></div>`,
  },
  {
    key: 'cdax013',
    data: `<div class='fn-cd_ax_13'><div><em>01</em><label>高山滑雪</label></div><em>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</em><div><em>02</em><label>高山滑雪</label></div><em>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</em><div><em>03</em><label>高山滑雪</label></div><em>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</em></div>`,
  },
  {
    key: 'cdax014',
    data: `<div class='fn-cd_ax_14 fn-tl_im_13'><img src=${img3} ><em>01</em><div>据第二次世界大战结束后远东国际军事法庭和南京军事法庭的有关判决和调查，在大屠杀中有20万以上乃至30万以上中国平民和战俘被日军杀害。</div><img src=${img3} ><em>02</em><div>据第二次世界大战结束后远东国际军事法庭和南京军事法庭的有关判决和调查，在大屠杀中有20万以上乃至30万以上中国平民和战俘被日军杀害。</div><img src=${img3} ><em>03</em><div>据第二次世界大战结束后远东国际军事法庭和南京军事法庭的有关判决和调查，在大屠杀中有20万以上乃至30万以上中国平民和战俘被日军杀害。</div></div>`,
  },
  {
    key: 'cdax015',
    data: `<div class='fn-cd_ax_15'><div><em>01</em><div>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</div></div><div><em>02</em><div>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</div></div><div><em>03</em><div>1986年，国际奥委会全会决定把冬季奥运会和夏季奥运会从1994年起分开，每两年间隔举行。</div></div></div>`,
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
    data: `<div class='fn-im_on_13'><div class="m-img"><img src=${img3} ></div><div class='m-bd'><div><em>清</em><em>明</em></div><div><em>Qing</em><em>Ming</em><em>时</em><em>节</em></div></div></div>`,
  },
  {
    key: 'imon014',
    data: `<div class='fn-im_on_14'><div class='m-img'><img src=${img4} ></div></div>`,
  },
];

// 双图
const _IM_TWO = [
  {
    key: 'imtw001',
    data: `<div class='fn-im_tw_1'><div class='fn-tl_sy_1'><i></i><em>1</em><i></i></div><div class="m-bd"><div class="m-img"><img src=${img4} ></div><div class="m-img"><img src=${img4} ></div></div></div>`,
  },
  {
    key: 'imtw010',
    data: `<div class='fn-im_tw_10'><em>02</em><div class="m-limg"><img src=${img3} ></div><div class="m-rimg"><img src=${img3} ></div></div>`,
  },
  {
    key: 'imtw011',
    data: `<div class='fn-im_tw_11'><div class='m-img'><img src=${img3} ></div><div class='m-bd'><div><em>清</em><em>明</em></div><div><em>Qing</em><em>Ming</em><em>时</em><em>节</em></div><img src=${img3}></div></div>`,
  },
  {
    key: 'imtw012',
    data: `<div class='fn-im_tw_12'><div class='m-img'><img src=${img3} ><div class='m-logo'><img src=${img3}></div></div><div class='m-bd'><div><em>清</em><em>明</em></div><div><em>Qing</em><em>Ming</em><em>时</em><em>节</em></div></div></div>`,
  },
];

// 三图
const _IM_THR = [
  {
    key: 'imth001',
    data: `<div class='fn-im_th_1'><em> 图标标题</em><div class="m-img"><img src=${img3} ></div><div class="m-img"><img src=${img3} ><img src=${img3} ></div></div>`,
  },
  {
    key: 'imth010',
    data: `<div class='fn-im_th_10'><div class="m-img"><img src=${img3} ><img src=${img3} ><img src=${img3} ></div><em>图丨全年工作成果展示</em></div>`,
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
  {
    key: 'imci010',
    data: `<div class='fn-im_ci_10 fn-cd_bc_1'><i>2</i><img src=${img3} ></div>`,
  },
  {
    key: 'imci011',
    data: `<div class='fn-im_ci_11'><img src=${img3} ><div class='m-bd'><div><em>清</em><em>明</em></div><div><em>Qing</em><em>Ming</em><em>时</em><em>节</em></div></div></div>`,
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
    data: `<div class='fn-im_ba_10'><div class="m-logo"><img src=${img5} ></div><div class="m-img"><img src=${img5} ></div><div class="m-txt">谷雨是二十四节气的第六个节气，也是春季最后一个节气，每年4月19日～21日时太阳到达黄经30°时为谷雨，源自古人“雨生百谷”之说。同时也是播种移苗、埯瓜点豆的最佳时节。</div></div>`,
  },
  {
    key: 'imba011',
    data: `<div class='fn-im_ba_11'><div><em>时间带着鲜明的恶意，从我身上慢慢流走；我深知，这以后的将来，我们无法一起走过。</em><em>对于命途多舛的人生，以及渺茫的时间，阻隔在我们之间的这一事实，我们无可奈何。 </em><em>如果樱花飘落的速度是每秒5厘米的话，那两颗心要多久才能靠近？</em><em>——新海诚《秒速五厘米》</em></div></div>`,
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
  {
    key: 'lyta010',
    data: `<div class='fn-ly_ta_10'>
        <ul class='m-tl'><li>用户昵称</li><li>@秀小米</li><li>@秀小米</li><li>@秀小米</li><li>@秀小米</li></ul>
        <ul class='m-tl'><li>地区</li><li>上海</li><li>上海</li><li>上海</li><li>上海</li></ul>
        <ul class='m-tl'><li>联系方式</li><li>138xxxx9572</li><li>138xxxx9572</li><li>138xxxx9572</li><li>138xxxx9572</li><ul>
        </div>`,
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

// 自由布局
const _LY_FREE = [
  {
    key: 'lyfr001',
    data: `<div class='fn-cd_bs_1'>内文的标题设计有两款，一款是细线搭配粗线的设计；另一款是同样的细线搭配“空心的粗线”。这两款线的设计都可以运用秀米的布局，可嵌套和可设置单边边框这两个特性就能做出来。本段文字设置了边距20像素。</div>`,
  },
];

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
