"use client";

import { useEffect, useMemo, useState } from "react";
import AudioPlayer from "../../components/AudioPlayer";

type Language = "uk" | "es";

type Word = {
  number: string;
  title: {
    uk: string;
    es: string;
  };
  reference: string;
  description: {
    uk: string;
    es: string;
  };
};

const words: Word[] = [
  {
    number: "01",
    title: {
      uk: "НЕ БІЙСЯ",
      es: "NO TEMAS",
    },
    reference: "Ісая 41:10",
    description: {
      uk: "Боже Слово нагадує: ти не сам. Бог поруч навіть тоді, коли тобі страшно.",
      es: "La Palabra de Dios nos recuerda que no estamos solos.",
    },
  },
  {
    number: "02",
    title: {
      uk: "ГОСПОДЬ МОЯ СКЕЛЯ",
      es: "EL SEÑOR ES MI ROCA",
    },
    reference: "Псалом 17",
    description: {
      uk: "Коли навколо все нестабільне, Бог залишається твоєю опорою.",
      es: "Cuando todo es inestable, Dios permanece como nuestro refugio.",
    },
  },
  {
    number: "03",
    title: {
      uk: "БОГ Є ЛЮБОВ",
      es: "DIOS ES AMOR",
    },
    reference: "1 Івана 4:8",
    description: {
      uk: "Любов Бога не залежить від наших обставин. Він перший полюбив нас.",
      es: "El amor de Dios no depende de nuestras circunstancias.",
    },
  },
];

