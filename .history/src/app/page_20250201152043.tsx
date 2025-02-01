import Balancer from "react-wrap-balancer"

export default function Home() {
  return (
    <div className="min-h-screen bg-soft-pink">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-8 py-8 md:py-12 md:pb-8 lg:py-40 lg:pb-20">
        <h1 className="text-center text-4xl font-bold leading-tight tracking-tighter text-slate-blue md:text-6xl lg:leading-[1.1]">
          Fernando
        </h1>
        <div className="max-w-[700px]">
          <p className="text-center text-xl font-light text-ocean-blue">
            <Balancer>
              An innovative posture detection robot that leverages AI to monitor and improve your posture in real-time.
            </Balancer>
          </p>
        </div>
      </section>
    </div>
  )
}
