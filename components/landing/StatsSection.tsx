export function StatsSection() {
  const stats = [
    { value: '€2.4M+', label: 'Total savings calculated', suffix: '' },
    { value: '500+', label: 'Businesses analysed', suffix: '' },
    { value: '12+', label: 'European countries', suffix: '' },
    { value: '35%', label: 'Avg. energy cost reduction', suffix: '' },
  ]

  return (
    <section className="py-16 bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-400 mb-2">
                {stat.value}
              </div>
              <div className="text-neutral-400 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