const isaiah41 = {
  uk: [

  `Мовчіть, острови, передо мною! Нехай народи відновлять свою силу! Нехай приступлять і тоді говорять, — станьмо на суд разом!`,

  `Хто збудив зі сходу мужа, за яким слідом іде перемога? Хто видає йому народи, хто царів підбиває? Меч його в порох їх обертає, а лук розносить, як солому.`,

  `Ось він за ними вганяє, іде наперед безпечно, ногами не торкається дороги.`,

  `Хто вчинив, хто довершив це? Той, що кличе роди від почину, — я Господь, я перший, я і з останніми той самий.`,

  `Бачать його острови і бояться, кінці землі трясуться. Вони зближаються, разом на суд приходять.`,

  `Один одному допомагає й приговорює до брата свого: «Кріпися!»`,

  `Мистець додає духу золотареві; той, що вигладжує молотком, бадьорить того, хто кує на ковадлі й про споювання говорить: «Воно добре», і цвяхами збиває, щоб не хиталось.`,

  `Ти ж, Ізраїлю, слуго мій! Ти, Якове, якого я вибрав, потомство Авраама, мого друга!`,

  `Ти, якого я взяв з кінців землі і покликав з її окраїн, і сказав до тебе: Ти мій слуга, — я тебе вибрав, я тебе не відкинув.`,

  `Не бійся, бо я з тобою! Не тривожся, бо я — Бог твій! Я додам тобі сили, я тобі допоможу, підтримаю тебе переможною правицею моєю.`,

  `Стидом і соромом окриються усі ті, що лютують проти тебе. На ніщоту обернуться й загинуть ті, що з тобою сварку заводять.`,

  `Ти будеш їх шукати, та не знайдеш тих, що на тебе нападають. На ніщо обернуться і зникнуть ті, що воюють проти тебе.`,

  `Бо я — Господь, твій Бог, я держу тебе за правицю, я тобі говорю: Не бійся, я тобі допомагаю.`,

  `Не бійся, Якове, мій черв’ячку, — слабосилий Ізраїлю! Я тобі допомагаю, — слово Господнє, Святого Ізраїлевого, твого викупителя.`,

  `Я тебе зроблю бороною гострою, новою, з подвійними зубами. Топтатимеш і битимеш гори на порох, пагорби обернеш у дрібну полову.`,

  `Ти віятимеш їх; їх вітер буде розносити, їх буря буде розсівати. Ти ж Господом будеш веселитись, Святим Ізраїля хвалитимешся.`,

  `Злиденні та вбогі шукають води, та її немає. Язик у них від спраги висихає. Я, Господь, їх вислухаю, я, Бог Ізраїля, їх не покину.`,

  `На лисих горах я відкрию ріки, серед долин — джерела. Я зроблю озером пустиню, а суху землю — водяними ручаями.`,

  `Я засаджу пустиню кедром, акацією, афиною та оливкою. Я посаджу в степу кипариса, явора та сосну разом,`,

  `щоб вони бачили й знали, вважали й зрозуміли всі разом, що то рука Господня це вчинила, Святий Ізраїля витворив те.`,

  `Появіть вашу справу, каже Господь, подайте ваші докази, каже цар Якова.`,

  `Нехай приведуть і нехай покажуть нам, що має наступити! Яке було минуле, звістіть нам, щоб ми до нього придивились і впевнились, що воно здійснилось, або яке буде майбутнє, скажіть нам!`,

  `Оповістіть, що станеться пізніше, щоб ми знали, що ви боги! Зробіть принаймні щонебудь, щоб усі ми здивовані дивились!`,

  `Та ви — ніщо, й робота ваша не варта нічого; осоружний — той, хто вас вибирає.`,

  `Я розбудив його з півночі, і він прийшов, зі сходу сонця — того, хто призиває моє ім’я. Він топче можних, як болото, і як гончар місить глину.`,

  `Хто те звістив спочатку, щоб ми знали? Заздалегідь, щоб ми могли сказати: «Це правда?» Ніхто нічого не звістив, ані не оголосив, ніхто не чув слів ваших.`,

  `Я перший звістив про те Сіон, послав у Єрусалим звістовника доброї новини.`,

  `Я розглядавсь, та не було нікого; і не було порадника між ними, щоб їх спитати, і щоб відповіли.`,

  `Усі вони — марнота, робота їх — надармо, порожній вітер — їхні божища литі.`,
  ],
  es: [
    `Escuchadme, islas, y esfuércense los pueblos; alléguense, y entonces hablen: estemos juntamente á juicio.`,
    `¿Quién despertó del oriente al justo, lo llamó para que le siguiese, entregó delante de él naciones, é hízolo enseñorear de reyes; entrególos á su espada como polvo, y á su arco como hojarascas arrebatadas?`,
    `Siguiólos, pasó en paz por camino por donde sus pies nunca habían entrado.`,
    `¿Quién obró é hizo esto? ¿Quién llama las generaciones desde el principio? Yo Jehová, el primero, y yo mismo con los postreros.`,
    `Las islas vieron, y tuvieron temor, los términos de la tierra se espantaron: congregáronse, y vinieron.`,
    `Cada cual ayudó á su cercano, y á su hermano dijo: Esfuérzate.`,
    `El carpintero animó al platero, y el que alisa con martillo al que batía en el yunque, diciendo: Buena está la soldadura, y afirmólo con clavos, porque no se moviese.`,
    `Mas tú, Israel, siervo mío eres, tú, Jacob, á quien yo escogí, simiente de Abraham mi amigo.`,
    `Porque te tomé de los extremos de la tierra, y de sus principales te llamé, y te dije: Mi siervo eres tú, te escogí, y no te deseché.`,
    `No temas, que yo soy contigo; no desmayes, que yo soy tu Dios que te esfuerzo: siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.`,
    `He aquí que todos los que se airan contra ti, serán avergonzados y confundidos: serán como nada y perecerán, los que contienden contigo.`,
    `Los buscarás, y no los hallarás, los que tienen contienda contigo, serán como nada, y como cosa que no es, aquellos que te hacen guerra.`,
    `Porque yo Jehová soy tu Dios, que te ase de tu mano derecha, y te dice: No temas, yo te ayudé.`,
    `No temas, gusano de Jacob, oh vosotros los pocos de Israel; yo te socorrí, dice Jehová, y tu Redentor el Santo de Israel.`,
    `He aquí que yo te he puesto por trillo, trillo nuevo, lleno de dientes: trillarás montes y los molerás, y collados tornarás en tamo.`,
    `Los aventarás, y los llevará el viento, y esparcirálos el torbellino. Tú empero te regocijarás en Jehová, te gloriarás en el Santo de Israel.`,
    `Los afligidos y menesterosos buscan las aguas, que no hay; secóse de sed su lengua; yo Jehová los oiré, yo el Dios de Israel no los desampararé.`,
    `En los altos abriré ríos, y fuentes en mitad de los llanos: tornaré el desierto en estanques de aguas, y en manaderos de aguas la tierra seca.`,
    `Daré en el desierto cedros, espinos, arrayanes, y olivas; pondré en la soledad hayas, olmos, y álamos juntamente;`,
    `Porque vean y conozcan, y adviertan y entiendan todos, que la mano de Jehová hace esto, y que el Santo de Israel lo crió.`,
    `Alegad por vuestra causa, dice Jehová: exhibid vuestros fundamentos, dice el Rey de Jacob.`,
    `Traigan, y anúnciennos lo que ha de venir: dígannos lo que ha pasado desde el principio, y pondremos nuestro corazón en ello; sepamos también su postrimería, y hacednos entender lo que ha de venir.`,
    `Dadnos nuevas de lo que ha de ser después, para que sepamos que vosotros sois dioses; ó á lo menos haced bien, ó mal, para que tengamos qué contar, y juntamente nos maravillemos.`,
    `He aquí que vosotros sois de nada, y vuestras obras de vanidad; abominación el que os escogió.`,
    `Del norte desperté uno, y vendrá; del nacimiento del sol llamará en mi nombre: y hollará príncipes como lodo, y como pisa el barro el alfarero.`,
    `¿Quién lo anunció desde el principio, para que sepamos; ó de tiempo atrás, y diremos: Es justo? Cierto, no hay quien anuncie, sí, no hay quien enseñe, ciertamente no hay quien oiga vuestras palabras.`,
    `Yo soy el primero que he enseñado estas cosas á Sión, y á Jerusalem daré un portador de alegres nuevas.`,
    `Miré, y no había ninguno; y pregunté de estas cosas, y ningún consejero hubo: preguntéles, y no respondieron palabra.`,
    `He aquí, todos iniquidad, y las obras de ellos nada: viento y vanidad son sus vaciadizos.`
  ],
};


