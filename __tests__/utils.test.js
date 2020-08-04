const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');
const { TestScheduler } = require('jest');

describe('formatDates', () => {
  test('expect the created_by timestamp to be converted to proper date', () => {
    const input =  [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }]
    expect(formatDates(input)).toEqual([
      {title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: new Date(input[0].created_at),
    votes: 100,}])
  })
  test('formatDates can convert the timestamp on array with more than one object', ()=> {
    const input =  [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    },
    {
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    }
  ]
  expect(formatDates(input)).toEqual([{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: new Date(input[0].created_at),
    votes: 100,
  },
  {
    title: 'Sony Vaio; or, The Laptop',
    topic: 'mitch',
    author: 'icellusedkars',
    body:
      'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
    created_at: new Date(input[1].created_at),
  }
])
  })
  test('the original array of objects isn\'t mutated',()=>{
    const input =  [{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }]
    formatDates(input)
    expect(input).toEqual([{
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }])
  })
})


describe('makeRefObj', () => {
  it('can handle a object with more than one element', ()=>{
    const input = [{
        article_id: 1,
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
    }]
    expect(makeRefObj(input)).toEqual({
      'Running a Node App': 1
    })
    
  })
  test('can handle an array of objects with multiple objects inside',()=>{
    const input = [{
      article_id: 1,
      title: 'Running a Node App',
      topic: 'coding',
      author: 'jessjelly',
      body:
        'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      created_at: 1471522072389,
  },
  {
    article_id: 2,
    title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
    topic: 'coding',
    author: 'jessjelly',
    body:
      'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
    created_at: 1500584273256,
  }
]
expect(makeRefObj(input)).toEqual({
  'Running a Node App':1, 'The Rise Of Thinking Machines: How IBM\'s Watson Takes On The World':2
})
  })
});

describe('formatComments', () => {
  test('Can re-format the comments data', () => {
    const comment =   [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    }]
    const lookup = {'The People Tracking Every Touch, Pass And Tackle in the World Cup': 1}
    expect(formatComments(comment, lookup)).toEqual([{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      author: 'tickle122',
      votes: -1,
      created_at: new Date(comment[0].created_at),
      article_id: 1
    }])
  })
  test('The function formatComments can work with multiple objects', () => {
    const comment =   [{
      body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
      belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
      created_by: 'tickle122',
      votes: -1,
      created_at: 1468087638932,
    },
    {
      body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
      belongs_to: 'Making sense of Redux',
      created_by: 'grumpy19',
      votes: 7,
      created_at: 1478813209256,
    }]
    const lookup = {'The People Tracking Every Touch, Pass And Tackle in the World Cup': 1, 'Making sense of Redux':2 }
   expect(formatComments(comment, lookup)).toEqual([
    {
   body: 'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
   author: 'tickle122',
   votes: -1,
   created_at: new Date(comment[0].created_at),
   article_id: 1
  },
  {
  body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
  author: 'grumpy19',
  votes: 7,
  created_at: new Date(comment[1].created_at),
  article_id:2
  }])
})
})
