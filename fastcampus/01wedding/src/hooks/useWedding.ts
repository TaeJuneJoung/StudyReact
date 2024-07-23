import { useSuspenseQuery } from '@tanstack/react-query'
import { getWedding } from '@api/wedding'

function useWedding() {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: ['wedding'],
    queryFn: () =>
      getWedding().then((response) => {
        if (response.ok === false) {
          throw new Error('청접장 정보를 불러오지 못했습니다.')
        }

        return response.json()
      }),
  })

  return { wedding: data, isLoading, error }
}

export default useWedding