const john4 = {
  uk: [

  `Любі, не кожному духові вірте, а випробовуйте духів, чи вони від Бога, — багато бо лжепророків прийшло на світ.`,
  `З цього спізнавайте Божий дух: кожен дух, який визнає, що Ісус Христос прийшов у тілі, той від Бога.`,
  `А кожен дух, що не визнає Ісуса, — той не від Бога, але антихриста, про якого ви чували, що він прийде, та й тепер уже у світі.`,
  `Ви, діточки, від Бога, і перемогли їх, бо більший той, хто у вас, ніж той, хто у світі.`,
  `Вони від світу, тому й говорять по-світському, і світ їх слухає.`,
  `Ми — від Бога. Хто знає Бога, слухає нас; хто ж не від Бога, не слухає нас. З цього спізнаємо дух правди й дух омани.`,
  `Любі, любім один одного, бо любов від Бога, і кожен, хто любить, народився від Бога і знає Бога.`,
  `Хто не любить, той не спізнав Бога, бо Бог — любов.`,
  `Цим виявилася до нас любов Божа, що Бог свого єдинородного Сина послав у світ, щоб ми жили через нього.`,
  `Любов же полягає не в тому, що ми полюбили Бога, а що він полюбив нас і послав Сина свого — примирення за гріхи наші.`,
  `Любі, коли Бог так полюбив нас, то й ми повинні один одного любити.`,
  `Бога ніхто ніколи не бачив. Коли ми любимо один одного, то Бог у нас перебуває, і його любов у нас досконала.`,
  `Що ми перебуваємо в ньому, і він у нас, ми пізнаємо з того, що він дав нам від Духа свого.`,
  `І ми бачили і свідчимо, що Отець послав Сина — Спаса світу.`,
  `Хто визнає, що Ісус — Син Божий, Бог у тому перебуває, і він у Бозі.`,
  `Ми пізнали й увірували в ту любов, яку Бог до нас має. Бог є любов, і хто перебуває в любові, той перебуває в Бозі, і Бог перебуває в ньому.`,
  `Любов у нас звершується в тому, що ми маємо довір'я в день суду, бо як він є, так і ми в цьому світі.`,
  `Страху нема в любові, а, навпаки, досконала любов проганяє геть страх, бо страх має в собі кару, а хто боїться, той недосконалий у любові.`,
  `Ми любимо, бо він перший полюбив нас.`,
  `Коли хтось каже: «Я люблю Бога», а ненавидить брата свого, той не правдомовець. Бо хто не любить брата свого, якого бачить, той не може любити Бога, якого він не бачить.`,
  `І таку ми заповідь одержали від нього: «Хто любить Бога, той нехай любить і брата свого.»`,
  ],
  es: [
    `Amados, no creáis á todo espíritu, sino probad los espíritus si son de Dios; porque muchos falsos profetas son salidos en el mundo.`,
    `En esto conoced el Espíritu de Dios: todo espíritu que confiesa que Jesucristo es venido en carne es de Dios:`,
    `Y todo espíritu que no confiesa que Jesucristo es venido en carne, no es de Dios: y éste es el espíritu del anticristo, del cual vosotros habéis oído que ha de venir, y que ahora ya está en el mundo.`,
    `Hijitos, vosotros sois de Dios, y los habéis vencido; porque el que en vosotros está, es mayor que el que está en el mundo.`,
    `Ellos son del mundo; por eso hablan del mundo, y el mundo los oye.`,
    `Nosotros somos de Dios: el que conoce á Dios, nos oye: el que no es de Dios, no nos oye. Por esto conocemos el espíritu de verdad y el espíritu de error.`,
    `Carísimos, amémonos unos á otros; porque el amor es de Dios. Cualquiera que ama, es nacido de Dios, y conoce á Dios.`,
    `El que no ama, no conoce á Dios; porque Dios es amor.`,
    `En esto se mostró el amor de Dios para con nosotros, en que Dios envió á su Hijo unigénito al mundo, para que vivamos por él.`,
    `En esto consiste el amor: no que nosotros hayamos amado á Dios, sino que él nos amó á nosotros, y ha enviado á su Hijo en propiciación por nuestros pecados.`,
    `Amados, si Dios así nos ha amado, debemos también nosotros amarnos unos á otros.`,
    `Ninguno vió jamás á Dios. Si nos amamos unos á otros, Dios está en nosotros, y su amor es perfecto en nosotros:`,
    `En esto conocemos que estamos en él, y él en nosotros, en que nos ha dado de su Espíritu.`,
    `Y nosotros hemos visto y testificamos que el Padre ha enviado al Hijo para ser Salvador del mundo.`,
    `Cualquiera que confesare que Jesús es el Hijo de Dios, Dios está en él, y él en Dios.`,
    `Y nosotros hemos conocido y creído el amor que Dios tiene para con nosotros. Dios es amor; y el que vive en amor, vive en Dios, y Dios en él.`,
    `En esto es perfecto el amor con nosotros, para que tengamos confianza en el día del juicio; pues como él es, así somos nosotros en este mundo.`,
    `En amor no hay temor; mas el perfecto amor echa fuera el temor: porque el temor tiene pena. De donde el que teme, no está perfecto en el amor.`,
    `Nosotros le amamos á él, porque él nos amó primero.`,
    `Si alguno dice, Yo amo á Dios, y aborrece á su hermano, es mentiroso. Porque el que no ama á su hermano al cual ha visto, ¿cómo puede amar á Dios á quien no ha visto?`,
    `Y nosotros tenemos este mandamiento de él: Que el que ama á Dios, ame también á su hermano.`
  ],
};

