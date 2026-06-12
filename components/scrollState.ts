// Unified fullpage scroll controller — single source of truth for all page transitions
type Listener = () => void;

class ScrollController {
  currentPage = 0;
  totalPages = 8; // 0=hero, 1-6=card sections, 7=contact
  cooldown = false;
  listeners = new Set<Listener>();

  next() {
    if (this.cooldown || this.currentPage >= this.totalPages - 1) return;
    this.cooldown = true;
    this.currentPage++;
    this.notify();
    setTimeout(() => { this.cooldown = false; }, 420);
  }

  prev() {
    if (this.cooldown || this.currentPage <= 0) return;
    this.cooldown = true;
    this.currentPage--;
    this.notify();
    setTimeout(() => { this.cooldown = false; }, 420);
  }

  goTo(page: number) {
    if (page < 0 || page >= this.totalPages || page === this.currentPage) return;
    this.cooldown = true;
    this.currentPage = page;
    this.notify();
    setTimeout(() => { this.cooldown = false; }, 420);
  }

  notify() {
    this.listeners.forEach((fn) => fn());
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }
}

export const scrollController = new ScrollController();
