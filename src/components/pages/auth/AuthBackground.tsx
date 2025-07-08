import './AuthBackground.css'

import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr'

export function AuthBackground() {
  return (
    <div className="bg-primary relative hidden h-full w-4/5 px-20 md:flex md:items-center">
      <div className="max-w-[400px] pb-20 text-white md:flex md:flex-col md:justify-center md:gap-6">
        <h2 className="text-3xl font-extrabold xl:text-4xl 2xl:text-5xl">
          O controle das suas bets como nunca antes
        </h2>

        <p className="text-lg font-semibold">
          Apostas inteligentes sem complicação, rápidas e seguras. Compare odds
          online com facilidade e o melhor valor.
        </p>

        <ul className="space-y-4 text-lg font-semibold">
          <li className="flex items-center gap-2">
            <CheckCircleIcon size={24} /> Comparação 100% digital
          </li>

          <li className="flex items-center gap-2">
            <CheckCircleIcon size={24} /> Análise especializada de valor
          </li>

          <li className="flex items-center gap-2">
            <CheckCircleIcon size={24} /> Odds justas e transparentes
          </li>
        </ul>
      </div>

      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}
