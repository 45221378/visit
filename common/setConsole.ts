import ola from '/src/ola'

export default function setConsole() {
  const url = window.location.href
  const needConsole =
    url.includes('console') ||
    url.includes('page.pati.vip') ||
    ola.app.server_env === 'development'
  if (needConsole)
    return import('vconsole').then(({ default: VConsole }) => new VConsole())
}
