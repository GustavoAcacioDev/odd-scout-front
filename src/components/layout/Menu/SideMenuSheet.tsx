import { OddScoutLogo } from '@/assets/svg'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SideMenuSheet() {
    return (
        <aside
            className="w-[250px] space-y-1 overflow-auto pb-4 border-r border-primary py-10 px-6"
            style={{ scrollbarGutter: 'stable' }}
        >
            <header className="flex w-full items-center justify-center">
                <Link
                    href="/"
                    className="flex items-center tablet:h-[81px] tablet:w-[145px]"
                >
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