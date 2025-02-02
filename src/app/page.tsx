import Balancer from "react-wrap-balancer"
import Link from "next/link"
import Image from "next/image"
import robotIcon from "@/app/robot.png"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/app/auth-button"

export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-40 lg:pb-20 bg-soft-pink">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter text-slate-blue md:text-5xl lg:leading-[1.1]">
            Fernando
          </h1>
          <Image
            src={robotIcon}
            alt="Posture Robot"
            width={200}
            height={200}
          />
        </div>

        <div className="max-w-[700px] text-center">
          <p className="text-center text-lg font-light text-ocean-blue">
            <Balancer>
              An innovative posture detection robot that leverages AI to monitor and improve your posture in real-time.
            </Balancer>
          </p>
        </div>

        <nav className="flex items-center gap-4 py-4">
          <Link href="/dashboard">
            <Button variant="default">Get Started</Button>
          </Link>
          <AuthButton />
        </nav>
      </section>
    </>
  )
}