export default function WordsPage() {
  const [language, setLanguage] = useState<Language>("uk");
  const [search, setSearch] = useState("");
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [closing, setClosing] = useState(false);
  const [prayerOpen, setPrayerOpen] = useState(false);

  const isUk = language === "uk";

  useEffect(() => {
    if (selectedWord) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedWord]);

  // Allow NFC labels to open a specific patch directly.
  // Example: /words?patch=01
  useEffect(() => {
    const patch = new URLSearchParams(window.location.search).get("patch");

    if (!patch) return;

    const word = words.find((item) => item.number === patch);

    if (word) {
      setSelectedWord(word);
      setPrayerOpen(false);
    }
  }, []);

  const openWord = (word: Word) => {
    setClosing(false);
    setPrayerOpen(false);
    setSelectedWord(word);
  };

  const closeWord = () => {
    setClosing(true);

    window.setTimeout(() => {
      setSelectedWord(null);
      setClosing(false);
      setPrayerOpen(false);
    }, 350);
  };

  const filteredWords = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return words;

    return words.filter((word) =>
      [
        word.number,
        word.title.uk,
        word.title.es,
        word.reference,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [search]);

  return (
    <main className="min-h-screen overflow-hidden bg-black px-5 pb-20 pt-32 text-white sm:px-8">

      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="text-center">

          <p className="text-xs uppercase tracking-[0.5em] text-white/40">
            SELAH
          </p>

          <h1 className="mt-5 text-4xl font-light tracking-tight sm:text-6xl">
            {isUk ? "Слово для тебе" : "Una palabra para ti"}
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
            {isUk
              ? "Знайди свій патч і відкрий Слово, роздуми та молитву."
              : "Encuentra tu parche y descubre la Palabra, una reflexión y una oración."}
          </p>



        </div>

        {/* LANGUAGE */}

        <div className="mt-8 flex justify-center">

          <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-1">

            <button
              type="button"
              onClick={() => setLanguage("uk")}
              className={`rounded-full px-4 py-2 text-xs transition-all duration-500 ${
                language === "uk"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/40 hover:text-white"
              }`}
            >
              UA
            </button>

            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`rounded-full px-4 py-2 text-xs transition-all duration-500 ${
                language === "es"
                  ? "bg-white text-black shadow-lg"
                  : "text-white/40 hover:text-white"
              }`}
            >
              ES
            </button>

          </div>

        </div>

        {/* SEARCH */}

        <div className="mx-auto mt-10 max-w-xl">

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={
              isUk
                ? "Знайти патч: 01, НЕ БІЙСЯ..."
                : "Buscar parche: 01, NO TEMAS..."
            }
            className="w-full rounded-full border border-white/10 bg-white/[0.04] px-6 py-4 text-sm text-white outline-none transition-all duration-500 placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.06]"
          />

        </div>

        {/* PATCHES */}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {filteredWords.map((word) => (

            <button
              key={word.number}
              type="button"
              onClick={() => openWord(word)}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-6
                text-left
                transition-all
                duration-700
                hover:-translate-y-1
                hover:border-white/25
                hover:bg-white/[0.06]
                hover:shadow-2xl
                active:scale-[0.98]
              "
            >

              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-white/[0.02] blur-2xl transition-all duration-700 group-hover:bg-white/[0.07]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <span className="text-xs tracking-[0.3em] text-white/30 transition-colors duration-500 group-hover:text-white/60">
                    PATCH {word.number}
                  </span>

                  <span className="text-white/20 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>

                </div>

                <h2 className="mt-8 text-xl font-light transition-all duration-500 group-hover:tracking-wide">
                  {word.title[language]}
                </h2>

                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/30">
                  {word.reference}
                </p>

                <p className="mt-5 text-sm leading-6 text-white/40 transition-colors duration-500 group-hover:text-white/60">
                  {word.description[language]}
                </p>

                <p className="mt-6 text-xs text-white/20 transition-colors duration-500 group-hover:text-white/50">
                  {isUk ? "Відкрити →" : "Abrir →"}
                </p>

              </div>

            </button>

          ))}

        </div>

        {/* EMPTY */}

        {filteredWords.length === 0 && (

          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">

            <p className="text-white/60">
              {isUk
                ? "Патч не знайдено."
                : "Parche no encontrado."}
            </p>

            <p className="mt-2 text-sm text-white/30">
              {isUk
                ? "Спробуй номер або назву патча."
                : "Prueba con el número o el nombre del parche."}
            </p>

          </div>

        )}

        {/* FOOTER */}

        <div className="mt-20 text-center">

          <p className="text-xs uppercase tracking-[0.4em] text-white/20">
            SELAH
          </p>

          <p className="mt-4 text-xs text-white/25">
            {isUk
              ? "Зупинись. Прочитай. Послухай. Подумай."
              : "Detente. Lee. Escucha. Reflexiona."}
          </p>

        </div>

      </div>

      {/* =====================================================
          MODAL
      ===================================================== */}

      {selectedWord && (

        <div
          className={`fixed inset-0 z-[2000] overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-xl transition-all duration-500 ${
            closing
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          }`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeWord();
            }
          }}
        >

          <div
            className={`mx-auto min-h-full max-w-3xl transition-all duration-500 ease-out ${
              closing
                ? "translate-y-8 scale-[0.97] opacity-0"
                : "translate-y-0 scale-100 opacity-100"
            }`}
          >

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#080808] shadow-2xl">

              <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />

              <div className="relative px-6 pb-12 pt-8 sm:px-10">

                {/* TOP */}

                <div className="flex items-center justify-between">

                  <span className="text-xs uppercase tracking-[0.4em] text-white/30">
                    PATCH {selectedWord.number}
                  </span>

                  <button
                    type="button"
                    onClick={closeWord}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xl text-white/40 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
                    aria-label="Закрити"
                  >
                    ×
                  </button>

                </div>

                {/* TITLE */}

                <div className="mt-14 text-center">

                  <p className="text-xs uppercase tracking-[0.4em] text-white/30">
                    SELAH
                  </p>

                  <h2 className="mt-5 text-4xl font-light tracking-tight sm:text-5xl">
                    {selectedWord.title[language]}
                  </h2>

                  <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/30">
                    {selectedWord.reference}
                  </p>

                </div>

                {/* ISAIAH 41 */}

                {selectedWord.number === "01" || selectedWord.number === "03" ? (

                  <div className="mt-14">

                    <div className="mb-10 text-center">

                      <p className="text-xs uppercase tracking-[0.35em] text-white/30">
                        {isUk
                          ? "Біблія. Святе Письмо Старого і Нового Завіту в перекладі о. Івана Хоменка"
                          : "Sagrada Escritura"}
                      </p>

                      <h3 className="mt-3 text-2xl font-light">
                        {selectedWord.number === "03"
  ? (isUk ? "1 Івана 4" : "1 Juan 4")
  : (isUk ? "Ісая 41" : "Isaías 41")}
                      </h3>

                    </div>

                    <article className="space-y-8 text-[17px] leading-8 text-white/65 sm:text-lg">

                      {(selectedWord.number === "03" ? john4[language] : isaiah41[language]).map((paragraph, index) => {

                        const important =
                          selectedWord.number === "03"
                            ? index === 7 || index === 15 || index === 17
                            : index === 9 || index === 12;

                        return (
                          <p
                            key={index}
                            className={
                              important
                                ? "text-[19px] leading-9 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.65)] sm:text-xl"
                                : "text-white/65"
                            }
                          >
                            {paragraph}
                          </p>
                        );
                      })}

                    </article>

                    {/* ACTIONS */}

                    <div className="mt-14 pt-8">

                      <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-white/25">
                        {isUk
                          ? "Зупинись і побудь із цим Словом"
                          : "Detente y permanece con esta Palabra"}
                      </p>

                      <div className="grid gap-3 sm:grid-cols-2">

                        {/* REFLECTION / AUDIO */}

                        <div className="sm:col-span-2">
                          <AudioPlayer
                            src={selectedWord.number === "03"
                              ? "/audio/1-john-4.mp3"
                              : "/audio/isaiah-41.mp3"}
                            title={isUk
                              ? "Роздуми над Словом"
                              : "Reflexión sobre la Palabra"}
                            reference={selectedWord.number === "03"
                              ? (isUk ? "1 ІВАНА 4:8" : "1 JUAN 4:8")
                              : (isUk ? "ІСАЯ 41" : "ISAÍAS 41")}
                          />

                          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 shadow-[0_0_35px_rgba(255,255,255,0.18)] hover:shadow-[0_0_45px_rgba(255,255,255,0.35)] transition-all duration-500">
                            <span className="mt-0.5 text-base">⚠️</span>

                            <div>
                              <p className="text-sm font-medium leading-6 text-white/80">
                                {isUk
                                  ? "Особистий характер роздумів"
                                  : "Carácter personal de la reflexión"}
                              </p>

                              <p className="mt-1 text-sm leading-6 text-white/50">
                                {isUk
                                  ? "Ці роздуми є особистим духовним переживанням Божого Слова. Господь може промовляти до кожного з нас по-особливому. Особисте розуміння не замінює вчення Церкви, тому важливі духовні висновки варто звіряти зі Святим Письмом, Катехизмом та вченням УГКЦ."
                                  : "Estas reflexiones son una experiencia espiritual personal de la Palabra de Dios. El Señor puede hablar a cada uno de nosotros de manera particular. La comprensión personal no sustituye la enseñanza de la Iglesia; por eso, las conclusiones espirituales importantes deben contrastarse con la Sagrada Escritura, el Catecismo y la enseñanza de la UGCC."}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* PRAYER */}

                        <button
                          type="button"
                          onClick={() =>
                            setPrayerOpen((value) => !value)
                          }
                          className={`group rounded-2xl border px-5 py-4 text-sm transition-all duration-500 ${
                            prayerOpen
                              ? "border-white/30 bg-white/[0.08] text-white"
                              : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                          }`}
                        >

                          <span className="mr-2 inline-block transition-transform duration-500 group-hover:scale-110">
                            🙏
                          </span>

                          {isUk ? "Молитва" : "Oración"}

                          <span className="ml-2 text-white/30">
                            {prayerOpen ? "↑" : "↓"}
                          </span>

                        </button>

                      </div>

                      {/* PRAYER CONTENT */}

                      {prayerOpen && (

                        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] px-6 py-7 opacity-100 transition-all duration-700 sm:px-8">

                          <div className="text-center">

                            <p className="text-xs uppercase tracking-[0.35em] text-white/25">
                              {isUk
                                ? "Молитва"
                                : "Oración"}
                            </p>

                            <div className="mx-auto mt-6 h-px w-12 bg-white/10" />

                          </div>

                          <div className="mt-7 space-y-5 text-[16px] leading-8 text-white/65 sm:text-lg">
                            {isUk ? (
                              <>
                                <p>
                                  Господи Боже мій, люблячий Пастирю і Отче,
                                  Ти породив мене з любові й для любові.
                                  Даруй мені ласку кожного дня проживати так, як Ти хочеш,
                                  і розуміти, що кожен день даний мені для того,
                                  щоб я шукав і знаходив Тебе.
                                </p>

                                <p>
                                  Даруй Свою благодать мені та моїм рідним,
                                  щоб ми йшли дорогою до святості.
                                  Даруй мені ласку смирення і любові,
                                  бо знаю: там, де немає смирення,
                                  там немає справжньої любові.
                                </p>

                                <p>
                                  Дай мені ласку розпізнавати
                                  і бути мудрим у своїх виборах.
                                  Нехай моє серце завжди шукає Тебе, мого Бога.
                                  Нехай моє серце належить Тобі й буде для Тебе.
                                  Амінь.
                                </p>
                              </>
                            ) : (
                              <>
                                <p>
                                  Señor, Dios mío, Pastor amoroso y Padre,
                                  Tú me has creado por amor y para el amor.
                                  Concédeme la gracia de vivir cada día como Tú quieres
                                  y de comprender que cada día me es dado
                                  para buscarte y encontrarte.
                                </p>

                                <p>
                                  Derrama tu gracia sobre mí y sobre mis seres queridos,
                                  para que caminemos hacia la santidad.
                                  Concédeme la gracia de la humildad y del amor,
                                  porque sé que donde no hay humildad,
                                  no puede existir un amor verdadero.
                                </p>

                                <p>
                                  Dame la gracia de discernir
                                  y de ser sabio en mis decisiones.
                                  Que mi corazón te busque siempre a Ti, mi Dios.
                                  Que mi corazón te pertenezca y sea para Ti.
                                  Amén.
                                </p>
                              </>
                            )}

</div>

                          <div className="mt-8 flex justify-center">

                            <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-white/25">
                              SELAH
                            </div>

                          </div>

                        </div>

                      )}

                    </div>

                  </div>

                ) : selectedWord.number === "03" ? (

                  <div className="mt-14">

                    <div className="mb-10 text-center">

                      <p className="text-xs uppercase tracking-[0.35em] text-white/30">
                        {isUk
                          ? "Біблія. Святе Письмо Старого і Нового Завіту в перекладі о. Івана Хоменка"
                          : "Sagrada Escritura"}
                      </p>

                      <h3 className="mt-3 text-2xl font-light">
                        {isUk ? "1 Івана 4" : "1 Juan 4"}
                      </h3>

                    </div>

                    <article className="space-y-8 text-[17px] leading-8 text-white/65 sm:text-lg">

                      {john4.map((paragraph, index) => {

                        const important =
                          index === 7 ||
                          index === 15 ||
                          index === 17 ||
                          index === 18 ||
                          index === 19 ||
                          index === 20;

                        return (
                          <p
                            key={index}
                            className={
                              important
                                ? "text-[19px] leading-9 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.65)] sm:text-xl"
                                : "text-white/65"
                            }
                          >
                            {paragraph}
                          </p>
                        );
                      })}

                    </article>

                    <div className="mt-14 pt-8">

                      <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-white/25">
                        {isUk
                          ? "Зупинись і побудь із цим Словом"
                          : "Detente y permanece con esta Palabra"}
                      </p>

                    </div>

                  </div>

                ) : (

                  /* OTHER PATCHES */

                  <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">

                    <p className="text-white/50">
                      {isUk
                        ? "Матеріал цього патча додамо наступним кроком."
                        : "El contenido de este parche se añadirá próximamente."}
                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}