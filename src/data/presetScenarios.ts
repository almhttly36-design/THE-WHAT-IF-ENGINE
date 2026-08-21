import { Locale } from '../config/i18n.config';

export interface ScenarioQuestion {
  id: string;
  category: 'history' | 'tech' | 'space' | 'nature' | 'economy' | 'philosophy';
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  icon: string;
}

export interface ScenarioCategory {
  id: 'all' | 'history' | 'tech' | 'space' | 'nature' | 'economy' | 'philosophy';
  label: Record<Locale, string>;
  emoji: string;
}

export const SCENARIO_CATEGORIES: ScenarioCategory[] = [
  {
    id: 'all',
    label: {
      ar: 'جميع الأسئلة والسيناريوهات',
      en: 'All Scenarios',
      es: 'Todos los escenarios',
      fr: 'Tous les scénarios',
    },
    emoji: '✨',
  },
  {
    id: 'history',
    label: {
      ar: 'التاريخ والحضارات',
      en: 'History & Civilizations',
      es: 'Historia y Civilizaciones',
      fr: 'Histoire et Civilisations',
    },
    emoji: '📜',
  },
  {
    id: 'tech',
    label: {
      ar: 'الذكاء الاصطناعي والمستقبل',
      en: 'AI & Future Tech',
      es: 'IA y Tecnología Futura',
      fr: 'IA et Technologie Future',
    },
    emoji: '🤖',
  },
  {
    id: 'nature',
    label: {
      ar: 'المناخ والطبيعة',
      en: 'Earth & Nature',
      es: 'Tierra y Naturaleza',
      fr: 'Terre et Nature',
    },
    emoji: '🌿',
  },
  {
    id: 'space',
    label: {
      ar: 'الفضاء والفيزياء',
      en: 'Space & Physics',
      es: 'Espacio y Física',
      fr: 'Espace et Physique',
    },
    emoji: '🚀',
  },
  {
    id: 'economy',
    label: {
      ar: 'الاقتصاد والجيوسياسة',
      en: 'Economy & Geopolitics',
      es: 'Economía y Geopolítica',
      fr: 'Économie et Géopolitique',
    },
    emoji: '🌐',
  },
  {
    id: 'philosophy',
    label: {
      ar: 'الفلسفة والوعي البشري',
      en: 'Philosophy & Human Nature',
      es: 'Filosofía y Mente Humana',
      fr: 'Philosophie et Conscience',
    },
    emoji: '🧠',
  },
];

