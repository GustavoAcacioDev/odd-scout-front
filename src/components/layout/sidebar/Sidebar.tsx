'use client'

import {
  ChevronDown,
  Clock,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  ListChecks,
  LogOut,
  Settings,
  Wallet,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import { OddScoutLogo } from '@/assets/svg'
import { Button } from '@/components/ui/shadcn/button'
import { Switch } from '@/components/ui/shadcn/switch'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    icon: LayoutDashboard,
    href: '/dashboard',
    label: 'Dashboard',
    active: true,
  },
  {
    icon: ListChecks,
    href: '/bets',
    label: 'Open Bets',
    active: false,
  },
  {
    icon: Clock,
    href: '/history',
    label: 'History',
    active: false,
  },
  {
    icon: LineChart,
    href: '/analytics',
    label: 'Analytics',
    active: false,
  },
  {
    icon: Wallet,
    href: '/wallet',
    label: 'Wallet',
    false: false,
    active: false,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <div className="flex w-64 flex-col border-r border-gray-200 bg-white">
      <div className="px-6">
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
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {menuItems.map((item) => (
          <Button key={item.label} variant="ghost" asChild>
            <Link
              href={item.href}
              className={cn(
                'h-10 w-full justify-start gap-3',
                pathname === item.href &&
                  'bg-primary-50 text-primary-600 hover:bg-primary-50',
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{item.label}</span>
            </Link>
          </Button>
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="space-y-2">
          <Button variant="ghost" asChild>
            <Link href="/settings" className="h-10 w-full justify-start gap-3">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button variant="ghost" className="h-10 w-full justify-start gap-3">
            <HelpCircle className="h-4 w-4" />
            Help
          </Button>
          
          <Button
            variant="ghost"
            className="h-10 w-full justify-start gap-3"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>

          <div className="flex h-12 items-center justify-between px-7">
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4" />
              <span className="text-sm">Auto Bet</span>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <div className="flex-1">
              <p className="text-sm font-medium">Gustavo</p>
              <p className="text-xs text-gray-500">astikayoung@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
