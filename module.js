const stathamQuotes = [
  'Я никогда не обижаюсь на то, что я не получаю того, чего хочу. Я обижаюсь на то, что ты обещаешь мне что-то, чего не можешь дать.',
  'Получить другого актера и заменить меня просто не получится.',
  'У меня нет времени на непонимание. Все просто.',
  'Я не вижу себя звездой. Я вижу себя как рабочего актера.',
  'Ты знаешь, что я делаю, чтобы сохранить физическую форму? Я просто удаляю удобства из своей жизни. Если у меня есть просьба о чем-то, что я знаю, что мне следует делать, я просто удаляю это.',
  'Всегда действуй, как будто жизнь только что началась.',
  'Будь настоящим. Не позволяй ничему повлиять на тебя.',
  'Никогда не прекращай учиться, потому что жизнь никогда не прекращает удивлять.',
  'Лучший способ сделать что-то — это просто сделать это.',
  'Успех приходит только к тем, кто готов к нему.',
  'Никогда не сдавайся. Всегда иди до конца.',
  'Будь смелым и уверенным в себе. Это половина успеха.',
  'Завтра может быть слишком поздно, поэтому сегодня действуй.',
  'Ты можешь все, что захочешь, если будешь настойчивым и веришь в себя.',
  'Без мечты и веры в себя нельзя достичь великих высот.',
  'Лучшая подготовка к завтрашнему дню — делать сегодня все возможное.',
  'Я всегда стараюсь быть лучше, чем я был вчера.',
  'У меня нет времени на непонимание. Все просто.',
  'Я не вижу себя звездой. Я вижу себя как рабочего актера.',
  'Получить другого актера и заменить меня просто не получится.',
  'Если бы мне надо было угадывать кажущиеся трудности, я бы никогда не смог создать карьеру.',
  'Я не живу той жизнью, которую живет режиссер или продюсер. Я не обсуждаю, кем он думает, что я должен быть. Я беру контроль над тем, кто я.',
  'Я всегда мечтал о роли в хорошем боевике, чтобы мне было чем заняться.',
  'Моя цель - быть великим актером.',
  'Я знаю, что делать, чтобы сохранить себя в форме. Я просто удаляю все удобства из своей жизни.',
  'Я никогда не обижаюсь на то, что я не получаю того, чего хочу. Я обижаюсь на то, что ты обещаешь мне что-то, чего не можешь дать.',
  'Я предпочитаю меньше слов и больше дела.',
  'Жизнь слишком коротка, чтобы тратить ее на раздумья.',
  'Великие вещи никогда не происходят из зоны комфорта.',
  'Будь смелым и стойким. Это ключ к достижению цели.',
  'Скромность — это не признак слабости, а знак силы и уверенности.',
  'Никогда не переставай верить в себя. Ты способен на большее, чем можешь себе представить.',
  'Настоящее счастье не в том, чтобы иметь то, чего нет, а в том, чтобы ценить то, что есть.',
  'Успех приходит к тем, кто готов к нему и кто делает шаги вперед несмотря ни на что.',
  'Каждая неудача — это новая возможность стать сильнее и умнее.',
  'Твои мечты — это твое руководство к достижению высот.',
  'Поднимайся после каждого падения, и ты станешь непобедимым.',
  'Живи так, чтобы твоя жизнь стала легендой.',
  'В жизни нет ничего невозможного, если у тебя есть цель и решимость.',
  'Секрет успеха заключается в том, чтобы начать делать то, что нужно делать, и продолжать делать это до тех пор, пока не достигнешь своей цели.',
  'Постоянное развитие и самосовершенствование — ключ к успешной жизни.',
  'Верь в себя и свои способности, и ничто не сможет остановить тебя на пути к успеху.',
  'Твоя сила и выносливость определяют твою способность достигать целей.',
  'Не останавливайся на достигнутом. Всегда стремись к большему и лучшему.',
  'Будь настойчивым и целеустремленным. Ты сможешь преодолеть любые препятствия на пути к своей мечте.',
  'Ты сильнее, чем думаешь, и способен на большее, чем предполагаешь.',
  'Помни, что даже самый трудный путь начинается с первого шага.',
  'Твоя решимость и упорство определяют твой успех в жизни.',
  'Жизнь — это не ожидание, что произойдет, а создание того, что произойдет.',
  'Пока ты не попробуешь, ты не узнаешь, на что способен.',
  'Успех — это не случайность, а результат упорного труда и неуклонной веры в себя.',
  'Настоящий успех — это не только достижение цели, но и процесс самосовершенствования.',
  'Не бойся ошибаться. Ошибки — это шанс учиться и расти.',
  'Твое тело — это твой храм. Ухаживай за ним и он будет служить тебе верой и правдой.',
  'Иногда самые трудные решения приводят к самым благоприятным результатам.',
  'Будь настойчивым и упорным. Только так ты сможешь достичь вершин.',
  'В жизни важно иметь цель и стремиться к ее достижению, несмотря ни на что.',
  'Ты ответственен за свою судьбу. Только ты можешь сделать свою мечту реальностью.',
  'Лучший способ предсказать будущее — это создать его самому.',
  'Будь смелым и дерзким. Только так можно покорить вершины.',
  'Жизнь — это не ожидание, что произойдет, а создание того, что произойдет.',
  'Иногда ты должен принять решение и действовать, даже если ты не уверен в том, что прав.',
  'На пути к успеху всегда будут препятствия. Их надо преодолевать, а не отступать.',
  'Лучший способ предсказать будущее — это создать его самому.',
  'Твоя сила и выносливость определяют твою способность достигать целей.',
  'Настоящий успех — это результат постоянных усилий и стремления к совершенству.',
  'Самый важный шаг на пути к успеху — это первый шаг.',
  'Будь настойчивым и упорным. Только так ты сможешь преодолеть все трудности.',
  'Жизнь — это не ожидание, что произойдет, а создание того, что произойдет.',
  'Помни, что каждый день — это новая возможность стать лучше, чем вчера.',
  'Иногда самые трудные моменты в жизни могут привести к самым благоприятным изменениям.',
  'Твоя сила не измеряется количеством мускулов, а тем, как ты справляешься с жизненными трудностями.',
  'Будь смелым и уверенным в себе. Только так ты сможешь преодолеть все препятствия на пути к успеху.',
  'Никогда не сдавайся, даже когда кажется, что путь к успеху невозможен.',
  'Иногда ты должен рисковать, чтобы добиться больших результатов.',
  'Трудности — это не конец пути, а лишь испытание на пути к успеху.',
  'Будь настойчивым и целеустремленным, и ты сможешь преодолеть все трудности.',
  'Лучший способ достичь цели — это начать действовать прямо сейчас.',
  'Успех — это не случайность, а результат упорного труда и постоянных усилий.',
  'Будь решителен и уверен в своих силах, и ты сможешь достичь всего, что захочешь.',
  'Жизнь — это не ожидание, что произойдет, а создание того, что произойдет.',
  'Помни, что даже самые маленькие шаги могут привести к великим результатам.',
  'Никогда не переставай мечтать и верить в себя, и ты сможешь достичь невозможного.',
  'Будь смелым и решительным, и мир будет лежать у твоих ног.',
  'Настоящий успех — это результат труда, упорства и веры в себя.',
  'Твое будущее зависит от того, какие решения ты примешь сегодня.',
];
module.exports = stathamQuotes;