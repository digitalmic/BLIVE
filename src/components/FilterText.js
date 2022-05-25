var newBadWords = [
    'tai', 'tahi', 'taek', 't43k', 'ta3k', 't4ek',
    'kontol', 'k0nt0l', 'kont0l', 'k0ntol', 'kontil', 'k0nt1l', 'k0ntil',
    'Jancuk', 'j4ncok', 'jancok', 'janc0k', 'j4nc0k',
    'Anjing','Babi','Kunyuk','Bajingan','Asu','Bangsat','Kampret',
    'Memek','Ngentot','Pentil','Perek','Pepek','Pecun','Bencong',
    'Banci','Maho','Gila','Sinting','Tolol','Sarap','Setan','Lonte',
    'Hencet','Taptei','Kampang','Pilat','Keparat','Bejad','Gembel',
    'Brengsek','Anjrit','Bangsat','Fuck','Tetek','Ngulum','Jembut',
    'Totong','Kolop','Pukimak','Bodat','Heang','Burit','Titit',
    'Nenen','Bejat','Silit','Sempak','Fucking','Asshole','Bitch','Penis',
    'Vagina','Klitoris','Kelentit','Borjong','Dancuk','Pantek',
    'Itil','Teho','Bejat','Pantat','Bagudung','Babami','Kanciang','Bungul',
    'Idiot','Kimak','Henceut','Kacuk','Blowjob','Pussy','Dick','Damn','Ass',
];  

export const filterText = (text) => {
    var Filter = require('bad-words'),
    filter = new Filter();
    filter.addWords(...newBadWords);
    filter.removeWords('suka');
    let filteredText = filter.clean(text + "ABC");
    return filteredText.slice(0, -3);
}