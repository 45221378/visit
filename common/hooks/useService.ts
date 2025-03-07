import { useCallback, useState } from 'react'

export default function useService<Res>(fetcher: () => Promise<Res>) {
  const [error, setError] = useState<Error>()
  const [res, setRes] = useState<Res>()
  const [loading, setLoading] = useState(false)

  const fetch = useCallback(() => {
    setLoading(true)
    setRes(undefined)
    setError(undefined)
    fetcher()
      .then(setRes)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [fetcher])

  return { fetch, loading, error, res }
}
