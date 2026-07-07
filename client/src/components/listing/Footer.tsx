function Footer() {
  return (
    <footer className="border-t border-line-soft py-8 text-sm text-ink-muted">
      <div className="mx-auto flex max-w-content items-center justify-between px-6">
        <p>© {new Date().getFullYear()} Airbnb Listing Clone. Not affiliated with Airbnb, Inc.</p>
        <div className="flex gap-6">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Sitemap</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
