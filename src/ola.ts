import Ola from '/common/Ola'

const ola = new Ola({
  appName: '',
  baseURL: {
    local: 'https://api.pati.vip',
    development: 'https://api.pati.vip',
    production: `${window.location.origin.replace('page', 'api')}`
  },
  oss: 'https://xs-image.pati.chat',
  thinkingdata: {
    appid: '7acc569375a54bf9af70204c04e78313'
  },
  domain: '',
  region: 'oversea'
})

const isMock = window.location.hostname.includes('localhost')

async function setOla() {
  if (isMock)
    return ola.customLogin({
      token: '',
      // uid: 900002492,
      uid: 800340013,
      // uid: 800350564, // id
      // uid: 800314760, // vi
      // uid: 800314760,
      lan: 'ja',
      serverEnv: 'development',
      pkg: ''
    })
}

export { setOla }
export default ola
