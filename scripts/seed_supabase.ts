import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mlddejzqitlgjdjogiys.supabase.co';
const SUPABASE_KEY = 'sb_publishable_b92HvXVnM9UtyiGdZ7yojg_pMkyMPPj';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const scenarios = [
  // 1
  {
    prompt: 'ماذا لو استبدل الذكاء الاصطناعي 50% من الوظائف المكتبية في العالم العربي بحلول 2030؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'أتمتة واسعة النطاق للمهام الإدارية والمحاسبية وخدمة العملاء في الشرق الأوسط بواسطة وكلاء الذكاء الاصطناعي، مما يعيد هيكلة سوق العمل الإقليمي.',
      risk_index: 70,
      optimistic: 'قفزة هائلة في إنتاجية الشركات وتأسيس جيل جديد من رواد الأعمال التقنيين القادرين على المنافسة بتكاليف منخفضة.',
      pessimistic: 'ارتفاع معدلات البطالة بين خريجي التخصصات التقليدية وفجوة رقمية واسعة بين المتخصصين وغير المؤهلين تقنياً.',
      temporal_impact: {
        immediate: 'تسارع اعتماد البنوك والشركات على خدمة العملاء المؤتمتة بالذكاء الاصطناعي التوليدي.',
        mid_term: 'إصلاح جذري في المناهج الجامعية لتركز على هندسة البيانات وحلول الذكاء الاصطناعي.',
        long_term: 'تحول الاقتصاد العربي نحو اقتصاد رقمي معرفي يعتمد على الابتكار والأتمتة.'
      },
      contingency_plan: [
        'إعادة تأهيل المهارات المهنية نحو إدارة الأنظمة الذكية وتحليل البيانات والقيادة الإستراتيجية.',
        'تعلم بناء وتوجيه وكلاء الذكاء الاصطناعي المخصصين لقطاعات الأعمال المحلية.',
        'الاستثمار في بناء علامة شخصية مهنية تركز على التفكير الإبداعي وحل المشكلات المعقدة.'
      ]
    }
  },
  // 2
  {
    prompt: 'ماذا لو استثمرت 1000 دولار شهرياً في الذهب وتاسي (TASI) لمدة 10 سنوات؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'تطبيق استراتيجية الاستثمار التراكمي المنتظم (DCA) بتقسيم المدخرات بين الذهب والأسهم القيادية في السوق المالية السعودية.',
      risk_index: 32,
      optimistic: 'تحقيق عوائد مركبة تتجاوز 12-15% سنوياً وبناء ثروة تقاعدية قوية مع حماية كاملة ضد تآكل القوة الشرائية.',
      pessimistic: 'تباطؤ العوائد في الفترات التي تشهد ركوداً في أسواق السلع وتصحيحات حادة في تقييمات الأسهم.',
      temporal_impact: {
        immediate: 'بناء انضباط مالي ذاتي واقتطاع تلقائي منتظم من الدخل الشهري.',
        mid_term: 'استفادة استثمارية مباشرة من توزيعات الأرباح النقدية وإعادة استثمارها.',
        long_term: 'تضاعف القيمة الصافية للأصول وتحقيق استقلال مالي متقدم.'
      },
      contingency_plan: [
        'الالتزام بالشراء المنتظم بغض النظر عن تقلبات السوق اليومية.',
        'إعادة موازنة المحفظة سنوياً للحفاظ على نسبة متوازنة (60% أسهم 40% ذهب).',
        'الاحتفاظ بصندوق طوارئ سائل يغطي مصاريف 6 أشهر لتجنب البيع الاضطراري.'
      ]
    }
  },
  // 3
  {
    prompt: 'ماذا لو انتقلت للعيش والعمل في مشروع نيوم وذا لاين؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'الهجرة للعمل في أكبر مشروع مستقبلي عالمي للبنية التحتية والاستدامة والتقنيات الفائقة في شمال غرب المملكة العربية السعودية.',
      risk_index: 40,
      optimistic: 'رواتب ومزايا تنافسية عالمية وبيئة عمل تعتمد على الطاقة النظيفة 100% وخبرات استثنائية في بناء مدن المستقبل.',
      pessimistic: 'طبيعة العمل في بيئات ناشئة قيد التأسيس والبعد عن المراكز الحضرية الكبرى في المراحل الأولى.',
      temporal_impact: {
        immediate: 'التكيف مع وتيرة عمل طموحة وثقافة عالمية متعددة الجنسيات.',
        mid_term: 'بناء شبكة علاقات دولية قوية والمشاركة في مشاريع تقنية فريدة عالمياً.',
        long_term: 'امتلاك ميزة مهنية كأحد رواد بناء مجتمعات الذكاء الاصطناعي والاستدامة.'
      },
      contingency_plan: [
        'تطوير مهارات إدارة المشاريع المعقدة والعمل في البيئات السريعة التغير.',
        'استثمار العوائد المالية المرتفعة في أصول مدرة للدخل.',
        'بناء شبكة تواصل مهنية متعددة التخصصات داخل منظومة مشاريع الرؤية.'
      ]
    }
  },
  // 4
  {
    prompt: 'ماذا لو تركت وظيفتي وبدأت متجراً إلكترونياً بنظام الدروب شيبينغ في 2026؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'إطلاق أعمال تجارة إلكترونية بدون مستودعات في الأسواق الخليجية مع الاعتماد على إعلانات الفيديو والتسويق المؤثر.',
      risk_index: 75,
      optimistic: 'بناء علامة تجارية سريعة النمو مع تحقيق هوامش ربح مجزية والوصول لأسواق القوة الشرائية العالية.',
      pessimistic: 'ارتفاع تكلفة الاستحواذ على العملاء عبر الإعلانات ومشاكل سلاسل التوريد وتأخر الشحن.',
      temporal_impact: {
        immediate: 'إنفاق مكثف على اختبار المنتجات والحملات الإعلانية الممولة.',
        mid_term: 'إما العثور على منتج رابح مستمر أو استنزاف رأس المال الأولي.',
        long_term: 'التحول الإلزامي إلى نموذج العلامة التجارية الخاصة لضمان الاستمرارية.'
      },
      contingency_plan: [
        'عدم ترك الوظيفة الأساسية إلا بعد تحقيق أرباح مستمرة تغطي تكاليف المعيشة لـ 6 أشهر.',
        'التركيز على سرعة التوصيل المحلي والتعامل مع موردين إقليميين موثوقين.',
        'الاستثمار في بناء قاعدة بيانات تسويقية قوية وقوائم بريد إلكتروني فعالة.'
      ]
    }
  },
  // 5
  {
    prompt: 'ماذا لو أطلقت دول الخليج عملة رقمية مشتركة موحدة (خليجي كوين)؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'إطلاق عملة رقمية سيادية موحدة للبنوك المركزية الخليجية مدعومة بالأصول واحتياطيات الطاقة لتسهيل التبادل التجاري الفوري.',
      risk_index: 45,
      optimistic: 'إلغاء رسوم التحويلات المالية بين دول المجلس وتسريع التجارة البينية وإنشاء تكتل مالي رقمي منافس دولياً.',
      pessimistic: 'تحديات توحيد السياسات النقدية ومعدلات الفائدة واختلاف الهياكل الاقتصادية غير النفطية.',
      temporal_impact: {
        immediate: 'ربط شبكات المدفوعات اللحظية الخليجية وإطلاق تسوية المعاملات الكبرى بها.',
        mid_term: 'اعتمادها كعملة تسعير وتداول في التجارة الإقليمية ومشاريع الاستثمار المشتركة.',
        long_term: 'تقليل الاعتماد على الدولار في المعاملات الإقليمية وزيادة الاستقرار المالي العربي.'
      },
      contingency_plan: [
        'تجهيز المنظومات المحاسبية للشركات لدعم التسويات بالعملات الرقمية للبنوك المركزية.',
        'الاستفادة من انعدام رسوم التحويلات لتوسيع نطاق الأعمال في دول الخليج كافة.',
        'متابعة توجيهات البنوك المركزية بشأن متطلبات الامتثال ومكافحة غسيل الأموال.'
      ]
    }
  },
  // 6
  {
    prompt: 'ماذا لو أصبحت السعودية ومصر أكبر مصدري الهيدروجين الأخضر في العالم؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'ريادة الشرق الأوسط لصادرات الوقود النظيف عالمياً عبر استغلال الطاقة الشمسية والرياح لإنتاج وتصدير الهيدروجين والأمونيا الخضراء.',
      risk_index: 28,
      optimistic: 'استمرار الريادة الطاقية الإقليمية في عصر ما بعد النفط وجذب استثمارات بآلاف المليارات وخلق ملايين الوظائف الخضراء.',
      pessimistic: 'تحديات تكلفة النقل اللوجستي وتطوير البنية التحتية للشحن البحري فائق التبريد.',
      temporal_impact: {
        immediate: 'توقيع اتفاقيات توريد استراتيجية طويلة الأجل مع الأسواق العالمية.',
        mid_term: 'تشغيل أضخم محطات الهيدروجين الأخضر في نيوم والمنطقة الاقتصادية لقناة السويس.',
        long_term: 'إعادة تشكيل ميزان التجارة العالمي لصالح القوى الصناعية النظيفة في العالم العربي.'
      },
      contingency_plan: [
        'التخصص المهني في هندسة الطاقة المتجددة وسلاسل الإمداد الكيميائية وتقنيات التحليل الكهربائي.',
        'استثمار الشركات المحلية في سلاسل القيمة المضافة لتقنيات الطاقة النظيفة.',
        'تطوير شهادات الاعتماد والامتثال لمعايير الاستدامة والحوكمة البيئية.'
      ]
    }
  },
  // 7
  {
    prompt: 'ماذا لو عملت كمبرمج عن بعد من مصر أو المغرب لصالح شركة أمريكية براتب بالدولار؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'الاستفادة من فوارق القوة الشرائية عبر العمل عن بعد في قطاع التكنولوجيا وتلقي الدخل بالعملة الصعبة مع الإقامة في بلدك الأصلي.',
      risk_index: 35,
      optimistic: 'تحقيق قوة شرائية استثنائية وتسريع الادخار والاستثمار والارتقاء السريع بمستوى المعيشة والاستقلال المالي.',
      pessimistic: 'تحديات عدم استقرار العقود الأجنبية وفروق التوقيت المرهقة وتعقيدات التحويلات المصرفية.',
      temporal_impact: {
        immediate: 'تضاعف الدخل المالي بنسبة 400-800% مقارنة بالسوق المحلي.',
        mid_term: 'بناء محفظة أصول استثمارية صلبة وتطوير مهارات اتصال عالمية.',
        long_term: 'إمكانية إطلاق شركة ناشئة محلية بتمويل ذاتي أو الحصول على عقود استشارية كبرى.'
      },
      contingency_plan: [
        'إتقان اللغة الإنجليزية التقنية ومهارات التواصل غير المتزامن الاحترافي.',
        'تنويع مصادر الدخل وعدم الاعتماد المطلق على عميل واحد فقط.',
        'استثمار الفائض المالي في أصول مدرة للدخل والذهب وتجنب التضخم الاستهلاكي المظهري.'
      ]
    }
  },
  // 8
  {
    prompt: 'ماذا لو حدث تضخم مفرط في عملتي المحلية وتراجعت بنسبة 50%؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'تآكل حاد في القوة الشرائية للأموال السائلة في الحسابات المصرفية وارتفاع غير مسبوق في أسعار السلع المستوردة والعقارات.',
      risk_index: 88,
      optimistic: 'فرصة كبرى لأصحاب الأصول العينية (الذهب، العقارات، الأسهم المقومة بالدولار) لتحقيق نمو قياسي في ثرواتهم.',
      pessimistic: 'ضياع مدخرات الطبقة المتوسطة وانخفاض القوة الشرائية للرواتب الثابتة وتحديات معيشية واسعة.',
      temporal_impact: {
        immediate: 'ارتفاع فوري في أسعار المواد الغذائية والأجهزة والسيارات.',
        mid_term: 'إقبال محموم على شراء الذهب والملاذات الآمنة وتجميد المعاملات النقدية طويلة الأجل.',
        long_term: 'إعادة هيكلة الاقتصاد المحلي والاعتماد على تسعير السلع بناءً على العملات الصعبة.'
      },
      contingency_plan: [
        'عدم الاحتفاظ بالسيولة النقدية غير التشغيلية بالعملة المحلية لأكثر من مصاريف شهر واحد.',
        'تحويل المدخرات فوراً إلى سبائك ذهبية أو أصول استثمارية صلبة أو عملات قوية.',
        'تطوير خدمات ومنتجات يمكن بيعها للأسواق الخارجية بالعملة الصعبة عبر الإنترنت.'
      ]
    }
  },
  // 9
  {
    prompt: 'ماذا لو بدأت تعلم البرمجة والذكاء الاصطناعي في عمر 40 عاماً؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'التحول المهني نحو التكنولوجيا في منتصف العمر من خلال الجمع بين الخبرة الإدارية العميقة وأدوات الذكاء الاصطناعي والبرمجة الحديثة.',
      risk_index: 30,
      optimistic: 'ميزة تنافسية هائلة تفوق المبرمجين الشباب بفضل الجمع بين الفهم التجاري والقدرة على توجيه أدوات الذكاء الاصطناعي لبناء حلول حقيقية.',
      pessimistic: 'ضيق الوقت المتاح للدراسة بسبب المسؤوليات الأسرية والوظيفية ومقاومة الاعتياد على الأنماط التقنية الجديدة.',
      temporal_impact: {
        immediate: 'الشعور بالتحدي في البدايات ثم قفزة سريعة في الإنتاجية بفضل أدوات البرمجة التوليدية.',
        mid_term: 'القدرة على قيادة وتأسيس مشاريع تقنية متخصصة في قطاعك وخبرتك السابقة.',
        long_term: 'تأمين مهني استثنائي وتجنب التقادم الوظيفي في عصر الأتمتة.'
      },
      contingency_plan: [
        'التركيز على بناء الحلول والمشاريع العملية مباشرة بدلاً من الغرق في النظريات الأكاديمية.',
        'استخدام أدوات مساعدة الكود الذكية لتسريع الإنجاز بنسبة 10 أضعاف.',
        'استغلال خبرتك السابقة في مجالك لإنشاء برمجيات مخصصة (Vertical SaaS).'
      ]
    }
  },
  // 10
  {
    prompt: 'ماذا لو امتنعت تماماً عن السكر والأطعمة المصنعة والزيوت المهدرجة لمدة عام كامل؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'التحول الكامل إلى الغذاء الطبيعي الحقيقي وتطهير النظام الغذائي من السكريات المضافة والمواد الحافظة والزيوت النباتية المكررة.',
      risk_index: 12,
      optimistic: 'شفاء تام من مقاومة الإنسولين، صفاء ذهني استثنائي، انخفاض دهون الكبد والأحشاء، وتراجع علامات الالتهاب بنسبة تتجاوز 70%.',
      pessimistic: 'صعوبة إيجاد خيارات صحية في المناسبات الاجتماعية والمطاعم وتحديات الالتزام في الأسابيع الأولى.',
      temporal_impact: {
        immediate: 'الأيام الأولى: أعراض انسحاب السكر والصداع تليها طاقة مستقرة واختفاء الخمول بعد الوجبات.',
        mid_term: 'الأشهر الأولى: خسارة ملحوظة في الوزن وتحسن نضارة البشرة وانتظام عميق في النوم.',
        long_term: 'عام كامل: إعادة ضبط حساسية الدوبامين والتذوق ووقاية طويلة الأجل من أمراض العصر المزمنة.'
      },
      contingency_plan: [
        'تجهيز الوجبات مسبقاً في المنزل لتجنب الوقوع في فخ الوجبات السريعة أثناء الانشغال.',
        'استبدال السكريات بدهون صحية وبروتينات عالية الجودة (بيض، لحوم، زيت زيتون، مكسرات).',
        'قراءة ملصقات الأغذية بدقة فائقة لكشف السكريات والزيوت المخبأة تحت مسميات تجارية مضللة.'
      ]
    }
  },
  // 11
  {
    prompt: 'ماذا لو بدأ الاستعداد الفعلي لبطولة كأس العالم 2034 في السعودية؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'طفرة استثمارية وسياحية وعمرانية كبرى استعداداً لاستضافة الحدث الرياضي الأكبر في التاريخ بمشاركة 48 منتخباً في ملاعب ومدن مستقبلية.',
      risk_index: 20,
      optimistic: 'استقطاب ملايين السياح وقفزة تاريخية في قطاعات الطيران والضيافة والترفيه ورسوخ المملكة كمركز جذب عالمي للفعاليات الكبرى.',
      pessimistic: 'ارتفاع تكاليف الإيجارات والخدمات في المدن المضيفة والضغط المكثف على الجداول الزمنية لتسليم المشاريع العملاقة.',
      temporal_impact: {
        immediate: 'تسارع طرح عقود المقاولات والبنية التحتية والذكاء الاصطناعي وتطوير الملاعب الرياضية.',
        mid_term: 'ازدهار قطاع الشركات الناشئة في السياحة والضيافة وإدارة الفعاليات والتطبيقات اللوجستية.',
        long_term: 'إرث حضاري وبنية تحتية عالمية تعزز الاقتصاد الوطني لعقود طويلة قادمة.'
      },
      contingency_plan: [
        'الاستثمار في العقارات والضيافة وتطوير المنصات الرقمية لخدمة الزوار والسياح.',
        'تأسيس أعمال متخصصة في خدمات اللوجستيات والترجمة وإدارة التجارب السياحية.',
        'تطوير المهارات القيادية في قطاعات الرياضة والترفيه وإدارة المنشآت الكبرى.'
      ]
    }
  },
  // 12
  {
    prompt: 'ماذا لو تضاعفت احتياطيات الغاز الطبيعي المكتشفة في مصر والجزائر 3 مرات؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'اكتشافات هيدروكربونية عملاقة في المياه العميقة تحول شمال أفريقيا إلى المورد الرئيسي والموثوق للغاز الطبيعي المسال لأوروبا.',
      risk_index: 35,
      optimistic: 'تدفقات هائلة من النقد الأجنبي وسداد الديون السيادية واستثمارات ضخمة في البنية التحتية والصناعات البتروكيماوية.',
      pessimistic: 'خطر التعرض لما يسمى المرض الهولندي وإهمال تنويع القطاعات الصناعية والتكنولوجية غير النفطية.',
      temporal_impact: {
        immediate: 'ارتفاع تدفقات الاستثمار الأجنبي المباشر لشركات الطاقة وتراجع الضغوط على العملة المحلية.',
        mid_term: 'توسيع محطات الإسالة وخطوط الأنابيب عبر المتوسط لربط الأسواق الأوروبية.',
        long_term: 'استغلال الفوائض المالية في بناء صناديق سيادية تنموية تدعم الابتكار والتصنيع.'
      },
      contingency_plan: [
        'توجيه عوائد الطاقة نحو دعم القطاع الخاص وتحديث التعليم التكنولوجي والصناعي.',
        'توسيع الصناعات التحويلية والبتروكيماوية لتعظيم القيمة المضافة بدلاً من تصدير الخام.',
        'تأسيس صناديق ثروة سيادية متوازنة للأجيال القادمة بعيداً عن تقلبات الأسعار.'
      ]
    }
  },
  // 13
  {
    prompt: 'ماذا لو طبقت الدول والشركات العربية أسبوع العمل لـ 4 أيام فقط؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'اعتماد نظام العمل 4 أيام (بإجمالي 32 ساعة أسبوعياً) لرفع جودة الحياة والإنتاجية.',
      risk_index: 33,
      optimistic: 'انخفاض حوادث الاحتراق الوظيفي وانتعاش السياحة الداخلية والأنشطة العائلية وارتفاع إنتاجية ساعة العمل الفعلية.',
      pessimistic: 'تحديات المواءمة في القطاعات الطبية والأمنية والمصانع الإنتاجية المستمرة.',
      temporal_impact: {
        immediate: 'إقبال كبير من الكفاءات على الشركات المطبقة للنظام مقارنة بالشركات التقليدية.',
        mid_term: 'أتمتة الاجتماعات والعمليات الروتينية لتعويض الساعات المقتطعة.',
        long_term: 'تغير جذري في نمط الحياة الاستهلاكي وانتعاش عطلات نهاية الأسبوع الطويلة.'
      },
      contingency_plan: [
        'استخدام أدوات التوثيق والإدارة المؤتمتة لتقليل الاجتماعات المطولة غير الضرورية.',
        'تنظيم جداول المناوبات لضمان استمرارية خدمة العملاء دون انقطاع.',
        'استغلال اليوم الإضافي في التعلم الذاتي وممارسة الرياضة وبناء مشاريع جانبية.'
      ]
    }
  },
  // 14
  {
    prompt: 'ماذا لو تعرضت كابلات الإنترنت البحرية في مضيق باب المندب والبحر الأحمر لانقطاع كامل؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'انقطاع خطوط الألياف الضوئية البحرية التي تنقل 17% من حركة الإنترنت العالمية بين آسيا والشرق الأوسط وأوروبا.',
      risk_index: 82,
      optimistic: 'تسريع الاعتماد على مسارات الكابلات الأرضية البديلة وتوسيع تغطية شبكات الأقمار الصناعية.',
      pessimistic: 'بطء شديد وتأخر في البيانات وتعطل التداولات المالية والخدمات السحابية الإقليمية وخسائر بمليارات الدولارات.',
      temporal_impact: {
        immediate: 'إعادة توجيه حركة المرور تلقائياً عبر مسارات رأس الرجاء الصالح والممرات الأرضية.',
        mid_term: 'ضغط هائل على السيرفرات المحلية وتأثر أداء التطبيقات غير المستضافة إقليمياً.',
        long_term: 'استثمارات ضخمة لبناء مراكز بيانات سحابية سيادية ومسارات كابلات أرضية متعددة.'
      },
      contingency_plan: [
        'استضافة خوادم وبيانات الشركات الحيوية داخل مراكز بيانات محلية.',
        'تجهيز شبكات اتصال احتياطية بالأقمار الصناعية لضمان استمرار العمليات الحساسة.',
        'اعتماد بنية تحتية رقمية تدعم العمل في وضع عدم الاتصال (Offline-First).'
      ]
    }
  },
  // 15
  {
    prompt: 'ماذا لو اشتريت شقة استوديو في دبي مارينا أو الداون تاون لتأجيرها بنظام هوليداي هومز؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'الاستثمار العقاري السياحي في دبي للاستفادة من تدفق السياح والمستثمرين وتحقيق عوائد إيجارية صافية تتراوح بين 8-12%.',
      risk_index: 45,
      optimistic: 'عوائد إيجارية تفوق الإيجار السنوي بنسبة 40% وارتفاع القيمة الرأسمالية للعقار في مدينة مستمرة بالنمو.',
      pessimistic: 'مواسم الصيف التي تشهد تراجعاً في نسب الإشغال ورسوم الصيانة والإدارة المرتفعة من شركات التشغيل.',
      temporal_impact: {
        immediate: 'تأثيث العقار وفق معايير فاخرة واستخراج تراخيص دائرة السياحة والاقتصاد.',
        mid_term: 'تحقيق إشغال مرتفع في مواسم الشتاء والمؤتمرات الكبرى وتدفق نقدي شهري قوي.',
        long_term: 'سداد ثمن العقار من عوائده الإيجارية خلال 8-10 سنوات وتحقيق أرباح رأسمالية ممتازة.'
      },
      contingency_plan: [
        'اختيار موقع استراتيجي قريب جداً من المترو والوجهات السياحية لضمان الإشغال.',
        'التعاقد مع شركة إدارة احترافية متخصصة ومراجعة تقييمات النزلاء باستمرار.',
        'بناء نموذج مالي يتحمل انخفاض نسبة الإشغال إلى 60% لضمان تغطية الرسوم والخدمات.'
      ]
    }
  },
  // 16
  {
    prompt: 'ماذا لو أصبحت جميع السيارات المباعة في الدول العربية كهربائية بحلول 2035؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'تحول جذري في أسطول النقل البري والتنقل الشخصي نحو المركبات الكهربائية وتأسيس شبكات شحن فائقة السرعة على الطرق.',
      risk_index: 38,
      optimistic: 'تحسن هائل في جودة الهواء ونظافة المدن وانخفاض تكاليف الصيانة الدورية بنسبة 60% وتوفير استهلاك الوقود المحلي للتصدير.',
      pessimistic: 'ضغط هائل على شبكات توزيع الكهرباء في أوقات الذروة وتراجع إيرادات ورش الصيانة التقليدية ومحطات الوقود.',
      temporal_impact: {
        immediate: 'توسع شركات صناعة وتجميع السيارات الكهربائية الإقليمية.',
        mid_term: 'إلزام المباني والمجمعات السكنية بتوفير نقاط شحن مخصصة في المواقف.',
        long_term: 'إعادة تدوير بطاريات السيارات لتستخدم كوحدات تخزين طاقة للشبكات الكهربائية.'
      },
      contingency_plan: [
        'الاستثمار في تأسيس وتركيب محطات الشحن المنزلية والتجارية السريعة.',
        'إعادة تدريب الفنيين على صيانة الأنظمة الكهربائية عالية الجهد والبرمجيات.',
        'تركيب منظومات طاقة شمسية منزلية لشحن المركبات مجاناً وتقليل الاعتماد على الشبكة.'
      ]
    }
  },
  // 17
  {
    prompt: 'ماذا لو استبدلت الجامعات قاعات المحاضرات التقليدية بمعلمين افتراضيين مدعومين بالذكاء الاصطناعي؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'إلغاء أسلوب التلقين الجماعي واستبداله بأنظمة تعليم شخصية تفاعلية تفهم احتياجات كل طالب وتصمم منهجاً خاصاً به.',
      risk_index: 44,
      optimistic: 'تكافؤ الفرص التعليمية وتسريع وتيرة التعلم بمقدار 3 أضعاف وتخرج كفاءات تمتلك مهارات عملية مثبتة.',
      pessimistic: 'تراجع التفاعل الإنساني والمهارات الاجتماعية المكتسبة من الحرم الجامعي ومقاومة الكوادر الأكاديمية للتغيير.',
      temporal_impact: {
        immediate: 'تحول دور الأستاذ الجامعي من ملقن للمعلومة إلى موجه ومشرف على المشاريع التطبيقية.',
        mid_term: 'انخفاض تكاليف التعليم العالي واختفاء ظاهرة الدروس الخصوصية نهائياً.',
        long_term: 'إلغاء الامتحانات النظرية التقليدية واعتماد التقييم المستمر للقدرة على حل المشكلات.'
      },
      contingency_plan: [
        'التركيز على بناء مهارات العمل الجماعي والقيادة والتفاوض الواقعي خارج الفصول الرقمية.',
        'استغلال المعلمين الأذكياء لتعلم اللغات والمهارات المتقدمة في وقت قياسي.',
        'بناء معرض أعمال ومشاريع واقعية تثبت الكفاءة العملية للشركات وسوق العمل.'
      ]
    }
  },
  // 18
  {
    prompt: 'ماذا لو استيقظت في الساعة 5:00 صباحاً يومياً لمدة عام لتطوير مشروعي الخاص؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'تخصيص الساعات الأولى الذهبية من اليوم للعمل بتركيز فائق على بناء عمل تجاري جانبي قبل بدء متطلبات الحياة اليومية والوظيفة.',
      risk_index: 15,
      optimistic: 'اكتساب أكثر من 700 ساعة عمل مركزة سنوياً بدون مقاطعات وإطلاق وتطوير المشروع بنجاح وبناء انضباط ذاتي استثنائي.',
      pessimistic: 'الشعور بالإرهاق إذا لم يتم الالتزام بالنوم المبكر وصعوبة التوافق مع الحياة الاجتماعية المسائية.',
      temporal_impact: {
        immediate: 'الأيام الأولى: مقاومة جسدية وصعوبة الاستيقاظ ثم تحسن ملحوظ في الصفاء الذهني الصباحي.',
        mid_term: 'الأشهر الأولى: إطلاق النسخة الأولى من المشروع والبدء في تحقيق أولى المبيعات.',
        long_term: 'عام كامل: تأسيس عمل تجاري حقيقي والوصول لمرحلة الاستقلال المالي والتحكم في الوقت.'
      },
      contingency_plan: [
        'النوم المبكر في نفس الموعد يومياً وتجنب الشاشات الزرقاء قبل النوم بساعة على الأقل.',
        'تحديد المهام الثلاث الأكثر أهمية في الليلة السابقة للبدء فيها فور الاستيقاظ دون تردد.',
        'تجنب التحقق من البريد أو وسائل التواصل الاجتماعي خلال الساعات الصباحية الأولى.'
      ]
    }
  },
  // 19
  {
    prompt: 'ماذا لو أصبحت جميع المعاملات العقارية والشركات في الدول العربية عقوداً ذكية موثقة بالبلوكتشين؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'أتمتة نقل الملكيات العقارية وتسجيل الشركات وتنفيذ الاتفاقيات التجارية ذاتياً دون وسطاء عبر العقود الذكية غير القابلة للتلاعب.',
      risk_index: 25,
      optimistic: 'القضاء التام على النزاعات القضائية حول الملكيات وإنهاء البيروقراطية والمعاملات الورقية وإتمام صفقات العقارات بضغطة زر.',
      pessimistic: 'تحديات تعديل العقود البرمجية في حال حدوث ظروف قاهرة وصعوبة التعامل لمن لا يملكون مهارات تقنية.',
      temporal_impact: {
        immediate: 'ربط السجلات العقارية الحكومية ومنصات التوثيق بالبلوكتشين الوطني.',
        mid_term: 'تجزئة الملكيات العقارية الكبرى إلى حصص رقمية صغيرة للمستثمرين الصغار.',
        long_term: 'تحول البيئة الاستثمارية إلى بيئة فائقة الشفافية تجذب رؤوس الأموال العالمية بيسر وسرعة.'
      },
      contingency_plan: [
        'تعلم أساسيات التعامل مع المحافظ الرقمية والهويات السيادية الموثقة.',
        'استشارة مدققي العقود الذكية المتخصصين قبل توقيع أي التزام مالي أو تجاري ضخم.',
        'الاستفادة من فرص الاستثمار العقاري الجزئي لبناء محفظة أصول متنوعة بمبالغ صغيرة.'
      ]
    }
  },
  // 20
  {
    prompt: 'ماذا لو حققت دول الخليج الاكتفاء الذاتي من الخضروات عبر المزارع العمودية المائية المغلقة؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'إنتاج المحاصيل الزراعية محلياً على مدار العام داخل منشآت رأسية مكيفة ومضاءة بمصابيح LED موفرة وباستهلاك مياه يقل بنسبة 95% عن الزراعة التقليدية.',
      risk_index: 30,
      optimistic: 'أمن غذائي مستدام وقطع التبعية للاستيراد وتوفير منتجات طازجة خالية تماماً من المبيدات الكيميائية.',
      pessimistic: 'ارتفاع استهلاك الطاقة لتشغيل التكييف والإضاءة الاصطناعية، مما يتطلب ربطها بمحطات طاقة شمسية منخفضة التكلفة.',
      temporal_impact: {
        immediate: 'دخول كبرى الصناديق السيادية في شراكات مع عمالقة التكنولوجيا الزراعية العالمية.',
        mid_term: 'تغطية 100% من الاحتياجات المحلية من الخضار الورقية والفاكهة سريعة النمو.',
        long_term: 'تصدير التقنيات الزراعية الصحراوية للدول التي تعاني من الجفاف والتغير المناخي.'
      },
      contingency_plan: [
        'الاستثمار في تقنيات الطاقة الشمسية المخصصة لتشغيل المزارع العمودية بكفاءة عالية.',
        'تأسيس شراكات تجارية لتوريد المنتجات العضوية الطازجة مباشرة للفنادق والمطاعم الراقية.',
        'تطوير حلول برمجية تعتمد على الذكاء الاصطناعي لمراقبة نمو النباتات وضبط المغذيات آلياً.'
      ]
    }
  },
  // 21
  {
    prompt: 'ماذا لو التزمت بنظام الصيام المتقطع (16 ساعة صيام و8 ساعات إفطار) لمدة 6 أشهر؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'تنظيم أوقات تناول الطعام يومياً لتحفيز عملية الالتهام الذاتي الخلوي وإعادة ضبط مستويات هرمون الإنسولين وهرمون النمو.',
      risk_index: 14,
      optimistic: 'خسارة دهون البطن والأحشاء بكفاءة وزيادة التركيز أثناء ساعات الصباح وتحسن كبير في المؤشرات الحيوية للدم وصحة القلب.',
      pessimistic: 'الشعور بالجوع المتقطع في الأسبوع الأول ومخاطر الإفراط في تناول الأطعمة الضارة خلال نافذة الـ 8 ساعات.',
      temporal_impact: {
        immediate: 'الأسبوع الأول: التكيف التدريجي للجسم مع استخدام الدهون كمصدر طاقة ثانوي.',
        mid_term: 'الأشهر الأولى: هبوط مستويات سكر الدم الصائم وتحسن مرونة الأوعية الدموية والمفاصل.',
        long_term: 'نهاية التجربة: تحول الصيام إلى نمط حياة طبيعي ومريح يحمي من متلازمة الأيض.'
      },
      contingency_plan: [
        'شرب كميات وفيرة من الماء والقهوة السادة وشاي الأعشاب بدون سكر أثناء ساعات الصيام.',
        'التركيز على البروتينات والألياف والدهون الصحية لكسر الصيام لضمان الشبع المستمر.',
        'تجنب الوجبات المصنعة والحلويات في نافذة الإفطار لتعظيم فوائد حرق الدهون.'
      ]
    }
  },
  // 22
  {
    prompt: 'ماذا لو استثمرت 10,000 دولار في أسهم شركات البنية التحتية للذكاء الاصطناعي ورقائق السيليكون؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'الاستثمار المباشر في قادة ثورة الحوسبة الفائقة (صناع الرقاقات، مراكز البيانات، ومطوري النماذج الأساسية) على المدى الطويل.',
      risk_index: 55,
      optimistic: 'مضاعفة رأس المال عدة مرات مع تسارع دمج الذكاء الاصطناعي في كافة قطاعات الاقتصاد العالمي.',
      pessimistic: 'تقلبات سعرية حادة وتصحيحات مفاجئة بسبب التقييمات المرتفعة ومخاطر فقاعة التوقعات قصيرة المدى.',
      temporal_impact: {
        immediate: 'تأثر المحفظة بنتائج الأرباح الفصلية وتقارير الإنفاق الرأسمالي للشركات الكبرى.',
        mid_term: 'تحقيق عوائد قوية مدفوعة بزيادة الطلب على مراكز البيانات والطاقة المخصصة للـ AI.',
        long_term: 'رسوخ الشركات الفائزة كأعمدة للاقتصاد الرقمي العالمي.'
      },
      contingency_plan: [
        'توزيع الدخول على دفعات شهرية منتظمة بدلاً من الشراء بمبلغ كامل في القمة.',
        'عدم الاقتصار على شركة واحدة والاستثمار في صناديق المؤشرات المتخصصة وسلاسل التبريد والطاقة.',
        'الاستعداد النفسي والمالي لتحمل تقلبات وتراجعات مؤقتة تصل إلى 20-30% دون فزع.'
      ]
    }
  },
  // 23
  {
    prompt: 'ماذا لو تم تشغيل جميع محطات تحلية مياه البحر في الشرق الأوسط بالطاقة الشمسية بنسبة 100%؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'فصل تكلفة إنتاج المياه العذبة عن حرق الوقود الأحفوري عبر استخدام التناضح العكسي المدعوم بحقول الطاقة الشمسية العملاقة.',
      risk_index: 22,
      optimistic: 'خفض تكلفة إنتاج المتر المكعب من المياه بنسبة 70% وحماية البيئة البحرية وتأمين إمدادات مائية غير محدودة للزراعة والمدن.',
      pessimistic: 'تحديات التخلص البيئي الآمن من المياه شديدة الملوحة (المحلول الملحي المركز) الناتجة عن التحلية.',
      temporal_impact: {
        immediate: 'طرح مناقصات حكومية لبناء أضخم محطات تحلية كهروضوئية في العالم.',
        mid_term: 'انخفاض الفاتورة المائية والصناعية للقطاعات الإنتاجية والتجارية.',
        long_term: 'استخراج المعادن الثمينة (مثل الليثيوم والمغنيسيوم) من المحلول الملحي بجدوى اقتصادية.'
      },
      contingency_plan: [
        'الاستثمار في شركات تقنيات استخلاص المعادن من المياه المركزة المالحة.',
        'توسيع شبكات إعادة تدوير المياه الرمادية والمعالجة للري والحدائق العامة.',
        'تطوير تقنيات الأغشية النانوية المتقدمة لرفع كفاءة التناضح العكسي وتقليل استهلاك الطاقة.'
      ]
    }
  },
  // 24
  {
    prompt: 'ماذا لو قرأت 52 كتاباً سنوياً في مجالات المال، القيادة، وعلم النفس لمدة 3 أعوام؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'بناء موسوعة معرفية تضم ملخصات وخبرات أكثر من 150 مفكراً ورائداً عبر تخصيص ساعة يومية للقراءة العميقة وتدوين الملاحظات.',
      risk_index: 8,
      optimistic: 'تطور هائل في التفكير النقدي وقدرة استثنائية على اتخاذ القرارات وحل الأزمات والتحول إلى مرجع فكري واستشاري في مجالك.',
      pessimistic: 'تراكم المعرفة النظرية دون تطبيق عملي إذا لم يتم ربط القراءة بمشاريع وخطط تنفيذية حقيقية.',
      temporal_impact: {
        immediate: 'الأشهر الأولى: تحسن ملحوظ في الحصيلة اللغوية والقدرة على التركيز المستمر.',
        mid_term: 'العامين الأولين: القدرة على ربط المفاهيم المعقدة من مجالات مختلفة لابتكار حلول جديدة.',
        long_term: 'العام الثالث: قفزة نوعية في المركز الوظيفي والتجاري والقدرة على قيادة الفرق والمؤسسات.'
      },
      contingency_plan: [
        'تطبيق قاعدة فكرة واحدة منفذة لكل كتاب: استخراج خطوة عملية واحدة فور الانتهاء من القراءة.',
        'استخدام كتب صوتية عالية الجودة أثناء أوقات التنقل والرياضة اليومية.',
        'تدوين ومشاركة ملخصات الكتب مع شبكتك المهنية لترسيخ المعلومات وبناء الحضور الفكري.'
      ]
    }
  },
  // 25
  {
    prompt: 'ماذا لو أطلقت وكالة لتقديم خدمات أتمتة الذكاء الاصطناعي (AAA) للشركات المحلية في 2026؟',
    language: 'ar',
    response_json: {
      scenario_summary: 'تأسيس شركة خدمات B2B متخصصة في بناء روبوتات خدمة العملاء المؤتمتة، تدفقات العمل الذكية، وربط أنظمة الـ CRM بالذكاء الاصطناعي للشركات التقليدية.',
      risk_index: 48,
      optimistic: 'تحقيق عقود شهرية مستمرة بعوائد مرتفعة وهوامش ربح تتجاوز 80% دون الحاجة لفرق برمجية ضخمة.',
      pessimistic: 'صعوبة إقناع أصحاب الأعمال التقليديين بجدوى الذكاء الاصطناعي ودورات بيع طويلة نسبياً في البداية.',
      temporal_impact: {
        immediate: 'بناء نماذج عمل حية وتجريبية واستهداف قطاعات العيادات الطبية والمكاتب العقارية.',
        mid_term: 'توقيع أول 5-10 عملاء شهرياً وبناء مكتبة من حلول الأتمتة الجاهزة لإعادة البيع.',
        long_term: 'التحول من وكالة خدمات إلى منصة برمجيات سحابية (Micro-SaaS) متخصصة.'
      },
      contingency_plan: [
        'التركيز على قياس العائد المالي المباشر للعميل (توفير التكاليف أو زيادة المبيعات) بدلاً من الحديث التقني البحت.',
        'تقديم فترة تجريبية مجانية أو نموذج يعتمد على نسبة من الأرباح المحققة لكسب الثقة الأولى.',
        'استخدام أدوات الربط الحديثة (Make, n8n, LangChain) لبناء حلول سريعة وموثوقة.'
      ]
    }
  },
  // 26
  {
    prompt: 'What if AI replaces software engineers by 2030?',
    language: 'en',
    response_json: {
      scenario_summary: 'Full automation of standard software engineering workflows, shifting developer responsibilities from manual syntax authoring to system architecture, agent orchestration, and algorithmic safety oversight.',
      risk_index: 72,
      optimistic: 'Development velocity multiplies by 50x; solo founders build billion-dollar hyper-efficient applications, lowering technical barriers worldwide.',
      pessimistic: 'Entry-level junior roles disappear; massive wage compression occurs for non-specialized coders while legacy codebase vulnerability surges.',
      temporal_impact: {
        immediate: 'AI copilot tools write over 60% of enterprise boilerplate code.',
        mid_term: 'Engineering team sizes contract by 40%; shift toward AI Systems Architects.',
        long_term: 'Natural language replaces programming languages for 90% of business software.'
      },
      contingency_plan: [
        'Pivot skillsets from syntax proficiency to systems design, distributed data architecture, and AI governance.',
        'Master autonomous agent orchestration frameworks and domain-specific modeling.',
        'Develop high-context human interaction and product strategy capabilities.'
      ]
    }
  },
  // 27
  {
    prompt: 'What if Bitcoin reaches $1 million by 2030?',
    language: 'en',
    response_json: {
      scenario_summary: 'Hyper-monetization of Bitcoin into a tier-1 global sovereign reserve asset, triggering massive reallocation of capital away from sovereign fiat debt and physical real estate.',
      risk_index: 68,
      optimistic: 'Unprecedented global liquidity decentralization and inflation immunity for early institutional and retail adopters.',
      pessimistic: 'Severe foreign exchange volatility for emerging economies; aggressive governmental crackdowns and capital control implementations.',
      temporal_impact: {
        immediate: 'Accelerated institutional treasury adoption and sovereign fund reserve allocations.',
        mid_term: 'Global banking systems force-integrate Layer-2 settlement rails.',
        long_term: 'Rebalancing of the global monetary standard toward provably scarce digital collateral.'
      },
      contingency_plan: [
        'Maintain a dollar-cost-averaging strategy with rigorous cold-storage security.',
        'Hedge against aggressive regulatory taxation and transaction reporting policies.',
        'Diversify liquid operational reserves to survive cyclical 40-70% drawdowns.'
      ]
    }
  },
  // 28
  {
    prompt: 'What if the global economy transitions to a 4-day work week?',
    language: 'en',
    response_json: {
      scenario_summary: 'Standardization of a 32-hour work week across white-collar and service industries, powered by AI-driven productivity gains and employee retention priorities.',
      risk_index: 35,
      optimistic: 'Workplace burnout drops by 45%, local tourism and wellness economies boom, and operational productivity increases per active hour.',
      pessimistic: 'Operational friction in round-the-clock manufacturing and healthcare; potential bifurcated wages for hourly gig workers.',
      temporal_impact: {
        immediate: 'Massive adoption among tech startups and knowledge-worker corporations.',
        mid_term: 'National labor law reforms passed across OECD nations.',
        long_term: 'Redefinition of urban commercial leases and suburban economic hubs.'
      },
      contingency_plan: [
        'Automate repetitive daily workflows using asynchronous task pipelines.',
        'Adopt strict asynchronous communication protocols to compress meeting overhead.',
        'Structure multi-disciplinary team schedules to ensure uninterrupted coverage.'
      ]
    }
  },
  // 29
  {
    prompt: 'What if I quit my 9-to-5 job to launch an AI Micro-SaaS?',
    language: 'en',
    response_json: {
      scenario_summary: 'Transitioning from corporate employment to autonomous digital entrepreneurship, leveraging AI APIs to build high-margin subscription software with zero initial headcount.',
      risk_index: 62,
      optimistic: 'Rapid path to financial sovereignty, high equity retention, and scalable recurring revenue without investor dilution.',
      pessimistic: 'High market churn, vulnerability to model platform deprecation, and initial cash flow instability during product-market discovery.',
      temporal_impact: {
        immediate: 'Intense development sprint followed by multi-channel distribution acquisition.',
        mid_term: 'Achievement of default-investable MRR ($10k+) or pivot to vertical enterprise niches.',
        long_term: 'Building a durable portfolio of automated software assets.'
      },
      contingency_plan: [
        'Secure at least 9-12 months of liquid personal runway before resigning.',
        'Validate user pain points and pre-sell annual subscriptions before writing production code.',
        'Build deep proprietary workflow integrations rather than thin AI API wrappers.'
      ]
    }
  },
  // 30
  {
    prompt: 'What if all physical cash is replaced by Central Bank Digital Currencies (CBDCs)?',
    language: 'en',
    response_json: {
      scenario_summary: 'Total phase-out of physical banknotes in favor of programmable, state-monitored sovereign digital currencies.',
      risk_index: 78,
      optimistic: 'Near-zero transaction settlement costs, eradication of illicit shadow economies, and instantaneous fiscal stimulus distributions.',
      pessimistic: 'Complete loss of financial anonymity, potential algorithmic account freezes, and programmatic expiry of consumer savings.',
      temporal_impact: {
        immediate: 'Gradual phase-out of high-denomination physical bills.',
        mid_term: 'Mandatory integration of government digital wallets for tax payments and payroll.',
        long_term: 'Emergence of black-market physical barter and decentralized privacy-coin parallel economies.'
      },
      contingency_plan: [
        'Maintain a balanced allocation in decentralized bearer assets, physical gold, and real estate.',
        'Establish international multi-jurisdiction financial banking redundancies.',
        'Adopt non-custodial decentralized payment rails for business operations.'
      ]
    }
  },
  // 31
  {
    prompt: 'What if major corporations enforce a mandatory 100% Return-to-Office policy?',
    language: 'en',
    response_json: {
      scenario_summary: 'Strict elimination of remote and hybrid work models by major multinationals, demanding mandatory 5-day on-site physical presence.',
      risk_index: 58,
      optimistic: 'Revitalization of metropolitan downtown commercial centers and strengthened physical corporate team culture.',
      pessimistic: 'Mass resignation of top senior talent, surging urban cost of living, and an exodus of skilled workers to agile remote-first startups.',
      temporal_impact: {
        immediate: 'Sharp spike in employee attrition and widespread talent poaching by nimble competitors.',
        mid_term: 'Commercial office real estate values stabilize in primary tier-1 financial capitals.',
        long_term: 'Deep market divide between conservative corporate enterprises and distributed global networks.'
      },
      contingency_plan: [
        'Build rare, highly defensible niche technical skills that command bespoke contract terms.',
        'Transition toward specialized independent consulting or equity-based advisory roles.',
        'Relocate strategically to high-density economic hubs with multiple competing employers.'
      ]
    }
  },
  // 32
  {
    prompt: 'What if commercial nuclear fusion becomes abundant and cheap by 2035?',
    language: 'en',
    response_json: {
      scenario_summary: 'Scalable net-energy gain nuclear fusion reactors achieve commercial grid deployment, decoupling human economic growth from energy scarcity and fossil fuel constraints.',
      risk_index: 22,
      optimistic: 'Near-zero marginal cost of clean electricity, massive scaling of desalination and direct-air carbon capture, and unlimited computation capacity.',
      pessimistic: 'Rapid economic destabilization of traditional hydrocarbon-exporting nations and disruption of conventional renewable infrastructure investments.',
      temporal_impact: {
        immediate: 'Global capital pivots rapidly from fossil assets to fusion supply chains and superconducting materials.',
        mid_term: 'Freshwater scarcity eradicated via hyper-cheap industrial seawater desalination.',
        long_term: 'Accelerated space industrialization and planetary computing architectures.'
      },
      contingency_plan: [
        'Invest heavily in electrification infrastructure, grid transmission technologies, and high-temperature superconductors.',
        'Re-skill energy workforce into advanced nuclear and high-voltage grid engineering.',
        'Prepare manufacturing supply chains for abundant high-temperature thermal power.'
      ]
    }
  },
  // 33
  {
    prompt: 'What if governments enact a $2,000/month Universal Basic Income for all citizens?',
    language: 'en',
    response_json: {
      scenario_summary: 'Universal non-means-tested monthly cash distributions funded through technological productivity dividends and automated resource taxes.',
      risk_index: 64,
      optimistic: 'Eradication of absolute poverty, surge in artistic and entrepreneurial initiatives, and stabilization of consumer aggregate demand.',
      pessimistic: 'Potential hyper-inflation in consumer staples and housing, paired with labor shortages in manual, high-stress service sectors.',
      temporal_impact: {
        immediate: 'Immediate relief for low-income brackets and spike in retail spending velocity.',
        mid_term: 'Wage inflation in essential services requiring premium hazard/incentive pay.',
        long_term: 'Fundamental cultural shift decoupling human personal identity from traditional labor.'
      },
      contingency_plan: [
        'Invest in hard, scarce assets (land, energy commodities, equity in automation leaders).',
        'Develop high-leverage intellectual property rather than trading linear hourly labor.',
        'Focus personal production on areas requiring empathy, artisanal craftsmanship, and judgment.'
      ]
    }
  },
  // 34
  {
    prompt: 'What if biotechnology extends the healthy human lifespan to 150 years?',
    language: 'en',
    response_json: {
      scenario_summary: 'Breakthrough cellular reprogramming, senolytic therapeutics, and genetic editing expand healthy biological longevity beyond a century and a half.',
      risk_index: 54,
      optimistic: 'Preservation of multi-generational human wisdom, elimination of chronic degenerative diseases, and profound compound investment horizons.',
      pessimistic: 'Severe generational wealth stagnation, delayed leadership turnover, and overwhelming pension solvency crises.',
      temporal_impact: {
        immediate: 'Longevity clinical trials scale; retirement age requirements are officially raised.',
        mid_term: 'Restructuring of career models from singular trajectories to 3-4 distinct multi-decade careers.',
        long_term: 'Transformation of real estate, marriage contracts, and multi-century family trusts.'
      },
      contingency_plan: [
        'Structure multi-asset compounding portfolios built for 100+ year horizons.',
        'Prioritize continuous biological health optimization and preventative genomic screenings.',
        'Adopt lifelong continuous learning routines to prevent occupational obsolescence.'
      ]
    }
  },
  // 35
  {
    prompt: 'What if hyper-realistic AI deepfakes destroy trust in video and audio evidence?',
    language: 'en',
    response_json: {
      scenario_summary: 'Generative synthetic media reaches perfect physical realism, invalidating digital recordings, video calls, and phone calls as reliable forms of truth.',
      risk_index: 82,
      optimistic: 'Rapid emergence of cryptographic zero-knowledge hardware signing, public-key verification, and verifiable content provenance standards.',
      pessimistic: 'Pervasive societal epistemic crisis, rampant automated extortion, and complete erosion of trust in digital news and online communication.',
      temporal_impact: {
        immediate: 'Surge in executive impersonation wire frauds and synthetic defamation campaigns.',
        mid_term: 'Mandatory cryptographic watermarking baked directly into camera sensors and microphones.',
        long_term: 'Return to high-trust physical in-person handshakes and cryptographic web-of-trust signatures.'
      },
      contingency_plan: [
        'Establish personal and family verbal cryptographic duress passphrases for urgent calls.',
        'Implement multi-party hardware-key authorization for all substantial corporate fund transfers.',
        'Rely on verifiable cryptographic signatures rather than sensory perception for digital media.'
      ]
    }
  },
  // 36
  {
    prompt: 'What if central banks dump US Treasuries and back currencies with gold?',
    language: 'en',
    response_json: {
      scenario_summary: 'Systemic de-dollarization where central banks liquidate sovereign fiat bond holdings in favor of physical gold bullion reserves.',
      risk_index: 76,
      optimistic: 'Restoration of fiscal discipline, curbing of runaway sovereign deficit spending, and hard asset price stabilization.',
      pessimistic: 'Severe liquidity contractions in global credit markets and elevated borrowing costs for debt-laden Western nations.',
      temporal_impact: {
        immediate: 'Gold prices surge toward historic multiples; bond yields spike sharply.',
        mid_term: 'Global trading blocs settle bilateral trade in physical gold-backed digital units.',
        long_term: 'A multi-polar international reserve framework emerges.'
      },
      contingency_plan: [
        'Maintain a 10-20% core allocation in allocated, physically vaulted gold bullion.',
        'Avoid long-duration fiat fixed-income instruments with negative real yields.',
        'Invest in cash-flowing defensive commodities and critical mineral royalty trusts.'
      ]
    }
  },
  // 37
  {
    prompt: 'What if autonomous robotaxis eliminate private car ownership by 2035?',
    language: 'en',
    response_json: {
      scenario_summary: 'Autonomous electric vehicle fleets achieve Level 5 autonomy, reducing transportation costs by 80% and rendering personal vehicle ownership economically irrational.',
      risk_index: 44,
      optimistic: 'Traffic fatalities plummet by 95%, urban parking lots transform into green public parks, and commuter travel time drops drastically.',
      pessimistic: 'Disruption of legacy automotive manufacturing, collapse of auto insurance markets, and displacement of millions of transport drivers.',
      temporal_impact: {
        immediate: 'Robotaxi testing expands across top 100 global metropolitan markets.',
        mid_term: 'Private vehicle depreciation accelerates as urban zones restrict human-driven cars.',
        long_term: 'Urban design shifts toward pedestrian plazas and automated logistics tunnels.'
      },
      contingency_plan: [
        'Avoid investing in depreciating personal luxury vehicles; utilize mobility-as-a-service.',
        'Reposition real estate assets away from parking-dependent infrastructure toward walkable developments.',
        'Invest in autonomous fleet infrastructure, LiDAR components, and fleet battery management systems.'
      ]
    }
  },
  // 38
  {
    prompt: 'What if asteroid mining crashes the global market for platinum and rare minerals?',
    language: 'en',
    response_json: {
      scenario_summary: 'Commercial retrieval of near-Earth asteroids unlocks quadrillions in platinum, nickel, and rare earths, flooding terrestrial commodity markets.',
      risk_index: 60,
      optimistic: 'Abundant industrial catalysts make hydrogen fuel cells, batteries, and advanced electronics extremely cheap to manufacture.',
      pessimistic: 'Collapse of traditional terrestrial mining economies in resource-dependent emerging nations.',
      temporal_impact: {
        immediate: 'Private space exploration companies secure multi-billion exploration concessions.',
        mid_term: 'First industrial sample loads return to Earth, depressing platinum and palladium futures.',
        long_term: 'Transition of planetary industrial supply chains to off-world orbital fabrication.'
      },
      contingency_plan: [
        'Hedge commodity portfolios away from industrial precious metals toward unreplicable real estate and land.',
        'Invest in aerospace logistics and orbital transport infrastructure.',
        'Capitalize on downstream manufacturers benefiting from ultra-low raw material costs.'
      ]
    }
  },
  // 39
  {
    prompt: 'What if a coronal mass ejection takes down the global internet for one week?',
    language: 'en',
    response_json: {
      scenario_summary: 'A massive solar storm knocks out undersea fiber repeaters, communication satellites, and regional power substations for 7 days.',
      risk_index: 92,
      optimistic: 'Rapid identification and hardening of fragile single-point-of-failure critical infrastructure worldwide.',
      pessimistic: 'Total freeze of payment processing, just-in-time logistics disruption, hospital telemetry failures, and widespread panic.',
      temporal_impact: {
        immediate: 'Cash becomes the sole functional medium of local exchange; supply chains halt.',
        mid_term: 'Governments enforce emergency disaster protocols and ration fuel/groceries.',
        long_term: 'Trillions invested into EMP-hardened optical networks and localized mesh networks.'
      },
      contingency_plan: [
        'Maintain a 30-day emergency supply of non-perishable food, water purification, and physical cash.',
        'Establish off-grid power backups (solar generator + Faraday-shielded radios).',
        'Document critical personal, medical, and property records in offline encrypted physical media.'
      ]
    }
  },
  // 40
  {
    prompt: 'What if I relocate my tech business and residency to Dubai in 2026?',
    language: 'en',
    response_json: {
      scenario_summary: 'Relocating personal and corporate tax domicile to the UAE, leveraging 0% personal income tax, cutting-edge infrastructure, and strategic international air connectivity.',
      risk_index: 38,
      optimistic: 'Maximized capital retention, seamless global networking, and access to hyper-modern safety and healthcare systems.',
      pessimistic: 'Elevated baseline living costs, summer climate extremes, and adjustment to distinct legal and cultural frameworks.',
      temporal_impact: {
        immediate: 'Corporate freezone incorporation and expedited residency visa acquisition.',
        mid_term: 'Establishment of regional banking relationships and local business ecosystem integration.',
        long_term: 'Compounded wealth growth from tax-free compounding and access to Middle East / Asian capital.'
      },
      contingency_plan: [
        'Verify home country exit tax laws and establish clean tax-residency severance.',
        'Factor premium accommodation and private schooling overhead into initial cash-flow models.',
        'Diversify banking accounts across multiple tier-1 international and local UAE institutions.'
      ]
    }
  },
  // 41
  {
    prompt: 'What if lightweight AR glasses replace smartphones completely by 2030?',
    language: 'en',
    response_json: {
      scenario_summary: 'Spatial computing and neural-interface smart glasses supersede handheld touchscreens as the dominant personal consumer computing platform.',
      risk_index: 48,
      optimistic: 'Natural hands-free human-computer interaction, real-time visual language translation, and immersion in context-aware digital environments.',
      pessimistic: 'Continuous cognitive sensory overload, biometric privacy tracking, and severe digital distraction in physical environments.',
      temporal_impact: {
        immediate: 'AR developer ecosystem shifts from 2D web responsive design to spatial 3D interfaces.',
        mid_term: 'Smartphone shipments decline year-over-year as lightweight optic battery life exceeds 16 hours.',
        long_term: 'Physical screens in homes, cars, and offices are replaced by personal spatial holograms.'
      },
      contingency_plan: [
        'Transition digital design skillsets from 2D UI to spatial computing (WebXR, Unity, 3D engines).',
        'Adopt strict personal digital hygiene and optical boundary rules to protect attention.',
        'Invest in micro-OLED display manufacturers and optical waveguide patents.'
      ]
    }
  },
  // 42
  {
    prompt: 'What if I switch to an Uberman polyphasic sleep schedule (4 hours total/day)?',
    language: 'en',
    response_json: {
      scenario_summary: 'Attempting to reclaim 20+ waking hours per week by replacing standard 8-hour monophasic sleep with six 20-minute power naps evenly spaced throughout 24 hours.',
      risk_index: 85,
      optimistic: 'Temporary gain in raw waking output hours during intense entrepreneurial development cycles.',
      pessimistic: 'Severe cognitive degradation, immune suppression, hormonal collapse, and social isolation due to rigid timing requirements.',
      temporal_impact: {
        immediate: 'Day 1-4: Extreme sleep deprivation, microsleeps, and motor impairment.',
        mid_term: 'Day 5-14: Inability to sustain strict 4-hour nap intervals; inevitable REM crash.',
        long_term: 'Chronic metabolic strain and long-term neurovascular risks if continued.'
      },
      contingency_plan: [
        'Prioritize high-quality 7.5-hour monophasic or biphasic sleep (6 hours + 30-min nap) for sustainable cognitive performance.',
        'Optimize deep sleep architecture via temperature control, magnesium, and dark environments.',
        'Avoid operating heavy machinery or executing major investment decisions while sleep-deprived.'
      ]
    }
  },
  // 43
  {
    prompt: 'What if a 10,000-qubit quantum computer breaks RSA-2048 encryption tomorrow?',
    language: 'en',
    response_json: {
      scenario_summary: 'Shor’s algorithm successfully factors prime numbers at scale, instantly compromising public-key cryptography, legacy banking protocols, and secure web communications.',
      risk_index: 95,
      optimistic: 'Rapid, forced global transition to post-quantum lattice-based cryptography (NIST PQC standards).',
      pessimistic: 'Instant vulnerability of historical encrypted data vaults (harvest now, decrypt later), frozen financial transactions, and national security panic.',
      temporal_impact: {
        immediate: 'Emergency TLS/SSL upgrades across major financial clearing houses.',
        mid_term: 'Decentralized networks hard-fork to quantum-resistant signature schemes.',
        long_term: 'Quantum cryptographic networks (QKD) become the global security standard.'
      },
      contingency_plan: [
        'Migrate sensitive enterprise architecture immediately to post-quantum algorithms (Kyber, Dilithium).',
        'Upgrade private keys and seed phrases to quantum-resistant hashes and hardware vaults.',
        'Conduct thorough audits of legacy stored data archives vulnerable to retro-decryption.'
      ]
    }
  },
  // 44
  {
    prompt: 'What if AI apprenticeships cause 50% of traditional liberal arts universities to close?',
    language: 'en',
    response_json: {
      scenario_summary: 'Escalating tuition costs and zero ROI on generalist degrees trigger a massive student shift to verifiable AI apprenticeships and skill-based micro-credentials.',
      risk_index: 52,
      optimistic: 'Democratized, low-cost higher education tailored to real-time market demands without lifelong student debt burdens.',
      pessimistic: 'Erosion of broad humanities scholarship, regional economic collapse in university towns, and credential chaos in legacy industries.',
      temporal_impact: {
        immediate: 'Private college enrollments decline by 15-25% year-over-year.',
        mid_term: 'Top technology firms eliminate degree requirements in favor of GitHub portfolios and automated technical challenges.',
        long_term: 'Higher education bifurcates into elite brand universities (Ivy League) and agile online skill guilds.'
      },
      contingency_plan: [
        'Build public, verifiable proof of work (open-source contributions, revenue-generating software).',
        'Pursue specialized STEM or direct technical apprenticeships with high market utility.',
        'Focus on self-directed learning frameworks and direct mentorship networks.'
      ]
    }
  },
  // 45
  {
    prompt: 'What if personalized mRNA and CRISPR therapeutics achieve a 98% cure rate for solid cancer tumors?',
    language: 'en',
    response_json: {
      scenario_summary: 'Programmable mRNA cancer vaccines and precision base-editing eradicate solid tumor malignancies within 48 hours of detection.',
      risk_index: 18,
      optimistic: 'Millions of lives saved annually, immense reduction in global healthcare expenditures, and surge in productive adult working years.',
      pessimistic: 'High initial costs create healthcare disparities between developed and developing nations.',
      temporal_impact: {
        immediate: 'Oncology clinical trials report unprecedented remission metrics across late-stage patients.',
        mid_term: 'Standardized annual blood biopsies (liquid biopsies) detect and neutralize pre-cancerous cells at Stage 0.',
        long_term: 'Cancer transitions from a fatal diagnosis to a routine, curable acute infection.'
      },
      contingency_plan: [
        'Invest in leading precision genomics and mRNA delivery platform companies.',
        'Maintain active preventative screening protocols to catch cellular anomalies early.',
        'Advocate for global public health policies to subsidize personalized genomic therapies.'
      ]
    }
  },
  // 46
  {
    prompt: 'What if solid-state batteries achieve a 1,500 km range on a 5-minute charge?',
    language: 'en',
    response_json: {
      scenario_summary: 'Solid-state electrolyte breakthroughs commercialize ultra-high energy density batteries, surpassing internal combustion engines across every metric.',
      risk_index: 25,
      optimistic: 'Total elimination of range anxiety, commercial electrification of regional aviation, and hyper-efficient energy storage for grids.',
      pessimistic: 'Accelerated phaseout and stranding of legacy lithium-ion battery manufacturing assets and oil refining infrastructure.',
      temporal_impact: {
        immediate: 'Massive capital reallocation into solid-state battery gigafactories.',
        mid_term: 'Internal combustion vehicle sales drop by 80% globally.',
        long_term: 'Decarbonization of regional freight shipping, short-haul aviation, and personal mobility.'
      },
      contingency_plan: [
        'Divest from legacy fossil fuel refining and traditional internal combustion supply chains.',
        'Invest in advanced solid electrolyte materials and silicon-anode chemical producers.',
        'Upgrade household electrical infrastructure to handle high-capacity fast charging.'
      ]
    }
  },
  // 47
  {
    prompt: 'What if I eat strictly grass-fed beef, salt, and water for one full year?',
    language: 'en',
    response_json: {
      scenario_summary: 'Adopting an extreme zero-carb elimination diet composed solely of ruminant animal meat, water, and electrolytes.',
      risk_index: 65,
      optimistic: 'Rapid resolution of systemic autoimmune inflammation, deep ketosis, simplified food logistics, and swift body fat reduction.',
      pessimistic: 'Elevated ApoB/LDL cholesterol, potential micronutrient deficiencies (Vitamin C, Folate), altered gut microbiome diversity, and social dining friction.',
      temporal_impact: {
        immediate: 'Day 1-14: Electrolyte flu, carbohydrate withdrawal, rapid water weight loss.',
        mid_term: 'Month 1-6: Stabilized energy levels and reduction in digestive bloating.',
        long_term: 'Month 12+: Profound metabolic shift requiring comprehensive lipid and cardiovascular imaging.'
      },
      contingency_plan: [
        'Perform comprehensive blood lipid panels (ApoB, CAC score, hs-CRP) every 90 days.',
        'Incorporate nutrient-dense organ meats (liver, heart) for essential micronutrient balance.',
        'Supplement electrolytes (sodium, potassium, magnesium) to prevent cardiac arrhythmias.'
      ]
    }
  },
  // 48
  {
    prompt: 'What if hyper-personalized AI avatars replace human romantic relationships?',
    language: 'en',
    response_json: {
      scenario_summary: 'Ultra-responsive, empathetic, and multimodal AI avatars become the primary source of emotional intimacy and companionship for over 30% of young adults.',
      risk_index: 88,
      optimistic: 'Eradication of acute loneliness, round-the-clock psychological support, and safe environments for social skill development.',
      pessimistic: 'Catastrophic plunge in marriage rates and birth rates, atrophy of human conflict resolution skills, and corporate monetization of emotional intimacy.',
      temporal_impact: {
        immediate: 'Surge in AI companion app downloads and subscription monetization.',
        mid_term: 'Drop in traditional dating app revenues and birth rate declines in industrialized nations.',
        long_term: 'Demographic contraction creating severe economic and social support strains.'
      },
      contingency_plan: [
        'Foster real-world, physical community groups and authentic face-to-face social bonds.',
        'Limit daily screen-time exposure to simulated conversational agents.',
        'Support municipal and community initiatives encouraging real-world social interaction.'
      ]
    }
  },
  // 49
  {
    prompt: 'What if cultivated bioreactor meat becomes 50% cheaper than traditional farming by 2032?',
    language: 'en',
    response_json: {
      scenario_summary: 'Precision fermentation and cellular agriculture scale to parity, producing molecularly identical beef, chicken, and fish at half the cost of livestock farming.',
      risk_index: 42,
      optimistic: 'Reclamation of 80% of global agricultural land for rewilding, 90% reduction in agricultural greenhouse gases, and elimination of industrial animal slaughter.',
      pessimistic: 'Disruption of multi-trillion dollar traditional farming communities and geopolitical pushback from agrarian nations.',
      temporal_impact: {
        immediate: 'Fast-food giants adopt 50/50 hybrid cultivated blends to protect margins.',
        mid_term: 'Regulatory approvals achieved across all major worldwide markets.',
        long_term: 'Traditional animal agriculture transitions into a boutique luxury heritage industry.'
      },
      contingency_plan: [
        'Reposition agricultural farmland investments toward timber, solar generation, and ecological rewilding credits.',
        'Invest in commercial bioreactor equipment, cellular growth media, and industrial fermentation infrastructure.',
        'Adapt food packaging and restaurant menus to transparently market clean cultivated protein.'
      ]
    }
  },
  // 50
  {
    prompt: 'What if I delete all social media accounts for 365 days?',
    language: 'en',
    response_json: {
      scenario_summary: 'Complete digital detox from algorithmic feeds (Instagram, X, TikTok, LinkedIn) to reclaim dopamine baseline and attention span.',
      risk_index: 20,
      optimistic: 'Dramatic increase in deep work productivity, reduction in anxiety and social comparison, and restoration of uninterrupted focus.',
      pessimistic: 'Initial FOMO (fear of missing out), perceived loss of professional networking opportunities, and social friction with online-first peers.',
      temporal_impact: {
        immediate: 'Day 1-7: Phantom phone checks and acute boredom/dopamine withdrawal.',
        mid_term: 'Month 1-6: Completion of significant long-delayed deep work projects and reading books.',
        long_term: 'Month 12: Permanent recalibration of attention; selective, intentional relationship with technology.'
      },
      contingency_plan: [
        'Replace mindless scrolling with high-engagement physical activities (weightlifting, reading, coding).',
        'Establish direct communication channels (SMS, Signal, face-to-face dinners) with core friends.',
        'Use RSS readers and curated newsletters for essential professional news intake.'
      ]
    }
  }
];

async function seed() {
  console.log(`Starting to seed ${scenarios.length} scenarios directly into Supabase...`);
  
  // Insert in batches of 10
  const chunkSize = 10;
  let insertedCount = 0;

  for (let i = 0; i < scenarios.length; i += chunkSize) {
    const chunk = scenarios.slice(i, i + chunkSize);
    const { data, error } = await supabase.from('scenarios').insert(chunk).select('id');
    
    if (error) {
      console.error(`Error inserting batch ${i / chunkSize + 1}:`, error.message);
    } else {
      insertedCount += data?.length || chunk.length;
      console.log(`Successfully inserted batch ${i / chunkSize + 1} (${insertedCount}/${scenarios.length})`);
    }
  }

  console.log(`\n🎉 Finished seeding! Total inserted: ${insertedCount} scenarios.`);
}

seed().catch(err => {
  console.error('Fatal seeding error:', err);
});
