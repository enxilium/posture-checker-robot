import Balancer from "react-wrap-balancer"

export default function Home() {
  return (
    <>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-40 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter text-slate-blue md:text-5xl lg:leading-[1.1]">
          Fernando
        </h1>
        <p className="text-center text-lg font-light text-ocean-blue">
          <Balancer>
            An innovative posture detection robot that leverages AI to monitor and improve your posture in real-time.
          </Balancer>
        </p>
      </section>
    </>
  )
}
