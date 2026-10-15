// Ersatz für das Framer-Motion-Pattern aus CLAUDE.md:
//   fadeUp  → .reveal (opacity 0 → 1, y 30 → 0, 0.5s ease-out)
//   stagger → [data-stagger="0.1"] verteilt --i auf alle .reveal darin
//   viewport={{ once: true }} → Observer löst pro Element genau einmal aus

function show(els: Element[]) {
  els.forEach(el => el.classList.add('is-visible'))
}

export function initReveal() {
  const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-stagger]'))
  const grouped = new Set<Element>()
  const targets = new Map<Element, Element[]>()

  groups.forEach(group => {
    const items = Array.from(group.querySelectorAll<HTMLElement>('.reveal')).filter(el => !grouped.has(el))
    const interval = group.dataset.stagger
    items.forEach((el, i) => {
      el.style.setProperty('--i', String(i))
      if (interval) el.style.setProperty('--stagger', `${interval}s`)
      grouped.add(el)
    })
    if (group.classList.contains('reveal')) items.unshift(group)
    targets.set(group, items)
  })

  document.querySelectorAll('.reveal').forEach(el => {
    if (!grouped.has(el) && !targets.has(el)) targets.set(el, [el])
  })

  if (!('IntersectionObserver' in window)) {
    targets.forEach(show)
    return
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        show(targets.get(entry.target) ?? [])
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -60px 0px' }
  )
  targets.forEach((_, el) => observer.observe(el))
}
