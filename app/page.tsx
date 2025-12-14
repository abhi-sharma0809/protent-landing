import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#ece7e2] blueprint-grid-dense flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 flex-1 flex items-center justify-center relative">
        <div className="absolute top-12 left-8 w-8 h-8 border-l-2 border-t-2 border-[#102c39]/40" />
        <div className="absolute top-12 right-8 w-8 h-8 border-r-2 border-t-2 border-[#102c39]/40" />
        <div className="absolute bottom-12 left-8 w-8 h-8 border-l-2 border-b-2 border-[#102c39]/40" />
        <div className="absolute bottom-12 right-8 w-8 h-8 border-r-2 border-b-2 border-[#102c39]/40" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative py-16">
          <Image src="/protent-logo.png" alt="Protent" width={280} height={64} className="h-16 w-auto mx-auto mb-12" />

          <div className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#ff6600]/10 border border-[#ff6600]/30">
            <span className="text-sm font-mono text-[#102c39]">Backed by</span>
            <Image src="/yc-logo2.png" alt="Y Combinator" width={100} height={20} className="h-7 w-24" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance leading-tight pt-4 text-[#102c39]">
            AI intelligence for <span className="text-[#102c39]/70">mission-critical</span> operations
          </h1>

          <p className="text-2xl md:text-3xl text-[#102c39]/60 font-mono pt-8">Coming Soon</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#102c39]/20">
        <div className="container mx-auto px-4 py-8">
          {/* <div className="text-center text-sm text-[#102c39]/70 font-mono">
            For inquiries:{" "}
            <a
              href="mailto:srihan@protent.ai"
              className="text-[#102c39] hover:text-[#102c39]/80 transition-colors underline"
            >
              srihan@protent.ai
            </a>
          </div> */}
        </div>
      </footer>
    </div>
  )
}
