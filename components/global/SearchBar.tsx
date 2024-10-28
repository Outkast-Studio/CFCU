import { clsx } from 'clsx'
import { useState } from 'react'

const SearchBar = () => {
  const [search, setSearch] = useState('')

  return (
    <div className={clsx('relative pl-[17px] pr-[13px]')}>
      <input
        type={'text'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={'Search'}
        className={clsx('w-[100%] pb-[17px] pt-[21px]')}
      />
    </div>
  )
}

export default SearchBar
