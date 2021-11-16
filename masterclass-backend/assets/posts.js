const posts = [
  {
    id: '1p',
    title: 'Sibelius Violin Concerto',
    userID: '2u',
    audioFileUri: 'https://storage.cloud.google.com/masterclass_audio_assets/test.flac',
    description: 'test post',
    dateCreatedAt: new Date('02/05/1992'),
    tagIDs: ['1t', '3t']
  },
  {
    id: '2p',
    title: 'Brahms Violin Sonata #2',
    userID: '1u',
    audioFileUri: 'https://storage.cloud.google.com/masterclass_audio_assets/test2.mp3',
    description: 'test post 2',
    dateCreatedAt: new Date('01/01/2020'),
    tagIDs: ['2t']
  }
]

export default posts;