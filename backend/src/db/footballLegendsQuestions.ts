// Curated and Procedural Question Bank for:
// - Cristiano Ronaldo (CR7, Real Madrid 450 goals, 5 Ballon d'Ors, SIUUU)
// - Eden Hazard (Chelsea Magician #10, 2x Premier League, Real Madrid Galáctico)
// - N'Golo Kanté (The 100% Engine, 70% of Earth covered, Chelsea 2021 UCL MOTM)
// - Chelsea FC & Real Madrid FC (Stamford Bridge & Santiago Bernabéu legends)
// - Tactical Football Chess (Pivote Knight, Half-space Bishop, Grandmaster strategy)

export interface FootballQuestion {
  text: string;
  difficulty: 'easy' | 'medium' | 'tough';
  category: string;
  code_snippet?: string | null;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export const footballLegendsQuestions: FootballQuestion[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // EASY QUESTIONS (Move 1-2 // Opening Theory)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    text: "How many Ballon d'Or awards has Cristiano Ronaldo won in his legendary football career?",
    difficulty: 'easy',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['3', '4', '5', '7'],
    correct_answer: '5',
    explanation:
      "Cristiano Ronaldo won 5 Ballon d'Or trophies (2008, 2013, 2014, 2016, and 2017), cementing his status as one of football's greatest of all time.",
  },
  {
    text: "What is Cristiano Ronaldo's iconic celebration called, where he leaps, spins mid-air, and shouts upon landing?",
    difficulty: 'easy',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['SIUUU', 'CALMA', 'SAMBA', 'GOLAZO'],
    correct_answer: 'SIUUU',
    explanation:
      "Ronaldo introduced his iconic 'SIUUU' celebration during his Real Madrid days in 2014, which quickly became a global sports phenomenon.",
  },
  {
    text: 'Which famous shirt number did Eden Hazard wear as the creative talisman for Chelsea FC?',
    difficulty: 'easy',
    category: 'Eden Hazard',
    code_snippet: null,
    options: ['#7', '#10', '#9', '#11'],
    correct_answer: '#10',
    explanation:
      'Eden Hazard famously wore the #10 shirt at Chelsea (having previously worn #17), leading the Blues to two Premier League titles and two Europa Leagues.',
  },
  {
    text: 'With which national team did Chelsea midfield maestro N’Golo Kanté win the FIFA World Cup in 2018?',
    difficulty: 'easy',
    category: 'N\'Golo Kante',
    code_snippet: null,
    options: ['France', 'Belgium', 'Mali', 'England'],
    correct_answer: 'France',
    explanation:
      'N’Golo Kanté was the midfield engine for Didier Deschamps’ France squad that lifted the 2018 FIFA World Cup in Russia.',
  },
  {
    text: 'How many UEFA Champions League / European Cup titles has Real Madrid won, making them the kings of Europe?',
    difficulty: 'easy',
    category: 'Real Madrid',
    code_snippet: null,
    options: ['10', '12', '14', '15'],
    correct_answer: '15',
    explanation:
      'Real Madrid holds the European record with 15 Champions League titles, including the historic 2024 triumph and the legendary three-peat (2016-2018).',
  },
  {
    text: 'What is the name of Chelsea Football Club’s historic home stadium located in West London?',
    difficulty: 'easy',
    category: 'Chelsea FC',
    code_snippet: null,
    options: ['Stamford Bridge', 'Santiago Bernabéu', 'Old Trafford', 'Anfield'],
    correct_answer: 'Stamford Bridge',
    explanation:
      'Stamford Bridge has been Chelsea FC’s iconic home stadium since the club was founded in 1905.',
  },
  {
    text: 'Which national team did dribble wizard Eden Hazard represent and captain during their Golden Generation?',
    difficulty: 'easy',
    category: 'Eden Hazard',
    code_snippet: null,
    options: ['Belgium', 'France', 'Netherlands', 'Portugal'],
    correct_answer: 'Belgium',
    explanation:
      'Eden Hazard captained Belgium to a historic 3rd-place finish at the 2018 FIFA World Cup in Russia, winning the Silver Ball.',
  },
  {
    text: 'N’Golo Kanté achieved the rare feat of winning back-to-back Premier League titles with two different clubs. Which two clubs?',
    difficulty: 'easy',
    category: 'N\'Golo Kante',
    code_snippet: null,
    options: [
      'Leicester City & Chelsea',
      'Arsenal & Chelsea',
      'Chelsea & Manchester City',
      'Leicester City & Real Madrid',
    ],
    correct_answer: 'Leicester City & Chelsea',
    explanation:
      'Kanté won the miraculous 5000-1 Premier League title with Leicester City in 2015-16, then moved to Chelsea and won it again in 2016-17.',
  },
  {
    text: 'What is the famous football internet quote describing N’Golo Kanté’s unbelievable stamina and defensive work-rate?',
    difficulty: 'easy',
    category: 'N\'Golo Kante',
    code_snippet: null,
    options: [
      '70% of the Earth is covered by water, the rest is covered by N’Golo Kanté',
      'Kanté runs faster than light',
      'The midfield is Kanté’s backyard',
      'Kanté never sleeps, he just intercepts',
    ],
    correct_answer: '70% of the Earth is covered by water, the rest is covered by N’Golo Kanté',
    explanation:
      'Coined by football fans and pundits, this quote captured Kanté’s relentless defensive running and dual-lung work-rate.',
  },
  {
    text: 'In which year did Cristiano Ronaldo make his world-record transfer to Real Madrid?',
    difficulty: 'easy',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['2007', '2009', '2011', '2014'],
    correct_answer: '2009',
    explanation:
      'Ronaldo joined Real Madrid in the summer of 2009 for a then world-record fee of £80 million (€94 million).',
  },
  {
    text: 'Which legendary Spanish stadium serves as the royal fortress of Real Madrid CF?',
    difficulty: 'easy',
    category: 'Real Madrid',
    code_snippet: null,
    options: ['Santiago Bernabéu', 'Camp Nou', 'Wanda Metropolitano', 'Mestalla'],
    correct_answer: 'Santiago Bernabéu',
    explanation:
      'The Santiago Bernabéu Stadium has been Real Madrid’s home since 1947, hosting iconic Champions League nights and El Clásicos.',
  },
  {
    text: 'Which club did Eden Hazard sign for in the summer of 2019 after seven glorious seasons at Chelsea?',
    difficulty: 'easy',
    category: 'Eden Hazard',
    code_snippet: null,
    options: ['Real Madrid', 'Barcelona', 'Paris Saint-Germain', 'Bayern Munich'],
    correct_answer: 'Real Madrid',
    explanation:
      'Eden Hazard joined Real Madrid in July 2019 as a galáctico signing following his Europa League triumph with Chelsea.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MEDIUM QUESTIONS (Move 3-4 // Tactical Middlegame)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    text: 'How many total goals did Cristiano Ronaldo score for Real Madrid during his 438 appearances?',
    difficulty: 'medium',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['450 goals', '350 goals', '400 goals', '500 goals'],
    correct_answer: '450 goals',
    explanation:
      'Ronaldo scored an astonishing 450 goals in just 438 games for Real Madrid (averaging 1.03 goals per game), becoming the club’s all-time top scorer.',
  },
  {
    text: 'In Chelsea’s 2020-21 UEFA Champions League title run, in which consecutive knockout matches did N’Golo Kanté win official UEFA Man of the Match awards?',
    difficulty: 'medium',
    category: 'N\'Golo Kante',
    code_snippet: null,
    options: [
      'Both semi-final legs vs Real Madrid AND the Final vs Man City',
      'Only the Final vs Man City',
      'The Quarter-final and Semi-final only',
      'The Group stage only',
    ],
    correct_answer: 'Both semi-final legs vs Real Madrid AND the Final vs Man City',
    explanation:
      'Kanté produced an unprecedented masterclass by being awarded UEFA Man of the Match in both semi-final legs against Real Madrid and the final against Manchester City in Porto.',
  },
  {
    text: 'In February 2017, Eden Hazard scored one of the greatest solo goals in Premier League history against Arsenal. How was it executed?',
    difficulty: 'medium',
    category: 'Eden Hazard',
    code_snippet: null,
    options: [
      'Collected at halfway, spun past Coquelin, beat Koscielny, and chipped Cech',
      'Scored a 40-yard overhead bicycle kick',
      'Curled a direct corner kick into the top corner',
      'A 35-yard free kick through the wall',
    ],
    correct_answer: 'Collected at halfway, spun past Coquelin, beat Koscielny, and chipped Cech',
    explanation:
      'Hazard received the ball near the halfway line, spun away from Francis Coquelin, burst past Laurent Koscielny, and delicately finished past Petr Cech.',
  },
  {
    text: 'Who was the manager who guided Cristiano Ronaldo and Real Madrid to the historic Champions League three-peat (2016, 2017, 2018)?',
    difficulty: 'medium',
    category: 'Real Madrid',
    code_snippet: null,
    options: ['Zinedine Zidane', 'Carlo Ancelotti', 'Jose Mourinho', 'Vicente del Bosque'],
    correct_answer: 'Zinedine Zidane',
    explanation:
      'Zinedine Zidane made football history by leading Real Madrid to three consecutive UEFA Champions League trophies from 2016 to 2018.',
  },
  {
    text: 'Eden Hazard transferred from Chelsea to Real Madrid after delivering a match-winning 2-goal performance in which major European final?',
    difficulty: 'medium',
    category: 'Eden Hazard',
    code_snippet: null,
    options: [
      '2019 UEFA Europa League Final in Baku',
      '2019 FA Cup Final',
      '2018 Champions League Final',
      '2019 EFL Cup Final',
    ],
    correct_answer: '2019 UEFA Europa League Final in Baku',
    explanation:
      'Hazard scored twice and provided an assist in Chelsea’s 4-1 victory over Arsenal in Baku, lifting the Europa League trophy in his final Chelsea match.',
  },
  {
    text: 'In Chelsea’s legendary 2004-05 Premier League winning season, how many total goals did their defense concede across all 38 matches?',
    difficulty: 'medium',
    category: 'Chelsea FC',
    code_snippet: null,
    options: ['Only 15 goals', '22 goals', '28 goals', '18 goals'],
    correct_answer: 'Only 15 goals',
    explanation:
      'Chelsea set the all-time Premier League record by conceding just 15 goals in 38 games with 25 clean sheets under Jose Mourinho.',
  },
  {
    text: 'In the 2018 Champions League quarter-final for Real Madrid against Juventus, how high in the air did Cristiano Ronaldo make contact with his iconic bicycle kick?',
    difficulty: 'medium',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['2.38 meters (7 ft 10 in)', '1.95 meters', '2.10 meters', '2.75 meters'],
    correct_answer: '2.38 meters (7 ft 10 in)',
    explanation:
      'Ronaldo jumped an astonishing 2.38 meters (crossbar height is 2.44m) to score one of the greatest Champions League goals ever, earning a standing ovation from Juventus fans.',
  },
  {
    text: 'In tactical football theory, why is a defensive midfield pivot like N’Golo Kanté often compared to a Chess Knight (♞)?',
    difficulty: 'medium',
    category: 'Tactical Football Chess',
    code_snippet: null,
    options: [
      'Because he maneuvers between opposing lines, controlling critical central squares and breaking attacks with fork-like interceptions',
      'Because he only moves in straight lines',
      'Because he can only play on the wings',
      'Because he never crosses the halfway line',
    ],
    correct_answer:
      'Because he maneuvers between opposing lines, controlling critical central squares and breaking attacks with fork-like interceptions',
    explanation:
      'Just as a Knight leaps over obstacles to control central outpost squares (d4, e4, d5, e5), Kanté’s mobility allows him to cover angles other midfielders cannot reach.',
  },
  {
    text: 'Who scored the 88th-minute equalizer and the winning penalty for Chelsea in the 2012 UEFA Champions League final in Munich?',
    difficulty: 'medium',
    category: 'Chelsea FC',
    code_snippet: null,
    options: ['Didier Drogba', 'Frank Lampard', 'John Terry', 'Fernando Torres'],
    correct_answer: 'Didier Drogba',
    explanation:
      'Didier Drogba rose to head home Juan Mata’s corner in the 88th minute and then slotted the decisive penalty to win Chelsea’s first ever Champions League.',
  },
  {
    text: 'During his 7-season spell at Chelsea, Eden Hazard led the Premier League in which attacking metric with over 900 successful executions?',
    difficulty: 'medium',
    category: 'Eden Hazard',
    code_snippet: null,
    options: [
      'Successful Take-ons / Dribbles Completed',
      'Long balls completed',
      'Headed clearances',
      'Throw-ins taken',
    ],
    correct_answer: 'Successful Take-ons / Dribbles Completed',
    explanation:
      'Hazard completed over 900 successful dribbles in the Premier League for Chelsea, with a success rate exceeding 65%, earning comparisons to Lionel Messi.',
  },
  {
    text: 'Which iconic car did N’Golo Kanté famously drive to Chelsea training at Cobham despite being a world champion?',
    difficulty: 'medium',
    category: 'N\'Golo Kante',
    code_snippet: null,
    options: ['White Mini Cooper', 'Ferrari 488', 'Lamborghini Aventador', 'Bentley Continental'],
    correct_answer: 'White Mini Cooper',
    explanation:
      'Known for his legendary humility, Kanté drove a modest Mini Cooper throughout his Chelsea career, even repairing it with duct tape after a minor collision.',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // TOUGH QUESTIONS (Move 5 // Grandmaster Endgame)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    text: 'Cristiano Ronaldo is the all-time top scorer in UEFA Champions League history. Exactly how many goals did he score in the competition?',
    difficulty: 'tough',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['140 goals', '129 goals', '135 goals', '148 goals'],
    correct_answer: '140 goals',
    explanation:
      'Ronaldo scored 140 goals in 183 Champions League matches (105 for Real Madrid, 21 for Man United, 14 for Juventus), holding the all-time tournament record.',
  },
  {
    text: 'During Leicester City’s fairytale 2015-16 title season, N’Golo Kanté finished top of the Premier League in both tackles and interceptions. What were his staggering totals?',
    difficulty: 'tough',
    category: 'N\'Golo Kante',
    code_snippet: null,
    options: [
      '175 tackles & 156 interceptions',
      '120 tackles & 90 interceptions',
      '140 tackles & 110 interceptions',
      '200 tackles & 190 interceptions',
    ],
    correct_answer: '175 tackles & 156 interceptions',
    explanation:
      'Kanté recorded 175 tackles and 156 interceptions in 2015-16, both highest in Europe’s top five leagues, sparking Chelsea’s £32m move for him that summer.',
  },
  {
    text: 'When Real Madrid won both La Liga and the Champions League in 2016-17, how many goals did Cristiano Ronaldo score in the knockout stages (QFs, SFs, and Final) alone?',
    difficulty: 'tough',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: [
      '10 goals (including 5 vs Bayern, 3 vs Atletico, 2 vs Juventus)',
      '6 goals',
      '8 goals',
      '12 goals',
    ],
    correct_answer: '10 goals (including 5 vs Bayern, 3 vs Atletico, 2 vs Juventus)',
    explanation:
      'Ronaldo delivered arguably the greatest knockout campaign in UCL history: 5 goals against Bayern in the QFs, a hat-trick against Atletico in the SF, and 2 goals against Juventus in the Final (10 goals in 5 games).',
  },
  {
    text: 'In his final 2018-19 Premier League season with Chelsea, Eden Hazard won the Premier League Playmaker of the Season award by recording how many direct goal contributions?',
    difficulty: 'tough',
    category: 'Eden Hazard',
    code_snippet: null,
    options: [
      '16 goals and 15 assists (31 total G/A)',
      '12 goals and 10 assists',
      '18 goals and 8 assists',
      '20 goals and 12 assists',
    ],
    correct_answer: '16 goals and 15 assists (31 total G/A)',
    explanation:
      'Hazard carried Chelsea’s attack with 16 goals and a league-leading 15 assists (31 direct goal involvements), being the most productive player in the league.',
  },
  {
    text: 'In modern tactical football, how does Eden Hazard’s movement from the left flank into the "half-space" mirror the tactical concept of a Chess Bishop (♝) on an open diagonal?',
    difficulty: 'tough',
    category: 'Tactical Football Chess',
    code_snippet: null,
    options: [
      'It cuts through the intersection between the opponent’s full-back and centre-back, creating a diagonal pin that forces defenders into an unguardable overload',
      'It forces the opponent to forfeit the match immediately',
      'It traps his own teammates in an offside position',
      'It only functions when the opposing goalkeeper is off their line',
    ],
    correct_answer:
      'It cuts through the intersection between the opponent’s full-back and centre-back, creating a diagonal pin that forces defenders into an unguardable overload',
    explanation:
      'Like a fianchettoed bishop operating on a long diagonal, attacking the half-space drags the opposing centre-back out of position while pinning the full-back, creating an unguardable tactical overload.',
  },
  {
    text: 'In the 2021 UEFA Champions League Final in Porto, N’Golo Kanté won 100% of his aerial duels against Manchester City. How many ball recoveries did he produce during that 90-minute masterclass?',
    difficulty: 'tough',
    category: 'N\'Golo Kante',
    code_snippet: null,
    options: ['10 recoveries with 0 fouls committed', '4 recoveries', '6 recoveries', '14 recoveries with 3 fouls'],
    correct_answer: '10 recoveries with 0 fouls committed',
    explanation:
      'Kanté delivered a flawless defensive clinic in the 2021 final: 10 ball recoveries, 100% aerial duel success rate, 3 tackles won, and not a single foul committed all match.',
  },
  {
    text: 'Cristiano Ronaldo holds the record for the most goals in a single UEFA Champions League season. How many goals did he score in Real Madrid’s La Décima campaign (2013-14)?',
    difficulty: 'tough',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['17 goals', '15 goals', '14 goals', '19 goals'],
    correct_answer: '17 goals',
    explanation:
      'Ronaldo scored an all-time record 17 goals in the 2013-14 Champions League season, finishing with the 120th-minute penalty in the Lisbon final against Atletico Madrid.',
  },
  // ── MORE FOOTBALL LEGENDS & FOOTBALL-CODE HYBRIDS ──
  {
    text: 'Who scored the winning penalty for Chelsea FC in the 2012 UEFA Champions League Final against Bayern Munich in Munich?',
    difficulty: 'easy',
    category: 'Chelsea FC',
    code_snippet: null,
    options: ['Didier Drogba', 'Frank Lampard', 'John Terry', 'Ashley Cole'],
    correct_answer: 'Didier Drogba',
    explanation: 'Didier Drogba scored the final penalty in the Allianz Arena shootout to win Chelsea their historic first UEFA Champions League title.'
  },
  {
    text: 'How many UEFA Champions League titles has Real Madrid won in its history as of 2024?',
    difficulty: 'easy',
    category: 'Real Madrid',
    code_snippet: null,
    options: ['15', '10', '12', '14'],
    correct_answer: '15',
    explanation: 'Real Madrid is the undisputed king of European football, having won an unprecedented 15 UEFA Champions League / European Cup titles.'
  },
  {
    text: "Which underdog club did N'Golo Kanté win the miraculous 2015-16 Premier League title with before joining Chelsea?",
    difficulty: 'easy',
    category: "N'Golo Kante",
    code_snippet: null,
    options: ['Leicester City', 'Southampton', 'Watford', 'Everton'],
    correct_answer: 'Leicester City',
    explanation: 'Kanté was the heartbeat of Claudio Ranieri’s 5000-to-1 underdog Leicester City team that captured the 2015-16 Premier League championship.'
  },
  {
    text: 'What iconic squad number did Cristiano Ronaldo wear at Real Madrid after Raúl departed in 2010?',
    difficulty: 'easy',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['#7', '#9', '#10', '#11'],
    correct_answer: '#7',
    explanation: 'After initially wearing #9 in his debut 2009-10 season, Ronaldo took the iconic #7 jersey and built the CR7 global empire.'
  },
  {
    text: 'What is Real Madrid’s world-famous home stadium called in Madrid, Spain?',
    difficulty: 'easy',
    category: 'Real Madrid',
    code_snippet: null,
    options: ['Santiago Bernabéu', 'Camp Nou', 'Metropolitano', 'San Siro'],
    correct_answer: 'Santiago Bernabéu',
    explanation: 'The Santiago Bernabéu stadium has been the legendary fortress of Real Madrid since 1947.'
  },
  {
    text: 'What is Chelsea FC’s historic home ground in London called?',
    difficulty: 'easy',
    category: 'Chelsea FC',
    code_snippet: null,
    options: ['Stamford Bridge', 'Emirates Stadium', 'White Hart Lane', 'Anfield'],
    correct_answer: 'Stamford Bridge',
    explanation: 'Stamford Bridge in Fulham, London, has been Chelsea FC’s home ground since the club was founded in 1905.'
  },
  {
    text: 'Which legendary French manager led Real Madrid to an unprecedented 3 consecutive UEFA Champions League trophies from 2016 to 2018?',
    difficulty: 'easy',
    category: 'Real Madrid',
    code_snippet: null,
    options: ['Zinedine Zidane', 'Carlo Ancelotti', 'José Mourinho', 'Vicente del Bosque'],
    correct_answer: 'Zinedine Zidane',
    explanation: 'Zinedine Zidane made history as the first manager ever to win three consecutive Champions League trophies in the modern era.'
  },
  {
    text: 'Which vehicle did the humble multi-millionaire N’Golo Kanté famously drive to Chelsea training every single day?',
    difficulty: 'easy',
    category: "N'Golo Kante",
    code_snippet: null,
    options: ['A white Mini Cooper', 'A red Ferrari 488', 'A Lamborghini Aventador', 'A gold Bugatti'],
    correct_answer: 'A white Mini Cooper',
    explanation: 'Despite earning hundreds of thousands of pounds per week, the famously modest Kanté drove a pre-owned white Mini Cooper to Cobham training ground.'
  },
  {
    text: 'In programming, if Cristiano Ronaldo’s match goals are stored in an array goals = [1, 2], which method adds another goal to the end in JavaScript?',
    difficulty: 'easy',
    category: 'Football & Code',
    code_snippet: 'const goals = [1, 2];\ngoals.push(3); // Result: [1, 2, 3]',
    options: ['goals.push(3)', 'goals.pop()', 'goals.shift()', 'goals.slice()'],
    correct_answer: 'goals.push(3)',
    explanation: 'The push() method in JavaScript and Python appends an element to the end of a list or array.'
  },
  {
    text: 'If N’Golo Kanté recovers the ball in O(1) time complexity, what does this denote in computational algorithm theory?',
    difficulty: 'easy',
    category: 'Football & Code',
    code_snippet: null,
    options: ['Constant time complexity regardless of pitch size', 'Exponential time complexity', 'Linear time O(N)', 'Quadratic slowdown O(N²)'],
    correct_answer: 'Constant time complexity regardless of pitch size',
    explanation: 'O(1) signifies constant time complexity — Kanté executes the tackle instantaneously without relying on input size.'
  },
  {
    text: 'In 2017, Eden Hazard scored one of the most famous solo goals in Premier League history against Arsenal. How did he initiate the move?',
    difficulty: 'medium',
    category: 'Eden Hazard',
    code_snippet: null,
    options: [
      'Received the ball at the halfway line, spun past Coquelin, and danced past 3 defenders',
      'Scored directly from a 40-yard free kick',
      'Headed in a corner kick at the near post',
      'Converted a stoppage-time penalty'
    ],
    correct_answer: 'Received the ball at the halfway line, spun past Coquelin, and danced past 3 defenders',
    explanation: 'Hazard picked up the ball inside the center circle, famously spun past Francis Coquelin, shimmied through Koscielny, and chipped Petr Cech.'
  },
  {
    text: 'Against which legendary goalkeeper did Cristiano Ronaldo score his iconic 2.38m overhead bicycle kick in the 2018 UCL Quarter-Final?',
    difficulty: 'medium',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['Gianluigi Buffon', 'Manuel Neuer', 'Thibaut Courtois', 'David de Gea'],
    correct_answer: 'Gianluigi Buffon',
    explanation: 'Ronaldo leapt 2.38 meters into the Turin sky to volley past Gianluigi Buffon, receiving a standing ovation from the entire Juventus stadium.'
  },
  {
    text: 'Which Chelsea legend holds the club’s all-time record with 211 goals despite operating as a central midfielder?',
    difficulty: 'medium',
    category: 'Chelsea FC',
    code_snippet: null,
    options: ['Frank Lampard', 'Didier Drogba', 'Gianfranco Zola', 'Michael Ballack'],
    correct_answer: 'Frank Lampard',
    explanation: 'Super Frank Lampard scored 211 goals in 648 games for Chelsea, cementing his status as the highest-scoring midfielder in Premier League history.'
  },
  {
    text: 'In Real Madrid’s "La Décima" 2014 Champions League Final against Atlético Madrid, in which exact minute did Sergio Ramos head in the equalizer?',
    difficulty: 'medium',
    category: 'Real Madrid',
    code_snippet: null,
    options: ['92:48 (93rd minute)', '89:12 (90th minute)', '94:55 (95th minute)', '119:00 (120th minute)'],
    correct_answer: '92:48 (93rd minute)',
    explanation: 'At 92:48, Luka Modrić whipped in a corner and Sergio Ramos buried a header into the bottom corner, sparking Real Madrid’s 4-1 extra-time triumph.'
  },
  {
    text: 'If N’Golo Kanté runs a background task scanning every opponent passing lane without blocking the main game loop, which concurrency pattern does this reflect?',
    difficulty: 'medium',
    category: 'Football & Code',
    code_snippet: null,
    options: [
      'Asynchronous Event Loop / Non-blocking Worker Thread',
      'Synchronous blocking I/O bottleneck',
      'Infinite recursion with no base condition',
      'Single-threaded deadlocked process'
    ],
    correct_answer: 'Asynchronous Event Loop / Non-blocking Worker Thread',
    explanation: 'Kanté operates like an asynchronous event loop worker: intercepting signals continuously in the background without freezing the team’s forward momentum.'
  },
  {
    text: 'Consider simulating Eden Hazard’s dribble in code: while(defenders.length > 0) { defenders.pop(); }. When the loop terminates, what is defenders.length?',
    difficulty: 'medium',
    category: 'Football & Code',
    code_snippet: 'const defenders = ["Koscielny", "Mustafi", "Coquelin"];\nwhile(defenders.length > 0) {\n  defenders.pop();\n}\nconsole.log(defenders.length);',
    options: ['0', '1', '3', 'Undefined'],
    correct_answer: '0',
    explanation: 'Hazard removes every defender one by one with pop() until the array is completely empty (length = 0).'
  },
  {
    text: 'During the 2016-17 Premier League title race under Antonio Conte, which formation switch sparked Chelsea’s 13-game winning streak?',
    difficulty: 'tough',
    category: 'Chelsea FC',
    code_snippet: null,
    options: ['3-4-3 with Alonso & Moses as wing-backs', '4-4-2 diamond with twin strikers', '5-4-1 ultra defensive low block', '4-2-4 Brazilian attack formation'],
    correct_answer: '3-4-3 with Alonso & Moses as wing-backs',
    explanation: 'Conte switched to 3-4-3 at half-time against Arsenal, and Chelsea proceeded to win 13 consecutive league games with Kanté dominating the midfield.'
  },
  {
    text: 'Cristiano Ronaldo holds the record for the most goals in UEFA Champions League history. What is his total tally?',
    difficulty: 'tough',
    category: 'Cristiano Ronaldo',
    code_snippet: null,
    options: ['140 goals', '120 goals', '128 goals', '152 goals'],
    correct_answer: '140 goals',
    explanation: 'Cristiano Ronaldo scored 140 UEFA Champions League goals (105 for Real Madrid, 21 for Manchester United, 14 for Juventus), making him the all-time top scorer.'
  },
  {
    text: 'In a graph where vertices represent footballers and weighted edges represent passing difficulty, which algorithm finds the optimal path from Hazard to Ronaldo’s boots?',
    difficulty: 'tough',
    category: 'Football & Code',
    code_snippet: null,
    options: [
      'Dijkstra’s Shortest Path Algorithm',
      'Bubble Sort',
      'Binary Search on Unsorted Array',
      'Brute Force Random Walk'
    ],
    correct_answer: 'Dijkstra’s Shortest Path Algorithm',
    explanation: 'Dijkstra’s algorithm computes shortest paths on weighted graphs, matching how world-class playmakers calculate the optimal trajectory for an assist.'
  },
  {
    text: 'What was the world-record transfer fee Real Madrid paid Manchester United in 2009 to sign Cristiano Ronaldo?',
    difficulty: 'tough',
    category: 'Real Madrid',
    code_snippet: null,
    options: ['£80 million (€94 million)', '£50 million (€60 million)', '£100 million (€120 million)', '£150 million (€180 million)'],
    correct_answer: '£80 million (€94 million)',
    explanation: 'Real Madrid paid £80 million (€94 million) in July 2009, smashing the previous world record and kicking off the greatest era in modern club history.'
  }
];
