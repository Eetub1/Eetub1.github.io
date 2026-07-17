const links = [
  { href: "/", label: "Home" },
  { href: "/projects.html", label: "Projects" },
  { href: "/cv.html", label: "CV"}
]

export function mountLayout() {
  const content = document.querySelector<HTMLDivElement>("#content")
  if (!content) return

  const path = window.location.pathname
  const nav = links
    .map(l => {
      const active = l.href === path || (l.href === "/" && path === "/index.html")
      return `<a href="${l.href}"${active ? ' aria-current="page"' : ""}>${l.label}</a> `
    })
    .join("")

  content.insertAdjacentHTML("afterbegin", `<header>${nav}</header>`)
  content.insertAdjacentHTML(
    "beforeend",
    `<footer>Code
      <a href="https://github.com/Eetub1/Eetub1.github.io" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <i class="fa-brands fa-github"></i>
      </a>
    </footer>`
  )
}