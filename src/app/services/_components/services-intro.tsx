import { Shield, Zap, Users, Award } from "lucide-react";

/**
 * Services Introduction Section
 * 
 * Conversion-focused section that bridges the hero and services grid.
 * Establishes trust, communicates value, and guides users toward exploring services.
 * 
 * Design principles:
 * - Premium split layout (content left, highlights right)
 * - Trust indicators with real metrics
 * - Subtle micro-interactions for engagement
 * - Seamless visual integration with existing design system
 */
export function ServicesIntro() {
  const trustMetrics = [
    { value: "150+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "12+", label: "Years Experience" },
    { value: "50+", label: "Expert Team Members" }
  ];

  const highlights = [
    {
      icon: Shield,
      title: "Enterprise-Grade Quality",
      description: "Premium solutions backed by industry best practices"
    },
    {
      icon: Zap,
      title: "Rapid Turnaround",
      description: "Efficient delivery without compromising excellence"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Your success is our priority, every step of the way"
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "Trusted by leading companies across industries"
    }
  ];

  return (
    <section className="relative bg-white py-20 sm:py-28 border-b border-slate-100 overflow-hidden">
      {/* Subtle background texture - minimal and professional */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0EA5E9 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Decorative gradient orbs - extremely subtle */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-teal-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1170px] px-5 sm:px-8">
        {/* Main content grid - split layout for premium feel */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Primary message */}
          <div>
            <span className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
              Why Choose Us
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#081a4b] mb-6 leading-tight">
              Everything You Need{" "}
              <span className="text-orange-500">Under One Roof</span>
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Our team of experts brings years of experience across multiple disciplines. 
              Whether you're looking to build a new product, enhance an existing one, 
              or completely transform your digital presence, we have the right services tailored for you.
            </p>

            {/* Trust metrics - social proof */}
            <div className="grid grid-cols-2 gap-6">
              {trustMetrics.slice(0, 2).map((metric, index) => (
                <div key={metric.label} className="group">
                  <div className="text-3xl sm:text-4xl font-bold text-[#081a4b] mb-1 group-hover:text-orange-500 transition-colors duration-300">
                    {metric.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Value highlights in compact cards */}
          <div className="grid gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group flex gap-4 p-5 rounded-xl bg-gradient-to-br from-slate-50/80 to-white border border-slate-100 hover:border-orange-200 hover:shadow-md hover:shadow-orange-500/5 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 75}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Icon with subtle treatment */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-orange-500/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300" />
                      <div className="relative flex items-center justify-center w-11 h-11 bg-white rounded-lg border border-orange-100 group-hover:border-orange-300 transition-all duration-300">
                        <Icon size={18} className="text-orange-600" strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#081a4b] mb-1 leading-snug group-hover:text-orange-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Additional trust metrics - clean horizontal layout */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-12 border-t border-slate-100">
          {trustMetrics.slice(2).map((metric) => (
            <div key={metric.label} className="text-center group">
              <div className="text-2xl sm:text-3xl font-bold text-[#081a4b] mb-1 group-hover:text-orange-500 transition-colors duration-300">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
