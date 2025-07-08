import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { OddScoutLogo } from '@/assets/svg'

function SideMenuSheet() {
  return (
    <aside
      className="border-primary w-[250px] space-y-1 overflow-auto border-r px-6 py-10 pb-4"
      style={{ scrollbarGutter: 'stable' }}
    >
      <header className="flex w-full items-center justify-center">
        <Link href="/" className="flex items-center md:h-[81px] md:w-[145px]">
          <Image
            src={OddScoutLogo}
            alt=""
            className="object-cover object-center"
            width={145}
            height={81}
            priority
            loading="eager"
          />
        </Link>
      </header>

      {/* <NavMenu origin={origin} /> */}
    </aside>
  )
}

export default SideMenuSheet