export const PRESET_SCENARIOS: ScenarioQuestion[] = [
  // History & Civilizations
  {
    id: 'andalus-flourish',
    category: 'history',
    icon: '🏰',
    title: {
      ar: 'ماذا لو لم تسقط الأندلس واستمرت كقوة علمية وصناعية رائدة حتى العصر الحديث؟',
      en: 'What if Al-Andalus never fell and continued as a scientific and industrial powerhouse into the modern era?',
      es: '¿Qué pasaría si Al-Ándalus nunca hubiera caído y continuara como potencia científica e industrial?',
      fr: 'Et si Al-Andalus n’était jamais tombée et était restée une puissance scientifique et industrielle ?',
    },
    description: {
      ar: 'تأثير استمرار التلاقح الحضاري العربي-الأوروبي، مسار الثورة الصناعية المبكرة، والخرائط الجيوسياسية للبحر المتوسط.',
      en: 'Explores early industrial acceleration, medical and astronomical milestones, and a completely transformed Mediterranean order.',
      es: 'Aceleración científica temprana, orden geopolítico mediterráneo y desarrollo industrial.',
      fr: 'Accélération de la révolution scientifique et industrielle en Europe et en Méditerranée.',
    },
  },
  {
    id: 'alexandria-library',
    category: 'history',
    icon: '📚',
    title: {
      ar: 'ماذا لو نجت مكتبة الإسكندرية بالكامل ولم تحترق مخطوطاتها وعلومها القديمة؟',
      en: 'What if the Library of Alexandria was never destroyed and all ancient lost scientific scrolls survived?',
      es: '¿Qué pasaría si la Biblioteca de Alejandría nunca hubiera sido destruida?',
      fr: 'Et si la Bibliothèque d’Alexandrie n’avait jamais été détruite ?',
    },
    description: {
      ar: 'هل كان البشر سيصلون إلى الثورة الصناعية والهبوط على القمر قبل 1000 عام من موعده؟',
      en: 'Could human spaceflight and calculus have arrived a thousand years earlier?',
      es: '¿Podría la humanidad haber avanzado un milenio en matemáticas, medicina y astronomía?',
      fr: 'L’humanité aurait-elle atteint l’ère spatiale mille ans plus tôt ?',
    },
  },
  {
    id: 'baghdad-house-of-wisdom',
    category: 'history',
    icon: '🏛️',
    title: {
      ar: 'ماذا لو لم يدمر المغول بغداد ودار الحكمة في عام 1258؟',
      en: 'What if the Mongol siege of Baghdad in 1258 was repelled and the House of Wisdom remained intact?',
      es: '¿Qué pasaría si Bagdad y la Casa de la Sabiduría nunca hubieran sido destruidas en 1258?',
      fr: 'Et si le siège de Bagdad en 1258 avait échoué et que la Maison de la Sagesse avait survécu ?',
    },
    description: {
      ar: 'حفظ آلاف المجلدات الفلكية والكيميائية والطبية، واستمرار الشرق الأوسط كقطب للابتكار العالمي.',
      en: 'Preservation of hundreds of thousands of scientific volumes and unbroken academic momentum.',
      es: 'Preservación de manuscritos científicos y liderazgo tecnológico continuo.',
      fr: 'Préservation des manuscrits scientifiques et continuité du siècle d’or islamique.',
    },
  },
  {
    id: 'ww1-avoided',
    category: 'history',
    icon: '🕊️',
    title: {
      ar: 'ماذا لو فشلت حادثة اغتيال الأرشيدوق فرانز فرديناند وتجنب العالم الحرب العالمية الأولى؟',
      en: 'What if the assassination of Archduke Franz Ferdinand failed, preventing World War I?',
      es: '¿Qué pasaría si se hubiera evitado la Primera Guerra Mundial en 1914?',
      fr: 'Et si l’assassinat de François-Ferdinand avait échoué et que la Première Guerre Mondiale avait été évitée ?',
    },
    description: {
      ar: 'بقاء الإمبراطوريات الأوروبية والعثمانية، عدم صعود الشمولية في أوروبا، ومسار مغاير للقرن العشرين.',
      en: 'Preventing the collapse of multi-ethnic empires, avoiding the rise of 1930s totalitarian regimes.',
      es: 'Continuidad de imperios tradicionales y prevención de regímenes autoritarios en el siglo XX.',
      fr: 'Préservation de l’ordre impérial et évitement des totalitarismes du XXe siècle.',
    },
  },
  {
    id: 'america-not-colonized',
    category: 'history',
    icon: '🏹',
    title: {
      ar: 'ماذا لو لم تبدأ رحلات كولومبوس عام 1492 وتطورت حضارات المايا والإنكا والأزتيك باستقلالية؟',
      en: 'What if Columbus never made contact in 1492 and Indigenous American civilizations evolved independently?',
      es: '¿Qué pasaría si el contacto de 1492 no hubiera ocurrido y las civilizaciones americanas prosperaran?',
      fr: 'Et si Christophe Colomb n’avait pas accosté en 1492 et que les civilisations précolombiennes avaient prospéré ?',
    },
    description: {
      ar: 'تطور الأنظمة المعمارية والزراعية والطبية المستقلة وتجارة المحيطين بتبادل متكافئ.',
      en: 'Independent agricultural systems, monumental engineering, and balanced transatlantic maritime diplomacy.',
      es: 'Desarrollo autónomo de tecnología agrícola, arquitectura y comercio equilibrado.',
      fr: 'Développement autonome des technologies agricoles, architecturales et médicales.',
    },
  },

  // AI & Future Tech
  {
    id: 'ai-singularity-1980',
    category: 'tech',
    icon: '⚡',
    title: {
      ar: 'ماذا لو ظهر الذكاء الاصطناعي العام (AGI) في عام 1980 مع بداية الحواسيب الشخصية؟',
      en: 'What if Artificial General Intelligence (AGI) emerged in 1980 alongside early microcomputers?',
      es: '¿Qué pasaría si la Inteligencia Artificial General hubiera nacido en 1980?',
      fr: 'Et si l’Intelligence Artificielle Générale (IAG) était apparue dès 1980 ?',
    },
    description: {
      ar: 'كيف كان شكل الحرب الباردة، استكشاف الفضاء، والأتمتة العالمية مع حواسيب تفوق الذكاء البشري قبل 40 عاماً؟',
      en: 'How the Cold War, early internet, and global automation would look with superintelligent compute 40 years early.',
      es: 'La Guerra Fría, la carrera espacial y el mercado laboral con superinteligencias en los 80s.',
      fr: 'L’impact sur la Guerre Froide, la conquête spatiale et l’automatisation globale.',
    },
  },
  {
    id: 'fusion-energy-free',
    category: 'tech',
    icon: '☀️',
    title: {
      ar: 'ماذا لو تم إتقان الاندماج النووي النظيف اللامحدود غداً وتوفير الكهرباء مجاناً لجميع سكان الأرض؟',
      en: 'What if limitless zero-emission nuclear fusion energy was achieved tomorrow and distributed for free?',
      es: '¿Qué pasaría si la energía de fusión nuclear limpia e infinita fuera descubierta mañana de forma gratuita?',
      fr: 'Et si l’énergie de fusion nucléaire illimitée et propre était découverte demain et gratuite ?',
    },
    description: {
      ar: 'تحلية مياه المحيطات بتكلفة صفرية، انهيار أسواق الوقود الأحفوري، وثورة استصلاح الصحاري في العالم.',
      en: 'Near-zero cost seawater desalination, collapse of fossil fuel geopolitics, and global green transformation.',
      es: 'Desalinización masiva, fin de la dependencia del petróleo y reforestación global acelerada.',
      fr: 'Dessalement d’eau massif, effondrement des énergies fossiles et transformation écologique.',
    },
  },
  {
    id: 'global-internet-blackout',
    category: 'tech',
    icon: '🔌',
    title: {
      ar: 'ماذا لو انقطع الإنترنت والشبكات السحابية تماماً عن العالم لمدة عام كامل؟',
      en: 'What if the global internet and cloud infrastructure suffered an irreversible 12-month complete blackout?',
      es: '¿Qué pasaría si Internet y la nube sufrieran un apagón total durante un año entero?',
      fr: 'Et si Internet et le cloud subissaient une panne mondiale totale pendant 1 an ?',
    },
    description: {
      ar: 'تأثير الانقطاع على النظام المصرفي، سلاسل التوريد الغذائية، عودة الأنظمة الورقية، وإعادة تشكيل المجتمعات.',
      en: 'Survival of financial ledgers, local supply chains, physical logistics, and social restructuring.',
      es: 'Crisis bancaria, cadenas de suministro locales y retorno de sistemas analógicos y físicos.',
      fr: 'Gestion de l’économie mondiale, chaînes logistiques locales et retour au papier.',
    },
  },
  {
    id: 'quantum-encryption-crack',
    category: 'tech',
    icon: '🔐',
    title: {
      ar: 'ماذا لو نجح حاسوب كمومي فائق في كسر جميع بروتوكولات التشفير (RSA/ECC) في العالم فجأة؟',
      en: 'What if a quantum computer instantly broke all global cryptography protocols without warning?',
      es: '¿Qué pasaría si una computadora cuántica descifrara de golpe toda la criptografía del mundo?',
      fr: 'Et si un ordinateur quantique brisait instantanément tous les protocoles de chiffrement mondiaux ?',
    },
    description: {
      ar: 'مصير العملات المشفرة، أسرار الحكومات العسكرية، وأمن البنوك والاتصالات الفضائية.',
      en: 'The fate of cryptocurrency, military state secrets, commercial banking, and post-quantum emergency shields.',
      es: 'Caída de criptomonedas, secretos de defensa y transición de emergencia a criptografía cuántica.',
      fr: 'Sécurité bancaire, cryptomonnaies et secrets d’État face à l’informatique quantique.',
    },
  },

  // Earth & Nature
  {
    id: 'green-sahara-permanent',
    category: 'nature',
    icon: '🌴',
    title: {
      ar: 'ماذا لو تحولت الصحراء الكبرى في إفريقيا إلى غابات خضراء وأنهار عذبة دائمة؟',
      en: 'What if the Sahara Desert remained permanently green with lush rivers and mega-lakes?',
      es: '¿Qué pasaría si el desierto del Sahara se transformara en selvas verdes y ríos caudalosos?',
      fr: 'Et si le désert du Sahara était resté une région verdoyante couverte de forêts et de fleuves ?',
    },
    description: {
      ar: 'إعادة توزيع الكثافة السكانية في إفريقيا، القضاء على الجوع، وتغير التيارات المناخية للمحيط الأطلسي.',
      en: 'African population redistribution, elimination of food scarcity, and alteration of Atlantic hurricane paths.',
      es: 'Potencia agrícola global, nuevas rutas comerciales y estabilización del clima planetario.',
      fr: 'Grenier agricole mondial, nouvelles civilisations fluviales et régulation du climat.',
    },
  },
  {
    id: 'gravity-half',
    category: 'nature',
    icon: '🪐',
    title: {
      ar: 'ماذا لو انخفضت جاذبية كوكب الأرض فجأة بنسبة 50% مع الحفاظ على الغلاف الجوي؟',
      en: 'What if Earth’s gravity permanently decreased by 50% while retaining its atmospheric pressure?',
      es: '¿Qué pasaría si la gravedad de la Tierra disminuyera un 50% de la noche a la mañana?',
      fr: 'Et si la gravité terrestre diminuait soudainement de 50 % ?',
    },
    description: {
      ar: 'تأثير ذلك على البناء المعماري الشاهق، القفز البشري، حركة الطيران والحيوانات، وديناميكا المحيطات.',
      en: 'Megastructure architecture, human locomotion, megafauna evolution, and fluid flight dynamics.',
      es: 'Arquitectura kilométrica, vuelos hipereconómicos y cambios biológicos en masa ósea.',
      fr: 'Gratte-ciels de plusieurs kilomètres, modes de transport aérien et adaptations biologiques.',
    },
  },
  {
    id: 'cure-all-viruses',
    category: 'nature',
    icon: '🧬',
    title: {
      ar: 'ماذا لو تم القضاء على جميع الفيروسات ومسببات الأمراض المعدية للبشر في 24 ساعة؟',
      en: 'What if all viral pathogens affecting humans were completely eradicated overnight?',
      es: '¿Qué pasaría si se erradicaran todos los virus patógenos humanos en 24 horas?',
      fr: 'Et si tous les virus pathogènes humains étaient éradiqués en 24 heures ?',
    },
    description: {
      ar: 'تضاعف متوسط عمر الإنسان، الضغط على الموارد الطبيعية، وإعادة توجيه تريليونات الدولارات من الرعاية الصحية.',
      en: 'Surge in human longevity, resource allocation pressures, and redirection of healthcare GDP into research.',
      es: 'Aumento masivo de la esperanza de vida y reestructuración económica de los sistemas de salud.',
      fr: 'Explosion de l’espérance de vie et réorientation des budgets mondiaux de santé.',
    },
  },

  // Space & Physics
  {
    id: 'mars-colony-2030',
    category: 'space',
    icon: '🔴',
    title: {
      ar: 'ماذا لو نجح البشر في تأسيس مستعمرة مريخية مكتفية ذاتياً يقطنها 100,000 إنسان بحلول 2030؟',
      en: 'What if a self-sustaining Martian civilization of 100,000 residents was fully established by 2030?',
      es: '¿Qué pasaría si existiera una colonia marciana autosuficiente de 100.000 habitantes en 2030?',
      fr: 'Et si une colonie martienne autonome de 100 000 habitants voyait le jour d’ici 2030 ?',
    },
    description: {
      ar: 'ظهور أول دستور وقوانين خارج الأرض، تعدين الكويكبات، وبداية انقسام الهوية البشرية بين الأرض والمريخ.',
      en: 'First interplanetary governance system, asteroid mining economies, and multi-planet human divergence.',
      es: 'Nuevas leyes extraterrestres, economía minera espacial y evolución cultural entre dos mundos.',
      fr: 'Première constitution interplanétaire et exploitation minière des astéroïdes.',
    },
  },
  {
    id: 'faster-than-light',
    category: 'space',
    icon: '🌌',
    title: {
      ar: 'ماذا لو تم اكتشاف محرك اعوجاج فضائي (Warp Drive) يتيح السفر بأسرع من الضوء؟',
      en: 'What if a functional Alcubierre Warp Drive enabled faster-than-light interstellar travel?',
      es: '¿Qué pasaría si descubriéramos un motor de curvatura más rápido que la luz?',
      fr: 'Et si nous découvrions un moteur à distorsion permettant de dépasser la vitesse de la lumière ?',
    },
    description: {
      ar: 'استعمار النجوم المجاورة مثل ألفا قنطورس، سباق التوسع المجري، وتأثير نسبية الزمن على الحضارة.',
      en: 'Interstellar colonization of Alpha Centauri, galactic resource booms, and relativistic temporal paradoxes.',
      es: 'Colonización de sistemas estelares cercanos y nueva era de exploración cósmica.',
      fr: 'Colonisation des exoplanètes habitables et nouvelle géopolitique galactique.',
    },
  },

  // Economy & Geopolitics
  {
    id: 'universal-basic-income',
    category: 'economy',
    icon: '💳',
    title: {
      ar: 'ماذا لو طبقت جميع دول العالم دخلاً أساسياً شاملاً غير مشروط يعادل 2000 دولار شهرياً لكل مواطن؟',
      en: 'What if every nation instituted a mandatory $2,000/month Universal Basic Income (UBI) for all adults?',
      es: '¿Qué pasaría si todos los países implementaran una Renta Básica Universal de 2000$/mes?',
      fr: 'Et si un revenu universel inconditionnel de 2 000 $/mois était instauré partout dans le monde ?',
    },
    description: {
      ar: 'تحول مفاهيم العمل والإنتاج، التضخم وإعادة توزيع الثروات، وازدهار الفنون والابتكارات الفردية.',
      en: 'Shift in employment incentives, macroeconomic inflation balancing, and creative entrepreneurship explosion.',
      es: 'Revolución en el mercado laboral, equilibrio del consumo y auge del emprendimiento.',
      fr: 'Transformation du monde du travail, consommation et redistribution des richesses.',
    },
  },
  {
    id: 'single-global-currency',
    category: 'economy',
    icon: '🪙',
    title: {
      ar: 'ماذا لو اتفقت دول العالم على إلغاء جميع العملات المحلية واستخدام عملة رقمية مشفرة واحدة موحدة؟',
      en: 'What if the world abolished national fiat currencies and unified under a single decentralized digital standard?',
      es: '¿Qué pasaría si existiera una única moneda digital mundial descentralizada?',
      fr: 'Et si le monde entier adoptait une monnaie numérique universelle unique ?',
    },
    description: {
      ar: 'نهاية مضاربات الصرف الأجنبي، تقييد السياسات النقدية للدول الكبرى، وتوحيد أسعار التجارة العالمية.',
      en: 'Elimination of forex friction, removal of sovereign currency hegemony, and seamless global trade.',
      es: 'Fin de la especulación de divisas y comercio internacional sin barreras monetarias.',
      fr: 'Fin des frais de change et harmonisation du commerce international.',
    },
  },

  // Philosophy & Human Nature
  {
    id: 'human-telepathy',
    category: 'philosophy',
    icon: '💭',
    title: {
      ar: 'ماذا لو ولد جميع البشر بقدرة فطرية على قراءة أفكار ومشاعر الآخرين بشفافية كاملة دون كذب؟',
      en: 'What if all humans possessed innate telepathy, making deceit and hidden intent biologically impossible?',
      es: '¿Qué pasaría si todos los humanos pudieran leer los pensamientos de los demás sin poder mentir?',
      fr: 'Et si tous les humains pouvaient lire les pensées des autres sans pouvoir mentir ?',
    },
    description: {
      ar: 'انهيار الجرائم والخداع السياسي، إعادة تعريف الخصوصية، وظهور وعي جمعي مشترك للأخلاق.',
      en: 'Total obsolescence of fraud and political deceit, radical redefinition of personal privacy and empathy.',
      es: 'Eliminación del engaño, transparencia gubernamental absoluta y nueva ética colectiva.',
      fr: 'Disparition du mensonge en politique, fin de la criminalité et redéfinition de l’intimité.',
    },
  },
  {
    id: 'biological-immortality',
    category: 'philosophy',
    icon: '⏳',
    title: {
      ar: 'ماذا لو اكتشف علم الوراثة علاجاً يوقف الشيخوخة البيولوجية ويمنح الإنسان خلوداً جسدياً؟',
      en: 'What if genetic science completely halted biological aging, granting humans indefinite cellular lifespan?',
      es: '¿Qué pasaría si la ciencia lograra detener el envejecimiento biológico para siempre?',
      fr: 'Et si la science parvenait à stopper le vieillissement biologique et offrait l’immortalité ?',
    },
    description: {
      ar: 'قوانين تنظيم الإنجاب، وتراكم الخبرات لمئات السنين، وإعادة تصميم مسار التقاعد والزواج والحياة.',
      en: 'Multi-century careers, population quotas, compounding intellectual mastery, and psychological shifts.',
      es: 'Reestructuración de la jubilación, acumulación centenaria de conocimiento y control de natalidad.',
      fr: 'Carrières sur plusieurs siècles, maîtrise des compétences et régulation des naissances.',
    },
  },
];
