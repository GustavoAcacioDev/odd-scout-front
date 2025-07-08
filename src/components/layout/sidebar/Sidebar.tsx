import {
  LayoutDashboard,
  CreditCard,
  ArrowUpDown,
  Wallet,
  ChevronDown,
  Settings,
  HelpCircle,
  ListChecks,
  Clock,
  LineChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/shadcn/button"
import Link from "next/link"
import Image from "next/image"
import { OddScoutLogo } from "@/assets/svg"

const menuItems = [
  { icon: LayoutDashboard, href: "/dashboard", label: "Dashboard", hasDropdown: false, active: true },
  { icon: ListChecks, href: "/dashboard", label: "My Bets", hasDropdown: false, active: false },
  { icon: Clock, href: "/dashboard", label: "History", hasDropdown: false, active: false },
  { icon: LineChart, href: "/dashboard", label: "Analytics", hasDropdown: false, active: false },
  { icon: Wallet, href: "/dashboard", label: "Wallet", false: false, active: false },
]

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6">
        <Link
          href="/"
          className="flex items-center md:h-[81px] md:w-[145px]"
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
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            asChild
          >
            <Link href={item.href} className={cn(
              "w-full justify-start gap-3 h-10",
              item.active && "bg-blue-50 text-blue-600 hover:bg-blue-50",
            )}>
              <item.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </Link>
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 h-10">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 h-10">
            <HelpCircle className="w-4 h-4" />
            Help
          </Button>

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
