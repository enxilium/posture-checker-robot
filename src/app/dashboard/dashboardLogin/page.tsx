'use client'
import Balancer from "react-wrap-balancer"
import Link from "next/link"
import Image from "next/image"
import robotIcon from "@/app/robot.png"
import { Button } from "@/components/ui/button"

const userProfile = {
  name: "Nicholas Chen",
  email: "nicholas@example.com",
  memberSince: "January 2024",
  lastLogin: "2 hours ago",
  streak: "7 days"
}

export default function DashboardPage() {
  return (
    <>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-40 lg:pb-20 bg-soft-pink">
        <div className="flex items-center gap-4 mb-8 p-6 rounded-lg border bg-card w-full">
          <div className="h-16 w-16 rounded-full bg-slate-blue flex items-center justify-center">
            <span className="text-2xl text-white font-bold">
              {userProfile.name.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold">Welcome back, {userProfile.name}!</h2>
            <p className="text-ocean-blue">Last login: {userProfile.lastLogin}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="font-medium">Current Streak</p>
            <p className="text-ocean-blue">{userProfile.streak}</p>
          </div>
        </div>

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
        </nav>
      </section>
    </>
  )
}
