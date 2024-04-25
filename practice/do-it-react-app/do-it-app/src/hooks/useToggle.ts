import {useCallback, useState} from 'react'

export const useToggle = (initialChecked: boolean = false): [boolean, () => void] => {
  const [checked, setChecked] = useState<boolean>(false)
  const toggleChecked = useCallback(() => setChecked(preChecked => !preChecked), [])
  return [checked, toggleChecked]
}
