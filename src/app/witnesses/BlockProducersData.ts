type BlockProducer = {
  rank: number
  userName: string
  imageLink: string
  userDescription: string
  version: string
  votes: number
  lastBlock: number
  vote: boolean
}

export const blockProducers: BlockProducer[] = [
  {
    rank: 1,
    userName: 'arcange',
    imageLink: '/profile_images/1.png',
    userDescription: 'Description for gtg',
    version: '1.27.0',
    votes: 72.5,
    lastBlock: 812421908,
    vote: true,
  },
  {
    rank: 2,
    userName: 'gtg',
    imageLink: '/profile_images/2.jpg',
    userDescription: 'Description for blocktrades',
    version: '1.27.0',
    votes: 82.7,
    lastBlock: 81241927,
    vote: true,
  },
  {
    rank: 3,
    userName: 'blocktrades',
    imageLink: '/profile_images/3.png',
    userDescription: 'Description for blocktrades',
    version: '1.27.0',
    votes: 90.1,
    lastBlock: 81241927,
    vote: false,
  },
  {
    rank: 4,
    userName: 'stoodkev',
    imageLink: '/profile_images/4.png',
    userDescription: 'Description for user 4',
    version: '1.28.0',
    votes: 65.2,
    lastBlock: 81241876,
    vote: true,
  },
  {
    rank: 5,
    userName: 'steempeak',
    imageLink: '/profile_images/5.png',
    userDescription: 'Description for user 5',
    version: '1.26.0',
    votes: 78.3,
    lastBlock: 81241732,
    vote: false,
  },
  {
    rank: 6,
    userName: 'ausbitbank',
    imageLink: '/profile_images/6.png',
    userDescription: 'Description for user 6',
    version: '1.26.0',
    votes: 78.3,
    lastBlock: 81241732,
    vote: false,
  },
  {
    rank: 7,
    userName: 'themarkymark',
    imageLink: '/profile_images/7.jpg',
    userDescription: 'Description for user 7',
    version: '1.26.0',
    votes: 78.3,
    lastBlock: 81241732,
    vote: false,
  },
  {
    rank: 8,
    userName: 'goodkarma',
    imageLink: '/profile_images/8.jpg',
    userDescription: 'Description for  user 8',
    version: '1.26.0',
    votes: 78.3,
    lastBlock: 81241732,
    vote: false,
  },
]

export default blockProducers
