const endings = ['nadie', 'mí', 'ti', 'él', 'nosotros', 'ustedes', 'ellos'];
const starts = [
  'No creo',
  'No creer',
  'No crees',
  'No cree',
  'No creemos',
  'No creen',
  'No creía',
  'No creías',
  'No creíamos',
  'No creían',
  'No creí',
  'No creíste',
  'No creyó',
  'No creímos',
  'No creyeron',
  'No creeré',
  'No creerás',
  'No creerá',
  'No creeremos',
  'No creerán',
  'No creería',
  'No creerías',
  'No creeríamos',
  'No creerían',
  'No he creído',
  'No has creído',
  'No ha creído',
  'No hemos creído',
  'No han creído',
  'No había creído',
  'No habías creído',
  'No habíamos creído',
  'No habían creído',
  'No hube creído',
  'No hubiste creído',
  'No hubo creído',
  'No hubimos creído',
  'No hubieron creído',
  'No habré creído',
  'No habré creído',
  'No habrás creído',
  'No habrá creído',
  'No habremos creído',
  'No habrán creído',
  'No habría creído',
  'No habrías creído',
  'No habríamos creído',
  'No habrían creído',
  'Puede que no crea',
  'Puede que no creas',
  'Puede que no creamos',
  'Puede que no crean',
  'No creyera',
  'No creyese',
  'No creyeras',
  'No creyeses',
  'No creyéramos',
  'No creyésemos',
  'No creyeran',
  'No creyesen',
  'No hubiera creído',
  'No hubiese creído',
  'No hubieras creído',
  'No hubieses creído',
  'No hubiéramos creído',
  'No hubiésemos creído',
  'No hubieran creído',
  'No hubiesen creído',
  'No haya creído',
  'No hayas creído',
  'No hayamos creído',
  'No hayan creído',
  'No creas',
  'No creamos',
  'No crean',
  'No creyendo',
  'Habiendo no creído',
  'No haber creído'
];

const list = {
  continue : false,
  index : -1,
  phrases : _.flatMap(starts, (sta) => _.map(endings, (end) => `${sta} en ${end}`)),
  HTML() {
    return `<div id="list-row"></div>`;
  },
  show(phrase) {
    id$('list-row').text(phrase);
  },
  showAll() {
    if (list.continue) {
      // console.log("list");

      if (list.index >= 0) {
        list.show(list.phrases[list.index]);
        list.index = list.index - 1;
        list.timeoutID = setTimeout(list.showAll, 1250);
      } else {
        list.phrases = _.shuffle(list.phrases);
        list.index = _.size(list.phrases);
        list.showAll();
      }
    }
  },
  start() {
    if (! list.initialized) {
      // initialize it with something
      list.show(_.sample(list.phrases));
      list.initialized = true;
    }

    list.continue = true;
    list.showAll();
  },
  stop() {
    list.continue = false;
    clearTimeout(list.timeoutID);
  }
}

swpr.on('slideChangeStart', function (a) {
  if (a.realIndex == INDEX_LIST) {
    list.start();
  } else {
    list.stop();
  }
});
